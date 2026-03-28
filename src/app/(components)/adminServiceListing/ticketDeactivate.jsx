import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const TicketDeactivate = ({id}) => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const deactivate = formData.get("typeDeactivate");
        try{
            const token = localStorage.getItem("access_token");
            if (deactivate === "DEACTIVATE"){
                const deactivateRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/tickets/${id}/deactivate`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await deactivateRes.json();
                if (!deactivateRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
            } else (
                setError("Please type DEACTIVATE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>DEACTIVATE SERVICE LISTING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Deactivating this service listing makes the listing unavailable to users of the platform therefore no further booking of this service is possible. Also, a notice will be sent to the vendor regarding the updated status of the service listing.</p>
            </div>
             {error && <p style={{color:"#E50909"}}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DEACTIVATE]' type='text' name='typeDeactivate' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Deactivate service listing
                </button>
            </form>
            
        </div>
    );
}
 
export default TicketDeactivate;