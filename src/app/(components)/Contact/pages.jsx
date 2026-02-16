import { useState } from 'react';
import styles from '../../navbar/(signIn)/signIn.module.css';

const Contact = () => {

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [priority, setPriority] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const subject = formData.get("subject");
        const message = formData.get("contact");
        const priority = formData.get("priority");
        try{
            const token = localStorage.getItem("access_token");
            const contactRes = await fetch(`https://eevents-srvx.onrender.com/v1/client/support`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" ,
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ subject, message, priority }),
            });

            const Data  = await contactRes.json();
            if (!contactRes.ok){
                throw{
                    status: Data.status,
                    code: Data.code,
                    message: Data.message,
                }
            }
            setSuccess(Data.message)
            console.log(Data)
            e.target.reset()

        }catch(err){
            setError(err.message)
            console.log(err)
        }
    };


    return ( 
        <div className={styles.signContainer} onSubmit={handleSubmit}>
            <h3>CONTACT SUPPORT</h3>
             {error && <p className="error">{error}</p>}
            <form className={styles.signInForm}>
                <input style={{outline:"1px solid #636363"}} placeholder='subject' type='text' name='subject'/>
                <textarea className={styles.contactTxt} placeholder='Type message here' name="contact" id="" />
                <select style={{outline:"1px solid #636363"}} onChange={(e) => setPriority(e.target.value)} required name="eventType">
                    <option value="" selected hidden disabled>Priority</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit">
                Send message
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#999999'}}>eEvents support is available exclusively for inquiries concerning active bookings, vendor performance, or service delivery disputes. Our team is available to help resolve concerns quickly and ensure a smooth experience on eEvents.</p>
            </div>
        </div>
    );
}
 
export default Contact;