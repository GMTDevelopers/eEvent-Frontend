import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';

const AdminVendorMessage = ({bookingId, receiverId}) => {
        const [error, setError] = useState('');
        const [success, setSuccess] = useState('');
        const handleSubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = {
                receiverId: receiverId,
                bookingId: bookingId,
                content: formData.get('message'), 
            }
            console.log(data)
            try{
                const token = localStorage.getItem("access_token");
                const res = await fetch(`https://eevents-srvx.onrender.com/v1/messages`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(data),
                });
                const Data  = await res.json();
                if (!res.ok){
                    throw{
                        status: Data.status,
                        code: Data.code,
                        message: Data.message,
                    }
                }
                setSuccess(Data.message)
                console.log(Data)
    
            }catch(err){
                setError(err.message)
                console.log(err)
            }
        };
    return ( 
        <div className={styles.signContainer}>
            <h3>MESSAGE VENDOR</h3>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit} className={styles.signInForm}>
                <textarea className={styles.contactTxt} placeholder='Type message here' name="message" id="message" />
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit">
                Send message
                </button>
            </form>
{/*             <div className={styles.termsCond}>
                <p style={{color:'#999999'}}>eEvents support is available exclusively for inquiries concerning active bookings, vendor performance, or service delivery disputes. Our team is available to help resolve concerns quickly and ensure a smooth experience on eEvents.</p>
            </div> */}
        </div>
    );
}
 
export default AdminVendorMessage;