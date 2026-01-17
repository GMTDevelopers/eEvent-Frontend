"use client";
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
/* import xStyles from './addService.module.css' */
import { useState } from "react";

const AdditionalService = ({ formData, updateFormData, errors }) => {

    const [features, setFeatures] = useState([
        { title: "", description: "", price: "" },
    ]);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ADD FEATURE
    const addServiceFeature = () => {
        setFeatures([...features, { title: "", description: "", price: "" }]);
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
            if (!features[i].price.trim()) {
                return `Feature ${i + 1} unit price is required`;
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
            setFeatures([{ title: "", description: "", price: "" }]);

        } catch (err) {
            setError(err.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };


    return ( 
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>ADDITIONAL SERVICES</p>
                <p >PLEASE NOTE: This section is where you can indicate any extra or complementary services you offer alongside your main service. These could include related add-ons that enhance the client’s overall event experience. Listing additional services helps clients see the full scope of what you offer and increases your chances of getting booked for multiple services at once.</p>
            </div>
            <div >
                <div className={xStyles.addForm}>
                    <select /* value={eventDuration}  onChange={(e) => setEventDuration(e.target.value)} */ required name="eventDuration">
                        <option className={xStyles.option} value="" selected>Yes</option>
                        <option className={xStyles.option} value="1-3">No</option>
                    </select>
                    {features.map((feature, index) => (
                        <div className={styles.stepsFormPack} key={index}>
                            <div className={styles.addServiceHeader}>
                                <h4>ADDITIONAL SERVICE  {index + 1}</h4>
                                {features.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>                        
                            <input name='ServiceTitle' type="text" placeholder="Service title" value={feature.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
                            <textarea name='ServiceDescription' placeholder="Service description" value={feature.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
                            <input name='ServicePrice' type="text" placeholder="Unit price" value={feature.price} onChange={(e) => handleChange(index, "price", e.target.value)} />
                            
                        </div>
                    ))}

                    {error && <p>{error}</p>}

                    <div className={`btnCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}> <Plus />  Add another service </div>
                </div>
                {/* <button onClick={submitFeatures} disabled={loading}>
                    {loading ? "Submitting..." : "Submit"}
                </button> */}
            </div>

        </div>
    );
}
 
export default AdditionalService;