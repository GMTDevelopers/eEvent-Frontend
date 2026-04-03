'use client'
import Image from 'next/image';
import Styles from './navbar.module.css';
import { useModal } from '../(components)/ModalProvider/ModalProvider';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import SignIn from './(signIn)/signIn';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import { Banknote, Check, Heart, MessageCircleMore, Settings, SquareChartGantt, UserRoundCog } from 'lucide-react';
const Navbar = () => {
    const { openModal } = useModal();
    const {logedInUser, logout, userType, admin} = useAuth()
    const [activeTab, setActiveTab] = useState()
    const router = useRouter()

     console.log(logedInUser)
/*    console.log(userType) */
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
                {
                    logedInUser ? 
                        <div className={Styles.navCta}>
                            <div className="btnNoCapsule"><Link href='/vendor/signUp'>Become a Vendor</Link></div>
                            <p style={{cursor:"pointer"}} onClick={()=> {logout(); router.push('/')}}>logout</p>
                        </div>
                        :
                        <div className={Styles.navCta}>
                            <div className="btnNoCapsule"><Link href='/vendor/signUp'>Become a Vendor</Link></div>
                            <div className="btnCapsule" onClick={() => openModal(<SignIn />)}> <span>Sign In</span></div>
                        </div>
                
                }
                
            </div>
            { !admin && logedInUser && userType && (
                <div className={Styles.userNav}>
                    <p className={Styles.welcome}>Welcome, {logedInUser.data.firstName}</p>    
                    <div className={Styles.userNavMenu}>
                        <ul>
                           <Link href='/find-service' > <li onClick={() => setActiveTab('Favourites')} className={activeTab === "Favourites" ? Styles.active : ''} > <Heart className={Styles.icons}/> Favourites</li></Link>
                           <Link href='/client/bookings' > <li onClick={() => setActiveTab('Bookings')} className={activeTab === "Bookings" ? Styles.active : ''}><Check className={Styles.icons} /> My Bookings</li></Link>
                            <Link href='/client/message' > <li onClick={() => setActiveTab('Messages')} className={activeTab === "Messages" ? Styles.active : ''}><MessageCircleMore className={Styles.icons} /> Messages</li></Link>
                           <Link href='/client/settings' > <li onClick={() => setActiveTab('Account')} className={activeTab === "Account" ? Styles.active: ''}><Settings className={Styles.icons} />My Account</li></Link>
                        </ul>
                    </div>
                </div>
            )}
            {/* Verification Pending */}
             { !userType && logedInUser?.data?.verification?.id==="" && (
                <div className={`${Styles.userNav} ${Styles.vendorNav}`}>
                    <p style={{color:"#E83E1C"}} className={Styles.welcome}>ACCOUNT PENDING</p>    
                    <div className={Styles.userNavMenu}>
                        <ul>                
                           <li>Awaiting Account Activation</li>
                        </ul>
                    </div>
                </div>
            )}
           { /* Verification Approved */}
            { !userType && logedInUser?.data?.subscription?.id && (
                
                <div className={`${Styles.userNav} ${Styles.vendorNav}`}>
                    <div className={Styles.userNavMenu}>
                        <ul>
                            <Link href='/vendor/overview' > <li onClick={() => setActiveTab('Overview')} className={activeTab === "Overview" ? Styles.active : ''} > <SquareChartGantt className={Styles.icons}/> Overview</li></Link>
                            <Link href='/vendor/bookings' > <li onClick={() => setActiveTab('Bookings')} className={activeTab === "Bookings" ? Styles.active : ''}><Check className={Styles.icons} />Bookings</li></Link>
                            <Link href='/vendor/service' > <li onClick={() => setActiveTab('Services')} className={activeTab === "Services" ? Styles.active : ''}><UserRoundCog className={Styles.icons} />Services</li></Link>
                            <Link href='/vendor/earnings' > <li onClick={() => setActiveTab('Earnings')} className={activeTab === "Earnings" ? Styles.active : ''}><Banknote className={Styles.icons} />Earnings</li></Link>
                            <Link href='/vendor/message' > <li onClick={() => setActiveTab('Messages')} className={activeTab === "Messages" ? Styles.active : ''}><MessageCircleMore className={Styles.icons} /> Messages</li></Link>
                            <Link href='/vendor/settings' > <li onClick={() => setActiveTab('Account')} className={activeTab === "Account" ? Styles.active: ''}><Settings className={Styles.icons} />My Account</li></Link>
                        </ul>
                    </div>
                    <p style={{color:"#E83E1C"}}>Account status: <span style={{color:"#2ED074"}}>ACTIVE</span> </p>    
                </div>
            )}
           { /* ADMIN USER */}
            { admin && logedInUser?.data?.role.includes("ADMIN") && (
                
                <div className={`${Styles.userNav} ${Styles.vendorNav}`}>
                    <div className={Styles.userNavMenu}>
                        <ul>
                            <Link href='/admin/dashboard' > <li onClick={() => setActiveTab('Overview')} className={activeTab === "Overview" ? Styles.active : ''} > <SquareChartGantt className={Styles.icons}/> Overview</li></Link>
                            <Link href='/admin/servicesBookings' > <li onClick={() => setActiveTab('Bookings')} className={activeTab === "Bookings" ? Styles.active : ''}><Check className={Styles.icons} />Services and Bookings</li></Link>
                            <Link href='/admin/userManagement' > <li onClick={() => setActiveTab('userManagement')} className={activeTab === "userManagement" ? Styles.active : ''}><UserRoundCog className={Styles.icons} />User Management</li></Link>
                            <Link href='/admin/payment' > <li onClick={() => setActiveTab('Payments')} className={activeTab === "Payments" ? Styles.active : ''}><Banknote className={Styles.icons} />Payments</li></Link>
                            <Link href='/admin/messages' > <li onClick={() => setActiveTab('Messages')} className={activeTab === "Messages" ? Styles.active : ''}><MessageCircleMore className={Styles.icons} /> Messages</li></Link>
                            <Link href='/admin/supportCenter' > <li onClick={() => setActiveTab('Account')} className={activeTab === "Account" ? Styles.active: ''}><Settings className={Styles.icons} />Support Center</li></Link>
                        </ul>
                    </div>
                </div>
            )}
        </>
        
    );
}
 
export default Navbar;