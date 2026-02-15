import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ErrorElement from '../../components/ErrorElement';

// ✅ mock react-router hook
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useRouteError: () => ({
      status: 404,
      statusText: 'Not Found',
    }),
  };
});

describe('ErrorElement', () => {
  it('renders error message when route error occurs', () => {
    // silence console.log during test
    vi.spyOn(console, 'log').mockImplementation(() => {});

    render(<ErrorElement />);

    expect(
      screen.getByText('There was an error...')
    ).toBeInTheDocument();
  });
});
