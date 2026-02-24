import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from './reschedule.module.css';
const Reject = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const reject = formData.get("typeReject");
        const reason = formData.get("message");
        try{
            const token = localStorage.getItem("access_token");
            if (reject === "REJECT"){
                const rejectRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}/reject-reschedule`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id,reason}),
                });

                const Data  = await rejectRes.json();
                if (!rejectRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
            } else (
                setError("Please type REJECT exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return (
        <div className={styles.signContainer}>
            <h3>REJECT RESCHEDULE REQUEST</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE: Rejecting this reschedule request means the event will not move to the new date proposed by the client. The admin will be notified, and further steps regarding the booking status or refund (if applicable) will follow the Terms and Conditions of eEvents. Please only reject if you’re certain you cannot meet the revised schedule.</p>
            </div>
            <div className={Styles.rescheduleDetails}>
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Initial event date</p>
                    <p>June 28th, 2025</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>New event date</p>
                    <p>July 11th, 2025</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Reschedule reason</p>
                    <p>Several key guests and participants won’t be available on the initial date, and I’d like to shift the event to accommodate them.</p>
                </li>
            </div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <textarea className={styles.contactTxt} placeholder='Reason for rejecting' name="message" id="message" />
                <input placeholder='Type [REJECT]' type='text' name='typeReject' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                Reject Reschedule
                </button>
            </form>
            
        </div>
    );
}
 
export default Reject;