// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import SignIn from "@/app/navbar/(signIn)/signIn";
import Reschedule from "../reschedule/page";
import Contact from "../Contact/pages";
import Cancle from "../cancle/cancle";
import Message from "../message/pages";
import Accept from "../vendorReschedule/accept";

export default function VendorBookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

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
            {bookings.map((b) => (
              <tr className={styles.dataRow} key={b.id} >
                <td onClick={closeMenu}>{b.id}</td>
                <td onClick={closeMenu}>{b.businessName}</td>
                <td onClick={closeMenu}>{b.serviceOrdered.serviceName}</td>
                <td onClick={closeMenu}>{b.bookingDate}</td>
                <td onClick={closeMenu}>{b.eventDate}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.totalCost.toLocaleString()}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.bookingStatus.toLowerCase()]}`}>
                    {b.paymentStatus}
                  </span>
                </td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.bookingStatus.toLowerCase()]}`}>
                    {b.bookingStatus}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.id)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.id && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/vendor/bookings/${b.id}`)}>View</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Accept />)}>Accept reschedule</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Message />)}>Reject reschedule</li>

                      <li style={{color:"#09A14A"}} className={styles.dropdownItem}>Accept booking</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Message />)} >Message client</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<Reschedule />)}>Mark completed</li>
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
        {bookings.map((b) => (
          <div key={b.id} className={styles.card} onClick={closeMenu}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.bookingId}>{b.id}</div>
                <span className={`${styles.status} ${styles[b.bookingStatus.toLowerCase()]}`}>
                  {b.bookingStatus}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.id); }} className={styles.dotsBtn}>
                ⋮
              </button>
            </div>

            <div className={styles.vendorName}>{b.businessName}</div>
            <div className={styles.service}>{b.serviceOrdered.serviceName}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{b.bookingDate}</strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amount}>₦{b.totalCost.toLocaleString()}</strong>
            </div>

            {/* Dropdown menu (same as desktop) */}
            {openMenuId === b.id && (
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