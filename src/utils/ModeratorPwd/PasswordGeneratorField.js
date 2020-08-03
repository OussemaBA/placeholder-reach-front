import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import { RandomPassword } from './RandomPassword';

const useStyles = makeStyles(theme => ({
  formFields: {
    marginTop: '10px'
  }
}));

export default function ModeratorPasswordGeneratorField(props) {
  const classes = useStyles();

  const [values, setValues] = useState({
    length: 16,
    newLength: 8,
    pwd: '',
    upperCase: true,
    lowerCase: true,
    numeric: true,
    symbol: true,
    typing: false,
    typingTimeout: 0
  });

  const generatePwd = () => {
    const { upperCase, lowerCase, numeric, symbol, length } = values;
    let pwd = new RandomPassword()
      .setLength(length)
      .setLowerCase(lowerCase)
      .setUpperCase(upperCase)
      .setNumberCase(numeric)
      .setSymbol(symbol)
      .generate();

    props.onSetPassword(pwd);

    setValues({ ...values, pwd: pwd });
  };

  useEffect(() => {
    generatePwd();
  }, []);

  return (
    <FormControl fullWidth variant="outlined" className={classes.formFields}>
      <InputLabel variant="outlined" />
      <OutlinedInput
        id="component-filled"
        value={values.pwd}
        endAdornment={
          <InputAdornment position="end">
            <Button
              onClick={event => {
                event.preventDefault();
                generatePwd();
              }}
              readOnly
              size="small"
              color="secondary">
              Generate
            </Button>
          </InputAdornment>
        }
      />
    </FormControl>
  );
}
