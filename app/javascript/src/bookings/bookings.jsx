import React, { useState } from 'react';
import UserBookings from './UserBookings';
import PropertyBookings from './PropertyBookings';
import Layout from '@src/layout';
import './bookings.scss';

const Bookings = () => {
  const [showUserBookings, setShowUserBookings] = useState(true);

  const toggleBookings = () => {
    setShowUserBookings(!showUserBookings);
  };

  return (
    <Layout>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4 pt-3">
          <h1>Property Bookings</h1>
          <button
            className="btn btn-outline-danger"
            onClick={toggleBookings}
          >
            {showUserBookings ? 'Show Property Bookings' : 'Show User Bookings'}
          </button>
        </div>
        <div className="card">
          <div className="card-body">
            {showUserBookings ? <UserBookings /> : <PropertyBookings />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Bookings;
