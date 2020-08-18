import React, { Component } from 'react';

import { CSVReader } from 'react-papaparse';
import { Button } from '@material-ui/core';
const buttonRef = React.createRef();

export default class CSVRImport extends Component {
  handleOpenDialog = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e);
    }
  };

  handleOnFileLoad = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err);
  };

  handleOnRemoveFile = data => {
    console.log('---------------------------');
    console.log(data);
    console.log('---------------------------');
  };

  handleRemoveFile = e => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e);
    }
  };

  render() {
    return (
      <CSVReader
        ref={buttonRef}
        onFileLoad={this.handleOnFileLoad}
        onError={this.handleOnError}
        noClick
        noDrag
        onRemoveFile={this.handleOnRemoveFile}>
        {({ file }) => (
          <aside
            style={{
              display: 'flex',
              flexDirection: 'row'
            }}>
            <Button onClick={this.handleOpenDialog}>Import</Button>
          </aside>
        )}
      </CSVReader>
    );
  }
}
