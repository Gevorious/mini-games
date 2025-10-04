import { Outlet } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import { ModalProvider } from '../../context/ModalContext';
import { FaBan, FaMobileAlt } from 'react-icons/fa';
import './styles.scss';

const Layout = () => {
  return (
    <>
      <div className="notification flex--column justify--center align--center">
        <span className="notification-icons mb--24 relative">
          <FaMobileAlt size={45} color="gray" />
          <FaBan size={45} color="red" className="ban-icon absolute" />
        </span>
        <span>This app is only available on desktop screen size</span>
      </div>
      <div className="layout">
        <SideBar />
        <Header />
        <main className="main mx--auto p--16">
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
