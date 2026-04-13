import { useEffect } from "react";

const VerifyEmail = () => {

    useEffect(() => {

        const verifyMail = async () => {
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
            try {
                setVendorLoading(true);
                const response = await fetch(`https://eevents-srvx.onrender.com/v1/auth/verify?${query.toString()}`, {
                });

                if (response.ok) {
                    const res = await response.json();
                    setVendorData(res.data.business);
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