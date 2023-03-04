import { Delete, Get, Post, Put } from '@/core/ApiService';
import useAuth from '@/core/useAuth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Company, CompanyComment } from './company';

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
export const useCompanyFormQuery = ({ companyId }) => {
  console.log(companyId);
  const { accessToken } = useAuth();
  return useQuery(
    ['company-form', companyId],
    () => {
      if (companyId < 0 || companyId === undefined) {
        return {};
      }
      return Get(`/api/company/${companyId}`, accessToken);
    },
    {
      enabled: !!accessToken
    }
  );
};

export const useCreateCompanyMutation = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Company) => {
      return Post('/api/company/create', data, accessToken);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['company-list'])
    }
  );
};

export const useUpdateCompanyMutation = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    (data: Company) => {
      const { id } = data;
      return Put(`/api/company/${id}`, data, accessToken);
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['company-list'])
    }
  );
};

export const useDeleteCompanyMutation = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    (companyId: Company) => {
      return Delete(`/api/company/${companyId}`, null, accessToken);
    },
    {
      onSuccess: async () => queryClient.invalidateQueries(['company-list'])
    }
  );
};

export const useCreateCommentCompanyMutation = () => {
  const { accessToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation(
    (data: CompanyComment) => {
      const { company } = data;
      const { id: companyId } = company;
      return Post(
        `/api/company/${companyId}/comments/create`,
        data,
        accessToken
      );
    },
    {
      onSuccess: () => queryClient.invalidateQueries(['company-list'])
    }
  );
};
