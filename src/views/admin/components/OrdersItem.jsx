import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { displayActionMessage, displayDate } from '@/helpers/utils';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ImageLoader } from '@/components/common';

// Initialize Firestore
const db = firebase.firestore();

const OrdersItem = ({ order }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orderRef = useRef(null);
  const [status, setStatus] = useState(order.status || 'pending');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Fetch order details
        const orderSnapshot = await db.collection('orders').doc(order.id).get();

        if (orderSnapshot.exists) {
          const { userId } = orderSnapshot.data();

          // Fetch user details based on userId from users collection
          const userSnapshot = await db.collection('users').doc(userId).get();

          if (userSnapshot.exists) {
            const { fullname, email } = userSnapshot.data();
            setCustomerName(fullname);
            setCustomerEmail(email);
          } else {
            console.log('User details not found for orderId:', order.id);
          }
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
  }, [order.id]);

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

  const onDeleteOrder = () => {
    orderRef.current.classList.toggle('item-active');
  };

  const onCancelDelete = () => {
    orderRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`item item-orders ${!order.id && 'item-loading'}`}
        ref={orderRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {order.proofOfPaymentURL ? (
              <ImageLoader
                alt={order.userId}
                className="item-img"
                src={order.proofOfPaymentURL}
              />
            ) : <Skeleton width={50} height={30} />}
          </div>
          
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{order.id || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{customerName || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{customerEmail || <Skeleton width={50} />}</span>
          </div>
          
          <div className="grid-col">
            {order.id ? (
              <select value={status} onChange={handleChangeStatus}>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            ) : <Skeleton width={50} />}
          </div>
          <div className="grid-col">
            <span>{order.subtotal ? `NPR ${order.subtotal}` : <Skeleton width={20} />}</span>
          </div>
        </div>
        {order.id && (
          <div className="item-action">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Edit
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteOrder}
              type="button"
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this order?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
              <button
                className="button button-small button-danger"
                onClick={() => {
                  dispatch(deleteOrder(order.id)); // Replace with your delete order action
                  displayActionMessage('Order successfully deleted!', 'success');
                }}
                type="button"
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

OrdersItem.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.string,
    date: PropTypes.number,
    status: PropTypes.string,
    total: PropTypes.number,
    productImage: PropTypes.string,
    productName: PropTypes.string,
  }).isRequired,
};

export default withRouter(OrdersItem);
