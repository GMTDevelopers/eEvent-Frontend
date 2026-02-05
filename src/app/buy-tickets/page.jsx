'use client'
import { useEffect, useState } from 'react';
import styles from './tickets.module.css';
import { SlArrowRight } from 'react-icons/sl';
import Link from 'next/link';
import { Calendar, ClockFading, MapPin } from 'lucide-react';
import Header from '../(components)/header/page';
import Pagination from '../(components)/pagination/page';
import Loading from '../(components)/loading/loading';


const TAKE = 10;

const BuyTicket = () => {
    const [tickets, setTickets] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [dates, setDates] = useState('all-dates');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [error, setError] = useState(null);

    const fetchTickets = async (page) => {
        setLoading(true);
        setError(null);

        try {
            const skip = (page - 1) * TAKE;

            const params = new URLSearchParams({
                take: TAKE,
                skip,
            });

            if (searchQuery) {
                params.append("search", searchQuery);
            }

            const res = await fetch(
                `https://eevents-srvx.onrender.com/v1/tickets?${params.toString()}`
            );

            if (!res.ok) {
                throw new Error(`Request failed (${res.status})`);
            }

            const json = await res.json();
            console.log(json.data)

            if (json.status !== "success") {
                throw new Error(json.message || "Failed to fetch tickets");
            }

            setTickets(json.data.data || []);

            const { total, take } = json.data.meta || {};
            setTotalPages(Math.ceil((total || 0) / (take || TAKE)));
        } catch (err) {
            console.error("Fetch tickets error:", err);
            setError(err.message || "Something went wrong");
            setTickets([]);
            setTotalPages(0);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
       fetchTickets(currentPage);
    }, [currentPage, searchQuery]);

    const handlePageChange = (page) => {
        if (page !== currentPage) {
            setCurrentPage(page);
        }
    };

    const categories = [
        { id: 'all', name: 'All tickets' },
        { id: 'concerts', name: 'Concerts' },
        { id: 'sports', name: 'Sports' },
        { id: 'comedy', name: 'Comedy' },
        { id: 'arts-theatre', name: 'Arts & Theatre' },
    ];

    const dateOptions = [
        { value: 'all-dates', label: 'All Dates' },
        { value: 'this-week', label: 'This Week' },
        { value: 'this-month', label: 'This Month' },
    ];

    const handleSearch = (e) => {
        e.preventDefault();
        fetchTickets();
    };

    const handleCategoryClick = (catId) => {
        setSelectedCategory(catId);
        // Auto-fetch when category changes (you can remove if you prefer manual search only)
        fetchTickets();
    };

    return ( 
        <div className='main'>
            <Header img='/images/buyTicket/buyTicket.png' header='Find and Book Tickets for Exciting Events Near You.' subHeader='Get tickets to concerts, exhibitions, or workshops with ease' />
            <form onSubmit={(e) => { e.preventDefault(); setCurrentPage(1); }} className={styles.searchForm}>

               {/*  <input type="text" placeholder="Enter City or ZIP Code To Search" value={location} onChange={(e) => setLocation(e.target.value)}  />
                 <select value={dates} onChange={(e) => setDates(e.target.value)}>
                {dateOptions.map((opt) => ( 
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
                </select> */}
                <input type="text" placeholder="Serch By Artist, Event or Venue" value={searchQuery} onChange={(e) => {setSearchQuery(e.target.value);setCurrentPage(1)}} />
                <button type="submit">
                Search
                </button>
            </form>
            <div className={styles.searchPillsPack}>
                <h3>AVAILABLE TICKETS</h3>
                <div className={styles.searchPills}>
                    {categories.map((cat) => (
                    <button key={cat.id}
                        type="button"
                        className={styles.searchPill}
                        onClick={() => handleCategoryClick(cat.id)}
                        style={{
                        background: selectedCategory === cat.id ? '#82027D' : '',
                        color: selectedCategory === cat.id ? 'white' : '#222222',
                        fontWeight: selectedCategory === cat.id ? '600' : '500',
                        }}
                    >
                        {cat.name}
                    </button>
                    ))}
                </div>
                
            </div>

            {/* Loading */}
            {loading && <Loading />}
            {error && ( <p className="error"> {error} </p> )}

            <div className={styles.ticketDisplay}>
                {tickets.length === 0 && !loading && <p>No tickets found.</p>}
                {tickets.map((ticket) => (
                    ticket.isActive && <div key={ticket.id} className={styles.ticketCard}>
                        <div className={styles.cardHeader}>
                            <img className={styles.prodImg} src={ticket.image} alt="product" />            
                            <div className={styles.catPill}>
                                <li>{ticket.ticketType}</li>
                            </div>
                        </div>
                        <div className="cardHeader">
                            <div className={`sectionHeader ${styles.prodTitle}`}>
                                <Link href={`/buy-tickets/${ticket.id}`}><p className="txtHeader">{ticket.eventName}</p></Link>    
                            </div>
                            <div className={styles.ticketDetails}>
                                <div className={styles.row1}>
                                    <div><ClockFading className={styles.icon} /> {ticket.eventTime? new Date(ticket.eventTime).toLocaleTimeString() : " "}</div>
                                    <div><Calendar className={styles.icon} /> {new Date(ticket.eventDate).toLocaleDateString()}</div>
                                </div>
                                <div className={styles.row1}>
                                    <div><MapPin className={styles.icon} /> {ticket.location}</div> 
                                </div>
                            </div>
                
                            <div className={styles.prodPrice}>
                                <p className={styles.rating} style={{fontWeight:500, color:"#AAA6A6"}}>PRICING STARTS FROM</p>
                                <div style={{marginBottom:"10px"}} className="sectionHeader">
                                    <h3 style={{color:"#222222"}}>₦ {ticket.price}</h3>
                                    <div className="btnNoCapsule">More details<SlArrowRight /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={!loading ? handlePageChange : () => {}} />
        </div>
    );
}
 
export default BuyTicket;