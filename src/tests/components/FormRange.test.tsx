import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FormRange from '../../components/FormRange';

// mock formatPrice (industry standard)
vi.mock('../../utils', () => ({
  formatPrice: (value: number) => `₹${value}`,
}));

describe('FormRange', () => {
  it('renders label text', () => {
    render(
      <FormRange
        label="select price"
        name="price"
        size="range-sm"
        price={5000}
      />
    );

    expect(screen.getByText(/select price/i)).toBeInTheDocument();
  });

  it('renders range input', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
        price={5000}
      />
    );

    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('sets initial price from props', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
        price={5000}
      />
    );

    expect(screen.getByText('₹5000')).toBeInTheDocument();
  });

  it('uses max price when no price prop is provided', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
      />
    );

    expect(screen.getByText('₹100000')).toBeInTheDocument();
  });

  it('updates price when slider value changes', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
        price={5000}
      />
    );

    const slider = screen.getByRole('slider');

    fireEvent.change(slider, { target: { value: '20000' } });

    expect(screen.getByText('₹20000')).toBeInTheDocument();
  });

  it('has correct min, max, and step attributes', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
        price={5000}
      />
    );

    const slider = screen.getByRole('slider');

    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100000');
    expect(slider).toHaveAttribute('step', '1000');
  });

  it('renders max price label', () => {
    render(
      <FormRange
        label="price"
        name="price"
        size="range-sm"
      />
    );

    expect(screen.getByText(/max : ₹100000/i)).toBeInTheDocument();
  });
});
