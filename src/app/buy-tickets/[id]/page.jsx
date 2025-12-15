'use client'
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import styles from './ticketDetails.module.css';
import { Calendar, ClockFading, MapPin, Ticket } from 'lucide-react';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import NaturalDescription from '@/app/(components)/natural-text/page';
import TicketBooking from './ticketBooking/ticket';
const TicketDetails = () => {
    const { openModal } = useModal();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ticketType, setTicketType] = useState('')
    const [name, setTicketName] = useState('')
    const [cost, setTicketCost] = useState('')
    const { id } = useParams();   // ✅ correct way

    useEffect(() => {
      if (!id) return;  // ensure param exists

      fetch("/data/ticket.json")
        .then((res) => res.json())
        .then((data) => {
          const tic = data.find((t) => String(t.id) === String(id)); // ensure match
          
          if (tic) {
            setTicket(tic);
            setLoading(false);
          } else {
            console.log("Ticket not found");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    useEffect(() => {
        if (ticket?.types?.length > 0) {
            setTicketName(ticket.types[0].name);
            setTicketCost(ticket.types[0].cost);
        }
    }, [ticket]);


    return (
      <>
        {loading && <p>Loading ticket details...</p>}

        {!loading && ticket && (
          <div className="main">
            <header className="header">
              <img className="bannerImg" src={ticket.images.img1} alt="Banner" />
            </header>
            <div className={styles.ticketSection}>
                <h2>{ticket.ticketName}</h2>
                <div className={styles.BookTicket}>
                    <ul className={styles.details}>
                        <li style={{color:"#222222"}} className='txtHeader'>By: {ticket.organizer}</li>
                        <li className={styles.cc}><MapPin className={styles.icon} /> {ticket.location}</li>
                        <li className={styles.cc}><Calendar className={styles.icon} /> {ticket.time}</li>
                        <li className={styles.cc}><ClockFading className={styles.icon} /> {ticket.time}</li>
                        <li className={styles.cc}><Ticket className={styles.icon} /> {ticket.totalTicket} tickets left</li>
                    </ul>
                    <form className={styles.bookForm}>
                        <select name="ticketType" value={ticketType} onChange={(e) => setTicketType(e.target.value)}>
                            <option value="" disabled>Select ticket</option>
                            {ticket?.types?.map((type) => (
                                <option
                                    key={type.name}
                                    value={type.name}
                                    data-price={type.cost}
                                >
                                    {type.name} (₦{type.cost})
                                </option>
                            ))}
                        </select>
                        <button type='button' onClick={() => openModal(<TicketBooking title={ticket.ticketName} img={ticket.images.img1} name={name} cost={cost} />)}>Book ticket</button>
                    </form>
                </div>
                <div className={styles.extraDetails}>
                    <NaturalDescription text={ticket.description}/>
                </div>
                <div className={styles.images}>
                    <img src={ticket.images.img2} alt="Banner" />
                    <img src={ticket.images.img3} alt="Banner" />
                </div>
            </div>
            
          </div>
        )}
      </>
    );
};

export default TicketDetails;
