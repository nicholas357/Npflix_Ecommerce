import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../services/config';
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { withRouter } from 'react-router-dom';
import OrdersTable from '../components/OrdersTabel';
import OrdersNavbar from '../components/OrdersNavbar';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore
const db = firebase.firestore();

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = db.collection('orders');
        const snapshot = await ordersRef.get();
        const ordersData = snapshot.docs.map(async (doc) => {
          const data = doc.data();
          if (!data.status) {
            await doc.ref.update({ status: 'pending' });
            data.status = 'pending';
          }
          return { id: doc.id, ...data };
        });
        const resolvedOrdersData = await Promise.all(ordersData);
        setOrders(resolvedOrdersData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching orders: ', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchOrders();
  }, []);

  const store = {
    filteredOrders: orders, // Use orders data as filteredOrders
    orders: {
      items: orders, // Use orders data as items for orders
      total: orders.length // Total count of orders
    }
  };

  useDocumentTitle('Orders List | TOS Admin');
  useScrollTop();

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <Boundary>
      <OrdersNavbar
        ordersCount={orders.length}
        totalOrdersCount={orders.length}
      />
      <div className="order-admin-items">
        <AppliedFilters filter={null} /> {/* No filter applied for orders */}
        <OrdersTable filteredOrders={orders} /> {/* Use OrdersTable component to display orders */}
      </div>
    </Boundary>
  );
};

export default withRouter(Orders);
