'use client';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useAuth } from "@/app/contexts/AuthContext";
import styles from './signIn.module.css';
import Image from 'next/image';
import Link from 'next/link';
import UserSignUp from '../(userSignUp)/userSignUp';
import { useState } from 'react';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';
import ForgetPassword from '@/app/(components)/forgetPass/page';
const SignIn = () => {
    const { openModal } = useModal();
    const { closeModal } = useModal();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = formData.get("user");
        const password = formData.get("password");
        setLoading(true)
        try{
            const result = await login(user, password);  // This does everything
            if (result.status==="success"){
                setLoading(false)
                closeModal();
            }
        }catch(err){
            setError(err.message)
            setLoading(false)
        }
        
        
        
    };

    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>Sign in to continue</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input placeholder="email address" type='email' name='user'/>
                {/* <input placeholder="user name" type='text' name='user'/> */}
                <input type="password" placeholder="Password" name='password' />
                <p onClick={() => openModal(<ForgetPassword />)} className={styles.forgotPassword}>Forgot password?</p>
                <p className="error">{error}</p>
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Sign In
                    </span>
                    {loading && <ButtonLoader />}
                </button>
                <div className={styles.CTAdiv}>
                    <p style={{color:'#636363'}}>Don’t have an account?</p>
                    <p style={{color:'#82027D', cursor: 'pointer'}} onClick={() => openModal(<UserSignUp />)}>Create an account here</p>
                </div>
            </form>
            <div className={styles.termsCond}>
                By continuing, you confirm that you are 18 years or older & agree to our <Link href='/' style={{color:'#82027D'}}>Terms of Service</Link> and <Link href='/' style={{color:'#82027D'}}>Privacy Polic</Link> y. Your information is protected and will only be used to improve your experience on our platform. eEvents will never share your data with third parties without your consent.
            </div>
        </div>
    );
}

export default SignIn;
