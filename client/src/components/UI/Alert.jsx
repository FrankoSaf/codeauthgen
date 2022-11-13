import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Context } from '../../store/Context';
import { styled } from '@mui/material/styles';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({children}) {
  const {open, setOpen }= React.useContext(Context);


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <CustomAlert onClose={handleClose}  sx={{ width: '100%' }}>
          {children}
        </CustomAlert>
      </Snackbar>
    </Stack>
  );
}

const CustomAlert = styled(Alert)`
    background-color:var(--warningColor);
`