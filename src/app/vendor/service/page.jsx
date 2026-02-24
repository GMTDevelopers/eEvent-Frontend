'use client'
import styles from '../bookings/[id]/bookingItem.module.css';
import xStyles from './service.module.css'
import SearchFilter from '@/app/(components)/search/page';
import StatsCard from '@/app/(components)/statsCard/page';
import { CheckCheck, Loader, Minimize2, Star, X } from 'lucide-react';
import Header from '@/app/(components)/header/page';
import { useState, useEffect } from 'react';
import Loading from '@/app/(components)/loading/loading';
import { useAuth } from '@/app/contexts/AuthContext';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
import VendorProductCard from './(vendorProductCard)/page';



const VendorServices = /* async */ () => {
    const {refreshAccessToken} = useAuth()
    const { openModal } = useModal();
    const [stats, setStats] = useState([])
    const [error, setError] = useState(null)
    const [recentAct, setRecentAct] = useState()
    const [reviewData, setReviewData] = useState([]); 
    const [vendorData, setVendorData] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(null);
    const [activeLoading, setActiveLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [vendorLoading, setVendorLoading] = useState(true);
    const ITEMS_PER_PAGE = 10;


    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getStats = async () => {
            try{
                setLoading(true);
                const statsRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/services/overview`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (statsRes.ok) {
                    const result = await statsRes.json();
                    console.log(result)
                    setStats(result.data)
                }
                if (statsRes.status=== 401) {
                    refreshAccessToken()
/*                     console.log(result)
                    setStats(result.data) */
                }
            }catch(err){
                throw new Error(err)
            }finally{
                setLoading(false)
            }                  
        }
        const activeServices = async () => {
            try{
                setActiveLoading(true)
                const activeRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/services/active?skip=0&take=20`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (activeRes.ok) {
                    const res = await activeRes.json();
                    console.log("active service",res)
                    setRecentAct(res.data)
                    setActiveLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setActiveLoading(false)
            }         
        }
        const reviewsRatings = async () => {
            try{
                setReviewLoading(true)
                const reraRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/reviews/detailed`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (reraRes.ok) {
                    const res = await reraRes.json();
                    console.log("review",res)
                    setReviewData(res.data)
                    setReviewLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setReviewLoading(false)
            }         
        }
        const getVendor = async () => {
            try{
                setVendorLoading(true)
                const reraRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (reraRes.ok) {
                    const res = await reraRes.json();
                    console.log("vendor data",res)
                    setVendorData(res.data.business)
                    setVendorLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setVendorLoading(false)
            }         
        }
        getStats()
        activeServices()
        getVendor()
        reviewsRatings()
    },[])


    return ( 
        <div>
            <div className={`main ${xStyles.serviceMain}`}>
                <Header img='/images/servicePage/serviceBG.png' header='Find trusted event services near you.' subHeader='Your next great event starts here.' />
                <div className="stats">
                    <SearchFilter name="My Services" page="vendorService"/>                    
                    <div className="statsPack">
                        <StatsCard title="ACTIVE SERVICES" data={stats?.activeServices} icon={Minimize2} />
                        <StatsCard title="PENDING SERVICES" data={stats?.pendingServices} icon={Loader} />
                        <StatsCard title="BOOKINGS THIS MONTH" data={stats?.bookingsThisMonth} icon={CheckCheck} />
                        <StatsCard title="OVERALL RATING" data={stats?.overallRating} icon={Star} />
                    </div>
                </div>
            </div>
            
            <div className={styles.doubleContainer}>
                <div className="mainContent">
                    <aside className="aside">
                        <div className={`vendor ${styles.vendor}`}>
                            <div className="vendorImgPack">
                                <img className="vendorImg" src={vendorData?.logo || `/images/defaultDP.jpg` } alt="vendor" />
                            </div>
                            
                            <div className="vendorDetails">
                                <p className="vendorName">{vendorData.name}</p>
                                <p style={{color:"#636363"}}>{vendorData?.date || `Joined March 2025`}</p>
                                <div className="catPill">
                                    <li>{vendorData?.category}</li>
                                </div>
                            </div>

                            <div className="ratingPack">
                                <p className="rating">RATING</p>
                                <img className="ratingStars" src="/images/productPage/ratings.png" alt="ratings" />
                                <p style={{fontWeight:700}}>4.7 Stars  |  32 Reviews</p>
                            </div>
                        </div>
                    </aside>
                    <section className="mainSection">
                        <h3>ACTIVE SERVICES ({recentAct?.length}) </h3>
                        <div className={xStyles.activeService}>
                            {error && <p className="error">{error}</p>}
                            {
                                activeLoading ? <Loading />
                                : recentAct.map((act,index)=>(

                                    <VendorProductCard 
                                        data={index}
                                        key={act.id}
                                        title={act.title}
                                        description={act.description}
                                        category={act.category}
                                        ratings={act.rating}
                                        price={act.startingPrice}
                                        thumb={act.media[0]}
                                        vendorName={act.vendorName}
                                        prodId={act.serviceId}
                                        vendorImg='https://www.freepik.com/free-vector/add-new-user_145857018.htm#fromView=keyword&page=1&position=26&uuid=25a85935-003c-4bf2-b927-4fa93db80cf3&query=User'
                                    />
                                ))
                            }
                        </div>
                        
                        <div className={xStyles.reRatings}>
                            <h3>REVIEWS AND RATINGS </h3>
                            <div className={xStyles.review}>
                                <div>
                                    <div className={xStyles.reviewUser}>
                                        <img src="/images/products/prod6.png" alt="user" />
                                        <div>
                                            <p><strong>Abisola Oluwasogo</strong></p>
                                            <small> October 12, 2025 </small>
                                        </div>  
                                    </div>                                        
                                </div>                                    
                                <p className={xStyles.comment}>Absolutely perfect. Food was hot, fresh, and delicious, and the staff were incredibly professional. They took care of everything seamlessly.</p>
                            </div>              
                            <div className={xStyles.review}>
                                <div>
                                    <div className={xStyles.reviewUser}>
                                        <img src="/images/products/prod6.png" alt="user" />
                                        <div>
                                            <p><strong>Abisola Oluwasogo</strong></p>
                                            <small> October 12, 2025 </small>
                                        </div>  
                                    </div>                                        
                                </div>                                    
                                <p className={xStyles.comment}>Absolutely perfect. Food was hot, fresh, and delicious, and the staff were incredibly professional. They took care of everything seamlessly.</p>
                            </div>              
                            <div className={xStyles.review}>
                                <div>
                                    <div className={xStyles.reviewUser}>
                                        <img src="/images/products/prod6.png" alt="user" />
                                        <div>
                                            <p><strong>Abisola Oluwasogo</strong></p>
                                            <small> October 12, 2025 </small>
                                        </div>  
                                    </div>                                        
                                </div>                                    
                                <p className={xStyles.comment}>Absolutely perfect. Food was hot, fresh, and delicious, and the staff were incredibly professional. They took care of everything seamlessly.</p>
                            </div>              
                            <div className={xStyles.review}>
                                <div>
                                    <div className={xStyles.reviewUser}>
                                        <img src="/images/products/prod6.png" alt="user" />
                                        <div>
                                            <p><strong>Abisola Oluwasogo</strong></p>
                                            <small> October 12, 2025 </small>
                                        </div>  
                                    </div>                                        
                                </div>                                    
                                <p className={xStyles.comment}>Absolutely perfect. Food was hot, fresh, and delicious, and the staff were incredibly professional. They took care of everything seamlessly.</p>
                            </div>              
{/*                             <div className={styles.reviewRight}>
                                {reviews.map((rev, i) => (
                                    <div key={i} className={styles.review}>
                                    <p>
                                        <strong>{rev.username}</strong> Rating: {rev.stars} stars
                                    </p>
                                    <p>{rev.comment}</p>
                                    <small>
                                        {new Date(rev.createdAt).toLocaleDateString('en-NG')}
                                    </small>
                                    </div>
                                ))}              
                            </div> */}
                        </div>
                    </section>
                </div>
            </div>
         
        </div>
    );
}
 
export default VendorServices;