import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { connect } from 'react-redux';
import withCookies from '../../HOC/withCookies';
import { compose } from 'recompose';
import { withTranslation } from 'react-i18next';
import { changeLanguage } from '../../actions';
import { Sidebar, Topbar, Footer } from './components';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64
    }
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
}));

const Main = props => {
  const { children } = props;
  const { t, i18n, changeL } = props;

  const classes = useStyles();
  const theme = useTheme();
  useEffect(() => {
    changeL(props.language.language);
    i18n.changeLanguage(props.c_language);
  }, [props.c_language]);

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop
      })}>
      <Topbar onSidebarOpen={handleSidebarOpen} />
      <Sidebar
        onClose={handleSidebarClose}
        open={shouldOpenSidebar}
        variant={isDesktop ? 'persistent' : 'temporary'}
      />
      <main className={classes.content}>
        {children}
        <Footer />
      </main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node
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
)(Main);
