import React, { useEffect, useState } from 'react';

const Success = (props) => {
  const [bookingData, setBookingData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const bookingId = props.match.params.id;
    fetch(`/api/bookings/${bookingId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch booking details. Status code: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setBookingData(data.booking);
      })
      .catch((error) => {
        console.error('Error fetching booking details:', error);
        setError('An error occurred while fetching booking details. Please try again later.');
      });
  }, [props.match.params.id]);

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {error ? ( // Display the error message if it's not null
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Booking Processing</h2>
                <p className="card-text text-center">Your booking is being processed.</p>
                <p className="card-text text-center">Please wait while we confirm your booking.</p>

                {/* Display booking details */}
                {bookingData ? (
                  <>
                    <h4 className="mt-5">Booking Details:</h4>
                    <div className="row mt-3">
                      <div className="col-md-6">
                        <p><b>Property:</b> {bookingData.property.title}</p>
                        <p><b>Check-in Date:</b> {new Date(bookingData.start_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        <p><b>Check-out Date:</b> {new Date(bookingData.end_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      <div className="col-md-6">
                        <p><b>Total Amount:</b> ${bookingData.charge.amount}</p>
                        <p><b>Guest Name:</b> {bookingData.user.username}</p>
                        <p><b>Email:</b> {bookingData.user.email}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-center mt-4">Booking details not found.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Success;
