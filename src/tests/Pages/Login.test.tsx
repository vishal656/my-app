import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { vi } from 'vitest';

import Login, { action } from '../../pages/Login';
import userReducer, { loginUser } from '../../features/user/userSlice';
import { toast } from 'react-toastify';
import { customFetch } from '../../utils';

/* ------------------ MOCKS ------------------ */
vi.mock('../../utils', () => ({
  customFetch: {
    post: vi.fn().mockResolvedValue({
      data: {
        user: { username: 'test', email: 'test@test.com' },
        jwt: 'fake-token',
      },
    }),
  },
}));

vi.mock('react-toastify', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const navigateMock = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual: any = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

/* ------------------ STORE ------------------ */
const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

/* ------------------ RENDER ------------------ */
const renderLogin = () => {
  const router = createMemoryRouter(
    [
      { path: '/', element: <Login /> },
      { path: '/admin', element: <div>Admin</div> },
      { path: '/vendor', element: <div>Vendor</div> },
    ],
    { initialEntries: ['/'] }
  );

  return render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

/* ------------------ TESTS ------------------ */
describe('Login component – high coverage', () => {
  it('renders all UI elements', () => {
    renderLogin();

    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^login$/i })).toBeInTheDocument();
    expect(screen.getByText(/guest user/i)).toBeInTheDocument();
    expect(screen.getByText(/admin login/i)).toBeInTheDocument();
    expect(screen.getByText(/vendor login/i)).toBeInTheDocument();
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });

  it('allows typing into email and password fields', async () => {
    const { container } = renderLogin();
    const user = userEvent.setup();

    const emailInput = container.querySelector(
      'input[name="identifier"]'
    ) as HTMLInputElement;
    const passwordInput = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    expect(emailInput.value).toBe('test@test.com');
    expect(passwordInput.value).toBe('password123');
  });

  it('submits login form after filling inputs', async () => {
    const { container } = renderLogin();
    const user = userEvent.setup();

    const emailInput = container.querySelector(
      'input[name="identifier"]'
    ) as HTMLInputElement;
    const passwordInput = container.querySelector(
      'input[name="password"]'
    ) as HTMLInputElement;

    await user.type(emailInput, 'test@test.com');
    await user.type(passwordInput, 'password123');

    const submitBtn = screen.getByRole('button', { name: /^login$/i });
    await user.click(submitBtn);

    expect(submitBtn).toBeDisabled(); // during submit
  });

  it('handles guest login click', async () => {
    renderLogin();
    const user = userEvent.setup();

    await user.click(screen.getByText(/guest user/i));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/');
    });
  });

  it('handles admin login click', async () => {
    renderLogin();
    const user = userEvent.setup();

    await user.click(screen.getByText(/admin login/i));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/admin');
    });
  });

  it('handles vendor login click', async () => {
    renderLogin();
    const user = userEvent.setup();

    await user.click(screen.getByText(/vendor login/i));

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/vendor');
    });
  });

  /* ------------------ NEW: action tests ------------------ */
  it('action returns validation error when fields missing', async () => {
    const formData = new FormData(); // empty
    const request = new Request('http://localhost/', { method: 'POST', body: formData });
    const result = await action(store as any)({ request });

    expect(result.errors.identifier).toBeDefined();
    expect(result.errors.password).toBeDefined();
    expect(toast.error).toHaveBeenCalledWith('Please fill in all required fields');
  });

  it('action handles login failure', async () => {
    (customFetch.post as any).mockRejectedValueOnce({ response: { data: { error: { message: 'fail' } } } });

    const formData = new FormData();
    formData.append('identifier', 'test@test.com');
    formData.append('password', 'password123');
    const request = new Request('http://localhost/', { method: 'POST', body: formData });

    const result = await action(store as any)({ request });
    expect(result).toBeNull();
    expect(toast.error).toHaveBeenCalledWith('fail');
  });
});
