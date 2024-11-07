import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { displayActionMessage, displayDate } from '@/helpers/utils';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ImageLoader } from '@/components/common';
import Modal from '@/components/Modals/Modals';
import useModal from '@/hooks/useModal';
import { boolean } from 'yup/lib/locale';

// Initialize Firestore
const db = firebase.firestore();

const OrdersItem = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderRef = useRef(null);
  const [status, setStatus] = useState(order.status || 'pending');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [shippingDetails, setShippingDetails] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [allProducts, setAllProducts] = useState([]); // To store product details
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  const handleViewMore = () => {
    onOpenModal();
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const orderSnapshot = await db.collection('orders').doc(order.id).get();

        if (orderSnapshot.exists) {
          const orderData = orderSnapshot.data();
          const { userId, productNames, products, shippingDetails, mobile, isInternational, isDone } = orderData;

          // Fetch user details
          const userSnapshot = await db.collection('users').doc(userId).get();
          if (userSnapshot.exists) {
            const { fullname, email } = userSnapshot.data();
            setCustomerName(fullname);
            setCustomerEmail(email);
          }

          // Fetch product details
          const productDetails = await Promise.all(products.map(async (productId) => {
            const productSnapshot = await db.collection('products').doc(productId).get();
            if (productSnapshot.exists) {
              const productData = productSnapshot.data();
              return {
                name: productData.name,
                size: productData.productSize || 'N/A',
                weight: productData.productWeight || 'N/A',
                quantity: productData.productQuantity || 'N/A',
              };
            }
            return null; // If product not found
          }));

          setAllProducts(productDetails.filter(product => product));

          // Set shipping details and phone number
          setShippingDetails(shippingDetails);
          setPhoneNumber(mobile.value || ''); // Assuming mobile is an object with a 'value' field
        } else {
          console.log('Order details not found');
        }
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    if (order.id) {
      fetchOrderDetails();
    }

    return () => {
      // Cleanup to prevent memory leaks
      setAllProducts([]);
      setShippingDetails({});
      setPhoneNumber('');
    };
  }, [order.id]);
  console.log(order.shippingDetails.isInternational)

  const handleChangeStatus = async (event) => {
    const newStatus = event.target.value;
    setStatus(newStatus);

    try {
      await db.collection('orders').doc(order.id).update({ status: newStatus });
      displayActionMessage('Order status updated successfully', 'success');
    } catch (error) {
      console.error('Error updating order status: ', error);
      displayActionMessage('Failed to update order status', 'error');
    }
  };

  const onClickEdit = () => {
    history.push(`/edit-order/${order.id}`); // Adjust route as per your application
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div className={`item item-orders ${!order.id && 'item-loading'}`} ref={orderRef}>
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {order.proofOfPaymentURL ? (
              <ImageLoader alt={order.userId} className="item-img" src={order.proofOfPaymentURL} />
            ) : (
              <Skeleton width={50} height={30} />
            )}
          </div>

          <div className="grid-col">
            <span className="text-overflow-ellipsis">{allProducts.map(product => product.name).join(', ') || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{customerName || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{customerEmail || <Skeleton width={50} />}</span>
          </div>

          <div className="grid-col">
            {order.id ? (
              <select value={status} onChange={handleChangeStatus} className="p-2 border rounded-lg">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : (
              <Skeleton width={50} />
            )}
          </div>
          <div className="grid-col">
            <span>{order.subtotal ? `NPR ${order.subtotal}` : <Skeleton width={20} />}</span>
          </div>
        </div>
        {order.id && (
          <div className="item-action">
            <button className="button button-border button-small" onClick={handleViewMore} type="button">
              View More
            </button>

            <Modal
              isOpen={isOpenModal}
              onRequestClose={onCloseModal}
              className="max-w-3xl mx-auto p-6 border-2 border-gray-300 bg-white rounded-lg shadow-lg transition-all duration-300 ease-in-out"
            >
              <div className="p-4">
                <h2 className="text-2xl font-semibold mb-4 border-b-2 border-gray-300 pb-2">Order Summary</h2>
                <div className="border rounded-lg p-4 border-gray-300 bg-gray-50">
                  <div className="space-y-4">
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Order ID:</strong></p>
                      <p className="text-gray-700">{order.id}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Product Name:</strong></p>
                      <p className="text-gray-700">{order.productNames}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Product Plan:</strong></p>
                      <p className="text-gray-700">{order.productSize}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Product Duration:</strong></p>
                      <p className="text-gray-700">{order.productWeight}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Status:</strong></p>
                      <select 
                        value={status} 
                        onChange={handleChangeStatus} 
                        className="p-1 border rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Subtotal:</strong></p>
                      <p className="text-lg font-semibold">{order.subtotal ? `NPR ${order.subtotal}` : 'N/A'}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Payment Method:</strong></p>
                      <p className="text-gray-700">QR</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Express delivery:</strong></p>
                      <p className="text-gray-700">{order.shippingDetails.isInternational.toString()}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Notes:</strong></p>
                      <p className="text-gray-700">{order.shippingDetails.notes}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Shipping Address:</strong></p>
                      <p className="text-gray-700">{order.shippingDetails.address || 'N/A'}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Email:</strong></p>
                      <p className="text-gray-700">{order.shippingDetails.email|| 'N/A'}</p>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-2">
                      <p className="font-medium"><strong>Phone:</strong></p>
                      <p className="text-gray-700">{order.shippingDetails.mobile.value || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    className="button bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600 transition duration-150 ease-in-out"
                    onClick={onCloseModal}
                  >
                    Close
                  </button>
                </div>
              </div>
            </Modal>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

OrdersItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string.isRequired,
    productNames: PropTypes.string,
    subtotal: PropTypes.number,
    status: PropTypes.string,
    proofOfPaymentURL: PropTypes.string,
    isInternational: PropTypes.bool.isRequired,
    shippingDetails: PropTypes.shape({
      address: PropTypes.string,
      notes: PropTypes.string,
    }),
    userId: PropTypes.string,
  }).isRequired,
};

export default OrdersItem;
