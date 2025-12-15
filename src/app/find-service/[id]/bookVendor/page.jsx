'use client';
import { useEffect, useState } from 'react';
import styles from '../product.module.css'
import bStyles from './bookingVendor.module.css'
import Link from 'next/link';
import { useSearchParams } from "next/navigation";

const BookVendor = () => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isFocusedT, setIsFocusedT] = useState(false);
    const [isFocusedSD, setIsFocusedSD] = useState(false);
    const [isFocusedST, setIsFocusedST] = useState(false);

    const [eventType, setEventType] = useState("");
    const [eventDuration, setEventDuration] = useState("");
    const [selectService, setSelectService] = useState("");
    const [phone, setPhone] = useState("");
    const [altPhone, setAltPhone] = useState("");

    const params = useSearchParams();
    const data = params.get("data");
    const vendor = data ? JSON.parse(data) : null;

    useEffect(() => {
        const serviceSelect = document.getElementById('additionalService');
        const qtyInput = document.getElementById('quantity');
        const totalDisplay = document.getElementById('additionalTotal');
        console.log(serviceSelect?.selectedOptions[0]?.dataset.price)
        function updateTotal() {
            const price = parseFloat(String(serviceSelect?.selectedOptions[0]?.dataset.price || "0").replace(/,/g, ""))
            const qty = parseInt(qtyInput?.value || 1);
            const total = price * qty;
            totalDisplay.textContent = '₦ ' + total.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            console.log(price)
        }
        
        if (serviceSelect && qtyInput && totalDisplay) {
            serviceSelect.addEventListener('change', updateTotal);
            qtyInput.addEventListener('input', updateTotal);
            updateTotal(); // Initial calculation
        }

        // Cleanup (optional but clean)
        return () => {
            serviceSelect?.removeEventListener('change', updateTotal);
            qtyInput?.removeEventListener('input', updateTotal);
        };
    }, [vendor]);


    async function handleSubmit(formData){
        const data = {
            eventType: formData.get('eventType'),
            eventTitle: formData.get('eventTitle'),
            eventDate: formData.get('eventDate'),
            eventTime: formData.get('eventTime'),
            eventDuration: formData.get('eventDuration'),
            eventLocation: formData.get('eventLocation'),
            selectService: formData.get('selectService'),
            unitsNeeded: formData.get('unitsNeeded'),
            additionalService: formData.get('additionalService'),
            quantity: formData.get('quantity'),
            preferredSetupDate: formData.get('preferredSetupDate'),
            preferredSetupTime: formData.get('preferredSetupTime'),
            specialInstructions: formData.get('specialInstructions'),
            contactPersonName: formData.get('contactPersonName'),
            ContactPersonPhone: formData.get('ContactPersonPhone'),
            AltContactPersonPhone: formData.get('AltContactPersonPhone'),
            agree: formData.get('agree') === 'on'
        };
        console.log('Form submitted:', data);
        return { success: true, data };
    }

    return ( 
        <div className='main'>
            <header>
                <img className={styles.bannerImg} src="/images/productPage/productPageBanner.png" alt="Banner" />
            </header>
            <div className={styles.mainContent}>
                
                <aside className={styles.aside}>
                    <div className={styles.vendor}>
                        <div className={styles.vendorImgPack}>
                            <img className={styles.vendorImg} src="/images/productPage/userImg.png" alt="vendor" />
                        </div>
                        
                        <div className={styles.vendorDetails}>
                            <p className={styles.vendorName}>Tee Home of Decor.</p>
                            <p style={{color:"#636363"}}>Joined March 2025</p>
                            <div className={styles.catPill}>
                                <li>Decoration</li>
                            </div>
                        </div>

                        <div className={styles.ratingPack}>
                            <p className={styles.rating}>RATING</p>
                            <img className={styles.ratingStars} src="/images/productPage/ratings.png" alt="ratings" />
                            <p style={{fontWeight:700}}>4.7 Stars  |  32 Reviews</p>
                        </div>
                    </div>
                </aside>

                <section className={styles.mainSection}>
                    <h2>Book Vendor</h2>
                    <form action={handleSubmit} className={bStyles.bookVendorForm}>
                        <select value={eventType} onChange={(e) => setEventType(e.target.value)} required name="eventType">
                            <option value="" selected hidden disabled>Select a category</option>
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
                            <option value="1-3">1-3</option>
                            <option value="4-7">4-7</option>
                            <option value="8-11">8-11</option>
                            <option value="12-15">12-15</option>
                        </select>

                        <input type="text" name='eventLocation' placeholder='Event location' required />

                        <select value={selectService} onChange={(e) => setSelectService(e.target.value)} required name="selectService">
                            <option value="" selected hidden disabled>Select service</option>
                            <option value="1-3">1-3</option>
                            <option value="4-7">4-7</option>
                            <option value="8-11">8-11</option>
                            <option value="12-15">12-15</option>
                        </select>

                        <input type="number" min={0} name='unitsNeeded' placeholder='Units needed' 
                            onKeyDown={(e) => {if (e.key === "-" || e.key === "e") e.preventDefault();}} />

                        {/* ADDITIONAL SERVICE – NOW USING data-price (SAFE & SIMPLE) */}
                        <select id="additionalService" name="additionalService" defaultValue="">
                            <option value="" disabled>Select additional service</option>
                            {vendor?.additionalService?.map((add) => (
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
                            id="quantity"
                            name="quantity"
                            placeholder="Quantity"
                            defaultValue="1"
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