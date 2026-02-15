import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Header from '../../components/Header';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../features/cart/cartSlice';
import userReducer from '../../features/user/userSlice';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/* ---------------- MOCKS ---------------- */

// mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

/* ---------------- HELPERS ---------------- */

const createTestStore = (user: any) =>
  configureStore({
    reducer: {
      cartState: cartReducer,
      userState: userReducer,
    },
    preloadedState: {
      userState: { user },
      cartState: {
        cartItems: [],
        numItemsInCart: 0,
        cartTotal: 0,
        shipping: 0,
        tax: 0,
        orderTotal: 0,
      },
    },
  });

const renderHeader = (user: any) => {
  const store = createTestStore(user);
  const queryClient = new QueryClient();

  return {
    store,
    queryClient,
    ...render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <MemoryRouter>
            <Header />
          </MemoryRouter>
        </Provider>
      </QueryClientProvider>,
    ),
  };
};

/* ---------------- TESTS ---------------- */

describe('Header component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login and register links when user is NOT logged in', () => {
    renderHeader(null);

    expect(screen.getByText(/sign in \/ guest/i)).toBeInTheDocument();
    expect(screen.getByText(/create account/i)).toBeInTheDocument();
  });

  it('renders username and logout button when user IS logged in', () => {
    renderHeader({ username: 'vishal', token: '123' });

    expect(screen.getByText(/hello, vishal/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /logout/i })).toBeInTheDocument();
  });

  it('logs out user correctly when logout button is clicked', () => {
    const { store } = renderHeader({ username: 'vishal', token: '123' });

    fireEvent.click(screen.getByRole('button', { name: /logout/i }));

    const state = store.getState();

    // navigation
    expect(mockNavigate).toHaveBeenCalledWith('/');

    // redux state reset
    expect(state.userState.user).toBeNull();
    expect(state.cartState.cartItems).toHaveLength(0);
  });
});
