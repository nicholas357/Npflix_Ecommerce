import React, { useState, useEffect } from 'react';
import { ArrowLeftOutlined, CheckOutlined } from '@ant-design/icons';
import { CHECKOUT_STEP_2, CHECKOUT_STEP_3, HOME } from '@/constants/routes';
import { useFormikContext } from 'formik';
import { displayMoney, displayActionMessage } from '@/helpers/utils';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { createOrder } from '../../../services/firebase';
import { setShippingDetails } from '@/redux/actions/checkoutActions';
import { useDispatch } from 'react-redux';
import firebase from 'firebase/app';
import 'firebase/auth';
import { LoadingOutlined } from '@ant-design/icons';
import 'firebase/storage';

const Total = ({ isInternational, subtotal, shipping, file }) => {
  const { submitForm } = useFormikContext();
  const history = useHistory();
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from the listener when component unmounts
    };
  }, []);

  const uploadFileToFirebase = async (file) => {
    const storageRef = firebase.storage().ref();
    const fileName = `${Date.now()}_${file.name}`;
    const fileRef = storageRef.child(fileName);
    await fileRef.put(file);
    return fileRef.getDownloadURL();
  };

  useEffect(() => {
    return () => {
      // Cleanup function to cancel any ongoing asynchronous tasks or subscriptions
    };
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  const onClickBack = () => {
    history.push(CHECKOUT_STEP_2);
  };

  const onSubmitForm = async () => {
    if (
      shipping &&
      shipping.fullname &&
      shipping.email &&
      shipping.address &&
      shipping.mobile &&
      shipping.fullname.trim() !== '' &&
      shipping.email.trim() !== '' &&
      currentUser // Check if user is authenticated
    ) {
      setLoading(true); // Set loading to true while submitting
  
      // Create a new order object
      const orderData = {
        subtotal: subtotal + (isInternational ? 100 : 0),
        shippingDetails: shipping,
        createdAt: new Date(), // Add timestamp for createdAt field
        userId: currentUser.uid, // Add user ID
        proofOfPaymentURL: null // Initialize to null; will be updated with the file URL if uploaded
      };
  
      try {
        // Upload the file to Firebase (if exists)
        if (file) {
          const fileURL = await uploadFileToFirebase(file);
          orderData.proofOfPaymentURL = fileURL; // Add file URL to order data
        }
  
        // Call the createOrder function to add the order to Firestore
        const orderId = await createOrder(orderData);
        console.log('Order created with ID:', orderId);
        // Dispatch action to set shipping details as done
        dispatch(setShippingDetails({ ...shipping, isDone: true }));
        // Redirect to home page after placing the order
        history.push(HOME);
        // Display success message
        displayActionMessage('Order placed successfully!', 'success');
      } catch (error) {
        console.error('Error creating order:', error);
        // Display error message if order placement fails
        displayActionMessage('Failed to place order. Please try again later.', 'error');
      } finally {
        setLoading(false); // Reset loading state
      }
    } else {
      // Handle case where shippingDetails fields are missing or user is not authenticated
      console.error('Shipping details are incomplete, invalid, or user is not authenticated.');
    }
  };
  
  return (
    <>
      <div className="basket-total text-right">
        <p className="basket-total-title">Total:</p>
        <h2 className="basket-total-amount">
          {displayMoney(subtotal + (isInternational ? 100 : 0))}
        </h2>
      </div>
      <br />
      <div className="checkout-shipping-action">
        <button
          className="button button-muted"
          onClick={onClickBack}
          type="button"
        >
          <ArrowLeftOutlined />
          &nbsp;
          Go Back
        </button>
        <button
          className="button"
          disabled={loading} // Disable the button when loading
          onClick={onSubmitForm}
          type="button"
        >
          {loading ? (
            <>
              <LoadingOutlined />
              &nbsp;
              Placing the order
            </>
          ) : (
            <>
              <CheckOutlined />
              &nbsp;
              Confirm
            </>
          )}
        </button>
      </div>
    </>
  );
};

Total.propTypes = {
  isInternational: PropTypes.bool.isRequired,
  subtotal: PropTypes.number.isRequired,
  shipping: PropTypes.object.isRequired
};

export default Total;
