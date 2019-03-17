import React from 'react';
import { render } from 'react-dom';
import Routes from 'scenes/routes';
import './index.css';
//import registerServiceWorker from './registerServiceWorker';
import store from 'store';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr';
import es from 'react-intl/locale-data/es';
import pt from 'react-intl/locale-data/pt';
//import ptLocale from 'locales/pt-BR';
import { Provider } from 'react-redux';
import ConnectedIntlProvider from 'components/ConnectedIntlProvider';
import ConnectedLocaleProvider from 'components/ConnectedLocaleProvider';

addLocaleData([...pt, ...en, ...fr, ...es]);

render(
  <Provider store={store}>
    <ConnectedLocaleProvider>
      <ConnectedIntlProvider>
        <Routes store={store} />
        </ConnectedIntlProvider>
    </ConnectedLocaleProvider>
  </Provider>
  ,
  document.getElementById('root') as HTMLElement
);
//registerServiceWorker();
