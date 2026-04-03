"use client"
import tabStyles from "@/app/(components)/tabs/tabs.module.css"
import Header from "@/app/(components)/header/page";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SignIn from "@/app/navbar/(signIn)/signIn";

const supportCenter = () => {
    const { openModal } = useModal();
    const [stats, setStats] = useState()
    const router = useRouter();
    
    const [vendorData, setVendorData] = useState([]);
    const [clientData, setClientData] = useState([]);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState()

    //tabs
    const [activeTab, setActiveTab] = useState('Admin accounts');
    const tabs = [
        { key: 'Admin accounts', label: 'Admin accounts' },
        { key: 'Roles', label: 'Roles' },
        { key: 'Reviews', label: 'Reviews' },
        { key: 'Audit trail', label: 'Audit trail' },
    ];

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getAccounts = () => {
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
                console.log("admin accounts", data)
                setStats(data.data || []);
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        /* const getVendor = () => {
            fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors`,{
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
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        const getClient = () => {
            fetch(`https://eevents-srvx.onrender.com/v1/admin/clients`,{
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
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        } */
        getAccounts()
  /*       getVendor()
        getClient() */
    }, [ ]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Admin accounts':
                return (
                    <p>Admin accounts</p>
                    
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