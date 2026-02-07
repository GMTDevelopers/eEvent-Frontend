// components/ProductTabs.jsx
'use client';
import dynamic from "next/dynamic";
import { useState } from 'react';
import { use } from 'react';
import { Rating } from "react-simple-star-rating";

/* import NaturalDescription from '@/components/NaturalDescription'; */
import styles from './tabs.module.css';
import ImageGallery from '../gallery/pages';
import Image from 'next/image';


export default function ProductTabs({gallery, features, addService, reviews}) {

  // Tabs state
  const [activeTab, setActiveTab] = useState('Gallery');
  const tabs = [
    { key: 'Gallery', label: 'Gallery' },
    { key: 'Features', label: 'Features' },
    {
      key: 'Additional services',
      label: `Additional services (${
        (addService?.length) || 0
      })`,
    },
    { key: 'Reviews', label: 'Reviews' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Gallery':
        return gallery?.length ? (
          <ImageGallery images={gallery} />
        ) : (
          <p className={styles.empty}>No images available.</p>
        );

      case 'Features':
        return features?.length ? ( 
          <div className={styles.featuresList}>
            {features.map((feature, i) => (
              <div key={i} className={styles.featuresListTxt}>
                <Image className={styles.cardFeaturesCheck} src='/images/check.png' width={27} height={19} alt="check"/>
                <div>
                  <p className="txtHeader">{feature}</p>
                  <p style={{color:"#636363"}}>{feature.description}</p>
                </div>
              </div>
            ) )}
          </div>          
        ):(
          <p className={styles.empty}>No features available.</p>
        );

      case 'Additional services':
        return addService?.length ? (
          <div className={styles.addServiceSection}>
            {addService.map((svc, i) => (
              <div key={i} className={styles.serviceCard}>
                <div className={styles.serviceHeaderPack}>
                  <p style={{fontWeight:700}} >{svc.name}</p>
                  <p className='txtHeader'>₦ {svc.price}</p>
                </div>                
                <p style={{color:"#636363"}} className={styles.serviceDesc}>{svc.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className={styles.empty}>No additional services.</p>
        );

      case 'Reviews':
        return reviews?.length ? (
          <div className={styles.reRatings}>
            <h3>REVIEWS AND RATINGS </h3>
              {reviews.map((rev, i) => (
                <div className={styles.review}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.reviewUser}>
                      <img src={rev.clientProfileImage} alt="user" />
                      <div>
                        <p><strong>{rev.clientName}</strong></p>
                        <small>  </small>
                      </div>  
                    </div> 
                    <Rating
                      readonly
                      initialValue={rev.clientRating}
                      iconsCount={5}
                      allowFraction
                      size={24}
                      fillColor="#fbbf24"
                      emptyColor="#e5e7eb"
                    />                               
                  </div>                                    
                  <p className={styles.comment}>{rev.clientReview}</p>
                </div> 
              ))}    
          </div>
        ) : (
          <p className={styles.empty}>No reviews yet.</p>
        );

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