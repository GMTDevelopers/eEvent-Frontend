import { useState } from "react";
import styles from '../steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { Minus, Plus } from 'lucide-react';
const Custom = () => {

    const [features, setFeatures] = useState([
        { tag: "", price: "" },
    ]);

    const [error, setError] = useState("");

    // ADD FEATURE
    const addServiceFeature = () => {
        setFeatures([...features, { tag: "", price: "" }]);
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

    return ( 
        <div>
            <div className={xStyles.addForm}>
                    
                {features.map((feature, index) => (
                    <div style={{marginTop:"24px"}} className={styles.stepsFormPack} key={index}>
                        <div>
                            <div style={{width:"100%"}} className={styles.checkNavItems}>
                                
                                <label> <p style={{width:"auto"}}>Tag:</p> <input className={styles.perRangeInput} placeholder="Enter here" type="text" onChange={(e) => handleChange(index, "to", e.target.value)} />  </label>
                                <label> <p style={{width:"auto"}}>Price:</p> <input className={styles.perRangeInput} placeholder="₦ 50,000.00" type="text"  onChange={(e) => handleChange(index, "price", e.target.value)} /> </label>
                                {features.length > 1 && (
                                    <div className='icon' onClick={() => removeServiceFeature(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>
                        </div>                      
    
                    </div>
                ))}

                {error && <p>{error}</p>}

                <div style={{background:"none", color:"#82027D"}} className={`btnNoCapsule ${styles.addServiceBtn}`} onClick={addServiceFeature}> <Plus />  Add tag </div>
            </div>
        </div>
    );
}
 
export default Custom;