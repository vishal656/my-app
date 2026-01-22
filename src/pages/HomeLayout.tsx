import { Outlet, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import Navbar  from '../components/Navbar';

const MainSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 1rem;
`;

const HomeLayout: React.FC = () => {
  const navigation = useNavigation();

  return (
    <>
      <Navbar />
      <Outlet/>
    </>
  );
};

export default HomeLayout;
