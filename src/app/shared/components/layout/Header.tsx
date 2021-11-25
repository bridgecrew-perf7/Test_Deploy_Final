import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import AuthedActions from './AuthedActions';

export const Header = () => {
  const authState = useSelector((state: any) => state.authReducer);

  return (
    <header>
      <div className="container">
        <div className="nav-container">
          <h1>
            <Link className="nav-logo" to="/">
              <img
                className="nav-logo-img pc-only"
                src="../../../../assets/icons/logo-text.svg"
                alt="BlogBook"
              />
              <img
                className="nav-logo-img sp-only"
                src="../../../../assets/icons/logo.svg"
                alt="BlogBook"
              />
            </Link>
          </h1>
          <nav className="nav">
            <ul className="nav-list">
            <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#top">
                  Home
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#featured">
                  Featured Posts
                </HashLink>
              </li>
              <li className="nav-item">
                <HashLink className="nav-link" smooth to="/#post-list">
                  {authState.data ? 'Following' : 'Public Posts'}
                </HashLink>
              </li>
            </ul>
          </nav>
          <div className="nav-actions">
            {authState.data ? (
              <AuthedActions />
            ) : (
              <ul className="nav-actions-list">
                <li className="nav-actions-item">
                  <Link className="btn btn-outline" to="/auth/register">
                    Sign Up
                  </Link>
                </li>
                <li className="nav-actions-item">
                  <Link className="btn btn-primary" to="/auth/login">
                    Sign In
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
