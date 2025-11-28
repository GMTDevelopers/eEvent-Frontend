'use client'
import Header from "../(components)/header/page";
import { useModal } from "../(components)/ModalProvider/ModalProvider";
import { useAuth } from "../contexts/AuthContext";
import SignIn from "../navbar/(signIn)/signIn";

export default function ClientLayout({ children }) {
    const {logedInUser, logout} = useAuth()
    const { openModal } = useModal();

    return (
        <>
            {logedInUser && (
                <div className="main">
                    <Header />
                    <main>
                        {children}
                    </main> 
                </div>
            )}  
            {(!logedInUser) && (
                <div className="main">
                    {openModal(<SignIn />) }
                </div>
            )}  
              
        </>

    );
}
