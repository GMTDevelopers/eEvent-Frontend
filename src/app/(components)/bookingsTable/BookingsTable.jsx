// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function BookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);

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
              <th>Vendor name</th>
              <th>Service Ordered</th>
              <th>Date Booked</th>
              <th>Event Date</th>
              <th>Amount</th>
              <th>Status</th>
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
                    {b.bookingStatus}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.id)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.id && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/client/bookings/${b.id}`)}>View</li>
                      <li style={{color:"#09A14A"}} className={styles.dropdownItem}>Mark completed</li>
                      <li className={styles.dropdownItem}>Message vendor</li>
                      <li className={styles.dropdownItem}>Reschedule booking</li>
                      <li className={styles.dropdownItem}>Contact support</li>
                      <li className={`${styles.dropdownItem} ${styles.cancel}`}>Cancel booking</li>
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
                <button className={styles.dropdownItem}>Mark completed</button>
                <button className={styles.dropdownItem}>Message vendor</button>
                <button className={styles.dropdownItem}>Reschedule booking</button>
                <button className={styles.dropdownItem}>Contact support</button>
                <button className={`${styles.dropdownItem} ${styles.cancel}`}>Cancel booking</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}