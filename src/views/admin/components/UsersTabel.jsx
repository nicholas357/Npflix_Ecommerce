/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import UsersItem from './UsersItem';


const UsersTable = ({ filteredUsers }) => (
  <div>
    {filteredUsers.length > 0 && (
      <div className="grid grid-product grid-count-6">
        <div className="grid-col">
          <h5>Avatar</h5>
        </div>
        <div className="grid-col">
          <h5>ID</h5>
        </div>
        <div className="grid-col">
          <h5>Name</h5>
        </div>
        <div className="grid-col">
          <h5>Email</h5>
        </div>
        <div className="grid-col">
          <h5>Date Added</h5>
        </div>
        <div className="grid-col">
          <h5>Role</h5>
        </div>
      </div>
    )}
    {filteredUsers.length === 0 ? (
      new Array(10).fill({}).map((user, index) => (
        <UsersItem
          key={`user-skeleton-${index}`}
          user={user} // Assuming UserItem accepts a 'user' prop
        />
      ))
    ) : (
      filteredUsers.map((user) => (
        <UsersItem
          key={user.id} // Assuming 'id' is unique for each user
          user={user} // Assuming UserItem accepts a 'user' prop
        />
      ))
    )}
  </div>
);

UsersTable.propTypes = {
  filteredUsers: PropTypes.array.isRequired,
};

export default UsersTable;
