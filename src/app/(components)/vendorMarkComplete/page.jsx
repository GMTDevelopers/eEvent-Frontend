'use client'
import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';

const MarkComplete = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleCompleteSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const complete = formData.get("typeComplete");
        try{
            const token = localStorage.getItem("access_token");
            if (complete === "COMPLETE"){
                const completeRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}/complete`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                 /*    body: JSON.stringify({id}), */
                });

                const Data  = await completeRes.json();
                if (!completeRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                 if (Data.status === "success"){
                    setSuccess(Data.message)
                    setTimeout(() => {
                        window.location.reload()
                    }, 2500);
                }
                
                console.log(Data)
            } else (
                setError("Please type COMPLETE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return ( 
        <div className={styles.signContainer}>
            <h3>MARK COMPLETED</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: By marking this event as completed, you confirm that all agreed services have been fully delivered to the client’s satisfaction. The client and admin will be notified to verify completion before payment is released. Please ensure all tasks are truly completed before proceeding.</p>
            </div>
            <div className={Styles.rescheduleDetails}>
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event title</p>
                    <p>Mama Arowosaye’s 60th Birthday</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event date</p>
                    <p>July 11th, 2025.</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Service booked</p>
                    <p>Full Photography Coverage</p>
                </li>
            </div>
            <form onSubmit={handleCompleteSubmit} className={styles.signInForm}>
                <input placeholder='Type [COMPLETE]' type='text' name='typeComplete' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Mark completed
                </button>
            </form>
            
        </div>
    );
}
 
export default MarkComplete;