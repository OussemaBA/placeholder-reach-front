import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
  formFields: {
    marginTop: '10px'
  }
}));

export default function SimpleSelect(props) {
  const [Gender, setGender] = React.useState('');
  const classes = useStyles();

  const handleChange = event => {
    props.onSelecGender(event.target.value);
    setGender(event.target.value);
  };

  return (
    <FormControl variant="outlined" fullWidth className={classes.formFields}>
      <InputLabel>Gender</InputLabel>
      <Select value={Gender} onChange={handleChange} label="Gender">
        <MenuItem value={'Male'}>Male</MenuItem>
        <MenuItem value={'Female'}>Female</MenuItem>
        <MenuItem value={'Rather not say'}> Rather not say</MenuItem>
      </Select>
    </FormControl>
  );
}
