'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '@/app/(components)/loading/loading';   // reuse your loading component

export default function PaymentCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const reference = searchParams.get('reference') || searchParams.get('trxref');

        if (!reference) {
            setStatus('failed');
            setMessage('No payment reference found.');
            return;
        }

        // Call your backend to verify the payment and complete the booking
        verifyPayment(reference);
    }, [searchParams]);

    const verifyPayment = async (reference) => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setStatus('failed');
                setMessage("You are not logged in.");
                return;
            }

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/payments/verify/${reference}`, {
                method: "POST",                    // ← Use POST as per your API docs
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
            });

            const result = await res.json();

            if (res.ok && result.status === true && result.data?.status === "success") {
                setStatus('success');
                setMessage("Payment successful! Your booking has been confirmed.");

                // Optional: redirect to success page after 2-3 seconds
                setTimeout(() => {
                    router.back();   // or /dashboard, /my-bookings etc.
                }, 2500);
            } else {
                setStatus('failed');
                setMessage(result.message || "Payment verification failed.");
            }
        } catch (err) {
            console.error(err);
            setStatus('failed');
            setMessage("Something went wrong while verifying your payment.");
        }
    };

    if (status === 'loading') {
        return <Loading text="Verifying your payment..." />;
    }

    return (
        <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
            {status === 'success' ? (
                <>
                    <h2 style={{ color: 'green' }}>✅ Payment Successful!</h2>
                    <p>{message}</p>
                    <p>Your booking is now confirmed.</p>
                </>
            ) : (
                <>
                    <h2 style={{ color: 'red' }}>❌ Payment Verification Failed</h2>
                    <p>{message}</p>
                    <button onClick={() => router.push('/find-service')}>Try Again</button>
                </>
            )}
        </div>
    );
}