import React, { useEffect } from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Chart } from 'react-chartjs-2';
import validate from 'validate.js';
import {
  StylesProvider,
  jssPreset,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles';
import palette from './theme/palette';
import typography from './theme/typography';
import overrides from './theme/overrides';
import { chartjs } from './helpers';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './assets/scss/index.scss';
import validators from './common/validators';
import Routes from './Routes';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { connect } from 'react-redux';
import withCookies from './HOC/withCookies';
import { changeLanguage, changeDirection } from './actions';
import 'fontsource-roboto';

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw
});

validate.validators = {
  ...validate.validators,
  ...validators
};
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const App = props => {
  let dir = props.direction.direction;
  const { changeD } = props;

  useEffect(() => {
    changeD(props.c_direction);
  }, [props.c_direction]);

  const theme = createMuiTheme({
    palette,
    typography,
    overrides,
    zIndex: {
      appBar: 1200,
      drawer: 1100
    },
    direction: dir // Both here and <body dir="rtl">
  });

  return (
    <ThemeProvider theme={theme}>
      <div dir={dir}>
        <StylesProvider jss={jss}>
          <Router history={browserHistory}>
            <Routes />
          </Router>
        </StylesProvider>
      </div>
    </ThemeProvider>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    changeD: dir => dispatch(changeDirection(dir)),
    changeL: lang => dispatch(changeLanguage(lang))
  };
}

const mapStateToProps = state => ({
  language: state.language,
  direction: state.direction
});

export default connect(mapStateToProps, mapDispatchToProps)(withCookies(App));
