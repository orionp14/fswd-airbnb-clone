import React from 'react';
import './layout.scss';

const Layout = (props) => {
  return (
    <React.Fragment>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        <a className="navbar-brand text-danger airbnb-text" href="/">
              <img
                src="https://www.airbnb.com/favicon.ico"
                alt="Airbnb Logo"
                className="logo mr-2 airbnb-logo"
              />
              <span style={{ fontWeight: 'bold' }}>airbnb</span>
            </a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-3">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user-bookings">
                  Bookings
                </a>
              </li>
            </ul>
            <div className='ms-auto'>
            <a href="/host" class="btn btn-danger" role="button">
  Airbnb your home
</a>
            </div>
          </div>
        </div>
      </nav>
      {props.children}
      <footer className="p-3 bg-light text-center foot">
        <p className="text-secondary mb-0">© {new Date().getFullYear()} Airbnb Clone</p>
      </footer>
    </React.Fragment>
  );
};

export default Layout;
