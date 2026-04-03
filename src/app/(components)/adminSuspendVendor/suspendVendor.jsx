import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
/* import Styles from './reschedule.module.css'; */
const SuspendVendor = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeAccept");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "SUSPEND"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/suspend`, {
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
                setError("Please type SUSPEND exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return ( 
        <div className={styles.signContainer}>
            <h3>SUSPEND VENDOR</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Suspending this vendor account will temporarily restrict the vendor’s access to all platform features, including receiving new bookings, managing ongoing events, and accessing payments. Use this for reasons such as policy violations, client complaints, or pending investigations.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [SUSPEND]' type='text' name='typeAccept' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Suspend vendor
                </button>
            </form>
            
        </div>
    );
}
 
export default SuspendVendor;