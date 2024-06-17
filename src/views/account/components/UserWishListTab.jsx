import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney } from '@/helpers/utils';
import { removeFromBasket } from '@/redux/actions/basketActions';

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();
  const onRemoveFromBasket = () => dispatch(removeFromBasket(item.id));

  return (
    <div className="basket-item">
      <div className="basket-item-img-wrapper">
        <ImageLoader
          alt={item.name}
          className="basket-item-img"
          src={item.image}
        />
      </div>
      <div className="basket-item-details">
        <Link to={`/product/${item.id}`} onClick={() => document.body.classList.remove('is-basket-open')}>
          <h4 className="underline basket-item-name">
            {item.name}
          </h4>
        </Link>
        {/* Add any additional item details here */}
      </div>
      <div className="basket-item-price">
        <h4 className="my-0">{displayMoney(item.price * item.quantity)}</h4>
      </div>
      <button
        className="basket-item-remove button button-border button-border-gray button-small"
        onClick={onRemoveFromBasket}
        type="button"
      >
        <CloseOutlined />
      </button>
    </div>
  );
};

const UserWishListTab = () => {
  const basketItems = useSelector(state => state.basket || []);

  return (
    <div className="user-wishlist" style={{minHeight: '80vh'}}>
      <h3>WishList </h3>
      {basketItems.length > 0 ? (
        <div className="basket-items-container">
          {basketItems.map(item => (
            <BasketItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className='loader' style={{minHeight: '80vh'}}>
        <h3>My Wish List</h3>
    <strong><span className="text-subtle">You don&apos;t have a wish list</span></strong></div>
      )}
    </div>
  );
};

export default UserWishListTab;
