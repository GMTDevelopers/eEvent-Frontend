// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import Message from "../message/pages";
import Accept from "../vendorReschedule/accept";
import Reject from "../vendorReschedule/reject";

export default function VendorEarningsTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings||[]
  const closeMenu = () => setOpenMenuId(null);


  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Date</th>
              <th>Client name</th>
              <th>Event Type</th>
              <th>Event Status</th>
              <th>Total Amount</th>
              <th>Amount Paid</th>
              <th>Amount Pending</th>              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b.bookingID}</td>
                <td onClick={closeMenu}>{new Date(b.date).toDateString()}</td>
                <td onClick={closeMenu}>{b.clientName}</td>
                <td onClick={closeMenu}>{b.eventType}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.eventStatus.toLowerCase()]}`}>
                    {b.eventStatus}
                  </span>
                </td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.totalAmount.toLocaleString()}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.amountPaid.toLocaleString()}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.amountPending.toLocaleString()}</td>
                
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.bookingID)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.bookingID && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/vendor/bookings/${b.bookingId}`)}>View</li>
                      <li className={styles.dropdownItem} style={{color:"#2d9f35"}} onClick={() => openModal(<Accept id={b.bookingId}/>)}>Request client to mark complete</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<Reject id={b.bookingId} />)}>Notify admin for pending payment</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Message />)} >Contact support</li>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS — hidden on desktop */}
      <div className={styles.mobileCards}>
        {data.map((b,index) => (
          <div key={index} className={styles.card} onClick={closeMenu}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.bookingId}>{b.bookingID}</div>
                <span className={`${styles.status} ${styles[b.eventStatus.toLowerCase()]}`}>
                  {b.eventStatus}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.bookingID); }} className={styles.dotsBtn}>
                ⋮
              </button>
            </div>

            <div className={styles.vendorName}>{b.clientName}</div>
            <div className={styles.service}>{b.eventType}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{b.date}</strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amount}>₦{b.amountPending.toLocaleString()}</strong>
            </div>

            {/* Dropdown menu (same as desktop) */}
            {openMenuId === b.bookingID && (
              <div className={styles.mobileDropdown}>
                <button className={styles.dropdownItem}>View</button>
                <button className={styles.dropdownItem}>Accept booking</button>
                <button className={styles.dropdownItem}>Message Client</button>
                <button className={styles.dropdownItem}>Mark completedg</button>
                <button className={styles.dropdownItem}>Contact support</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}