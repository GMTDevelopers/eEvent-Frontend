'use client'

import StatsCard from '@/app/(components)/statsCard/page';
import styles from './bookings.module.css';
import SearchFilter from '@/app/(components)/search/page';
import { CheckCheck, Loader, Minimize2, X } from 'lucide-react';
import BookingsTable from '@/app/(components)/bookingsTable/BookingsTable';
import Pagination from '@/app/(components)/pagination/page';
import { useEffect, useState } from 'react';



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
        <div>
            <div className={styles.stats}>
                <SearchFilter name="My Bookings"/>
                <div className={styles.statsPack}>
                    <StatsCard title="ACTIVE BOOKINGS" data='5' icon={Minimize2} />
                    <StatsCard title="PAYMENT PENDING" data='2' icon={Loader} />
                    <StatsCard title="COMPLETED ORDERS" data='12' icon={CheckCheck} />
                    <StatsCard title="CANCELLED ORDERS" data='1' icon={X} />
                </div>
            </div>
            <div className="table">
                <BookingsTable bookings={visibleData}/> 
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