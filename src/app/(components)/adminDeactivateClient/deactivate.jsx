import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeactivateClient = ({id}) => {
    const router = useRouter();
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
                const deactivateRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/clients/${id}/deactivate`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await deactivateRes.json();
                if (deactivateRes.ok){
                    setSuccess(Data.message)
                    router.refresh();
                }
                if (!deactivateRes.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
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
            <h3>DEACTIVATE CLIENT</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Deactivating this client account will temporarily restrict the client’s access to all platform features, including making new bookings, managing ongoing events and payments. Use this for reasons such as policy violations, client complaints, or pending investigations.</p>
            </div>
             {error && <p style={{color:"#E50909"}}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DEACTIVATE]' type='text' name='typeDeactivate' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#82027D'}} type="submit">
                    Deactivate client
                </button>
            </form>
            
        </div>
    );
}
 
export default DeactivateClient;