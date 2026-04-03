// app/components/BookingsTable.jsx
"use client";

import styles from "./BookingsTable.module.css";



export default function ClientOrderTable({ bookings = [] }) {
  const data = bookings||[]
  console.log ('order table', data)


  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Vendor name</th>
              <th>Service booked</th>
              <th>Date booked</th>
              <th>Amount paid</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data?.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td>{b.bookingId || b.bookingID}</td>
                <td>{b.vendorName}</td>
                <td>{b.serviceBooked}</td>
                <td>{new Date(b.dateBooked).toDateString() === 'Invalid Date' ? b.dateBooked: new Date(b.dateBooked).toDateString()}</td>
                <td className={styles.amount}>₦{b.amountPaid.toLocaleString()}</td>
                <td> 
                  <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS — hidden on desktop */}
      <div className={styles.mobileCards}>
        {data.map((b,index) => (
          <div key={index} className={styles.card}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.bookingId}>{b.bookingId}</div>
                <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                  {b.status}
                </span>
              </div>
            </div>

            <div className={styles.vendorName}>{b.clientName}</div>
            <div className={styles.service}>{b.serviceBooked}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{b.dateBooked}</strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amountPaid}>₦{b.amountPaid.toLocaleString()}</strong>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}