'use client'

import Link from 'next/link';
import styles from './signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css'
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const VendorSignUp = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [agreeText, setAgreeText] = useState('');
    const [error, setError] = useState('')
    const router = useRouter();

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!isAgreed){
            setError('You must accept the terms to continue.');
            return;
        } 

        if (agreeText.trim().toUpperCase() !== 'AGREE'){
            setError('You have to type in "AGREE');
            return;
        } 
        setError('');
        console.log(agreeText);
        console.log(error);
        // Navigate instead of submitting
       /*  router.push('/vendor/create-account'); */ // change to your actual route
    };

    return ( 
        <div className={`${styles.doubleType2} main`}>
            <aside className={`${styles.photoPack} aside`}>
                <Image height={620} width={589} src='/images/vendor/vendorAuth.png' alt="profile" />
            </aside>

            <section className={`${styles.mainSection} main`}>
                <div className={styles.header}>
                    <h1 style={{color:"#430340", fontStyle:"normal"}}>Create new vendor account</h1>
                </div>

                <div>
                    <form className={formStyles.signInForm} onSubmit={handleSubmit}>
                        <div className={styles.termsCond}>
                            <p>
                                <span style={{color:'#E50909'}}>DISCLAIMER:</span><br />
                                eEvents ensures safe transactions through an escrow-based payment model. Client funds are released only when work is confirmed completed. Please note that all vendor accounts require an active paid subscription to remain visible and receive bookings.
                            </p>
                        </div>

                        <div className={styles.termsCond}>
                            <input 
                                type="checkbox"
                                name="agree"
                                checked={isAgreed}
                                onChange={(e) => {setIsAgreed(e.target.checked); setError('')}}
                            />
                            <p style={{color:"#636363"}}>
                                By proceeding, I agree to eEvents{' '}
                                <Link href="/" style={{color:"#82027D"}}>
                                    Terms and Conditions
                                </Link>
                            </p>
                        </div>

                        <input 
                            placeholder="Type [AGREE]"
                            type="text"
                            name="user"
                            value={agreeText}
                            onChange={(e) => {setAgreeText(e.target.value); setError('')}}
                        />
                        
                        <button
                            type="submit"
                            disabled={!isAgreed || agreeText.trim().toUpperCase() !== 'AGREE'}
                            className={`${isAgreed ? styles.submitBtn : styles.disabledBtn}`}
                        >
                            {isAgreed ? 'Proceed' : 'Accept Terms to Continue'}
                        </button>
                        { error && (<p style={{color:"#E50909"}}>{error}</p>)}
                    </form>

                    <div className={formStyles.termsCond}>
                        Already have an account?{' '}
                        <Link href="/" style={{color:'#82027D'}}>Log In here.</Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default VendorSignUp;
