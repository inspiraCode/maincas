'use client';
import CustomerForm from '@/components/Customers/CustomerForm';
import React from 'react';

const CustomerPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  //   console.log(Number(id) + 3);
  return (
    <>
      <div>CustomerPage </div>
      <CustomerForm id={id} />
    </>
  );
};

export default CustomerPage;
