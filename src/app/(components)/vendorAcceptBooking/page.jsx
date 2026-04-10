import styles from '../../navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const VendorAccept = ({id}) => {
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
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/bookings/${id}/accept`, {
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
            } else (
                setError("Please type ACCEPT exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>ACCEPT BOOKING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Accepting this booking confirms your availability and commitment to the client. You are expected to provide excellent service within the agreed timelines. Please maintain all communication through the eEvents platform for transparency and client protection. Payments will be disbursed according to our Terms and Conditions, following confirmation of service completion by the client</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <input placeholder='Type [ACCEPT]' type='text' name='typeAccept' />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                {error && <p className="error">{error}</p>}
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Accept booking
                </button>
            </form>
            
        </div>
    );
}
 
export default VendorAccept;