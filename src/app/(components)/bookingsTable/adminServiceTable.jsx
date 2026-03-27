// app/components/BookingsTable.jsx
"use client";

import { useState } from "react";
import styles from "./BookingsTable.module.css";
import { useRouter } from "next/navigation";
import { useModal } from "../ModalProvider/ModalProvider";
import ApproveListings from "../adminServiceListing/approve";
import AdminVendorMessage from "../message/adminVendorMessage";
import DeactivateListings from "../adminServiceListing/deactivate";


export default function AdminServiceTable({ bookings = [] }) {
  const router = useRouter();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { openModal } = useModal();
  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };
  const data = bookings.data.data||[]
  const closeMenu = () => setOpenMenuId(null);

  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table style={{fontSize:"13px"}} className={styles.table}>
          <thead>
            <tr>
              <th>Service ID</th>
              <th>Vendor name</th>
              <th>Service</th> 
              <th>Category</th>
              <th>Date added</th>
              <th>Total orders</th>
              <th>Status</th>      
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.length !==0 && data.map((b,index) => (
              <tr className={styles.dataRow} key={index} >
                <td onClick={closeMenu}>{b.serviceID}</td>
                <td onClick={closeMenu}>{b.vendorName}</td>
                <td onClick={closeMenu}>{b.service}</td>
                <td onClick={closeMenu}>{b.category}</td>
                <td onClick={closeMenu}>{new Date(b.dateAdded).toLocaleDateString()}</td>
                <td onClick={closeMenu} className={styles.amount}>{b.totalOrders}</td>
                <td onClick={closeMenu}> 
                  <span className={`${styles.status} ${styles[b.status.toLowerCase()]}`}>
                    {b.status.toLowerCase()}
                  </span>
                </td>
                <td className={styles.actionCell}>
                  <button onClick={() => toggleMenu(b.serviceID)} className={styles.dotsBtn}>
                    ⋮
                  </button>
                  {openMenuId === b.serviceID && (
                    <div className={styles.dropdown} onClick={(e) => e.stopPropagation()}>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/servicesBookings/serviceDetails/${b.serviceID}`)}>View service listing</li>
                      <li className={styles.dropdownItem} style={{color:"#2ED074"}} onClick={() => openModal(<ApproveListings id={b.serviceID} />)}>Approve service listing</li>
                      <li className={styles.dropdownItem} onClick={() => router.push(`/admin/servicesBookings/orderHistory?id=${b.serviceID}`)}>View booking history</li>
                      <li className={styles.dropdownItem} onClick={() => openModal(<AdminVendorMessage id={b.vendorId} />)}>Message vendor</li>
                      <li className={styles.dropdownItem} style={{color:"#E50909"}} onClick={() => openModal(<DeactivateListings id={b.serviceID} />)} >Deactivate listing</li>
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