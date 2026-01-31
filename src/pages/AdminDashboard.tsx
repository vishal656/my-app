import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { customFetch, formatPrice } from '../utils';

const AdminDashboard = () => {
  const user = useSelector((state) => state.userState.user);

  // State for API data
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from Strapi
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Featured products
        const featuredRes = await customFetch.get('/products?featured=true');
        setFeaturedProducts(featuredRes.data.data);

        // All products
        const allRes = await customFetch.get('/products');
        setAllProducts(allRes.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fake total users (replace with API later if available)
  const totalUsers = 54;

  return (
    <section className="p-8 bg-base-200 min-h-screen space-y-10">
      {/* 🔹 Header */}
      <div>
        <h1 className="text-3xl font-bold">Welcome, {user?.username || 'Admin'} 👋</h1>
        <p className="opacity-70">Role: {user?.role}</p>
      </div>

      {/* 🔹 Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Total Products</h3>
          <p className="text-3xl font-bold mt-2">{allProducts.length}</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Total Users</h3>
          <p className="text-3xl font-bold mt-2">{totalUsers}</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3 className="text-lg">Featured Items</h3>
          <p className="text-3xl font-bold mt-2">{featuredProducts.length}</p>
        </div>
      </div>

      {/* 🔹 Quick Actions */}
      {/* <div className="flex flex-wrap gap-4">
        <button className="btn btn-primary">Add Product</button>
        <button className="btn btn-secondary">View Orders</button>
        <button className="btn btn-accent">Manage Users</button>
      </div> */}

      {/* 🔹 Featured Products Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Products</h2>

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

      {/* 🔹 All Products Table */}
      <div>
        <h2 className="text-xl font-bold mb-4">All Products</h2>

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
                  <th>Featured</th>
                </tr>
              </thead>
              <tbody>
                {allProducts.map((item) => {
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

      {/* 🔹 Chart Placeholder */}
      <div className="card bg-base-100 shadow p-6">
        <h2 className="text-xl font-bold mb-2">Sales Overview</h2>
        <p className="opacity-60">Chart coming soon...</p>
      </div>
    </section>
  );
};

export default AdminDashboard;
