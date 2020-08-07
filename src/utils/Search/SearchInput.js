import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Paper, Input, MenuItem, Select, InputLabel } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles(theme => ({
  root: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px'
  },
  InputLabel: { whiteSpace: 'nowrap' }
}));

const SearchInput = props => {
  const {
    className,
    onChange,
    style,
    fields,
    data,
    onSearchForData,
    ...rest
  } = props;

  const classes = useStyles();
  const [searchBy, setSearchBy] = React.useState(fields[0].key);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearchByChange = event => {
    setSearchBy(event.target.value);
  };

  useEffect(() => {
    onSearchForData(dynamicSearch());
  }, [searchTerm, searchBy]);

  const dynamicSearch = () =>
    data.filter(tobeFiltred => {
      if (tobeFiltred[searchBy])
        return tobeFiltred[searchBy]
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
    });

  const handleSearchTermChange = event => {
    setSearchTerm(event.target.value);
  };

  return (
    <Paper {...rest} className={clsx(classes.root, className)} style={style}>
      <SearchIcon className={classes.icon} />
      <Input
        {...rest}
        className={classes.input}
        disableUnderline
        onChange={handleSearchTermChange}
      />

      <InputLabel className={classes.InputLabel}>
        <h4>Search By : &nbsp;&nbsp;</h4>
      </InputLabel>
      <Select disableUnderline value={searchBy} onChange={handleSearchByChange}>
        {fields.map(field => (
          <MenuItem key={field.key} value={field.key}>
            {field.value}
          </MenuItem>
        ))}
      </Select>
    </Paper>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  style: PropTypes.object
};

export default SearchInput;
