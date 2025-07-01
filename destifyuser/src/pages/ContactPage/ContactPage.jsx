import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import './ContactPage.css';

const ContactPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar onLoginClick={() => setIsModalOpen(true)} />
      <main className="container">
        <main className="contact-page-main">
          <div className="contact-left-section">
            <h1>Contact Us</h1>
            <p>Have a question about a trip, or need help with a booking? Our team is here to help.</p>
            <p className="contact-info"><strong>Email:</strong> enquiry@destify.com</p>
            <p className="contact-info"><strong>Phone:</strong> +91 98765 43210</p>

            <div className="contact-bottom-sections">
              <div className="bottom-section-item">
                <h3>Customer Support</h3>
                <p>For questions about our destinations or your bookings, our support team is ready to assist you around the clock.</p>
              </div>
              <div className="bottom-section-item">
                <h3>Feedback and Suggestions</h3>
                <p>We love hearing from you! Your feedback helps us improve our services and create even better travel experiences.</p>
              </div>
              <div className="bottom-section-item">
                <h3>Media Inquiries</h3>
                <p>For press-related questions or collaborations, please contact our media relations team at media@destify.com.</p>
              </div>
            </div>
          </div>

          <div className="contact-right-section">
            <div className="contact-form-card">
              <h2>Get in Touch</h2>
              <p className="form-tagline">You can reach us anytime</p>
              <form className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <input type="text" placeholder="First name" />
                  </div>
                  <div className="form-group">
                    <input type="text" placeholder="Last name" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-with-icon">
                    <span className="icon">&#9993;</span>
                    <input type="email" placeholder="Your email" />
                  </div>
                </div>
                <div className="form-group">
                  <div className="phone-input-group">
                    <select className="country-code">
                      <option>+91</option>
                      <option>+1</option>
                      <option>+44</option>
                    </select>
                    <input type="text" placeholder="Phone number" />
                  </div>
                </div>
                <div className="form-group">
                  <textarea placeholder="How can we help?" rows="5"></textarea>
                  <span className="char-count">0/120</span>
                </div>
                <button type="submit" className="submit-button">Submit</button>
                <p className="terms-text">By contacting us, you agree to our <a href="#">Terms of service</a> and <a href="#">Privacy Policy</a></p>
              </form>
            </div>
          </div>
        </main>
      </main>
      <Footer />
      <AuthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default ContactPage;