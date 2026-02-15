import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductsContainer from '../../components/ProductsContainer';

/* ---------------- MOCK react-router-dom ---------------- */
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

import { useLoaderData } from 'react-router-dom';

/* ---------------- MOCK CHILD COMPONENTS ---------------- */
vi.mock('../../components/ProductsGrid', () => ({
  default: () => <div>Mock ProductsGrid</div>,
}));

vi.mock('../../components/ProductsList', () => ({
  default: () => <div>Mock ProductsList</div>,
}));

describe('ProductsContainer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders total products count correctly', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 5 },
      },
    });

    render(<ProductsContainer />);

    expect(screen.getByText('5 products')).toBeInTheDocument();
  });

  it('renders singular product text when total is 1', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 1 },
      },
    });

    render(<ProductsContainer />);

    expect(screen.getByText('1 product')).toBeInTheDocument();
  });

  it('renders ProductsGrid by default', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 3 },
      },
    });

    render(<ProductsContainer />);

    expect(screen.getByText('Mock ProductsGrid')).toBeInTheDocument();
    expect(screen.queryByText('Mock ProductsList')).not.toBeInTheDocument();
  });

  it('switches to ProductsList when list button is clicked', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 3 },
      },
    });

    render(<ProductsContainer />);

    const buttons = screen.getAllByRole('button');

    // second button = list view
    fireEvent.click(buttons[1]);

    expect(screen.getByText('Mock ProductsList')).toBeInTheDocument();
    expect(screen.queryByText('Mock ProductsGrid')).not.toBeInTheDocument();
  });

  it('switches back to ProductsGrid when grid button is clicked', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 3 },
      },
    });

    render(<ProductsContainer />);

    const buttons = screen.getAllByRole('button');

    // switch to list
    fireEvent.click(buttons[1]);
    expect(screen.getByText('Mock ProductsList')).toBeInTheDocument();

    // switch back to grid
    fireEvent.click(buttons[0]);
    expect(screen.getByText('Mock ProductsGrid')).toBeInTheDocument();
  });

  it('shows fallback message when no products exist', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { total: 0 },
      },
    });

    render(<ProductsContainer />);

    expect(
      screen.getByText(/sorry, no products matched your search/i)
    ).toBeInTheDocument();

    expect(screen.queryByText('Mock ProductsGrid')).not.toBeInTheDocument();
    expect(screen.queryByText('Mock ProductsList')).not.toBeInTheDocument();
  });
});
