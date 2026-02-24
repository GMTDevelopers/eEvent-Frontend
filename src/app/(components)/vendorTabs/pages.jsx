// components/ProductTabs.jsx
'use client';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { use } from 'react';
import { Rating } from "react-simple-star-rating";

/* import NaturalDescription from '@/components/NaturalDescription'; */
import styles from './tabs.module.css';
import Xstyles from '../../client/settings/settings.module.css'
import ImageGallery from '../gallery/pages';
import Image from 'next/image';


export default function SettingsTabs({Account, Subscription, Bank , Profile}) {

  // Tabs state
  const [activeTab, setActiveTab] = useState('Account Preferences');
  const tabs = [
    { key: 'Account Preferences', label: 'Account Preferences' },
    { key: 'Subscription Management', label: 'Subscription Management' },
    { key: 'Bank Details', label: 'Bank Details' },
/*     {
      key: 'Additional services',
      label: `Additional services (${
        (addService?.length) || 0
      })`,
    }, */
    { key: 'Business Profile', label: 'Business Profile' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Account Preferences':
        return (
          <form /* onSubmit={handleSubmit} */ className={`${Xstyles.mainContent} mainContent`}>
            <section className={`${Xstyles.mainSection} mainSection`}>
                <h2>TAP FIELD TO UPDATE DATA</h2>
                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>First Name</label>
                    <input
                        name="firstName"
                        type="text"
                        defaultValue=""                           
                        /* defaultValue={form.firstName}     */                        
                        className={Xstyles.inputDisabled}
                    />
                </div>
                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>Middle Name</label>
                    <input
                      name="middleName"
                      type="text"
                      defaultValue=""                            
                      /* defaultValue={form.middleName}  */                           
                      className={Xstyles.inputDisabled}
                    />
                </div>
                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>Last name</label>
                    <input
                      name="lastName"
                      type="text"
                      defaultValue=""
                      /* defaultValue={form.lastName}   */                          
                      className={Xstyles.inputDisabled}
                    />
                </div>

                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>Email address</label>
                    <input
                        type="email"
                        defaultValue=""
                        /* defaultValue={form.email} */
                        name="email"
                        className={Xstyles.inputDisabled}
                    />
                </div>

                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>Phone number</label>
                    <input
                        type="tel"
                        defaultValue=""
                        /* defaultValue={form.phone} */
                        name="phone"
                        className={Xstyles.inputDisabled}
                    />
                </div>

                    {/* Password */}
                <div className={Xstyles.formGroup}>
                    <label className={Xstyles.label}>Password</label>
                    <div className={Xstyles.passwordWrapper}>
                        <input
                        type="password"
                        value=""
                        /* value={form.password} */
                        /* onChange={(e) => setForm({ ...form, password: e.target.value })} */
                        placeholder="••••••••••••"
                        className={Xstyles.input}
                        />
                        <span className={Xstyles.changePassword}>Change password</span>
                    </div>
                </div>

                  
            </section>
          </form>
        ) 

      case 'Subscription Management':
        return ( 
          <p>subscription Management</p>         
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