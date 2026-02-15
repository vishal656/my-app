import { describe, it, vi, expect, beforeEach } from 'vitest';
import { action } from '../../components/CheckoutForm';
import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../../features/cart/cartSlice';

/* ---------------- mocks ---------------- */

vi.mock('../../utils', () => ({
  customFetch: {
    post: vi.fn(),
  },
  formatPrice: vi.fn(() => '$500'),
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    redirect: vi.fn(),
  };
});

/* ---------------- helpers ---------------- */

const mockStore = {
  getState: vi.fn(() => ({
    userState: {
      user: { token: 'test-token' },
    },
    cartState: {
      cartItems: [{ id: 1 }],
      orderTotal: 500,
      numItemsInCart: 1,
    },
  })),
  dispatch: vi.fn(),
};

const mockQueryClient = {
  removeQueries: vi.fn(),
};

const mockRequest = (data: Record<string, string>) =>
  ({
    formData: async () =>
      new Map(Object.entries(data)),
  } as any);

/* ---------------- tests ---------------- */

describe('CheckoutForm action – coverage booster', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('successfully places order and redirects to /orders', async () => {
    const { customFetch } = await import('../../utils');

    (customFetch.post as any).mockResolvedValue({});

    await action(mockStore as any, mockQueryClient as any)({
      request: mockRequest({
        name: 'John',
        address: 'NY',
        paymentId: 'pay_123',
      }),
    });

    expect(customFetch.post).toHaveBeenCalled();
    expect(mockQueryClient.removeQueries).toHaveBeenCalledWith(['orders']);
    expect(mockStore.dispatch).toHaveBeenCalledWith(clearCart());
    expect(toast.success).toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledWith('/orders');
  });

  it('redirects to login on 401 error', async () => {
    const { customFetch } = await import('../../utils');

    (customFetch.post as any).mockRejectedValue({
      response: { status: 401 },
    });

    await action(mockStore as any, mockQueryClient as any)({
      request: mockRequest({
        name: 'John',
        address: 'NY',
        paymentId: 'pay_123',
      }),
    });

    expect(toast.error).toHaveBeenCalledWith(
      'Session expired. Please login again.',
    );
    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('redirects to login on 403 error', async () => {
    const { customFetch } = await import('../../utils');

    (customFetch.post as any).mockRejectedValue({
      response: { status: 403 },
    });

    await action(mockStore as any, mockQueryClient as any)({
      request: mockRequest({
        name: 'John',
        address: 'NY',
        paymentId: 'pay_123',
      }),
    });

    expect(redirect).toHaveBeenCalledWith('/login');
  });

  it('shows generic error message on order creation failure', async () => {
    const { customFetch } = await import('../../utils');

    (customFetch.post as any).mockRejectedValue({
      response: {
        data: {
          error: { message: 'Order failed' },
        },
      },
    });

    const result = await action(mockStore as any, mockQueryClient as any)({
      request: mockRequest({
        name: 'John',
        address: 'NY',
        paymentId: 'pay_123',
      }),
    });

    expect(toast.error).toHaveBeenCalledWith('Order failed');
    expect(result).toBeNull();
  });
});
