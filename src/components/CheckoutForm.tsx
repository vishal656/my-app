import React, { useState, useRef } from 'react';
import { Form, useSubmit, redirect } from 'react-router-dom';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { customFetch, formatPrice } from '../utils';
import { toast } from 'react-toastify';
import { clearCart } from '../features/cart/cartSlice';

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const action =
  (store, queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();
    const { name, address, paymentId } = Object.fromEntries(formData);
    const user = store.getState().userState.user;
    const { cartItems, orderTotal, numItemsInCart } = store.getState().cartState;

    const info = {
      name,
      address,
      paymentId,
      chargeTotal: orderTotal,
      orderTotal: formatPrice(orderTotal),
      cartItems,
      numItemsInCart,
    };

    try {
      const response = await customFetch.post(
        '/orders',
        { data: info },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );
      queryClient.removeQueries(['orders']);
      store.dispatch(clearCart());
      toast.success('order placed successfully');
      return redirect('/orders');
    } catch (error) {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        toast.error('Session expired. Please login again.');
        return redirect('/login');
      }

      toast.error(
        error?.response?.data?.error?.message || 'Payment succeeded, but order creation failed.',
      );

      return null;
    }
  };

const CheckoutForm = () => {
  const submit = useSubmit();
  const formRef = useRef(null);
  const [paymentId, setPaymentId] = useState('');
  const isSubmittingRef = useRef(false);

  const displayRazorpay = async () => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      alert('Razorpay SDK failed to load');
      return;
    }

    const options = {
      key: 'rzp_test_1DP5mmOlF5G5ag',
      amount: '50000',
      currency: 'INR',
      name: 'My Store',
      description: 'Order Payment',

      handler: function (response) {
        if (isSubmittingRef.current) return;
      
        isSubmittingRef.current = true;
        setPaymentId(response.razorpay_payment_id);
        submit(formRef.current);
      },

      prefill: {
        name: 'John Doe',
        email: 'john@example.com',
        contact: '9999999999',
      },

      theme: {
        color: '#F37254',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <Form method="POST" ref={formRef} className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>

      <FormInput label="first name" name="name" type="text" />
      <FormInput label="address" name="address" type="text" />

      {/* send payment id to backend */}
      <input type="hidden" name="paymentId" value={paymentId} />

      <button type="button" onClick={displayRazorpay} className="btn btn-primary mt-4">
        Pay Now
      </button>
    </Form>
  );
};
export default CheckoutForm;
