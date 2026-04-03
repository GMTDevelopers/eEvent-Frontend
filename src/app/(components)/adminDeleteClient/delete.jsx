import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const DeleteClient = ({id}) => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const deleted = formData.get("typeDelete");
        try{
            const token = localStorage.getItem("access_token");
            if (deleted === "DELETE"){
                const deletedRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/clients/${id}`, {
                    method: "DELETE",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({id}),
                });

                const Data  = await deletedRes.json();
                if (deletedRes.ok){
                    setSuccess(Data.message)
                    router.refresh();
                }
                if (!deletedRes.ok){
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
            <h3>DELETE CLIENT</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Deleting this client account will permanently remove the client’s profile, listings, transaction history, and all associated data from the eEvents platform. This action CANNOT be undone and should only be taken after all necessary reviews and confirmations have been completed.</p>
            </div>
             {error && <p style={{color:"#E50909"}}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [DELETE]' type='text' name='typeDelete' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#E50909'}} type="submit">
                    Delete client
                </button>
            </form>
            
        </div>
    );
}
 
export default DeleteClient;