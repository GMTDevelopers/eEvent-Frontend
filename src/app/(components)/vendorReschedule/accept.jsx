import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from './reschedule.module.css';
const Accept = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>ACCEPT RESCHEDULE REQUEST</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE:: By accepting this request, you acknowledge the new event date and agree to honor the booking under the revised schedule. Please ensure that all changes have been discussed with the client. Payment and completion terms remain governed by eEvents’ Terms and Conditions</p>
            </div>
            <div className={Styles.rescheduleDetails}>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Initial event date</p>
                    <p>June 28th, 2025</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>New event date</p>
                    <p>July 11th, 2025</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Reschedule reason</p>
                    <p>Several key guests and participants won’t be available on the initial date, and I’d like to shift the event to accommodate them.</p>
                </li>
            </div>
            <form className={styles.signInForm}>
                <input placeholder='Type [ACCEPT]' type='text' name='typeAccept' />
                <button style={{backgroundColor:'#2ED074'}} type="submit">
                Accept booking
                </button>
            </form>
            
        </div>
    );
}
 
export default Accept;