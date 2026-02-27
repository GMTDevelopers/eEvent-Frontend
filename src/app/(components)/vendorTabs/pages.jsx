// components/ProductTabs.jsx
'use client';
import { useState } from 'react';
import styles from './tabs.module.css';
import Xstyles from '../../client/settings/settings.module.css'
import { useAuth } from "@/app/contexts/AuthContext";


export default function SettingsTabs({Account, Subscription, Bank , Profile}) {
  const {logedInUser} = useAuth()
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('settings user', logedInUser)
  const [form, setForm] = useState({
    firstName: logedInUser.data.user.firstName || '',
    middleName: logedInUser.data.user.middleName || '',
    lastName: logedInUser.data.user.lastName || '',
    email: logedInUser.data.user.email || '',
    phone: logedInUser.data.user.phone || '',
    notifications: logedInUser.data.notifications ?? true,
    password: '',
  });

  const [subPlan, setSubPlan] = useState({
    currentPlan: logedInUser.data.subscription.name || '',
    price: logedInUser.data.subscription.price || '',
    lastPayment: new Date(logedInUser.data.subscription.updatedAt).toDateString() || '',
    nextBilling:'',
    daysLeft: '',
  });
  
  // Tabs state
  const [activeTab, setActiveTab] = useState('Account Preferences');
  const tabs = [
    { key: 'Account Preferences', label: 'Account Preferences' },
    { key: 'Subscription Management', label: 'Subscription Management' },
    { key: 'Bank Details', label: 'Bank Details' },
    { key: 'Business Profile', label: 'Business Profile' },
  ];

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        const token = localStorage.getItem("access_token");
        if (!token) throw new Error('Not authenticated');

        const formData = new FormData();

        // ---- text fields ----
/*         formData.append('notifications', form.notifications); */
        formData.append('firstName', form.firstName);
        formData.append('lastName', form.lastName);
        formData.append('middleName', form.middleName);
        formData.append('phone', form.phone);
        formData.append('email', form.email);


        if (form.password) {
          formData.append('password', form.password);
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

  const handleSubscription = async () => {
    setLoading(true);
    setMessage('');
    console.log(logedInUser.data.subscriptionId)
    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error('Not authenticated');
      const res = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/subscription`, {
        method: 'PATCH',
        headers: {
          authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({subscriptionId: logedInUser.data.subscriptionId}),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Renewal failed');

      setMessage('updated successfully!');

    } catch (err) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'Account Preferences':
        return (
          <form  onSubmit={handleAccountSubmit} className={`${Xstyles.mainContent}`}>
            <section className={`${Xstyles.mainSection}`}>
              <h2>TAP FIELD TO UPDATE DATA</h2>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>First Name</label>
                <input name="firstName" type="text" value={form.firstName} className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Middle Name</label>
                <input name="middleName" type="text" value={form.middleName} className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Last name</label>
                <input name="lastName" type="text" value={form.lastName} className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Email address</label>
                <input type="email" value={form.email} name="email" className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Phone number</label>
                <input type="tel" value={form.phone} name="phone" className={Xstyles.inputDisabled} />
              </div>

                  {/* Password */}
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Password</label>
                <div className={Xstyles.passwordWrapper}>
                  <input type="password" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  placeholder="••••••••••••"
                  className={Xstyles.input}
                  />
                </div>
              </div>
              <button type="submit" disabled={loading} className={styles.submitBtn}>
                {loading ? 'Updating...' : 'Update details'}
              </button>                  
            </section>
            {message && (
              <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
          </form>
        ) 

      case 'Subscription Management':
        return ( 
          <form  /* onSubmit={handleSubscriptionSubmit} */ className={`${Xstyles.mainContent}`}>
            <section className={`${Xstyles.mainSection}`}>
              <h2>ACCOUNT STATUS - ACTIVE</h2>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Current plan</label>
                <input name="currentPlan" type="text" value={subPlan.currentPlan} className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Price</label>
                <input name="price" type="text" value={subPlan.price} className={Xstyles.inputDisabled} />
              </div>
              <div className={styles.formGroup}>
                <label className={Xstyles.label}>Last payment date</label>
                <input name="lastPayment" type="text" value={subPlan.lastPayment} className={Xstyles.inputDisabled} />
              </div>
              <div type="submit" onClick={handleSubscription} disabled={loading} className={styles.submitBtn}>
                {loading ? 'Initialting...' : 'Renew subscription'}
              </div>                  
            </section>
            {message && (
              <div className={`${styles.message} ${message.includes('success') ? styles.success : styles.error}`}>
                {message}
              </div>
            )}
          </form>  
        )

      case 'Bank Details':
        return (
          <p> Bank Details </p>
        )
      case 'Business Profile':
        return  (
          <p>Business prefile</p>
        ) 
      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      {/* Pill Tabs */}
      <div className={styles.tabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`${styles.tab} ${
              activeTab === tab.key ? styles.active : ''
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
}