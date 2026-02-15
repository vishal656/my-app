import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';

import Navbar from '../../components/Navbar';
import userReducer from '../../features/user/userSlice';
import cartReducer from '../../features/cart/cartSlice';

// 🔹 mock NavLinks (not testing it here)
vi.mock('../../components/NavLinks', () => ({
  default: () => <li>Mock NavLinks</li>,
}));

const renderNavbar = (preloadedState: any) => {
  const store = configureStore({
    reducer: {
      userState: userReducer,
      cartState: cartReducer,
    },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    </Provider>,
  );
};

describe('Navbar component', () => {
  it('renders navbar and nav links', () => {
    renderNavbar({
      userState: { user: null },
      cartState: { numItemsInCart: 0 },
    });

    expect(screen.getAllByText('Mock NavLinks').length).toBeGreaterThan(0);
  });

  it('dispatches theme toggle on checkbox change', () => {
    renderNavbar({
      userState: { user: null },
      cartState: { numItemsInCart: 0 },
    });

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('shows cart icon for normal user', () => {
    renderNavbar({
      userState: { user: { role: 'user' } },
      cartState: { numItemsInCart: 3 },
    });

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('hides cart icon for admin', () => {
    renderNavbar({
      userState: { user: { role: 'admin' } },
      cartState: { numItemsInCart: 5 },
    });

    expect(screen.queryByText('5')).not.toBeInTheDocument();
  });

  it('hides cart icon for vendor', () => {
    renderNavbar({
      userState: { user: { role: 'vendor' } },
      cartState: { numItemsInCart: 2 },
    });

    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('shows admin dashboard link for admin user', () => {
    renderNavbar({
      userState: { user: { role: 'admin' } },
      cartState: { numItemsInCart: 0 },
    });

    expect(screen.getByText(/admin dashboard/i)).toBeInTheDocument();
  });

  it('shows vendor dashboard link for vendor user', () => {
    renderNavbar({
      userState: { user: { role: 'vendor' } },
      cartState: { numItemsInCart: 0 },
    });

    expect(screen.getByText(/vendor dashboard/i)).toBeInTheDocument();
  });
});
