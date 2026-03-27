import { useEffect, useState } from 'react';
import styles from '../adminUpdateStatus/updatePayStatus.module.css';
import Styles from '../vendorReschedule/reschedule.module.css';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '../ModalProvider/ModalProvider';
const ManageCancle = ({id, cStatus, vStatus, rescheduleReason}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState('');
    const [success, setSuccess] = useState('');
    const [data, setData] = useState([]);
    const { openModal, closeModal } = useModal();

    useEffect(() => {
        setIsLoading(true);
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        const getBookingsDetails = () => {      
            fetch(`https://eevents-srvx.onrender.com/v1/bookings/${id}`,{
                headers:{
                    authorization: `Bearer ${token}`,
                },
            })
            .then((res) =>{ 
                if (res.status===401) {
                    localStorage.removeItem('token');
                    openModal(<SignIn />)
                    router.refresh();
                }
                return res.json()
            })
            .then((data) => {    
                setData(data.data)        
                console.log("reschedule details",data);
            }) 

            .catch((error) => console.error("Error fetching data:", error))
            .finally( ()=> {
                setIsLoading(false);
            }  
            )
        }
        getBookingsDetails()
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const action = formData.get("rescheduleRequest");

        console.log(action)
        try{
            const token = localStorage.getItem("access_token");

                const Res = await fetch(`https://eevents-srvx.onrender.com/v1/admin/bookings/${id}/manage-reschedule`, {
                    method: "PATCH",
                    headers: { 
                        "Content-Type": "application/json" ,
                        authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({action}),
                });

                const Data  = await Res.json();
                setSuccess(Data.message)
                if (Res.ok){
                    closeModal(); 
                    router.refresh();
                }
                
                
                console.log(Data)
        }   catch(err){
            setError(err.message)
            console.log(err)
        }
        
    }; 
    return ( 
        <div className={styles.signContainer}>
            <h3>MANAGE CANCLE REQUEST</h3>
{/*             <div className={`${styles.termsCond} ${Styles.rescheduleTermsCond}`}>
                <p style={{color:'#636363', textAlign:"justify"}}>PLEASE NOTE:: By accepting this request, you acknowledge the new event date and agree to honor the booking under the revised schedule. Please ensure that all changes have been discussed with the client. Payment and completion terms remain governed by eEvents’ Terms and Conditions</p>
            </div> */}
            <div className={Styles.rescheduleDetails}>
                {error && <p className="error">{error}</p>}
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Event ID</p>
                    <p>{data?.bookingId}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>event date</p>
                    <p>{new Date(data?.initialEventDate).toDateString()}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Total amount</p>
                    <p>₦{data?.serviceOrdered?.totalCost.toLocaleString()} </p> 
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Cancle reason</p>
                    <p>{rescheduleReason}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Client status</p>
                    <p>{cStatus}</p>
                </li>
                <li className={Styles.detailItems}>
                    <p style={{color:"#636363"}}>Vendor Status</p>
                    <p>{vStatus}</p>
                </li>
            </div>
            <form onSubmit={handleSubmit} className={styles.bookForm}>
                <select defaultValue="Approve reschedule request?" name="cancleRequest">
                    <option disabled>Approve cancle request?</option>                 
                    <option value="accept">
                        Approve cancle request
                    </option>                                
                    <option value="reject">
                        Reject cancle request
                    </option>                                
                             
                </select>
                 {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                <button type="submit"> Update status </button>
            </form>
            
        </div>
    );
}
 
export default ManageCancle;