import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { ModalProvider } from '../../context/ModalContext';
import './styles.scss';

const Layout = () => {
  return (
    <div className="layout">
      <ModalProvider>
        <SideBar />
        <Header />
        <main className="main mx--auto p--16">
          <Outlet />
        </main>
        <Footer />
      </ModalProvider>
    </div>
  );
};

export default Layout;
