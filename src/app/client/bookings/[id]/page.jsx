'use client'
import { use, useEffect, useState } from 'react';
import styles from './bookingItem.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
const BookingItem = /* async */ ({params}) => {
    const router = useRouter();
    const {id} = use(params);
    const [isData, setIsData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        fetch("/data/clientTransaction.json")
            .then((res) => res.json())
            .then((data) => {
            setIsData(data.find((b) => b.id === id));
            setIsLoading(false)
            console.log(data.find((b) => b.id === id));
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (!isData) return <p>No yoyoyoy booking found</p>;

    return ( 
        <div>
            <button onClick={() => router.back()} className={styles.backBtn}> go back </button>
            {
                isLoading &&<div>
                    Loading........
                </div>
            }
            {
                !isLoading && <div className={styles.doubleContainer}>
                    <p>loading done and data will now be displayed</p> 
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
                            <h2>VENDOR BOOKING DETAILS </h2>
                            <div className={styles.descPack}>
                                <li className={styles.vendorItem}>
                                    <p>Client Name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.clientName}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Business name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.businessName}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Business category</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.category}</p>
                                </li>
                            </div>
                        </section>
                    </div>
            
                </div>
            }
        </div>
    );
}
 
export default BookingItem;