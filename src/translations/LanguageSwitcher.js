import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage, changeDirection } from '../actions';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { compose } from 'recompose';
import withCookies from '../HOC/withCookies';
const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  languageSelector: {
    color: '#fff'
  }
}));

const LanguageSwitcher = props => {
  const classes = useStyles();

  const { i18n, c_language } = props;
  const { changeD } = props;
  const { changeL } = props;

  const [open, setOpen] = useState(false);
  const [languageInfo, setLanguage] = useState(c_language);

  const handleChange = event => {
    const value = event.target.value;
    if (value === 'en') {
      const cookieValue = {
        language: 'en',
        direction: 'ltr'
      };

      cookies.set('userCookies', cookieValue, { path: '' });

      changeL('en');
      changeD('ltr');

      i18n.changeLanguage('en');
    } else {
      const cookieValue = {
        language: 'ar',
        direction: 'rtl'
      };

      cookies.set('userCookies', cookieValue, { path: '' });

      changeL('ar');
      changeD('rtl');

      i18n.changeLanguage('ar');
    }
    setLanguage(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography variant="h6" className={classes.languageSelector}>
          Language
        </Typography>
      </Button>
      <Select
        disableUnderline
        className={classes.languageSelector}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={languageInfo}
        onChange={handleChange}>
        <MenuItem value={'ar'}>
          <Typography variant="h6">Arabic</Typography>
        </MenuItem>
        <MenuItem value={'en'}>
          <Typography variant="h6">English</Typography>
        </MenuItem>
      </Select>
    </>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    changeD: dir => dispatch(changeDirection(dir)),
    changeL: lang => dispatch(changeLanguage(lang))
  };
}

const mapStateToProps = state => ({
  language: state.language
});

export default compose(
  withCookies,
  connect(mapStateToProps, mapDispatchToProps),
  withTranslation('common')
)(LanguageSwitcher);
