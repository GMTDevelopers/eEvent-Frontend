import StatsCard from "@/app/(components)/statsCard/page";
import { Banknote, Loader, Minimize2, Star } from "lucide-react";

const Earnings = () => {
    return ( 
        <div className="main">
            <div className={`statsPack`}>
                <StatsCard title="TOTAL BOOKINGS" data={stats?.totalBooking} icon={Minimize2} />
                <StatsCard title="PENDING CONFIRMATION" data={stats?.pendingConfirmation} icon={Loader} />
                <StatsCard title="TOTAL EARNINGS" data={stats?.totalEarnings} icon={Banknote} />
                <StatsCard title="AVERAGE RATING" data={stats?.averageRatings} icon={Star} />
            </div>
        </div>
    );
}
 
export default Earnings;