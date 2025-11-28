'use client'

import StatsCard from '@/app/(components)/statsCard/page';
import styles from './bookings.module.css';
import SearchFilter from '@/app/(components)/search/page';
import { CheckCheck, Loader, Minimize2, X } from 'lucide-react';
import BookingsTable from '@/app/(components)/bookingsTable/BookingsTable';


const Bookings = () => {
    const mockBookings = [
        { id: "EEV-1143", vendorName: "Gala Events Co.", service: "Corporate Event Planning", dateBooked: "01/04/25", eventDate: "20/07/25", amount: 250000, status: "Pending" },
        { id: "EEV-1144", vendorName: "Bright Lights Photography", service: "General Event Photography", dateBooked: "15/05/25", eventDate: "10/08/25", amount: 100000, status: "Pending" },
        { id: "EEV-1146", vendorName: "SoundWave DJs", service: "Music and Entertainment", dateBooked: "30/07/25", eventDate: "15/11/25", amount: 75000, status: "Upcoming" },
        { id: "EEV-1150", vendorName: "Themed Events Galore", service: "Event Coordination", dateBooked: "18/11/25", eventDate: "15/02/26", amount: 300000, status: "Completed" },
    ];
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
                <BookingsTable bookings={mockBookings}/>
            </div>
            
        </div>
    );
}
 
export default Bookings;