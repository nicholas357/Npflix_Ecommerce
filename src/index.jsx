import { Preloader } from '@/components/common';
import 'normalize.css/normalize.css';
import React from 'react';
import { render, hydrate } from 'react-dom';
import 'react-phone-input-2/lib/style.css';
import { onAuthStateFail, onAuthStateSuccess } from '@/redux/actions/authActions';
import configureStore from '@/redux/store/store';
import '@/styles/style.scss';
import WebFont from 'webfontloader';
import App from './App';
import firebase from '@/services/firebase';


WebFont.load({
  google: {
    families: ['Tajawal']
  }
});



const { store, persistor } = configureStore();
const root = document.getElementById('app');

// Render the preloader on initial load
if (root.hasChildNodes()) {
  hydrate(<Preloader />, root);
} else {
  render(<Preloader />, root);
}

firebase.auth.onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(onAuthStateSuccess(user));
  } else {
    store.dispatch(onAuthStateFail('Failed to authenticate'));
  }
  // then render the app after checking the auth state
  if (root.hasChildNodes()) {
    hydrate(<App store={store} persistor={persistor} />, root);
  } else {
    render(<App store={store} persistor={persistor} />, root);
  }
});

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
      console.log('SW registered: ', registration);
    }).catch((registrationError) => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}
