import { BsCart3, BsMoonFill, BsSunFill } from 'react-icons/bs';
import { FaBarsStaggered } from 'react-icons/fa6';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import NavLinks from './NavLinks';

const Nav = styled.nav`
  background-color: #f2f2f2;
`;

const NavbarContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavbarStart = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const NavbarCenter = styled.div`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

const NavbarEnd = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Logo = styled(NavLink)`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }

  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;

  background-color: #570df8;
  color: white;
  font-size: 1.875rem;
  font-weight: 700;
  border-radius: 0.5rem;
  text-decoration: none;
`;

const MenuButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const Dropdown = styled.div`
  position: relative;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 2.5rem;
  left: 0;

  background-color: #f2f2f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.15);

  width: 13rem;
  list-style: none;

  display: none;

  ${Dropdown}:hover & {
    display: block;
  }
`;

const HorizontalMenu = styled.ul`
  display: flex;
  gap: 1.5rem;
  list-style: none;
`;

const Navbar: React.FC = () => {
  return (
    <Nav>
      <NavbarContainer>
        <NavbarStart>
          {/* LOGO */}
          <Logo to="/">V</Logo>

          {/* MOBILE MENU */}
          <Dropdown>
            <MenuButton>
              <FaBarsStaggered size={24} />
            </MenuButton>
            <DropdownMenu>
              <NavLinks />
            </DropdownMenu>
          </Dropdown>
        </NavbarStart>

        {/* DESKTOP MENU */}
        <NavbarCenter>
          <HorizontalMenu>
            <NavLinks />
          </HorizontalMenu>
        </NavbarCenter>

        <NavbarEnd>
          {/* Theme toggle and cart can be added here later */}
        </NavbarEnd>
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
