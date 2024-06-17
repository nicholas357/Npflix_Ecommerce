import { FilterOutlined, PlusOutlined } from '@ant-design/icons';
import { FiltersToggle, SearchBar } from '@/components/common';

import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';

const OrdersNavbar = (props) => {
  const { ordersCount, totalOrdersCount } = props;
  const history = useHistory();
  return (
    <div className="order-admin-header">
      <h3 className="order-admin-header-title">
        Orders &nbsp;
        (
        {`${ordersCount} / ${totalOrdersCount}`}
        )
      </h3>
      
    </div>
  );
};

OrdersNavbar.propTypes = {
  ordersCount: PropTypes.number.isRequired,
  totalOrdersCount: PropTypes.number.isRequired,
};

export default OrdersNavbar;
