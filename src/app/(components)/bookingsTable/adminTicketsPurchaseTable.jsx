// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import ApproveListings from "../adminServiceListing/approve";
import DeactivateListings from "../adminServiceListing/deactivate";


export default function AdminTicketPurchaseTable({ bookings = [] }) {
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
        <table style={{fontSize:"13px"}} className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Client name</th>
              <th>Email address</th> 
              <th>Phone number</th>
              <th>Ticket category</th>
              <th>Quantity</th>
              <th>Amount paid</th>      
{/*               <th>Status</th>
              <th> </th> */}
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{new Date(b.date).toLocaleDateString()}</td>
                <td onClick={closeMenu}>{b.clientName}</td>
                <td onClick={closeMenu}>{b.email}</td>
                <td onClick={closeMenu}>{b.phone}</td>
                <td onClick={closeMenu}>{b.ticketCategory}</td>
                <td onClick={closeMenu} className={styles.amount}>{b.quantity}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.amountPaid.toLocaleString()}</td>
{/*                 <td onClick={closeMenu}>  
                  <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.ticketID)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.ticketID && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} style={{color:"#2ED074"}} onClick={() => openModal(<ApproveListings id={b.serviceID} />)}>Edit listing</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<DeactivateListings id={b.serviceID} />)} >Delete listing</li>
                    </div>
                  )}
                </td>  */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS — hidden on desktop */}
     {/*  <div className={styles.mobileCards}>
        {data.map((b,index) => (
          <div key={index} className={styles.card} onClick={closeMenu}>
            <div className={styles.cardHeader}>
              <div>
                <div className={styles.id}>{b.id}</div>
                <span className={`${styles.status} ${styles[b.vendorStatus]}`}>
                  {b.vendorStatus}
                </span>
                <span className={`${styles.status} ${styles[b.clientStatus]}`}>
                  {b.clientStatus}
                </span>
              </div>
              <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.id); }} className={styles.dotsBtn}>
                ⋮
              </button>
            </div>

            <div className={styles.vendorName}>{b.clientName}</div>

            <div className={styles.cardRow}>
              <span>Event Date</span>
              <strong>{b.dateBooked}</strong>
            </div>
            <div className={styles.cardRow}>
              <span>Amount</span>
              <strong className={styles.amount}>₦{b.amount.total.toLocaleString()}</strong>
            </div>


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
      </div> */}
    </>
  );
}