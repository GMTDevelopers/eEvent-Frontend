'use client'

import styles from '@/app/navbar/(signIn)/signIn.module.css';
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const ResetPassword = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get('token'); 
    const [loading, setLoading] = useState(null);

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newPassword = formData.get("password");

        setLoading(true)
        try{

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/auth/reset-password`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({token, newPassword}),
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
        }   catch(err){
            setError(err.message)
            console.log(err)
            setLoading(false)
        }
        setLoading(false)
        
    };

    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>Reset Password</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input type="password" placeholder="New Password" name='password' />
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                 {error && <p style={{color:"#E50909"}}>{error}</p>}
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Reset Password
                    </span>
                    {loading && <ButtonLoader />}
                </button>
               
            </form>
        </div>
    );
}
 
export default ResetPassword;