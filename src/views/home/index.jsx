import { ArrowRightOutlined } from '@ant-design/icons';
import { MessageDisplay } from '@/components/common';
import { ProductShowcaseGrid } from '@/components/product';
import { FEATURED_PRODUCTS, RECOMMENDED_PRODUCTS, SHOP } from '@/constants/routes';
import {
  useDocumentTitle, useFeaturedProducts, useRecommendedProducts, useScrollTop
} from '@/hooks';
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Cat from '@/components/common/Category/Cat';
import { ProductGrid } from '@/components/product';
import Bottomnav from '@/components/common/Bottomnav';

const images = [
  "https://i.imgur.com/73bLbbH.png",
  "https://i.imgur.com/l4wA3pJ.png",
  "https://i.imgur.com/BeBPn2i.png",
  "https://i.imgur.com/7k8nqxD.png",
  "https://i.imgur.com/OEg2I5o.jpeg",
  "https://i.imgur.com/IDICYfe.png",
  "https://i.imgur.com/Yq6JUjA.png",
];

const Home = () => {
  useDocumentTitle('OTTFLIX | Home');
  useScrollTop();

  const {
    featuredProducts,
    fetchFeaturedProducts,
    isLoading: isLoadingFeatured,
    error: errorFeatured
  } = useFeaturedProducts(6);

  const {
    recommendedProducts,
    fetchRecommendedProducts,
    isLoading: isLoadingRecommended,
    error: errorRecommended
  } = useRecommendedProducts(6);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  // Automatically slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  // Memoized current image to avoid re-renders
  const currentImage = useMemo(() => images[currentIndex], [currentIndex]);

  return (
    <>
      <style>
        {`
          .banner {
            position: relative;
            overflow: hidden;
            width: 100%;
            height: 400px;
            cursor: pointer;
            will-change: transform;
          }

          .banner-images {
            display: flex;
            transition: transform 1.5s ease;
            width: 100%;
            height: 100%;
            transform: translateX(-${currentIndex * 100}%);
          }

          .banner img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 8px;
            flex: 0 0 auto;
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
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            width: 40px;
            padding: 10px;
            color: black;
            z-index: 1;
            transition: background-color 0.8s, color 1s;
          }

          .buttonss:hover {
            background-color: white;
            color: black;
            outline: none;
            box-shadow: none;
            border: none;
          }

          @media (max-width: 768px) {
            .banner {
              height: 350px;
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
            <div className="buttonss-container">
              <button className="buttonss" onClick={prevSlide}>&lt;</button>
              <button className="buttonss" onClick={nextSlide}>&gt;</button>
            </div>
          </div>
          <h1 className="absolute items-center content-center flex">Shop by Category</h1>
          <Cat />

          <div className="display-header">
            <h1>All Products</h1>
            <Link to={SHOP}>See All</Link>
          </div>
          {(errorFeatured && !isLoadingFeatured) ? (
            <MessageDisplay
              message={errorFeatured}
              action={fetchFeaturedProducts}
              buttonLabel="Try Again"
            />
          ) : (
            <ProductGrid
              products={featuredProducts}
              skeletonCount={6}
            />
          )}
        </div>
        
      </main>
    </>
  );
};

export default Home;
