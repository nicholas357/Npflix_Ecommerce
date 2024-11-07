import { BasketToggle } from '@/components/basket';
import { HOME, SIGNIN } from '@/constants/routes';
import PropType from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserNav from '@/views/account/components/UserAvatar';
import Badge from './Badge';
import FiltersToggle from './FiltersToggle';
import SearchBar from './SearchBar';
import { ShoppingOutlined } from '@ant-design/icons';
import Menu from '@/components/Menu/Menu';

const Navigation = (props) => {
  const {
    isAuthenticating, basketLength, disabledPaths, user
  } = props;
  const { pathname } = useLocation();

  const onClickLink = (e) => {
    if (isAuthenticating) e.preventDefault();
  };

  return (
    <nav className="mobile-navigation">
     
      
      <div className="mobile-navigation-main">
        <div className="mobile-navigation-logo">
          <Link onClick={onClickLink} to={HOME}>
          <div style={{ 
              width: '150px', // Adjust the width as necessary
              height: '80px', // Maintain a consistent height
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              overflow: 'hidden', 
              marginTop: '10px',
              paddingRight: '40px'
            }}>
              <img 
                alt="Logo" 
                src="https://i.imgur.com/z2N5T9h.png" // Make sure this image is high-resolution
                style={{ 
                  height: '170px', // Set to 100% to fill the height of the container
                  width: 'auto', // Maintain aspect ratio
                  maxWidth: '400%', // Optional: Allow the logo to grow larger than its container
                  objectFit: 'contain' // Ensure it fits within the bounds without distortion
                }} 
              />
            </div>
          </Link>
        </div>
        
        <BasketToggle>
          {({ onClickToggle }) => (
            <button
              className="button-link navigation-menu-link basket-toggle"
              onClick={onClickToggle}
              disabled={disabledPaths.includes(pathname)}
              type="button"
            >

              <Badge count={basketLength}>
              <ShoppingOutlined style={{ fontSize: '2.4rem' }} />
               
              </Badge>
            </button>
          )}
        </BasketToggle>
       
        <ul className="mobile-navigation-menu">
          {user ? (
            <li className="mobile-navigation-item">
              <UserNav />
            </li>
          ) : (
            <>
              {pathname !== SIGNIN && (
                <li className="mobile-navigation-item ">
                  <Link
                    className="navigation-menu-link"
                    onClick={onClickLink}
                    to={SIGNIN}
                  >
                    Sign In
                  </Link>
                </li>
              )}
            </>
          )}
        </ul>
      </div>
      <div className="mobile-navigation-sec">
        
      <SearchBar />
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  isAuthenticating: PropType.bool.isRequired,
  basketLength: PropType.number.isRequired,
  disabledPaths: PropType.arrayOf(PropType.string).isRequired,
  user: PropType.oneOfType([
    PropType.bool,
    PropType.object
  ]).isRequired
};

export default Navigation;
