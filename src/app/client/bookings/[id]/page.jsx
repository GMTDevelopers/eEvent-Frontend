'use client'
import { use, useEffect, useState } from 'react';
import styles from './bookingItem.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Loading from '@/app/(components)/loading/loading';

const BookingItem = /* async */ ({params}) => {
    const router = useRouter();
    const {id} = use(params);
    const [isData, setIsData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("Authentication token not found. Please log in.");
            // Optionally, redirect to login page
            // router.push('/login');
            setIsLoading(false);
            return;
        }
        fetch(`https://eevents-srvx.onrender.com/v1/clients/bookings/${id}`,{
            headers:{
                authorization:`Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
            setIsData(data.data);
            setIsLoading(false)
            console.log(data);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

    if (!isData) return <Loading />;

    return ( 
        <div>
            <button onClick={() => router.back()} className={styles.backBtn}><ChevronLeft /> go back </button>
            {
                isLoading &&<div>
                    <Loading />
                </div>
            }
            {
                !isLoading && <div className={styles.doubleContainer}>
                    <div className={`mainContent ${styles.mainContent}`}>
                        <aside className="aside">
                            <div className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={isData.vendorProfileImage} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{isData.businessName}</p>
                                    <p style={{color:"#636363"}}>Joined {new Date(isData.dateJoined).toLocaleDateString()}</p>
                                    <div className="catPill">
                                        <li>{isData.category}</li>
                                    </div>
                                </div>

                                <div className="ratingPack">
                                    <p className="rating">RATING</p>
                                    <img className="ratingStars" src="/images/productPage/ratings.png" alt="ratings" />
                                    <p style={{fontWeight:700}}>{isData.vendorRatings.rating} Stars  | {isData.vendorRatings.numberOfReviews} Reviews</p>
                                </div>
                            </div>
                            <div className="descPack">
                                <p className={styles.cityTitle}>Available in these cities</p>
                                <div className={styles.pillsPack}>
                                    <div className={styles.cityPills}>Lagos</div>
                                    <div className={styles.cityPills}>Ibadan</div>
                                    <div className={styles.cityPills}>Ogun</div>
                                    <div className={styles.cityPills}>Osogbo</div>
                                    <div className={styles.cityPills}>Ife</div>
                                    <div className={styles.cityPills}>Akure</div>
                                    <div className={styles.cityPills}>Asaba</div>
                                    <div className={styles.cityPills}>Benin</div>
                                    <div className={styles.cityPills}>Ondo </div>
                                </div>
                                
                            </div>
                        </aside>
                        <section className="mainSection">
                            <h2>VENDOR BOOKING DETAILS </h2>
                            <div className="descPack">
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
                                <li className={styles.vendorItem}>
                                    <p>Years of experience</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.yearsOfExperience} Years</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Business address</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.businessAddress} Years</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Vendor phone number</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.vendorPhoneNumber} Years</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Operating states</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData?.citiesAvailableIn?.map((state)=>(<span key={state}>{state + ',' + " "}</span>))}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Booking date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.bookingDate).toLocaleDateString()}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event type</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.eventType}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event title</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.eventTitle}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event duration</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.eventDuration} hours</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event location</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.eventLocation}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Contact person name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.contactPersonName}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Contact person phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.ContactPersonPhone}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Alternate contact person phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.alternateContactPersonPhone}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event date & time</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.eventDate).toLocaleDateString()} | {isData.eventTime}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Booking status </p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.bookingStatus}</p>
                                </li>
                            </div>
                            <div className="descPack">
                                <p style={{color:"#222222", fontWeight:700}}>SERVICE ORDERED</p>
                                
                                <li className={styles.vendorItem}>
                                    <p> {isData.serviceOrdered.name +' (x'+isData.serviceOrdered.quantity+")" } </p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Unit Price: {isData.serviceOrdered.unitPrice} </p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{isData.serviceOrdered.totalCost}</p>
                                </li>
                                <br />
                                <br />
                                <p style={{color:"#222222", fontWeight:700}}>Additional Services</p>
                                {isData?.AdditionalServices?.map((add)=>(
                                    <li key={add.serviceName} className={styles.vendorItem}>
                                        <p>{add.serviceName}</p>
                                        <p style={{color:"#222222", fontWeight:700}}>₦{add.serviceCost}</p>
                                    </li>
                                ))}
                            </div>
                            <div className="descPack">
                                <li className={styles.vendorItem}>
                                    <p style={{color:"#222222", fontWeight:700}}>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{isData.totalCost}</p>
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