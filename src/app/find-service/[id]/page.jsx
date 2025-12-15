'use client'
import { useEffect, useState, use } from 'react';

import styles from './product.module.css';
import ProductTabs from '@/app/(components)/tabs/pages';
import NaturalDescription from '@/app/(components)/natural-text/page';
import Link from 'next/link';
/* https://grok.com/share/c2hhcmQtNQ_54091b1e-a166-46e9-8be2-895e1d5297bf */ /* chat to creating the input */
const ProductCard = ({params}) => {
    const [prod, setProd] = useState([]);  
    const {id} = use(params)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
      fetch("/data/data.json")
        .then((res) => res.json())
        .then((data) => {
          const product = data.find((product) => product.id === id);
          if (product) {
            console.log(product)
            setProd(product); 
            setLoading(false)
          } else {
            console.log('Case study not found');
          }
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, []);

    return ( 
        <>
            { !loading &&
                <div className='main'>
                    <header className="header">
                        <img className="bannerImg" src={prod.thumb} alt="Banner" />
                    </header>
                    <div className="mainContent">
                        <aside className="aside">
                            <div className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={prod.vendor.dp} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{prod.vendor.name}.</p>
                                    <p style={{color:"#636363"}}>Joined March 2025</p>
                                    <div className="catPill">
                                        <li>{prod.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <img className="ratingStars" src="/images/productPage/ratings.png" alt="ratings" />
                                    <p style={{fontWeight:700}}>4.7 Stars  |  32 Reviews</p>
                                </div>
                            </div>
                            <div className="bookingPricing">
                                <p className="bookingTitle">BOOKING & PRICING</p>
                                <Link href={`/find-service/${id}/bookVendor?data=${encodeURIComponent(JSON.stringify(prod))}`}><div className={styles.bookVendor}>Book vendor</div></Link> 
                            </div>
                        </aside>
                        <section className="mainSection">
                            <h2>{prod.title}</h2>
                            <div className="descPack">
                                <NaturalDescription text={prod.description} />
                            </div>
                            <div className={styles.tabsSection}>
                                <ProductTabs gallery={prod.media} features={prod.features} addService={prod.additionalService} reviews={prod.reviews} />
                            </div>
                        </section>
                    </div>
                    
                </div>
            }
        </> 
    );
}
 
export default ProductCard;