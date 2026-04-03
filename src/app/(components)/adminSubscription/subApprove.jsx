import { useEffect, useState } from 'react';
import styles from '../adminUpdateStatus/updatePayStatus.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
import { useRouter } from 'next/navigation';
import { useModal } from '../ModalProvider/ModalProvider';

const SubApprove = ({id, vName, renews, lPay}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const { closeModal } = useModal();

    const handleSubmit = async (e) => {
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeAccept");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "APPROVE"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/activate`, {
                    method: "PATCH",
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
                if (acceptRes.ok){
                    console.log(Data)
                    setSuccess(Data.message)
                    closeModal();
                    router.refresh();
                }
            } else (
                setError("Please type APPROVE exactly to confirm.")
            )
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>APPROVE ACCOUNT</h3>             
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: You are about to manually activate this vendor’s account. This action will immediately grant the vendor full access to their dashboard and allow them to receive bookings. Please ensure this activation is intentional — typically used for verified renewals, approved promos, or special admin exceptions.</p>
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
                <input placeholder='Type [APPROVE]' type='text' name='typeAccept' />
                
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button style={{backgroundColor:"#2d9f35"}} type="submit"> Activate account </button>
            </form>
            
        </div>
    );
}
 
export default SubApprove;