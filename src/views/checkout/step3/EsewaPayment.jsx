// EsewaPayment.jsx

import React, { useEffect, useRef } from 'react';
import { useFormikContext } from 'formik';
import Esewa_Payment from '@/images/payment.jpg'

const EsewaPayment = ({ onFileChange }) => {
  const { values, setValues } = useFormikContext();
  const collapseContainerRef = useRef(null);
  const containerRef = useRef(null);
  const checkboxContainerRef = useRef(null);

  const toggleCollapse = () => {
    const cn = containerRef.current;
    const cb = checkboxContainerRef.current;
    const cl = collapseContainerRef.current;

    if (cb && cn && cl) {
      if (values.type === 'credit') {
        cn.style.height = `${cb.offsetHeight + cl.offsetHeight}px`;
      } else {
        cn.style.height = `${cb.offsetHeight}px`;
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (onFileChange) {
      onFileChange(selectedFile);
    }
  };

  useEffect(() => {
    toggleCollapse();
  }, [values.type]);

  const onCreditModeChange = (e) => {
    if (e.target.checked) {
      setValues({ ...values, type: 'credit' });
      toggleCollapse();
    }
  };
  

  return (
    <>
      <h3 className="text-center">Payment</h3>
      <br />
      <span className="d-block padding-s">Payment Option</span>
      <div
        ref={containerRef}
        className={`checkout-fieldset-collapse ${values.type === 'credit' ? 'is-selected-payment' : ''}`}
      >
        {/* ---- CHECKBOX TOGGLER ------ */}
        <div className="checkout-field margin-0">
          <div className="checkout-checkbox-field" ref={checkboxContainerRef}>
            <input
              checked={values.type === 'credit'}
              id="modeCredit"
              name="type"
              onChange={onCreditModeChange}
              type="radio"
            />
            <label
              className="d-flex w-100"
              htmlFor="modeCredit"
            >
              <div className="d-flex-grow-1 margin-left-s">
                <h4 className="margin-0">Esewa</h4>
                <span className="text-subtle d-block margin-top-s">
                  Pay easily, fast, and securely with Esewa and Internet banking.
                </span>
              </div>
              <div className="d-flex">
                <div className="payment-img payment-img-esewa" style={{ width: '45px', height: '45px', overflow: 'hidden' }}>
                  {/* Logos */}
                  <img
                    src="https://e7.pngegg.com/pngimages/261/608/png-clipart-esewa-zone-office-bayalbas-google-play-iphone-iphone-electronics-text-thumbnail.png"
                    alt="eSewa"
                    style={{ width: '100%', height: 'auto' }}
                  />
                </div>
              </div>
            </label>
          </div>
        </div>
        <div className="checkout-collapse-sub" ref={collapseContainerRef}>
          {/* QR Code Field */}
          <div className="checkout-field margin-0">
            <span className="d-block padding-s text-center">Upload Proof of Payment</span>
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <span className="text-subtle d-block margin-top-s">Upload an image as proof of payment.</span>
          </div>
          <br />
          {/* Upload Image Field */}
          <div className="checkout-field margin-0">
            <span className="d-block padding-s text-center">QR Code</span>
            <img
              src={Esewa_Payment} // Replace with actual QR code image URL
              alt="QR Code"
              style={{
                width: '200px',
                height: 'auto',
                margin: 'auto', // Centers horizontally
                display: 'flex',
                alignItems: 'center', // Centers vertically
              }}
            />
            <span className="text-subtle d-block margin-top-s">Use this QR code for payment.</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default EsewaPayment;
