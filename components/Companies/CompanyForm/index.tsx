import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { DialogTransition } from '../../../Utils/DialogTransition';
import { Close, Save } from '@mui/icons-material';

const CompanyForm = ({ open, handleClose }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Company Form</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.1 }}>
          <Grid item xs={12}>
            <TextField
              id='companyName'
              name='companyName'
              label='Company Name'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField id='taxId' name='taxId' label='Tax Id' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='legalName'
              name='legalName'
              label='Legal Name'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField id='address' name='address' label='Address' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id='city' name='city' label='City' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id='state' name='state' label='State' fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField id='country' name='country' label='Country' fullWidth />
          </Grid>
        </Grid>
        {/* <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {}}
          color='error'
          variant='outlined'
          startIcon={<Close />}
        >
          Close
        </Button>
        <Button onClick={handleClose} variant='outlined' startIcon={<Save />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
