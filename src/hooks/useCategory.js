// src/hooks/useCategory.js

import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';


const useCategory = (brand) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const productsRef = firebase.firestore().collection('products');
      const snapshot = await productsRef.where('brand', '==', brand).get();
      const productsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (err) {
      console.error("Error fetching products by category:", err);
      setError("Could not fetch products. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [brand]);

  return { products, isLoading, error, refetch: fetchProducts };
};

export default useCategory;
