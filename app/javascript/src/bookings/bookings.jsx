import React from 'react';
import UserBookings from './UserBookings';
import PropertyBookings from './PropertyBookings';
import Layout from '@src/layout';
import './bookings.scss'

const Bookings = () => {
  return (
    <Layout>
      <div>
        <h1>Property Booking</h1>
        <UserBookings />
        <PropertyBookings propertyId={1} />
      </div>
    </Layout>
  );
};

export default Bookings;
