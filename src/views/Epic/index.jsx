import React, { useEffect, useState } from 'react';
import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import useCategory from '../../hooks/useCategory';
import Cat from '@/components/common/Category/Cat';
import { ProductGrid } from '@/components/product';
import { useDocumentTitle, useRecommendedProducts, useScrollTop } from '@/hooks';

const images = [
  "https://i.imgur.com/IDICYfe.png",

];


const Index = () => {
  useDocumentTitle('OTTFLIX | Gift Cards');
  useScrollTop();
  // Use the useCategory hook to fetch products for Netflix
  const { products, isLoading, error, refetch } = useCategory("giftcards");

  const [currentIndex, setCurrentIndex] = useState(0);
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  const {
    recommendedProducts,
    fetchRecommendedProducts,
    
  } = useRecommendedProducts();

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <style>
        {`
          .banner {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 400px; /* Fixed height for the banner */
            cursor: pointer;
          }

          .banner-images {
            display: flex;
            transition: transform 1.5s ease; /* Change the transition duration here */
            width: 100%;
            height: 100%;
            transform: translateX(-${currentIndex * 100}%);
          }

          .banner img {
            width: 100%; /* Ensure full width */
            height: 100%; /* Ensure full height to match the banner */
            object-fit: cover; /* Cover to fill the banner space without stretching */
            border-radius: 8px;
            flex: 0 0 auto; /* Prevent images from shrinking */
          }

          .buttonss-container {
            position: absolute;
            top: 50%;
            width: 100%;
            outline: none;
            display: flex;
            justify-content: space-between;
            transform: translateY(-50%);
          }

          .buttonss {
            background-color: rgba(255, 255, 255, 0.5); /* Default background color */
            border: none;
            cursor: pointer;
            width: 40px;
            padding: 10px;
            color: black; /* Arrow color when not hovered */
            z-index: 1; /* Ensure buttons are above the images */
            transition: background-color 0.8s, color 1s; /* Smooth transition for background and color */
          }

          .buttonss:hover {
            background-color: white; /* Change background to white on hover */
            color: black; /* Arrow color to black on hover */
            outline: none; /* Remove outline when hovering */
            box-shadow: none; /* Remove any box-shadow if applicable */
            border: none;
          }

          /* Loading Spinner */
          .spinner {
            border: 8px solid #f3f3f3; /* Light grey */
            border-top: 8px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 0 auto; /* Center the spinner */
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          /* Increase image size on mobile */
          @media (max-width: 768px) {
            .banner {
              height: 350px; /* Adjust height for mobile if needed */
            }
          }
        `}
      </style>
      <main className="content">
        <div className="home">
          <div className="banner">
            <div className="banner-images">
              {images.map((img, index) => (
                <img key={index} src={img} alt={`Slide ${index + 1}`} />
              ))}
            </div>
          </div>
          <div className="display-header">
            <h1>All Gift Cards</h1>
          </div>
          {isLoading ? (
           <ProductGrid
           products={products}
           skeletonCount={10}
           
         />
          ) : error ? (
            <MessageDisplay
              message={error}
              action={refetch}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductGrid
              products={products}
              skeletonCount={10}
              
            />
          )}
        </div>
      </main>
      <main className='content'>
      <div className='home'>
        <h1  className='h-10 w-19'>Recommended Products</h1>
        <div className="display">
          <div className="product-display-grid">
            {(error && !isLoading) ? (
              <MessageDisplay
                message={error}
                action={fetchRecommendedProducts}
                buttonLabel="Try Again"
              />
            ) : (
              <ProductGrid
                products={recommendedProducts}
                skeletonCount={6}
              />
            )}
          </div>
        </div>
      </div>
      </main>
    </>
  );
}

export default Index;
