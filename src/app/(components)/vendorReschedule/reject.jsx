import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from './reschedule.module.css';
const Reject = () => {
    return (
        <div className={styles.signContainer}>
            <h3>REJECT RESCHEDULE REQUEST</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE: Rejecting this reschedule request means the event will not move to the new date proposed by the client. The admin will be notified, and further steps regarding the booking status or refund (if applicable) will follow the Terms and Conditions of eEvents. Please only reject if you’re certain you cannot meet the revised schedule.</p>
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
                <textarea className={styles.contactTxt} placeholder='Reason for rejecting' name="message" id="message" />
                <input placeholder='Type [Reject]' type='text' name='typeReject' />
                <button style={{backgroundColor:'#E50909'}} type="submit">
                Reject Reschedule
                </button>
            </form>
            
        </div>
    );
}
 
export default Reject;