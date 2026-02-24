'use client'
import { useAuth } from '@/app/contexts/AuthContext';
import { useState } from 'react';
import styles from './settings.module.css';
import SettingsTabs from '@/app/(components)/vendorTabs/pages';
const Settings = () => {

 const {logedInUser} = useAuth()
    const [passportPhoto, setPassportPhoto] = useState(logedInUser.data.profileImage || '/images/defaultDP.jpg' )
    const [businessLogo, setBusinessLogo] = useState(logedInUser.data.profileImage || '/images/defaultDP.jpg' )
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
/*     const isPhotoChanged = passportPhoto instanceof File; */

/*     const [form, setForm] = useState({
        firstName: logedInUser.data.firstName || '',
        middleName: logedInUser.data.middleName || '',
        lastName: logedInUser.data.lasttName || '',
        email: logedInUser.data.email || '',
        phone: logedInUser.data.phone || '',
        notifications: logedInUser.data.notifications ?? true,
        password: '',
    }); */
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPassportPhoto(file);
    };
    const handleBusinessLogoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setBusinessLogo(file);
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
           /*  const token = localStorage.getItem("access_token");
            if (!token) throw new Error('Not authenticated');

            const formData = new FormData();

            // ---- text fields ----
            formData.append('notifications', form.notifications);
            formData.append('firstName', form.firstName);
            formData.append('lastName', form.lastName);
            formData.append('middleName', form.middleName);
            formData.append('phone', form.phone);
            formData.append('email', form.email);


            if (form.password) {
                formData.append('password', form.password);
            }
 */
            // ---- photo (only if changed) ----
            if (passportPhoto instanceof File) {
                formData.append('profileImage', passportPhoto);
            }
            if (businessLogo instanceof File) {
                formData.append('profileImage', businessLogo);
            }

            /* const res = await fetch(`https://eevents-srvx.onrender.com/v1/auth/profile`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Update failed');

            setMessage('Profile updated successfully!');
            setForm({ ...form, password: '' }); */

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    }; 

    
    return ( 
        <div className={`main ${styles.settings}`}>
            <div className={styles.settingsContainer}>
                <div className={styles.photoPack}>
                    <div className={styles.photoItem}>
                        <img src={passportPhoto instanceof File ? URL.createObjectURL(passportPhoto) : passportPhoto} alt="profile" />
                        <label className={styles.uploadBtn}>
                            change passport photo
                            <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: 'none' }} />
                        </label>
                    </div>
                    <div className={styles.photoItem}>
                        <img src={businessLogo instanceof File ? URL.createObjectURL(businessLogo) : businessLogo} alt="profile" />
                        <label className={styles.uploadBtn}>
                            change business logo
                            <input type="file" accept="image/*" onChange={handleBusinessLogoChange} style={{ display: 'none' }} />
                        </label>
                    </div>
                </div>

                <SettingsTabs />
            </div>
        </div>
    );
}
 
export default Settings;