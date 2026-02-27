'use client'
import { useState } from 'react';
import { SlArrowRightCircle } from 'react-icons/sl';
import styles from './footer.module.css';
import Image from 'next/image';
const Footer = () => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username.trim()) {
        alert(`Subscribing user: ${username}`);
        // Replace with your real API call
        }
    };
    return ( 
        <div className={styles.footer}>
            <div className={styles.footerSec1}>
                <div className={styles.footerTxt}>
                    <h1 style={{color:"#FBFBFB"}}>Ready to make your next event unforgettable?</h1>
                    <p style={{fontWeight:600, color:"#FBFBFB"}} className={`txtHeader ${styles.footerSubHeading}`}>Find the perfect vendors, book securely, and bring</p>
                    <p style={{fontWeight:600, color:"#FBFBFB", marginTop:"-5px"}} className={`txtHeader ${styles.footerSubHeading}`}>your celebration to life with eEvents today!</p>
                    <div className={styles.footerTxtBtns}>
                        <div className={`btnCapsule ${styles.footerBtn1}`}>Explore services <SlArrowRightCircle /></div>
                        <div className={`btnCapsule ${styles.footerBtn2}`}>Become a vendor</div>
                    </div>
                </div>
            </div>

            <div className={styles.footerSec2}>
                <div className={`${styles.footer2Txt} ${styles.section1}`}>
                    <div className={styles.f2Pack1}>
                        <Image className={`${styles.f2PackHeader} ${styles.footerLogo}`} alt='footer logo' src="/images/logo.webp" width={114} height={29} />
                        <p className={styles.footer2Txt}>The online marketplace that connects customers with trusted event vendors for everything from catering and rentals to music and décor. We make event planning simple, secure, and stress-free by bringing all your event needs into one reliable platform.</p>
                        <div className={styles.termOfUse}>
                            <p style={{color:"#82027D"}} className={styles.footer2Txt}>Privacy Policy    |   Terms of Use</p>
                        </div>
                    </div>
                    <div className={styles.f2Pack2}>
                        <p className={styles.f2PackHeader}>CATEGORIES</p>                        
                        <ul>
                            <li>Catering</li>
                            <li>Rentals</li>
                            <li>Entertainment</li>
                            <li>Halls & Venues</li>
                            <li>Photography</li>
                            <li>Decorations</li>
                            <li>Drinks & Wines</li>
                        </ul>
                    </div>
                    <div className={styles.f2Pack2}>
                        <p className={styles.f2PackHeader}>SITE NAV</p>                        
                        <ul>
                            <li>Home</li>
                            <li>Find services</li>
                            <li>How it works</li>
                            <li>About us</li>
                            <li>Create account</li>
                            <li>Sign in</li>
                        </ul>
                    </div>
                    <div className={styles.f2Pack3}>
                        <p className={styles.f2PackHeader}>NEWSLETTER</p>                        
                        <form className={styles.subscribeForm} onSubmit={handleSubmit} noValidate>
                            <input
                                type="text"
                                placeholder="Email goes here"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={styles.subscribeInput}
                                required
                            />
                            <button type="submit" className={styles.subscribeButton}>
                                <p>Subscribe</p>
                            </button>
                        </form>

                        <div className={styles.footSocials}>
                            <p className={styles.f2PackHeader}>FOLLOW US ON SOCIAL MEDIA</p>
                            <div className={styles.socialLink}>
                                <Image className= {styles.socialIcon} alt='socail icon' src="/images/insta.png" width={26} height={26} />
                                <Image className= {styles.socialIcon} alt='socail icon' src="/images/x.png" width={26} height={26} />
                                <Image className= {styles.socialIcon} alt='socail icon' src="/images/link.png" width={26} height={26} />
                                <Image className= {styles.socialIcon} alt='socail icon' src="/images/face.png" width={26} height={26} />
                            </div>
                        </div>
                    </div>

                    
                </div>
                <div className={styles.copyRight}>
                    <p className={styles.footer2Txt}>Copyright © 2025 eEvents. All Rights Reserved. No part of this website, including text, design, or content, may be copied, reproduced, or used without written permission.</p>
                </div>
            </div>
        </div>
    );
}
 
export default Footer;