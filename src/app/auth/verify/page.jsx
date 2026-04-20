'use client'
import Loading from "@/app/(components)/loading/loading";
import { useModal } from "@/app/(components)/ModalProvider/ModalProvider";
import ActionComplete from "@/app/(components)/requestSent/actionComplete";
import ActionError from "@/app/(components)/requestSent/actionError";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const verifyToken = searchParams.get('token'); 
    const [loading, setLoading] = useState(null);
    const router = useRouter();
    const { openModal } = useModal();
    useEffect(() => {
        setLoading(true);
        const verifyMail = async () => {
            try {
                setVendorLoading(true);
                const response = await fetch(`https://eevents-srvx.onrender.com/v1/auth/verify?token=${verifyToken.toString()}`, {
                });

                if (response.ok) {
                    const res = await response.json();
                    if (res.status == "success"){
                        setLoading(false);
                        setTimeout(() => {
                            openModal(<ActionComplete />)
                        }, 1500)
                        router.push("/vendor/signUp")
                    }
                    
                } else {
                    setLoading(false);
                    openModal(<ActionError />)
                    setTimeout(() => {
                        router.push("/")
                    }, 1500);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        verifyMail();
    }, []);

    return ( 
        <div>
            {
                loading &&<div>
                    <Loading />
                </div>
            }
        </div>
    );
}
 
export default VerifyEmail;