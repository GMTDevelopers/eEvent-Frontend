'use client'

import styles from '../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import AccountStep from './steps/accountStep';
import ProgressIndicator from '@/app/(components)/progressIndicator/page';
import BusinessStep from './steps/businessStep';
import VerificationStep from './steps/verificationStep';
import SubscriptionStep from './steps/SubscriptionStep';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useAuth } from '@/app/contexts/AuthContext';

const stepsConfig = [
/*   { id: 1, label: 'Account', title: 'Create new vendor account (1/4)' }, */
  { id: 1, label: 'Business', title: 'Create new vendor account - business (1/3)' },
  { id: 2, label: 'Verification', title: 'Create new vendor account - verification (2/3)' },
  { id: 3, label: 'Subscription', title: 'Create new vendor account - subscription (3/3)' },
];


const VendorRegistration = () => {
  const {logedInUser} = useAuth()
  const { openModal } = useModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [certificateUrl, setCertificateUrl] = useState('');
  const [passportUrl, setPassportUrl] = useState('');
  const [idUrl, setIdUrl] = useState('');
  const [logoUrl, setLogoUrl] = useState('');

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    registered: 'True',
    certificate: null,
    description: '',
    experience: '',
    address: '',
    country: 'Nigeria',
    states: [],
    idType: 'National ID',
    idNumber: '',
    idFile: null,
    businessFile: null,
    passportFile: null,
    subscriptionPlan: '',
  });
  const [errors, setErrors] = useState({});

  const currentConfig = stepsConfig.find((s) => s.id === currentStep);

  const validateCurrentStep = () => {
    const stepErrors = {};
    if (currentStep === 1) {
      // Business Step
      if (!formData.businessName.trim()) stepErrors.businessName = 'Business name is required';
      if (!formData.category) stepErrors.category = 'Business category is required';
      if (!formData.description.trim()) stepErrors.description = 'Business description is required';
      if (!formData.experience) stepErrors.experience = 'Years of experience is required';
      if (!formData.address.trim()) stepErrors.address = 'Business address is required';
      if (!formData.country) stepErrors.country = 'Country is required';
      if (!formData.states.trim()) stepErrors.states = 'Operating states are required';

      // If business is registered, require certificate upload
      if (formData.registered === 'True' && !formData.certificate) {
        stepErrors.certificate = 'Business certificate is required for registered businesses';
      }
    } else if (currentStep === 2) {
      // Verification Step
      if (!formData.idType) stepErrors.idType = 'Means of identification is required';
      if (!formData.idNumber.trim()) stepErrors.idNumber = 'ID number is required';
      if (!formData.idFile) stepErrors.idFile = 'ID document upload is required';
      if (!formData.businessLogo) stepErrors.businessFile = 'Business/license document upload is required';
      if (!formData.passportFile) stepErrors.passportFile = 'Passport/photo upload is required';
    } else if (currentStep === 3) {
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

    if (currentStep < 3) {
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


/*   const buildPayload = () => {
    return {
        business: {
          name: formData.businessName,
          category: formData.category,
          registered: formData.registered === 'Yes',
          logo: logoUrl,
          certificate: certificateUrl,
          description: formData.description,
          yearsOfExperience: Number(formData.experience),
          address: formData.address,
          countryOfOperation: [formData.country],
          operatingStates: formData.states,
        },

        verification: {
          type: formData.idType,
          maskedNumber: formData.idNumber,
          image: idUrl,
        },

        subscriptionId: formData.subscriptionPlan,
      }
  }; */

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("access_token");

    if (!token) {
      openModal(<SignIn />);
      return;
    }

    let certificateUrl = "";
    let idUrl = "";
    let passportUrl = "";
    let logoUrl = "";

    if (formData.certificate) {
      const fd = new FormData();
      fd.append("file", formData.certificate);

      const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/certificate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const result = await res.json();
      certificateUrl = result.data.url;
    }

    if (formData.idFile) {
      const fd = new FormData();
      fd.append("file", formData.idFile);

      const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/id", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const result = await res.json();
      idUrl = result.data.url;
    }

    if (formData.passportFile) {
      const fd = new FormData();
      fd.append("file", formData.passportFile);

      const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/id", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const result = await res.json();
      passportUrl = result.data.url;
    }

    if (formData.businessLogo) {
      const fd = new FormData();
      fd.append("file", formData.businessLogo);

      const res = await fetch("https://eevents-srvx.onrender.com/v1/upload/id", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });

      const result = await res.json();
      logoUrl = result.data.url;
    }

    const payload = {
      business: {
        name: formData.businessName,
        category: formData.category,
        registered: formData.registered === "True",
        logo: logoUrl,
        certificate: certificateUrl,
        description: formData.description,
        yearsOfExperience: Number(formData.experience),
        address: formData.address,
        countryOfOperation: [formData.country],
        operatingStates: formData.states,
      },
      verification: {
        type: formData.idType,
        maskedNumber: formData.idNumber,
        image: idUrl,
      },
      subscriptionId: formData.subscriptionPlan,
    };

    console.log("FINAL PAYLOAD:", payload);

    const res = await fetch("https://eevents-srvx.onrender.com/v1/vendors", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: payload,
    });

    const result = await res.json();
    console.log(result);
   
  };

  /* const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('access_token');
    const fd1 = new FormData();
    fd1.append("file", formData.certificate);
    const fd2 = new FormData();
    fd2.append("file", formData.idFile);
    const fd3 = new FormData();
    fd3.append("file", formData.passportFile);
    const fd4 = new FormData();
    fd4.append("file", formData.businessLogo);
    console.log(token)
    if (!token) {
      openModal(<SignIn />)
      return;
    }
    if (formData.certificate){
      const certRes = await fetch("https://eevents-srvx.onrender.com/v1/upload/certificate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd1,
      });
      const certResult = await certRes.json();
      console.log('certificate result', certResult);
      setCertificateUrl(certResult.data.url)
    }
    if (formData.idFile){
      const idRes = await fetch("https://eevents-srvx.onrender.com/v1/upload/id", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd2,
      });
      const idResult = await idRes.json();
      console.log('id result', idResult);
      setIdUrl(idResult.data.url)
    }
    if (formData.passportFile){
      const passportRes = await fetch("https://eevents-srvx.onrender.com/v1/upload/profile", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd3,
      });
      const passportResult = await passportRes.json();
      console.log('passport result',passportResult);
      setPassportUrl(passportResult.data.url)
    } 
    if (formData.businessLogo){
      const logoRes = await fetch("https://eevents-srvx.onrender.com/v1/upload/logo", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: fd4,
      });
      const logoResult = await logoRes.json();
      console.log('certificate result', logoResult);
      setLogoUrl(logoResult.data.url)
    }

    const submitedForm = new FormData();
    submitedForm.append("business", JSON.stringify(buildPayload().business));
    submitedForm.append("verification", JSON.stringify(buildPayload().verification));
    submitedForm.append("subscriptionId", JSON.stringify(buildPayload().subscriptionId));
    console.log(submitedForm);
     const res = await fetch("https://eevents-srvx.onrender.com/v1/vendors", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: submitedForm,
    });

    const result = await res.json();
    console.log(submitedForm);
  }; */

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
                            {/* {currentStep === 0 && <AccountStep formData={formData} updateFormData={updateFormData} errors={errors} />} */}
                             {currentStep === 1 && <BusinessStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                            {currentStep === 2 && <VerificationStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                            {currentStep === 3 && <SubscriptionStep formData={formData} updateFormData={updateFormData} errors={errors} />}
                        </div>

                        <div className={styles.buttonsPack}>
                            {currentStep > 1 && ( <button type="button" className={styles.submitBtn} onClick={handleBack}> Back </button> )}
                                <button type="button" className={styles.submitBtn} onClick={currentStep === 3 ? handleSubmit: handleNext }>
                            {currentStep === 3 ? 'Proceed to payment' : 'Proceed'}
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default VendorRegistration;
