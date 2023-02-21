import { Get } from '@/core/ApiService';
import useAuth from '@/core/useAuth';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface CustomerListProps {}

const CutomerList: React.FC<CustomerListProps> = () => {
  const { accessToken } = useAuth();
  const { data, isLoading } = useQuery(
    ['pokemonList'],
    () => {
      // const resp = await fetch('https://api.dicebear.com/5.x/big-ears/svg');
      // const resp = await axios.get('https://pokeapi.co/api/v2/pokemon/ditto');
      return Get('/api/company/list', accessToken);
    },
    {
      enabled: !!accessToken
    }
  );

  return (
    <>
      <div>
        Con Algo
        <p>
          Un parrafo
          <span>mi span</span>
        </p>
      </div>

      <div>CutomerList</div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
};

export default CutomerList;
