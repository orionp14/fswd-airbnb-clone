import React, { useEffect, useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

const PropertyBookings = ({ propertyId }) => {
  const [propertyBookings, setPropertyBookings] = useState([]);

  useEffect(() => {
    fetchPropertyBookings();
  }, []);

  const fetchPropertyBookings = () => {
    fetch(`/api/properties/${propertyId}/bookings`, safeCredentials())
      .then(handleErrors)
      .then(data => {
        setPropertyBookings(data.bookings);
      })
      .catch(error => {
        console.error('Error fetching property bookings:', error);
      });
  };

  return (
    <div>
      <h2>Bookings for Property ID {propertyId}</h2>
      {propertyBookings.length === 0 ? (
        <p>No bookings found for this property.</p>
      ) : (
        <ul>
          {propertyBookings.map((booking) => (
            <li key={booking.id}>
              <p>User ID: {booking.user_id}</p>
              <p>Start Date: {booking.start_date}</p>
              <p>End Date: {booking.end_date}</p>
              <p>Paid?: {booking.paid ? 'Yes' : 'No'}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PropertyBookings;
