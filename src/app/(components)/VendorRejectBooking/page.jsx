import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';

const VendorReject = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>REJECT BOOKING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909', textAlign:"justify"}}>PLEASE NOTE:  By rejecting this booking, you understand that the client will be notified immediately. This action cannot be undone, and the slot for this event date will be released for other vendors. Please ensure your decision is final before proceeding.</p>
            </div>
            <form className={styles.signInForm}>
                <textarea className={styles.cancleTxt} placeholder='Reason for rejecting' name="contact" id="" />
                <input placeholder='Type [REJECT]' type='text' name='typeReject' />
                <button style={{backgroundColor:'#E50909'}} type="submit">
                Reject booking
                </button>
            </form>
            
        </div>
    );
}
 
export default VendorReject;