'use client'
import styles from '../../bookings/[id]/bookingItem.module.css';
/* import formStyles from '@/app/navbar/(signIn)/signIn.module.css' */
import formStyle from '@/app/vendor/signUp/signUp.module.css'

import { useRouter } from 'next/navigation';
import xStyles from './addService.module.css'
import {ChevronLeft} from 'lucide-react';

import ProgressIndicator from '@/app/(components)/progressIndicator/page';
import { useEffect, useState } from 'react';
import GalleryStep from './(add-steps)/galleryStep';
import ServiceStep from './(add-steps)/serviceFeature';
import AdditionalService from './(add-steps)/additionalService';
import ServicePricing from './(add-steps)/servicePricing';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useAuth } from '@/app/contexts/AuthContext';


const stepsConfig = [
  { id: 1, label: 'Gallery', title: '' },
  { id: 2, label: 'Features', title: '' },
  { id: 3, label: 'Additional services', title: '' },
  { id: 4, label: 'Pricing', title: '' },
];

const AddServices = /* async */ () => {
    const {refreshAccessToken} = useAuth()
    const { openModal } = useModal();
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const currentConfig = stepsConfig.find((s) => s.id === currentStep);
    const [errors, setErrors] = useState({});
    const [vendorData, setVendorData] = useState([]);
    const [vendorLoading, setVendorLoading] = useState(true);
    const [error, setError] = useState({});
    useEffect(() => {   
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getVendor = async () => {
            try{
                setVendorLoading(true)
                const reraRes = await fetch(`https://eevents-srvx.onrender.com/v1/vendors/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (reraRes.ok) {
                    const res = await reraRes.json();
                    console.log("vendor data",res)
                    setVendorData(res.data.business)
                    setVendorLoading(false)
                }
                if (reraRes.status=== 401) {
                    refreshAccessToken()
                }
            }catch(err){
                setError(err.message)
            }finally{
                setVendorLoading(false)
            }         
        }
        getVendor()
    }, [])
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

/*     const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');
        console.log(token)
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const res = await fetch("https://eevents-srvx.onrender.com/v1/vendors", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: buildFormData(),
        });

        const result = await res.json();
        console.log(result);
    }; */


    return ( 
        <div>
            <button onClick={() => router.back()} className={`section ${styles.backBtn}`}><ChevronLeft /> go back </button>
            <div className={styles.doubleContainer}>
                <div className="mainContent">
                    <aside className="aside">
                        <div className={`vendor ${styles.vendor}`}>
                            <div className="vendorImgPack">
                                <img className="vendorImg" src={vendorData?.logo || `/images/defaultDP.jpg` } alt="vendor" />
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
                        <form className={xStyles.addForm} action="">
                            <select /* value={eventDuration}  onChange={(e) => setEventDuration(e.target.value)} */ required name="eventDuration">
                                <option className={xStyles.option} value="" selected hidden disabled>Service category</option>
                                <option className={xStyles.option} value="Makeup Artist">Makeup Artist</option>
                                <option className={xStyles.option} value="Event Planner">Event Planner</option>
                                <option className={xStyles.option} value="Music & DJ">Music & DJ</option>
                                <option className={xStyles.option} value="Halls & venues">Halls & venues</option>
                                <option className={xStyles.option} value="Photography">Photography</option>
                                <option className={xStyles.option} value="Decorations">Decorations</option>
                                <option className={xStyles.option} value="Drinks and wines">Drinks and wines</option>
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
                                        <button type="button" className={formStyle.submitBtn} onClick={currentStep === 4 ? handleSubmit: handleNext }>
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