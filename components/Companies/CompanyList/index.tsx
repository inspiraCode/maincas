'use client';
import React, { useState } from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {
  Button,
  Container,
  Dialog,
  Grid,
  Icon,
  Typography
} from '@mui/material';
import { Add, Factory } from '@mui/icons-material';
import CompanyForm from '../CompanyForm';

const rows: GridRowsProp = [
  {
    id: 1,
    col1: 'Empresa',
    col2: 'EMPR098790IWE',
    col3: 'Empresa SA de CV',
    col4: 'Calle y Numero',
    col5: 'Ciudad',
    col6: 'Estado',
    col7: 'Pais'
  },
  {
    id: 2,
    col1: 'Empresa',
    col2: 'EMPR098790IWE',
    col3: 'Empresa SA de CV',
    col4: 'Calle y Numero',
    col5: 'Ciudad',
    col6: 'Estado',
    col7: 'Pais'
  },
  {
    id: 3,
    col1: 'Empresa',
    col2: 'EMPR098790IWE',
    col3: 'Empresa SA de CV',
    col4: 'Calle y Numero',
    col5: 'Ciudad',
    col6: 'Estado',
    col7: 'Pais'
  },
  {
    id: 4,
    col1: 'Empresa',
    col2: 'EMPR098790IWE',
    col3: 'Empresa SA de CV',
    col4: 'Calle y Numero',
    col5: 'Ciudad',
    col6: 'Estado',
    col7: 'Pais'
  },
  { id: 5, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 6, col1: 'MUI', col2: 'is Amazing' }
];

const columns: GridColDef[] = [
  { field: 'col1', headerName: 'Company Name', width: 150, flex: 1 },
  { field: 'col2', headerName: 'Tax ID', width: 150, flex: 1 },
  { field: 'col3', headerName: 'Legal Name', width: 150, flex: 1 },
  { field: 'col4', headerName: 'Address', width: 150, flex: 1 },
  { field: 'col5', headerName: 'City', width: 150, flex: 1 },
  { field: 'col6', headerName: 'State', width: 150, flex: 1 },
  { field: 'col7', headerName: 'Country', width: 150, flex: 1 }
];

const CompanyList = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

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
            onClick={handleOpen}
            // fullWidth={{ display: { xs: true, md: false } }}
            // sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          >
            New Company
          </Button>
        </Grid>
        <Grid item xs={12}>
          <div style={{ height: 800, backgroundColor: 'white' }}>
            <DataGrid rows={rows} columns={columns} />
          </div>
        </Grid>
      </Grid>
      {open && <CompanyForm open={open} handleClose={() => handleClose()} />}
    </Container>
  );
};

export default CompanyList;
