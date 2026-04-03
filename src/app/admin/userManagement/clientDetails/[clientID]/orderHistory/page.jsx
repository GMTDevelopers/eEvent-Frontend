'use client'
import { useEffect, useState, use } from 'react';

import styles from '@/app/vendor/service/[id]/product.module.css';
import stylesX from './page.module.css';
import Loading from '@/app/(components)/loading/loading';
import { Rating } from 'react-simple-star-rating';
import { useRouter } from 'next/navigation'
import StatsCard from '@/app/(components)/statsCard/page';
import { Banknote, Calendar, ChevronLeft, ChevronRight, Minimize2, PhoneCallIcon, RotateCw, ShoppingCart, User, UserStar } from 'lucide-react';
import Link from 'next/link';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
import VendorOrderTable from '@/app/(components)/bookingsTable/vendor/vendorOrderTable';
import ClientOrderTable from '@/app/(components)/bookingsTable/clientOrderTable';
import Pagination from '@/app/(components)/pagination/page';
/* https://grok.com/share/c2hhcmQtNQ_54091b1e-a166-46e9-8be2-895e1d5297bf */ /* chat to creating the input */
const ProductCard = ({params}) => {
    const [history, setHistory] = useState([]); 
    const [vendorCurrentPage, setVendorCurrentPage] = useState(1);
    const [vendorTotalPages, setVendorTotalPages] = useState(0);
    const [error, setError] = useState(null)
    const {clientID} = use(params)
    const [loading, setLoading] = useState(true)
    const { openModal } = useModal();
    const router = useRouter()
    const TAKE = 10;



   useEffect(() => {
    if (!clientID) return; // 🚨 important

    const token = localStorage.getItem("access_token");
    if (!token) {
        openModal(<SignIn />);
        return;
    }

    const getOrderHistory = async (page = 1) => {
        const skip = (page - 1) * TAKE;
        const query = new URLSearchParams({
            skip,
            take: TAKE,
        });

        try {
            setLoading(true);

            const historyRes = await fetch(
                `https://eevents-srvx.onrender.com/v1/admin/clients/${clientID}/orders?${query.toString()}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (historyRes.ok) {
                const res = await historyRes.json();
                console.log(res)
                setHistory(res.data);
                const { total, take } = res.data.meta || {};
                setVendorTotalPages(total / take || 0);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    getOrderHistory(vendorCurrentPage);

}, [vendorCurrentPage, clientID]); // ✅ include clientID

    const handleVendorPageChange = (page) => {
        if (page !== vendorCurrentPage) {
            setVendorCurrentPage(page);
        }
    };
    if (loading) return <Loading text="Fetching service order history..." />


    return ( 
        <>
            { !loading &&
                <div className='main'>
                    
                    <div className="main">
                        <button onClick={() => router.back()} className="backBtn"><ChevronLeft /> go back </button>
                        <aside className={stylesX.statsContainer}>                                        
                            <StatsCard title="TOTAL AMOUNT PAID" data={history?.totalAmountPaid.toLocaleString()} icon={Banknote} />
                            <StatsCard title="VENDOR NAME" data={history?.clientName} icon={User} />
                            <StatsCard title="VENDOR PHONE" data={history?.phone} icon={PhoneCallIcon} />
                            <StatsCard title="DATE REGISTERED" data={new Date(history?.dateRegistered).toDateString()} icon={Calendar} />
                            <StatsCard title="TOTAL ORDERS" data={history?.totalOrders} icon={ShoppingCart} />
                        </aside>
                        <section>
                            <ClientOrderTable bookings={history?.orders} />
                             <Pagination currentPage={vendorCurrentPage} 
                                totalPages={vendorTotalPages}
                                onPageChange={!loading ? handleVendorPageChange : () => {}}
                            />  
                        </section>
                        
                    </div>
                    
                </div>
            }
        </> 
    );
}
 
export default ProductCard;