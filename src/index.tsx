import React from 'react';
import { render } from 'react-dom';
import Routes from 'scenes/routes';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { LocaleProvider } from 'antd';
import pt_BR from 'antd/lib/locale-provider/pt_BR';

render(
  <LocaleProvider locale={pt_BR}>
      <Routes store={store} />
  </LocaleProvider>
  ,
  document.getElementById('root') as HTMLElement
);
//registerServiceWorker();
