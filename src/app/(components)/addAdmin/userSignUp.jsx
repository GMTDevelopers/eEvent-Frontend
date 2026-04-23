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
        const lastName = formData.get("lastName");
        const firstName = formData.get("firstName");
        const role = [formData.get("roles")];
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        setLoading(true)
        try{
            const result = await signUp(username, password, phone, email, middleName, firstName, lastName, role); 
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
                <h3>ADD ADMIN</h3>
                <div className={styles.termsCond}>
                    <b>PLEASE NOTE:</b> Creating admin accounts grants admin access to the platform based on the role granted.
                </div>
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input placeholder="Last Name" name='lastName' type="text" />
                <input placeholder="First name" name='firstName' type="text" />
                <input placeholder="Email address" name='email' type='email' />
                <select className={styles.select} name="roles" >
                    <option value="" disabled selected> User Role</option>
                    <option value="SUB_ADMIN">Sub-admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="DIRECTOR">Director</option>
                </select>
                <input placeholder="Phone number" name='phone' type="tel" />
                <input placeholder="Password" name='password' type="password" />                        
                <p className='error'>{formError}</p>
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    <span style={{ visibility: loading ? "hidden" : "visible" }}>
                        Create account
                    </span>
                    {loading && <ButtonLoader />}
                </button>
                
            </form>
           
        </div>
    );
}
 
export default UserSignUp;