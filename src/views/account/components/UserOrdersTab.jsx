import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import firebase from 'firebase/app'; // Import Firebase
import 'firebase/firestore'; // Import Firestore module

const UserOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe(); // Cleanup function to unsubscribe from the listener when component unmounts
    };
  }, []);

  useEffect(() => {
    // Function to fetch orders from Firestore based on the current user's ID
    const fetchOrders = async () => {
      if (currentUser) {
        const db = firebase.firestore();
        const ordersRef = db.collection('orders').where('userId', '==', currentUser?.uid);
        try {
          const snapshot = await ordersRef.get();
          const ordersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setOrders(ordersData);
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      }
    };

    // Call the fetchOrders function when the component mounts and currentUser is available
    if (currentUser) {
      fetchOrders();
    }

    // Cleanup function to unsubscribe from Firestore listener when component unmounts
    return () => {
      // Unsubscribe from Firestore listener here if needed
    };
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'yellow';
      case 'Delivered':
        return 'green';
      case 'Rejected':
        return 'red';
      default:
        return 'transparent'; // Default status
    }
  };
  

  return (
    <div className="orders">
      <h3>My Orders</h3>
      {orders.length > 0 ? (
        <div className="basket-items-container">
          {orders.map(order => (
            <div key={order.id} className="basket-item">
              <div className="basket-item-img-wrapper">
                <ImageLoader
                  alt={order.id}
                  className="basket-item-img"
                  src={order.proofOfPaymentURL}
                />
              </div>
              <div className="basket-item-details">
                <h4 className="underline basket-item-name" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.id} 
                  
                </h4>
                <h4 className="underline basket-item-name" style={{ backgroundColor: getStatusColor(order.status) }}>
                  {order.status}
                  
                </h4>
                
              </div>
              <div className="basket-item-price">
                <h4 className="my-0">{displayMoney(order.subtotal)}</h4>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='loader'>
          <strong><span className="text-subtle">You don&apos;t have any orders</span></strong>
        </div>
      )}
    </div>
  );
};

export default UserOrdersTab;
