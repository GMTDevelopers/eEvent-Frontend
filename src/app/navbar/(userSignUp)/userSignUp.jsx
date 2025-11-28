import Link from 'next/link';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import styles from '../(signIn)/signIn.module.css'
import Image from 'next/image';
import SignIn from '../(signIn)/signIn';
import Confirmation from '../(confirmation)/confirmation';

const UserSignUp = () => {
    const { openModal } = useModal();
    const { closeModal } = useModal();
    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>Create your account</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={(e) => { e.preventDefault(); closeModal(); }}>
                <input placeholder="Surname" type="text" />
                <input placeholder="First name" type="text" />
                <input placeholder="Other name" type="text" />
                <input placeholder="Email address" type='email' />
                <input placeholder="Phone number" type="tel" />
                <input placeholder="Password" type="password" />
                <input placeholder="Confirm password" type="password" />

                <p className={styles.forgotPassword}>Forgot password?</p>
                <button type="submit"> Create account </button>
                <div className={styles.CTAdiv}>
                    <p style={{color:'#636363'}}>Already have an account?</p>
                    <p style={{color:'#82027D', cursor: 'pointer'}} onClick={() => openModal(<Confirmation />)}>Sign in here</p>
                </div>
            </form>
            <div className={styles.termsCond}>
                By continuing, you confirm that you are 18 years or older & agree to our <Link href='/' style={{color:'#82027D'}}>Terms of Service</Link> and <Link href='/' style={{color:'#82027D'}}>Privacy Polic</Link> y. Your information is protected and will only be used to improve your experience on our platform. eEvents will never share your data with third parties without your consent.
            </div>
        </div>
    );
}
 
export default UserSignUp;