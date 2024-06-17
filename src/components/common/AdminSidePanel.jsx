import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_PRODUCTS, ADMIN_USERS, ADMIN_ORDERS } from '@/constants/routes'; // Import route constants


const SideNavigation = () => (
  <aside className="sidenavigation bg-gray-800">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        {/* NavLink for Products */}
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu py-3 px-4 block text-gray-200 hover:bg-gray-700"
          to={ADMIN_PRODUCTS}
        >
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        {/* NavLink for Users */}
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu py-3 px-4 block text-gray-200 hover:bg-gray-700"
          to={ADMIN_USERS}
        >
          Users
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        {/* NavLink for Orders */}
        <NavLink
          activeClassName="sidenavigation-menu-active"
          className="sidenavigation-menu py-3 px-4 block text-gray-200 hover:bg-gray-700"
          to={ADMIN_ORDERS}
        >
          Orders
        </NavLink>
      </div>
    </div>
  </aside>
);

export default SideNavigation;
