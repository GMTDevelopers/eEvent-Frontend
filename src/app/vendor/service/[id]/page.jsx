'use client'
import { useEffect, useState, use } from 'react';

import styles from './product.module.css';
import ProductTabs from '@/app/(components)/tabs/pages';
import NaturalDescription from '@/app/(components)/natural-text/page';
import Loading from '@/app/(components)/loading/loading';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation'
import StatsCard from '@/app/(components)/statsCard/page';
import { ChevronLeft, ChevronRight, Minimize2, RotateCw, UserStar } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/app/contexts/AuthContext';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
/* https://grok.com/share/c2hhcmQtNQ_54091b1e-a166-46e9-8be2-895e1d5297bf */ /* chat to creating the input */
const ProductCard = ({params, searchParams}) => {
    const [prod, setProd] = useState([]);  
    const [stats, setStats] = useState([]); 
    const [error, setError] = useState(null) 
    const {id} = use(params)
    const {index} = use(searchParams)
    const [loading, setLoading] = useState(true)
    const [statsSoading, setStatsLoading] = useState(true)
    const { openModal } = useModal();
    const router = useRouter()
    useEffect(() => {
        console.log(index,id)
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const activeServices = async () => {
            try{
                setLoading(true)
                const activeRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/services/active?skip=0&take=20`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (activeRes.ok) {
                    const res = await activeRes.json();
                    console.log("active service",res.data[index])
                    setProd(res.data[index])
                    setLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }         
        }
        const getstats = async () => {
            try{
                setStatsLoading(true)
                const statsRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/services/${id}/details`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (statsRes.ok) {
                    const res = await statsRes.json();
                    console.log("active services stats",res)
                    setStats(res.data)
                    setStatsLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setStatsLoading(false)
            }         
        }
       activeServices()
       getstats()
    }, []);


    if (loading) return <Loading text="Fetching service..." />


    return ( 
        <>
            { !loading &&
                <div className='main'>
                    <header className="header">
                        <img className="bannerImg" src={stats?.media} alt="Banner" />
                    </header>
                    <div className="mainContent">
                        <aside className="aside">
                            <div className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={prod?.vendorProfileImage || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{prod?.vendorName}</p>
                                    <p style={{color:"#636363"}}>{new Date(prod?.dateJoined).toLocaleDateString("en-US", { month: "long", year: "numeric", })}</p>
                                    <div className="catPill">
                                        <li>{prod?.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <Rating
                                        readonly
                                        initialValue={prod.rating}
                                        allowFraction
                                        size={34}
                                        fillColor="#fbbf24"
                                        emptyColor="#e5e7eb"
                                    />  
                                   <p style={{fontWeight:700}}>{prod.rating.toFixed(1)} Stars  | {prod?.reviewsSummary} Reviews</p>
                                </div>
                            </div>
                            <br />
                            <StatsCard title="TOTAL ORDERS" data={stats?.totalOrders} icon={Minimize2} />
                            <br />
                            <StatsCard title="TOTAL CLIENTS" data={stats?.totalClients} icon={UserStar} />
                            <br />
                            <StatsCard title="REPEAT CLIENTS" data={stats?.repeatClients} icon={RotateCw} />
                            
                            
                        </aside>
                        <section className="mainSection">
                            <button onClick={() => router.back()} className="backBtn"><ChevronLeft /> go back </button>

                            <h2>{prod?.title}</h2>
                            <div className="descPack">
                                <NaturalDescription text={prod.detailedDescription} />
                            </div>
                            <div className={styles.tabsSection}>
                                <ProductTabs gallery={prod?.media} features={prod?.features} addService={prod?.additionalServices} reviews={prod?.reviews} />
                            </div>
                            <div className={styles.actionLinks}>
                                <Link href={`/vendor/service/${id}/orderHistory?index=${index}`}><p style={{display:"flex", alignContent:"center"}}>View order history <ChevronRight /></p></Link>
                                <div>
                                    <Link href='/find-service'><p>View order history</p></Link>
                                    <Link href='/find-service'><p>Go to vendor profile </p></Link>
                                    <Link style={{color:'#E50909'}}  href='/find-service'><p>Mark inactive</p></Link>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                </div>
            }
        </> 
    );
}
 
export default ProductCard;