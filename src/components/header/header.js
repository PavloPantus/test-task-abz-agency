import React from 'react';
import './header.scss';

export const Header = () => (
  <header className="header">
    <div className="container">
      <div className="header__content">
        <a href="#register-section" className="header__logo">
          <img src="./images/logo.svg" alt="logo" />
        </a>

        <nav className="header__nav">
          <input id="menu__toggle" type="checkbox"/>
          <label className="menu__btn" htmlFor="menu__toggle">
            <span></span>
          </label>

          <ul className="nav menu__box">
            <li className="nav__item">
              <a href="#register-section">About me</a>
            </li>
            <li className="nav__item">
              <a href="#register-section">Relationships</a>
            </li>
            <li className="nav__item">
              <a href="#register-section">Requirements</a>
            </li>
            <li className="nav__item">
              <a href="#register-section">Users</a>
            </li>
            <li className="nav__item">
              <a href="#register-section">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
);
