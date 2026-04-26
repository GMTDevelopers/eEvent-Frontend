'use client'
import { useEffect, useState, use } from 'react';

import styles from './product.module.css';
import ProductTabs from '@/app/(components)/tabs/pages';
import NaturalDescription from '@/app/(components)/natural-text/page';
import Loading from '@/app/(components)/loading/loading';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation'
/* https://grok.com/share/c2hhcmQtNQ_54091b1e-a166-46e9-8be2-895e1d5297bf */ /* chat to creating the input */
const ProductCard = ({params}) => {
    const [prod, setProd] = useState([]);  
    const {id} = use(params)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    useEffect(() => {
      fetch(`https://eevents-srvx.onrender.com/v1/discovery/services/${id}`)
        .then((res) => res.json())
        .then((data) => {        
            console.log(data)
            setProd(data.data); 
            setLoading(false)
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, []);


    if (loading) return <Loading text="Fetching service..." />


    return ( 
        <>
            { !loading &&
                <div className='main'>
                    <header className="header">
                        <img className="bannerImg" src={prod.serviceImage} alt="Banner" />
                    </header>
                    <div className="mainContent">
                        <aside className="aside">
                            <div className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={prod.vendorProfileImage || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{prod.vendorName}</p>
                                    <p style={{color:"#636363"}}>{new Date(prod.dateJoined).toLocaleDateString("en-US", { month: "long", year: "numeric", })}</p>
                                    <div className="catPill">
                                        <li>{prod.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <div className="starsPack">
                                        <Rating
                                            readonly
                                            initialValue={prod.vendorRatings.rating}
                                            allowFraction
                                            size={34}
                                            fillColor="#fbbf24"
                                            emptyColor="#e5e7eb"
                                    />  
                                    </div>
                                    
                                    <p style={{fontWeight:700}}>{prod.vendorRatings.rating.toFixed(1)} Stars  | {prod.vendorRatings.numberOfReviews} Reviews</p>
                                </div>
                            </div>
                            <br />
                            <div className="bookingPricing">
                                <p className="bookingTitle">BOOKING & PRICING</p>
                                <p className="txtHeader">₦ {prod.servicePrice}</p>
                                <div onClick={()=>{router.push(`/find-service/${id}/bookVendor`)}} className='bookVendor'>Book vendor</div>
                            </div>
                            <br />
                            <div className="bookingPricing">
                                <p className="bookingTitle">Available in these cities</p>
                                <div className='starsPack'>
                                    {
                                        prod.citiesAvailableIn.map((city)=>(
                                            <div className="btnNoCapsule" style={{display:"grid", gridTemplateColumns:"1fr 1fr"}}>
                                                <p>{city}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </aside>
                        <section className="mainSection">
                            <h2>{prod.serviceName}</h2>
                            <div className="descPack">
                                <NaturalDescription text={prod.serviceDescription} />
                            </div>
                            <div className={styles.tabsSection}>
                                <ProductTabs gallery={prod.serviceGallery} features={prod.serviceFeatures} addService={prod.additionalService.services} reviews={prod.serviceReviews.reviews} />
                            </div>
                        </section>
                    </div>
                    
                </div>
            }
        </> 
    );
}
 
export default ProductCard;