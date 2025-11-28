'use client'
import { useEffect, useState, use } from 'react';

import styles from './product.module.css';
import ProductTabs from '@/app/(components)/tabs/pages';
const ProductCard = ({params}) => {
    const [prod, setProd] = useState([]);  
    const {id} = use(params)
    useEffect(() => {
      fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => {
          const product = data.find((product) => product.id === id);
          if (product) {
            console.log(product)
            setProd(product); 
          } else {
            console.log('Case study not found');
          }
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return ( 
        <div className='main'>
            <header>
                <img className={styles.bannerImg} src="/images/productPage/productPageBanner.png" alt="Banner" />
            </header>
            <div className={styles.mainContent}>
                <aside className={styles.aside}>
                    <div className={styles.vendor}>
                        <div className={styles.vendorImgPack}>
                            <img className={styles.vendorImg} src="/images/productPage/userImg.png" alt="vendor" />
                        </div>
                        
                        <div className={styles.vendorDetails}>
                            <p className={styles.vendorName}>Tee Home of Decor.</p>
                            <p style={{color:"#636363"}}>Joined March 2025</p>
                            <div className={styles.catPill}>
                                <li>Decoration</li>
                            </div>
                        </div>

                        <div className={styles.ratingPack}>
                            <p className={styles.rating}>RATING</p>
                            <img className={styles.ratingStars} src="/images/productPage/ratings.png" alt="ratings" />
                            <p style={{fontWeight:700}}>4.7 Stars  |  32 Reviews</p>
                        </div>
                    </div>

                </aside>
                <section className={styles.mainSection}>
                    <h2>Lavish Interior Designs for all Kinds of Events</h2>
                    <div className={styles.descPack}>
                        <p>Transform any space into a breathtaking experience with our Lavish Interior Designs for All Kinds of Events. Whether you are hosting a wedding, corporate gathering, birthday celebration, or private dinner, we bring creativity and elegance together to give your event the atmosphere it deserves.</p>
                        <br />
                        <p>At Tee Home of Decor, we believe that decoration is more than beauty; it is the art of creating memories through design. Our team of professionals works closely with every client to understand their vision, theme, and personal taste, crafting unique concepts that reflect their story and style.</p>
                        <br />
                        <p>From grand stage setups and soft ceiling draping to floral installations, lighting, and table styling, every element is thoughtfully curated to create harmony and sophistication. We use only quality materials and timeless designs that enhance both the space and the mood of your event.</p>
                    </div>
                    <div className={styles.tabsSection}>
                        <ProductTabs gallery={prod.media} features={prod.features} addService={prod.additionalService} reviews={prod.reviews} />
                    </div>
                </section>
            </div>
            
        </div>
    );
}
 
export default ProductCard;