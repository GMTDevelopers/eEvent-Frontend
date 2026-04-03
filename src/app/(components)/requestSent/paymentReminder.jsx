
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';

const PaymentReminder = () => {    
    return ( 
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px"}} className={styles.signContainer}>
            <img src="/images/sent.png" alt="sent" />
            <h3>PAYMENT REMINDER SENT</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>A payment reminder has been sent to the vendor’s account profile and registered email address.</p>
            </div>            
        </div>
    );
}
 
export default PaymentReminder;