import { redirect, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ComplexPaginationContainer, OrdersList, SectionTitle } from '../components';
import { customFetch } from '../utils';

const ordersQuery = (params, user) => {
  return {
    queryKey: ['orders', user.username, params.page ? parseInt(params.page) : 1],
    queryFn: () =>
      customFetch.get('/orders', {
        params: {
          ...params,
          sort: ['createdAt:desc'], // 🔥 latest first
        },
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }),
  };
};

export const loader =
  (store, queryClient) =>
  async ({ request }) => {
    const user = store.getState().userState.user;

    if (!user) {
      toast.warn('You must logged in to view orders');
      return redirect('/login');
    }
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()]);
    try {
      const response = await queryClient.ensureQueryData(ordersQuery(params, user));

      return { orders: response.data.data, meta: response.data.meta };
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message || 'there was an error placing your order';
      toast.error(errorMessage);
      if (error?.response?.status === 401 || error?.response?.status === 403)
        return redirect('/login');
      // return null;
      return {
        orders: [],
        meta: { pagination: { total: 0 } },
      };
    }
  };

const Orders = () => {
  const { meta } = useLoaderData();
  if (!meta || meta.pagination.total < 1) {
    return <SectionTitle text="please make an order" />;
  }
  return (
    <>
      <SectionTitle text="Your Orders" />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  );
};
export default Orders;
