'use client';
import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Loading from '@/app/(components)/loading/loading';   // reuse your loading component
import SignIn from '@/app/navbar/(signIn)/signIn';
import { useModal } from '@/app/(components)/ModalProvider/ModalProvider';
import ActionComplete from '@/app/(components)/requestSent/actionComplete';
import ActionError from '@/app/(components)/requestSent/actionError';

export default function PaymentCallback() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { openModal } = useModal();
    const [status, setStatus] = useState('loading');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const reference = searchParams?.get('reference') || searchParams?.get('trxref');

        if (!reference) {
            setStatus('failed');
            setMessage('No payment reference found.');
            return;
        }
        console.log("payment refrence", reference)
        // Call your backend to verify the payment and complete the booking
        verifyPayment(reference);
        getPayDet(reference)
    }, [searchParams]);

    const verifyPayment = async (reference) => {
        try {
            const token = localStorage.getItem("access_token");
      
            if (!token) {
                openModal(<SignIn />)
                return;
            }   

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/payments/verify/${reference}?gateway=paystack`, {                    // ← Use POST as per your API docs
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();
            console.log("verify payment result", result)
            if (result.status === "success" && result.data?.status === "success") {
                setStatus('success');
                setMessage("Payment successful! Your booking has been confirmed.");

                // Optional: redirect to success page after 2-3 seconds
                setTimeout(() => {
                    router.back();   // or /dashboard, /my-bookings etc.
                }, 3500);
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
    const getPayDet = async (reference) => {
        try {
            const token = localStorage.getItem("access_token");
           
            if (!token) {
                openModal(<SignIn />)
                return;
            }   

            const res = await fetch(`https://eevents-srvx.onrender.com/v1/payments/transactions/${reference}`, {                    // ← Use POST as per your API docs
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });

            const result = await res.json();
            console.log("payment details", result )

        } catch (err) {
            console.error(err);
            /* setStatus('failed'); */
            setMessage("could not get payment details.");
        }
    };

    if (status === 'loading') {
        return <Loading text="Verifying your payment..." />;
    }

    return (
        <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '600px', margin: '0 auto' }}>
            {status === 'success' ? (
                <>
                    <ActionComplete />
                    <p>{message}</p>
                    <p>Your booking is now confirmed.</p>
                </>
            ) : (
                <>
                    <ActionError />
                    <p>{message}</p>
                    <button onClick={() => router.push('/find-service')}>Go back</button>
                </>
            )}
        </div>
    );
}