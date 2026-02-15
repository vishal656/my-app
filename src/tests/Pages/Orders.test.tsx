import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import Orders, { loader } from '../../pages/Orders';
import * as ReactRouter from 'react-router-dom';
import { vi } from 'vitest';
import { toast } from 'react-toastify';
import { customFetch } from '../../utils';

// --- Mock react-router-dom ---
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
    redirect: vi.fn((url: string) => ({ status: 302, headers: new Map([['Location', url]]) })),
  };
});

// --- Mock toast ---
vi.mock('react-toastify', () => ({
  toast: { warn: vi.fn(), error: vi.fn() },
}));

// --- Mock customFetch ---
vi.mock('../../utils', () => ({
  customFetch: { get: vi.fn() },
}));

describe('Orders Component & Loader', () => {
  const fakeOrders = [
    {
      id: 1,
      attributes: {
        name: 'John Doe',
        address: '123 Main St',
        numItemsInCart: 2,
        orderTotal: 49.99,
        createdAt: new Date().toISOString(),
      },
    },
  ];

  const mockStore = {
    getState: () => ({ userState: { user: { username: 'u', token: 't' } } }),
    subscribe: vi.fn(),
    dispatch: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // --- Component Tests ---
  test('renders "please make an order" when no orders', () => {
    (ReactRouter.useLoaderData as vi.Mock).mockReturnValue({
      orders: [],
      meta: { pagination: { total: 0 } },
    });

    render(
      <Provider store={mockStore as any}>
        <MemoryRouter>
          <Orders />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/please make an order/i)).toBeInTheDocument();
  });

  test('renders orders list and pagination when orders exist', () => {
    (ReactRouter.useLoaderData as vi.Mock).mockReturnValue({
      orders: fakeOrders,
      meta: { pagination: { total: 1 } },
    });

    render(
      <Provider store={mockStore as any}>
        <MemoryRouter>
          <Orders />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/your orders/i)).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/John Doe/i)).toBeInTheDocument();
    expect(screen.getByText(/123 Main St/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('49.99')).toBeInTheDocument();
  });

  // --- Loader Tests ---
  test('loader redirects when no user', async () => {
    const noUserStore = { ...mockStore, getState: () => ({ userState: { user: null } }) };
    const queryClient = { ensureQueryData: vi.fn() };

    const result = await loader(noUserStore as any, queryClient)({
      request: new Request('http://localhost/'), // fully qualified URL
    });

    expect(result.status).toBe(302);
  });

  test('loader returns orders when query succeeds', async () => {
    const queryClient = {
      ensureQueryData: vi.fn().mockResolvedValue({
        data: { data: fakeOrders, meta: { pagination: { total: 1 } } },
      }),
    };

    const result = await loader(mockStore as any, queryClient)({
      request: new Request('http://localhost/'),
    });

    expect(result.orders).toEqual(fakeOrders);
    expect(result.meta.pagination.total).toBe(1);
  });

  test('loader returns empty orders and toast error when query fails', async () => {
    const queryClient = {
      ensureQueryData: vi.fn().mockRejectedValue({
        response: { data: { error: { message: 'fail' } } },
      }),
    };

    const result = await loader(mockStore as any, queryClient)({
      request: new Request('http://localhost/'),
    });

    expect(result.orders).toEqual([]);
    expect(result.meta.pagination.total).toBe(0);
    expect(toast.error).toHaveBeenCalledWith('fail');
  });

  test('loader redirects on 401/403', async () => {
    const queryClient = {
      ensureQueryData: vi.fn().mockRejectedValue({ response: { status: 401 } }),
    };

    const result = await loader(mockStore as any, queryClient)({
      request: new Request('http://localhost/'),
    });

    expect(result.status).toBe(302);
  });
});
