'use client'
import { useEffect, useState } from 'react';
import styles from './tickets.module.css';
import { SlArrowRight } from 'react-icons/sl';
import Link from 'next/link';
import { Calendar, ClockFading, MapPin } from 'lucide-react';

const BuyTicket = () => {
    const [tickets, setTickets] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState('');
    const [dates, setDates] = useState('all-dates');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetch("/data/ticket.json", { cache: 'no-store',})
        .then((res) => res.json())
        .then((data) => {
          console.log(data);   // See what was fetched 
          setTickets(data);       // Update state with the fetched data limit search to 6
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, []);

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

    const fetchTickets = async () => {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery.trim()) params.append('q', searchQuery.trim());
        if (location.trim()) params.append('location', location.trim());
        if (dates !== 'all-dates') params.append('dates', dates);
        if (selectedCategory !== 'all') params.append('category', selectedCategory);

        try {
        const res = await fetch(`/api/tickets/search?${params.toString()}`, {
            cache: 'no-store',
        });
        const data = await res.json();
        setTickets(res.ok ? data : []);
        } catch (err) {
        setTickets([]);
        } finally {
        setLoading(false);
        }
    };

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
            <header className={styles.header}>
                <img className={styles.serviceHeaderImg} src='/images/buyTicket/buyTicket.png' alt="Service Background"/>
                <div className={styles.headerTxt}>
                    <h1>Find and Book Tickets for Exciting Events Near You.</h1>
                    <p className={styles.txtHeader}>Get tickets to concerts, exhibitions, or workshops with ease</p>
                </div>
            </header>
            <form onSubmit={handleSearch} className={styles.searchForm}>

                <input type="text" placeholder="Enter City or ZIP Code To Search" value={location} onChange={(e) => setLocation(e.target.value)}  />
                <select value={dates} onChange={(e) => setDates(e.target.value)}>
                {dateOptions.map((opt) => ( 
                    <option key={opt.value} value={opt.value}>
                    {opt.label}
                    </option>
                ))}
                </select>
                <input type="text" placeholder="Serch By Artist, Event or Venue" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
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
            {loading && <p>Loading tickets...</p>}

            <div className={styles.ticketDisplay}>
                {tickets.length === 0 && !loading && <p>No tickets found.</p>}
                {tickets.map((ticket) => (
                    <div key={ticket.id} className={styles.ticketCard}>
                        <div className={styles.cardHeader}>
                            <img className={styles.prodImg} src={ticket.images.img1} alt="product" />            
                            <div className={styles.catPill}>
                                <li>{ticket.category}</li>
                            </div>
                        </div>
                        <div className="cardHeader">
                            <div className={`sectionHeader ${styles.prodTitle}`}>
                                <Link href={`/buy-tickets/${ticket.id}`}><p className="txtHeader">{ticket.ticketName}</p></Link>    
                            </div>
                            <div className={styles.ticketDetails}>
                                <div className={styles.row1}>
                                    <div><ClockFading className={styles.icon} /> {ticket.time}</div>
                                    <div><Calendar className={styles.icon} /> {ticket.date}</div>
                                </div>
                                <div className={styles.row1}>
                                    <div><MapPin className={styles.icon} /> {ticket.location}</div> 
                                </div>
                            </div>
                
                            <div className={styles.prodPrice}>
                                <p className={styles.rating} style={{fontWeight:500, color:"#AAA6A6"}}>PRICING STARTS FROM</p>
                                <div style={{marginBottom:"10px"}} className="sectionHeader">
                                    <h3 style={{color:"#222222"}}>₦ {ticket.cost}</h3>
                                    <div className="btnNoCapsule">More details<SlArrowRight /></div>
                                </div>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}
 
export default BuyTicket;