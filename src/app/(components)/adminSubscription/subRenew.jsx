import { useEffect, useState } from 'react';
import styles from '../adminUpdateStatus/updatePayStatus.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
import { useRouter } from 'next/navigation';

const SubRenew = ({id, vName, renews, lPay}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeRenew");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "RENEW"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/subscription/renew`, {
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
                setError("Please type RENEW exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>RENEW SUBSCRIPTION</h3>             
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: This action will manually renew the vendor’s subscription plan. Ensure that the vendor’s payment has been confirmed or that this renewal is being granted under an approved circumstance. Renewing the subscription will extend the vendor’s active period and reinstate full access to all platform features.</p>
            </div>
            <div className={Styles.rescheduleDetails}>
               
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Vendor name</p>
                    <p>{vName}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Last payment</p>
                    <p>{new Date(lPay).toDateString()}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>No. of renewals</p>
                    <p>{renews} </p> 
                </li>
            </div>
            <form onSubmit={handleSubmit} className={styles.bookForm}>      
                <input placeholder='Type [RENEW]' type='text' name='typeRenew' />
                
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit"> Renew subscription </button>
            </form>
            
        </div>
    );
}
 
export default SubRenew;