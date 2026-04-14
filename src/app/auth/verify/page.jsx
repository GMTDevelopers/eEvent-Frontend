'use client'
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const verifyToken = searchParams.get('token'); 

    useEffect(() => {

        const verifyMail = async () => {
            try {
                setVendorLoading(true);
                const response = await fetch(`https://eevents-srvx.onrender.com/v1/auth/verify?${verifyToken.toString()}`, {
                });

                if (response.ok) {
                    const res = await response.json();
                    console.log(res)
                } else if (response.status === 401) {
                    refreshAccessToken();
                }
            } catch (err) {
                console.error(err);
            } finally {
                setVendorLoading(false);
            }
        };

        verifyMail();
    }, []);

    return ( 
        <div>
            <h2>This is the email verification page</h2>
        </div>
    );
}
 
export default VerifyEmail;