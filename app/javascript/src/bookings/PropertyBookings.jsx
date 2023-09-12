import React, { useEffect, useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './bookings.scss';

const PropertyBookings = () => {
  const [propertyBookings, setPropertyBookings] = useState([]);

  useEffect(() => {
    fetchUserPropertyBookings();
  }, []);

  const fetchUserPropertyBookings = () => {
    fetch('/api/bookings/user-property-bookings', safeCredentials())
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
      <h2>Your Property Bookings</h2>
      {propertyBookings.length === 0 ? (
        <p>No bookings found for your properties.</p>
      ) : (
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>User ID</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Paid?</th>
            </tr>
          </thead>
          <tbody>
            {propertyBookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.user_id}</td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>{booking.paid ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PropertyBookings;
