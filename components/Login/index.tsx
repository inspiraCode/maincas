import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dialog } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const LoginModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  console.log(isAuthenticated);
  //   console.log(getAccessTokenSilently);

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    } else {
      handleOpen();
    }
  }, [isAuthenticated]);

  if (isLoading) return <Typography>Loading...</Typography>;

  return (
    <Dialog
      open={open}
      fullScreen
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Typography id='modal-modal-title' variant='h6' component='h2'>
          Text in a modal
        </Typography>
        <Typography id='modal-modal-description' sx={{ mt: 2 }}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
        <Button onClick={() => loginWithRedirect()}>Log In</Button>
      </Box>
    </Dialog>
  );
};

export default LoginModal;
