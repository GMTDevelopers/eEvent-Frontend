
import styles from '../../navbar/(signIn)/signIn.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';

const ActionComplete = () => {    
    return ( 
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"20px"}} className={styles.signContainer}>
            <img src="/images/sent.png" alt="sent" />
            <h3>Action Successful</h3>
            {/* <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>event marked as completed</p>
            </div>   */}          
        </div>
    );
}
 
export default ActionComplete;