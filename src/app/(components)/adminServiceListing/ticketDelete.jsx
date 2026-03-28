import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const TicketDelete = ({id}) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const del = formData.get("typeDelete");
        try{
            const token = localStorage.getItem("access_token");
            if (del === "DELETE"){
                const deleteRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/tickets/${id}`, {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await deleteRes.json();
                if (deleteRes.ok){
                    setSuccess(Data.message)
                    /* router.refresh(); */
                }
                if (!deleteRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
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
            <h3>DELETE TICKET LISTING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Deactivating this service listing makes the listing unavailable to users of the platform therefore no further booking of this service is possible. Also, a notice will be sent to the vendor regarding the updated status of the service listing.</p>
            </div>
             {error && <p style={{color:"#E50909"}}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DELETE]' type='text' name='typeDelete' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Delete service listing
                </button>
            </form>
            
        </div>
    );
}
 
export default TicketDelete;