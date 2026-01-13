import Link from 'next/link';
import styles from '../../navbar/(signIn)/signIn.module.css';

const Accept = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>ACCEPT BOOKING</h3>
            <div className={styles.termsCond}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE: Accepting this booking confirms your availability and commitment to the client. You are expected to provide excellent service within the agreed timelines. Please maintain all communication through the eEvents platform for transparency and client protection. Payments will be disbursed according to our Terms and Conditions, following confirmation of service completion by the client</p>
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