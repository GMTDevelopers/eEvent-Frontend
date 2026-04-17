"use client"
import VendorEarningsTable from "@/app/(components)/bookingsTable/vendor/vendorEarningsTable";
import Loading from "@/app/(components)/loading/loading";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import Pagination from "@/app/(components)/pagination/page";
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Loader, Minimize2, Star } from "lucide-react";
import { useEffect, useState } from "react";

const Earnings = () => {
    const { openModal } = useModal();
    const [earnings, setEarnings] = useState()
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState()
    const ITEMS_PER_PAGE = 6;
    useEffect(()=>{
        setLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const skip = (currentPage - 1) * ITEMS_PER_PAGE;
        const query = new URLSearchParams({
            /* category: categoryFilter, */
            /* location: "", */
            search: "",
            skip: skip,
            take: ITEMS_PER_PAGE,
        });
        fetch(`https://eevents-srvx.onrender.com/v1/vendors/me/earnings?${query.toString()}`,{
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data.data)
            setEarnings(data.data.data);
            setCurrentPage(data.data.meta.page || 1);
            setTotalPages(data.data.meta.lastPage || 0);
            
        }) 
        .catch((error) => console.error("Error fetching data:", error))
        .finally(()=>{
            setLoading(false);
        })
    }, [currentPage])

    return ( 
        <div className="main">
            <br />
            <div className={`statsPack`}>
                <StatsCard title="TOTAL EARNINGS" data={4} icon={Banknote} />
                <StatsCard title="PENDING PAYOUTS" data={5} icon={Loader} />
                <StatsCard title="COMPLETED PAYOUTS" data={6} icon={Minimize2} />
                <StatsCard title="ACTIVE BOOKINGS" data={3} icon={Star} />
            </div>
            {loading && (
            <div>
                <Loading />
            </div>
            )}
            <div className="table">
                <VendorEarningsTable bookings={earnings}/> 
                 <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={!loading ? setCurrentPage : () => {}}
                />        
            </div>
        </div>
    );
}
 
export default Earnings;