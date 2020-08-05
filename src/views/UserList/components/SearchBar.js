import React from 'react';
import { SearchInput } from 'components';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },

  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const SearchBar = props => {
  const classes = useStyles();
  const { data, onSearchForData } = props;
  return (
    <div className={classes.row}>
      <SearchInput
        data={data.participants}
        fields={props.fields}
        className={classes.searchInput}
        placeholder={props.whatTosearchFor}
        onSearchForData={onSearchForData}
      />
    </div>
  );
};

export default SearchBar;
