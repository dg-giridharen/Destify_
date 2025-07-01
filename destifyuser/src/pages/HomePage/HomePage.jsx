import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import TravelCard from '../../components/TravelCard/TravelCard.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './HomePage.css';
import homeHeroImage from '../../assets/valley.webp';

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allPackages, setAllPackages] = useState([]);
  const [displayedPackages, setDisplayedPackages] = useState([]);
  const [filters, setFilters] = useState({
      country: '',
      packageType: '',
      category: '',
      discount: ''
  });
  
  const navigate = useNavigate();
  const url = "https://destify-backend-fxy3.onrender.com";

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await axios.get(`${url}/api/destination/list`);
        if (response.data.success) {
          setAllPackages(response.data.data);
          setDisplayedPackages(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchDestinations();
  }, []);

  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
      }));
  };

  const handleFilterSearch = () => {
      // When search is clicked on the homepage, redirect to the destinations page with filters
      const queryParams = new URLSearchParams(filters).toString();
      navigate(`/destinations?${queryParams}`);
  };

  const uniqueCountries = [...new Set(allPackages.map(pkg => pkg.country))];
  const uniquePackageTypes = [...new Set(allPackages.map(pkg => pkg.packageType))];
  const uniqueCategories = [...new Set(allPackages.map(pkg => pkg.category))];

  const sliderSettings = {
    dots: false,
    infinite: displayedPackages.length > 3, // Only be infinite if there are enough cards
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <div className="home-page-container">
      <Navbar onLoginClick={() => setIsModalOpen(true)} />
      
      <section className="home-hero-section">
        <div className="home-hero-text">
          <h1>Crafting Journeys, Creating Memories</h1>
          <p>
            At Destify, our only goal is to create unforgettable moments for our travelers. We believe that people forget years but remember moments, and we're dedicated to making every trip a masterpiece.
          </p>
        </div>
        <div className="home-hero-image">
          <img src={homeHeroImage} alt="Scenic valley view" />
        </div>
      </section>

      {/* Filter Bar on Home Page */}
      <div className="home-filter-bar-container">
        <div className="filter-bar-visual">
            <div className="filter-group-visual">
                <label>Country</label>
                <select name="country" value={filters.country} onChange={handleFilterChange}>
                    <option value="">All Countries</option>
                    {uniqueCountries.map(country => <option key={country} value={country}>{country}</option>)}
                </select>
            </div>
            <div className="filter-group-visual">
                <label>Package Type</label>
                <select name="packageType" value={filters.packageType} onChange={handleFilterChange}>
                    <option value="">All Types</option>
                    {uniquePackageTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
            </div>
            <div className="filter-group-visual">
                <label>Category</label>
                <select name="category" value={filters.category} onChange={handleFilterChange}>
                    <option value="">All Categories</option>
                    {uniqueCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
            </div>
            <div className="filter-group-visual">
                <label>Discount</label>
                <select name="discount" value={filters.discount} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="10">10% or more</option>
                </select>
            </div>
            <button className="search-button-visual" onClick={handleFilterSearch}>
                <FaSearch />
            </button>
        </div>
      </div>


      <main className="container">
        <h2 className="section-title">Featured Destinations</h2>
        <div className="carousel-container">
          <Slider {...sliderSettings}>
            {displayedPackages.map((pkg) => (
              <div key={pkg._id} className="carousel-slide">
                <TravelCard travelPackage={pkg} url={url} />
              </div>
            ))}
          </Slider>
        </div>
      </main>
      
      <Footer />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HomePage;
