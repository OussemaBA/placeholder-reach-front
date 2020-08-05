/* eslint-disable no-use-before-define */

import React, { useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { fetchGroups } from '../../actions';
import { connect } from 'react-redux';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const ParticipantGroupsField = props => {
  const { groups, fetchGroups } = props;
  const initialState = () => [];
  const [selectedGroups, setGroups] = React.useState(initialState);
  const [data, setData] = React.useState(initialState);

  useEffect(() => {
    fetchGroups();
  }, []);

  useEffect(() => {
    setData(groups.groups);
    props.onSetGroups(selectedGroups);
  }, [groups.groups]);

  return (
    <>
      <Autocomplete
        multiple
        limitTags={2}
        options={data}
        disableCloseOnSelect
        getOptionLabel={option => {
          return option.name;
        }}
        renderOption={(option, { selected }) => (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </React.Fragment>
        )}
        onChange={(event, value) => {
          let items = new Set();

          const values = value.map(item => item.name);
          items.add(values);

          setGroups(...items);
        }}
        renderInput={params => (
          <TextField
            {...params}
            variant="outlined"
            margin="normal"
            label="Add to Groups"
            fullWidth
          />
        )}
      />
    </>
  );
};

const mapStateToProps = ({ groups }) => ({
  groups
});

export default connect(mapStateToProps, { fetchGroups })(
  ParticipantGroupsField
);
