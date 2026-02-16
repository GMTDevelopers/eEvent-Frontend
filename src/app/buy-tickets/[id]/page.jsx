'use client'
import { useEffect, useState } from 'react';
import { useParams } from "next/navigation";
import styles from './ticketDetails.module.css';
import { Calendar, ClockFading, MapPin, Ticket } from 'lucide-react';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import NaturalDescription from '@/app/(components)/natural-text/page';
import TicketBooking from './ticketBooking/ticket';
import Loading from '@/app/(components)/loading/loading';
const TicketDetails = () => {
    const { openModal } = useModal();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ticketType, setTicketType] = useState('')
    const { id } = useParams();   // ✅ correct way
/*     const ticketLeft = calc() */

    useEffect(() => {
      if (!id) return;  // ensure param exists

      fetch(`https://eevents-srvx.onrender.com/v1/tickets/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setTicket(data.data);
            setLoading(false);
            console.log("Ticket not found", data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [id]);


    return (
      <>
        {loading && <Loading />}

        {!loading && ticket && (
          <div className="main">
            <header className="header">
              <img className="bannerImg" src={ticket.ticketImage} alt="Banner" />
            </header>
            <div className={styles.ticketSection}>
                <h2>{ticket.eventName}</h2>
                <div className={styles.BookTicket}>
                    <ul className={styles.details}>
                        <li style={{color:"#222222"}} className='txtHeader'>By: {ticket.host}</li>
                        <li className={styles.cc}><MapPin className={styles.icon} /> {ticket.location}</li>
                        <li className={styles.cc}><Calendar className={styles.icon} /> {new Date(ticket.date).toLocaleDateString()}</li>
                        <li className={styles.cc}><ClockFading className={styles.icon} />{ticket.time}</li>
                        <li className={styles.cc}><Ticket className={styles.icon} /> {ticket.ticketsLeft} tickets left</li>
                    </ul>
                    <form className={styles.bookForm}>
                        <select name="ticketType" value={ticketType} onChange={(e) => {
                            const option = e.target.selectedOptions[0];
                            setTicketType({ name: option.value, price: Number(option.dataset.price),
                            });
                        }}>
                            <option value="" disabled>Select ticket</option>
                            {ticket?.ticketTypes?.map((type) => (                                
                                <option key={type.name} value={type.name} data-price={type.price}>
                                    {type.name} (₦{type.price})
                                </option>                                
                            ))}
                        </select>
                        <button type='button' onClick={() => openModal(<TicketBooking id={ticket.id} title={ticket.eventName} img={ticket.ticketImage} name={ticketType.name} cost={ticketType.price} />)}>Book ticket</button>
                    </form>
                </div>
                <div className={styles.extraDetails}>
                    <NaturalDescription text={ticket.details}/>
                </div>
                <div className={styles.images}>
                    {ticket?.otherMedia?.map((media) => (
                        <img src={media.image} alt="Banner" />
                    ))}
                    
                </div>
            </div>
            
          </div>
        )}
      </>
    );
};

export default TicketDetails;
