import styles from '../../signUp.module.css';
import formStyles from '@/app/navbar/(signIn)/signIn.module.css';
import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css';
const VerificationStep = ({ formData, updateFormData, errors }) => {

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
        updateFormData({ [name]: files[0] });
        } else {
        updateFormData({ [name]: value });
        }
    };

    return ( 
        <div style={{textAlign:"right", color:"#636363"}} className={`${formStyles.signInForm} ${bStyles.bookVendorForm}`}>
            <div>
                Means of identification
                <select name="idType" value={formData.idType} onChange={handleChange}>
                    <option value=""> select means of identification</option>
                    <option value="NATIONAL_ID">National ID</option>
                    <option value="PASSPORT">Passport</option>
                    <option value="DRIVER_LICENSE">Driver License</option>
                {/* Add more options */}
                </select>
                {errors.idType && <p className={styles.error}>{errors.idType}</p>}
            </div>
            <div>
                ID No.
                <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} />
                {errors.idNumber && <p className={styles.error}>{errors.idNumber}</p>}
            </div>
            <div>
                Upload ID
                <input type="file" name="idFile" onChange={handleChange} accept="image/*,.pdf" />
                {errors.idFile && <p className={styles.error}>{errors.idFile}</p>}
            </div>
            <div>
                Upload business logo
                <input placeholder='' type="file" name="businessLogo" onChange={handleChange} accept="image/*,.pdf" />
                {errors.businessFile && <p className={styles.error}>{errors.businessFile}</p>}
            </div>
            {/* <div>
                Upload passport/photo
                <input type="file" name="passportFile" onChange={handleChange} accept="image/*" />
                {errors.passportFile && <p className={styles.error}>{errors.passportFile}</p>}
            </div> */}
        </div>
    );
}
 
export default VerificationStep;