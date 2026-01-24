import Link from 'next/link';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import styles from '../(signIn)/signIn.module.css'
import Image from 'next/image';
import SignIn from '../(signIn)/signIn';
import Confirmation from '../(confirmation)/confirmation';
import { useAuth } from '@/app/contexts/AuthContext';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';
import { useState } from 'react';

const UserSignUp = () => {
    const { openModal } = useModal();
    const { closeModal } = useModal();
    const {signUp} = useAuth();
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const lastName = formData.get("lastName");
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        setLoading(true)
        try{
            const result = await signUp(username, password, phone, email, middleName, firstName, lastName); 
            if (result.status==='success') {
                openModal(<Confirmation />)
            }
        } catch (err) {
            console.log("this is signup error", err)
            if (err.status === 'error') {
                setFormError(err.message);
            }
            if (err.status === 'fail') {
                setFormError(err.details);
            }

        }
        setLoading(false)
        
    };



    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>Create your account</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input placeholder="User Name" name='username' type="text" />
                <input placeholder="Surname" name='lastName' type="text" />
                <input placeholder="First name" name='firstName' type="text" />
                <input placeholder="Other name" name='middleName' type="text" />
                <input placeholder="Email address" name='email' type='email' />
                <input placeholder="Phone number" name='phone' type="tel" />
                <input placeholder="Password" name='password' type="password" />
                {/* <input placeholder="Confirm password" name='confirmPassword' type="password" /> */}
                <p className='error'>{formError}</p>
                <p className={styles.forgotPassword}>Forgot password?</p>
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Create account
                    </span>
                    {loading && <ButtonLoader />}
                </button>
                <div className={styles.CTAdiv}>
                    <p style={{color:'#636363'}}>Already have an account?</p>
                    <p style={{color:'#82027D', cursor: 'pointer'}} onClick={() => openModal(<SignIn />)}>Sign in here</p>
                </div>
            </form>
            <div className={styles.termsCond}>
                By continuing, you confirm that you are 18 years or older & agree to our <Link href='/' style={{color:'#82027D'}}>Terms of Service</Link> and <Link href='/' style={{color:'#82027D'}}>Privacy Polic</Link> y. Your information is protected and will only be used to improve your experience on our platform. eEvents will never share your data with third parties without your consent.
            </div>
        </div>
    );
}
 
export default UserSignUp;