import React, { useEffect, useState } from 'react';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Modal from '@/components/Modals/Modals';
import useModal from '@/hooks/useModal';

const UserOrdersTab = () => {
  const [orders, setOrders] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
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

    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Delivered':
        return 'bg-green-200 text-green-800';
      case 'Rejected':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  const handleViewMore = (order) => {
    setSelectedOrder(order);
    onOpenModal();
  };

  return (
    <div className="orders">
      <h3 className="text-2xl font-semibold mb-6">My Orders</h3>
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="basket-item flex w-full border border-gray-300 rounded-lg shadow-md p-4">
              <div className="basket-item-img-wrapper w-1/4">
                <ImageLoader
                  alt={order.id}
                  className="basket-item-img object-cover h-32 w-full rounded-lg"
                  src={order.proofOfPaymentURL}
                />
              </div>
              <div className="basket-item-details flex-grow px-4">
                <h4 className={`underline text-lg font-medium ${getStatusColor(order.status)}`}>
                  {order.id}
                </h4>
                <h4 className={`underline text-lg font-medium mt-1 ${getStatusColor(order.status)}`}>
                  {order.status}
                </h4>
                <div className="basket-item-price mt-2">
                  <h4 className="text-xl font-semibold">{displayMoney(order.subtotal)}</h4>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  className="button button-small rounded-xl bg-blue-500 text-white px-4 py-2"
                  onClick={() => handleViewMore(order)}
                >
                  View More
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className='loader'>
          <strong><span className="text-subtle">You don&apos;t have any orders</span></strong>
        </div>
      )}

      {/* Modal for Order Details */}
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
        className={`max-w-3xl mx-auto p-8 rounded-lg shadow-lg transition-all duration-300 ease-in-out ${
          selectedOrder ? getStatusColor(selectedOrder.status) : 'bg-white'
        }`}
      >
        {selectedOrder && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-medium"><strong>Order ID:</strong></p>
                <p className="text-gray-700">{selectedOrder.id}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium"><strong>Status:</strong></p>
                <p className={`font-semibold ${getStatusColor(selectedOrder.status)} rounded-lg p-1`}>{selectedOrder.status}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium"><strong>Subtotal:</strong></p>
                <p className="text-lg font-semibold">{displayMoney(selectedOrder.subtotal)}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium"><strong>Payment Method:</strong></p>
                <p className="text-gray-700">{selectedOrder.paymentMethod || 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium"><strong>Order Date:</strong></p>
                <p className="text-gray-700">{new Date(selectedOrder.createdAt?.toDate()).toLocaleDateString() || 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium"><strong>Proof of Payment:</strong></p>
                <div className='basket-item-img-wrapper'>
                  <ImageLoader
                    alt="no image found!"
                    className="basket-item-img object-cover h-20 w-20 rounded-lg"
                    src={selectedOrder.proofOfPaymentURL}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                className="button bg-red-500 text-white rounded-xl px-4 py-2 hover:bg-red-600 transition duration-150 ease-in-out"
                onClick={onCloseModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserOrdersTab;
