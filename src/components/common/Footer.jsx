import React from 'react';
import { useLocation } from 'react-router-dom';
import * as Route from '@/constants/routes';
import { WhatsAppOutlined, InstagramOutlined, FacebookOutlined } from '@ant-design/icons';
import logo from '@/images/logo-full.svg'; // Your logo path

const Footer = () => {
  const { pathname } = useLocation();

  const visibleOnlyPath = [
    Route.HOME,
    Route.SHOP,
  ];

  if (!visibleOnlyPath.includes(pathname)) return null;

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        {/* Quick Links */}
       
        <div style={{ flex: '1 1 25%', padding: '10px' }}>
          <h4 style={sectionHeaderStyle}>Quick Links</h4>
          <nav style={navStyle}>
            <a href={Route.HOME} style={linkStyle}>Home</a>
            <a href={Route.SHOP} style={linkStyle}>Shop</a>
          </nav>
        </div>

        {/* Customer Service */}
        <div style={{ flex: '1 1 25%', padding: '10px' }}>
          <h4 style={sectionHeaderStyle}>Legal</h4>
          <nav style={navStyle}>
            <a href="/privacy-policy" style={linkStyle}>Privacy Policy</a>
            <a href="/terms&conditions" style={linkStyle}>Terms & Conditions</a>
          </nav>
        </div>

        {/* Follow Us Section */}
        <div style={{ flex: '1 1 25%', padding: '10px', textAlign: 'center' }}>
          <h4 style={sectionHeaderStyle}>Contact Us:</h4>
          <div style={socialIconsStyle}>
            {/*<a href="https://wa.me/meroflix" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
              <WhatsAppOutlined style={iconStyle} />
            </a>*/}
            <a href="https://www.facebook.com/profile.php?id=100077513565718" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
              <InstagramOutlined style={iconStyle} />
            </a>
            <a href="https://facebook.com/ottflix.nepal" target="_blank" rel="noopener noreferrer" style={iconLinkStyle}>
             
              <FacebookOutlined style={iconStyle}/>
            </a>
          </div>
         
        </div>

        {/* Logo Section */}
        <div style={{ 
  width: '200px', 
  height: '80px', 
  position: 'relative', 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center', 
  overflow: 'hidden', 
  marginBottom: '10px' // Adjust as needed to prevent overflow
}}>
  <img 
    alt="Logo" 
    src="https://i.imgur.com/z2N5T9h.png" 
    style={{ 
      transform: 'scale(3)',  // Scale the image
      transformOrigin: 'center center', // Center the scale
      width: '100%', 
      height: '100%', 
      objectFit: 'contain'
    }} 
  />
</div>
      </div>

      {/*  <p style={{ margin: '0', marginTop: '5px' }}>
          Developed by <a href="https://github.com/developername" target="_blank" rel="noopener noreferrer" style={developerLinkStyle}>Developer Name</a>
        </p> */}
      <div style={footerBottomStyle}>
        <p style={{ margin: '0' }}>© 2024 OTTFlix. All rights reserved.</p>
        <p style={{ margin: '0', marginTop: '2px' }}>
        Email: <a href='mailto:ottflixnepal@gmail.com' className='underline'>ottflixnepal@gmail.com</a>
        </p>
        <p style={{ margin: '0', marginTop: '2px' }}>Kathmandu, Nepal</p>
      </div>
    </footer>
  );
};

const footerStyle = {
  padding: '40px 20px',
  backgroundColor: '#f8f8f8',
  borderTop: '1px solid #e7e7e7',
  width: '100%',
  boxSizing: 'border-box',
  fontFamily: 'Arial, sans-serif',
  fontSize: '14px',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  flexWrap: 'wrap',
};

const sectionHeaderStyle = {
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '10px',
};

const navStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '5px',
};

const linkStyle = {
  textDecoration: 'underline',
  color: '#333',
  lineHeight: '1.6',
  transition: 'transform 0.2s ease, color 0.3s ease',
};

const socialIconsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '15px',
  marginBottom: '20px',
};

const paymentIconsStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '10px',
};

const iconStyle = {
  fontSize: '24px',
  color: '#333',
  transition: 'color 0.3s ease',
};

const iconLinkStyle = {
  textDecoration: 'none',
};

const paymentIconStyle = {
  width: '30%',
  height: '30%',
  alignItems: 'center',
  justifyContent: 'center',
};

const footerBottomStyle = {
  borderTop: '1px solid #e7e7e7',
  paddingTop: '30px',
  textAlign: 'center',
  color: '#777',

};

const developerLinkStyle = {
  textDecoration: 'underline',
  color: '#0073e6',
  fontWeight: 'bold',
};

const logoContainerStyle = {
  width: '100%',
  textAlign: 'center',
  marginTop: '20px',
};

const logoStyle = {
  width: '150px',
  height: 'auto',
};

// Add hover effect dynamically
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.textDecoration = 'underline';
      link.style.transform = 'scale(1.05)';
    });
    link.addEventListener('mouseleave', () => {
      link.style.textDecoration = 'none';
      link.style.transform = 'scale(1)';
    });
  });
});

export default Footer;
