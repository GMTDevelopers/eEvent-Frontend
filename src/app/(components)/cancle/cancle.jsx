import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';

const Cancle = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>CANCEL BOOKING</h3>
            <form className={styles.signInForm}>
                <textarea className={styles.cancleTxt} placeholder='Reason for cancelling' name="contact" id="" />
                <input placeholder='Type [CANCEL]' type='text' name='typeCancle' />
                <button style={{backgroundColor:'#E50909'}} type="submit">
                Submit request
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909'}}>PLEASE NOTE: All booking cancellations are reviewed by the eEvents admin team and processed according to vendor terms and refund policies. Refund eligibility is determined by the status of service preparation at the time of cancellation. In cases where vendors have commenced work or made purchases, partial or no refunds may apply. Additional details and conditions are outlined in our <Link href='/' style={{color:'#82027D'}}>Terms of Use.</Link> </p>
            </div>
        </div>
    );
}
 
export default Cancle;