import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FeaturedProducts from '../../components/FeaturedProducts';

// ✅ Mock child components
vi.mock('../../components/SectionTitle', () => ({
  default: ({ text }: { text: string }) => (
    <h2 data-testid="section-title">{text}</h2>
  ),
}));

vi.mock('../../components/ProductsGrid', () => ({
  default: () => <div data-testid="products-grid">Products Grid</div>,
}));

describe('FeaturedProducts', () => {
  it('renders section title and products grid', () => {
    render(<FeaturedProducts />);

    expect(screen.getByTestId('section-title')).toHaveTextContent(
      'featured products'
    );

    expect(screen.getByTestId('products-grid')).toBeInTheDocument();
  });
});
