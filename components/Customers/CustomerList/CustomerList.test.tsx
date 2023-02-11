import { render } from '@testing-library/react';

import { QueryProviderWrapper } from '../../../Utils/tests/QueryProviderWrapper';
import CustomerList from '.';

describe('first', () => {
  it('should ', () => {
    render(
      <QueryProviderWrapper>
        <CustomerList />
      </QueryProviderWrapper>
    );
  });
});
