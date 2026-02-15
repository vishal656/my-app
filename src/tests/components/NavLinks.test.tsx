import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import NavLinks from '../../components/NavLinks';
import userReducer from '../../features/user/userSlice';

/* ---------- helper render function ---------- */
const renderWithUser = (user: any) => {
  const store = configureStore({
    reducer: {
      userState: userReducer,
    },
    preloadedState: {
      userState: { user },
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <ul>
          <NavLinks />
        </ul>
      </MemoryRouter>
    </Provider>
  );
};

/* ---------- TESTS ---------- */
describe('NavLinks component', () => {
  test('renders correct links for guest user', () => {
    renderWithUser(null);

    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/products/i)).toBeInTheDocument();
    expect(screen.getByText(/cart/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();

    expect(screen.queryByText(/checkout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/orders/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vendor/i)).not.toBeInTheDocument();
  });

  test('renders checkout and orders for logged-in user', () => {
    renderWithUser({ role: 'user' });

    expect(screen.getByText(/checkout/i)).toBeInTheDocument();
    expect(screen.getByText(/orders/i)).toBeInTheDocument();

    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vendor/i)).not.toBeInTheDocument();
  });

  test('renders only admin links for admin user', () => {
    renderWithUser({ role: 'admin' });

    expect(screen.getByText(/admin/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();

    expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/products/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/checkout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/orders/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/vendor/i)).not.toBeInTheDocument();
  });

  test('renders only vendor links for vendor user', () => {
    renderWithUser({ role: 'vendor' });

    expect(screen.getByText(/vendor/i)).toBeInTheDocument();
    expect(screen.getByText(/about/i)).toBeInTheDocument();
    expect(screen.getByText(/contact/i)).toBeInTheDocument();

    expect(screen.queryByText(/home/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/products/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/cart/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/checkout/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/orders/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/admin/i)).not.toBeInTheDocument();
  });
});
