
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
const SendRequest = ({user}) => {    
    return ( 
        <div className={styles.signContainer}>
            <h3>REQUEST SENT TO {user}</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>Your request to mark this event as completed has been successfully sent to the {user}.</p>
            </div>            
        </div>
    );
}
 
export default SendRequest;