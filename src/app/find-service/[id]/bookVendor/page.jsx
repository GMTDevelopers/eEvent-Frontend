'use client';
import { useEffect, useState } from 'react';
import styles from '../product.module.css'
import bStyles from './bookingVendor.module.css'
import Link from 'next/link';
import { useParams, useRouter } from "next/navigation";
import { Rating } from 'react-simple-star-rating';
import Loading from '@/app/(components)/loading/loading';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useAuth } from '@/app/contexts/AuthContext';

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

    const {logedInUser} = useAuth()
    
    const [servicePrice, setServicePrice] = useState(0);
    const [serviceQty, setServiceQty] = useState(1);
    const [addServicePrice, setAddServicePrice] = useState(0);
    const [addServiceQty, setAddServiceQty] = useState(0);
    const [total, setTotal] = useState(0);

    const params = useParams();
    const id = params.id;

    const { openModal } = useModal();
    const router = useRouter();

    useEffect(() => {
        console.log(id)
      fetch(`https://eevents-srvx.onrender.com/v1/discovery/services/${id}`)
        .then((res) => res.json())
        .then((data) => {        
            console.log("service details", data)
            setProd(data.data); 
            setLoading(false)
        })
      .catch((error) => console.error("Error fetching data:", error));
    }, [id]);

    useEffect(() => {
        const serviceTotal = servicePrice * serviceQty;
        const addServiceTotal = addServicePrice * addServiceQty;
        setTotal(serviceTotal + addServiceTotal);
    }, [servicePrice, serviceQty, addServicePrice, addServiceQty]);

    useEffect(() => {
        const savedForm = sessionStorage.getItem("pendingBookingForm");
        if (!savedForm) return;

        const values = JSON.parse(savedForm);

        Object.entries(values).forEach(([name, value]) => {
            const field = document.querySelector(`[name="${name}"]`);
            if (field) field.value = value;
        });
    }, []);

    const toBackendISO = (date) => {
        if (!date) return null;
        return new Date(date).toISOString().replace('.000', '');
    };

    async function handleSubmit(formData) {
        // Build additionalServices properly (only include if user actually selected one)
        let additionalServices = [];

        const addServiceName = formData.get('additionalService')?.trim();
        const addQuantity = Number(formData.get('addQuantity') || 0);

        if (addServiceName && addServiceName !== "" && addQuantity > 0) {
            additionalServices = [{
                name: addServiceName,
                quantity: addQuantity
                // You can add price here too if your backend expects it: price: addServicePrice
            }];
        }

        const data = {
            vendorId: prod.vendorId,
            serviceId: prod.serviceId,
            eventType: formData.get('eventType'),
            eventTitle: formData.get('eventTitle'),
            eventDate: toBackendISO(formData.get('eventDate')),
            eventTime: formData.get('eventTime'),
            eventDuration: Number(formData.get('eventDuration') || 1),
            eventLocation: formData.get('eventLocation'),
            unitPrice: servicePrice,
            unitsNeeded: Number(formData.get('unitsNeeded') || 1),
            additionalServices: additionalServices,        // ← Now correctly handled
            preferredSetupDate: toBackendISO(formData.get('preferredSetupDate')),
            preferredSetupTime: formData.get('preferredSetupTime'),
            specialInstructions: formData.get('specialInstructions') || "",
            contactPersonName: formData.get('contactPersonName') || "",
            contactPersonPhone: formData.get('ContactPersonPhone') || "",
            // AltContactPersonPhone: formData.get('AltContactPersonPhone') || "",  // uncomment if needed
            totalCost: total
        };

        console.log("Final payload being sent:", data);   // ← Very useful for debugging

        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                const entries = Object.fromEntries(formData.entries());
                sessionStorage.setItem("pendingBookingForm", JSON.stringify(entries));
                openModal(<SignIn />);
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

            const result = await bookingRes.json().catch(() => ({}));

            console.log("API Response:", { 
                status: bookingRes.status, 
                ok: bookingRes.ok, 
                result 
            });

            if (!bookingRes.ok) {
                throw {
                    status: bookingRes.status,
                    message: result.message || result.error || "Booking failed",
                    details: result.data ?? result
                };
            }

            sessionStorage.removeItem("pendingBookingForm");
            console.log("Booking successful:", result);

            if(result.status==="success" && result.data){
                try {
                    // === STEP 1: Initialize Payment ===
                    const initializeRes = await fetch("https://eevents-srvx.onrender.com/v1/payments/initialize", {
                        method: "POST",
                        headers: { 
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`
                        },
                        body: JSON.stringify({
                            paymentType: "BOOKING",
                            entityId: result.data.bookingId,
                            paymentOption: "FULL",
                            gateway: "paystack"
                        }),
                    });

                    const initResult = await initializeRes.json();

                    if (!initializeRes.ok) {
                        console.log(initResult)
                        throw new Error(initResult.message || "Failed to initialize payment");
                        
                    }
                    console.log("payment init", initResult )
                    // Paystack returns { status: true, data: { url, access_code, reference } }
                    if (initResult.data?.url) {
                        // Redirect user to Paystack checkout
                        window.location.href = initResult.data.url;
                    } else {
                        throw new Error("No authorization URL received");
                    }

                } catch (err) {
                    console.error("Payment initialization error:", err);
                    alert(err.message || "Something went wrong. Please try again.");
                }
            }
            // router.push('/success') or router.back() etc.
            return result;

        } catch (err) {
            console.error("Booking error:", err);
            throw err;
        }
    }
/* 
    async function handleSubmit(formData){
        const data = {
            vendorId: prod.vendorId,
            serviceId: prod.serviceId,
            eventType: formData.get('eventType'),
            eventTitle: formData.get('eventTitle'),
            eventDate: toBackendISO(formData.get('eventDate')),
            eventTime: formData.get('eventTime'),
            eventDuration: Number(formData.get('eventDuration') || 1),
            eventLocation: formData.get('eventLocation'),
          serviceType: formData.get('serviceType'), 
            unitPrice: servicePrice,
            unitsNeeded: Number(formData.get('unitsNeeded') || 1),
            additionalServices:[{
                name: formData.get('additionalService'),
                quantity: Number(formData.get('addQuantity') || 0)
            }],
            preferredSetupDate: toBackendISO(formData.get('preferredSetupDate')),
            preferredSetupTime: formData.get('preferredSetupTime'),
            specialInstructions: formData.get('specialInstructions'),
            contactPersonName: formData.get('contactPersonName'),
            contactPersonPhone: formData.get('ContactPersonPhone'),
           AltContactPersonPhone: formData.get('AltContactPersonPhone'),

            totalCost: total
        };
        console.log(data)
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                // storing form data in session before asking for signIn
                const entries = Object.fromEntries(formData.entries());
                sessionStorage.setItem("pendingBookingForm", JSON.stringify(entries));
                // signIn
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

            // ✅ success handling (minimal, safe)
            sessionStorage.removeItem("pendingBookingForm");
            console.log("Booking successful:", result);
            router.back(); 
            return result;   
                          

        } catch (err) {
            console.log(err)
            throw err
        }

    } */

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
                            <img className="vendorImg" src={prod.vendorProfileImage || '/images/defaultDP.jpg'} alt="vendor" />
                        </div>
                        
                        <div className="vendorDetails">
                            <p className="vendorName">{prod.vendorName}</p>
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
                        <select onChange={(e) => setEventType(e.target.value)} required name="eventType">
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
                            <option value="1">1 hours</option>
                            <option value="2">2 hours</option>
                            <option value="3">3 hours</option>
                            <option value="4">4 hours</option>
                            <option value="5">5 hours</option>
                            <option value="6">6 hours</option>
                            <option value="7">7 hours</option>
                            <option value="8">8 hours</option>
                        </select>

                        <input type="text" name='eventLocation' placeholder='Event location' required />

                        <select onChange={(e) => {const price = Number(e.target.selectedOptions[0].dataset.price || 0);setServicePrice(price);}} id="serviceType" name="serviceType">
                            <option value="" selected hidden disabled>Select service type</option>
                                (<option value={prod.serviceName} data-price={prod.servicePrice} >
                                    {prod.serviceName} (₦{prod.servicePrice})
                                </option>)
                                { prod?.serviceVariants?.map((type) => (
                                        <option key={type.name} value={type.name} data-price={type.price} >
                                            {type.name} (₦{type.price})
                                        </option>
                                    )) 
                                }
                            {/* {prod?.serviceVariants === null ?
                                (<option value={prod.serviceName} data-price={prod.servicePrice} >
                                    {prod.serviceName} (₦{prod.servicePrice})
                                </option>)
                            :
                               prod?.serviceVariants?.map((type) => (
                                    <option key={type.title} value={type.title} data-price={type.cost} >
                                        {type.title} (₦{type.cost})
                                    </option>
                                )) 
                            } */}
                           
                        </select>

                        <input required type="number" min={1} name='unitsNeeded' placeholder='Units needed ( default is 1 unit )' onChange={(e) => setServiceQty(Number(e.target.value || 1))} />

                        {/* ADDITIONAL SERVICE – NOW USING data-price (SAFE & SIMPLE) */}
               
                        <select onChange={(e) => {
                                const price = Number(e.target.selectedOptions[0].dataset.price || 0);
                                setAddServicePrice(price);
                            }} name="additionalService">
                                <option value="" selected hidden disabled>Select additional service (optional)</option>
                                {prod?.additionalService?.map((add) => (
                                    <option
                                        key={add.name}
                                        value={add.name}
                                        data-price={add.price}
                                    >
                                        {add.name} (₦{add.price})
                                    </option>
                                ))}
                        </select>
               
               {/*          <select onChange={(e) => {const price = Number(e.target.selectedOptions[0].dataset.price || 0); setAddServicePrice(price);}} name="additionalService">
                            <option value="" selected hidden disabled>Select additional service</option>
                            {prod?.additionalService?.map((add) => (
                                <option
                                    key={add.name}
                                    value={add.name}
                                    data-price={add.price}
                                >
                                    {add.name} (₦{add.price})
                                </option>
                            ))}
                        </select> */}

                        {/* QUANTITY INPUT */}
                        <input type="number" disabled={!addServicePrice} min={0} name="addQuantity" placeholder="Additional Service Units needed" onChange={(e) => setAddServiceQty(Number(e.target.value || 0))} />

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
                            <h2>₦ {total.toLocaleString("en-NG", {minimumFractionDigits: 2, maximumFractionDigits: 2})}</h2>
                        </div>

                        <div className={bStyles.termsCondition}>
                            <input type="checkbox" name='agree' checked={isAgreed} onChange={(e) => setIsAgreed(e.target.checked)}/>
                            <p style={{color:"#636363"}}>By proceeding, I agree to eEvents <Link href="/" style={{color:"#82027D"}}>Terms and Conditions</Link> </p>
                        </div>

                        <button type="submit" disabled={!isAgreed}
                            className={`${isAgreed ? bStyles.submitBtn : bStyles.disabledBtn }`} >
                            {isAgreed ? 'Proceed to payment' : 'Accept Terms to Continue'}
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
}
 
export default BookVendor;