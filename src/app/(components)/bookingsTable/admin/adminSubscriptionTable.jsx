// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "../BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../../ModalProvider/ModalProvider";
import DeleteClient from "../../adminDeleteClient/delete";
import SubApprove from "../../adminSubscription/subApprove";
import SubRenew from "../../adminSubscription/subRenew";
import PaymentReminder from "../../requestSent/paymentReminder";
import AdminSubscriptionHistory from "./adminSubscriptionHistory";
import AdminMessage from "../../message/adminMessage";
import DeleteSub from "../../adminDelete/deleteSub";



export default function AdminSubscriptionTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings.data||[]
  const closeMenu = () => setOpenMenuId(null);

  const handleReminder = (id) => {
    const token = localStorage.getItem("access_token");
    fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/subscription/reminder`,{
      method: "POST",
      headers:{
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>{ 
      if (res.ok) {
        openModal(<PaymentReminder />)
      }
      return res.json()
    })
    .then((data) => {            
      console.log("response data", data.data)
    }) 
    .catch((error) => console.error("Error fetching data:", error))  
  }

  const handleHistory = (id) => {
    const token = localStorage.getItem("access_token");
    fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/subscription/history`,{
      headers:{
        authorization: `Bearer ${token}`,
      },
    })
    .then((res) =>{ 
      return res.json()
    })
    .then((data) => {            
      console.log("susbcription history data", data.data)
      openModal(<AdminSubscriptionHistory bookings={data.data.subscriptions} />)
    }) 
    .catch((error) => console.error("Error fetching data:", error))  
  }

  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table style={{fontSize:"13px"}} className={styles.table}>
          <thead>
            <tr>
              <th>Subscription ID</th>
              <th>Vendor name</th>
              <th>First payment</th> 
              <th>Amount</th>
              <th>No of renewals</th> 
              <th>Last payment</th>
              <th>Due date</th>
              <th>Account status</th>      
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b?.subscriptionID}</td>
                <td onClick={closeMenu}>{b?.vendorName}</td>
                <td onClick={closeMenu} className={styles.amount}>{new Date(b?.firstPayment).toDateString() || "N/A"}</td>
                <td onClick={closeMenu} className={styles.amount}>{b?.amount?.toLocaleString() || "N/A"}</td>
                <td onClick={closeMenu}>{b?.noOfRenewals}</td>
                <td onClick={closeMenu}>{new Date(b?.lastPayment).toLocaleDateString() || "N/A"}</td>
                <td onClick={closeMenu}>{new Date(b?.dueDate).toLocaleDateString() || "N/A"} </td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b?.accountStatus.toLowerCase()]}`}>
                    {b?.accountStatus.toLowerCase()}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.vendorID)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.vendorID && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} style={{color:"#2ED074"}} onClick={() => openModal(<SubApprove vName={b?.vendorName} lPay={b?.lastPayment} renews={b?.noOfRenewals} id={b.vendorID} />)}>Activate account</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<SubRenew vName={b?.vendorName} lPay={b?.lastPayment} renews={b?.noOfRenewals} id={b.vendorID} />)}>Renew subscription</li>
                      <li className={styles.dropdownItem} onClick={() => handleReminder( b?.vendorID )}>Send payment reminder</li>
                      <li className={styles.dropdownItem} onClick={() => handleHistory(b?.vendorID)}>View subscription history</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<DeleteClient id={b.clientID} />)}>Download invoice/receipt</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<AdminMessage id={b?.vendorID} />)}>Message vendor</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<DeleteSub id={b?.subscriptionID} />)}>Delete subscription record</li>
                    </div>
                  )}
                </td>
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