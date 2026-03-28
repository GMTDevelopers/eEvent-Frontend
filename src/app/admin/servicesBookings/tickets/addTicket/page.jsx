'use client';

import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { ChevronLeft, Minus, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import ImgUpload from './imgUpload';
import ButtonLoader from '@/app/(components)/loading/buttonLoader';

const AddTicket = () => {
    const router = useRouter();
    const { openModal } = useModal();

    const [formData, setFormData] = useState({
        ticketTitle: '',
        eventType: '',
        eventOrganizer: '',
        eventDescription: '',
        eventDate: '',
        eventTime: '',
        eventLocation: '',
        availableTickets: '',
        ticketType: [
            { name: '', price: '', quantity: '' }
        ]
    });
    const [isLoading, setIsLoading] = useState(false)
    const [galleryFiles, setGalleryFiles] = useState({
        featuredFile: null,
        additionalFiles: [null, null, null]
    });

    // Update normal fields
    const updateFormData = (newData) => {
        setFormData(prev => ({ ...prev, ...newData }));
    };

    // Update specific ticket type item
    const updateTicketType = (index, field, value) => {
        const updatedTicketTypes = [...formData.ticketType];
        updatedTicketTypes[index] = {
            ...updatedTicketTypes[index],
            [field]: value
        };
        setFormData(prev => ({
            ...prev,
            ticketType: updatedTicketTypes
        }));
    };

    // Add new ticket category
    const addTicketCategory = () => {
        setFormData(prev => ({
            ...prev,
            ticketType: [...prev.ticketType, { ticketCategory: '', categoryPrice: '' }]
        }));
    };

    // Remove ticket category
    const removeTicketCategory = (index) => {
        if (formData.ticketType.length === 1) return; // Keep at least one

        const updatedTicketTypes = formData.ticketType.filter((_, i) => i !== index);
        setFormData(prev => ({
            ...prev,
            ticketType: updatedTicketTypes
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true)
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />);
            return;
        }

        // Basic validation for images
        const additionalCount = galleryFiles.additionalFiles.filter(item => item !== null).length;
        if (!galleryFiles.featuredFile?.file) {
            alert("Please upload a featured image");
            return;
        }
        if (additionalCount < 3) {
            alert("Please upload at least 3 additional images");
            return;
        }

        const submissionData = new FormData();

        // Add all text fields (except ticketType)
        const { ticketType, ...textFields } = formData;
        
        Object.entries(textFields).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== '') {
                submissionData.append(key, value);
            }
        });

        // Add ticketType as JSON string (best way for array of objects in FormData)
        submissionData.append('ticketType', JSON.stringify(ticketType));

        // Add files
        if (galleryFiles.featuredFile?.file) {
            submissionData.append('featuredImage', galleryFiles.featuredFile.file);
        }

        galleryFiles.additionalFiles.forEach((item) => {
            if (item?.file) {
                submissionData.append('additionalImages', item.file);
            }
        });

        // Debug - Proper way to see FormData content
        console.log(formData,galleryFiles);

        try {
            const res = await fetch("https://eevents-srvx.onrender.com/v1/admin/tickets", {
                method: "POST",
                headers: { 
                    Authorization: `Bearer ${token}`
                },
                body: submissionData,
            });

            const result = await res.json();

            if (res.status === 401) {
                localStorage.removeItem('access_token');
                openModal(<SignIn />);
                router.refresh();
                return;
            }

            if (res.ok) {
                console.log(result)
                alert('Ticket listing added successfully!');
                setIsLoading(false)
                window.refresh()
                // router.push('/somewhere');
            } else {
                alert(result.message || 'Failed to add ticket listing');
                setIsLoading(false)
            }
        } catch (err) {
            console.error(err);
            alert('An error occurred while submitting');
        }
    };

    return (
        <section className="mainSection main">
            <button onClick={() => router.back()} className={`section backBtn`}>
                <ChevronLeft /> go back
            </button>

            <section>
                <h2>Add ticket listing</h2>
                <form onSubmit={handleSubmit} className={bStyles.bookVendorForm}>

                    <input 
                        type="text" 
                        value={formData.ticketTitle} 
                        onChange={(e) => updateFormData({ ticketTitle: e.target.value })} 
                        placeholder='Ticket title' 
                        required 
                    />

                    <select 
                        required 
                        value={formData.eventType} 
                        onChange={(e) => updateFormData({ eventType: e.target.value })}
                    >
                        <option value="" disabled hidden>Event category</option>
                        <option value="Wedding">Wedding</option>
                        <option value="Birthday">Birthday</option>
                        <option value="Corporate Event">Corporate Event</option>
                        <option value="Burial">Burial</option>
                    </select>

                    <input 
                        type="text" 
                        value={formData.eventOrganizer} 
                        onChange={(e) => updateFormData({ eventOrganizer: e.target.value })} 
                        placeholder='Event organizer' 
                        required 
                    />

                    <textarea 
                        value={formData.eventDescription} 
                        onChange={(e) => updateFormData({ eventDescription: e.target.value })} 
                        placeholder='Event description'
                    />

                    <div className={bStyles.formFlex}>
                        <input 
                            type={formData.eventDate ? "date" : "text"} 
                            onFocus={(e) => e.target.type = 'date'} 
                            onBlur={(e) => !e.target.value && (e.target.type = 'text')} 
                            value={formData.eventDate} 
                            onChange={(e) => updateFormData({ eventDate: e.target.value })} 
                            placeholder='Event Date' 
                            required 
                        />
                        <input 
                            type={formData.eventTime ? "time" : "text"} 
                            onFocus={(e) => e.target.type = 'time'} 
                            onBlur={(e) => !e.target.value && (e.target.type = 'text')} 
                            value={formData.eventTime} 
                            onChange={(e) => updateFormData({ eventTime: e.target.value })} 
                            placeholder='Event Time' 
                            required 
                        />
                    </div>

                    <input 
                        type="text" 
                        value={formData.eventLocation} 
                        onChange={(e) => updateFormData({ eventLocation: e.target.value })} 
                        placeholder='Event location' 
                        required 
                    />

                    <input 
                        type="number" 
                        min={1} 
                        value={formData.availableTickets} 
                        onChange={(e) => updateFormData({ availableTickets: e.target.value })} 
                        placeholder='No. of available tickets' 
                        required 
                    />

                    <ImgUpload galleryFiles={galleryFiles} setGalleryFiles={setGalleryFiles} />

                    <br />
                    <h4>PRICING</h4>

                    {formData.ticketType.map((ticket, index) => (
                        <div className={bStyles.stepsFormPack} key={index}>
                            <div className={bStyles.addServiceHeader}>
                                {formData.ticketType.length > 1 && (
                                    <div 
                                        className='icon' 
                                        onClick={() => removeTicketCategory(index)}
                                    >
                                        <Minus className='icon' />
                                    </div>
                                )}
                            </div>

                            <input 
                                type="text" 
                                placeholder="Ticket category (e.g. VIP, Regular)" 
                                value={ticket.name}
                                onChange={(e) => updateTicketType(index, 'name', e.target.value)}
                                required
                            />

                            <input 
                                type="number" 
                                placeholder="Price" 
                                value={ticket.price}
                                onChange={(e) => updateTicketType(index, 'price', e.target.value)}
                                required
                            />

                            <input 
                                type="number" 
                                placeholder="quantity" 
                                value={ticket.quantity}
                                onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
                                required
                            />
                        </div>
                    ))}

                    <br />
                    <div 
                        style={{ width: "max-content" }} 
                        className={`btnNoCapsule ${bStyles.addServiceBtn}`} 
                        onClick={addTicketCategory}
                    >
                        <Plus /> Add another ticket category
                    </div>

                    <br />
                    <button type="submit" className={bStyles.submitBtn}>
                        Add ticket listing {isLoading? <ButtonLoader /> : " "}
                    </button>
                </form>
            </section>
        </section>
    );
};

export default AddTicket;