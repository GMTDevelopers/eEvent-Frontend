// app/components/BookingsTable.jsx
"use client";

import styles from "../BookingsTable.module.css";


export default function AdminSubscriptionHistory({ bookings = [] }) {  
  const data = bookings||[]

  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <h2>SUBSCRIPTION HISTORY</h2>
        <br />
        <table style={{fontSize:"13px"}} className={styles.table}>
          <thead>
            <tr>
              <th>Date</th> 
              <th>Transaction</th>
              <th>Amount</th> 
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td className={styles.amount}>{new Date(b?.date).toDateString() || "N/A"}</td>
                <td>{b?.transactionTitle}</td>
                <td className={styles.amount}>{b?.amount?.toLocaleString() || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}