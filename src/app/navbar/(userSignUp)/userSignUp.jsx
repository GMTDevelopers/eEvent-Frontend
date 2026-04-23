import Link from 'next/link';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import styles from '../(signIn)/signIn.module.css'
import bStyles from './userSignUp.module.css'
import Image from 'next/image';
import SignIn from '../(signIn)/signIn';
import Confirmation from '../(confirmation)/confirmation';
import { useAuth } from '@/app/contexts/AuthContext';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';
import { useState } from 'react';

const UserSignUp = () => {
    const { openModal } = useModal();
    const { closeModal } = useModal();
    const {signUp, signUpError} = useAuth();
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [formError2, setFormError2] = useState('')
    const [passportPhoto, setPassportPhoto] = useState('/images/defaultDP.jpg' )

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPassportPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //logo formdata
        const uploadLogo = new FormData();
        uploadLogo.append("file", passportPhoto);
        //signup formdata
        const formData = new FormData(e.target);
        const username = formData.get("username");
        const lastName = formData.get("lastName");
        const firstName = formData.get("firstName");
        const middleName = formData.get("middleName");
        const role = [formData.get("roles")];
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        setLoading(true)
        try{
            const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/logo", {
                method: "POST",
                body: uploadLogo,
            });

            if (!res.ok) {
                throw new Error("Upload failed");
            }
            const data = await res.json();
            if (res.ok && data.status === "success") {
                console.log("exisit?", data.data.url )
                const profileImage = data.data.url
                console.log("exists", profileImage)
                const result = await signUp(username, password, phone, email, middleName, profileImage, firstName, lastName, role); 
                if (result.status==='success') {
                    openModal(<Confirmation />)
                } 
                
            }
            
            //  return data.data[0].url;  backend re
            /* */
        } catch (err) {
            console.log("this is signup error", err)

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
                <div className={bStyles.photoPack}>
                    <div className={bStyles.photoItem}>
                        <img src={passportPhoto instanceof File ? URL.createObjectURL(passportPhoto) : passportPhoto} alt="profile" />
                        <label className={bStyles.uploadBtn}>
                            profile photo
                            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>
                <input placeholder="User Name" name='username' type="text" />
                <input placeholder="Surname" name='lastName' type="text" />
                <input placeholder="First name" name='firstName' type="text" />
                <input placeholder="Other name" name='middleName' type="text" />
                <input placeholder="Email address" name='email' type='email' />
                <select className={styles.select} name="roles" >
                    <option value="" disabled selected> User Role</option>
                    <option value="CLIENT">Client</option>
                    <option value="VENDOR">Vendor</option>
                </select>
                <input placeholder="Phone number" name='phone' type="tel" />
                <input placeholder="Password" name='password' type="password" />                        
                {/* <input placeholder="Confirm password" name='confirmPassword' type="password" /> */}
                {signUpError?.message && <p className='error'>{signUpError.message}</p>}
                {signUpError?.details?.First && <p className='error'>first {signUpError?.details?.First[0]}, first {signUpError?.details?.First[1]}</p>}
                {signUpError?.details?.Last && <p className='error'>last {signUpError?.details?.Last[0]}, last {signUpError?.details?.Last[1]}</p>}
                {signUpError?.details?.Middle && <p className='error'>middle {signUpError?.details?.Middle[0]}</p>}
                {signUpError?.details?.Profile &&<p className='error'>logo {signUpError?.details?.Profile[0]}</p>}
                {signUpError?.details?.Password && <p className='error'>password {signUpError?.details?.Password[0]}</p>}
                {signUpError?.details?.Email &&<p className='error'>email {signUpError?.details?.Email[0]}</p>}
                {signUpError?.details?.Please &&<p className='error'>{signUpError?.details?.Please[0]}</p>}
                {signUpError?.details?.Phone &&<p className='error'>{signUpError?.details?.Phone[0]}, {signUpError?.details?.Phone[1]}</p>}
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