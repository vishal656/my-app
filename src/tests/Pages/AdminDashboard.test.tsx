import { render, screen, waitFor, within, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';
import AdminDashboard from '../../pages/AdminDashboard';

/* =========================
   TEST DATA
========================= */

const productsMock = [
  {
    id: 1,
    attributes: {
      title: 'Chair',
      company: 'IKEA',
      price: 100,
      category: 'furniture',
      featured: true,
    },
  },
  {
    id: 2,
    attributes: {
      title: 'Table',
      company: 'IKEA',
      price: 200,
      category: 'furniture',
      featured: false,
    },
  },
];

/* =========================
   MOCKS
========================= */

vi.mock('../../utils/stock', () => ({
  getProductStock: vi.fn((id: number) => (id === 1 ? 0 : 5)),
  increaseProductStock: vi.fn(),
}));

vi.mock('../../utils', async () => {
  const actual = await vi.importActual<any>('../../utils');
  return {
    ...actual,
    customFetch: {
      get: vi.fn(),
    },
    formatPrice: vi.fn((price: number) => `$${price}`),
  };
});

/* =========================
   STORE
========================= */

const store = configureStore({
  reducer: {
    userState: () => ({
      user: { username: 'Admin', role: 'admin' },
    }),
  },
});

/* =========================
   RENDER HELPER
========================= */

const renderDashboard = () =>
  render(
    <Provider store={store}>
      <AdminDashboard />
    </Provider>
  );

/* =========================
   TESTS
========================= */

describe('AdminDashboard – fixed & stable', () => {
  beforeEach(async () => {
    const { customFetch } = await import('../../utils');

    customFetch.get
      .mockResolvedValueOnce({
        data: { data: productsMock.filter(p => p.attributes.featured) },
      })
      .mockResolvedValueOnce({
        data: { data: productsMock },
      });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders welcome message and role', async () => {
    renderDashboard();

    expect(await screen.findByText(/welcome,\s*admin/i)).toBeInTheDocument();
    expect(screen.getByText(/role:\s*admin/i)).toBeInTheDocument();
  });

  it('renders stats cards', async () => {
    renderDashboard();

    await screen.findByText('Total Products');

    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('54')).toBeInTheDocument();
  });

  it('renders Featured Products table', async () => {
    renderDashboard();

    // wait for loading to disappear
    await waitFor(() => {
      expect(
        screen.queryByText(/loading featured products/i)
      ).not.toBeInTheDocument();
    });

    const section = screen.getByText('Featured Products');

    const table = await within(section.parentElement!).findByRole('table');

    expect(within(table).getByText('Chair')).toBeInTheDocument();
    expect(within(table).getByText('Yes')).toBeInTheDocument();
  });

  it('renders All Products table', async () => {
    renderDashboard();

    const section = await screen.findByText('All Products (Stock Control)');
    const table = await within(section.parentElement!).findByRole('table');

    expect(within(table).getByText('Chair')).toBeInTheDocument();
    expect(within(table).getByText('Table')).toBeInTheDocument();
  });

  it('renders products with stock values', async () => {
    renderDashboard();

    const section = await screen.findByText('All Products (Stock Control)');
    const table = await within(section.parentElement!).findByRole('table');

    expect(within(table).getByText('Out of Stock')).toBeInTheDocument();
    expect(within(table).getByText('5')).toBeInTheDocument();
  });

  it('increments product stock using buttons', async () => {
    const { increaseProductStock } = await import('../../utils/stock');

    renderDashboard();

    const section = await screen.findByText('All Products (Stock Control)');
    const table = await within(section.parentElement!).findByRole('table');

    const plusOneButtons = within(table).getAllByText('+1');
    const plusFiveButtons = within(table).getAllByText('+5');

    fireEvent.click(plusOneButtons[0]);
    fireEvent.click(plusFiveButtons[1]);

    expect(increaseProductStock).toHaveBeenCalledWith(1, 1);
    expect(increaseProductStock).toHaveBeenCalledWith(2, 5);
  });

  it('handles API error gracefully', async () => {
    const { customFetch } = await import('../../utils');

    customFetch.get.mockRejectedValueOnce(new Error('API failed'));

    renderDashboard();

    expect(await screen.findByText(/sales overview/i)).toBeInTheDocument();
  });
});
