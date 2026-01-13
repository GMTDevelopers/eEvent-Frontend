'use client'
import Header from '@/app/(components)/header/page';
import SearchFilter from '@/app/(components)/search/page';
import StatsCard from '@/app/(components)/statsCard/page';
import { Banknote, Check, CheckCheck, ChevronRight, Loader, Minimize2, Star, X } from 'lucide-react';
import styles from './overview.module.css'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const graphData = [
  { month: 'Jan', value: 3 },
  { month: 'Feb', value: 7 },
  { month: 'Mar', value: 6 },
  { month: 'Apr', value: 5 },
  { month: 'May', value: 6 },
  { month: 'Jun', value: 9 },
  { month: 'Jul', value: 8 },
  { month: 'Aug', value: 7 },
  { month: 'Sep', value: 6 },
  { month: 'Oct', value: 10 },
  { month: 'Nov', value: 9 },
  { month: 'Dec', value: 8 },
]
const data = [
    {
        "id": "1",
        "type":"New Booking Request",
        "eventSummary":"Wedding event by Michael Olumide.",
        "date": "25/08/2025",
        "time": "10:00 am"
    },
    {
        "id": "2",
        "type":"Booking Confirmation",
        "eventSummary":"Wedding event by Michael Olumide.",
        "date": "25/08/2025",
        "time": "10:00 am"
    },
    {
        "id": "3",
        "type":"Payment Received",
        "eventSummary":"₦200,000 for birthday event by Joy Tunde",
        "date": "25/08/2025",
        "time": "10:00 am"
    },
    {
        "id": "4",
        "type":"Event Completed",
        "eventSummary":"Wedding event by Michael Olumide.",
        "date": "25/08/2025",
        "time": "10:00 am"
    },
    {
        "id": "5",
        "type":"Subscription renewed successfully",
        "eventSummary":"1 month subscription",
        "date": "25/08/2025",
        "time": "10:00 am"
    },
    {
        "id": "6",
        "type":"Booking Cancellation Request",
        "eventSummary":"Wedding event by Michael Olumide.",
        "date": "25/08/2025",
        "time": "10:00 am"
    }
]

const Overview = () => {
    return ( 
        <div className="main">
            <Header img='/images/servicePage/serviceBG.png' header='Find trusted event services near you.' subHeader='Your next great event starts here.'  />
            <br />
            <h3 style={{textAlign:"center"}}>Welcome, Tee's Sweet Treats</h3>
            <div className={`${styles.vendorStats} stats`}>
                {/* <SearchFilter name="My Bookings"/> */}
                <div className={`${styles.vendorStatsPack} statsPack`}>
                    <StatsCard title="TOTAL BOOKINGS" data='14' icon={Minimize2} />
                    <StatsCard title="PENDING CONFIRMATION" data='2' icon={Loader} />
                    <StatsCard title="TOTAL EARNINGS" data='300000' icon={Banknote} />
                    <StatsCard title="AVERAGE RATING" data='4.5' icon={Star} />
                </div>
                <div className={styles.vendorGraph}>
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 20, right: 30, left: 30, bottom: 20 }} data={graphData}>
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
                    {data.map((item) => (
                        <div key={item.id} className={styles.activityItem}>
                            <div className={styles.name}>
                                {item.type==="New Booking Request" && <div className={`${styles.icon} ${styles.purple}`}><Minimize2 /></div>}
                                {item.type==="Booking Confirmation" && <div className={`${styles.icon} ${styles.yellow}`}><Check /></div>}
                                {item.type==="Payment Received" && <div className={`${styles.icon} ${styles.green}`}><Banknote /></div>}
                                {item.type==="Event Completed" && <div className={`${styles.icon} ${styles.green}`}><Check /></div>}
                                {item.type==="Subscription renewed successfully" && <div className={`${styles.icon} ${styles.green}`}><Loader/></div>}
                                {item.type==="Booking Cancellation Request" && <div className={`${styles.icon} ${styles.red}`}><X /></div>}
                                <div>
                                    <p style={{fontWeight:700, color:"#222222"}}>{item.type}</p>
                                    <p style={{fontWeight:500, color:"#636363"}}>{item.eventSummary}</p>
                                </div>
                            </div>
                            <div className="time">
                                <p>{item.date}   |   {item.time}</p> 
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