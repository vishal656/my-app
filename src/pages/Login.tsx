import { FormInput, SubmitBtn } from '../components';
import { Form, Link, redirect, useNavigate } from 'react-router-dom';
import { customFetch } from '../utils';
import { toast } from 'react-toastify';
import { loginUser } from '../features/user/userSlice';
import { useDispatch } from 'react-redux';

export const action =
  (store: any) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const { identifier, password } = data;

    // Frontend validation
    const errors: Record<string, string> = {};
    if (!identifier) errors.identifier = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      toast.error('Please fill in all required fields');
      return { errors, values: data };
    }

    try {
      const response = await customFetch.post('/auth/local', data);
      store.dispatch(
        loginUser({
          ...response.data,
          role: 'user', // default role after normal login
        }),
      );
      toast.success('logged in successfully');
      return redirect('/');
    } catch (error) {
      const errorMessage =
        error?.response?.data?.error?.message || 'please double check your credentials';
      toast.error(errorMessage);
      return null;
    }
  };

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginAsGuestUser = async () => {
    try {
      const response = await customFetch.post('/auth/local', {
        identifier: 'test@test.com',
        password: 'secret',
      });
      dispatch(
        loginUser({
          ...response.data,
          role: 'user',
        }),
      );
      toast.success('welcome guest user');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('guest user login error. please try again');
    }
  };

  const loginAsAdmin = () => {
    dispatch(
      loginUser({
        user: {
          username: 'Admin',
          email: 'admin@site.com',
        },
        jwt: 'fake-admin-token',
        role: 'admin',
      }),
    );
    toast.success('Admin login success');
    navigate('/admin');
  };

  const loginAsVendor = () => {
    dispatch(
      loginUser({
        user: {
          username: 'Vendor',
          email: 'vendor@shop.com',
        },
        jwt: 'fake-vendor-token',
        role: 'vendor',
      }),
    );
    toast.success('Vendor login success');
    navigate('/vendor');
  };

  return (
    <section className="h-screen grid place-items-center">
      <Form method="post" className="card w-96  p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
        <h4 className="text-center text-3xl font-bold">Login</h4>
        <FormInput type="email" label="email" name="identifier" />
        <FormInput type="password" label="password" name="password" />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>
        <button type="button" className="btn btn-secondary btn-block" onClick={loginAsGuestUser}>
          guest user
        </button>
        <button type="button" className="btn btn-accent btn-block" onClick={loginAsAdmin}>
          Admin Login
        </button>
        <button type="button" className="btn btn-info btn-block" onClick={loginAsVendor}>
          Vendor Login
        </button>
        <p className="text-center">
          Not a member yet?{' '}
          <Link to="/register" className="ml-2 link link-hover link-primary capitalize">
            register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
