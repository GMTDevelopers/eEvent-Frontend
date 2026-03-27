'use client'
import { useState } from 'react';
import ButtonLoader from '../(components)/loading/buttonLoader';
import styles from './signIn.module.css';
import Styles from '@/app/navbar/(signIn)/signIn.module.css';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from "next/navigation";
const AdminSignUp = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const user = formData.get("user");
        const password = formData.get("password");
        setLoading(true)
        try{
            const result = await login(user, password);
            if (result.status==="success"){
                setLoading(false)
                router.push("/admin/dashboard");
            }
        }catch(err){
            setError(err.message)
            setLoading(false)
        }        
    };


    return ( 
        <div className="main">
            <div className={styles.header}>
                <h1>eEvents Admin Dashboard </h1>
                <p style={{color:"#636363"}} className="txtHeader">Login to manage all platform activities</p>
            </div>
            <br />
            <form className={`${Styles.signInForm} ${styles.signUpForm}`} onSubmit={handleSubmit}>
                <p className="txtHeader">ENTER YOUR CREDENTIALS TO SIGN IN</p>
                <input placeholder="email address" type='email' name='user'/>
                <input type="password" placeholder="Password" name='password' />
                {/* {success && <p style={{color:"#2d9f35"}}>{success}</p>} */}
                <p className="error">{error}</p>
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Sign In
                    </span>
                    {loading && <ButtonLoader />}
                </button>

            </form>
        </div>
    );
}
 
export default AdminSignUp;