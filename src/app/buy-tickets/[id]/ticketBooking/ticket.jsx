import Link from 'next/link';
import styles from '@/app/navbar/(signIn)/signIn.module.css';
import { useState } from 'react';

const TicketBooking = ({title, img, cost, name}) => {
    const [surname, setSurname] = useState('')
    const [otherNames, setOtherNames] = useState('')
    const [email, setEmail] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [ticket, setTicket] = useState(name + " " + "-" + " " + "₦" + cost)
    return ( 
        <div className={styles.signContainer}>
            <h5>BOOK TICKET - {title} </h5>
            <img className={styles.banner} src={img} alt="banner" />
            <form className={styles.signInForm}>
               
                <input placeholder='surname' value={surname} type='text' name='surname' onChange={(e)=>setSurname(e.target.value)} />
                <input placeholder='other names' value={otherNames} type='text' name='otherNames' onChange={(e)=>setOtherNames(e.target.value)} />
                <input placeholder='email address' value={email} type='email' name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <input placeholder='phone number' value={ticket} type='tel' name='ticket' />
                <input placeholder='phone number' value={phoneNumber} type='tel' name='phoneNumber' onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <input placeholder='quantity' value={quantity} type='number' name='quantity' min="1" onKeyDown={(e) => ["-", "e", "E", "."].includes(e.key) && e.preventDefault()}  onChange={(e)=>setQuantity(e.target.value)}/>
                <button style={{backgroundColor:'#82027D'}} type="submit">
                Proceed to payment
                </button>
            </form>
        </div>
    );
}
 
export default TicketBooking;