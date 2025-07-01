import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import TravelCard from '../../components/TravelCard/TravelCard.jsx';
import AuthModal from '../../components/AuthModal/AuthModal.jsx';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';
import './DestinationPage.css';

const DestinationsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // State for all packages and the list that gets displayed
  const [allPackages, setAllPackages] = useState([]);
  const [displayedPackages, setDisplayedPackages] = useState([]);

  // State to hold the current values of the filters
  const [filters, setFilters] = useState({
      country: '',
      packageType: '',
      category: '',
      priceRange: '',
      discount: ''
  });
  
  const url = "https://destify-backend-fxy3.onrender.com";
  const location = useLocation(); // Hook to access URL parameters

  // Fetch all destinations and apply filters from URL on initial load
  useEffect(() => {
    const fetchAndFilterDestinations = async () => {
      try {
        const response = await axios.get(`${url}/api/destination/list`);
        if (response.data.success) {
          let packages = response.data.data;
          setAllPackages(packages);

          // Get filters from URL query parameters from the homepage search
          const params = new URLSearchParams(location.search);
          const urlFilters = {
              country: params.get('country') || '',
              packageType: params.get('packageType') || '',
              category: params.get('category') || '',
              discount: params.get('discount') || '',
              priceRange: '' // Price range is not passed from homepage
          };
          setFilters(urlFilters); // Set the filter state to match the URL

          // Apply filters from URL on initial load
          if (urlFilters.country) packages = packages.filter(pkg => pkg.country === urlFilters.country);
          if (urlFilters.packageType) packages = packages.filter(pkg => pkg.packageType === urlFilters.packageType);
          if (urlFilters.category) packages = packages.filter(pkg => pkg.category === urlFilters.category);
          if (urlFilters.discount) {
              const minDiscount = Number(urlFilters.discount);
              if (minDiscount === 0) {
                  packages = packages.filter(pkg => pkg.discount === 0);
              } else {
                  packages = packages.filter(pkg => pkg.discount >= minDiscount);
              }
          }
          
          setDisplayedPackages(packages);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };
    fetchAndFilterDestinations();
  }, [location.search]); // Re-run when URL search params change

  // Handle changes to any filter input
  const handleFilterChange = (e) => {
      const { name, value } = e.target;
      setFilters(prevFilters => ({
          ...prevFilters,
          [name]: value
      }));
  };

  // Apply all selected filters when the search button is clicked
  const handleFilterSearch = () => {
    let packages = [...allPackages];

    if (filters.country) {
      packages = packages.filter(pkg => pkg.country === filters.country);
    }
    if (filters.packageType) {
      packages = packages.filter(pkg => pkg.packageType === filters.packageType);
    }
    if (filters.category) {
      packages = packages.filter(pkg => pkg.category === filters.category);
    }
    if (filters.priceRange) {
        const [min, max] = filters.priceRange.split('-').map(Number);
        packages = packages.filter(pkg => pkg.tripPrice >= min && pkg.tripPrice <= max);
    }
    if (filters.discount) {
        const minDiscount = Number(filters.discount);
        if (minDiscount === 0) {
            packages = packages.filter(pkg => pkg.discount === 0);
        } else {
            packages = packages.filter(pkg => pkg.discount >= minDiscount);
        }
    }

    setDisplayedPackages(packages);
  };
  
  // Get unique values for dropdowns from all packages
  const uniqueCountries = [...new Set(allPackages.map(pkg => pkg.country))];
  const uniquePackageTypes = [...new Set(allPackages.map(pkg => pkg.packageType))];
  const uniqueCategories = [...new Set(allPackages.map(pkg => pkg.category))];

  return (
    <div>
      <Navbar onLoginClick={() => setIsModalOpen(true)} />
      <main className="container">
        <h1 className="page-title">Our Destinations</h1>
        
        {/* Visually Appealing Filter Bar */}
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
                <label>Price Range</label>
                <select name="priceRange" value={filters.priceRange} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="0-1000">Up to $1000</option>
                    <option value="1001-2000">$1001 - $2000</option>
                    <option value="2001-5000">$2001 - $5000</option>
                    <option value="5001-100000">$5001+</option>
                </select>
            </div>
            <div className="filter-group-visual">
                <label>Discount</label>
                <select name="discount" value={filters.discount} onChange={handleFilterChange}>
                    <option value="">Any</option>
                    <option value="0">No Discount</option>
                    <option value="10">10% or more</option>
                    <option value="20">20% or more</option>
                    <option value="30">30% or more</option>
                </select>
            </div>
            <button className="search-button-visual" onClick={handleFilterSearch}>
                <FaSearch />
            </button>
        </div>

        <div className="destination-packages-grid">
          {displayedPackages.length > 0 ? (
            displayedPackages.map((pkg) => (
              <TravelCard key={pkg._id} travelPackage={pkg} url={url} />
            ))
          ) : (
            <p className="not-found-message">No packages found matching your criteria.</p>
          )}
        </div>
      </main>
      <Footer />
      <AuthModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default DestinationsPage;
