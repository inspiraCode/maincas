'use client';
import React, { useState } from 'react';
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridRowsProp
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Typography
} from '@mui/material';
import { Add, Delete, Edit, Factory } from '@mui/icons-material';
import CompanyForm from '../CompanyForm';
import { useCompanyListQuery } from '../companyHooks';
import CompanyDeleteForm from '../CompanyDeleteForm';

const CompanyList = () => {
  const { data, isLoading, error, isError, isFetching } = useCompanyListQuery();
  // console.log(data);

  const [companyId, setCompanyId] = useState<number | string>(0);
  const [open, setOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClose = () => {
    setCompanyId(-1);
    setOpen(false);
  };

  const handleOpen = (id = -1) => {
    setCompanyId(id);
    setOpen(true);
  };

  if (isLoading) {
    return (
      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const rows: GridRowsProp = data;

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'Actions',
      headerAlign: 'center',
      maxWidth: 120,
      align: 'center',
      renderCell: (params: GridRenderCellParams<string>) => {
        const { id, row } = params;
        const { name } = row;
        return (
          <>
            <IconButton onClick={() => handleOpen(id as number)}>
              <Edit color='primary' />
            </IconButton>
            <IconButton
              onClick={() => {
                setCompanyId(id);
                setCompanyName(name);
                setOpenDeleteDialog(true);
              }}
            >
              <Delete color='error' />
            </IconButton>
          </>
        );
      }
    },
    { field: 'name', headerName: 'Company Name', width: 150, flex: 1 },
    { field: 'taxId', headerName: 'Tax ID', width: 150, flex: 1 },
    { field: 'legalName', headerName: 'Legal Name', width: 150, flex: 1 },
    { field: 'addressLineOne', headerName: 'Address', width: 150, flex: 1 },
    { field: 'addressCity', headerName: 'City', width: 150, flex: 1 },
    { field: 'addressState', headerName: 'State', width: 150, flex: 1 },
    { field: 'addressCountry', headerName: 'Country', width: 150, flex: 1 }
  ];

  return (
    <Container maxWidth={'xl'}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={0.5}>
          <Factory fontSize='large' />
        </Grid>
        <Grid item xs={6} md={5.5}>
          <Typography
            variant='subtitle1'
            // align='center'
            fontWeight={600}
            fontSize={24}
          >
            Companies
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          style={{
            display: 'flex',
            justifyContent: 'end',
            alignItems: 'center'
          }}
        >
          <Button
            variant='contained'
            startIcon={<Add />}
            onClick={() => handleOpen()}
            // fullWidth={{ display: { xs: true, md: false } }}
            // sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          >
            New Company
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 800, backgroundColor: 'white' }}>
            <DataGrid rows={rows} columns={columns} loading={isLoading} />
          </div>
        </Grid>
      </Grid>
      {open && (
        <CompanyForm
          open={open}
          handleClose={() => handleClose()}
          companyId={companyId}
        />
      )}
      {openDeleteDialog && (
        <CompanyDeleteForm
          open={openDeleteDialog}
          handleClose={() => setOpenDeleteDialog(false)}
          companyId={companyId}
          companyName={companyName}
        />
      )}
    </Container>
  );
};

export default CompanyList;
