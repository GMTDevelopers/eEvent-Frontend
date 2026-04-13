import styles from '../steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { Minus, Plus } from 'lucide-react';

const Custom = ({ value = [], onChange }) => {

    const addTag = () => {
        onChange([...value, { tag: '', price: '' }]);
    };

    const removeTag = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, val) => {
        const updated = [...value];
        updated[index][field] = val;
        onChange(updated);
    };

    return (
        <div>
            <div className={xStyles.addForm}>
                {value.map((item, index) => (
                    <div style={{marginTop:"24px"}} className={styles.stepsFormPack} key={index}>
                        <div>
                            <div style={{width:"100%"}} className={styles.checkNavItems}>
                                <label> 
                                    <p style={{width:"auto"}}>Tag:</p> 
                                    <input 
                                        className={styles.perRangeInput} 
                                        placeholder="Enter here" 
                                        type="text" 
                                        value={item.tag || ""}
                                        onChange={(e) => handleChange(index, "tag", e.target.value)} 
                                    />  
                                </label>
                                <label> 
                                    <p style={{width:"auto"}}>Price:</p> 
                                    <input 
                                        className={styles.perRangeInput} 
                                        placeholder="₦ 50,000.00" 
                                        type="text" 
                                        value={item.price || ""}
                                        onChange={(e) => handleChange(index, "price", e.target.value)} 
                                    /> 
                                </label>

                                {value.length > 1 && (
                                    <div className='icon' onClick={() => removeTag(index)}> 
                                        <Minus className='icon' /> 
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                <div 
                    style={{background:"none", color:"#82027D"}} 
                    className={`btnNoCapsule ${styles.addServiceBtn}`} 
                    onClick={addTag}
                > 
                    <Plus /> Add tag 
                </div>
            </div>
        </div>
    );
};

export default Custom;


/* import styles from '../steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { Minus, Plus } from 'lucide-react';

const Custom = ({ value = [], onChange }) => {

    const addTag = () => {
        onChange([...value, { tag: '', price: '' }]);
    };

    const removeTag = (index) => {
        onChange(value.filter((_, i) => i !== index));
    };

    const handleChange = (index, field, val) => {
        const updated = [...value];
        updated[index][field] = val;
        onChange(updated);
    };

    return (
        <div>
            <div className={xStyles.addForm}>
                    
                {value.map((feature, index) => (
                    <div style={{marginTop:"24px"}} className={styles.stepsFormPack} key={index}>
                        <div>
                            <div style={{width:"100%"}} className={styles.checkNavItems}>
                                
                                <label> <p style={{width:"auto"}}>Tag:</p> <input className={styles.perRangeInput} placeholder="Enter here" type="text" onChange={(e) => handleChange(index, "to", e.target.value)} />  </label>
                                <label> <p style={{width:"auto"}}>Price:</p> <input className={styles.perRangeInput} placeholder="₦ 50,000.00" type="text"  onChange={(e) => handleChange(index, "price", e.target.value)} /> </label>
                                {value.length > 1 && (
                                    <div className='icon' onClick={() => removeTag(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>
                        </div>                      
    
                    </div>
                ))}

                <div style={{background:"none", color:"#82027D"}} className={`btnNoCapsule ${styles.addServiceBtn}`} onClick={addTag}> <Plus />  Add tag </div>
            </div>
        </div>
    );
};

export default Custom; */