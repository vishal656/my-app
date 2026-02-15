import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Landing, { loader } from '../../pages/Landing';

/* =========================
   MOCK COMPONENTS
========================= */
vi.mock('../../components/Hero', () => ({
  default: () => <div data-testid="hero">Hero</div>,
}));

vi.mock('../../components/FeaturedProducts', () => ({
  default: () => (
    <div data-testid="featured-products">Featured Products</div>
  ),
}));

vi.mock('../../components/Wrapper', () => ({
  default: () => <div data-testid="wrapper">Wrapper</div>,
}));

/* =========================
   MOCK customFetch
========================= */
vi.mock('../../utils', () => ({
  customFetch: vi.fn(),
}));

describe('Landing page – 100% coverage', () => {
  /* =========================
     COMPONENT TEST
  ========================= */
  it('renders Hero, FeaturedProducts, and Wrapper', () => {
    render(<Landing />);

    expect(screen.getByTestId('hero')).toBeInTheDocument();
    expect(
      screen.getByTestId('featured-products')
    ).toBeInTheDocument();
    expect(screen.getByTestId('wrapper')).toBeInTheDocument();
  });

  /* =========================
     LOADER TEST
  ========================= */
  it('loader returns products from queryClient', async () => {
    const mockProducts = [{ id: 1 }, { id: 2 }];

    const mockQueryClient = {
      ensureQueryData: vi.fn().mockResolvedValue({
        data: {
          data: mockProducts,
        },
      }),
    };

    const load = loader(mockQueryClient as any);
    const result = await load();

    expect(mockQueryClient.ensureQueryData).toHaveBeenCalledWith({
      queryKey: ['featuredProducts'],
      queryFn: expect.any(Function),
    });

    expect(result).toEqual({ products: mockProducts });
  });
});
