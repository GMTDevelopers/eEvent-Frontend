'use client'
import { useEffect, useState, use } from 'react';

import styles from '@/app/vendor/service/[id]/product.module.css';
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
import Header from '@/app/(components)/header/page';

const ProductCard = ({params}) => {
    const [prod, setProd] = useState([]);  
    const [error, setError] = useState(null) 
    const {serviceId} = use(params)
    const [loading, setLoading] = useState(true)

    const { openModal } = useModal();
    const router = useRouter()
    useEffect(() => {
        console.log(serviceId)
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const activeServices = async () => {
            try{
                setLoading(true)
                const activeRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/services/${serviceId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (activeRes.ok) {
                    const res = await activeRes.json();
                    console.log("service details",res.data)
                    setProd(res.data)
                    setLoading(false)
                }
            }catch(err){
                setError(err.message)
            }finally{
                setLoading(false)
            }         
        }
       activeServices()

    }, []);


    if (loading) return <Loading text="Fetching service..." />


    return ( 
        <>
            {
                <div className='main'>
                    <Header img='/images/TandC.png' header='eEvents Admin Dashboard' subHeader='Manage all platform activities.' />
                    <div className="mainContent">
                        <aside className="aside">
                            <div style={{marginTop:"120px"}} className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={prod?.vendor.profileImage || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{prod?.vendor.name}</p>
                                    <p style={{color:"#636363"}}>{new Date(prod?.vendor.dateJoined).toLocaleDateString("en-US", { month: "long", year: "numeric", })}</p>
                                    <div className="catPill">
                                        <li>{prod?.vendor.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <Rating
                                        readonly
                                        initialValue={prod?.vendor.ratings}
                                        allowFraction
                                        size={34}
                                        fillColor="#fbbf24"
                                        emptyColor="#e5e7eb"
                                    />  
                                   <p style={{fontWeight:700}}>{prod?.vendor.ratings} Stars | {prod?.vendor.totalReviews} Reviews</p>
                                </div>
                            </div>
                            <br />
                            <StatsCard title="TOTAL ORDERS" data={prod?.totalOrders} icon={Minimize2} />
                            <br />
                            <StatsCard title="TOTAL CLIENTS" data={prod?.totalClients} icon={UserStar} />
                            <br />
                            <StatsCard title="REPEAT CLIENTS" data={prod?.repeatClients} icon={RotateCw} />
                            <br /><br />
                            <div className="vendorDetails">
                                <p className="vendorName">Available in these cities</p>
                                {prod?.citiesAvailable.map((city)=>(
                                    <div className="catPill">
                                        <li>{city}</li>
                                    </div>
                                ))}
                            </div>
                            
                        </aside>
                        <section className="mainSection">
                            <button onClick={() => router.back()} className="backBtn"><ChevronLeft /> go back </button>

                            <h2>{prod?.title}</h2>
                            <div className="descPack">
                                <NaturalDescription text={prod?.description} />
                            </div>
                            <div className={styles.tabsSection}>
                                <ProductTabs gallery={prod?.media} features={prod?.features} addService={prod.additionalService.services} reviews={prod?.reviews} />
                            </div>
                            <div className={styles.actionLinks}>
                                <div>
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