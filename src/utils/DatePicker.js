import React, { useState, useEffect } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { makeStyles } from '@material-ui/core/styles';

const ParticipantDatePicker = props => {
  const [selectedDate, handleDateChange] = useState(new Date());

  useEffect(() => {
    props.onSelectDate(selectedDate);
  }, []);

  const useStyles = makeStyles(theme => ({
    formFields: {
      marginTop: '10px'
    }
  }));
  const classes = useStyles();

  return (
    <KeyboardDatePicker
      autoOk
      className={classes.formFields}
      inputVariant="outlined"
      format="MM/dd/yyyy"
      maxDate={new Date()}
      fullWidth
      value={selectedDate}
      onChange={date => {
        props.onSelectDate(date);
        handleDateChange(date);
      }}
    />
  );
};

export default ParticipantDatePicker;
