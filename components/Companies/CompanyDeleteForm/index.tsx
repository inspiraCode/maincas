import React from 'react';
import { DialogTransition } from '@/Utils/DialogTransition';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography
} from '@mui/material';
import { Close, Delete, Warning } from '@mui/icons-material';
import { useDeleteCompanyMutation } from '../companyHooks';

const CompanyDeleteForm = ({ open, handleClose, companyId, companyName }) => {
  const deleteMutation = useDeleteCompanyMutation();

  const handleDelete = async () => {
    await deleteMutation.mutateAsync(companyId);
    handleClose();
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Delete Company </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.1 }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left' }}>
            <Warning color='warning' />
            <Typography sx={{ ml: 1 }}>
              Are you sure to delete this company?
            </Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='h4' sx={{ mb: 2, ml: 1 }}>
              {companyName}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          color='error'
          variant='outlined'
          startIcon={<Close />}
        >
          Close
        </Button>
        <Button
          onClick={handleDelete}
          variant='outlined'
          startIcon={<Delete />}
          // disabled={validateCompanyName}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyDeleteForm;
