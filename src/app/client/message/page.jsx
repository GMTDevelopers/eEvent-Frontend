'use client'
import { useState } from 'react';
import styles from './message.module.css';
import { SendHorizontal } from 'lucide-react';
const Message = () => {

    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        console.log(message); // replace with your send logic
        setMessage("");
    };

    return ( 
        <div className="mainContent">
            <aside className={` ${styles.messageAside} aside`}>
                <p style={{fontWeight:700}}>MESSAGE HISTORY (2 unread)</p>
                <div className={styles.chatHistory}>
                    <div className={styles.chatPack}>
                        <img src="/images/servicePage/serviceBG.png" alt="" />
                        <div className={styles.userSnippet}>
                            <div className={styles.userName}>
                                <p style={{fontWeight:700}}>Luxe Party Supplies</p>
                                <p>Jul 8</p>
                            </div>
                            <p className={styles.messageSnippet}>Reminder: Supply delivery is scheduled for this week.</p>
                        </div>
                    </div>
                    <div className={styles.chatPack}>
                        <img src="/images/servicePage/serviceBG.png" alt="" />
                        <div className={styles.userSnippet}>
                            <div className={styles.userName}>
                                <p style={{fontWeight:700}}>Luxe Party Supplies</p>
                                <p>Jul 8</p>
                            </div>
                            <p className={styles.messageSnippet}>Reminder: Supply delivery is scheduled for this week.</p>
                        </div>
                    </div>
                    <div className={styles.chatPack}>
                        <img src="/images/servicePage/serviceBG.png" alt="" />
                        <div className={styles.userSnippet}>
                            <div className={styles.userName}>
                                <p style={{fontWeight:700}}>Luxe Party Supplies</p>
                                <p>Jul 8</p>
                            </div>
                            <p className={styles.messageSnippet}>Reminder: Supply delivery is scheduled for this week.</p>
                        </div>
                    </div>
                </div>                    
            </aside>
            <section className={`mainSection ${styles.detailsContainer}`}>
                <div className={styles.DetailsUserName}>
                    <div style={{margin:"12px auto 22px auto"}} className={styles.chatPack}>
                        <img src="/images/servicePage/serviceBG.png" alt="" />
                        <div className={styles.userSnippet}>
                            <p style={{fontWeight:700}}>Luxe Party Supplies</p>
                            <p style={{color:"#636363"}} className={styles.messageSnippet}>Last active: Yesterday</p>
                        </div>
                    </div>
                </div>
                <div className={styles.messagesPack}>
                    <div className={`${styles.messageItem} ${styles.right}`}>
                        <p className={`${styles.message} ${styles.received}`}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                        </p>
                        <div style={{color:"#636363"}} className={styles.userName}>
                            <p>Luxe Party Supplies</p>
                            <p className={styles.messageSnippet}>09:26 PM</p>
                        </div>
                    </div>
                    <div className={`${styles.messageItem} ${styles.left}`}>
                        <p className={`${styles.message} ${styles.sent} `}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.                            </p>
                        <div style={{color:"#636363"}} className={styles.userName}>
                            <p>Luxe Party Supplies</p>
                            <p className={styles.messageSnippet}>09:26 PM</p>
                        </div>
                    </div>
                    <div className={`${styles.messageItem} ${styles.right}`}>
                        <p className={`${styles.message} ${styles.received}`}>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </p>
                        <div style={{color:"#636363"}} className={styles.userName}>
                            <p>Luxe Party Supplies</p>
                            <p className={styles.messageSnippet}>09:26 PM</p>
                        </div>
                    </div>
                    <div className={`${styles.messageItem} ${styles.left}`}>
                        <p className={`${styles.message} ${styles.sent} `}>
                            Lorem Ipsum is simply dummy.
                        </p>
                        <div style={{color:"#636363"}} className={styles.userName}>
                            <p>Luxe Party Supplies</p>
                            <p className={styles.messageSnippet}>09:26 PM</p>
                        </div>
                    </div>
                </div>
                <form className={styles.wrapper} onSubmit={handleSubmit}>
                    <input type="text" placeholder="Type a message..." value={message}  onChange={(e) => setMessage(e.target.value)} className={styles.input} />

                    <button type="submit" className={`${styles.sendButton} ${message.trim() ? styles.active : ""}`} >
                        <SendHorizontal />
                    </button>
                </form>
            </section>
        </div>
    );
}
 
export default Message;