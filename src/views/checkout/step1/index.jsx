import { ArrowRightOutlined, ShopOutlined } from '@ant-design/icons';
import { BasketItem } from '@/components/basket';
import { CHECKOUT_STEP_2 } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import { useDocumentTitle, useScrollTop } from '@/hooks';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { StepTracker } from '../components';
import withCheckout from '../hoc/withCheckout';

const OrderSummary = ({ basket }) => {
  useDocumentTitle('Check Out Step 1 | OTTFLIX');
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();

  // Calculate subtotal
  const subtotal = basket.reduce((total, product) => {
    return total + (product.selectedPrice * product.quantity);
  }, 0);

  const onClickPrevious = () => history.push('/');
  const onClickNext = () => history.push(CHECKOUT_STEP_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem
              key={product.id}
              product={product} // Pass the entire product object
            />
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button
            className="button button-muted"
            onClick={onClickPrevious}
            type="button"
          >
            <ShopOutlined />
            &nbsp;
            Continue Shopping
          </button>
          <button
            className="button"
            onClick={onClickNext}
            type="submit"
          >
            Next Step
            &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    selectedSize: PropTypes.string.isRequired,
    selectedColor: PropTypes.string.isRequired,
    selectedWeight: PropTypes.string.isRequired,
    selectedPrice: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    // Include other properties as needed
  })).isRequired,
};

export default withCheckout(OrderSummary);
