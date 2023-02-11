'use client';
import React from 'react';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

async function getData() {
  // const resp = await fetch('https://api.dicebear.com/5.x/big-ears/svg');
  const resp = await fetch('https://pokeapi.co/api/v2/pokemon/ditto');

  if (!resp.ok) {
    throw new Error('Fail to fetch data...');
  }
  return resp.json();
}

const Page = () => {
  const { data, isLoading } = useQuery(['pokemonList'], getData);
  //   const data = await getData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Page;
