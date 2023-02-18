import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Dialog, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WarehouseImage from '../../public/images/warehouse.jpg';
import Image from 'next/image';

const style = {
  position: 'absolute' as 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  width: '100vw',
  height: '100vh',
  // bgcolor: 'background.paper',
  // backgroundImage: WarehouseImage
  // border: '2px solid #000',
  // boxShadow: 24,
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
      <>
        <Image
          alt='Test'
          src={WarehouseImage}
          fill
          style={{ filter: 'blur(4px)', WebkitFilter: 'blur(4px)' }}
        />
        <Box sx={style}>
          <Grid
            container
            direction={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            spacing={2}
            sx={{ height: '80%' }}
          >
            <Grid item>
              <Typography
                textAlign={'center'}
                variant='h1'
                fontWeight={'600'}
                letterSpacing={10}
                color={'whitesmoke'}
                // fontFamily={'monospace'}
              >
                MAINCAS
              </Typography>
              <Typography textAlign={'center'} variant={'h5'} color={'white'}>
                Sistema inteligente a Cadena de Suministro
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='contained' onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            </Grid>
          </Grid>
        </Box>
      </>
    </Dialog>
  );
};

export default LoginModal;
