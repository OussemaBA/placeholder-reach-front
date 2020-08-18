import Alert from '@material-ui/lab/Alert';
import React from 'react';

export const snackbarErrorHandler = fieldWhereErrorOccurred =>
  !fieldWhereErrorOccurred?.message ? (
    <></>
  ) : (
    <Alert severity="error">{fieldWhereErrorOccurred?.message}</Alert>
  );
