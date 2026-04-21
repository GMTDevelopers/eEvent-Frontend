'use client'

import StatsCard from '@/app/(components)/statsCard/page';
import SearchFilter from '@/app/(components)/search/page';
import { CheckCheck, Loader, Minimize2, X } from 'lucide-react';
import BookingsTable from '@/app/(components)/bookingsTable/BookingsTable';
import Pagination from '@/app/(components)/pagination/page';
import { useEffect, useState } from 'react';
import Loading from '@/app/(components)/loading/loading';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';



const Bookings = () => {
    const { openModal } = useModal();
    const [allData, setAllData] = useState([]);        // ← Full dataset
    const [statsData, setStatsData] = useState([]);        // ← Full dataset
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(null);
    const [bloading, setbLoading] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const TAKE = 10;

  // Load data once
    useEffect(() => {
        setLoading(true);
        setbLoading(true)
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getBookings = (page = 1) => {
            const skip = (page - 1) * TAKE;
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
            fetch(`https://eevents-srvx.onrender.com/v1/client/bookings?${query.toString()}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                setAllData(data || []);
                const { total, take } = data.data.meta || {};
                setTotalPages(total/take || 0);
                setbLoading(false)
            }) 

            .catch((error) => console.error("Error fetching data:", error));
        }
        const getStats = () => {
        
            fetch("https://eevents-srvx.onrender.com/v1/client/dashboard/stats",{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) => res.json())
            .then((data) => {
                console.log("stats data", data)
                setStatsData(data.data);
            }) 

            .catch((error) => console.error("Error fetching data:", error));
        }
        getStats()
        getBookings(currentPage)
        setLoading(false);
        setbLoading(false)

    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const visibleData = allData.data;

    {loading && (
        <div>
            <Loading />
        </div>
    )}
    return ( 
        <div>
            <div className="stats">
                <SearchFilter name="My Bookings" page="myBookings"/> <br />
                <div className="statsPack">
                    <StatsCard title="ACTIVE BOOKINGS" data={statsData.activeBookings} icon={Minimize2} />
                    <StatsCard title="PAYMENT PENDING" data={statsData.pendingPayments} icon={Loader} />
                    <StatsCard title="COMPLETED ORDERS" data={statsData.completedOrders} icon={CheckCheck} />
                    <StatsCard title="CANCELLED ORDERS" data={statsData.cancelledOrders} icon={X} />
                </div>
            </div>
            <div className="table">
                   {bloading && (
                        <div>
                            <Loading />
                        </div>
                    )}
                <BookingsTable bookings={visibleData}/> 
                <Pagination
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    onPageChange={!loading ? handlePageChange : () => {}}
                />        
            </div>
            
        </div>
    );
}
 
export default Bookings;