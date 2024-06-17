import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import firebaseConfig from '../../../services/config';
import { Boundary } from '@/components/common';
import { AppliedFilters, ProductList } from '@/components/product';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectFilter } from '@/selectors/selector';
import { ProductsNavbar } from '../components';
import UsersTable from '../components/UsersTabel';
import UsersNavbar from '../components/UsersNavbar';

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Initialize Firestore
const db = firebase.firestore();

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersRef = db.collection('users');
        const snapshot = await usersRef.get();
        const usersData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUsers(usersData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching users: ', error);
        setLoading(false); // Set loading to false on error as well
      }
    };

    fetchUsers();
  }, []);

  const store = {
    filteredProducts: users, // Use users data as filteredProducts for simplicity
    products: {
      items: users, // Use users data as items for products
      total: users.length // Total count of users
    }
  };

  useDocumentTitle('Users List | TOS Admin');
  useScrollTop();

  if (loading) {
    return <p>Loading...</p>; // Show loading indicator while fetching data
  }

  return (
    <Boundary>
      <UsersNavbar
        productsCount={users.length}
        totalProductsCount={users.length}
      />
      <div className="product-admin-items">
        <ProductList {...store}>
          <AppliedFilters filter={null} /> {/* No filter applied for users */}
          <UsersTable filteredUsers={users} /> {/* Use UsersTable component to display users */}
        </ProductList>
      </div>
    </Boundary>
  );
};

export default withRouter(Users);
