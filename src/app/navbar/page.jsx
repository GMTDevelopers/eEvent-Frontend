'use client'
import Image from 'next/image';
import Styles from './navbar.module.css';
import { useModal } from '../(components)/ModalProvider/ModalProvider';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import SignIn from './(signIn)/signIn';
import Link from 'next/link';
import { Check, Heart, MessageCircleMore, Settings } from 'lucide-react';
const Navbar = () => {
    const { openModal } = useModal();
    const {logedInUser, logout, userType} = useAuth()
    const [activeTab, setActiveTab] = useState()
    console.log("this is the nav bar", logedInUser)
    return ( 
        <>
            <div className={Styles.navbar}>
                <Image className={Styles.navbarLogo} alt='nav logo' src="/images/logo.webp" width={114} height={29} />
                <div className={Styles.navLinks}>
                    <ul>
                        <Link href='/'><li onClick={() => setActiveTab('Home')} className={activeTab === "Home" ? Styles.active : ''}>Home</li></Link> 
                        <Link href='/find-service'><li onClick={() => setActiveTab('findService')} className={activeTab === "findService" ? Styles.active : ''}>Find services</li></Link>
                        <li onClick={() => setActiveTab('HitWorks')} className={activeTab === "HitWorks" ? Styles.active : ''}>How it Works</li>
                        <Link href='/buy-tickets'><li onClick={() => setActiveTab('buyTickets')} className={activeTab === "buyTickets" ? Styles.active : ''}>Buy Tickets</li></Link>
                        <Link href='/terms-of-use'><li onClick={() => setActiveTab('ToUse')} className={activeTab === "ToUse" ? Styles.active : ''}>Terms of Use</li></Link>
                    </ul>
                </div>
                <div className={Styles.navCta}>
                    <div className="btnNoCapsule"><Link href='/vendor/signUp'>Become a Vendor</Link></div>
                    <div className="btnCapsule" onClick={() => openModal(<SignIn />)}> <span>Sign In</span></div>
                </div>
            </div>
            {logedInUser && userType && (
                <div className={Styles.userNav}>
                    <p className={Styles.welcome}>Welcome, {logedInUser.data.firstName}</p>    
                    <div className={Styles.userNavMenu}>
                        <ul>
                           <Link href='/find-service' > <li onClick={() => setActiveTab('Favourites')} className={activeTab === "Favourites" ? Styles.active : ''} > <Heart className={Styles.icons}/> Favourites</li></Link>
                           <Link href='/client/bookings' > <li onClick={() => setActiveTab('Bookings')} className={activeTab === "Bookings" ? Styles.active : ''}><Check className={Styles.icons} /> My Bookings</li></Link>
                           <Link href='/' > <li onClick={() => setActiveTab('Messages')} className={activeTab === "Messages" ? Styles.active : ''}><MessageCircleMore className={Styles.icons} /> Messages</li></Link>
                           <Link href='/client/settings' > <li onClick={() => setActiveTab('Account')} className={activeTab === "Account" ? Styles.active: ''}><Settings className={Styles.icons} />My Account</li></Link>
                        </ul>
                    </div>
                </div>
            )}
        </>
        
    );
}
 
export default Navbar;