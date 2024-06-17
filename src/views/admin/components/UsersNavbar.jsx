import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from '@/components/common';
import { ADD_PRODUCT } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const UsersNavbar = (props) => {
  const { productsCount, totalProductsCount } = props;
  const history = useHistory();
  return (
    <div className="product-admin-header">
    <h3 className="product-admin-header-title">
      Users &nbsp;
      (
      {`${productsCount} / ${totalProductsCount}`}
      )
    </h3>
    
  </div>
  )
}



export default UsersNavbar