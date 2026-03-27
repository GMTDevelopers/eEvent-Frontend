'use client'
import styles from "@/app/vendor/overview/overview.module.css";
import mainStyles from './adminDashboard.module.css'
import Header from "@/app/(components)/header/page";
import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Check, CheckCheck, ChevronRight, Loader, Minimize2, Star, UserRoundCog, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import SignIn from "@/app/navbar/(signIn)/signIn";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const AdminDashboard = () => {
    const { openModal } = useModal();
    const [stats, setStats] = useState();
    const [userReg, setUserReg] = useState();
    const [revenueHis, setRevenueHis] = useState();
    const [recentAct, setRecentAct] = useState();
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const getStats = async () => {
            try{
                const statsRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/overview`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (statsRes.ok) {
                    const result = await statsRes.json();
                    console.log("overview",result)
                    setStats(result.data.summary)
                    setUserReg(result.data.registrationGraph)
                    setRevenueHis(result.data.revenueHistory)
                }
                if (statsRes.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                }
            }catch(err){
                throw new Error(err)
            }          
        }

        const getRecentActivities = async () => {
            try{
                const recentActRes = await fetch(`https://eevents-srvx.onrender.com/v1/admin/recent-activities`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (recentActRes.ok) {
                    const res = await recentActRes.json();
                    console.log("recent activities",res)
                    setRecentAct(res.data)
                }
                if (recentActRes.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                }
            }catch(err){
                throw new Error(err)
            }          
        }
        getStats()
        getRecentActivities()
    },[])
    


    return ( 
        <div className="main">
            <Header img='/images/servicePage/serviceBG.png' header='eEvents Admin Dashboard' subHeader='Manage all platform activities.'  />
            <div className={`stats`}>
                {/* <SearchFilter name="My Bookings"/> */}
                <div className={`${mainStyles.platformStats} statsPack`}>
                    <StatsCard title="TOTAL VENDORS" data={stats?.totalVendors} icon={UserRoundCog } />
                    <StatsCard title="TOTAL USERS" data={stats?.totalUsers} icon={Users} />
                    <StatsCard title="TOTAL ACTIVE SERVICES" data={stats?.totalActiveServices} icon={CheckCheck} />
                    <StatsCard title="TOTAL BOOKINGS" data={stats?.totalBookings} icon={Minimize2} />
                    <StatsCard title="PENDING APPROVALS" data={stats?.pendingApprovals} icon={Loader} />
                    <StatsCard title="TOTAL REVENUE GENERATED" data={stats?.totalRevenue?.toLocaleString()} icon={Banknote} />
                </div>
                <div className={mainStyles.graphs}>
                    <div className={styles.vendorGraph}>
                        <ResponsiveContainer>
                            <p style={{fontWeight:700, color:"#222222", width:"max-content"}}>USER REGISTRATION</p>
                            <LineChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }} data={userReg}>
                                <CartesianGrid style={{width:"20%"}} vertical={false} stroke="#eee" />
                                <XAxis dy={20} dataKey='month' axisLine={false} tickLine={false} />
                                <YAxis width={1} tickCount={10} axisLine={false} tickLine={false} />
                                <Tooltip/>
                                <Line type="monotone" dataKey="count" stroke="#7A1FA2" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer> 
                    </div>
{/*                     <div className={styles.vendorGraph}>
                        <ResponsiveContainer width="100%" height="100%">
                            <p style={{fontWeight:700, color:"#222222", width:"max-content"}}>REVENUE  HISTORY</p>
                            <LineChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }} data={revenueHis}>
                                <CartesianGrid style={{width:"20%"}} vertical={false} stroke="#eee" />
                                <XAxis dy={20} dataKey='month' axisLine={false} tickLine={false} />
                                <YAxis width={1} tickCount={20000000} axisLine={false} tickLine={false} />
                                <Tooltip/>
                                <Line type="monotone" dataKey="amount" stroke="#7A1FA2" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                            </LineChart>
                        </ResponsiveContainer> 
                    </div> */}
                </div>
            </div> 
             <div className={styles.recentActivities}>
                <h3>Recent Activities</h3>
                <div className={styles.itemsPack}>
                    {recentAct?.map((act,index) => (
                        <div key={index} className={styles.activityItem}>
                            <div className={styles.name}>
                                {act.type.includes("REQUESTED") && <div className={`${styles.icon} ${styles.purple}`}><Minimize2 /></div>}
                                {act.type.includes("confirmation") && <div className={`${styles.icon} ${styles.yellow}`}><Check /></div>}
                                {act.type.includes("payment") && <div className={`${styles.icon} ${styles.green}`}><Banknote /></div>}
                                {act.type.includes("CREATED") &&  <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type.includes("ACCEPTED") &&  <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type.includes("COMPLETED") &&  <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type.includes("CONFIRMED") &&  <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type.includes("CONFIRMATION") &&  <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type.includes("Subscription renewed successfully") && <div className={`${styles.icon} ${styles.green}`}><Loader/></div>}
                                {act.type.includes("REJECTED") && <div className={`${styles.icon} ${styles.red}`}><X /></div>}
                                {act.type.includes("CANCELLATION") && <div className={`${styles.icon} ${styles.purple}`}><X /></div>}
                                <div>
                                    <p style={{fontWeight:700, color:"#222222"}}>{act.title}</p>
                                    <p style={{fontWeight:500, color:"#636363"}}>{act.description}</p>
                                </div>
                            </div>
                            <div className="time">
                                <p> {act.displayDate} </p> 
                            </div>
                            <div className='btnNoCapsule'>
                                details
                                <ChevronRight className='icon' />
                            </div>
                        </div>
                        ))   
                    }
                </div>
            </div>
        </div>
    );
}
 
export default AdminDashboard;