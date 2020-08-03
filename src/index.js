import React from 'react';
import ReactDOM from 'react-dom';

import * as serviceWorker from './serviceWorker';
import App from './App';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'; // choose your lib

/** Redux */
import store from './middleware/Store';

import { Provider } from 'react-redux';
/** Translation Configurations */
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';

import common_ar from './translations/ar/common.json';
import common_en from './translations/en/common.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: 'en', // language to use
  resources: {
    en: {
      common: common_en // 'common' is our custom namespace
    },
    ar: {
      common: common_ar
    }
  }
});

/** Translation Configurations */
ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18next}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <App />
      </MuiPickersUtilsProvider>
    </I18nextProvider>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
