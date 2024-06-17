import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';

import { displayActionMessage, displayDate } from '@/helpers/utils';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { ImageLoader } from '@/components/common';

const UsersItem = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userRef = useRef(null);

  const onClickEdit = () => {
    history.push(`/edit-user/${user.id}`); // Adjust route as per your application
  };

  const onDeleteUser = () => {
    userRef.current.classList.toggle('item-active');
  };

  
  const onCancelDelete = () => {
    userRef.current.classList.remove('item-active');
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      <div
        className={`item item-users ${!user.id && 'item-loading'}`}
        ref={userRef}
      >
        <div className="grid grid-count-6">
          <div className="grid-col item-img-wrapper">
            {user.avatar ? (
              <ImageLoader
                alt={user.fullname}
                className="item-img"
                src={user.avatar}
              />
            ) : <Skeleton width={50} height={30} />}
          </div>
          
          <div className="grid-col">
            <span className="text-overflow-ellipsis">{user.id || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{user.fullname || <Skeleton width={50} />}</span>
          </div>
          <div className="grid-col">
            <span>{user.email || <Skeleton width={30} />}</span>
          </div>
          <div className="grid-col">
            <span>
              {user.dateJoined ? displayDate(user.dateJoined) : <Skeleton width={30} />}
            </span>
          </div>
          <div className="grid-col">
            <span>{user.role || <Skeleton width={20} />}</span>
          </div>
        </div>
        {user.id && (
          <div className="item-action">
            <button
              className="button button-border button-small"
              onClick={onClickEdit}
              type="button"
            >
              Edit
            </button>
            &nbsp;
            <button
              className="button button-border button-small button-danger"
              onClick={onDeleteUser}
              type="button"
            >
              Delete
            </button>
            <div className="item-action-confirm">
              <h5>Are you sure you want to delete this user?</h5>
              <button
                className="button button-small button-border"
                onClick={onCancelDelete}
                type="button"
              >
                No
              </button>
              &nbsp;
             
            </div>
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

UsersItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string,
    fullname: PropTypes.string,
    email: PropTypes.string,
    role: PropTypes.string,
    dateJoined: PropTypes.number,
    additionalInfo: PropTypes.string,
    avatar: PropTypes.string,
  }).isRequired,
};

export default withRouter(UsersItem);
