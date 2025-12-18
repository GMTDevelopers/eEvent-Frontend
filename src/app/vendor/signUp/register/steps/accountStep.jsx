import styles from '../../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css'
const AccountStep = ({ formData, updateFormData, errors }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return ( 
        <div className={formStyles.signInForm}>
            <div>
                {errors.surname && <p className={styles.error}>{errors.surname}</p>}
                <input placeholder="Surname*" type="text" name="surname" value={formData.surname} onChange={handleChange} />
            </div>
            <div>
                {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
                <input placeholder="First Name*" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>
            <div>
                {errors.otherName && <p className={styles.error}>{errors.otherName}</p>}
                <input placeholder="Other name" type="text" name="otherName" value={formData.otherName} onChange={handleChange} />
            </div>
            <div>
                {errors.email && <p className={styles.error}>{errors.email}</p>}
                <input placeholder="Email*" type="email" name="email" value={formData.email} onChange={handleChange} />
            </div>
            <div>
                {errors.confirmEmail && <p className={styles.error}>{errors.confirmEmail}</p>}
                <input placeholder="Confirm email*" type="email" name="confirmEmail" value={formData.confirmEmail} onChange={handleChange} />
            </div>
            <div>
                {errors.phone && <p className={styles.error}>{errors.phone}</p>}
                <input placeholder="Phone*" type="tel" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
            
           
            
            
            
        </div>
    );
}
 
export default AccountStep;