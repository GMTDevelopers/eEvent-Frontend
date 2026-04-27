'use client';

import styles from '@/app/navbar/(signIn)/signIn.module.css';
import Image from 'next/image';
import { useState } from 'react';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';

const ForgetPassword = () => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");

        setLoading(true)
        try{

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/auth/forgot-password`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email}),
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
                <h3>Forget Password</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input placeholder="email address" type='email' name='email'/>
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                 {error && <p style={{color:"#E50909"}}>{error}</p>}
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Submit
                    </span>
                    {loading && <ButtonLoader />}
                </button>
               
            </form>
        </div>
    );
}

export default ForgetPassword;
