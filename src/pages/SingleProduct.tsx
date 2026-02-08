import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLoaderData } from 'react-router-dom';
import { addItem } from '../features/cart/cartSlice';
import { customFetch, formatPrice, generateAmountOptions } from '../utils';
import { getProductStock } from '../utils/stock';

// --------------------
// React Query
// --------------------
const singleProductQuery = (id) => {
  return {
    queryKey: ['singleProduct', id],
    queryFn: () => customFetch(`/products/${id}`),
  };
};

// --------------------
// Loader (ADD STOCK HERE)
// --------------------
export const loader =
  (queryClient) =>
  async ({ params }) => {
    const response = await queryClient.ensureQueryData(
      singleProductQuery(params.id)
    );

    // ⬇️ Inject frontend stock (API has no stock)
    const product = {
      ...response.data.data,
      // stock: Math.floor(Math.random() * 6), // 0–5
      stock: getProductStock(response.data.data.id),
    };

    return { product };
  };

// --------------------
// Component
// --------------------
const SingleProduct = () => {
  const { product } = useLoaderData();
  const dispatch = useDispatch();

  const { stock } = product;
  const { image, title, price, description, colors, company } =
    product.attributes;

  const dollarsAmount = formatPrice(price);

  const [productColor, setProductColor] = useState(colors[0]);
  const [amount, setAmount] = useState(1);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  };

  // --------------------
  // Cart Product Object
  // --------------------
  const cartProduct = {
    cartID: product.id + productColor,
    productID: product.id,
    image,
    title,
    price,
    company,
    productColor,
    amount,
    stock, // 👈 important for cart validation
  };

  const addToCartHandler = () => {
    if (stock === 0) return; // safety
    dispatch(addItem({ product: cartProduct }));
  };

  return (
    <section>
      {/* BREADCRUMBS */}
      <div className="text-md breadcrumbs">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </div>

      {/* PRODUCT */}
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/* IMAGE */}
        <img
          src={image}
          alt={title}
          className="w-96 h-96 object-cover rounded-lg lg:w-full"
        />

        {/* DETAILS */}
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">
            {company}
          </h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>

          {/* STOCK STATUS */}
          <p
            className={`mt-2 font-medium ${
              stock === 0 ? 'text-red-500' : 'text-green-600'
            }`}
          >
            {stock === 0 ? 'Out of Stock' : `In Stock (${stock})`}
          </p>

          <p className="mt-6 leading-8">{description}</p>

          {/* COLORS */}
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">
              colors
            </h4>
            <div className="mt-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`badge w-6 h-6 mr-2 ${
                    color === productColor &&
                    'border-2 border-secondary'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setProductColor(color)}
                />
              ))}
            </div>
          </div>

          {/* QUANTITY */}
          <div className="form-control w-full max-w-xs mt-6">
            <label className="label" htmlFor="amount">
              <h4 className="text-md font-medium capitalize">Quantity</h4>
            </label>
            <select
              className="select select-secondary select-bordered select-md"
              id="amount"
              value={amount}
              onChange={handleAmount}
              disabled={stock === 0}
            >
              {generateAmountOptions(stock)}
            </select>
          </div>

          {/* ADD TO CART */}
          <div className="mt-10">
            <button
              className="btn btn-secondary btn-md"
              onClick={addToCartHandler}
              disabled={stock === 0}
            >
              {stock === 0 ? 'Out of Stock' : 'Add to bag'}
            </button>

            {stock === 0 && (
              <p className="mt-2 text-red-500 font-medium">
                This product is currently unavailable
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
