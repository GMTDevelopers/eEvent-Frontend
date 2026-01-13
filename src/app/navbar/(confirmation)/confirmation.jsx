'use client';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import styles from '../(signIn)/signIn.module.css';
import Image from 'next/image';
import Link from 'next/link';
import UserSignUp from '../(userSignUp)/userSignUp';
const Confirmation = () => {
    const { openModal } = useModal();
    const { closeModal } = useModal();
    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>Confirm your email address</h3>
                <div>
                    <Image src="/images/shield.png" alt='sheild' height={18} width={18} />
                    <p style={{color:'#636363'}}>Your information is secure</p>
                </div>
            </div>
            
            <div className={styles.termsCond}>
                We've sent a confirmation link to your email address. Please click the link in that email to verify your account and continue your registration on eEvents.
                <br /><br />
                If you dont see the message in your inbox, kindly check your spam or promotions folder.
            </div>

            <div className={styles.CTAdiv}>
                <p style={{color:'#636363'}}>Already have an account?</p>
                <p style={{color:'#82027D', cursor: 'pointer'}} onClick={() => openModal(<Confirmation />)}>Sign in here</p>
            </div>
        </div>
    );
}

export default Confirmation;
