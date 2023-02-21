import { Get, Post } from '@/core/ApiService';
import useAuth from '@/core/useAuth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Company } from './company';

export const useCompanyListQuery = () => {
  const { accessToken } = useAuth();
  return useQuery(
    ['company-list'],
    () => {
      return Get('/api/company/list', accessToken);
    },
    {
      enabled: !!accessToken
    }
  );
};

export const useCreateCompanyMutation = () => {
  const { accessToken } = useAuth();
  return useMutation(
    (data: Company) => {
      return Post('/api/company/create', data, accessToken);
    },
    {
      // onSuccess: () => {}
    }
  );
};
