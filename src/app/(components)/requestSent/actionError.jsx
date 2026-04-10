
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';

const ActionError = () => {    
    return ( 
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px"}} className={styles.signContainer}>
            <img style={{width:"61px", height:"auto"}} src="/images/error.webp" alt="sent" />
            <h3>Action failed</h3>
            <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>Looks like something went wrong</p>
            </div>      
        </div>
    );
}
 
export default ActionError;