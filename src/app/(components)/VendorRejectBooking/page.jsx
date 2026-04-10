import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const VendorReject = ({id}) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleRejectSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const reason = formData.get("reason");
        const reject = formData.get("typeReject");
        try{
            const token = localStorage.getItem("access_token");
            if (reject === "REJECT"){
                const rejectRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}/reject`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({reason}),
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
            <h3>REJECT BOOKING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE:  By rejecting this booking, you understand that the client will be notified immediately. This action cannot be undone, and the slot for this event date will be released for other vendors. Please ensure your decision is final before proceeding.</p>
            </div>
            <form onSubmit={handleRejectSubmit} className={styles.signInForm}>
                <textarea className={styles.cancleTxt} placeholder='Reason for rejecting' name="reason"  />
                <input placeholder='Type [REJECT]' type='text' name='typeReject' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                {error && <p className="error">{error}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Reject booking
                </button>
            </form>
            
        </div>
    );
}
 
export default VendorReject;