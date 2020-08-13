/* eslint-disable no-use-before-define */

import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGroups } from '../actions';
import { connect } from 'react-redux';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const GroupsSelector = props => {
  const { predefinedGroup, groups, fetchGroups } = props;
  const initialState = () => [];
  const [selectedGroups, setGroups] = React.useState(predefinedGroup?._id);
  const [data, setData] = React.useState(initialState);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    console.log('groups:', groups);
    setData(groups.groups);
    props.onSetGroups(selectedGroups);
  }, [groups.groups, selectedGroups]);

  return (
    <>
      <Autocomplete
        multiple
        defaultValue={predefinedGroup === undefined ? [] : [predefinedGroup]}
        limitTags={2}
        options={data}
        disableCloseOnSelect
        getOptionLabel={option => option.name}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            {console.log('option:', option)}
            {option._id === predefinedGroup?._id ? (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={true}
              />
            ) : (
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
            )}
            {option.name}
          </React.Fragment>
        )}
        onChange={(event, value) => {
          let items = new Set();

          const values = value.map(item => item._id);
          items.add(values);

          setGroups(...items);
        }}
        renderInput={params => {
          return (
            <TextField
              {...params}
              variant="outlined"
              margin="normal"
              label="Add to Groups"
              fullWidth
            />
          );
        }}
      />
    </>
  );
};

const mapStateToProps = ({ groups }) => ({
  groups
});

export default connect(mapStateToProps, { fetchGroups })(GroupsSelector);
