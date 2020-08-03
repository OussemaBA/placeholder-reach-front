import React, { useState, useEffect } from 'react';
import { withTranslation } from 'react-i18next';
import { changeLanguage, changeDirection } from '../actions';

import { Button } from '@material-ui/core';
import { connect } from 'react-redux';
import Cookies from 'universal-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const cookies = new Cookies();

const useStyles = makeStyles(theme => ({
  languageSelector: {
    color: 'white'
  }
}));
const LanguageSwitcher = props => {
  const classes = useStyles();

  const { i18n } = props;
  const { changeD } = props;
  const { changeL } = props;
  const lang = props.language;
  const dir = props.direction;
  const [language, setlanguage] = useState('');
  const [open, setOpen] = useState(false);
  const [directionInfo, setDirection] = useState(dir);
  const [languageInfo, setLanguage] = useState(lang);

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
    setlanguage(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    setDirection(directionInfo);
    setLanguage(languageInfo);
    i18n.changeLanguage(languageInfo);
  }, [props.language, props.direction]);

  return (
    <>
      <Button onClick={handleOpen}>
        <Typography variant="h6" className={classes.languageSelector}>
          Language
        </Typography>
      </Button>

      <Select
        className={classes.languageSelector}
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={language}
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
export default connect(
  null,
  mapDispatchToProps
)(withTranslation('common')(LanguageSwitcher));
