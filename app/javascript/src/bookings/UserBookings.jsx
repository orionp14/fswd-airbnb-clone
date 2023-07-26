import React, { useEffect, useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = () => {
    fetch('/api/bookings', safeCredentials())
      .then(handleErrors)
      .then(data => {
        setBookings(data.bookings);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
      });
  };

  return (
    <div>
      <h2>Your Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <p>Property ID: {booking.property_id}</p>
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

export default UserBookings;
