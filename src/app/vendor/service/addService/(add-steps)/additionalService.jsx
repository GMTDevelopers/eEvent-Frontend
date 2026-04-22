'use client';
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { useState } from 'react';

const AdditionalService = ({ formData, updateFormData, errors }) => {
    const [isAdd, setIsAdd] = useState(true)
    // Ensure additionalService object exists with default structure
    const additionalServiceData = formData.additionalService || {
        additionalService: true,
        services: []
    };

    // Add new additional service
    const addServiceFeature = () => {
        const currentServices = additionalServiceData.services || [];
        
        updateFormData({
            additionalService: {
                ...additionalServiceData,
                services: [
                    ...currentServices,
                    { title: '', description: '', unitPrice: '' }
                ]
            }
        });
    };

    // Remove additional service
    const removeServiceFeature = (index) => {
        const currentServices = additionalServiceData.services || [];
        const updatedServices = currentServices.filter((_, i) => i !== index);

        updateFormData({
            additionalService: {
                ...additionalServiceData,
                services: updatedServices
            }
        });
    };

    // Handle input changes for title, description, unitPrice
    const handleChange = (index, field, value) => {
        const currentServices = additionalServiceData.services || [];
        const updatedServices = [...currentServices];
        updatedServices[index][field] = value;

        updateFormData({
            additionalService: {
                ...additionalServiceData,
                services: updatedServices
            }
        });
    };

    // Handle Yes/No select (boolean)
    const handleAdditionalServiceToggle = (e) => {
        const isEnabled = e.target.value === "Yes";
        const isNotEnabled = e.target.value === "No";    // "Yes" → true, "No" → false
        updateFormData({
            additionalService: {
                additionalService: isEnabled,
                services: additionalServiceData.services || []
            }
        });
        
    };

    return (
        <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>ADDITIONAL SERVICES</p>
                <p>PLEASE NOTE: This section is where you can indicate any extra or complementary services you offer alongside your main service...</p>
            </div>

            <div>
                <div className={xStyles.addForm}>
                    
                    {/* Yes / No Select */}
                    <select 
                        // value={additionalServiceData.additionalService ? "Yes" : "No"}
                        onChange={handleAdditionalServiceToggle}
                        required
                    >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>

                    {/* Dynamic Additional Services List */}
                    {additionalServiceData.additionalService ? additionalServiceData.services.map((feature, index) => (
                        <div className={styles.stepsFormPack} key={index}>
                            <div className={styles.addServiceHeader}>
                                <h4>ADDITIONAL SERVICE {index + 1}</h4>
                                {additionalServiceData.services.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}>
                                        <Minus className='icon' />
                                    </div>
                                )}
                            </div>
 
                            <input 
                                type="text" 
                                placeholder="Service title" 
                                value={feature.title || ''} 
                                onChange={(e) => handleChange(index, "title", e.target.value)} 
                            />

                            <textarea 
                                placeholder="Service description" 
                                value={feature.description || ''} 
                                onChange={(e) => handleChange(index, "description", e.target.value)} 
                            />

                            <input 
                                type="text" 
                                placeholder="Unit price" 
                                value={feature.unitPrice?.toLocaleString() || ''} 
                                onChange={(e) => handleChange(index, "unitPrice", e.target.value)} 
                            />
                        </div> 
                    )): <div> </div>}

                    {additionalServiceData.additionalService && <div 
                        className={`btnCapsule ${styles.addServiceBtn}`} 
                        onClick={addServiceFeature}
                    >
                        <Plus /> Add another service
                    </div>}
                </div>
            </div>

            {errors?.additionalService && <p>{errors.additionalService}</p>}
        </div>
    );
};

export default AdditionalService;

/* 'use client';
import { Minus, Plus } from 'lucide-react';
import styles from './steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';

const AdditionalService = ({ formData, updateFormData, errors }) => {
        console.log(errors)
    const addServiceFeature = () => {
        updateFormData({
            additionalService: {
                services: [
                    
                    { title: '', description: '', unitPrice: '' }
                ]
            }
        });
    };

    const removeServiceFeature = (index) => {
        const updated = formData.additionalService.services.filter((_, i) => i !== index);
        updateFormData({ additionalService:{services: updated}  });
    };

    const handleChange = (index, field, value) => {
        const updated = [...formData.additionalService.services];
        updated[index][field] = value;
        updateFormData({ additionalService:{services: updated}  });
    };

    return (
       <div>
            <div className={styles.formDescription}>
                <p style={{fontWeight:700}}>ADDITIONAL SERVICES</p>
                <p >PLEASE NOTE: This section is where you can indicate any extra or complementary services you offer alongside your main service. These could include related add-ons that enhance the client’s overall event experience. Listing additional services helps clients see the full scope of what you offer and increases your chances of getting booked for multiple services at once.</p>
            </div>
            <div >
                <div className={xStyles.addForm}>
                    <select required name="eventDuration">
                        <option className={xStyles.option} value="" selected>Yes</option>
                        <option className={xStyles.option} value="1-3">No</option>
                    </select>
                    {formData.additionalService.services.map((feature, index) => (
                        <div className={styles.stepsFormPack} key={index}>
                            <div className={styles.addServiceHeader}>
                                <h4>ADDITIONAL SERVICE  {index + 1}</h4>
                                {formData.additionalService.services.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>                        
                            <input name='ServiceTitle' type="text" placeholder="Service title" value={feature.title} onChange={(e) => handleChange(index, "title", e.target.value)} />
                            <textarea name='ServiceDescription' placeholder="Service description" value={feature.description} onChange={(e) => handleChange(index, "description", e.target.value)} />
                            <input name='ServicePrice' type="text" placeholder="Unit price" value={feature.unitPrice} onChange={(e) => handleChange(index, "unitPrice", e.target.value)} />
                            
                        </div>
                    ))}

                    <div className={`btnCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}> <Plus />  Add another service </div>
                        
                </div>
            </div>
                
        </div>
    );
}

export default AdditionalService; */