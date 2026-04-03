import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
/* import Styles from './reschedule.module.css'; */
const DeleteSub = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const deleted = formData.get("typeDeleted");
        try{
            const token = localStorage.getItem("access_token");
            if (deleted === "DELETE"){
                const deletedRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/subscriptions/${id}`, {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json",
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await deletedRes.json();
                if (!deletedRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
            } else (
                setError("Please type DELETE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return ( 
        <div className={styles.signContainer}>
            <h3>DELETE SUBSCRIPTION RECORD</h3>
            
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE: You are about to permanently delete this vendor’s subscription record from the system. This action cannot be undone. All related details, including payment history and renewal logs, will be removed from the database. Deleting a subscription record does not automatically deactivate the vendor’s account — any necessary account action should be handled separately.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DELETE]' type='text' name='typeDeleted' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                 {error && <p style={{color:"#E50909"}}>{error}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Delete record
                </button>
            </form>
            
        </div>
    );
}
 
export default DeleteSub;