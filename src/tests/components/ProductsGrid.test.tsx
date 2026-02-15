import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import ProductsGrid from '../../components/ProductsGrid';
import { formatPrice } from '../../utils';

/* ---------------- MOCK react-router-dom ---------------- */
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    Link: ({ to, children }: any) => <a href={to}>{children}</a>,
    useLoaderData: vi.fn(),
  };
});

import { useLoaderData } from 'react-router-dom';

/* ---------------- MOCK DATA ---------------- */
const mockProducts = [
  {
    id: '1',
    attributes: {
      title: 'Laptop',
      price: 25000,
      image: 'laptop.jpg',
    },
  },
  {
    id: '2',
    attributes: {
      title: 'Phone',
      price: 15000,
      image: 'phone.jpg',
    },
  },
];

describe('ProductsGrid component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useLoaderData as any).mockReturnValue({
      products: mockProducts,
    });
  });

  it('renders all products correctly', () => {
    render(<ProductsGrid />);

    // titles
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('Phone')).toBeInTheDocument();

    // prices
    expect(screen.getByText(formatPrice(25000))).toBeInTheDocument();
    expect(screen.getByText(formatPrice(15000))).toBeInTheDocument();

    // images
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'laptop.jpg');
    expect(images[1]).toHaveAttribute('src', 'phone.jpg');
  });

  it('renders correct product links', () => {
    render(<ProductsGrid />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', '/products/1');
    expect(links[1]).toHaveAttribute('href', '/products/2');
  });

  it('renders formatted prices only', () => {
    render(<ProductsGrid />);

    expect(screen.queryByText('25000')).not.toBeInTheDocument();
    expect(screen.queryByText('15000')).not.toBeInTheDocument();
  });
});
