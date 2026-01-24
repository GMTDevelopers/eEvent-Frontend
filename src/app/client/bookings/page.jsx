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
        const token = localStorage.getItem("access_token");
        fetch("https://eevents-srvx.onrender.com/v1/bookings/client?skip=0&take=10",{
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            setAllData(data);
        }) 

        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    const visibleData = allData.data;
    console.log("this is the visible data,", visibleData)
    return ( 
        <div>
            <div className="stats">
                <SearchFilter name="My Bookings" page="myBookings"/> <br />
                <div className="statsPack">
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