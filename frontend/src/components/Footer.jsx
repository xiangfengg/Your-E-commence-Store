import React from 'react';

const Footer = () => {
  return (
    <footer className="text-center py-4">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Customer Service</h5>
            <ul className="list-unstyled">
              <li><a href="/faq" className="text-grey">FAQ</a></li>
              <li><a href="/contact" className="text-grey">Contact Us</a></li>
              <li><a href="/returns" className="text-grey">Returns</a></li>
            </ul>
          </div>
          <div className="col">
            <h5>Information</h5>
            <ul className="list-unstyled">
              <li><a href="/terms" className="text-grey">Terms & Conditions</a></li>
              <li><a href="/privacy" className="text-grey">Privacy Policy</a></li>
              <li><a href="/about" className="text-grey">About Us</a></li>
            </ul>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col">
            <p>&copy; 2022 Your E-Commerce Store. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
