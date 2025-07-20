# Destify - Travel Agency MERN Project

<h1 align="center">Destify</h1>

<p align="center">
  A full-stack web application for a travel agency, built with the MERN stack. It features a client-facing website for users to browse and book travel packages, and a separate admin panel for managing the platform's content and bookings.
</p>

---

## Live Demo Links

* **User Page:** [https://destify-r6l0.onrender.com](https://destify-r6l0.onrender.com)
* **Admin Page:** [https://destify-admin.onrender.com](https://destify-admin.onrender.com)
* **Backend Server:** [https://destify-backend-fxy3.onrender.com](https://destify-backend-fxy3.onrender.com)

---

## About The Project

This project is a comprehensive solution for a travel agency, providing a seamless experience for both customers and administrators. The user interface is designed to be engaging and intuitive, allowing users to easily find and book their dream vacations. The admin dashboard provides all the necessary tools for managing the travel packages, and monitoring bookings.

---

## Key Features

### User Panel (`destifyuser`)

* **Browse Destinations:** Users can view all available travel packages and filter them by destination.
* **View Package Details:** Each package has a detailed page with images, description, pricing, and itinerary.
* **User Authentication:** Users can register and log in to their accounts to manage their trips.
* **Booking System:** A complete booking process is implemented, allowing users to select dates, number of travelers, and make payments (simulated).

### Admin Panel (`destifyadmin`)

* **Dashboard:** An overview of recent bookings and platform statistics.
* **Add Destinations:** Admins can add new travel packages with details like name, description, price, category, and images.
* **Manage Destinations:** View a list of all destinations and remove them from the platform.
* **Manage Bookings:** View all user bookings and update their status (e.g., "Booking Processing", "Confirmed", "Completed").

---

## Built With

This project is built using the following technologies:

* **Frontend:** React, React Router, CSS, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB with Mongoose
* **Authentication:** JSON Web Tokens (JWT)
* **Image Uploads:** Multer

---

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js and npm installed on your machine.
* MongoDB Atlas account or a local MongoDB instance.

### Installation & Setup

1.  **Clone the repo:**
    ```sh
    git clone <your-repository-url>
    ```

2.  **Backend Setup (`destifybackend`):**
    * Navigate to the backend directory: `cd destifybackend`
    * Install NPM packages: `npm install`
    * Create a `.env` file in the `destifybackend` directory and add the following variables:
        ```env
        PORT=4000
        MONGO_URI=<your_mongodb_connection_string>
        JWT_SECRET=<your_jwt_secret>
        ```
    * Start the backend server: `npm start`

3.  **User Frontend Setup (`destifyuser`):**
    * Navigate to the user frontend directory: `cd destifyuser`
    * Install NPM packages: `npm install`
    * Start the development server: `npm run dev`

4.  **Admin Frontend Setup (`destifyadmin`):**
    * Navigate to the admin frontend directory: `cd destifyadmin`
    * Install NPM packages: `npm install`
    * Start the development server: `npm run dev`

---

## API Endpoints

The backend provides the following API endpoints:

* **User Routes (`/api/user`):**
    * `POST /register`: Register a new user.
    * `POST /login`: Log in a user.
* **Destination Routes (`/api/destination`):**
    * `POST /add`: Add a new destination (admin).
    * `GET /list`: Get a list of all destinations.
    * `POST /remove`: Remove a destination (admin).
* **Order Routes (`/api/order`):**
    * `POST /place`: Place a new order.
    * `GET /list`: Get a list of all orders (admin).
    * `POST /userorders`: Get the orders for the logged-in user.
    * `POST /status`: Update the status of an order (admin).
