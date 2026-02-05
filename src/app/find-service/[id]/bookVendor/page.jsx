'use client';
import { useEffect, useState } from 'react';
import styles from '../product.module.css'
import bStyles from './bookingVendor.module.css'
import Link from 'next/link';
import { useParams } from "next/navigation";
import { Rating } from 'react-simple-star-rating';
import Loading from '@/app/(components)/loading/loading';

const BookVendor = () => {
    const [prod, setProd] = useState([]);  
    const [loading, setLoading] = useState(true)

    const [isAgreed, setIsAgreed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedT, setIsFocusedT] = useState(false);
    const [isFocusedSD, setIsFocusedSD] = useState(false);
    const [isFocusedST, setIsFocusedST] = useState(false);

    const [eventType, setEventType] = useState("");
    const [eventDuration, setEventDuration] = useState("");
    const [selectServiceType, setSelectServiceType] = useState("");
    const [phone, setPhone] = useState("");
    const [altPhone, setAltPhone] = useState("");

    const params = useParams();
    const id = params.id;

    useEffect(() => {
        console.log(id)
      fetch(`https://eevents-srvx.onrender.com/v1/discovery/services/${id}`)
        .then((res) => res.json())
        .then((data) => {        
            console.log(data)
            setProd(data.data); 
            setLoading(false)
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    useEffect(() => {
        const serviceSelect = document.getElementById('additionalService');
        const serviceQtyInput = document.getElementById('unitsNeeded');
        const addServiceQtyInput = document.getElementById('addQuantity');

        const totalDisplay = document.getElementById('additionalTotal');
        console.log(serviceSelect?.selectedOptions[0]?.dataset.price)
        function updateTotal() {
            const servicePrice = parseFloat(String(serviceSelect?.selectedOptions[0]?.dataset.price || "10").replace(/,/g, ""))
            const addServicePrice = parseFloat(String(serviceSelect?.selectedOptions[0]?.dataset.price || "0").replace(/,/g, ""))
            
            const serviceQty = parseInt(serviceQtyInput?.value || 1);
            const addServiceQty = parseInt(addServiceQtyInput?.value || 1);
            
            const serviceTotalPrice = servicePrice * serviceQty || 0;
            const addServiceTotalPrice = addServicePrice * addServiceQty || 0;

            const total = serviceTotalPrice + addServiceTotalPrice;
            /* const total = price * qty; */
            totalDisplay.textContent = '₦ ' + total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  
        }
        
        if (serviceSelect && addServiceQtyInput && serviceQtyInput && totalDisplay) {
            serviceSelect.addEventListener('change', updateTotal);
            addServiceQtyInput.addEventListener('input', updateTotal);
            serviceQtyInput.addEventListener('input', updateTotal);
            updateTotal(); // Initial calculation
        }

        // Cleanup (optional but clean)
        return () => {
            serviceSelect?.removeEventListener('change', updateTotal);
            addServiceQtyInput?.removeEventListener('input', updateTotal);
            serviceQtyInput?.removeEventListener('input', updateTotal);
        };
    }, []);


    async function handleSubmit(formData){
        const data = {
            eventType: formData.get('eventType'),
            eventTitle: formData.get('eventTitle'),
            eventDate: formData.get('eventDate'),
            eventTime: formData.get('eventTime'),
            eventDuration: formData.get('eventDuration'),
            eventLocation: formData.get('eventLocation'),
            unitsNeeded: formData.get('unitsNeeded'),
            additionalService: formData.get('additionalService'),
            addQuantity: formData.get('addQuantity'),
            preferredSetupDate: formData.get('preferredSetupDate'),
            preferredSetupTime: formData.get('preferredSetupTime'),
            specialInstructions: formData.get('specialInstructions'),
            contactPersonName: formData.get('contactPersonName'),
            ContactPersonPhone: formData.get('ContactPersonPhone'),
            AltContactPersonPhone: formData.get('AltContactPersonPhone'),
            agree: formData.get('agree') === 'on'
        };
        try {
            const bookingRes = await fetch("https://eevents-srvx.onrender.com/v1/bookings", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ data}),
            });

            const Data  = await bookingRes.json();

            if (!bookingRes.ok){
                throw{
                status: Data.status,
                code: Data.code ?? bookingRes.status,
                message: Data.message,
                details: Data.data ?? null
                }
            }

            return{
                status: Data.status,
            }

        } catch (err) {
            console.log(err)
            throw{
                status: err.status,
                code: err.code ?? bookingRes.status,
                message: err.message,
                details: err.data ?? null
            }
        }
        console.log('Form submitted:', data);
        return { success: true, data };
    }

    if (loading) return <Loading text="Fetching service..." />
      
    return ( 
        <div className='main'>
            <header className="header">
                <img className="bannerImg" src={prod.serviceImage} alt="Banner" />
            </header>
            <div className={`mainContent ${styles.mainContent}`}>
                
                <aside className="aside">
                    <div className="vendor">
                        <div className="vendorImgPack">
                            <img className="vendorImg" src={prod.vendorProfileImage} alt="vendor" />
                        </div>
                        
                        <div className="vendorDetails">
                            <p className="vendorName">Tee Home of Decor.</p>
                            <p style={{color:"#636363"}}>{new Date(prod.dateJoined).toLocaleDateString("en-US", { month: "long", year: "numeric", })}</p>
                            <div className="catPill">
                                <li>{prod.category}</li>
                            </div>
                        </div>

                        <div className="ratingPack">
                            <p className="rating">RATING</p>
                            <Rating
                                readonly
                                initialValue={prod.vendorRatings.rating}
                                allowFraction
                                size={34}
                                fillColor="#fbbf24"
                                emptyColor="#e5e7eb"
                            />  
                            <p style={{fontWeight:700}}>{prod.vendorRatings.rating.toFixed(1)} Stars  | {prod.vendorRatings.numberOfReviews} Reviews</p>
                        </div>
                    </div>
                </aside>

                <section className={styles.mainSection}>
                    <h2>Book Vendor- {prod.serviceName}</h2>
                    <form action={handleSubmit} className={bStyles.bookVendorForm}>
                        <select value={eventType} onChange={(e) => setEventType(e.target.value)} required name="eventType">
                            <option value="" selected hidden disabled>Event category</option>
                            <option value="Wedding">Wedding</option>
                            <option value="Birthday">Birthday</option>
                            <option value="Corporate Event">Corporate Event</option>
                            <option value="Burial">Burial</option>
                            <option value="Concert">Concert</option>
                            <option value="Religious Event">Religious Event</option>
                            <option value="Graduation">Graduation</option>
                            <option value="Anniversary">Anniversary</option>
                            <option value="Private Party">Private Party</option>
                            <option value="Retirement">Retirement</option>
                            <option value="Other">Other</option>
                        </select>

                        <input type="text" required name='eventTitle' placeholder='Event title (e.g. Tunde & Amaka Wedding Reception)' />

                        <div className={bStyles.formFlex}>
                            <input type={isFocused ? "date" : "text"} onFocus={() => setIsFocused(true)} onBlur={(e) => !e.target.value && setIsFocused(false)} placeholder='Event Date' name="eventDate" required />
                            <input type={isFocusedT ? "time" : "text"} onFocus={() => setIsFocusedT(true)} onBlur={(e) => !e.target.value && setIsFocusedT(false)} placeholder='Event Time' name='eventTime' required/>
                        </div>

                        <select value={eventDuration} onChange={(e) => setEventDuration(e.target.value)} required name="eventDuration">
                            <option value="" selected hidden disabled>Event duration</option>
                            <option value="1-3">1-3 hours</option>
                            <option value="4-7">4-7 hours</option>
                            <option value="8-11">8-11 hours</option>
                            <option value="12-15">12-15 hours</option>
                        </select>

                        <input type="text" name='eventLocation' placeholder='Event location' required />

                        <select value={selectServiceType} onChange={(e) => setSelectServiceType(e.target.value)} id="serviceType" name="serviceType">
                            <option value="" selected hidden disabled>Select service type</option>
                            {prod?.serviceVariants?.map((type) => (
                                <option
                                    key={type.title}
                                    value={type.title}
                                    data-price={type.cost}
                                >
                                    {type.title} (₦{type.cost})
                                </option>
                            ))}
                        </select>
                        <input type="text" name='unitPrice' placeholder='Event location' required />

                        <input type="number" min={0} id='unitsNeeded' name='unitsNeeded' placeholder='Units needed ( default is 1 unit )' 
                            onKeyDown={(e) => {if (e.key === "-" || e.key === "e") e.preventDefault();}} />

                        {/* ADDITIONAL SERVICE – NOW USING data-price (SAFE & SIMPLE) */}
                        <select id="additionalService" name="additionalService" defaultValue="">
                            <option value=""  disabled>Select additional service</option>
                            {prod?.additionalService?.map((add) => (
                                <option
                                    key={add.title}
                                    value={add.title}
                                    data-price={add.cost}
                                >
                                    {add.title} (₦{add.cost})
                                </option>
                            ))}
                        </select>

                        {/* QUANTITY INPUT */}
                        <input
                            type="number"
                            min="0"
                            id="addQuantity"
                            name="addQuantity"
                            placeholder="Additional Service Units needed"                            
                            onKeyDown={(e) => ["-", "e", "E", "."].includes(e.key) && e.preventDefault()}
                        />

                        <div className={bStyles.formFlex}>
                            <input type={isFocusedSD ? "date" : "text"} onFocus={() => setIsFocusedSD(true)} onBlur={(e) => !e.target.value && setIsFocusedSD(false)} placeholder='Preferred setup date' name="preferredSetupDate" required />
                            <input type={isFocusedST ? "time" : "text"} onFocus={() => setIsFocusedST(true)} onBlur={(e) => !e.target.value && setIsFocusedST(false)} placeholder='Preferred setup time' name='preferredSetupTime' required/>
                        </div>

                        <textarea name="specialInstructions" placeholder='Special Instructions'></textarea>

                        <input type="text" name='contactPersonName' placeholder='Contact person name' />

                        <input type="tel" name='ContactPersonPhone' placeholder='Contact person phone number' value={phone} onChange={(e) => {const numbersOnly = e.target.value.replace(/\D/g, ""); setPhone(numbersOnly);}} />

                        <input type="tel" name='AltContactPersonPhone' placeholder='Alternate contact phone number' value={altPhone} onChange={(e) => {const numbersOnly = e.target.value.replace(/\D/g, ""); setAltPhone(numbersOnly);}} />

                        {/* TOTAL COST – NOW UPDATES LIVE */}
                        <div className={bStyles.formFlex}>
                            <p style={{color:"#636363", letterSpacing:'0.25rem'}}>TOTAL COST</p>
                            <h2 id="additionalTotal">₦ 00.00</h2>
                        </div>

                        <div className={bStyles.termsCondition}>
                            <input type="checkbox" name='agree' checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}/>
                            <p style={{color:"#636363"}}>By proceeding, I agree to eEvents <Link href="/" style={{color:"#82027D"}}>Terms and Conditions</Link> </p>
                        </div>

                        <button 
                            type="submit" 
                            disabled={!isAgreed}
                            className={`${isAgreed ? bStyles.submitBtn : bStyles.disabledBtn }`}
                        >
                            {isAgreed ? 'Proceed to payment' : 'Accept Terms to Continue'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
 
export default BookVendor;