import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customFetch, formatPrice } from '../utils';
import {
  getProductStock,
  increaseProductStock,
} from '../utils/stock';

const AdminDashboard = () => {
  const user = useSelector((state) => state.userState.user);

  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔄 force re-render after stock update
  const [, forceUpdate] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchData = async () => {
      try {
        const featuredRes = await customFetch.get(
          '/products?featured=true'
        );
        const allRes = await customFetch.get('/products');

        setFeaturedProducts(featuredRes.data.data);
        setAllProducts(allRes.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalUsers = 54;

  return (
    <section className="p-8 bg-base-200 min-h-screen space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome, {user?.username || 'Admin'} 👋
        </h1>
        <p className="opacity-70">Role: {user?.role}</p>
      </div>

      {/* STATS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Total Products</h3>
          <p className="text-3xl font-bold mt-2">
            {allProducts.length}
          </p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-3xl font-bold mt-2">
            {totalUsers}
          </p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Featured Items</h3>
          <p className="text-3xl font-bold mt-2">
            {featuredProducts.length}
          </p>
        </div>
      </div>

      {/* FEATURED PRODUCTS */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          Featured Products
        </h2>

        {loading ? (
          <p>Loading featured products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-100 shadow">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Featured</th>
                </tr>
              </thead>
              <tbody>
                {featuredProducts.map((item) => {
                  const p = item.attributes;
                  return (
                    <tr key={item.id}>
                      <td>{p.title}</td>
                      <td>{p.company}</td>
                      <td>{formatPrice(p.price)}</td>
                      <td>{p.category}</td>
                      <td>{p.featured ? 'Yes' : 'No'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ALL PRODUCTS WITH STOCK CONTROL */}
      <div>
        <h2 className="text-xl font-bold mb-4">
          All Products (Stock Control)
        </h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table w-full bg-base-100 shadow">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((item) => {
                  const p = item.attributes;
                  const stock = getProductStock(item.id);

                  return (
                    <tr key={item.id}>
                      <td>{p.title}</td>
                      <td>{p.company}</td>
                      <td>{formatPrice(p.price)}</td>
                      <td>{p.category}</td>

                      {/* STOCK */}
                      <td
                        className={`font-semibold ${
                          stock === 0
                            ? 'text-red-500'
                            : 'text-green-600'
                        }`}
                      >
                        {stock === 0
                          ? 'Out of Stock'
                          : stock}
                      </td>

                      {/* ACTIONS */}
                      <td className="space-x-2">
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => {
                            increaseProductStock(item.id, 1);
                            forceUpdate((v) => v + 1);
                          }}
                        >
                          +1
                        </button>

                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => {
                            increaseProductStock(item.id, 5);
                            forceUpdate((v) => v + 1);
                          }}
                        >
                          +5
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* PLACEHOLDER */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-bold mb-2">
          Sales Overview
        </h2>
        <p className="opacity-60">Chart coming soon...</p>
      </div>
    </section>
  );
};

export default AdminDashboard;
