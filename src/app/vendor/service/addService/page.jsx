'use client'
import styles from '../../bookings/[id]/bookingItem.module.css';
import formStyle from '@/app/vendor/signUp/signUp.module.css'

import { useRouter } from 'next/navigation';
import xStyles from './addService.module.css'
import { ChevronLeft } from 'lucide-react';

import ProgressIndicator from '@/app/(components)/progressIndicator/page';
import { useEffect, useState } from 'react';
import GalleryStep from './(add-steps)/galleryStep';
import ServiceStep from './(add-steps)/serviceFeature';
import AdditionalService from './(add-steps)/additionalService';
import ServicePricing from './(add-steps)/servicePricing';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useAuth } from '@/app/contexts/AuthContext';
import ActionComplete from '@/app/(components)/requestSent/actionComplete';

const stepsConfig = [
  { id: 1, label: 'Gallery', title: '' },
  { id: 2, label: 'Features', title: '' },
  { id: 3, label: 'Extra services', title: '' },
  { id: 4, label: 'Pricing', title: '' },
];

const AddServices = () => {
    const { refreshAccessToken } = useAuth();
    const { openModal, closeModal } = useModal();
    const router = useRouter();

    const [currentStep, setCurrentStep] = useState(1);
    const [errors, setErrors] = useState({});

    const [vendorData, setVendorData] = useState([]);
    const [vendorLoading, setVendorLoading] = useState(true);

    // Clean and consistent central formData
    const [formData, setFormData] = useState({
        serviceCategory: '',
        serviceTitle: '',
        serviceDescription: '',
        media:[],
        servieFeature: [
            {
                featureTitle: '',
                featureDescription: ''
            }
        ],
        additionalService: {
            additionalService:false,
            services:[{
                title: '',
                description: '',
                unitPrice: ''
            }]
        },
        servicePricing: [
            {
                service: '',
                pricingCriteria: '',           // "unit" | "range" | "event" | "custom"
                price: Number()                  // dynamic object depending on pricingType
            }
        ],
        serviceOperatingCities: []
    });

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };

    // Fetch vendor data
    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />);
            return;
        }

        const getVendor = async () => {
            try {
                setVendorLoading(true);
                const response = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const res = await response.json();
                    setVendorData(res.data.business);
                } else if (response.status === 401) {
                    refreshAccessToken();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setVendorLoading(false);
            }
        };

        getVendor();
    }, []);

    const validateCurrentStep = () => {
        const stepErrors = {};

        if (currentStep === 1) {
            if (formData.media.length < 3) {
                stepErrors.media = 'At least 3 gallery images are required';
            }
        } else if (currentStep === 2) {
            const hasEmptyFeature = formData.servieFeature.some(
                f => !f.featureTitle.trim() || !f.featureDescription.trim()
            );
            if (hasEmptyFeature) {
                stepErrors.servieFeature = 'All service features must have title and description';
            }
        } else if (currentStep === 3) {
            const hasEmptyAdditional = formData.additionalService.services.some(
                s => !s.title.trim() || !s.description.trim() || !s.unitPrice.trim()
            );
            if (hasEmptyAdditional) {
                stepErrors.additionalService.services = 'All additional services must be fully filled';
            } 
        } else if (currentStep === 4) {
            const hasEmptyPricing = formData.servicePricing.some(
                p => !p.service.trim() || !p.pricingCriteria
            );
            if (hasEmptyPricing) {
                stepErrors.servicePricing = 'All pricing blocks must have service name and pricing type';
            }
        }

        return stepErrors;
    };

    const handleNext = () => {
        const stepErrors = validateCurrentStep();

        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setErrors({});

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final step - trigger submit
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({});
        }
    };

        // Handle comma-separated cities input
    const handleOperatingCitiesChange = (e) => {
        const value = e.target.value;
        
        // Split by comma, trim each city, and remove empty values
        const citiesArray = value
            .split(',')
            .map(city => city.trim())
            .filter(city => city !== '');

        updateFormData({
            serviceOperatingCities: citiesArray
        });
    };

    const handleSubmit = async () => {
        
        const token = localStorage.getItem('access_token');
        if (!token) {
            openModal(<SignIn />);
            return;
        }

        // Basic final validation before sending
        if (!formData.serviceCategory || !formData.serviceTitle || !formData.serviceDescription) {
            alert("Please fill in service category, title and description");
            return;
        }

        console.log("final submission data", formData)


        try {

            const response = await fetch("https://eevents-srvx.onrender.com/v1/vendors/services", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" ,
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();
            console.log("Service creation result:", result);

            if (response.ok) {
                openModal(<ActionComplete />)
                setTimeout(() => {
                    router.push('/vendor/service')
                }, 2500);
                // You can redirect here if needed: router.push('/vendor/services');
            } else {
                openModal(<ActionError />)
                setTimeout(() => {
                    closeModal()
                }, 2500);
                alert(result.message || "Failed to create service");
            }
        } catch (error) {
            console.error("Submit error:", error);
            alert("An error occurred while creating the service");
        }
    };

    return (
        <div>
            <button onClick={() => router.back()} className={`section ${styles.backBtn}`}>
                <ChevronLeft /> go back 
            </button>

            <div className={styles.doubleContainer}>
                <div className="mainContent">
                    <aside className="aside">
                        <div className={`vendor ${styles.vendor}`}>
                            <div className="vendorImgPack">
                                <img className="vendorImg" src={vendorData?.logo || `/images/defaultDP.jpg`} alt="vendor" />
                            </div>
                            
                            <div className="vendorDetails">
                                <p className="vendorName">{vendorData.name}</p>
                                <p style={{color:"#636363"}}>{vendorData?.date || `Joined March 2025`}</p>
                                <div className="catPill">
                                    <li>{vendorData?.category}</li>
                                </div>
                            </div>

                            <div className="ratingPack">
                                <p className="rating">RATING</p>
                                <img className="ratingStars" src="/images/productPage/ratings.png" alt="ratings" />
                                <p style={{fontWeight:700}}>4.7 Stars  |  32 Reviews</p>
                            </div>
                        </div>
                    </aside>

                    <section className="mainSection">
                        <h3>Add a service</h3>
                        <form className={xStyles.addForm}>
                            <select 
                                value={formData.serviceCategory}
                                onChange={(e) => updateFormData({ serviceCategory: e.target.value })}
                                required 
                                name="serviceCategory"
                            >
                                <option value="" hidden disabled>Service category</option>
                                <option value="Makeup Artist">Makeup Artist</option>
                                <option value="Event Planner">Event Planner</option>
                                <option value="Music & DJ">Music & DJ</option>
                                <option value="Halls & venues">Halls & venues</option>
                                <option value="Photography">Photography</option>
                                <option value="Decorations">Decorations</option>
                                <option value="Drinks and wines">Drinks and wines</option>
                            </select>

                            <input 
                                type="text" 
                                name="serviceTitle"
                                placeholder='Service title' 
                                required 
                                value={formData.serviceTitle}
                                onChange={(e) => updateFormData({ serviceTitle: e.target.value })}
                            />

                            <textarea 
                                name="serviceDescription" 
                                placeholder='Service description'
                                value={formData.serviceDescription}
                                onChange={(e) => updateFormData({ serviceDescription: e.target.value })}
                            />
                            <input 
                                type="text" 
                                placeholder='Cities Where You Operate (e.g. Lagos, Abuja, Port Harcourt)' 
                                required 
                                value={formData.serviceOperatingCities.join(', ')}
                                onChange={handleOperatingCitiesChange}
                            />

                            <div className={xStyles.formContainer}>
                                <ProgressIndicator currentStep={currentStep} steps={stepsConfig} />

                                <div className={xStyles.stepsContainer}>
                                    {currentStep === 1 && (
                                        <GalleryStep 
                                            formData={formData} 
                                            updateFormData={updateFormData} 
                                            errors={errors} 
                                        />
                                    )}
                                    {currentStep === 2 && (
                                        <ServiceStep 
                                            formData={formData} 
                                            updateFormData={updateFormData} 
                                            errors={errors} 
                                        />
                                    )}
                                    {currentStep === 3 && (
                                        <AdditionalService 
                                            formData={formData} 
                                            updateFormData={updateFormData} 
                                            errors={errors} 
                                        />
                                    )}
                                    {currentStep === 4 && (
                                        <ServicePricing 
                                            formData={formData} 
                                            updateFormData={updateFormData} 
                                            errors={errors} 
                                        />
                                    )}
                                </div>

                                <div className={formStyle.buttonsPack}>
                                    {currentStep > 1 && (
                                        <button 
                                            type="button" 
                                            className={formStyle.submitBtn} 
                                            onClick={handleBack}
                                        >
                                            Back
                                        </button>
                                    )}

                                    <button 
                                        type="button" 
                                        className={formStyle.submitBtn} 
                                        onClick={handleNext}
                                    >
                                        {currentStep === 4 ? 'Proceed to payment' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AddServices;