import { memo } from 'react';
import { Outlet, useNavigation } from 'react-router-dom';
import { Header, Loading, Navbar } from '../components';
import Footer from '../components/Footer';

const HomeLayout = () => {
  const navigation = useNavigation();
  const isPageLoading = navigation.state === 'loading';
  return (
    <>
      <MemoHeader />
      <MemoNavbar />
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
      <MemoFooter />
    </>
  );
};

const MemoHeader = memo(Header);
const MemoNavbar = memo(Navbar);
const MemoFooter = memo(Footer);
export default HomeLayout;
