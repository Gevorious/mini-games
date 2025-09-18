import './styles.scss';

const Header = () => {
  return (
    <header className="header flex justify--between align--center px--24 sticky">
      <div className="flex align--center">
        <h1 className="header__title">MiniGames</h1>
      </div>

      <div className="header__right flex align--center">
        {/* <input
          type="text"
          placeholder="🔍 Search..."
          className="header__search p--8"
        />
        <button className="header__notifications pointer">🔔</button>
        <div className="flex align--center pointer">
          <img
            src="https://i.pravatar.cc/40"
            alt="User Avatar"
            className="header__avatar"
          />
        </div> */}
      </div>
    </header>
  );
};

export default Header;
