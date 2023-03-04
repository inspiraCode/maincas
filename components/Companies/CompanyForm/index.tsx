import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@mui/material';
import { DialogTransition } from '../../../Utils/DialogTransition';
import { Close, Save } from '@mui/icons-material';
import {
  useCompanyFormQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation
} from '../companyHooks';
import { Company } from '../company';

const CompanyForm = ({ open, handleClose, companyId }) => {
  const [companyState, setCompanyState] = useState<Company>();

  const { data, isLoading, isError, error } = useCompanyFormQuery({
    companyId
  });
  const createCompany = useCreateCompanyMutation();
  const updateCompany = useUpdateCompanyMutation();

  useEffect(() => {
    setCompanyState(data as Company);
  }, [data]);

  const handleSubmit = async () => {
    try {
      if (companyState.id) await updateCompany.mutateAsync(companyState);
      if (!companyState.id) await createCompany.mutateAsync(companyState);
      handleClose();
    } catch (error) {
      alert(error);
      console.log('error', JSON.stringify(error, null, 2));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCompanyState({
      ...companyState,
      [e.target.name]: e.target.value,
      alias: 'Company',
      addressLineTwo: 'lsdkjalkdjaslk',
      addressZip: '82738',
      roles: 'admin',
      block: false
    });
  };
  console.log(companyState);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      TransitionComponent={DialogTransition}
    >
      <DialogTitle>Company Form</DialogTitle>

      <DialogContent>
        {isLoading ? (
          'Loading...'
        ) : (
          <Grid container spacing={2} sx={{ mt: 0.1 }}>
            <Grid item xs={12}>
              <TextField
                id='name'
                name='name'
                label='Company Name'
                fullWidth
                value={companyState?.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='taxId'
                name='taxId'
                label='Tax Id'
                fullWidth
                value={companyState?.taxId}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='legalName'
                name='legalName'
                label='Legal Name'
                fullWidth
                value={companyState?.legalName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='address'
                name='addressLineOne'
                label='Address'
                fullWidth
                value={companyState?.addressLineOne}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='city'
                name='addressCity'
                label='City'
                fullWidth
                value={companyState?.addressCity}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='state'
                name='addressState'
                label='State'
                fullWidth
                value={companyState?.addressState}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id='country'
                name='addressCountry'
                label='Country'
                fullWidth
                value={companyState?.addressCountry}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        )}

        {/* <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText> */}
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
        <Button onClick={handleSubmit} variant='outlined' startIcon={<Save />}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CompanyForm;
