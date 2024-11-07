import { CheckOutlined } from '@ant-design/icons';
import { ImageLoader } from '@/components/common';
import { displayMoney, displayRange } from '@/helpers/utils';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { useHistory } from 'react-router-dom';
import { displayActionMessage } from '@/helpers/utils';

const ProductItem = ({ product, isItemOnBasket, addToBasket }) => {
  const history = useHistory();
  const [error, setError] = useState('');

  const onClickItem = () => {
    if (!product) return;

    if (product.id) {
      history.push(`/product/${product.id}`);
    }
  };

  const itemOnBasket = isItemOnBasket ? isItemOnBasket(product.id) : false;

  const handleAddToBasket = () => {
    // Always set the error message without checking any conditions
    if (!product.sizes || product.sizes.length === 0 || !product.price) {
      displayActionMessage("Please select a size and ensure the price is available");
      return;
    }
    
    
    if (addToBasket) addToBasket({ ...product, selectedSize: product.sizes[0] });

    // No further action needed for adding to basket
  };

  return (
    <SkeletonTheme color="#e1e1e1" highlightColor="#f2f2f2">
      
      <div
        className={`product-card ${!product.id ? 'product-loading' : ''}`}
        style={{
          border: product && itemOnBasket ? '1px solid #a6a5a5' : '',
          boxShadow: product && itemOnBasket ? '0 10px 15px rgba(0, 0, 0, .07)' : 'none'
        }}
      >
        {itemOnBasket && <CheckOutlined className="fa fa-check product-card-check" />}
        <div
          className="product-card-content"
          onClick={onClickItem}
          role="presentation"
        >
          <div className="product-card-img-wrapper">
            {product.image ? (
              <ImageLoader
                alt={product.name}
                className="product-card-img"
                src={product.image}
              />
            ) : <Skeleton width="100%" height="90%" />}
          </div>
          <div className="product-details">
            <h5 className="product-card-name text-overflow-ellipsis margin-auto">
              {product.name || <Skeleton width={80} />}
            </h5>
            <p className="product-card-brand">
              {product.brand || <Skeleton width={60} />}
            </p>
            <h4 className="product-card-price">
              {product.price ? displayMoney(product.price) : displayRange(product.RoundPrice) || <Skeleton width={40} />}
            </h4>
          </div>
        </div>
        {product.id && (
          <div>
            <button
              className={`product-card-button button-small button button-block ${itemOnBasket ? 'button-border button-border-gray' : ''}`}
              onClick={handleAddToBasket}
              type="button"
            >
              {itemOnBasket ? 'Remove from basket' : 'Add to basket'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
      </div>
    </SkeletonTheme>
  );
};

ProductItem.defaultProps = {
  isItemOnBasket: undefined,
  addToBasket: undefined
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
  isItemOnBasket: PropTypes.func,
  addToBasket: PropTypes.func
};

export default ProductItem;
