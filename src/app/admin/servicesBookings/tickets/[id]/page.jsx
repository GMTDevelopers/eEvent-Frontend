'use client'
import { use, useEffect, useState } from 'react';
import styles from './tickets.module.css';
import { useRouter} from 'next/navigation';
import { ChevronLeft} from 'lucide-react';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import Loading from '@/app/(components)/loading/loading';
import SignIn from '@/app/navbar/(signIn)/signIn';
import Image from 'next/image';
import AdminTicketPurchaseTable from '@/app/(components)/bookingsTable/adminTicketsPurchaseTable';

const TicketPage = ({params}) => {
    const router = useRouter();
    const {id} = use(params);
    const [ticketData, setTicketData] = useState([])
    const [purchaseData, setPurchaseData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { openModal } = useModal();
    const TAKE = 10;


    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getDetails = () => {      
            fetch(`https://eevents-srvx.onrender.com/v1/admin/tickets/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                if (res.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                    router.refresh();
                }
                return res.json()
            })
            .then((data) => {    
                setTicketData(data.data)        
                console.log("ticket details",data);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }

        const getPurchase = (page = 1) => { 
            const skip = (page - 1) * TAKE;
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });     
            fetch(`https://eevents-srvx.onrender.com/v1/admin/tickets/${id}/purchases?${query.toString()}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                if (res.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                    router.refresh();
                }
                return res.json()
            })
            .then((data) => {    
                setPurchaseData(data.data)        
                console.log("ticket purchase details",data);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }
        getDetails()
        getPurchase()
    }, []);

    if (ticketData?.length === 0 && !isLoading) return <p>No booking found</p>;

    return ( 
        <div className="main">
            <button onClick={() => router.back()} className={`section backBtn`}><ChevronLeft /> go back </button>
            {
                isLoading &&<div>
                    <Loading />
                </div>
            }
            {
                ticketData?.length !== 0 && !isLoading && <div>
                    <section className={styles.ticketinfo}>
                        <img src={ticketData?.ticketImage} alt="tickets" />
                        <div className={styles.ticketInfoData}>
                            <h3>Night of a Thousand Laughs</h3>
                            <ul>
                                <li>
                                    <p style={{color:"#636363"}}>Ticket ID</p>
                                    <p style={{fontWeight:700}}>{ticketData?.ticketID}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Venue</p>
                                    <p style={{fontWeight:700}}>{ticketData?.venue}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Date & time</p>
                                    <p style={{fontWeight:700}}>{new Date(ticketData?.date).toLocaleDateString()}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Date posted</p>
                                    <p style={{fontWeight:700}}>{new Date(ticketData?.ticketID).toLocaleDateString()}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Total tickets</p>
                                    <p style={{fontWeight:700}}>{ticketData?.totalTickets}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Ticket categories</p>
                                    <p style={{fontWeight:700}}>{ticketData?.totalCategories}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Tickets sold</p>
                                    <p style={{fontWeight:700}}>{ticketData?.ticketsSold}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Total revenue</p>
                                    <p style={{fontWeight:700}}>{ticketData?.totalRevenue}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Available tickets</p>
                                    <p style={{fontWeight:700}}>{ticketData?.availableTickets}</p>
                                </li>
                                <li>
                                    <p style={{color:"#636363"}}>Event status</p>
                                    <p style={{fontWeight:700}} className={`${styles[ticketData?.eventStatus.toLowerCase()]}`}>{ticketData?.eventStatus}</p>
                                </li>
                            </ul>
                        </div>
                    </section>
                </div>
            }
            <div className={styles.purchase}>
                <h3>TICKET PURCHASES</h3>
                <AdminTicketPurchaseTable bookings={purchaseData} />
            </div>
        </div>
    );
}
 
export default TicketPage;