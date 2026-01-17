'use client'
import styles from '../../bookings/[id]/bookingItem.module.css';
/* import formStyles from '@/app/navbar/(signIn)/signIn.module.css' */
import formStyle from '@/app/vendor/signUp/signUp.module.css'

import { useRouter } from 'next/navigation';
import xStyles from './addService.module.css'
import {ChevronLeft} from 'lucide-react';

import ProgressIndicator from '@/app/(components)/progressIndicator/page';
import { useState } from 'react';
import GalleryStep from './(add-steps)/galleryStep';
import ServiceStep from './(add-steps)/serviceFeature';
import AdditionalService from './(add-steps)/additionalService';
import ServicePricing from './(add-steps)/servicePricing';


const stepsConfig = [
  { id: 1, label: 'Gallery', title: '' },
  { id: 2, label: 'Features', title: '' },
  { id: 3, label: 'Additional services', title: '' },
  { id: 4, label: 'Pricing', title: '' },
];

const AddServices = /* async */ () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const currentConfig = stepsConfig.find((s) => s.id === currentStep);
    const [errors, setErrors] = useState({});
    const [formData, setFormData] = useState({
        serviceCategory: '',
        serviceTitle: '',
        serviceDescription: '',
        fileUpload:[],
        serviceFeature:[{
            featureTitle:'',
            FeatureDescription:'',
        }],
        additionalService:null,
        additionalService:[{
            serviceTitle:'',
            serviceDescription:'',
            unitPrice:''
        }],
        specificService:'',
        pricingCriteria:'',
        unitPrice:''
    });

    const validateCurrentStep = () => {
        const stepErrors = {};

        if (currentStep === 1) {
            if (!formData.fileUpload) stepErrors.fileUpload = 'Upload service image';
        } else if (currentStep === 2) {
            // Business Step
            

            // If business is registered, require certificate upload
            if (formData.registered === 'Yes' && !formData.certificate) {
                stepErrors.certificate = 'Business certificate is required for registered businesses';
            }
        } else if (currentStep === 4) {
            
        }

        return stepErrors;
    };

    const updateFormData = (newData) => {
        setFormData((prev) => ({ ...prev, ...newData }));
    };
    const handleNext = () => {
        const stepErrors = validateCurrentStep();
        if (Object.keys(stepErrors).length > 0) {
            setErrors(stepErrors);
            return;
        }

        setErrors({}); // Clear errors if valid

        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            // Final submit
            console.log('Submitting form:', formData);
            alert('Proceeding to payment...');
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
            setErrors({}); // Clear errors on back
        }
    };
    return ( 
        <div>
            <button onClick={() => router.back()} className={`section ${styles.backBtn}`}><ChevronLeft /> go back </button>
            <div className={styles.doubleContainer}>
                <div className="mainContent">
                    <aside className="aside">
                        <div className={`vendor ${styles.vendor}`}>
                            <div className="vendorImgPack">
                                <img className="vendorImg" src="/images/productPage/userImg.png" alt="vendor" />
                            </div>
                            
                            <div className="vendorDetails">
                                <p className="vendorName">Tee’s Sweet Treats</p>
                                <p style={{color:"#636363"}}>Joined March 2025</p>
                                <div className="catPill">
                                    <li>Catering</li>
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
                        <form className={xStyles.addForm} action="">
                            <select /* value={eventDuration}  onChange={(e) => setEventDuration(e.target.value)} */ required name="eventDuration">
                                <option className={xStyles.option} value="" selected hidden disabled>Service category</option>
                                <option className={xStyles.option} value="1-3">1-3</option>
                                <option className={xStyles.option} value="4-7">4-7</option>
                                <option className={xStyles.option} value="8-11">8-11</option>
                                <option className={xStyles.option} value="12-15">12-15</option>
                            </select>
                            <input type="text" name='serviceTitle' placeholder='Service title' required />
                            <textarea name="specialInstructions" placeholder='Service description'></textarea>
                            <div className={xStyles.formContainer}>
                                <ProgressIndicator currentStep={currentStep} steps={stepsConfig} />
                                <div className={xStyles.stepsContainer}>
                                    
                                    {currentStep === 1 && <GalleryStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                                    {currentStep === 2 && <ServiceStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                                    {currentStep === 3 && <AdditionalService formData={formData} updateFormData={updateFormData} errors={errors} />}
                                    {currentStep === 4 && <ServicePricing formData={formData} updateFormData={updateFormData} errors={errors} />}
                                </div>
                                
                                <div className={formStyle.buttonsPack}>
                                    {currentStep > 1 && ( <button type="button" className={formStyle.submitBtn} onClick={handleBack}> Back </button> )}
                                        <button type="button" className={formStyle.submitBtn} onClick={handleNext}>
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
}
 
export default AddServices;