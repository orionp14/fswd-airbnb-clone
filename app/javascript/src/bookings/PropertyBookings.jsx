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
    <div className="user-bookings">
      <h2>Upcoming Reservations</h2>
      {propertyBookings.length === 0 ? (
        <p>No bookings found for your properties.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>Paid?</th>
            </tr>
          </thead>
          <tbody>
            {propertyBookings.map((booking) => (
              <tr key={booking.id} className="booking-container">
                <td>
                  <div className="property-info">
                    <img
                      src={booking.property.image_url}
                      alt={booking.property.title}
                      className="property-image"
                    />
                    <span className="property-title">{booking.property.title}</span>
                  </div>
                </td>
                <td>{booking.start_date}</td>
                <td>{booking.end_date}</td>
                <td>${booking.property.price_per_night}</td>
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
