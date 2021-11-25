import React from 'react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col col-wd-4 col-lg-6 col-md-12">
            <Link className="footer-logo" to="/">
              <img
                className="footer-logo-img"
                src="https://res.cloudinary.com/cloudinaryassets/image/upload/v1636607426/logo-text_ayr5g1.svg"
                alt="BlogBook"
              />
            </Link>
            <p className="footer-about">
              BlogBook is a modern classic blog theme for Supremetech. Use this
              theme for company blog or personal blog.
            </p>
            <div className="footer-socials">
              <ul className="footer-list">
                <li className="footer-socials-item">
                  <Link className="footer-socials-link" to="/">
                    <img
                      src="../../../../assets/icons/social-twitter.svg"
                      alt="Twitter"
                      className="footer-socials-icon"
                    />
                  </Link>
                </li>
                <li className="footer-socials-item">
                  <Link className="footer-socials-link" to="/">
                    <img
                      src="../../../../assets/icons/social-youtube.svg"
                      alt="Youtube"
                      className="footer-socials-icon"
                    />
                  </Link>
                </li>
                <li className="footer-socials-item">
                  <Link className="footer-socials-link" to="/">
                    <img
                      src="../../../../assets/icons/social-github.svg"
                      alt="Github"
                      className="footer-socials-icon"
                    />
                  </Link>
                </li>
                <li className="footer-socials-item">
                  <Link className="footer-socials-link" to="/">
                    <img
                      src="../../../../assets/icons/social-linkedin.svg"
                      alt="Linkedin"
                      className="footer-socials-icon"
                    />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col-wd-8 col-lg-6 col-md-12">
            <ul className="row footer-list">
              <li className="col col-lg-4 col-sm-12">
                <h4 className="list-group-title">Blogs</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      New Posts
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Featured Members
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Featured Posts
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="col col-lg-4 col-sm-12">
                <h4 className="list-group-title">About</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Our Company
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Careers
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Contact Us
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="#" className="list-group-link">
                      Management Team
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="col col-lg-4 col-sm-12">
                <h4 className="list-group-title">Contact</h4>
                <ul className="list-group">
                  <li className="list-group-item">
                    <Link
                      to="mailto:hr@supremetech.vn"
                      className="list-group-link"
                    >
                      hr@supremetech.vn
                    </Link>
                  </li>
                  <li className="list-group-item">
                    <Link to="tel:0394123456" className="list-group-link">
                      +84 394 123 456
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="footer-copyright">
        © 2021 BlogBook - All right Reserved. Published by Supremetech
      </p>
    </footer>
  );
};
