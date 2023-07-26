import React from 'react';
import UserBookings from './UserBookings';
import PropertyBookings from './PropertyBookings';

const App = () => {
  return (
    <div>
      <h1>Property Booking</h1>
      <UserBookings />
      <PropertyBookings propertyId={1} />
    </div>
  );
};

export default App;
