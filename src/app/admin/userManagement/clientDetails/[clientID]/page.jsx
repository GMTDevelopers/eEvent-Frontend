'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import { use, useEffect, useState } from 'react';
import styles from './settings.module.css';
import Styles from '@/app/(components)/bookingsTable/BookingsTable.module.css';
import SignIn from '@/app/navbar/(signIn)/signIn';
import 'yet-another-react-lightbox/styles.css';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
const ClientDetails = ({params}) => {
    const {clientID} = use(params);
    const [clientData, setClientData] = useState();
    const [loading, setLoading] = useState(false);
    const { openModal } = useModal();
    const router = useRouter();

     useEffect(() => {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            if (!token) {
                openModal(<SignIn />)
                return;
            }

            fetch(`https://eevents-srvx.onrender.com/v1/admin/clients/${clientID}`,{
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
                console.log("client user", data.data)
                setClientData(data.data || []);
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
  
        }, []);
    

    
    return ( 
        <div className={`main ${styles.settings}`}>
            <button onClick={() => router.back()} className={`backBtn`}><ChevronLeft /> go back </button>
            <div className={styles.settingsContainer}>
                <div style={{ textAlign: "center", alignItems:"center"}}>
                    <div style={{ justifyContent:"center"}} className={styles.photoPack}>
                        <div className={styles.photoItem}>
                            <img src={clientData?.profileImage || '/images/defaultDP.jpg'} alt="profile" />
                        </div>                        
                    </div>
                    <br />
                    
                    <h2>{clientData?.name}</h2>
                    <p>{clientData?.clientID}</p>
                    <div className={styles.settingsContainer}>
                        <li className='vendorItem'>
                            <p>Date registered</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(clientData?.dateRegistered).toDateString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Phone number</p>
                            <p style={{color:"#222222", fontWeight:700}}>{clientData?.phone}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Email address</p>
                            <p style={{color:"#222222", fontWeight:700}}>{clientData?.email}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Total payment</p>
                            <p style={{color:"#222222", fontWeight:700}}>₦{clientData?.totalPayment.toLocaleString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Last login</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(clientData?.lastLogin).toDateString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Total orders</p>
                            <p style={{color:"#222222", fontWeight:700}}>{clientData?.totalOrders}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Account status</p>
                            <p className={`${Styles[clientData?.accountStatus.toLowerCase()]}`} style={{fontWeight:700}}>{clientData?.accountStatus}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Last order</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(clientData?.lastOrder).toDateString()}</p>
                        </li>
                    </div>
                </div>
                
            </div>
            
        </div>
    );
}
 
export default ClientDetails;