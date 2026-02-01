import { useSelector } from 'react-redux';

const VendorDashboard = () => {
  const user = useSelector((state) => state.userState.user);

  return (
    <section className="p-8 bg-base-200 min-h-screen">
      <h1 className="text-3xl font-bold">
        Welcome Vendor, {user?.username} 🏪
      </h1>
      <p className="opacity-70 mb-6">Role: {user?.role}</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card bg-base-100 shadow p-6">
          <h3>Your Products</h3>
          <p className="text-2xl font-bold mt-2">12</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3>Orders Received</h3>
          <p className="text-2xl font-bold mt-2">34</p>
        </div>

        <div className="card bg-base-100 shadow p-6">
          <h3>Earnings</h3>
          <p className="text-2xl font-bold mt-2">$1,240</p>
        </div>
      </div>
    </section>
  );
};

export default VendorDashboard;
