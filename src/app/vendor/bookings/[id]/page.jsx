'use client'
import { use, useEffect, useState } from 'react';
import styles from './bookingItem.module.css';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, Download } from 'lucide-react';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import Accept from '@/app/(components)/vendorAcceptBooking/page';
import Message from '@/app/(components)/message/pages';
import Contact from '@/app/(components)/Contact/pages';
import Loading from '@/app/(components)/loading/loading';
import { useAuth } from '@/app/contexts/AuthContext';
import VendorReject from '@/app/(components)/vendorRejectBooking/page';
const BookingItem = /* async */ ({params}) => {
    const router = useRouter();
    const {id} = params;
    const [isData, setIsData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { openModal } = useModal();
    const {refreshAccessToken} = useAuth()


    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            console.error("Authentication token not found. Please log in.");
            setIsLoading(false);
            openModal(<SignIn />);
            return;
        }

        fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (res.status === 401) {
                    refreshAccessToken()
                }

                if (!res.ok) {
                    throw new Error("Something went wrong");
                }

                return res.json();
            })
            .then((data) => {
                setIsData(data.data);
                setIsLoading(false);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setIsLoading(false);
            });

    }, []);


    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            console.error("Authentication token not found. Please log in.");
            setIsLoading(false);
            openModal(<SignIn />)            
            return;
        }
        fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}`,{
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
            .catch((error) => {
                console.error("Error fetching data:", error)
                setIsLoading(false)
            });
    }, []);

    if (isData.length === 0 && !isLoading) return <p>No booking found</p>;

    return ( 
        <div>
            <button onClick={() => router.back()} className={`section ${styles.backBtn}`}><ChevronLeft /> go back </button>
             {
                isLoading &&<div>
                    <Loading />
                </div>
            }
            {
                isData.length !== 0 && !isLoading && <div className={styles.doubleContainer}>
                    <div className="mainContent">
                        <aside className="aside">
                            <div className={`vendor ${styles.vendor}`}>
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={isData.clientProfileImage || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{isData.clientName}</p>
                                    <p style={{color:"#636363"}}>Joined March 2025</p>
                                </div>
                                <br />
                                <div className="vendorDetails">
                                    <p style={{fontWeight:700}}>{isData.clientPhoneNumber}</p>
                                    <p style={{color:"#636363"}}>Phone number</p>
                                </div>
                            </div>
                        </aside>
                        <section className="mainSection">
                            <h2>BOOKING DETAILS </h2>
                            <div className="descPack">
                                <li className={styles.vendorItem}>
                                    <p>Client Name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.clientName}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Client phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.clientPhoneNumber}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Client email</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.clientEmail}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Booking date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.bookingDate).toDateString()}</p>
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
                                    <p>Event date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.bookingDate).toDateString()}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Event time</p>
                                    <p style={{color:"#222222", fontWeight:700}}> {isData.eventTime}</p>
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
                                    <p>Service booked</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.serviceBooked}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Units needed</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.unitsNeeded}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Additional service</p>
                                    <p style={{color:"#222222", fontWeight:700}}>
                                        {isData.serviceOrdered?.AdditionalServices?.map((add)=>(
                                            <>{add.name}</>
                                        ))}
                                    </p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Preferred setup date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.preferredSetupDate).toDateString()}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Preferred setup time</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(isData.preferredSetupTime).toLocaleTimeString()}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Special instructions</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.specialInstructions}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Contact person name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.contactPersonName}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Contact person phone number</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.contactPersonPhone}</p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Alternate contact person phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{isData.AltContactPersonPhone}</p>
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
                                    <p>Unit Price: ₦{isData.serviceOrdered.unitPrice} </p>
                                </li>
                                <li className={styles.vendorItem}>
                                    <p>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{isData.serviceOrdered.subtotal}</p>
                                </li>
                                <br />
                                <br />
                                <p style={{color:"#222222", fontWeight:700}}>Additional Services</p>
                                {isData.AdditionalServices?.map((add)=>(
                                    <li className={styles.vendorItem}>
                                        <p>{add.serviceName}</p>
                                        <p style={{color:"#222222", fontWeight:700}}>₦{add.serviceCost}</p>
                                    </li>
                                ))}
                            </div> 

                            <div className="descPack">
                                <li className={styles.vendorItem}>
                                    <p style={{color:"#222222", fontWeight:700}}>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{isData.serviceOrdered.totalCost}</p>
                                </li>
                            </div>
                            {/* When the Job has not been accepted yet? */}
                            <div className={styles.action}>
                                <p style={{color:"#E50909", fontWeight:600}} onClick={() => openModal(<VendorReject />)}>Reject  booking</p>
                                <p style={{color:"#2ED074", fontWeight:600}} onClick={() => openModal(<Accept />)}>Accept booking</p>
                            </div>
                            
                            {/*After the job has been accepted */}
                            <div className={styles.CTABtn}>
                                <p><Download /> Export PDF</p>
                                <div>
                                    <p onClick={() => openModal(<Message />)}>Message client</p>
                                    <p>Mark completed</p>
                                    <p onClick={() => openModal(<Contact />)}>Contact support</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                </div>
            }
        </div>
    );
}
 
export default BookingItem;