import styles from '../../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css';
import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css';
const BusinessStep = ({ formData, updateFormData, errors }) => {
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
        updateFormData({ [name]: files[0] });
        } else {
        updateFormData({ [name]: value });
        }
    };

    return ( 
        <div className={`${formStyles.signInForm} ${bStyles.bookVendorForm}`}>
            <div>
                <input placeholder='Business name' type="text" name="businessName" value={formData.businessName} onChange={handleChange} />
                {errors.businessName && <p className={styles.error}>{errors.businessName}</p>}
            </div>
            <div>
                <select name="category" value={formData.category} onChange={handleChange}>
                    <option value="" selected hidden disabled>Business category</option>
                    <option value="">Select category</option>
                    <option value="Catering">Catering</option>
                </select>
                {errors.category && <p className={styles.error}>{errors.category}</p>}
            </div>
            <div>
                <select name="registered" value={formData.registered} onChange={handleChange}>
                    <option value="" selected hidden disabled>Is your business registered?</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                </select>
                {errors.registered && <p className={styles.error}>{errors.registered}</p>}
            </div>
            {formData.registered === 'Yes' && (
                <div style={{textAlign:"left", color:"#636363"}}>
                    Upload business certificate 
                    <input placeholder='Upload business certificate' type="file" name="certificate" onChange={handleChange} accept="image/*,.pdf" />
                    {errors.certificate && <p className={styles.error}>{errors.certificate}</p>}
                </div>
            )}
            <div>
                
                <textarea placeholder='Business description' name="description" value={formData.description} onChange={handleChange} />
                {errors.description && <p className={styles.error}>{errors.description}</p>}
            </div>
            <div>
                <select name="experience" value={formData.experience} onChange={handleChange}>
                    <option value="" selected hidden disabled>Years of experience</option>
                    <option value="">Select years</option>
                    <option value="1-3 Years">1-3 Years</option>
                </select>
                {errors.experience && <p className={styles.error}>{errors.experience}</p>}
            </div>
            <div>
                <input placeholder='Business address' type="text" name="address" value={formData.address} onChange={handleChange} />
                {errors.address && <p className={styles.error}>{errors.address}</p>}
            </div>
            <div>
                <input placeholder='Country of operation' type="text" name="country" value={formData.country} onChange={handleChange} />
                {errors.country && <p className={styles.error}>{errors.country}</p>}
            </div>
            <div>
                <input placeholder='Operating states' type="text" name="states" value={formData.states} onChange={handleChange} />
                {errors.states && <p className={styles.error}>{errors.states}</p>}
            </div>
        </div>
    );
}
 
export default BusinessStep;