import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormCheckbox from '../../components/FormCheckbox';

describe('FormCheckbox', () => {
  it('renders label text', () => {
    render(
      <FormCheckbox
        label="free shipping"
        name="shipping"
        defaultValue={false}
        size="checkbox-sm"
      />
    );

    expect(screen.getByText(/free shipping/i)).toBeInTheDocument();
  });

  it('renders checkbox input', () => {
    render(
      <FormCheckbox
        label="shipping"
        name="shipping"
        defaultValue={false}
        size="checkbox-sm"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('checkbox is checked when defaultValue is true', () => {
    render(
      <FormCheckbox
        label="shipping"
        name="shipping"
        defaultValue={true}
        size="checkbox-sm"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('checkbox is unchecked when defaultValue is false', () => {
    render(
      <FormCheckbox
        label="shipping"
        name="shipping"
        defaultValue={false}
        size="checkbox-sm"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
  });

  it('passes correct name attribute', () => {
    render(
      <FormCheckbox
        label="shipping"
        name="shipping"
        defaultValue={false}
        size="checkbox-sm"
      />
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('name', 'shipping');
  });
});
