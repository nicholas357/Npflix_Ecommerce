import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { CHECKOUT_STEP_1 } from '@/constants/routes';
import { StepTracker } from '../components';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { displayActionMessage } from '@/helpers/utils';
import withCheckout from '../hoc/withCheckout';
import EsewaPayment from './EsewaPayment';
import PayPalPayment from './PayPalPayment';
import Total from './Total';

const FormSchema = Yup.object().shape({
  name: Yup.string().min(4, 'Name should be at least 4 characters.').required('Name is required'),
  cardnumber: Yup.string().min(13, 'Card number should be 13-19 digits long').max(19, 'Card number should only be 13-19 digits long').required('Card number is required.'),
  expiry: Yup.date().required('Credit card expiry is required.'),
  ccv: Yup.string().min(3, 'CCV length should be 3-4 digit').max(4, 'CCV length should only be 3-4 digit').required('CCV is required.'),
  type: Yup.string().required('Please select payment mode')
});

const Payment = ({ shipping, payment, basket }) => {
  useDocumentTitle('Check Out Final Step | OTTFLIX');
  useScrollTop();
  const [file, setFile] = useState(null);

  const handleFileChange = (selectedFile) => {
    setFile(selectedFile);
  };

  // Calculate subtotal based on basket items
  const subtotal = basket.reduce((total, product) => {
    return total + (product.selectedPrice * product.quantity);
  }, 0);

  const initFormikValues = {
    name: payment.name || '',
    cardnumber: payment.cardnumber || '',
    expiry: payment.expiry || '',
    ccv: payment.ccv || '',
    type: payment.type || 'paypal'
  };

  const onConfirm = () => {
    displayActionMessage('Feature not ready yet :)', 'info');
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }

  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        onSubmit={onConfirm}
      >
        {({ values, errors, touched }) => (
          <Form className="checkout-step-3">
            <EsewaPayment onFileChange={handleFileChange} />
           
            <Total
              isInternational={shipping.isInternational}
              subtotal={subtotal}
              shipping={shipping}
              file={file}
              basket={basket} // Pass basket to Total component for product names
            />
            {errors.type && touched.type && (
              <div className="error-message">{errors.type}</div>
            )}
            {/* Add more error message display logic for other fields if needed */}
          </Form>
        )}
      </Formik>
    </div>
  );
};

Payment.propTypes = {
  shipping: PropTypes.shape({
    isDone: PropTypes.bool,
    isInternational: PropTypes.bool
  }).isRequired,
  payment: PropTypes.shape({
    name: PropTypes.string,
    cardnumber: PropTypes.string,
    expiry: PropTypes.string,
    ccv: PropTypes.string,
    type: PropTypes.string
  }).isRequired,
  basket: PropTypes.arrayOf(PropTypes.shape({
    selectedPrice: PropTypes.number,
    quantity: PropTypes.number
    // Add more product props as needed
  })).isRequired
};

export default withCheckout(Payment);
