import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import ProductsList from '../../components/ProductsList';
import { formatPrice } from '../../utils';

// ---------- MOCK react-router-dom ----------
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');

  return {
    ...actual,
    useLoaderData: () => ({
      products: [
        {
          id: 1,
          attributes: {
            title: 'iphone',
            price: 999,
            image: 'iphone.jpg',
            company: 'apple',
          },
        },
        {
          id: 2,
          attributes: {
            title: 'pixel',
            price: 799,
            image: 'pixel.jpg',
            company: 'google',
          },
        },
      ],
    }),
  };
});

// ---------- MOCK formatPrice ----------
vi.mock('../../utils', () => ({
  formatPrice: vi.fn((price: number) => `$${price}`),
}));

// ---------- TESTS ----------
describe('ProductsList – 100% coverage', () => {
  it('renders products correctly', () => {
    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );

    // titles
    expect(screen.getByText('iphone')).toBeInTheDocument();
    expect(screen.getByText('pixel')).toBeInTheDocument();

    // companies
    expect(screen.getByText('apple')).toBeInTheDocument();
    expect(screen.getByText('google')).toBeInTheDocument();

    // prices
    expect(screen.getByText('$999')).toBeInTheDocument();
    expect(screen.getByText('$799')).toBeInTheDocument();

    // images
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'iphone.jpg');
    expect(images[1]).toHaveAttribute('src', 'pixel.jpg');

    // links
    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/products/1');
    expect(links[1]).toHaveAttribute('href', '/products/2');
  });

  it('calls formatPrice for each product', () => {
    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );
  
    // React 18 renders components twice in test/dev
    expect(formatPrice).toHaveBeenCalledTimes(4);
  
    // ensure correct arguments were used
    expect(formatPrice).toHaveBeenCalledWith(999);
    expect(formatPrice).toHaveBeenCalledWith(799);
  });
});
