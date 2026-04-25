"use client";
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import Range from './(extra)/range';
import Custom from './(extra)/custom';

const ServicePricing = ({ formData, updateFormData, errors }) => {

    const services = formData.servicePricing || [];

    const addServiceFeature = () => {
        updateFormData({
            servicePricing: [
                ...services, 
                { 
                    service: "", 
                    pricingCriteria: "", 
                    unitPrice: "" 
                }
            ]
        });
    };

    const removeServiceFeature = (index) => {
        const updated = services.filter((_, i) => i !== index);
        updateFormData({ servicePricing: updated });
    };

    const handleChange = (index, field, value) => {
        const updated = [...services];
        updated[index][field] = value;
        updateFormData({ servicePricing: updated });
    };

    const handlePricingTypeChange = (index, type) => {
        const updated = [...services];
        updated[index].pricingCriteria = type;
        updated[index].unitPrice = "";        // Reset price when type changes
        updateFormData({ servicePricing: updated });
    };

    // This now directly sets the unitPrice value (no nested key)
    const handlePriceChange = (index, value) => {
        const updated = [...services];
        updated[index].unitPrice = value;
        updateFormData({ servicePricing: updated });
    };

    return ( 
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>SERVICE PRICING</p>
            </div>

            <div>
                <div className={xStyles.addForm}>
                    {services.map((feature, index) => (
                        <div className={styles.stepsFormPack} key={index}>
                            <div className={styles.addServiceHeader}>
                                <h4>SERVICE {index + 1}</h4>
                                {services.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}>
                                        <Minus className='icon' />
                                    </div>
                                )}
                            </div>

                            {/* Service Selector */}
                            <select 
                                value={feature.service} 
                                onChange={(e) => handleChange(index, "service", e.target.value)} 
                            >
                                <option value="" hidden disabled>Select service</option>
                                
                                <option value={formData.serviceTitle}>
                                    {formData.serviceTitle}
                                </option>
                            
                            </select>

                            {/* Pricing Criteria - Changed to Radio */}
                            <div className={styles.checkboxNav}>
                                <p style={{fontWeight:700, color:"#666666"}}>Pricing criteria</p>
                                <div className={styles.checkNavItems}>
                                    {["unit", "range", "event", "custom"].map((type) => (
                                        <label key={type}>
                                            <input
                                                type="radio"
                                                name={`pricingType-${index}`}
                                                checked={feature.pricingCriteria === type}
                                                onChange={() => handlePricingTypeChange(index, type)}
                                            />
                                            <p>{type}</p>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Unit Pricing */}
                            {feature.pricingCriteria === "unit" && (
                                <input
                                    type="number"
                                    placeholder="Enter unit price"
                                    value={feature.unitPrice || ""}
                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                />
                            )}

                            {/* Range Pricing */}
                            {feature.pricingCriteria === "range" && (
                                <Range
                                    value={feature.unitPrice || []}
                                    onChange={(val) => handlePriceChange(index, val)}
                                />
                            )}

                            {/* Event Pricing */}
                            {feature.pricingCriteria === "event" && (
                                <input
                                    type="number"
                                    placeholder="Enter event price"
                                    value={feature.unitPrice || ""}
                                    onChange={(e) => handlePriceChange(index, e.target.value)}
                                />
                            )}

                            {/* Custom Pricing */}
                            {feature.pricingCriteria === "custom" && (
                                <Custom
                                    value={feature.unitPrice || []}
                                    onChange={(val) => handlePriceChange(index, val)}
                                />
                            )}
                        </div>
                    ))}

                    <div className={`btnCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}>
                        <Plus /> Add another
                    </div>
                </div>
            </div>

            {errors?.pricing && <p>{errors.pricing}</p>}
        </div>
    );
};

export default ServicePricing;