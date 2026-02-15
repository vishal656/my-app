import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import OrdersList from '../../components/OrdersList';

/* ---------- MOCK react-router-dom ---------- */
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

import { useLoaderData } from 'react-router-dom';

describe('OrdersList component', () => {
  it('renders table headers and order data correctly', () => {
    (useLoaderData as any).mockReturnValue({
      orders: [
        {
          id: 1,
          attributes: {
            name: 'John Doe',
            address: 'New York',
            numItemsInCart: 3,
            orderTotal: 25000,
            createdAt: '2024-01-10T16:00:00Z',
          },
        },
      ],
      meta: {
        pagination: { total: 1 },
      },
    });

    render(<OrdersList />);

    /* ---- HEADER ---- */
    expect(screen.getByText(/total orders\s*:\s*1/i)).toBeInTheDocument();

    /* ---- TABLE HEADERS ---- */
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Address')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Cost')).toBeInTheDocument();
    expect(screen.getByText('Date')).toBeInTheDocument();

    /* ---- ROW DATA ---- */
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('New York')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // IMPORTANT: component renders RAW number
    expect(screen.getByText('25000')).toBeInTheDocument();

    // Date is formatted via dayjs
    expect(screen.getByText(/jan 10th, 2024/i)).toBeInTheDocument();
  });

  it('renders empty table when there are no orders', () => {
    (useLoaderData as any).mockReturnValue({
      orders: [],
      meta: {
        pagination: { total: 0 },
      },
    });

    render(<OrdersList />);

    expect(screen.getByText(/total orders\s*:\s*0/i)).toBeInTheDocument();

    // Table body exists but has no rows
    const rows = screen.queryAllByRole('row');
    expect(rows.length).toBe(1); // header row only
  });
});
