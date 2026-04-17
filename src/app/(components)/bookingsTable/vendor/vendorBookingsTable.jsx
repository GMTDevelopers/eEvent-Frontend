// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "../BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../../ModalProvider/ModalProvider";
import Contact from "../../Contact/pages";
import Message from "../../message/pages";
import Accept from "../../vendorReschedule/accept";
import Reject from "../../vendorReschedule/reject";
import MarkComplete from "../../vendorMarkComplete/page";

export default function VendorBookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings.data||[]
  const closeMenu = () => setOpenMenuId(null);


  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Client name</th>
              <th>Event Type</th>
              <th>Date Booked</th>
              <th>Event Date</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Event Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b.bookingId}</td>
                <td onClick={closeMenu}>{b.clientName}</td>
                <td onClick={closeMenu}>{b.eventType}</td>
                <td onClick={closeMenu}>{new Date(b.dateBooked).toDateString()}</td>
                <td onClick={closeMenu}>{new Date(b.eventDate).toDateString()}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.amount.toLocaleString()}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.paymentStatus.toLowerCase()]}`}>
                    {b.paymentStatus.toLowerCase()}
                  </span>
                </td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.eventStatus.toLowerCase()]}`}>
                    {b.eventStatus.toLowerCase()}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.bookingId)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.bookingId && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/vendor/bookings/${b.bookingId}`)}>View</li>
                      <li className={styles.dropdownItem} style={{color:"#2d9f35"}} onClick={() => openModal(<Accept id={b.bookingId}/>)}>Accept reschedule</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<Reject id={b.bookingId} />)}>Reject reschedule</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Message bookingId={b.bookingId} receiverId={b.clientUserId}/>)} >Message client</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<MarkComplete id={b.bookingId} />)}>Mark completed</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Contact />)} >Contact support</li>
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
                <div className={styles.bookingId}>{b.bookingId}</div>
                <span className={`${styles.status} ${styles[b.eventStatus.toLowerCase()]}`}>
                  {b.eventStatus}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.bookingId); }} className={styles.dotsBtn}>
                ⋮
              </button>
            </div>

            <div className={styles.vendorName}>{b.clientName}</div>
            <div className={styles.service}>{b.eventType}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{new Date(b.dateBooked).toDateString()}  </strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amount}>₦{b.amount.toLocaleString()}</strong>
            </div>

            {/* Dropdown menu (same as desktop) */}
            {openMenuId === b.bookingId && (
              <div className={styles.mobileDropdown}>
                <li className={styles.dropdownItem} onClick={() => router.push(`/vendor/bookings/${b.bookingId}`)}>View</li>
                <li className={styles.dropdownItem} style={{color:"#2d9f35"}} onClick={() => openModal(<Accept id={b.bookingId}/>)}>Accept reschedule</li>
                <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<Reject id={b.bookingId} />)}>Reject reschedule</li>
                <li className={styles.dropdownItem} onClick={() => openModal(<Message bookingId={b.bookingId} receiverId={b.clientUserId}/>)} >Message client</li>
                <li className={styles.dropdownItem} onClick={() => openModal(<MarkComplete id={b.bookingId} />)}>Mark completed</li>
                <li className={styles.dropdownItem} onClick={() => openModal(<Contact />)} >Contact support</li>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}