import React from 'react';
import { BrowserRouter, Match, Miss } from 'react-router';

import App from './App';
import StorePicker from './StorePicker';
import NotFound from './NotFound';

const repo = `/${ window.location.pathname.split('/')[1] }`;

const Root = () => {
  return (
    <BrowserRouter basename={ repo }>
      <div>
        <Match exactly pattern="/" component={ StorePicker }/>
        <Match pattern="/store/:storeId" component={ App } />
        <Miss component={ NotFound }/>
      </div>
    </BrowserRouter>
  );
}

export default Root;
