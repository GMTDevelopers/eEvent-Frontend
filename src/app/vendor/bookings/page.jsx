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
    const ITEMS_PER_PAGE = 15;

  // Load data once
    useEffect(() => {
        fetch("/data/clientTransaction.json")
            .then((res) => res.json())
            .then((data) => {
            setAllData(data);
            const pages = Math.ceil(data.length / ITEMS_PER_PAGE);
            setTotalPages(pages);
            console.log("Total items:", data.length, "Pages:", pages);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, []);

  // Re-calculate visible data whenever currentPage or allData changes
    const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIdx = startIdx + ITEMS_PER_PAGE;
    const visibleData = allData.slice(startIdx, endIdx);

    return ( 
        <div className='main'>
           
            <div className="stats">
                <SearchFilter name="My Bookings"/>
            </div>
            <div className="table">
                <VendorBookingsTable bookings={visibleData}/> 

                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => setCurrentPage(page)}
                />             
            </div>
            
        </div>
    );
}
 
export default Bookings;