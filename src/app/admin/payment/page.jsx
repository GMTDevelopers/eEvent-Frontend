"use client"
import VendorEarningsTable from "@/app/(components)/bookingsTable/vendor/vendorEarningsTable";
import tabStyles from "@/app/(components)/tabs/tabs.module.css"
import Header from "@/app/(components)/header/page";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import Pagination from "@/app/(components)/pagination/page";
import SearchFilter from "@/app/(components)/search/page";
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Loader, Minimize2, Star, User, User2, UserCheck, UserCheck2 } from "lucide-react";
import { useEffect, useState } from "react";
import AdminVendorTable from "@/app/(components)/bookingsTable/admin/adminVendorTable";
import { useRouter } from "next/navigation";
import AdminClientTable from "@/app/(components)/bookingsTable/admin/adminClientTable";
import SignIn from "@/app/navbar/(signIn)/signIn";
import AdminSubscriptionTable from "@/app/(components)/bookingsTable/admin/adminSubscriptionTable";

const Payment = () => {
    const { openModal } = useModal();
    const [stats, setStats] = useState()
    const router = useRouter();
    
    const [paymentData, setpaymentData] = useState([]);
    const [subData, setsubData] = useState([]);

    const [loading, setLoading] = useState(null);
    const [error, setError] = useState()
    const TAKE = 10;

    const [paymentCurrentPage, setpaymentCurrentPage] = useState(1);
    const [paymentTotalPages, setpaymentTotalPages] = useState(0);

    const [subCurrentPage, setsubCurrentPage] = useState(1);
    const [subTotalPages, setsubTotalPages] = useState(0);
    const [searchValue, setSearchValue] = useState("");

    //tabs
    const [activeTab, setActiveTab] = useState('Payment History');
    const tabs = [
        { key: 'Payment History', label: 'Payment History' },
        { key: 'Vendor Subscriptions', label: 'Vendor Subscriptions' },
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
            fetch(`https://eevents-srvx.onrender.com/v1/admin/transactions?${query.toString()}`,{
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
                console.log("transactions data", data.data)
                setpaymentData(data.data || []);
                const { total, take } = data.data.meta || {};
                setpaymentTotalPages(total/take || 0);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        const getSubscriptions = (page = 1) => {
            const skip = (page - 1) * TAKE;
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
             if (searchValue) {
                query.append("search", searchValue);
            }
            fetch(`https://eevents-srvx.onrender.com/v1/admin/subscriptions/vendors?${query.toString()}`,{
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
                console.log("subscriptions data", data.data)
                setsubData(data.data || []);
                const { total, take } = data.data.meta || {};
                setsubTotalPages(total/take || 0);
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }
        getStats()
        getVendor(paymentCurrentPage)
        getSubscriptions(subCurrentPage)
    }, [ searchValue, paymentCurrentPage, subCurrentPage]);

    const renderContent = () => {
        switch (activeTab) {
            case 'Payment History':
                return paymentData?.length != 0 ? (
                    <div>
                        <p>this is payment</p>
                        {/* <AdminVendorTable bookings={paymentData} /> */}
                    </div>
                    
                    
                ) : (
                    <div>
                        <p>this is no payment</p>
                        {/* <AdminVendorTable bookings={paymentData} /> */}
                    </div>
                   
                );
            case 'Vendor Subscriptions':
                return subData?.length != 0 ? ( 
                    <div>
                        <AdminSubscriptionTable bookings={subData} />
                    </div>
                ): (
                    <div>
                        <AdminSubscriptionTable bookings={[]} />
                    </div>
                );
            default:
                return null;
        }
        
    };
    const handleVendorPageChange = (page) => {
        if (page !== paymentCurrentPage) {
            setpaymentCurrentPage(page);
        }
    };
    const handleClientPageChange = (page) => {
        if (page !== subCurrentPage) {
            setsubCurrentPage(page);
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
                <SearchFilter onSearch={handleSearch}/>
            </div>
            <br />
            <div className={`statsPack`}>
                <StatsCard title="TOTAL VENDORS" data={stats?.totalVendors || 0} icon={User2} />
                <StatsCard title="ACTIVE SUBSCRIPTIONS" data={stats?.activeVendors || 0} icon={UserCheck2} />
                <StatsCard title="SUBSCRIPTION REVENUE" data={stats?.totalUsers || 0} icon={User} />
                <StatsCard title="SUBSCRIPTION FEE" data={stats?.activeUsers || 0} icon={UserCheck} />
            </div>
            <br /><br />
            <div className="table">
                {renderContent()}
                {activeTab === 'Payment History' &&
                    <Pagination currentPage={paymentCurrentPage} 
                        totalPages={paymentTotalPages}
                        onPageChange={!loading ? handleVendorPageChange : () => {}}
                    />    
                }
                {activeTab==='Vendor Subscriptions' &&
                    <Pagination
                        currentPage={subCurrentPage} 
                        totalPages={subTotalPages}
                        onPageChange={!loading ? handleClientPageChange : () => {}}
                    />
                }      
            </div>
            
        </div>
    );
}
 
export default Payment;