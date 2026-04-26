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
    category: '',           // or eventType – using "category" to match your initial state
    eventOrganizer: '',
    eventDescription: '',
    eventDate: '',
    eventTime: '',
    eventLocation: '',
    images: [''],           // will be replaced with uploaded URLs
    pricing: [{ ticketCategory: '', price: '' }],
    numberOfAvailableTicket: [{ ticketCategory: '', quantity: '' }],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [galleryFiles, setGalleryFiles] = useState({
    featuredFile: null,
    additionalFiles: [null, null, null],
  });

  // Update simple fields
  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  // Update ticket category item
  const updateTicketType = (index, field, value) => {
    // Update both pricing and numberOfAvailableTicket arrays
    setFormData((prev) => {
      const newPricing = [...prev.pricing];
      const newAvailable = [...prev.numberOfAvailableTicket];

      if (field === 'ticketCategory') {
        newPricing[index] = { ...newPricing[index], ticketCategory: value };
        newAvailable[index] = { ...newAvailable[index], ticketCategory: value };
      } else if (field === 'price') {
        newPricing[index] = { ...newPricing[index], price: value };
      } else if (field === 'quantity') {
        newAvailable[index] = { ...newAvailable[index], quantity: value };
      }

      return {
        ...prev,
        pricing: newPricing,
        numberOfAvailableTicket: newAvailable,
      };
    });
  };

  // Add new ticket category
  const addTicketCategory = () => {
    setFormData((prev) => ({
      ...prev,
      pricing: [...prev.pricing, { ticketCategory: '', price: '' }],
      numberOfAvailableTicket: [
        ...prev.numberOfAvailableTicket,
        { ticketCategory: '', quantity: '' },
      ],
    }));
  };

  // Remove ticket category
  const removeTicketCategory = (index) => {
    if (formData.pricing.length === 1) return;
    setFormData((prev) => ({
      ...prev,
      pricing: prev.pricing.filter((_, i) => i !== index),
      numberOfAvailableTicket: prev.numberOfAvailableTicket.filter((_, i) => i !== index),
    }));
  };

  // Upload single image to dummy service and return URL
  const uploadImage = async (file) => {
    const form = new FormData();
    form.append('image', file);

    const res = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: form,
    });

    if (!res.ok) throw new Error('Image upload failed');
    const data = await res.json();
    return data.data.url; // direct image URL
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const token = localStorage.getItem('access_token');
    if (!token) {
      openModal(<SignIn />);
      setIsLoading(false);
      return;
    }

    // Basic validation
    if (!galleryFiles.featuredFile?.file) {
      alert('Please upload a featured image');
      setIsLoading(false);
      return;
    }
    const additionalCount = galleryFiles.additionalFiles.filter((item) => item !== null).length;
    if (additionalCount < 3) {
      alert('Please upload at least 3 additional images');
      setIsLoading(false);
      return;
    }

    try {
      // 1. Upload all images and collect URLs
      const imageUrls = [];

      // Featured
      if (galleryFiles.featuredFile?.file) {
        const url = await uploadImage(galleryFiles.featuredFile.file);
        imageUrls.push(url);
      }

      // Additional
      for (const item of galleryFiles.additionalFiles) {
        if (item?.file) {
          const url = await uploadImage(item.file);
          imageUrls.push(url);
        }
      }

      // 2. Prepare submission data (images as array of URLs)
      const submissionData = new FormData();

      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'images') return; // we'll add manually
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            submissionData.append(key, JSON.stringify(value));
          } else {
            submissionData.append(key, value);
          }
        }
      });

      // Add images as URLs (array)
      submissionData.append('images', JSON.stringify(imageUrls));

      console.log('Submitting with image URLs:', imageUrls);

      const res = await fetch('https://eevents-srvx.onrender.com/v1/admin/tickets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
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
        alert('Ticket listing added successfully!');
        // router.push('/somewhere'); // uncomment if needed
        window.location.reload(); // or use router.refresh()
      } else {
        alert(result.message || 'Failed to add ticket listing');
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred while submitting');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button onClick={() => router.back()} className={bStyles.backBtn}>
        <ChevronLeft /> go back
      </button>

      <h1>Add ticket listing</h1>

      <form onSubmit={handleSubmit} className={bStyles.bookVendorForm}>
        <input
          type="text"
          value={formData.ticketTitle}
          onChange={(e) => updateFormData({ ticketTitle: e.target.value })}
          placeholder="Ticket title"
          required
        />

        <select
          required
          value={formData.category}
          onChange={(e) => updateFormData({ category: e.target.value })}
        >
          <option value="" disabled hidden>
            Event category
          </option>
          <option value="Music & Concerts">Music & Concerts</option>
          <option value="Nightlife & Parties">Nightlife & Parties</option>
          <option value="Festivals & Culture">Festivals & Culture</option>
          <option value="Conferences">Conferences</option>
          <option value="Workshops">Workshops</option>
          <option value="Religious">Religious</option>
          <option value="Arts & Exhibitions">Arts & Exhibitions</option>
          <option value="Sports">Sports</option>
          <option value="Charity">Charity</option>
        </select>

        <input
          type="text"
          value={formData.eventOrganizer}
          onChange={(e) => updateFormData({ eventOrganizer: e.target.value })}
          placeholder="Event organizer"
          required
        />

        <textarea
          value={formData.eventDescription}
          onChange={(e) => updateFormData({ eventDescription: e.target.value })}
          placeholder="Event description"
        />

        <div>
          <input
            type={formData.eventDate ? 'date' : 'text'}
            onFocus={(e) => (e.target.type = 'date')}
            onBlur={(e) => !e.target.value && (e.target.type = 'text')}
            value={formData.eventDate}
            onChange={(e) => updateFormData({ eventDate: e.target.value })}
            placeholder="Event Date"
            required
          />
          <input
            type={formData.eventTime ? 'time' : 'text'}
            onFocus={(e) => (e.target.type = 'time')}
            onBlur={(e) => !e.target.value && (e.target.type = 'text')}
            value={formData.eventTime}
            onChange={(e) => updateFormData({ eventTime: e.target.value })}
            placeholder="Event Time"
            required
          />
        </div>

        <input
          type="text"
          value={formData.eventLocation}
          onChange={(e) => updateFormData({ eventLocation: e.target.value })}
          placeholder="Event location"
          required
        />

        {/* Removed the old single "availableTickets" input since you now use per-category quantity */}

        <ImgUpload galleryFiles={galleryFiles} setGalleryFiles={setGalleryFiles} />

        <h3>PRICING & QUANTITY</h3>

        {formData.pricing.map((ticket, index) => (
          <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            {formData.pricing.length > 1 && (
              <div className="icon" onClick={() => removeTicketCategory(index)}>
                <Minus />
              </div>
            )}

            <input
              type="text"
              placeholder="Ticket category (e.g. VIP, Regular)"
              value={ticket.ticketCategory}
              onChange={(e) => updateTicketType(index, 'ticketCategory', e.target.value)}
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
              placeholder="Quantity"
              value={formData.numberOfAvailableTicket[index]?.quantity || ''}
              onChange={(e) => updateTicketType(index, 'quantity', e.target.value)}
              required
            />
          </div>
        ))}

        <div
          style={{ width: 'max-content' }}
          className={`${bStyles.addServiceBtn} btnNoCapsule`} // fixed className
          onClick={addTicketCategory}
        >
          <Plus /> Add another ticket category
        </div>

        <button type="submit" className={bStyles.submitBtn} disabled={isLoading}>
          Add ticket listing {isLoading && <ButtonLoader />}
        </button>
      </form>
    </div>
  );
};

export default AddTicket;