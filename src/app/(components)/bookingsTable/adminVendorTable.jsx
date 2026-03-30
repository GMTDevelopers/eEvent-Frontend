// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import ApproveListings from "../adminServiceListing/approve";
import AdminVendorMessage from "../message/adminVendorMessage";
import DeactivateListings from "../adminServiceListing/deactivate";


export default function AdminVendorTable({ bookings = [] }) {
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
              <th>Vendor ID</th>
              <th>Vendor name</th>
              <th>Business name</th> 
              <th>Date registered</th>
              <th>Total revenue</th>
              <th>Last Booking</th>
              <th>Service listings</th>
              <th>Total bookings</th>
              <th>Subscription status</th>      
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b?.vendorID}</td>
                <td onClick={closeMenu}>{b?.vendorName}</td>
                <td onClick={closeMenu}>{b?.businessName}</td>
                <td onClick={closeMenu}>{new Date(b?.dateRegistered).toLocaleDateString()}</td>
                <td onClick={closeMenu} className={styles.amount}>{b.totalRevenue}</td>
                <td onClick={closeMenu}>{new Date(b?.lastBooking).toLocaleDateString()}</td>
                <td onClick={closeMenu}>{b?.serviceListingsCount}</td>
                <td onClick={closeMenu}>{b?.totalBookings}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b?.subscriptionStatus.toLowerCase()]}`}>
                    {b?.subscriptionStatus.toLowerCase()}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.vendorID)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.vendorID && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/userManagement/${b.vendorID}`)}>View vendor information</li>
                      <li className={styles.dropdownItem} style={{color:"#2ED074"}} onClick={() => openModal(<ApproveListings id={b.serviceID} />)}>Approve vendor</li>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/servicesBookings/orderHistory?id=${b.serviceID}`)}>View booking history</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<AdminVendorMessage id={b.vendorId} />)}>Message vendor</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<DeactivateListings id={b.serviceID} />)}>View conversations</li>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/servicesBookings/orderHistory?id=${b.serviceID}`)}>Export vendor report (.pdf)</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<AdminVendorMessage id={b.vendorId} />)}>Suspend vendor</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<DeactivateListings id={b.serviceID} />)}>Delete vendor</li>
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