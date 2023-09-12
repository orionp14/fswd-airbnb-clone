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
        <h1 className="my-4">Property Booking</h1>
        <div className="card">
          <div className="card-body">
            {showUserBookings ? <UserBookings /> : <PropertyBookings />}
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          onClick={toggleBookings}
        >
          {showUserBookings ? 'Show Property Bookings' : 'Show User Bookings'}
        </button>
      </div>
    </Layout>
  );
};

export default Bookings;
