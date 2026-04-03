'use client'
import { useEffect, useState, use } from 'react';

import styles from '@/app/vendor/service/[id]/product.module.css';
import stylesX from './page.module.css';
import Loading from '@/app/(components)/loading/loading';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation'
import StatsCard from '@/app/(components)/statsCard/page';
import { Banknote, ChevronLeft, ChevronRight, Minimize2, RotateCw, UserStar } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
import VendorOrderTable from '@/app/(components)/bookingsTable/vendor/vendorOrderTable';
/* https://grok.com/share/c2hhcmQtNQ_54091b1e-a166-46e9-8be2-895e1d5297bf */ /* chat to creating the input */
const ProductCard = ({searchParams}) => {
    const [history, setHistory] = useState([]); 
    const [error, setError] = useState(null)
    const {id} = use(searchParams)
    const [loading, setLoading] = useState(true)
    const { openModal } = useModal();
    const router = useRouter()
    console.log(id)
    useEffect(() => {
    /*     console.log(index,id) */
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getOrderHistory = async () => {
            try{
                setLoading(true)
                const historyRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/services/${id}/bookings`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (historyRes.ok) {
                    const res = await historyRes.json();
                    console.log("services history",res.data.data)
                    setHistory(res.data.data)
                   
                }
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }         
        }
       getOrderHistory();
    }, []);


    if (loading) return <Loading text="Fetching service order history..." />


    return ( 
        <>
            { !loading &&
                <div className='main'>
                    
                    <div className="main">
                        <button onClick={() => router.back()} className="backBtn"><ChevronLeft /> go back </button>
                        <aside className={stylesX.statsContainer}>
                            <div className="vendor">
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{history?.vendorName}</p>
                                    <p style={{color:"#636363"}}>{history?.vendor.dateJoined}</p>
                                    <div className="catPill">
                                        <li>{history?.vendor.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <Rating
                                        readonly
                                        initialValue={history?.vendor.ratings}
                                        allowFraction
                                        size={34}
                                        fillColor="#fbbf24"
                                        emptyColor="#e5e7eb"
                                    />  
                                </div>

                                <div className="vendorDetails">
                                    <p className="vendorName">Available in these cities</p>
                                    {history?.citiesAvailable.map((city)=>(
                                        <div className="catPill">
                                            <li>{city}</li>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className={stylesX.statsPack} >
                                <StatsCard title="TOTAL REVENUE" data={history?.totalRevenue} icon={Banknote} />
                                <StatsCard title="TOTAL ORDERS" data={history?.totalOrders} icon={Minimize2} />
                                <StatsCard title="TOTAL CLIENTS" data={history?.totalClients} icon={UserStar} />
                                <StatsCard title="REPEAT CLIENTS" data={history?.repeatClients} icon={RotateCw} />
                            </div>
                            
                        </aside>
                        <section>
                            <VendorOrderTable bookings={history?.bookingss} />
                        </section>
                        
                    </div>
                    
                </div>
            }
        </> 
    );
}
 
export default ProductCard;