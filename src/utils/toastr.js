import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import { Typography } from '@material-ui/core';

// base options for toastr

const options = {
  position: 'bottom-right',
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
};

const toastrMessageStyling = {
  color: 'white',
  whiteSpace: 'nowrap',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const formatedMessage = message => {
  return (
    <>
      <Typography
        variant="subtitle1"
        component="h1"
        style={toastrMessageStyling}>
        {message}
      </Typography>
    </>
  );
};

export function handleSuccessToastr(message, whenToastrIsClosed) {
  toast.success(formatedMessage(message), {
    ...options,
    onClose: () => whenToastrIsClosed()
  });
}

// // toastr for error, warning, info, success
export function handleErrorToastr(message, whenToastrIsClosed) {
  toast.error(message, {
    ...options,
    onClose: () => whenToastrIsClosed()
  });
}
// export function handleWarningToastr(message) {
//   toastr.warning(message, 'Warning');
// }

// export function handleSuccessToastr(message) {
//   toastr.success(message, 'Success');
// }

// export function clearToastr() {
//   toastr.clear();
// }

// sort function
export const compareSort = key => {
  return function(a, b) {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  };
};
