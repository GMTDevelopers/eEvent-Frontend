'use client'
import { useEffect, useState } from 'react';
import styles from '@/app/vendor/message/message.module.css';
/* import styles from './message.module.css'; */
import { SendHorizontal } from 'lucide-react';
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import { useAuth } from '@/app/contexts/AuthContext';
const Message = () => {
    const [message, setMessage] = useState("");
    const { openModal } = useModal();
    const {logedInUser} = useAuth()
    const [Data, setData] = useState([])
    const [msgDetails, setMsgDetails] = useState()
    const [sender, setSender] = useState('')
    const [bookId, setbookId] = useState('')
    const [loading, setLoading] = useState(null)
    const [detLoading, setDetLoading] = useState(null)
    const [active, setActive] = useState(false)
    const [success, setSuccess] = useState('');

    useEffect(() => {
        console.log("this is user id", logedInUser?.data?.id)
        setLoading(true)
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />)
            return;
        }
        fetch(`https://eevents-srvx.onrender.com/v1/messages/conversations/client`,{
            headers:{
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            console.log("messages", data);   // See what was fetched 
            setData(data.data);
            setLoading(false)       // Update state with the fetched data limit search to 6
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);


    const handleChatMessages = (id) => {
        setDetLoading(true);
        setActive(true)
        setbookId(id);

        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />);
            return;
        }

        setActive(true)

        fetch(`https://eevents-srvx.onrender.com/v1/messages/${id}`, {
            headers: {
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            const messages = data.data;
            console.log("message details", messages)
            setMsgDetails(messages);

            // ✅ SET SENDER HERE (IMPORTANT)
            if (messages && messages.length > 0) {
                const otherUser = messages.find(
                    msg => msg.receiverId !== logedInUser.data.id
                    
                );

                if (otherUser) {
                    setSender(otherUser.receiverId);
                    console.log("other user", otherUser)
                }
            }

            setDetLoading(false);
        })
        .catch((error) => console.error("Error fetching data:", error));
    };



    const handleSubmit = async (e) => {
        e.preventDefault();

        const content = e.target.message.value;

        if (!content.trim()) return;

        const newMessage = {
            id: Date.now(), // temporary ID
            senderId: logedInUser.data.id,
            receiverId: sender,
            bookingId: bookId,
            content,
            createdAt: new Date().toISOString(),
        };

        // ✅ 1. Show instantly (optimistic update)
        setMsgDetails((prev) => [...(prev || []), newMessage]);

        // ✅ 2. Clear input
        e.target.reset();

        try {
            const token = localStorage.getItem("access_token");

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/messages`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                receiverId: sender,
                bookingId: bookId,
                content,
            }),
            });

            const Data = await res.json();

            if (!res.ok) throw new Error(Data.message);

            setSuccess(Data.message);

            // (Optional) replace temp message with real one if backend returns it

        } catch (err) {
            console.error(err);

            setMsgDetails((prev) =>
            prev.slice(0, prev.length - 1)
            );
        }
    };

    return ( 
        <div className="mainContent">
            <aside className={` ${styles.messageAside} aside`}>
                <p style={{fontWeight:700}}>MESSAGE HISTORY (2 unread)</p>
                <div className={styles.chatHistory}>
                    { Data && Data.map((list)=> (
                        <div onClick={() => handleChatMessages(list.bookingId)} className={active ? `${styles.chatPack} ${styles.active}` : `${styles.chatPack} `}>
                            <img src={list.vendorLogo} alt="logo" />
                            <div className={styles.userSnippet}>
                                <div className={styles.userName}>
                                    <p style={{fontWeight:700}}>{list.vendorName}</p>
                                    <p>{new Date(list?.lastMessageAt)?.toLocaleDateString()}</p>
                                </div>
                                <p className={styles.messageSnippet}>{list.lastMessage}</p>
                            </div>
                        </div>
                    ))}
                </div>                    
            </aside>
            <section className={`mainSection ${styles.detailsContainer}`}>
       
                <div className={styles.messagesPack}>
                    {!msgDetails && <div className='descPack'>
                        ....Select a user to see conversation
                    </div>}
                    {msgDetails && msgDetails.map((det) => (
                        det.senderId === logedInUser?.data?.id ? (
                            //YOUR MESSAGE (RIGHT)
                            <div key={det.id} className={`${styles.messageItem} ${styles.right}`}>
                                <p className={`${styles.message} ${styles.received}`}>
                                    {det.content}
                                </p>
                                <div className={styles.userName}>
                                    <p className={styles.messageSnippet}>
                                    {new Date(det.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            // ✅ OTHER USER (LEFT)
                            <div key={det.id} className={`${styles.messageItem} ${styles.left}`}>
                                <p className={`${styles.message} ${styles.sent}`}>
                                    {det.content}
                                </p>
                                <div className={styles.userName}>
                                    <p className={styles.messageSnippet}>
                                    {new Date(det.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        )
                    ))}
                </div>
                <form className={styles.wrapper} onSubmit={handleSubmit}>
                    <textarea className={styles.input} placeholder='Type message here' name="message" value={message} onChange={(e) => setMessage(e.target.value)} />
                    {success && <p style={{color:"#2d9f35"}}>{success}</p>}
                    <button type="submit" className={`${styles.sendButton} ${message.trim() ? styles.active : ""}`} >
                        <SendHorizontal />
                    </button>
                </form>
            </section>
        </div>
    );
}
 
export default Message;