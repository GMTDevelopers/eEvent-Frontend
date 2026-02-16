'use client'

import StatsCard from '@/app/(components)/statsCard/page';
import styles from './bookings.module.css';
import SearchFilter from '@/app/(components)/search/page';
import { CheckCheck, Loader, Minimize2, X } from 'lucide-react';
import Pagination from '@/app/(components)/pagination/page';
import { useEffect, useState } from 'react';
import VendorBookingsTable from '@/app/(components)/bookingsTable/vendorBookingsTable';



const Bookings = () => {
        
    const [allData, setAllData] = useState([]);        // ← Full dataset
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(null);
    const ITEMS_PER_PAGE = 6;
    

  // Load data once
    useEffect(() => {
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
        fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings?${query.toString()}`,{
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setAllData(data.data || []);
            setCurrentPage(data.data.meta.page || 1);
            setTotalPages(data.data.meta.lastPage || 0);
        }) 

        .catch((error) => console.error("Error fetching data:", error))
        .finally( ()=> {
            setLoading(false);
        }  
        )
    }, [currentPage]);


    return ( 
        <div className='main'>
           
            <div className="stats">
                <SearchFilter name="My Bookings"/>
            </div>
            <div className="table">
               <VendorBookingsTable bookings={allData}/>

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={!loading ? setCurrentPage : () => {}}
                />             
            </div>
            
        </div>
    );
}
 
export default Bookings;