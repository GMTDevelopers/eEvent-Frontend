import styles from '../../navbar/(signIn)/signIn.module.css';

const Message = () => {
    return ( 
        <div className={styles.signContainer}>
            <h3>MESSAGE CLIENT</h3>
            <form className={styles.signInForm}>
                <textarea className={styles.contactTxt} placeholder='Type message here' name="message" id="message" />
                <button type="submit">
                Send message
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#999999'}}>eEvents support is available exclusively for inquiries concerning active bookings, vendor performance, or service delivery disputes. Our team is available to help resolve concerns quickly and ensure a smooth experience on eEvents.</p>
            </div>
        </div>
    );
}
 
export default Message;