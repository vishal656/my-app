import { FeaturedProducts, Hero } from '../components';
import Wrapper from '../components/Wrapper';

import { customFetch } from '../utils';
const url = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => customFetch(url),
};

export const loader = (queryClient) => async () => {
  const response = await queryClient.ensureQueryData(featuredProductsQuery);

  const products = response.data.data;
  return { products };
};

///////https://strapi-store-server.onrender.com/api/products?featured=true

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <Wrapper/>
    </>
  );
};
export default Landing;
