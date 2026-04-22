'use client';
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css'

const ServiceStep = ({ formData, updateFormData, errors }) => {
    console.log(errors)
    const addServiceFeature = () => {
        updateFormData({
            servieFeature: [
                ...formData.servieFeature,
                { featureTitle: '', featureDescription: '' }
            ]
        });
    };

    const removeServiceFeature = (index) => {
        const updated = formData.servieFeature.filter((_, i) => i !== index);
        updateFormData({ servieFeature: updated });
    };

    const handleChange = (index, field, value) => {
        const updated = [...formData.servieFeature];
        updated[index][field] = value;
        updateFormData({ servieFeature: updated });
    };

    return (
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>ADD SERVICE FEATURES</p>
                <p >PLEASE NOTE: This section allows you to highlight the core offerings and unique strengths of your service. Clearly list what makes your service stand out — such as quality, reliability, or special add-ons — to help clients understand the value you provide at a glance. Well-detailed features increase trust and improve your chances of getting booked. Please note that a minimum of three (3) features is required for each listed service.</p>
            </div>
            <div >
                {formData.servieFeature.map((feature, index) => (
                    <div className={styles.stepsFormPack} key={index}>
                        <div className={styles.addServiceHeader}>
                            <h4>SERVICE FEATURE {index + 1}</h4>
                            {formData.servieFeature.length > 1 && (
                                <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                            )}
                        </div>                        
                        <input name='featureTitle' type="text" placeholder="Feature title" value={feature.featureTitle} onChange={(e) => handleChange(index, "featureTitle", e.target.value)} />
                        <textarea name='FeatureDescription' placeholder="Feature description" value={feature.featureDescription} onChange={(e) => handleChange(index, "featureDescription", e.target.value)} />
                        
                    </div>
                ))}

               { errors && <p style={{color:'#E50909'}}>{errors?.servieFeature}</p>}
                <br />

                <div className={`btnCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}> <Plus />   Add service feature </div>

                {/* <button onClick={submitFeatures} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button> */}
            </div>

        </div>
    );
}

export default ServiceStep;