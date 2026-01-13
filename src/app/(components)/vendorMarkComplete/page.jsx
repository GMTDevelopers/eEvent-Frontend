import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
const MarkComplete = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>MARK COMPLETED</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: By marking this event as completed, you confirm that all agreed services have been fully delivered to the client’s satisfaction. The client and admin will be notified to verify completion before payment is released. Please ensure all tasks are truly completed before proceeding.</p>
            </div>
            <div className={Styles.rescheduleDetails}>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event title</p>
                    <p>Mama Arowosaye’s 60th Birthday</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event date</p>
                    <p>July 11th, 2025.</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Service booked</p>
                    <p>Full Photography Coverage</p>
                </li>
            </div>
            <form className={styles.signInForm}>
                <input placeholder='Type [COMPLETE]' type='text' name='typeComplete' />
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Mark completed
                </button>
            </form>
            
        </div>
    );
}
 
export default MarkComplete;