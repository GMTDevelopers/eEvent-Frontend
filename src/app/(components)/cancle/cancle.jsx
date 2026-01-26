import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const Cancle = ({id}) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const cancel = formData.get("typeCancle");
        const reason = formData.get("message");
        try{
            const token = localStorage.getItem("access_token");
            if (cancel === "CANCEL"){
                const cancelRes = await fetch(`https://eevents-srvx.onrender.com/v1/bookings/${id}/cancel`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ reason }),
                });

                const Data  = await cancelRes.json();
                if (!cancelRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
            } else (
                setError("Please type CANCEL exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>CANCEL BOOKING</h3>
             {error && <p className="error">{error}</p>}
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <textarea className={styles.cancleTxt} placeholder='Reason for cancelling' name="reason" id="" />
                <input placeholder='Type [CANCEL]' type='text' name='typeCancle' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                Submit request
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909'}}>PLEASE NOTE: All booking cancellations are reviewed by the eEvents admin team and processed according to vendor terms and refund policies. Refund eligibility is determined by the status of service preparation at the time of cancellation. In cases where vendors have commenced work or made purchases, partial or no refunds may apply. Additional details and conditions are outlined in our <Link href='/' style={{color:'#82027D'}}>Terms of Use.</Link> </p>
            </div>
        </div>
    );
}
 
export default Cancle;