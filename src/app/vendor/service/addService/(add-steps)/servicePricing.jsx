"use client";
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
/* import xStyles from './addService.module.css' */
import { useState } from "react";
import Range from './(extra)/range';
import Custom from './(extra)/custom';

const ServicePricing = ({ formData, updateFormData, errors }) => {

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

    //PRICING CRITERIA
    
    const [pricingType, setPricingType] = useState(""); 
    const [priceValues, setPriceValues] = useState({ unit: "", range: "", event: "", custom: "", });
    
    // checkbox select
    const handleSelect = (type) => {
        setPricingType(type);
    };
    const handleCheckboxChange = (field, value) => {
        setPriceValues({
        ...priceValues,
        [field]: value,
        });
    };

    return ( 
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>SERVICE PRICING</p>
                <p >PLEASE NOTE: This section is where you specify the exact service offered along with its pricing details. Clearly indicate whether your pricing is per unit (for example, per chair or per table), per range (covering a specified quantity), or per event (if the price applies to one full event). Transparent and accurate pricing helps clients understand your offer and increases booking confidence.</p>
            </div>
            <div >
                <div className={xStyles.addForm}>
                    
                    {features.map((feature, index) => (
                        <div className={styles.stepsFormPack} key={index}>
                            <div className={styles.addServiceHeader}>
                                <h4>SERVICE {index + 1}</h4>
                                {features.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>                        
                            <input name='specificService' type="text" placeholder="Specific service" value={feature.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
                            <div className={styles.checkboxNav}>
                                <p style={{fontWeight:700, color:"#666666"}}>Pricing criteria</p>
                                <div className={styles.checkNavItems}>
                                    <label> <input type="checkbox" checked={pricingType === "unit"} onChange={() => handleSelect("unit")} /> <p>Per unit</p> </label>
                                    <label> <input type="checkbox" checked={pricingType === "range"} onChange={() => handleSelect("range")} /> <p>Per range</p> </label>
                                    <label> <input type="checkbox" checked={pricingType === "event"} onChange={() => handleSelect("event")} />  <p>Per event</p> </label>
                                    <label> <input type="checkbox" checked={pricingType === "custom"} onChange={() => handleSelect("custom")} /> <p>Custom</p> </label>
                                </div>
                            </div>
                            {pricingType === "unit" && (
                                <input type="number" placeholder="Unit price" name='unitPrice'  value={priceValues.unit} onChange={(e) =>handleCheckboxChange("unit", e.target.value)} />
                            )}
                            {pricingType === "range" && (
                                <Range />
                            )}
                            {pricingType === "event" && (
                                <input type="number" placeholder="Price" name='eventPrice'  value={priceValues.unit} onChange={(e) =>handleCheckboxChange("unit", e.target.value)} />
                            )}
                            {pricingType === "custom" && (
                                <Custom />
                            )}
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
 
export default ServicePricing;