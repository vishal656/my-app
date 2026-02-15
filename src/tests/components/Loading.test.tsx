import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loading from '../../components/Loading';

describe('Loading component', () => {
  it('renders loading spinner', () => {
    render(<Loading />);

    const loader = document.querySelector('.loading');

    expect(loader).toBeInTheDocument();
  });

  it('applies correct loading classes', () => {
    render(<Loading />);

    const loader = document.querySelector('.loading');

    expect(loader).toHaveClass('loading-ring');
    expect(loader).toHaveClass('loading-lg');
  });
});
