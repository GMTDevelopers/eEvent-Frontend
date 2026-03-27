'use client'
import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css'
import SignIn from '@/app/navbar/(signIn)/signIn';
import { ChevronLeft } from 'lucide-react';
import {useRouter } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';

const AddTicket = () => {

    const [prod, setProd] = useState([]);  
        const [loading, setLoading] = useState(true)
        const [isFocused, setIsFocused] = useState(false);
        const [isFocusedT, setIsFocusedT] = useState(false);    
        const router = useRouter();
    

    async function handleSubmit(formData){
        const data = {
        };
        console.log(data)
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                openModal(<SignIn />)
                return;
            }
           
            const bookingRes = await fetch("https://eevents-srvx.onrender.com/v1/bookings", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(data),
            });

           const result = await bookingRes.json();

            if (!bookingRes.ok) {
                throw {
                    status: result.status,
                    code: result.code ?? bookingRes.status,
                    message: result.message,
                    details: result.data ?? null,
                };
            }
            console.log("Booking successful:", result);
/*             router.back();   */
           /*  return result;   */ 
                          

        } catch (err) {
            console.log(err)
            throw err
        }

    }


    return ( 
        <section className="mainSection main" >
              <button onClick={() => router.back()} className={`section backBtn`}><ChevronLeft /> go back </button>
            <section className=''>
                <h2>Add ticket listing</h2>
                <form /* action={handleSubmit}  */className={bStyles.bookVendorForm}>

                    <input type="text" required name='ticketTitle' placeholder='Ticket title' />
                    <select /* onChange={(e) => setEventType(e.target.value)} */ required name="eventType">
                        <option value="" selected hidden disabled>Event category</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Burial">Burial</option>
                    </select>
                    <input type="text" required name='eventOrganizer' placeholder='Event organizer' />
                    <textarea name="eventDescription" placeholder='Event description'></textarea>
                    <div className={bStyles.formFlex}>
                        <input type={isFocused ? "date" : "text"} onFocus={() => setIsFocused(true)} onBlur={(e) => !e.target.value && setIsFocused(false)} placeholder='Event Date' name="eventDate" required />
                        <input type={isFocusedT ? "time" : "text"} onFocus={() => setIsFocusedT(true)} onBlur={(e) => !e.target.value && setIsFocusedT(false)} placeholder='Event Time' name='eventTime' required/>
                    </div>
                    <input type="text" name='eventLocation' placeholder='Event location' required />

                    <input required type="number" min={1} name='availableTickets' placeholder='No. of available tickets' />


                
                    <button type="submit" className={bStyles.submitBtn} >
                        Add ticket listing
                    </button>
                </form>
            </section>

        </section>
    );
}
 
export default AddTicket;