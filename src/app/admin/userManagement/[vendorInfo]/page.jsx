'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import { use, useEffect, useState } from 'react';
import styles from './settings.module.css';
import Styles from '@/app/(components)/bookingsTable/BookingsTable.module.css';
import SettingsTabs from '@/app/(components)/vendorTabs/pages';
import SignIn from '@/app/navbar/(signIn)/signIn';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
const Settings = ({params}) => {
    const {vendorInfo} = use(params);
    const {logedInUser} = useAuth()
    const [idOpen, setIdOpen] = useState(false);
    const [idOpen2, setIdOpen2] = useState(false);
    const [regOpen, setRegOpen] = useState(false);
    const [vendorData, setVendorData] = useState();
    const [loading, setLoading] = useState(false);
    const { openModal } = useModal();
    const router = useRouter();

     useEffect(() => {
            setLoading(true);
            const token = localStorage.getItem("access_token");
            if (!token) {
                openModal(<SignIn />)
                return;
            }
            const getStats = () => {
                fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${vendorInfo}`,{
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
                    console.log("vendor user", data.data)
                    setVendorData(data.data || []);
                }) 
                .catch((error) => console.error("Error fetching data:", error))
                .finally( ()=> {
                        setLoading(false);
                    }  
                )
            }
    
           /*  const getVendor = (page = 1) => {
                const skip = (page - 1) * TAKE;
                const query = new URLSearchParams({
                    skip,
                    take: TAKE,
                });
                 if (searchValue) {
                    query.append("search", searchValue);
                }
                fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors?${query.toString()}`,{
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
                    console.log("vendor data", data.data)
                    setVendorData(data.data || []);
                    const { total, take } = data.data.meta || {};
                    setVendorTotalPages(total/take || 0);
                }) 
    
                .catch((error) => console.error("Error fetching data:", error))
                .finally( ()=> {
                        setLoading(false);
                    }  
                )
            }
    
            const getClient = (page = 1) => {
                const skip = (page - 1) * TAKE;
                const query = new URLSearchParams({
                    skip,
                    take: TAKE,
                });
                 if (searchValue) {
                    query.append("search", searchValue);
                }
                fetch(`https://eevents-srvx.onrender.com/v1/admin/clients?${query.toString()}`,{
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
                    console.log("client data", data.data)
                    setClientData(data.data || []);
                    const { total, take } = data.data.meta || {};
                    setClientTotalPages(total/take || 0);
                }) 
                .catch((error) => console.error("Error fetching data:", error))
                .finally( ()=> {
                        setLoading(false);
                    }  
                )
            } */
            getStats()
/*             getVendor(vendorCurrentPage)
            getClient(clientCurrentPage) */
        }, []);
    

    
    return ( 
        <div className={`main ${styles.settings}`}>
            <button onClick={() => router.back()} className={`backBtn`}><ChevronLeft /> go back </button>
            <div className={styles.settingsContainer}>
                <div style={{ textAlign: "center", alignItems:"center"}}>
                    <div className={styles.photoPack}>
                        <div className={styles.photoItem}>
                            <img src={vendorData?.profileImage || '/images/defaultDP.jpg'} alt="profile" />
                        </div>
                        <div className={styles.photoItem}>
                            <img src={vendorData?.serviceLogo || '/images/defaultDP.jpg'} alt="profile" />
                        </div>
                    </div>
                    <br />
                    
                    <h2>{vendorData?.businessName}</h2>
                    <p>{vendorData?.vendorName}</p>
                    <div className={styles.settingsContainer}>
                        <li className='vendorItem'>
                            <p>Vendor ID</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.vendorID}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Personal ID</p>
                            <p onClick={() => setIdOpen(true)} style={{color:"#82027D", fontWeight:500, cursor: "pointer"}}>View ID</p>
                        </li>
                        <Lightbox open={idOpen} close={() => setIdOpen(false)} slides={[{ src:vendorData?.vendorID || "/images/defaultDP.jpg" }]} />
                        <li className='vendorItem'>
                            <p>Category</p>
                            <p style={{color:"#82027D", fontWeight:700}}>{vendorData?.category}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business certificate</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.vendorName}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Date registered</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(vendorData?.dateRegistered).toDateString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Service listings</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.serviceListingsCount}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Total bookings</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.totalBookings}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Total clients</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.totalClients}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Last booking</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(vendorData?.lastBooking).toDateString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Average rating</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.averageRating}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Account status</p>
                            <p className={`${Styles[vendorData?.accountStatus.toLowerCase()]}`} style={{fontWeight:700}}>{vendorData?.accountStatus}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Subscription status</p>
                            <p className={`${Styles[vendorData?.subscriptionStatus.toLowerCase()]}`} style={{fontWeight:700}}>{vendorData?.subscriptionStatus}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Last login</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(vendorData?.lastLogin).toDateString()}</p>
                        </li>
                                                            <h3>Personal Info</h3>
                        <li className='vendorItem'>
                            <p>Surname</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.surname}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>FIrst name</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.firstName}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Other name</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.otherNames}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Email address</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.emailAddress}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Phone number</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.phoneNumber}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Email notification alerts</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.personalInfo.emailNotificationAlerts || 'N/A'}</p>
                        </li>
                                                            <h3>Business Profle</h3>
                        <li className='vendorItem'>
                            <p>Means of Identification</p>
                            <p onClick={() => setIdOpen2(true)} style={{color:"#82027D", fontWeight:600, cursor: "pointer"}}>View </p>
                        </li>
                        <Lightbox open={idOpen2} close={() => setIdOpen2(false)} slides={[{ src:vendorData?.businessCertificateURL || "/images/defaultDP.jpg" }]} />
                        <li className='vendorItem'>
                            <p>ID No.</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.idNumber || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business name</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.businessName}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business category</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.businessCategory}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business registration</p>
                            <p onClick={() => setRegOpen(true)} style={{color:"#82027D", fontWeight:600, cursor: "pointer"}}>view</p>
                        </li>
                        <Lightbox open={regOpen} close={() => setRegOpen(false)} slides={[{ src:vendorData?.businessCertificateURL || "/images/defaultDP.jpg" }]} />
                        <li className='vendorItem'>
                            <p>Years of experience</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.yearsOfExperiencec || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business description</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.businessDescription || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Business address</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.businessAddress || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Country of operation</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.countryOfOperation || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Operating states</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.businessProfile.operatingStates || "N/A"}</p>
                        </li>
                                                            <h3>Subscription Info</h3>
                        <li className='vendorItem'>
                            <p>Current plan</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.subscriptionInfo.currentPlan}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Price</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.subscriptionInfo.price}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Last payment date</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(vendorData?.additionalVendorDetails.subscriptionInfo.lastPaymentDate).toDateString()}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Next billing date</p>
                            <p style={{color:"#222222", fontWeight:700}}>{new Date(vendorData?.additionalVendorDetails.subscriptionInfo.nextBillingDate).toDateString() || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Days left on current subscription</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.subscriptionInfo.daysLeftOnCurrentSubscription}</p>
                        </li>
                                                            <h3>Bank Details</h3>
                        <li className='vendorItem'>
                            <p>Bank Name</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.bankDetails?.bankName || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Account Type</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.bankDetails?.accountType || "N/A"}</p>                      
                        </li>
                        <li className='vendorItem'>
                            <p>Account Number</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.bankDetails?.accountNumber || "N/A"}</p>
                        </li>
                        <li className='vendorItem'>
                            <p>Account Name</p>
                            <p style={{color:"#222222", fontWeight:700}}>{vendorData?.additionalVendorDetails.bankDetails?.accountName || "N/A"}</p>
                        </li>
                    </div>
                </div>
                

          {/*       <SettingsTabs /> */}
            </div>
            
        </div>
    );
}
 
export default Settings;