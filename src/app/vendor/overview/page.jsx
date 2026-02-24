'use client'
import Header from '@/app/(components)/header/page';
import SearchFilter from '@/app/(components)/search/page';
import StatsCard from '@/app/(components)/statsCard/page';
import { Banknote, Check, CheckCheck, ChevronRight, Loader, Minimize2, Star, X } from 'lucide-react';
import styles from './overview.module.css'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useEffect, useState } from 'react';



const Overview = () => {
    const [stats, setStats] = useState()
    const [recentAct, setRecentAct] = useState()
    const [chartData, setChartData] = useState([])
    const formatMonthlyData = (apiData) => {
        const monthMap = [
            { key: 'january', label: 'Jan' },
            { key: 'february', label: 'Feb' },
            { key: 'march', label: 'Mar' },
            { key: 'april', label: 'Apr' },
            { key: 'may', label: 'May' },
            { key: 'june', label: 'Jun' },
            { key: 'july', label: 'Jul' },
            { key: 'august', label: 'Aug' },
            { key: 'september', label: 'Sep' },
            { key: 'october', label: 'Oct' },
            { key: 'november', label: 'Nov' },
            { key: 'december', label: 'Dec' },
        ];

        return monthMap.map(({ key, label }) => ({
            month: label,
            value: apiData[key] ?? 0,
        }));
    };

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        const selectedYear = new Date().getFullYear();
        const getStats = async () => {
            try{
                const statsRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/dashboard/overview`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (statsRes.ok) {
                    const result = await statsRes.json();
                    console.log(result)
                    setStats(result.data)
                    const FD = formatMonthlyData(result.data.bookingHistory[selectedYear] || [])
                    setChartData(FD)
                }
            }catch(err){
                throw new Error(err)
            }          
        }
        const getRecentActivities = async () => {
            try{
                const recentActRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/recent-activities`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (recentActRes.ok) {
                    const res = await recentActRes.json();
                    console.log("overview stats",res)
                    setRecentAct(res.data)
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
            <Header img='/images/servicePage/serviceBG.png' header='Find trusted event services near you.' subHeader='Your next great event starts here.'  />
            <br />
            <h3 style={{textAlign:"center"}}>Welcome, Tee's Sweet Treats</h3>
            <div className={`${styles.vendorStats} stats`}>
                {/* <SearchFilter name="My Bookings"/> */}
                <div className={`${styles.vendorStatsPack} statsPack`}>
                    <StatsCard title="TOTAL BOOKINGS" data={stats?.totalBooking} icon={Minimize2} />
                    <StatsCard title="PENDING CONFIRMATION" data={stats?.pendingConfirmation} icon={Loader} />
                    <StatsCard title="TOTAL EARNINGS" data={stats?.totalEarnings} icon={Banknote} />
                    <StatsCard title="AVERAGE RATING" data={stats?.averageRatings} icon={Star} />
                </div>
                <div className={styles.vendorGraph}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }} data={chartData}>
                            <CartesianGrid style={{width:"20%"}} vertical={false} stroke="#eee" />
                            <XAxis dy={20} dataKey="month" axisLine={false} tickLine={false} />
                            <YAxis width={1} tickCount={10} axisLine={false} tickLine={false} />
                            <Tooltip/>
                            <Line type="monotone" dataKey="value" stroke="#7A1FA2" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className={styles.recentActivities}>
                <h3>Recent Activities</h3>
                <div className={styles.itemsPack}>
                    {recentAct?.map((act,index) => (
                        <div key={index} className={styles.activityItem}>
                            <div className={styles.name}>
                                {act.type==="booking" && <div className={`${styles.icon} ${styles.purple}`}><Minimize2 /></div>}
                                {act.type==="confirmation" && <div className={`${styles.icon} ${styles.yellow}`}><Check /></div>}
                                {act.type==="payment" && <div className={`${styles.icon} ${styles.green}`}><Banknote /></div>}
                                {act.type==="completed" && <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {act.type==="Subscription renewed successfully" && <div className={`${styles.icon} ${styles.green}`}><Loader/></div>}
                                {act.type==="Booking Cancellation Request" && <div className={`${styles.icon} ${styles.red}`}><X /></div>}
                                <div>
                                    <p style={{fontWeight:700, color:"#222222"}}>{act.type}</p>
                                    <p style={{fontWeight:500, color:"#636363"}}>{act.description}</p>
                                </div>
                            </div>
                            <div className="time">
                                <p>{act.date}   |   {act.time}</p> 
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
 
export default Overview;