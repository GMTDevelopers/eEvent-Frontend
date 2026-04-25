"use client"
import tabStyles from "@/app/(components)/tabs/tabs.module.css"
import Header from "@/app/(components)/header/page";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/app/navbar/(signIn)/signIn";
import styles from "./support.module.css"
import { Plus } from "lucide-react";
import AddAdmin from "@/app/(components)/addAdmin/addAdmin";
import ButtonLoader from "@/app/(components)/loading/buttonLoader";

const supportCenter = () => {
    const { openModal } = useModal();
    const [accounts, setAccounts] = useState()
    const [roles, setRoles] = useState()
    const router = useRouter();

    const [loading, setLoading] = useState(null);
    const [ctaLoading, setCtaLoading] = useState(null);
    const [error, setError] = useState()
    const token = localStorage.getItem("access_token");
    //tabs
    const [activeTab, setActiveTab] = useState('Admin accounts');
    const tabs = [
        { key: 'Admin accounts', label: 'Admin accounts' },
        { key: 'Roles', label: 'Roles' },
        { key: 'Reviews', label: 'Reviews' },
        { key: 'Audit trail', label: 'Audit trail' },
    ];
    const handleAddAcct = () => {
        openModal(<AddAdmin />)
    }

    const handleDisable = (id) => {
        setCtaLoading(true)
        fetch(`https://eevents-srvx.onrender.com/v1/admin/accounts/${id}/disable`,{
            method: "PATCH",
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) =>{ 
            return res.json()
        })
        .then((data) => {            
            console.log("disable admin", data)
            if(data.status === "success"){
                alert("Account disabled")
                setCtaLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }) 
        .catch((error) => console.error("Error fetching data:", error))
        .finally( ()=> {
                setCtaLoading(false)
            }  
        )
    }
    const handleDelete = (id) => {
        setCtaLoading(true)
        fetch(`https://eevents-srvx.onrender.com/v1/admin/accounts/${id}`,{
            method: "DELETE",
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) =>{ 
            return res.json()
        })
        .then((data) => {            
            console.log("delete admin", data)
            if(data.status === "success"){
                setCtaLoading(false)
                alert("Account disabled")
                setTimeout(() => {
                    window.location.reload()
                }, 1000);
            }
        }) 
        .catch((error) => console.error("Error fetching data:", error))
        .finally( ()=> {
            setCtaLoading(false)
            }  
        )
    }

    useEffect(() => {
        setLoading(true);
        
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getRoles = () => {
            fetch(`https://eevents-srvx.onrender.com/v1/admin/roles`,{
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
                 if (data.code === 403) {
                    setError("user does not have the permission to view this data")
                } 
                console.log("admin roles", data)
                setRoles(data.data || []);
            }) 
            .catch((error) =>{
            
                console.error("Error fetching data:", error)
                setError(error.message)
            })
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }
        const getAccounts = () => {
            fetch(`https://eevents-srvx.onrender.com/v1/admin/accounts`,{
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
                if (data.code === 403) {
                    setError("user does not have the permission to view this data")
                } 
                console.log("admin accounts", data)
                setAccounts(data.data || []);
            }) 
            .catch((error) => {
                console.error("Error fetching data:", error)
                setError(error.message)
            })
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }


        getAccounts()
        getRoles()

    }, [ ]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Admin accounts':
                return (
                    <div className={styles.adminAccountsContainer}>
                        <div className={styles.adminAccounts}>
                            <div className={styles.accountHeader}>
                                <p className="txtHeader">ACCOUNT</p>
                                <p className="txtHeader">ROLE</p>
                                <p className="txtHeader">ACTION</p>
                            </div>
                          { accounts?.map((acct)=>(
                            <div className={styles.accountPack}> 
                                <p style={{color:"#636363"}}>{acct.email}</p>
                                <p>{acct.appRoles[0].name}</p>
                                {
                                    ctaLoading ? <ButtonLoader /> :                                
                                    <ul>
                                        <li style={{color:"#82027D"}}>edit</li>
                                        <li onClick={handleDisable(acct.id)} style={{color:"#82027D"}}>disable</li>
                                        <li onClick={handleDelete(acct.id)} style={{color:"#E50909"}}>delete</li>
                                    </ul>
                                }
                            </div> ))}  

                        </div> <br />
                        {error && <p style={{color:"#E50909"}}>{error}</p>}
                        <br />
                        <button onClick={handleAddAcct} className={`${tabStyles.tab} ${tabStyles.active}`}>
                           <Plus /> Add account
                        </button> 

                    </div>
                    
                )
/*             case 'Roles':
                return clientData?.length != 0 ? ( 
                    <AdminClientTable bookings={clientData} />
                ): (
                    <AdminClientTable bookings={[]} />
                );
            case 'Reviews':
                return vendorData?.length != 0 ? (
                    <AdminVendorTable bookings={vendorData} />
                    
                ) : (
                    <AdminVendorTable bookings={[]} />
                );
            case 'Audit trail':
                return clientData?.length != 0 ? ( 
                    <AdminClientTable bookings={clientData} />
                ): (
                    <AdminClientTable bookings={[]} />
                ); */
            default:
                return null;
        }
        
    };


    return ( 
        <div className="main">
            <br />
           <Header img='/images/servicePage/serviceBG.png' header='eEvents Admin Dashboard' subHeader='Manage all platform activities.'  />
            <br />
            <div>         
                <div className={`${tabStyles.tabBar} ${tabStyles.doubleTabBar}`}>
                    <div>
                        {tabs.map((tab) => (
                            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`${tabStyles.tab} ${activeTab === tab.key ? tabStyles.active : ''}`}>
                                {tab.label}
                            </button>
                        ))}
                    </div>                        
                    <button onClick={() => router.push(`/admin/servicesBookings/tickets/addTicket`)} className={`${tabStyles.tab} ${tabStyles.active}`} >Add ticket listing</button>
                </div>
            </div>
            <br />
            <br /><br />
            <div className="table">
                {renderContent()}
            </div>
            
        </div>
    );
}
 
export default supportCenter;