import React from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import the location icon
import './TravelCard.css';

const TravelCard = ({ travelPackage, url }) => {
  // Construct the full image URL from the backend
  const imageUrl = `${url}/images/${travelPackage.image}`;

  return (
    <div className="travel-card-visual">
      <Link to={`/cart/${travelPackage._id}`} className="card-link-wrapper-visual">
        <div className="card-image-container-visual">
          <img className="travel-card-image-visual" src={imageUrl} alt={travelPackage.name} />
          {travelPackage.discount > 0 && (
            <div className="discount-badge-visual">
              {travelPackage.discount}% OFF
            </div>
          )}
        </div>
        <div className="card-content-visual">
          <h3 className="card-title-visual">{travelPackage.name}</h3>
          <div className="card-footer-visual">
            <span className="card-destination-visual">
              <FaMapMarkerAlt className="location-icon" /> {travelPackage.country}
            </span>
            <span className="card-price-visual">${travelPackage.tripPrice}</span>
          </div>
        </div>
      </Link>
      <div className="card-button-container-visual">
        <Link to={`/cart/${travelPackage._id}`} className="book-now-button-visual">
          Book Now &gt;
        </Link>
      </div>
    </div>
  );
};

export default TravelCard;