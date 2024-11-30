/*
import './css/account.css'; 
import './css/css.css'; 
import './css/e1.css'; 
import './css/global.css'; 
import './css/map.css'; 
import './css/signin.css'; 
import './css/user.css'; 
*/
import './css/global.css'
import './css/map.css'

import React, {useEffect} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import  Link from 'next/link';
import DirectoryProvider from '../src/context/DirectoryProvider';
import Script from 'next/script';

function MyApp({ Component, pageProps }) {

  return (
    <DirectoryProvider>
        <Component {...pageProps} />
        <Script type="text/javascript" src="./src/listeners.js"></Script>
        <Script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
          strategy="afterInteractive" // Ensures it loads after page interaction
        />
    </DirectoryProvider>
  );
}

export default MyApp;