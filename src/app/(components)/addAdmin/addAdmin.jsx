'use client'
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import styles from '@/app/navbar/(signIn)/signIn.module.css'
import ButtonLoader from '@/app/(components)/loading/buttonLoader';
import { useState } from 'react';
import Confirmation from '@/app/navbar/(confirmation)/confirmation';
import ActionComplete from '../requestSent/actionComplete';

const AddAdmin = () => {
    const { openModal } = useModal();
    const [loading, setLoading] = useState(false)
    const [formError, setFormError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const lastName = formData.get("lastName");
        const firstName = formData.get("firstName");
        const role = formData.get("roles");
        const email = formData.get("email");
        const phone = formData.get("phone");
        const password = formData.get("password");
        setLoading(true)
        try{
            const token = localStorage.getItem("access_token");
            const res = await fetch(`https://eevents-srvx.onrender.com/v1/admin/accounts`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json" ,
                    authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ lastName, firstName, role, email, phone, password}),
            });

            const Data  = await res.json();
            if (Data.status==='success') {

                openModal(<ActionComplete />)
                setTimeout(() => {
                    window.location.reload()
                }, 2500);
            }
            setLoading(false)
        } catch (err) {
            console.log("this is signup error", err)
            if (err.status === 'error') {
                setFormError(err.message);
            }
            if (err.status === 'fail') {
                setFormError(err.details);
            }
            setLoading(false)
        }
        setLoading(false)
        
    };



    return ( 
        <div className={styles.signContainer}>
            <div className={styles.signHeader}>
                <h3>ADD ADMIN</h3>
            </div>
            <div>
                <b>PLEASE NOTE:</b> Creating admin accounts grants admin access to the platform based on the role granted.
            </div>
            <form className={styles.signInForm} onSubmit={handleSubmit}>
                <input placeholder="Last Name" name='lastName' type="text" />
                <input placeholder="First name" name='firstName' type="text" />
                <input placeholder="Email address" name='email' type='email' />
                <input placeholder="Phone number" name='phone' type="tel" />
                <input placeholder="Password" name='password' type="password" />  
                <select className={styles.select} name="roles" >
                    <option value="" disabled selected> User Role</option>
                    <option value="ADMIN" title="Has all permissions">
                        Admin
                    </option>
                    <option value="SUB_ADMIN">Sub-admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="DIRECTOR">Director</option>
                </select>                      
                <p className='error'>{formError}</p>
                <button style={{ display: "flex", alignItems:"center", justifyContent:"center" }} disabled={loading} type="submit">
                    
                    {loading ? 
                        <ButtonLoader /> 
                        : 
                        <span style={{ visibility: loading ? "hidden" : "visible" }}>
                            Create account
                        </span>
                    }
                </button>
                
            </form>
           
        </div>
    );
}
 
export default AddAdmin;