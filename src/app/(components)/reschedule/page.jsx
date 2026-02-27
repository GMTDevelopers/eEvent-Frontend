'use client'
import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
const Reschedule = ({id, initDate}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newEventDate = formData.get("newDate");
        const reason = formData.get("message");
        try{
            const token = localStorage.getItem("access_token");
            const rescheduleRes = await fetch(`https://eevents-srvx.onrender.com/v1/client/bookings/${id}/reschedule`, {
                method: "PATCH",
                headers: { 
                    "Content-Type": "application/json" ,
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ newEventDate, reason }),
            });

            const Data  = await rescheduleRes.json();
            if (!rescheduleRes.ok){
                throw{
                    status: Data.status,
                    code: Data.code,
                    message: Data.message,
                }
            }
            setSuccess(Data.message)
            console.log(Data)

        }catch(err){
            setError(err.message)
            console.log(err)
        }
    };

    return ( 
       <div className={styles.signContainer}>
            <h3>RESCHEDULE EVENT</h3>
            {error && <p className="error">{error}</p>}
            
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <label className={styles.label} htmlFor="initialDate">Initial event date</label>
                <input value={initDate} disabled type='text' name='initialDate'/>
                <label className={styles.label} htmlFor="newDate">New event date</label>
                <input type='date' name='newDate' />
                <textarea className={styles.contactTxt} placeholder='Reason for reschedule' name="message" id="message" />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit">
                Submit request
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909'}}>PLEASE NOTE: Requests to reschedule an event date are subject to admin approval and depend on vendor availability. Your request will remain pending until both the admin and vendor confirm the new date.</p>
            </div>
        </div>
    );
}
 
export default Reschedule;