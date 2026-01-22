import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

type LinkItem = {
  id: number;
  url: string;
  text: string;
};

const links: LinkItem[] = [
  { id: 1, url: '/', text: 'home' },
  { id: 2, url: 'about', text: 'about' },
  { id: 3, url: 'products', text: 'products' },
  { id: 4, url: 'cart', text: 'cart' },
  { id: 5, url: 'checkout', text: 'checkout' },
  // { id: 6, url: 'orders', text: 'orders' },
  { id: 7, url: 'contact', text: 'contact' },
];

const ListItem = styled.li`
  list-style: none;
`;

const StyledNavLink = styled(NavLink)`
  text-transform: capitalize;
  text-decoration: none;
  font-weight: 500;
  color: inherit;

  &.active {
    font-weight: 700;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const NavLinks: React.FC = () => {
  return (
    <>
      {links.map(({ id, url, text }) => (
        <ListItem key={id}>
          <StyledNavLink to={url}>{text}</StyledNavLink>
        </ListItem>
      ))}
    </>
  );
};

export default NavLinks;
