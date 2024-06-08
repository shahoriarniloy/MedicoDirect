import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseCart from "../../../Hooks/UseCart";
import UseAuth from "../../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const CheckOutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const [cart, refetch] = UseCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);
    const { user } = UseAuth();
    const navigate = useNavigate()

    useEffect(() => {
       if(totalPrice>0){
        axiosSecure.post('/create-payment-intent', { price: totalPrice })
        .then(res => {
            // console.log(res.data.ClientSecret);
            setClientSecret(res.data.ClientSecret);
        })
        .catch(error => {
            console.error("Error creating payment intent:", error);
        });
       }
    }, [axiosSecure, totalPrice, cart]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        setProcessing(true);
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });

        if (paymentMethodError) {
            setError(paymentMethodError.message);
            // console.log('payment error', paymentMethodError);
            setProcessing(false);
            return;
        } else {
            // console.log('payment method', paymentMethod);
            setError('');
        }

        const { paymentIntent: confirmPaymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        });

        if (confirmError) {
            setError(confirmError.message);
            // console.log('confirm error', confirmError);
            setProcessing(false);
            return;
        }
        if(confirmPaymentIntent.status==='succeeded')

            {
                const transactionId= confirmPaymentIntent.id;
                
                const payment ={
                    email:user.email,
                    name:user.name,
                    price: totalPrice,
                    date: new Date(),
                    cartIds:cart.map(item=> item._id),
                    status:'pending',
                    transactionId: transactionId
                }
                const res= await axiosSecure.post('/payments',payment);
                // console.log('payment saved',res);
                if(res.data?.paymentResult?.insertedId
                    ){

                    Swal.fire("Payment Completed!");
                    navigate(`/dashboard/invoice/${transactionId}`)

                }
                refetch();


            }
       

        console.log('Payment Intent', confirmPaymentIntent);
        setError('');
        setProcessing(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="bg-green-500 px-16 py-2 rounded-lg text-white" type="submit" disabled={!stripe || !clientSecret || processing}>
                    {processing ? "Processing..." : "Pay"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
};

export default CheckOutForm;