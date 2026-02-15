import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PaginationContainer from '../../components/PaginationContainer';

/* ---------------- MOCK react-router-dom ---------------- */
const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
    useLocation: vi.fn(),
    useNavigate: () => mockNavigate,
  };
});

import { useLoaderData, useLocation } from 'react-router-dom';

describe('PaginationContainer component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns null when pageCount is less than 2', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 1, page: 1 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    const { container } = render(<PaginationContainer />);
    expect(container.firstChild).toBeNull();
  });

  it('renders pagination buttons correctly', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 2 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    expect(screen.getByText('Prev')).toBeInTheDocument();
    expect(screen.getByText('Next')).toBeInTheDocument();

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('navigates to selected page when page number is clicked', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 1 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('2'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=2');
  });

  it('navigates to previous page correctly', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 2 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('Prev'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=1');
  });

  it('wraps to last page when clicking Prev on first page', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 1 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('Prev'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=3');
  });

  it('navigates to next page correctly', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 2 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('Next'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=3');
  });

  it('wraps to first page when clicking Next on last page', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 3 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('Next'));

    expect(mockNavigate).toHaveBeenCalledWith('/products?page=1');
  });

  it('preserves existing search params when changing page', () => {
    (useLoaderData as any).mockReturnValue({
      meta: {
        pagination: { pageCount: 3, page: 1 },
      },
    });

    (useLocation as any).mockReturnValue({
      search: '?category=chairs',
      pathname: '/products',
    });

    render(<PaginationContainer />);

    fireEvent.click(screen.getByText('2'));

    expect(mockNavigate).toHaveBeenCalledWith(
      '/products?category=chairs&page=2'
    );
  });
});
