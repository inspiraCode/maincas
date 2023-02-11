import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

async function getData() {
  // const resp = await fetch('https://api.dicebear.com/5.x/big-ears/svg');
  const resp = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');

//   if (resp.status !== 200 ) {
//     throw new Error('Fail to fetch data...');
//   }
  return resp
}

interface CustomerListProps {

}

const CutomerList : React.FC<CustomerListProps> = () => {
     const { data, isLoading } = useQuery(['pokemonList'], getData);
  return (
    <>
     <div>
        Con Algo
          <p>Un parrafo

            <span>mi span</span>
          </p>
      </div>

      <div>CutomerList</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default CutomerList