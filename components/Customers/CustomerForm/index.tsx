import React from 'react';

interface CustomerFormPros {
  id: string;
}

const CustomerForm: React.FC<CustomerFormPros> = ({ id }) => {
  return <div>CustomerForm {id}</div>;
};

export default CustomerForm;
