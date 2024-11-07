import React, { useState } from 'react';
import { Field, useFormikContext } from 'formik';
import firebase from 'firebase/app'; // Import Firebase core
import 'firebase/firestore'; // Import Firestore
import { CustomInput, CustomMobileInput } from '@/components/formik'; // Assuming these are your custom form components
import { CustomTextarea } from '@/components/formik';

const ShippingForm = () => {
  const { values, setFieldValue } = useFormikContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const firestore = firebase.firestore(); // Access Firestore instance from initialized Firebase

  const applyPromoCode = async () => {
    try {
      // Query Firestore for the promo code document
      const promoRef = firestore.collection('promoCode').doc(promoCode);
      const promoDoc = await promoRef.get();

      if (promoDoc.exists) {
        // Retrieve discount percentage from Firestore document
        const promoData = promoDoc.data();
        const discountPercentage = promoData.per;

        // Calculate discount amount based on totalAmount from form values
        const discountAmount = (values.totalAmount * discountPercentage) / 100;

        // Update form values with the discount amount
        setPromoApplied(true);
        setPromoError('');
        setFieldValue('discount', discountAmount); // Assuming 'discount' is a field in your form
      } else {
        // Handle invalid promo code
        setPromoApplied(false);
        setPromoError('Invalid promo code');
      }
    } catch (error) {
      // Handle errors during promo code validation
      setPromoApplied(false);
      setPromoError('Error validating promo code');
    }
  };

  return (
    <div className="checkout-shipping-wrapper">
      <div className="checkout-shipping-form">
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="fullname"
              type="text"
              label="* Full Name"
              placeholder="Enter your full name"
              component={CustomInput}
              style={{ textTransform: 'capitalize' }}
            />
          </div>
          <div className="d-block checkout-field">
            <Field
              name="email"
              type="email"
              label="* Email Address"
              placeholder="Enter your email address"
              component={CustomInput}
            />
          </div>
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="address"
              type="text"
              label="* Shipping Address"
              placeholder="Enter full shipping address"
              component={CustomInput}
            />
          </div>
          <div className="d-block checkout-field">
            <CustomMobileInput name="mobile" defaultValue={values.mobile} />
          </div>
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field ">
            <Field
              name="notes"
              type="text"
              label="Add note"
              placeholder="Notes about your order, e.g. special notes for delivery"
              component={CustomTextarea}
              row={7}
            />
            <br/>
          </div>
        </div>
        <div className="checkout-fieldset">
          <Field name="isInternational">
            {({ field, form, meta }) => (
              <div className="checkout-field">
                {meta.touched && meta.error ? (
                  <span className="label-input label-error">{meta.error}</span>
                ) : (
                  <label className="label-input" htmlFor={field.name}>
                    Shipping Option
                  </label>
                )}
                <div className="checkout-checkbox-field">
                  <input
                    checked={field.value}
                    id={field.name}
                    onChange={(e) => {
                      form.setValues({ ...form.values, [field.name]: e.target.checked });
                    }}
                    value={meta.value}
                    type="checkbox"
                  />
                  <label className="d-flex w-100" htmlFor={field.name}>
                    <h5 className="d-flex-grow-1 margin-0">
                      &nbsp; Instant Shipping &nbsp;
                      <span className="text-subtle">1-2 mins</span>
                    </h5>
                    <h4 className="margin-0">NPR 100.00</h4>
                  </label>
                </div>
              </div>
            )}
          </Field>
         
        </div>
        <div className="checkout-fieldset">
          <div className="d-block checkout-field">
            <Field
              name="promoCode"
              type="text"
              label="Promo Code"
              placeholder="Enter promo code"
              component={CustomInput}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <br/>
            <button type="button" className='button button' style={{height:'40px'}} onClick={applyPromoCode}>
              Apply
            </button>
            {promoError && <span className="label-error">{promoError}</span>}
            {promoApplied && <span className="label-success">Promo code applied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingForm;
