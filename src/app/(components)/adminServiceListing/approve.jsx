'use clients';
import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const ApproveListings = ({id}) => {

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
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/services/${id}/approve`, {
                    method: "POST",
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
                setTimeout(() => {
                    window.location.reload()
                }, 700);
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
            <h3>APPROVE SERVICE LISTING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Approving this service listing confirms the vendor is duly registered on eEvents and makes this listing live and viewable to all platform users. Ensure the listing is well stated with proper visuals and pricing information correctly supplied.</p>
            </div>
             {error && <p style={{color:"#E50909"}}>{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [ACCEPT]' type='text' name='typeAccept' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Accept booking
                </button>
            </form>
            
        </div>
    );
}
 
export default ApproveListings;