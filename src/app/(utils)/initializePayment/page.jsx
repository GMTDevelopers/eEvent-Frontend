const InitPayment = async ({paymentType,entityId,paymentOption,token}) => {
    try {
/*         if (!entityId) {
            throw new Error("entityId is required");
        }
        if (!token) {
            throw new Error("Authentication token is required");
        } */
        // === STEP 1: Initialize Payment ===
        const initializeRes = await fetch("https://eevents-srvx.onrender.com/v1/payments/initialize", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                paymentType: paymentType,
                entityId: entityId,
                paymentOption: paymentOption,
                gateway: "paystack"
            }),
        });

        const initResult = await initializeRes.json();

        if (!initializeRes.ok) {
            console.log(initResult)
            throw new Error(initResult.message || "Failed to initialize payment");
            
        }
        console.log("payment init", initResult )
        // Paystack returns { status: true, data: { url, access_code, reference } }
        if (initResult.data?.url) {
            // Redirect user to Paystack checkout
            window.location.href = initResult.data.url;
        } else {
            throw new Error("No authorization URL received");
        }

    } catch (err) {
        console.error("Payment initialization error:", err);
        alert(err.message || "Something went wrong. Please try again.");
        return { 
            success: false, 
            error: err.message || "Unknown error" 
        };
    }

    
}
 
export default InitPayment;