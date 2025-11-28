// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";

export default function BookingsTable({ bookings = [] }) {
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
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.vendorName}</td>
                <td>{b.service}</td>
                <td>{b.dateBooked}</td>
                <td>{b.eventDate}</td>
                <td className={styles.amount}>₦{b.amount.toLocaleString()}</td>
                <td>
                  <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.id)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.id && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <button className={styles.dropdownItem}>View</button>
                      <button className={styles.dropdownItem}>Mark completed</button>
                      <button className={styles.dropdownItem}>Message vendor</button>
                      <button className={styles.dropdownItem}>Reschedule booking</button>
                      <button className={styles.dropdownItem}>Contact support</button>
                      <button className={`${styles.dropdownItem} ${styles.cancel}`}>Cancel booking</button>
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
                <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                  {b.status}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.id); }} className={styles.dotsBtn}>
                ⋮
              </button>
            </div>

            <div className={styles.vendorName}>{b.vendorName}</div>
            <div className={styles.service}>{b.service}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{b.eventDate}</strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amount}>₦{b.amount.toLocaleString()}</strong>
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