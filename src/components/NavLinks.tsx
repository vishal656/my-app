import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const links = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  // { id: 6, url: 'orders', text: 'orders' },
  { id: 6, url: 'contact', text: 'contact' },
  { id: 7, url: 'admin', text: 'admin' },
];

const NavLinks = () => {
  const user = useSelector((state) => state.userState.user);
  return (
    <>
      {links.map((link) => {
        const { id, url, text } = link;

        // Hide admin link if user is not admin
        if (url === 'admin' && user?.role !== 'admin') return false;

        // Hide cart & checkout for admin
        if ((url === 'cart' || url === 'checkout') && user?.role === 'admin') return false;

        // Hide checkout/orders if user is not logged in
        if ((url === 'checkout' || url === 'orders') && !user) return false;
        return (
          <li key={id}>
            <NavLink className="capitalize" to={url}>
              {text}
            </NavLink>
          </li>
        );
      })}
    </>
  );
};
export default NavLinks;
