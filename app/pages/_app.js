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

import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import  Link from 'next/link';
import DirectoryProvider from '../src/context/DirectoryProvider';

function MyApp({ Component, pageProps }) {
  return (
    <DirectoryProvider>
        <Component {...pageProps} />
    </DirectoryProvider>
  );
}

export default MyApp;