import { render } from '@testing-library/react';

import { QueryProviderWrapper } from '@/Utils/tests/QueryProviderWrapper';
import CompanyList from '.';

describe('first', () => {
  it('should ', () => {
    render(
      <QueryProviderWrapper>
        <CompanyList />
      </QueryProviderWrapper>
    );
  });
});
