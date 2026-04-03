import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
/* import Styles from './reschedule.module.css'; */
const DeleteVendor = ({id}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeAccept");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "DELETE"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}`, {
                    method: "DELETE",
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
                setError("Please type DELETE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };
    return ( 
        <div className={styles.signContainer}>
            <h3>DELETE VENDOR</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE: Deleting this vendor account will permanently remove the vendor’s profile, listings, transaction history, and all associated data from the eEvents platform. This action CANNOT be undone and should only be taken after all necessary reviews and confirmations have been completed.</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DELETE]' type='text' name='typeAccept' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Delete vendor
                </button>
            </form>
            
        </div>
    );
}
 
export default DeleteVendor;