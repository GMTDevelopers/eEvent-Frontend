'use client'
import styles from "./settings.module.css";
import SearchFilter from "@/app/(components)/search/page";
import StatsCard from "@/app/(components)/statsCard/page";
import { useAuth } from "@/app/contexts/AuthContext";
import { CheckCheck, Loader, Minimize2, X } from "lucide-react";
import { useState } from "react";

const Settings = () => {
    const {logedInUser} = useAuth()
    const [photo, setPhoto] = useState(logedInUser.data.profileImage || '/images/defaultDP.jpg' )
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const isPhotoChanged = photo instanceof File;

    const [form, setForm] = useState({
        firstName: logedInUser.data.firstName || '',
        middleName: logedInUser.data.middleName || '',
        lastName: logedInUser.data.lasttName || '',
        email: logedInUser.data.email || '',
        phone: logedInUser.data.phone || '',
        notifications: logedInUser.data.notifications ?? true,
        password: '',
    });
    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0];
        if (file) setPhoto(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem("access_token");
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

            // ---- photo (only if changed) ----
            if (photo instanceof File) {
                formData.append('profileImage', photo);
            }

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/auth/profile`, {
                method: 'PATCH',
                headers: {
                    authorization: `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Update failed');

            setMessage('Profile updated successfully!');
            setForm({ ...form, password: '' });

        } catch (err) {
            setMessage(err.message);
        } finally {
            setLoading(false);
        }
    };




    return ( 
        <div>
            <div className="stats">
                <SearchFilter name="My Account"/>
                <div className="statsPack">
                    <StatsCard title="ACTIVE BOOKINGS" data='5' icon={Minimize2} />
                    <StatsCard title="PAYMENT PENDING" data='2' icon={Loader} />
                    <StatsCard title="COMPLETED ORDERS" data='12' icon={CheckCheck} />
                    <StatsCard title="CANCELLED ORDERS" data='1' icon={X} />
                </div>
            </div>
            <form onSubmit={handleSubmit} className={`${styles.mainContent} sectionHeaderCenter`}>
                <aside className={`${styles.photoPack}`}>
                    <img src={photo instanceof File ? URL.createObjectURL(photo) : photo} alt="profile" />
                    <label className={styles.uploadBtn}>
                        Upload profile photo
                        <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        style={{ display: 'none' }}
                        />
                    </label>
                </aside>
                <section className={`${styles.mainSection} mainSection`}>
                    <h2>TAP FIELD TO UPDATE DATA</h2>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>First Name</label>
                        <input
                            name="firstName"
                            type="text"
                            defaultValue={form.firstName}                            
                            className={styles.inputDisabled}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Middle Name</label>
                        <input
                            name="middleName"
                            type="text"
                            defaultValue={form.middleName}                            
                            className={styles.inputDisabled}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Last name</label>
                        <input
                            name="lastName"
                            type="text"
                            defaultValue={form.lastName}                            
                            className={styles.inputDisabled}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email address</label>
                        <input
                            type="email"
                            defaultValue={form.email}
                            name="email"
                            className={styles.inputDisabled}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Phone number</label>
                        <input
                            type="tel"
                            defaultValue={form.phone}
                            name="phone"
                            className={styles.inputDisabled}
                        />
                    </div>

                        {/* Password */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Password</label>
                        <div className={styles.passwordWrapper}>
                            <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="••••••••••••"
                            className={styles.input}
                            />
                            <span className={styles.changePassword}>Change password</span>
                        </div>
                    </div>

                        {/* Notifications */}
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Email notification alerts</label>
                        <select
                            value={form.notifications ? 'true' : 'false'}
                            onChange={(e) => setForm({ ...form, notifications: e.target.value === 'true' })}
                            className={styles.select}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                    </div>

                    <button type="submit" /* disabled={loading} */ className={styles.submitBtn}>
                        {loading ? 'Updating...' : 'Update details'}
                    </button>

                    {message && (
                        <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                            {message}
                        </div>
                    )}
                </section>
            </form>
        </div>
    );
}
 
export default Settings;