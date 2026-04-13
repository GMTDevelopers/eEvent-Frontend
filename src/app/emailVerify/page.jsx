const VerifyEmail = () => {

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            openModal(<SignIn />);
            return;
        }

        const verifyMail = async () => {
            const query = new URLSearchParams({
                skip,
                take: TAKE,
            });
            try {
                setVendorLoading(true);
                const response = await fetch(`https://eevents-srvx.onrender.com/v1/auth/verify?${query.toString()}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

        </div>
    );
}
 
export default VerifyEmail;