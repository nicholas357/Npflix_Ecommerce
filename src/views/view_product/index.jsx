import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeftOutlined, LoadingOutlined } from '@ant-design/icons';
import { ColorChooser, ImageLoader, MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import { displayMoney } from '@/helpers/utils';
import { useBasket, useDocumentTitle, useProduct, useRecommendedProducts, useScrollTop } from '@/hooks';
import { Link, useParams } from 'react-router-dom';
import Select from 'react-select';
import { displayActionMessage } from '@/helpers/utils';
import { Helmet } from 'react-helmet-async';
import Rating from '@/components/rating/Rating';
import { ProductGrid } from '@/components/product';

const ViewProduct = () => {
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const { id } = useParams();
  const { product, isLoading, error } = useProduct(id);
  const { addToBasket, isItemOnBasket } = useBasket(id);
  useScrollTop();
  useDocumentTitle(`View ${product?.name || 'Item'}`);

  const [selectedImage, setSelectedImage] = useState(product?.image || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedWeight, setSelectedWeight] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const handleScrollToReviews = () => {
    if (reviewsRef.current) {
      const offset = 100; // Adjust this value as needed for extra scroll space
      const elementPosition = reviewsRef.current.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };
  const reviewsRef = useRef(null);

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useRecommendedProducts(6);
  const colorOverlay = useRef(null);

  useEffect(() => {
    setSelectedImage(product?.image || '');
    setSelectedSize('');
    setSelectedWeight('');
    setSelectedPrice(0);
    setSelectedColor('');
  }, [product]);

  useEffect(() => {
    updatePrice();
  }, [selectedSize, selectedWeight]);

  const updatePrice = () => {
    let newPrice = product?.price || 0;

    if (selectedSize && selectedWeight && product?.sizePrices) {
      const sizeData = product.sizePrices.find(sizePrice => sizePrice.size === selectedSize);
      if (sizeData) {
        const weightData = sizeData.weights.find(weight => weight.weight === selectedWeight);
        if (weightData) {
          newPrice = weightData.price;
        }
      }
    } else if (selectedSize && product?.sizePrices) {
      const sizeData = product.sizePrices.find(sizePrice => sizePrice.size === selectedSize);
      if (sizeData) {
        newPrice = sizeData.price;
      }
    }

    setSelectedPrice(newPrice);
  };

  const onSelectedSizeChange = (newValue) => {
    setSelectedSize(newValue.value);
    setSelectedWeight('');
    if (newValue.value && product?.sizePrices) {
      const sizeData = product.sizePrices.find(sizePrice => sizePrice.size === newValue.value);
      if (sizeData) {
        const weightExists = sizeData.weights.find(weight => weight.weight === selectedWeight);
        if (!weightExists) {
          setSelectedWeight('');
        }
      }
    }
  };

  const onSelectedWeightChange = (newValue) => {
    setSelectedWeight(newValue.value);
  };

  const onSelectedColorChange = (color) => {
    setSelectedColor(color);
    if (colorOverlay.current) {
      colorOverlay.current.value = color;
    }
  };

  const handleAddToBasket = () => {
    if (!selectedSize || !selectedWeight) {
      displayActionMessage("Please select plan and duration before adding to basket.");
      return;
    }

    const selectedProduct = {
      ...product,
      selectedColor,
      selectedSize,
      selectedWeight,
      selectedPrice
    };
    addToBasket(selectedProduct);
  };

  const displayMoneyWithSize = () => {
    if (selectedSize && product?.sizePrices) {
      if (selectedWeight) {
        const sizeData = product.sizePrices.find(sizePrice => sizePrice.size === selectedSize);
        if (sizeData) {
          const weightData = sizeData.weights.find(weight => weight.weight === selectedWeight);
          if (weightData) {
            return displayMoney(weightData.price) || displayMoney(product?.RoundPrice);
          }
        }
      } else {
        const sizeData = product.sizePrices.find(sizePrice => sizePrice.size === selectedSize);
        if (sizeData) {
          return displayMoney(sizeData.price) || displayMoney(product?.RoundPrice);
        }
      }
    }
    return displayMoney(product?.price) || displayMoney(product?.RoundPrice);
  };

  return (
    <main className="content">
      {product && (
        <Helmet>
          <title>{product.name} - OTTFLIX NEPAL</title>
          <meta name="description" content={product.description} />
          <meta name="keywords" content={product.keywords ? product.keywords.join(', ') : ''} />
          <meta property="og:title" content={product.name} />
          <meta property="og:description" content={product.description} />
          <meta property="og:type" content="product" />
          <meta property="og:url" content={`https://ottflix.store/product/${product.id}`} />
          <meta property="og:image" content={product.image} />
          <link rel='canonical' href={`https://ottflix.store/product/${product.id}`} />
          <meta name='robots' content='index' />
        </Helmet>
      )}
      {isLoading && (
        <div className="loader">
          <h4>Loading Product...</h4>
          <br />
          <LoadingOutlined style={{ fontSize: '3rem' }} />
        </div>
      )}
      {error && <MessageDisplay message={error} />}
      {product && !isLoading && (
        <div className="product-view">
          
          <Link to={SHOP}>
            <h3 className="button-link d-inline-flex">
              <ArrowLeftOutlined />
              &nbsp; Back to shop
            </h3>
          </Link>
          <div className="product-modal">
          
            {product.imageCollection.length !== 0 && (
              <div className="product-modal-image-collection">
                {product.imageCollection.map((image) => (
                  <div
                    className="product-modal-image-collection-wrapper"
                    key={image.id}
                    onClick={() => setSelectedImage(image.url)}
                    role="presentation"
                  >
                    <ImageLoader
                      className="product-modal-image-collection-img"
                      src={image.url}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="product-modal-image-wrapper">
              
              <ImageLoader
                alt={product.name}
                className="product-modal-image"
                src={selectedImage}
              />
            </div>
            
            <div className="product-modal-details">
            <div className="flex items-center space-x-1">
        {/* Render the star rating */}
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-10 h-10 ${star <= averageRating ? 'text-yellow-300' : 'text-gray-300'}`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 22 20"
          >
            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
          </svg>
        ))}
        <p className="ms-1 text-2xl font-bold text-gray-900 dark:text-white">
          {typeof averageRating === 'number' && !isNaN(averageRating) ? averageRating.toFixed(2) : averageRating}
        </p>
        <span className="w-1 h-1 mx-1 bg-gray-500 rounded-full dark:bg-gray-400"></span>
        <a
          
          onClick={(e) => {
            e.preventDefault(); // Prevent default anchor behavior
            handleScrollToReviews(); // Call the scroll function
            
          }}
          className="text-2xl font-medium text-gray-900 underline hover:no-underline  dark:text-white"
        >
          {reviewCount} reviews
        </a>
      </div>

      {/* Your Reviews Section */}
      <div ref={reviewsRef}>
        {/* Render your reviews here */}
      </div>

      {/* Your Reviews Section */}
      <div ref={reviewsRef}>
        {/* Render your reviews here */}
      </div>
      {/* Your Reviews Section */}
      <div ref={reviewsRef}>
        {/* Render your reviews here */}
      </div>

              <br />
              <span className="text-subtle">{product.brand}</span>
              <h1 className="margin-top-0">{product.name}</h1>
              <span>{product.description}</span>
              <br />
              <br />
              <div className="divider" />
              <br />
              <div>
                
                <span className="text-subtle">Product Size</span>
                <br />
                <br />
                <form autoComplete='off'>
                <Select
                  placeholder="--Select Size--"
                  onChange={onSelectedSizeChange}
                  options={product.sizePrices
                    .sort((a, b) => (a.size < b.size ? -1 : 1))
                    .map((sizePrice) => ({ label: sizePrice.size, value: sizePrice.size }))}
                  value={{ label: selectedSize, value: selectedSize }}
                  styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                  isSearchable={false}
                /></form>
              </div>
              
              <br />
              {selectedSize && (
                <div>
                  <span className="text-subtle">Choose Duration</span>
                  <br />
                  <br />
                  <form autoComplete="off" >
                  <Select
                    placeholder="--Select Duration--"
                    onChange={onSelectedWeightChange}
                    options={product.sizePrices
                      .find(sizePrice => sizePrice.size === selectedSize)?.weights.map(weight => ({ label: weight.weight, value: weight.weight }))}
                    value={{ label: selectedWeight, value: selectedWeight }}
                    styles={{ menu: (provided) => ({ ...provided, zIndex: 10 }) }}
                    isSearchable={false}
                  />
                  </form>
                </div>
              )}
              <br />
              <h1>{displayMoneyWithSize()}</h1>
              <div className="product-modal-action">
                <button
                  className={`button button-small ${isItemOnBasket(product.id) ? 'button-border button-border-gray' : ''}`}
                  onClick={handleAddToBasket}
                  type="button"
                >
                  {isItemOnBasket(product.id) ? 'Remove From Basket' : 'Add To Basket'}
                </button>
              </div>
            </div>
          </div>
          {/* New second Box Below */}
          <div className="additional-box">
          <div className="mt-10">
            <h2>Other Information</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <h4 className="text-2xl font-bold">{product.descriptions}</h4>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
            </div>
          </div>

          </div>

          {/* New Box Below */}
          <div className="additional-box">
            <h2>Additional Information</h2>
            {/* Add your other components here */}
            <Rating 
            productId={product.id}
            
        setAverageRating={setAverageRating} 
        setReviewCount={setReviewCount}
             />

          </div>

          <div style={{ marginTop: '10rem' }}>
            <div className="display-header">
              <h1>Recommended Products</h1>
            </div>
            <ProductGrid
              products={recommendedProducts}
              isLoading={isLoadingFeatured}
              error={errorFeatured}
              fetchProducts={fetchRecommendedProducts}
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewProduct;
