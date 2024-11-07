import { useDidMount } from '@/hooks';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, withRouter } from 'react-router-dom';
import { applyFilter, resetFilter } from '@/redux/actions/filterActions';

const Filters = ({ closeModal }) => {
  const { filter, isLoading, products } = useSelector((state) => ({
    filter: state.filter,
    isLoading: state.app.loading,
    products: state.products.items,
  }));
  const [field, setFilter] = useState({
    brand: filter.brand,
    sortBy: filter.sortBy,
  });
  const dispatch = useDispatch();
  const history = useHistory();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount && window.screen.width <= 480) {
      history.push('/');
    }

    if (didMount) {
      setFilter(filter);
      window.scrollTo(0, 0);
    }
  }, [filter, didMount, history]);

  const onBrandFilterChange = (e) => {
    const val = e.target.value;
    setFilter({ ...field, brand: val });
  };

  const onSortFilterChange = (e) => {
    setFilter({ ...field, sortBy: e.target.value });
  };

  const onApplyFilter = () => {
    const isChanged = Object.keys(field).some((key) => field[key] !== filter[key]);

    if (isChanged) {
      dispatch(applyFilter(field));
    } else {
      closeModal();
    }
  };

  const onResetFilter = () => {
    const filterFields = ['brand', 'sortBy'];

    if (filterFields.some((key) => !!filter[key])) {
      dispatch(resetFilter());
    } else {
      closeModal();
    }
  };

  return (
    <div className="filters">
      <div className="filters-field">
        <span>Brand</span>
        <br />
        <br />
        {products.length === 0 && isLoading ? (
          <h5 className="text-subtle">Loading Filter</h5>
        ) : (
          <select
            className="filters-brand"
            value={field.brand}
            disabled={isLoading || products.length === 0}
            onChange={onBrandFilterChange}
          >
            <option value="">All Brands</option>
            <option value="netflix">Netflix</option>
            <option value="spotify">Spotify</option>
            <option value="giftcards">GiftCards</option>
            <option value="topups">TopUps</option>
            <option value="softwares">Softwares</option>
            <option value="subscriptions">Subscriptions</option>
            <option value="Others">Others</option>
          </select>
        )}
      </div>
      <div className="filters-field">
        <span>Sort By</span>
        <br />
        <br />
        <select
          className="filters-sort-by d-block"
          value={field.sortBy}
          disabled={isLoading || products.length === 0}
          onChange={onSortFilterChange}
        >
          <option value="">None</option>
          <option value="name-asc">Name Ascending A - Z</option>
          <option value="name-desc">Name Descending Z - A</option>
          <option value="price-desc">Price High - Low</option>
          <option value="price-asc">Price Low - High</option>
        </select>
      </div>
      <div className="filters-action">
        <button
          className="filters-button button button-small"
          disabled={isLoading || products.length === 0}
          onClick={onApplyFilter}
          type="button"
        >
          Apply filters
        </button>
        <button
          className="filters-button button button-border button-small"
          disabled={isLoading || products.length === 0}
          onClick={onResetFilter}
          type="button"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

Filters.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default withRouter(Filters);
