'use client'
import AdminBookingsTable from "@/app/(components)/bookingsTable/adminBookingsTable";
import Header from "@/app/(components)/header/page";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import tabStyles from "@/app/(components)/tabs/tabs.module.css"
import Pagination from "@/app/(components)/pagination/page";
import SignIn from "@/app/navbar/(signIn)/signIn";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import AdminServiceTable from "@/app/(components)/bookingsTable/adminServiceTable";
import SearchFilter from "@/app/(components)/search/page";
import AdminTicketTable from "@/app/(components)/bookingsTable/adminTicketsTable";

const ServiceBooking = () => {
    const { openModal } = useModal();
    const router = useRouter();
    const [allData, setAllData] = useState([]);
    const [serviceData, setServiceData] = useState([]);
    const [ticketData, setTicketData] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const [ticketCurrentPage, setTicketCurrentPage] = useState(1);
    const [ticketTotalPages, setTicketTotalPages] = useState(0);

    const [serviceCurrentPage, setServiceCurrentPage] = useState(1);
    const [serviceTotalPages, setServiceTotalPages] = useState(0);


    const [loading, setLoading] = useState(null);
    const TAKE = 10;
    const [searchValue, setSearchValue] = useState("");

    const handleSearch = (value) => {
        setSearchValue(value);
    };
    //tabs
    const [activeTab, setActiveTab] = useState('Bookings');
    const tabs = [
        { key: 'Bookings', label: 'Bookings' },
        { key: 'Services', label: 'Services' },
        { key: 'Tickets', label: 'Tickets' },
    ];
  // Load data once
    useEffect(() => {
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getBookings = () => {

            const skip = (currentPage - 1) * TAKE;
            const query = new URLSearchParams({
                /* category: categoryFilter, */
                /* location: "", */
                skip: 0,
                take: TAKE,
            });
            if (searchValue & searchValue!='') {
                query.append("status", searchValue);
            }
            fetch(`https://eevents-srvx.onrender.com/v1/admin/bookings?${query.toString()}`,{
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
                console.log("bookings data", data.data)
                setAllData(data || []);
                const { total, take } = data.data.meta || {};
                setTotalPages(total/take || 0);
/*                 setCurrentPage(data.data.meta.page || 1);
                setTotalPages(data.data.meta.total/TAKE || 0); */
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        const getServices = (page = 1) => {
            const skip = (page - 1) * TAKE;
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
             if (searchValue) {
                query.append("search", searchValue);
            }
            fetch(`https://eevents-srvx.onrender.com/v1/admin/services?${query.toString()}`,{
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
                console.log("service data", data.data)
                setServiceData(data || []);
                const { total, take } = data.data.meta || {};
                setServiceTotalPages(total/take || 0);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }

        const getTickets = (page = 1) => {
            const skip = (page - 1) * TAKE;
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
             if (searchValue) {
                query.append("search", searchValue);
            }
            fetch(`https://eevents-srvx.onrender.com/v1/admin/tickets?${query.toString()}`,{
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
                console.log("tickets data", data.data)
                setTicketData(data || []);
                const { total, take } = data.data.meta || {};
                setTicketTotalPages(total/take || 0);
            }) 
            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                    setLoading(false);
                }  
            )
        }
        getBookings()
        getServices(serviceCurrentPage)
        getTickets(ticketCurrentPage)
    }, [currentPage, searchValue, serviceCurrentPage, ticketCurrentPage]);
    
    const renderContent = () => {
        switch (activeTab) {
            case 'Bookings':
                return allData?.length != 0 ? (
                 <AdminBookingsTable bookings={allData}/>
                ) : (
                    <AdminBookingsTable bookings={[]}/>
                );
            case 'Services':
                return serviceData?.length != 0 ? ( 
                    <AdminServiceTable bookings={serviceData}/>         
                ): (
                    <AdminServiceTable bookings={[]}/>
                );
            case 'Tickets':
                 return ticketData?.length != 0 ? ( 
                    <AdminTicketTable bookings={ticketData}/>         
                ): (
                    <AdminTicketTable bookings={[]}/>
                );
            default:
                return null;
        }
        
    };
    const handleServicePageChange = (page) => {
        if (page !== serviceCurrentPage) {
            setServiceCurrentPage(page);
        }
    };
    const handleTicketPageChange = (page) => {
        if (page !== ticketCurrentPage) {
            setTicketCurrentPage(page);
        }
    };
    console.log(activeTab,serviceCurrentPage)
    return ( 
        <div className="main">
            <Header img='/images/servicePage/serviceBG.png' header='eEvents Admin Dashboard' subHeader='Manage all platform activities.'  />
            <br />
            <div>         
                <div className={`${tabStyles.tabBar} ${tabStyles.doubleTabBar}`}>
                    <div>
                        {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
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
            <div className="table">
                {renderContent()}
                {activeTab === 'Bookings' &&
                    <Pagination currentPage={currentPage} 
                        totalPages={totalPages}
                        onPageChange={!loading ? setCurrentPage : () => {}}
                    />    
                }
                {activeTab==='Services' &&
                    <Pagination
                        currentPage={serviceCurrentPage} 
                        totalPages={serviceTotalPages}
                        onPageChange={!loading ? handleServicePageChange : () => {}}
                    />
                }      
                {activeTab==='Tickets' &&
                    <Pagination
                        currentPage={ticketCurrentPage} 
                        totalPages={ticketTotalPages}
                        onPageChange={!loading ? handleTicketPageChange : () => {}}
                    />
                }      
            </div>
            
        </div>
    )
};
 
export default ServiceBooking;