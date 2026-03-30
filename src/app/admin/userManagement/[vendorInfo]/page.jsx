'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import { use, useEffect, useState } from 'react';
import styles from './settings.module.css';
import SettingsTabs from '@/app/(components)/vendorTabs/pages';
const Settings = ({params}) => {
    const {vendorInfo} = use(params);
    const {logedInUser} = useAuth()
    const [passportPhoto, setPassportPhoto] = useState(logedInUser.data.profileImage || '/images/defaultDP.jpg' )
    const [businessLogo, setBusinessLogo] = useState(logedInUser.data.profileImage || '/images/defaultDP.jpg' )
    const [vendorData, setVendorData] = useState();
    const [loading, setLoading] = useState(false);


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
                    <h2>{vendorData.businessName}</h2>
                    <p>{vendorData.vendorName}</p>
                    <div className="catPill">
                        <li>{vendorData.category}</li>
                    </div>
                </div>
                

          {/*       <SettingsTabs /> */}
            </div>
            
        </div>
    );
}
 
export default Settings;