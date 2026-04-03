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
import SignIn from '@/app/navbar/(signIn)/signIn';
import { Rating } from 'react-simple-star-rating';
import ManageReschedule from '@/app/(components)/adminCancle/managecancle';
/* import VendorReject from '@/app/(components)/vendorRejectBooking/page'; */
const BookingItem = /* async */ ({params}) => {
    const router = useRouter();
    const {id} = use(params);
    const [bookingData, setBookingData] = useState([])
    const [vendorData, setVendorData] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const { openModal } = useModal();


    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getBookingsDetails = () => {      
            fetch(`https://eevents-srvx.onrender.com/v1/bookings/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                if (res.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                    router.refresh();
                }
                return res.json()
            })
            .then((data) => {    
                setBookingData(data.data)        
                console.log("booking details",data);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }
        const getVendorDetails = (vendorId) => {      
            fetch(`https://eevents-srvx.onrender.com/v1/vendors/${vendorId}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                return res.json()
            })
            .then((data) => {    
                setVendorData(data.data)        
                console.log("vendor data",data);
                console.log(vendorId);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }

        getBookingsDetails()
        getVendorDetails()
    }, []);

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getVendorDetails = () => {      
            fetch(`https://eevents-srvx.onrender.com/v1/vendors/${bookingData.vendorId}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                return res.json()
            })
            .then((data) => {    
                setVendorData(data.data)        
                console.log("vendor data",data);
                console.log(bookingData.vendorId);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }
        getVendorDetails()
    }, [bookingData]);

    if (bookingData?.length === 0 && !isLoading) return <p>No booking found</p>;

    return ( 
        <div>
            <button onClick={() => router.back()} className={`section backBtn`}><ChevronLeft /> go back </button>
             {
                isLoading &&<div>
                    <Loading />
                </div>
            }
            {
                bookingData?.length !== 0 && !isLoading && <div className={styles.doubleContainer}>
                    <div className="mainContent">
                        <aside className="aside">
                            <div className={`vendor ${styles.vendor}`}>
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={bookingData?.clientProfileImage || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div style={{margin:"auto"}} className="catPill">
                                    <li>Client</li>
                                </div>
                                <br />
                                <div className="vendorDetails">
                                    <p className="vendorName">{bookingData?.clientName}</p>
                                    <p style={{color:"#636363"}}>Joined March 2025</p>
                                </div>
                                <br />
                                <div className="vendorDetails">
                                    <p style={{fontWeight:700}}>{bookingData?.clientPhoneNumber}</p>
                                    <p style={{color:"#636363"}}>Phone number</p>
                                </div>
                            </div>
                            <br /><br /><br /><br /><br /><br /><br />
                            <div className="vendor">
                                <div className="vendorImgPack">
                                    <img className="vendorImg" src={vendorData?.business?.logo || "/images/defaultDP.jpg"} alt="vendor" />
                                </div>
                                
                                <div className="vendorDetails">
                                    <p className="vendorName">{vendorData?.business.name}</p>
                                   {/*  <p style={{color:"#636363"}}>{new Date(vendorData?.business.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric", })}</p> */}
                                    <div className="catPill">
                                        <li>Vendor</li>
                                    </div>
                                </div>
                            </div>
                        </aside>
                        <section className="mainSection">
                            <h2>BOOKING DETAILS </h2>
                            <div className="descPack">
                                <li className='vendorItem'>
                                    <p>Client Name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.clientName}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Client phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.clientPhoneNumber}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Client email</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.clientEmail}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Booking date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(bookingData?.createdAt).toDateString()}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event type</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.eventType}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event title</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.eventTitle}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(bookingData?.eventDate).toDateString()}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event time</p>
                                    <p style={{color:"#222222", fontWeight:700}}> {bookingData?.eventTime || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event duration</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.eventDuration || "Not Stated"} hours</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Event location</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.eventLocation || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Service booked</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.serviceBooked}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Units needed</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.unitsNeeded}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Additional service</p>
                                    <p style={{color:"#222222", fontWeight:700}}>
                                        {bookingData?.AdditionalServices?.map((add)=>(
                                            <>{add.name}</>
                                        ))}
                                    </p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Preferred setup date</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(bookingData?.preferredSetupDate).toDateString()}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Preferred setup time</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{new Date(bookingData?.preferredSetupTime).toLocaleTimeString()}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Special instructions</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.specialInstructions || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Contact person name</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.contactPersonName || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Contact person phone number</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.contactPersonPhone || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Alternate contact person phone</p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.AltContactPersonPhone || "Not Stated"}</p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Booking status </p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.bookingStatus}</p>
                                </li>                               
                                <li className='vendorItem'>
                                    <p>Payment status </p>
                                    <p style={{color:"#222222", fontWeight:700}}>{bookingData?.paymentStatus}</p>
                                </li>                               
                            </div>

                            <div className="descPack">
                                <p style={{color:"#222222", fontWeight:700}}>SERVICE ORDERED</p>
                                
                                <li className='vendorItem'>
                                    <p> {bookingData?.serviceOrdered.name +' (x'+bookingData?.serviceOrdered.quantity+")" } </p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Unit Price: ₦{bookingData?.serviceOrdered.unitPrice.toLocaleString()} </p>
                                </li>
                                <li className='vendorItem'>
                                    <p>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{bookingData?.serviceOrdered.subtotal.toLocaleString()}</p>
                                </li>
                                <br />
                                <br />
                                <p style={{color:"#222222", fontWeight:700}}>Additional Services</p>
                                {bookingData?.AdditionalServices?.map((add)=>(
                                    <li className='vendorItem'>
                                        <p>{add.serviceName}</p>
                                        <p style={{color:"#222222", fontWeight:700}}>₦{add.serviceCost}</p>
                                    </li>
                                ))}
                            </div> 

                            <div className="descPack">
                                <li className='vendorItem'>
                                    <p style={{color:"#222222", fontWeight:700}}>Total Cost:</p>
                                    <p style={{color:"#222222", fontWeight:700}}>₦{bookingData?.serviceOrdered.totalCost.toLocaleString()}</p>
                                </li>
                            </div>
                            
                        {/*     <div className={styles.action}>
                                <p style={{color:"#E50909", fontWeight:600}} onClick={() => openModal(<ManageReschedule 
                                eventId={bookingData?.bookingId} oldDate={bookingData?.initialEventDate} 
                                newDate={bookingData?.lastProposedDate} totalAmount={bookingData?.serviceOrdered.totalCost} id={id} 
                                resReason="a" rejReason={bookingData?.rescheduleRejectReason} cStatus={bookingData?.}
                                />)}>Manage reschedule request</p>
                                <p style={{color:"#2ED074", fontWeight:600}} onClick={() => openModal(<Accept />)}>Accept booking</p>
                            </div>  */}
                            
                            {/*After the job has been accepted */}
                            <div className={styles.CTABtn}>
                                <p><Download /> Export PDF</p>
                                <div>
                                    <p onClick={() => openModal(<Message bookingId={bookingData?.bookingId} receiverId={bookingData.clientId} />)}>Message client</p>
                                    <p onClick={() => openModal(<Message bookingId={bookingData?.bookingId} receiverId={bookingData?.vendorId}/>)}>Message Vendor</p>
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