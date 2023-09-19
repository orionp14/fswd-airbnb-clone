import React, { useEffect, useState } from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import './bookings.scss'; 

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const fetchUserBookings = () => {
    fetch('/api/bookings/user', safeCredentials())
      .then(handleErrors)
      .then(data => {
        setBookings(data.bookings);
      })
      .catch(error => {
        console.error('Error fetching user bookings:', error);
      });
  };

  const initiateStripeCheckout = (bookingId) => {
    return fetch(`/api/charges?booking_id=${bookingId}&cancel_url=${window.location.pathname}`, safeCredentials({
      method: 'POST',
    }))
      .then(handleErrors)
      .then(response => {
        const stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY);

        stripe.redirectToCheckout({
          sessionId: response.charge.checkout_session_id,
        }).then((result) => {
          if (result.error) {
            // Handle error
            console.error(result.error.message);
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div className="user-bookings">
      <h2>Upcoming Travel Plans</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table className="custom-table">
          <thead>
            <tr>
              <th>Property</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Price</th>
              <th>Paid?</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
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
                <td>{booking.is_paid ? 'Yes' : 'No'}</td>
                <td>
                  {!booking.is_paid && (
                    <button onClick={() => initiateStripeCheckout(booking.id)} className="checkout-button">
                      Checkout
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserBookings;
