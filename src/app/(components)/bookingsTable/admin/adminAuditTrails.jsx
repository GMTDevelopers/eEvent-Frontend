// app/components/BookingsTable.jsx
"use client";
import styles from "../BookingsTable.module.css";

export default function AdminAudit({ bookings = [] }) {
  const data = bookings.data||[]
  console.log(data)

  return (
    <>
      {/* DESKTOP TABLE — hidden on mobile */}
      <div className={styles.desktopTable}>
        <table style={{fontSize:"16px", width:"70%", margin:"auto auto" }} className={styles.table}>
          <thead>
            <tr >
              <th>timestamp</th>
              <th>Action</th>
              <th>Actor</th>
            </tr>
          </thead>
          <tbody>
            {data.length !==0 && data.map((b,index) => (
              <tr style={{display:"flex", width:"70%", justifyContent:"space-between" }}className={styles.dataRow} key={index} >
                <td>{new Date(b.timestamp).toLocaleString()}</td>
                <td>{b.action}</td>
                <td>{b.actor}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}