"use client";
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css'
import { useState } from "react";

const ServiceStep = ({ formData, updateFormData, errors }) => {

    const [features, setFeatures] = useState([
        { title: "", description: "" },
    ]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ADD FEATURE
    const addServiceFeature = () => {
        setFeatures([...features, { title: "", description: "" }]);
    };

    // REMOVE FEATURE
    const removeServiceFeature = (index) => {
        const updatedFeatures = features.filter((_, i) => i !== index);
        setFeatures(updatedFeatures);
    };

    // HANDLE INPUT CHANGE
    const handleChange = (index, field, value) => {
        const updatedFeatures = [...features];
        updatedFeatures[index][field] = value;
        setFeatures(updatedFeatures);
    };

    // VALIDATION
    const validateFeatures = () => {
        for (let i = 0; i < features.length; i++) {
            if (!features[i].title.trim()) {
                return `Feature ${i + 1} title is required`;
            }
            if (!features[i].description.trim()) {
                return `Feature ${i + 1} description is required`;
            }
        }
        return null;
    };

    // SUBMIT TO API
    const submitFeatures = async () => {
        setError("");
        const validationError = validateFeatures();
        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://your-backend-api.com/service-features", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    features, // send array directly
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to submit service features");
            }

            // OPTIONAL: clear form after success
            setFeatures([{ title: "", description: "" }]);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return ( 
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>ADD SERVICE FEATURES</p>
                <p >PLEASE NOTE: This section allows you to highlight the core offerings and unique strengths of your service. Clearly list what makes your service stand out — such as quality, reliability, or special add-ons — to help clients understand the value you provide at a glance. Well-detailed features increase trust and improve your chances of getting booked. Please note that a minimum of three (3) features is required for each listed service.</p>
            </div>
            <div >
                {features.map((feature, index) => (
                    <div className={styles.stepsFormPack} key={index}>
                        <div className={styles.addServiceHeader}>
                            <h4>SERVICE FEATURE {index + 1}</h4>
                            {features.length > 1 && (
                                <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                            )}
                        </div>                        
                        <input name='featureTitle' type="text" placeholder="Feature title" value={feature.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
                        <textarea name='FeatureDescription' placeholder="Feature description" value={feature.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
                        
                    </div>
                ))}

                {error && <p>{error}</p>}

                <div className={`btnCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}> <Plus />   Add service feature </div>

                {/* <button onClick={submitFeatures} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button> */}
            </div>

        </div>
    );
}
 
export default ServiceStep;