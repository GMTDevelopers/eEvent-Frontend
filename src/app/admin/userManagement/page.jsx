"use client"
import VendorEarningsTable from "@/app/(components)/bookingsTable/vendorEarningsTable";
import tabStyles from "@/app/(components)/tabs/tabs.module.css"
import Header from "@/app/(components)/header/page";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import Pagination from "@/app/(components)/pagination/page";
import SearchFilter from "@/app/(components)/search/page";
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Loader, Minimize2, Star, User, User2, UserCheck, UserCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminVendorTable from "@/app/(components)/bookingsTable/adminVendorTable";
import { useRouter } from "next/navigation";
import AdminClientTable from "@/app/(components)/bookingsTable/adminClientTable";

const UserManagement = () => {
    const { openModal } = useModal();
    const [stats, setStats] = useState()
    const router = useRouter();
    
    const [vendorData, setVendorData] = useState([]);
    const [clientData, setClientData] = useState([]);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState()
    const TAKE = 10;

    const [vendorCurrentPage, setVendorCurrentPage] = useState(1);
    const [vendorTotalPages, setVendorTotalPages] = useState(0);

    const [clientCurrentPage, setClientCurrentPage] = useState(1);
    const [clientTotalPages, setClientTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    //tabs
    const [activeTab, setActiveTab] = useState('Vendors');
    const tabs = [
        { key: 'Vendors', label: 'Vendors' },
        { key: 'Clients', label: 'Clients' },
    ];

    const handleSearch = (value) => {
        setSearchValue(value);
    };

    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getStats = () => {
            fetch(`https://eevents-srvx.onrender.com/v1/admin/users/stats`,{
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
                console.log("user stats", data.data)
                setStats(data.data || []);
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        const getVendor = (page = 1) => {
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
        }
        getStats()
        getVendor(vendorCurrentPage)
        getClient(clientCurrentPage)
    }, [ searchValue, vendorCurrentPage, clientCurrentPage]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Vendors':
                return vendorData?.length != 0 ? (
                    <AdminVendorTable bookings={vendorData} />
                    
                ) : (
                    <AdminVendorTable bookings={[]} />
                );
            case 'Clients':
                return clientData?.length != 0 ? ( 
                    <AdminClientTable bookings={clientData} />
                ): (
                    <AdminClientTable bookings={[]} />
                );
            default:
                return null;
        }
        
    };
    const handleVendorPageChange = (page) => {
        if (page !== vendorCurrentPage) {
            setVendorCurrentPage(page);
        }
    };
    const handleClientPageChange = (page) => {
        if (page !== clientCurrentPage) {
            setClientCurrentPage(page);
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
                        <button key={tab.key} onClick={() => setActiveTab(tab.key)}
                            className={`${tabStyles.tab} ${
                            activeTab === tab.key ? tabStyles.active : ''
                            }`}
                        >
                            {tab.label}
                        </button>
                        ))}
                    </div>                        
                    <button onClick={() => router.push(`/admin/servicesBookings/tickets/addTicket`)} className={`${tabStyles.tab} ${tabStyles.active}`} >Add ticket listing</button>
                </div>
                <SearchFilter onSearch={handleSearch}/>
            </div>
            <br />
            <div className={`statsPack`}>
                <StatsCard title="TOTAL VENDORS" data={stats?.totalVendors || 0} icon={User2} />
                <StatsCard title="ACTIVE VENDORS" data={stats?.activeVendors || 0} icon={UserCheck2} />
                <StatsCard title="TOTAL USERS" data={stats?.totalUsers || 0} icon={User} />
                <StatsCard title="ACTIVE USERS" data={stats?.activeUsers || 0} icon={UserCheck} />
            </div>
            <br /><br />
            <div className="table">
                {renderContent()}
                {activeTab === 'Vendors' &&
                    <Pagination currentPage={vendorCurrentPage} 
                        totalPages={vendorTotalPages}
                        onPageChange={!loading ? handleVendorPageChange : () => {}}
                    />    
                }
                {activeTab==='Clients' &&
                    <Pagination
                        currentPage={clientCurrentPage} 
                        totalPages={clientTotalPages}
                        onPageChange={!loading ? handleClientPageChange : () => {}}
                    />
                }      
            </div>
            
        </div>
    );
}
 
export default UserManagement;