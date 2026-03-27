'use client'
import { use, useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from './updatePayStatus.module.css';
import { useRouter } from 'next/navigation';
import { useModal } from '../ModalProvider/ModalProvider';
const UpdateStatus = ({id, eventId, eventDate, total, payStatus, paidVendor, cStatus, vStatus, balance}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { closeModal } = useModal();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const paymentStatus = formData.get("paymentStatus");

        console.log(paymentStatus)
        try{
            const token = localStorage.getItem("access_token");

                const rejectRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/bookings/${id}/payment-status`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({paymentStatus}),
                });

                const Data  = await rejectRes.json();
                setSuccess(Data.message)
                if (rejectRes.ok){
                    closeModal(); 
                    router.refresh();
                }
                
                
                console.log(Data)
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    }; 
    return (
        <div className={styles.signContainer}>
            <h3>UPDATE PAYMENT STATUS</h3>
            <br />
            <div className={Styles.rescheduleDetails}>
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event ID</p>
                    <p>{eventId}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event date</p>
                    <p>{new Date(eventDate).toDateString()}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Total amount</p>
                    <p>{total}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Amount paid to vendor</p>
                    <p>{paidVendor}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Current payment status</p>
                    <p>{payStatus || "N/A"}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Client status</p>
                    <p>{cStatus || "N/A"}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Vendor status</p>
                    <p>{ vStatus || "N/A"}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Payment balance</p>
                    <p>{ balance || "N/A"}</p>
                </li>
            </div>
            <form onSubmit={handleSubmit} className={Styles.bookForm}>
                <select defaultValue="Select new payment status" name="paymentStatus">
                    <option disabled>Select new payment status</option>                 
                    <option value="PENDING">
                        pending
                    </option>                                
                    <option value="PART_PAID">
                        part paid
                    </option>                                
                    <option value="FULLY_PAID">
                        fully paid
                    </option>                                
                </select>
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit"> Update payment status </button>
            </form>
            
        </div>
    );
}
 
export default UpdateStatus;