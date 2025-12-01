import styles from '../../navbar/(signIn)/signIn.module.css';
const Reschedule = () => {
    return ( 
       <div className={styles.signContainer}>
            <h3>RESCHEDULE EVENT</h3>
            <form className={styles.signInForm}>
                <label className={styles.label} htmlFor="initialDate">Initial event date</label>
                <input type='date' name='initialDate'/>
                <label className={styles.label} htmlFor="newDate">New event date</label>
                <input type='date' name='newDate' />
                <button type="submit">
                Submit request
                </button>
            </form>
            <div className={styles.termsCond}>
                <p style={{color:'#E50909'}}>PLEASE NOTE: Requests to reschedule an event date are subject to admin approval and depend on vendor availability. Your request will remain pending until both the admin and vendor confirm the new date.</p>
            </div>
        </div>
    );
}
 
export default Reschedule;