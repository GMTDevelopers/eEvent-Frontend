// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "../BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../../ModalProvider/ModalProvider";
import SignIn from "@/app/navbar/(signIn)/signIn";
import UpdateStatus from "../../adminUpdateStatus/updatePaymentStatus";
import ManageReschedule from "../../adminReschedule/manageReschedule";
import ManageCancle from "../../adminCancle/managecancle";

export default function AdminBookingsTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings.data||[]
  const closeMenu = () => setOpenMenuId(null);
  const token = localStorage.getItem("access_token");

  const clientComplete = async (id) => {
    try{
      const Res = await fetch(`https://eevents-srvx.onrender.com/v1/admin/bookings/${id}/request-client-complete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Res.ok) {
        const res = await Res.json();
        console.log("client request",res)
        alert("REQUEST SENT TO CLIENT")
       
      }
      if (Res.status===401) {
        localStorage.removeItem('token');
        openModal(<SignIn />)
      }
    }catch(err){
      throw new Error(err)
    }  
  }

  const vendorComplete = async (id) => {
    try{
      const Res = await fetch(`https://eevents-srvx.onrender.com/v1/admin/bookings/${id}/request-vendor-complete`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Res.ok) {
        const res = await Res.json();
        console.log("vendor request",res)
        alert("REQUEST SENT TO VENDOR")
       
      }
      if (Res.status===401) {
        localStorage.removeItem('token');
        openModal(<SignIn />)
      }
    }catch(err){
      throw new Error(err)
    }  
  }


  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table style={{fontSize:"13px"}} className={styles.table}>
          <thead>
            <tr>
              <th>Booking ID</th>
              <th>Client name</th>
              <th>Vendor name</th>
              <th>Date Booked</th> 
              <th>Event Date</th>
              <th>Amount</th>
              <th>Payment Status</th>
              <th>Vendor Status</th>
              <th>Client Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b.bookingId}</td>
                <td onClick={closeMenu}>{b.clientName}</td>
                <td onClick={closeMenu}>{b.vendorName}</td>
                <td onClick={closeMenu}>{new Date(b.dateBooked).toLocaleDateString()}</td>
                <td onClick={closeMenu}>{new Date(b.eventDate).toLocaleDateString()}</td>
                <td onClick={closeMenu} className={styles.amount}>₦{b.amount.total.toLocaleString()}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.paymentStatus.toLowerCase()]}`}>
                    {b.paymentStatus.toLowerCase()}
                  </span>
                </td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.vendorStatus.toLowerCase()]}`}>
                    {b.vendorStatus.toLowerCase()}
                  </span>
                </td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.clientStatus.toLowerCase()]}`}>
                    {b.clientStatus.toLowerCase()}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.id)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.id && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/servicesBookings/${b.id}`)}>View booking details</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<UpdateStatus eventId={b.bookingId} eventDate={b.eventDate} total={b.amount.total} paidVendor={b.amount.paid} payStatus={b.paymentStatus} cStatus={b.clientStatus} vStatus={b.vendorStatus} balance={b.amount.balance} id={b.id} />)}>Update payment status</li>
                      <li className={styles.dropdownItem} onClick={() => clientComplete(b.id)}>Request client to mark complete</li>
                      <li className={styles.dropdownItem} onClick={() => vendorComplete(b.id)}>Request vendor to mark complete</li>
                      <li className={styles.dropdownItem} style={ {color: b.rescheduleReason==="N/A" ? "" : "#82027D"}} onClick={() => openModal(<ManageReschedule rescheduleReason={b.rescheduleReason} id={b.id} cStatus={b.clientStatus} vStatus={b.vendorStatus}/>)}>Manage reschedule request </li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<ManageCancle rescheduleReason={b.rescheduleReason} bookingId={b.bookingId} id={b.id} cStatus={b.clientStatus} vStatus={b.vendorStatus}/>)} >Manage cancel request</li>
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