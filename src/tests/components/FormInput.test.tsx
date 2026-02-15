import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormInput from '../../components/FormInput';

describe('FormInput', () => {
  it('renders label text', () => {
    render(
      <FormInput
        label="search product"
        name="search"
        type="text"
        defaultValue=""
        size="input-sm"
      />
    );

    expect(screen.getByText(/search product/i)).toBeInTheDocument();
  });

  it('renders input element', () => {
    render(
      <FormInput
        label="search"
        name="search"
        type="text"
        defaultValue=""
        size="input-sm"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('sets correct input type', () => {
    render(
      <FormInput
        label="email"
        name="email"
        type="email"
        defaultValue=""
        size="input-sm"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('applies defaultValue correctly', () => {
    render(
      <FormInput
        label="search"
        name="search"
        type="text"
        defaultValue="iphone"
        size="input-sm"
      />
    );

    const input = screen.getByDisplayValue('iphone');
    expect(input).toBeInTheDocument();
  });

  it('passes correct name attribute', () => {
    render(
      <FormInput
        label="search"
        name="search"
        type="text"
        defaultValue=""
        size="input-sm"
      />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'search');
  });
});
