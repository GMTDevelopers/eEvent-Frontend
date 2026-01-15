'use client'
import styles from '../bookings/[id]/bookingItem.module.css';
import xStyles from './service.module.css'
import SearchFilter from '@/app/(components)/search/page';
import StatsCard from '@/app/(components)/statsCard/page';
import { CheckCheck, Loader, Minimize2, Star, X } from 'lucide-react';
import ProductCard from '@/app/(components)/productCard/page';
import Header from '@/app/(components)/header/page';

const VendorServices = /* async */ () => {




    return ( 
        <div>
            <div className={`main ${xStyles.serviceMain}`}>
                <Header img='/images/servicePage/serviceBG.png' header='Find trusted event services near you.' subHeader='Your next great event starts here.' />
                <div className="stats">
                    <SearchFilter name="My Services" page="vendorService"/>                    
                    <div className="statsPack">
                        <StatsCard title="ACTIVE SERVICES" data='1' icon={Minimize2} />
                        <StatsCard title="PENDING SERVICES" data='1' icon={Loader} />
                        <StatsCard title="BOOKINGS THIS MONTH" data='3' icon={CheckCheck} />
                        <StatsCard title="OVERALL RATING" data='4.5' icon={Star} />
                    </div>
                </div>
            </div>
            
            <div className={styles.doubleContainer}>
                <div className="mainContent">
                    <aside className="aside">
                        <div className={`vendor ${styles.vendor}`}>
                            <div className="vendorImgPack">
                                <img className="vendorImg" src="/images/productPage/userImg.png" alt="vendor" />
                            </div>
                            
                            <div className="vendorDetails">
                                <p className="vendorName">Tee’s Sweet Treats</p>
                                <p style={{color:"#636363"}}>Joined March 2025</p>
                                <div className="catPill">
                                    <li>Catering</li>
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
                        <h3>ACTIVE SERVICES (1) </h3>
                        <div className={xStyles.activeService}>
                            <ProductCard 
                                title="Food For All Events"
                                description="Get your food ready and available for all your indoor and outdoor events at budget friendly prices." 
                                category="Catering"
                                ratings="4.5"
                                price="500,000"
                                thumb='/images/products/prod6.png'
                            />
                            <ProductCard 
                                title="Food For All Events"
                                description="Get your food ready and available for all your indoor and outdoor events at budget friendly prices." 
                                category="Catering"
                                ratings="4.5"
                                price="500,000"
                                thumb='/images/products/prod6.png'
                            />
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