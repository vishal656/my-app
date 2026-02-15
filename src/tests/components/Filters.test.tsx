import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Filters from '../../components/Filters';

// --------------------
// MOCK ROUTER
// --------------------
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLoaderData: () => ({
      params: {
        search: '',
        category: 'all',
        company: 'all',
        shipping: false,
        order: 'a-z',
        price: 500,
      },
      meta: {
        categories: ['all', 'chairs'],
        companies: ['all', 'ikea'],
      },
    }),
    Form: ({ children, onSubmit }: any) => (
      <form onSubmit={onSubmit}>{children}</form>
    ),
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
  };
});

// --------------------
// MOCK CHILD COMPONENTS
// --------------------
vi.mock('../../components/FormInput', () => ({
  default: ({ name }: any) => (
    <input data-testid={`input-${name}`} name={name} />
  ),
}));

vi.mock('../../components/FormSelect', () => ({
  default: ({ name }: any) => (
    <select data-testid={`select-${name}`} name={name}>
      <option value="all">all</option>
    </select>
  ),
}));

vi.mock('../../components/FormRange', () => ({
  default: ({ name }: any) => (
    <input data-testid={`range-${name}`} name={name} type="range" />
  ),
}));

vi.mock('../../components/FormCheckbox', () => ({
  default: ({ name }: any) => (
    <input data-testid={`checkbox-${name}`} name={name} type="checkbox" />
  ),
}));

describe('Filters component', () => {
  beforeEach(() => {
    // mock location
    Object.defineProperty(window, 'location', {
      value: { href: '' },
      writable: true,
    });
  });

  it('renders all filter controls', () => {
    render(<Filters />);

    expect(screen.getByTestId('input-search')).toBeInTheDocument();
    expect(screen.getByTestId('select-category')).toBeInTheDocument();
    expect(screen.getByTestId('select-company')).toBeInTheDocument();
    expect(screen.getByTestId('select-order')).toBeInTheDocument();
    expect(screen.getByTestId('range-price')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-shipping')).toBeInTheDocument();
  });

  it('submits form and updates URL with query params', () => {
    render(<Filters />);

    const submitBtn = screen.getByRole('button', { name: /search/i });

    fireEvent.click(submitBtn);

    expect(window.location.href).toContain('/products?');
  });

  it('renders reset link', () => {
    render(<Filters />);

    const resetLink = screen.getByText('reset');
    expect(resetLink).toHaveAttribute('href', '/products');
  });
});
