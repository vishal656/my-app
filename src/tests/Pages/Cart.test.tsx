import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import Cart from '../../pages/Cart';

/* =========================
   MOCK CHILD COMPONENTS
========================= */

vi.mock('../../components', () => ({
  CartItemsList: () => <div data-testid="cart-items">Cart Items</div>,
  CartTotals: () => <div data-testid="cart-totals">Cart Totals</div>,
  SectionTitle: ({ text }: { text: string }) => (
    <h1>{text}</h1>
  ),
}));

/* =========================
   STORE HELPER
========================= */

const renderWithStore = ({
  user,
  numItemsInCart,
}: {
  user: any;
  numItemsInCart: number;
}) => {
  const store = configureStore({
    reducer: {
      userState: () => ({ user }),
      cartState: () => ({ numItemsInCart }),
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    </Provider>
  );
};

/* =========================
   TESTS
========================= */

describe('Cart page – 100% coverage', () => {
  it('shows empty cart message when cart is empty', () => {
    renderWithStore({
      user: null,
      numItemsInCart: 0,
    });

    expect(
      screen.getByText('Your cart is empty')
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId('cart-items')
    ).not.toBeInTheDocument();
  });

  it('renders cart items and totals when cart has items', () => {
    renderWithStore({
      user: null,
      numItemsInCart: 2,
    });

    expect(
      screen.getByText('Shopping Cart')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('cart-items')
    ).toBeInTheDocument();

    expect(
      screen.getByTestId('cart-totals')
    ).toBeInTheDocument();
  });

  it('shows checkout link when user is logged in', () => {
    renderWithStore({
      user: { username: 'admin' },
      numItemsInCart: 3,
    });

    const checkoutLink = screen.getByRole('link', {
      name: /proceed to checkout/i,
    });

    expect(checkoutLink).toBeInTheDocument();
    expect(checkoutLink).toHaveAttribute('href', '/checkout');
  });

  it('shows login link when user is not logged in', () => {
    renderWithStore({
      user: null,
      numItemsInCart: 1,
    });

    const loginLink = screen.getByRole('link', {
      name: /please login/i,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });
});
