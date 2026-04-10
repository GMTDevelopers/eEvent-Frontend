// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import Reschedule from "../reschedule/page";
import Contact from "../Contact/pages";
import Cancle from "../cancle/cancle";
import Message from "../message/pages";
import ActionComplete from "../requestSent/actionComplete";
import ActionError from "../requestSent/actionError";
import Loading from "../loading/loading";

export default function BookingsTable({ bookings = {} }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const [loading, setLoading] = useState(false)
  const { openModal, closeModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings.data||[]
  const closeMenu = () => setOpenMenuId(null);

  const handleMarkComplete = (id) => {  
    setLoading(true)
    const requestBody = {
      
        status: "COMPLETED",
        reason: "Vendor work finished",      
    }
    console.log(id) 
    const token = localStorage.getItem("access_token");  
    fetch(`https://eevents-srvx.onrender.com/v1/bookings/${id}/status`,{
      method: "PATCH",
      headers:{
        "Content-Type": "application/json" ,
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(requestBody)
    })
    .then((res) => res.json())
    .then((data) => {
      setLoading(false)
      if(data.status === "success"){
        openModal(<ActionComplete />)
        setTimeout(() => {
          closeModal()
          window.location.reload()
        }, 2500);
      }
      if(data.status !== "success"){
        openModal(<ActionError />)
        setTimeout(() => {
          closeModal()
        }, 1500);
      }
      console.log("stats data", data)
    }) 
  }

  console.log("this is data",data)
  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        { 
          !data.status==="error" ? <div style={{minHeight:"70px"}} className="sectionHeaderCenter"><span className="txtHeader">you are yet to book a service</span></div>
          : data.status==="success" && data.length === 0 ? <div className="sectionHeaderCenter"><span className="txtHeader"><Loading /></span></div>  :
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
              {data.length !==0 && data.map((b) => (
                <tr className={styles.dataRow} key={b.bookingId} >
                  <td onClick={closeMenu}>{b?.bookingId}</td>
                  <td onClick={closeMenu}>{b?.vendorName}</td>
                  <td onClick={closeMenu}>{b?.serviceName}</td>
                  <td onClick={closeMenu}>{new Date(b?.dateBooked).toDateString() || "N/A"}</td>
                  <td onClick={closeMenu}>{new Date(b?.eventDate).toDateString() || "N/A"}</td>
                  <td onClick={closeMenu} className={styles.amount}>₦{b?.amount.toLocaleString() || "N/A"}</td>
                  <td onClick={closeMenu}> 
                    <span className={`${styles.status} ${styles[b.status?.toLowerCase()]}`}>
                      {b?.status}
                    </span>
                  </td>
                  <td className={styles.actionCell}>
                    <button onClick={() => toggleMenu(b.bookingId)} className={styles.dotsBtn}>
                      ⋮
                    </button>
                    {openMenuId === b.bookingId && (
                      loading ?
                        <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                          <Loading />
                        </div>  :
                      <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                        <li className={styles.dropdownItem} onClick={() => router.push(`/client/bookings/${b.bookingId}`)}>View</li>
                        <li style={{color:"#09A14A"}} onClick={() => handleMarkComplete(b.bookingId)} className={styles.dropdownItem}>Mark completed</li>
                        <li className={styles.dropdownItem} onClick={() => openModal(<Message bookingId={b.bookingId} receiverId={b.vendorUserId} />)}>Message vendor</li>
                        <li className={styles.dropdownItem} onClick={() => openModal(<Reschedule id={b.bookingId} initDate={new Date(b.eventDate).toLocaleDateString()} />)}>Reschedule booking</li>
                        <li className={styles.dropdownItem} onClick={() => openModal(<Contact />)} >Contact support</li>
                        <li className={`${styles.dropdownItem}  ${styles.cancel}`} onClick={() => openModal(<Cancle id={b.bookingId}/>)} >Cancel booking</li>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
      </div>

      {/* MOBILE CARDS — hidden on desktop */}
      <div className={styles.mobileCards}> 
        {data.length === 0 ? <span className="txtHeader">you are yet to book a service</span> :
          data !== 0 && data.map((b) => (
            <div key={b.bookingId} className={styles.card} onClick={closeMenu}>
              <div className={styles.cardHeader}>
                <div>
                  <div className={styles.bookingId}>{b.bookingId}</div>
                  <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                    {b.status}
                  </span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleMenu(b.bookingId); }} className={styles.dotsBtn}>
                  ⋮
                </button>
              </div>

              <div className={styles.vendorName}>{b.vendorName}</div>
              <div className={styles.service}>{b.serviceName}</div>

              <div className={styles.cardRow}>
                <span>Event Date</span>
                <strong>{b.eventDate}</strong>
              </div>
              <div className={styles.cardRow}>
                <span>Amount</span>
                <strong className={styles.amount}>₦{b.amount.toLocaleString()}</strong>
              </div>

              {/* Dropdown menu (same as desktop) */}
              {openMenuId === b.bookingId && (
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