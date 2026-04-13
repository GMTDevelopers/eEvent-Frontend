import styles from '../steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { Minus, Plus } from 'lucide-react';

const Range = ({ value = [], onChange }) => {

    const addRange = () => {
        onChange([...value, { from: '', to: '', price: '' }]);
    };

    const removeRange = (index) => {
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
                {value.map((rangeItem, index) => (
                    <div style={{marginTop:"24px"}} className={styles.stepsFormPack} key={index}>
                        <div>
                            <div style={{width:"100%"}} className={styles.checkNavItems}>
                                <label> 
                                    <p style={{width:"auto"}}>From:</p> 
                                    <input 
                                        className={styles.perRangeInput} 
                                        type="number" 
                                        value={rangeItem.from || ""}
                                        onChange={(e) => handleChange(index, "from", e.target.value)} 
                                    /> 
                                </label>
                                <label> 
                                    <p style={{width:"auto"}}>To:</p> 
                                    <input 
                                        className={styles.perRangeInput} 
                                        type="number" 
                                        value={rangeItem.to || ""}
                                        onChange={(e) => handleChange(index, "to", e.target.value)} 
                                    />  
                                </label>
                                <label> 
                                    <p style={{width:"auto"}}>Price:</p> 
                                    <input 
                                        className={styles.perRangeInput} 
                                        type="text" 
                                        value={rangeItem.price || ""}
                                        onChange={(e) => handleChange(index, "price", e.target.value)} 
                                    /> 
                                </label>

                                {value.length > 1 && (
                                    <div className='icon' onClick={() => removeRange(index)}> 
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
                    onClick={addRange}
                > 
                    <Plus /> Add Range 
                </div>
            </div>
        </div>
    );
};

export default Range;

/* import styles from '../steps.module.css';
import xStyles from '@/app/vendor/service/addService/addService.module.css';
import { Minus, Plus } from 'lucide-react';
const Range = ({ value = [], onChange }) => {

    const addRange = () => {
        onChange([...value, { from: '', to: '', price: '' }]);
    };

    const removeRange = (index) => {
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
                    
                {value.map((index) => (
                    <div style={{marginTop:"24px"}} className={styles.stepsFormPack} key={index}>
                        <div>
                            <div style={{width:"100%"}} className={styles.checkNavItems}>
                                <label> <p style={{width:"auto"}}>From:</p> <input className={styles.perRangeInput} type="number" onChange={(e) => handleChange(index, "from", e.target.value)} /> </label>
                                <label> <p style={{width:"auto"}}>To:</p> <input className={styles.perRangeInput} type="number" onChange={(e) => handleChange(index, "to", e.target.value)} />  </label>
                                <label> <p style={{width:"auto"}}>Price:</p> <input className={styles.perRangeInput} type="text"  onChange={(e) => handleChange(index, "price", e.target.value)} /> </label>
                                {value.length > 1 && (
                                    <div className='icon' onClick={() => removeRange(index)}> <Minus className='icon' /> </div>
                                )}
                            </div>
                        </div>                      
    
                    </div>
                ))}

                <div style={{background:"none", color:"#82027D"}} className={`btnNoCapsule ${styles.addServiceBtn}`} onClick={addRange}> <Plus />  Add Range </div>
            </div>
        </div>
    );
};

export default Range; */