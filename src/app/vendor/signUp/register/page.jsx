'use client'

import styles from '../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css'
import Image from 'next/image';
import { useState } from 'react';
import AccountStep from './steps/accountStep';
import ProgressIndicator from '@/app/(components)/progressIndicator/page';
import BusinessStep from './steps/businessStep';
import VerificationStep from './steps/verificationStep';
import SubscriptionStep from './steps/SubscriptionStep';

const stepsConfig = [
  { id: 1, label: 'Account', title: 'Create new vendor account (1/4)' },
  { id: 2, label: 'Business', title: 'Create new vendor account - business (2/4)' },
  { id: 3, label: 'Verification', title: 'Create new vendor account - verification (3/4)' },
  { id: 4, label: 'Subscription', title: 'Create new vendor account - subscription (4/4)' },
];

const VendorRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    otherName: '',
    email: '',
    confirmEmail: '',
    phone: '',
    businessName: '',
    category: '',
    registered: 'Yes',
    certificate: null,
    description: '',
    experience: '',
    address: '',
    country: 'Nigeria',
    states: '',
    idType: 'National ID',
    idNumber: '',
    idFile: null,
    businessFile: null,
    passportFile: null,
    subscriptionPlan: '1 Month - ₦15,000.00',
  });
  const [errors, setErrors] = useState({});

  const currentConfig = stepsConfig.find((s) => s.id === currentStep);

  const validateCurrentStep = () => {
    const stepErrors = {};

    if (currentStep === 1) {
      // Account Step
      if (!formData.surname.trim()) stepErrors.surname = 'Surname is required';
      if (!formData.firstName.trim()) stepErrors.firstName = 'First name is required';
      if (!formData.email.trim()) stepErrors.email = 'Email address is required';
      if (!formData.confirmEmail.trim()) stepErrors.confirmEmail = 'Confirm email is required';
      if (formData.email !== formData.confirmEmail) stepErrors.confirmEmail = 'Emails do not match';
      if (!/\S+@\S+\.\S+/.test(formData.email)) stepErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) stepErrors.phone = 'Phone number is required';
      if (!/^\+\d{10,15}$/.test(formData.phone.trim())) {
        stepErrors.phone = 'Phone number must be in international format (e.g., +2348012345678)';
      }
    } else if (currentStep === 2) {
      // Business Step
      if (!formData.businessName.trim()) stepErrors.businessName = 'Business name is required';
      if (!formData.category) stepErrors.category = 'Business category is required';
      if (!formData.description.trim()) stepErrors.description = 'Business description is required';
      if (!formData.experience) stepErrors.experience = 'Years of experience is required';
      if (!formData.address.trim()) stepErrors.address = 'Business address is required';
      if (!formData.country) stepErrors.country = 'Country is required';
      if (!formData.states.trim()) stepErrors.states = 'Operating states are required';

      // If business is registered, require certificate upload
      if (formData.registered === 'Yes' && !formData.certificate) {
        stepErrors.certificate = 'Business certificate is required for registered businesses';
      }
    } else if (currentStep === 3) {
      // Verification Step
      if (!formData.idType) stepErrors.idType = 'Means of identification is required';
      if (!formData.idNumber.trim()) stepErrors.idNumber = 'ID number is required';
      if (!formData.idFile) stepErrors.idFile = 'ID document upload is required';
      if (!formData.businessFile) stepErrors.businessFile = 'Business/license document upload is required';
      if (!formData.passportFile) stepErrors.passportFile = 'Passport/photo upload is required';
    } else if (currentStep === 4) {
      // Subscription Step – usually just plan selection
      if (!formData.subscriptionPlan) stepErrors.subscriptionPlan = 'Please select a subscription plan';
    }

    return stepErrors;
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

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };



    return ( 
        <div style={{textAlign:'center'}} className="main">
            <br />
            <div className={styles.header}>
                <h1 style={{color:"#430340", fontStyle:"normal"}}>{currentConfig.title}</h1>
            </div>

            <div className={`${styles.doubleType2} main`}>
                <aside className={`${styles.photoPack} aside`}>
                    <Image height={620} width={589} src='/images/vendor/vendorAuth.png' alt="profile" />
                </aside>

                <section className={`${styles.mainSection} main`}>
                    <div>
                        <ProgressIndicator currentStep={currentStep} steps={stepsConfig} />
                        <div className={formStyles.signInForm}>
                            {currentStep === 4 && <AccountStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                             {currentStep === 2 && <BusinessStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                            {currentStep === 3 && <VerificationStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                            {currentStep === 1 && <SubscriptionStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                        </div>

                        <div className={styles.buttonsPack}>
                            {currentStep > 1 && ( <button type="button" className={styles.submitBtn} onClick={handleBack}> Back </button> )}
                                <button type="button" className={styles.submitBtn} onClick={handleNext}>
                            {currentStep === 4 ? 'Proceed to payment' : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default VendorRegistration;
