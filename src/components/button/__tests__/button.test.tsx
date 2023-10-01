import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Button } from '../src';

it('passes a11y test', async () => {
  const { container } = render(<Button>test</Button>);
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
