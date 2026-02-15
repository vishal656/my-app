import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FormSelect from '../../components/FormSelect';

describe('FormSelect', () => {
  const mockList = ['apple', 'banana', 'orange'];

  it('renders label text', () => {
    render(
      <FormSelect
        label="select fruit"
        name="fruit"
        list={mockList}
        size="select-sm"
      />
    );

    expect(screen.getByText(/select fruit/i)).toBeInTheDocument();
  });

  it('renders select element', () => {
    render(
      <FormSelect
        label="fruit"
        name="fruit"
        list={mockList}
        size="select-sm"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
  });

  it('renders all options from list', () => {
    render(
      <FormSelect
        label="fruit"
        name="fruit"
        list={mockList}
        size="select-sm"
      />
    );

    mockList.forEach((item) => {
      expect(screen.getByRole('option', { name: item })).toBeInTheDocument();
    });
  });

  it('sets default selected value', () => {
    render(
      <FormSelect
        label="fruit"
        name="fruit"
        list={mockList}
        defaultValue="banana"
        size="select-sm"
      />
    );

    const select = screen.getByRole('combobox') as HTMLSelectElement;
    expect(select.value).toBe('banana');
  });

  it('applies correct name and id attributes', () => {
    render(
      <FormSelect
        label="fruit"
        name="fruit"
        list={mockList}
        size="select-sm"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select).toHaveAttribute('name', 'fruit');
    expect(select).toHaveAttribute('id', 'fruit');
  });

  it('applies size class', () => {
    render(
      <FormSelect
        label="fruit"
        name="fruit"
        list={mockList}
        size="select-sm"
      />
    );

    const select = screen.getByRole('combobox');
    expect(select.className).toContain('select-sm');
  });
});
