import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, Hidden, IconButton } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import LanguageSwitcher from '../../../../translations/LanguageSwitcher';
import { connect } from 'react-redux';
import withCookies from '../../../../HOC/withCookies';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../../../../actions';
import tiktok from '../../../../Images/tiktok.png';
const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none'
  },
  flexGrow: {
    flexGrow: 1
  },
  signOutButton: {
    marginLeft: theme.spacing(1)
  }
}));

const Topbar = props => {
  const classes = useStyles();
  const { i18n, changeL } = props;
  useEffect(() => {
    changeL(props.language.language);

    i18n.changeLanguage(props.c_language);
  }, [props.c_language]);

  const { className, onSidebarOpen, ...rest } = props;

  // const [notifications] = useState([]);

  return (
    <AppBar {...rest} className={clsx(classes.root, className)}>
      <Toolbar>
        <RouterLink to="/">
          <img
            alt="Logo"
            src={tiktok}
            style={{ width: '40px', height: '40px' }}
          />
        </RouterLink>
        <div className={classes.flexGrow} />
        <LanguageSwitcher color="inherit" />
        <Hidden mdDown>
          <IconButton className={classes.signOutButton} color="inherit">
            <InputIcon />
          </IconButton>
        </Hidden>

        <Hidden lgUp>
          <IconButton color="inherit" onClick={onSidebarOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func
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
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('common')
)(Topbar);
