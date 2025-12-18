import styles from '../../signUp.module.css'
import formStyles from '@/app/navbar/(signIn)/signIn.module.css';
import bStyles from '@/app/find-service/[id]/bookVendor/bookingVendor.module.css';
const SubscriptionStep = ({ formData, updateFormData, errors }) => {

    const handleChange = (e) => {
        const { name, value } = e.target;
        updateFormData({ [name]: value });
    };

    return ( 
        <div className={`${formStyles.signInForm} ${bStyles.bookVendorForm}`}>
            <div style={{textAlign:"justify", color:"#666666"}} className={styles.termsCond}>
                <p>
                    <span style={{color:'#E50909'}}>PLEASE NOTE:</span><br />
                    A valid subscription is required to complete registration, activate and maintain your vendor account on eEvents. Subscriptions ensure that only verified and committed vendors are visible to clients and eligible to receive bookings. This system helps maintain service quality and trust across the platform. All payments made through eEvents, including subscription fees and client transactions, are safe and securely processed. Failure to renew your subscription may result in temporary suspension of your listings and booking privileges.
                </p>
            </div><br />
            <div style={{textAlign:"left", color:"#666666"}}>
                Select subscription plan
                <select name="subscriptionPlan" value={formData.subscriptionPlan} onChange={handleChange}>
                <option value="1 Month - ₦15,000.00">1 Month - ₦15,000.00</option>
                {/* Add more plans */}
                </select>
                {errors.subscriptionPlan && <p className={styles.error}>{errors.subscriptionPlan}</p>}
            </div><br />
        </div>
    );
}
 
export default SubscriptionStep;