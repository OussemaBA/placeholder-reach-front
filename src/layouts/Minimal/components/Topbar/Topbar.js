import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import LanguageSwitcher from 'translations/LanguageSwitcher';
import { connect } from 'react-redux';
import withCookies from '../../../../HOC/withCookies';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../../../../actions';
import { compose } from 'recompose';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed">
      <Toolbar>
        <RouterLink to="/">
          <img alt="Logo" src="/images/logos/logo--white.svg" />
        </RouterLink>
        <LanguageSwitcher />
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

function mapDispatchToProps(dispatch) {
  return {
    changeL: lang => dispatch(changeLanguage(lang))
  };
}

const mapStateToProps = state => ({
  language: state.language
});

export default compose(
  withCookies,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withTranslation('common')
)(Topbar);
