import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from './reschedule.module.css';
const Accept = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeAccept");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "ACCEPT"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}/accept-reschedule`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await acceptRes.json();
                if (!acceptRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
            } else (
                setError("Please type AGREE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return ( 
        <div className={styles.signContainer}>
            <h3>ACCEPT RESCHEDULE REQUEST</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE:: By accepting this request, you acknowledge the new event date and agree to honor the booking under the revised schedule. Please ensure that all changes have been discussed with the client. Payment and completion terms remain governed by eEvents’ Terms and Conditions</p>
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
                <input placeholder='Type [ACCEPT]' type='text' name='typeAccept' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Accept Reschedule
                </button>
            </form>
            
        </div>
    );
}
 
export default Accept;