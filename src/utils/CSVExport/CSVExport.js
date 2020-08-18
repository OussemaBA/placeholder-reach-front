import { CSVLink, CSVDownload } from 'react-csv';

import React from 'react';

const CSVExport = ({ data, headers, filename }) => {
  return (
    <CSVLink data={data} headers={headers} filename={filename}>
      <div style={{ color: 'black' }}>Export</div>
    </CSVLink>
  );
};

export default CSVExport;
