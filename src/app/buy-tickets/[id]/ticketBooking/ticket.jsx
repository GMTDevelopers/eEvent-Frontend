import Link from 'next/link';
import styles from '@/app/navbar/(signIn)/signIn.module.css';
import { useState } from 'react';
import InitPayment from '@/app/(utils)/initializePayment/page';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';

const TicketBooking = ({title, img, cost, name, ticketId, categoryId}) => {
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [quantity, setQuantity] = useState('1')
    const [success, setSuccess] = useState()
    const [ticket, setTicket] = useState(name + " " + " " +  "--" + " " + " " + "₦" + cost)
    const { openModal } = useModal();

        const handleSubmit = async (e) => {
            setLoading(true)
            e.preventDefault();
            const token = localStorage.getItem("access_token");
            if (!token) {
                openModal(<SignIn />);
                return;
            }
            const formData = new FormData(e.target);
            const quantity = formData.get("quantity");
            try{            
                const res = await fetch(`https://eevents-srvx.onrender.com/v1/tickets/purchase`, {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    
                    body: JSON.stringify({ quantity, categoryId, ticketId }),
                });
                console.log({quantity, quantity, categoryId, ticketId})
                const Data  = await res.json();
                if (res.ok){
                    if (Data.status=="success"){
                        await InitPayment({entityId:categoryId, paymentType:"TICKET_PURCHASE", paymentOption:"FULL", token:token})
                    }
                    
                }
                setSuccess(Data)
                console.log(Data)
                setLoading(false)
            }   catch(err){
                if (err.code === 401){
                    setError("please login")
                }else{
                    setError(err.message)
                }
                
                
            }
            setLoading(false)
        };


    return ( 


        <div className={styles.signContainer}>
            <h5>BOOK TICKET - {title} </h5>
            <img className={styles.banner} src={img} alt="banner" />
            <form className={styles.signInForm} onSubmit={handleSubmit}>
               
                {/* <input placeholder='surname' value={surname} type='text' name='surname' onChange={(e)=>setSurname(e.target.value)} />
                <input placeholder='other names' value={otherNames} type='text' name='otherNames' onChange={(e)=>setOtherNames(e.target.value)} />
                <input placeholder='email address' value={email} type='email' name='email' onChange={(e)=>setEmail(e.target.value)}/> */}
                <input placeholder='' defaultValue={ticket} type='text' name='ticket' />
                <input placeholder='phone number' value={phoneNumber} type='tel' name='phoneNumber' onChange={(e)=>setPhoneNumber(e.target.value)}/>
                <input placeholder='quantity' value={quantity} type='number' name='quantity' min="1" onKeyDown={(e) => ["-", "e", "E", "."].includes(e.key) && e.preventDefault()}  onChange={(e)=>setQuantity(e.target.value)}/>
                
                <button style={{backgroundColor:'#82027D'}} type="submit">
                {loading ? <ButtonLoader /> : "Proceed to payment"}
                </button>
                <div style={{width:"100%", textAlign:"center"}}>{error && <p className='error'> { error} </p> }</div>
            </form>
        </div>
    );
}
 
export default TicketBooking;