import { render, screen, fireEvent } from '@testing-library/react';
import ComplexPaginationContainer from '../../components/ComplexPaginationContainer';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useLocation: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('ComplexPaginationContainer', () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    (useLocation as vi.Mock).mockReturnValue({
      pathname: '/products',
      search: '?category=shoes',
    });
  });

  it('returns null when pageCount < 2', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 1, pageCount: 1 },
      },
    });

    const { container } = render(<ComplexPaginationContainer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination buttons correctly', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 2, pageCount: 5 },
      },
    });

    render(<ComplexPaginationContainer />);

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('shows dots when page is in the middle', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 3, pageCount: 6 },
      },
    });

    render(<ComplexPaginationContainer />);

    expect(screen.getAllByText('...')).toHaveLength(2);
  });

  it('navigates to previous page when Prev clicked', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 3, pageCount: 5 },
      },
    });

    render(<ComplexPaginationContainer />);

    fireEvent.click(screen.getByText('Prev'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?category=shoes&page=2');
  });

  it('navigates to next page when Next clicked', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 3, pageCount: 5 },
      },
    });

    render(<ComplexPaginationContainer />);

    fireEvent.click(screen.getByText('Next'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?category=shoes&page=4');
  });

  it('navigates when clicking a page number', () => {
    (useLoaderData as vi.Mock).mockReturnValue({
      meta: {
        pagination: { page: 2, pageCount: 5 },
      },
    });

    render(<ComplexPaginationContainer />);

    fireEvent.click(screen.getByText('5'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?category=shoes&page=5');
  });
});
