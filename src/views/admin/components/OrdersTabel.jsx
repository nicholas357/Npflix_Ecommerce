/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import OrdersItem from './OrdersItem';

const OrdersTable = ({ filteredOrders }) => (
  <div>
    {filteredOrders.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col">
          <h5>Payment proof</h5>
        </div>
        <div className="grid-col">
          <h5>Orders Id</h5>
        </div>
        <div className="grid-col">
          <h5>full name</h5>
        </div>
        <div className="grid-col">
          <h5>Email</h5>
        </div>
        <div className="grid-col">
          <h5>Status</h5>
        </div>
        <div className="grid-col">
          <h5>Total</h5>
        </div>
        
      </div>
    )}
    {filteredOrders.length === 0 ? (
      new Array(10).fill({}).map((order, index) => (
        <OrdersItem
          key={`order-skeleton-${index}`}
          order={order} // Assuming OrdersItem accepts an 'order' prop
        />
      ))
    ) : (
      filteredOrders.map((order) => (
        <OrdersItem
          key={order.id} // Assuming 'id' is unique for each order
          order={order} // Assuming OrdersItem accepts an 'order' prop
        />
      ))
    )}
  </div>
);

OrdersTable.propTypes = {
  filteredOrders: PropTypes.array.isRequired,
};

export default OrdersTable;
