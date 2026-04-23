'use client'
import { useEffect, useState } from 'react';
import styles from '../adminUpdateStatus/updatePayStatus.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
import { useRouter } from 'next/navigation';
import ButtonLoader from '../loading/buttonLoader';

const ApproveVendor = ({id, vName, bName, date, status}) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(null)
    const router = useRouter();

    const handleSubmit = async (e) => {
        setLoading(true)
        console.log(id)
        e.preventDefault();
        const formData = new FormData(e.target);
        const accept = formData.get("typeAccept");
        try{
            const token = localStorage.getItem("access_token");
            if (accept === "APPROVE"){
                const acceptRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/vendors/${id}/approve`, {
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
                setSuccess(Data.message)
                console.log(Data)
                setLoading(false)
                setTimeout(() => {
                    window.location.reload()
                }, 900);
            } else (
                
                setError("Please type APPROVE exactly to confirm.")
                
            )
        }   catch(err){
            setLoading(false)
            setError(err.message)
            console.log(err)
        }
        setLoading(false)
    };

    return ( 
        <div className={styles.signContainer}>
            <h3>APPROVE VENDOR</h3>             
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Before approving this vendor account, please ensure that all verification documents have been reviewed and confirmed authentic. Approving this account will grant the vendor full access to the platform, including the ability to receive bookings, payments, and interact with clients.</p>
            </div>
            <div className={Styles.rescheduleDetails}>
               
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Vendor name</p>
                    <p>{vName}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Business name</p>
                    <p>{bName}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Date registered</p>
                    <p>{new Date(date).toDateString()} </p> 
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Account status </p>
                    <p>{status} </p>
                </li>
                
            </div>
            <form onSubmit={handleSubmit} className={styles.bookForm}>      
                <span className='btnNoCapsule' onClick={() => router.push(`/admin/userManagement/${id}`)}>See vendor profile</span>   
                <input placeholder='Type [APPROVE]' type='text' name='typeAccept' />
                
                {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit"> { loading ? <ButtonLoader /> : "Update status"} </button>
            </form>
            
        </div>
    );
}
 
export default ApproveVendor;