import React from 'react';
import { safeCredentials, handleErrors } from '@utils/fetchHelper';
import moment from 'moment';

class BookingWidget extends React.Component {
  state = {
    authenticated: false,
    loading: false,
    error: false,
    startDate: null,
    endDate: null,
  };

  componentDidMount() {
    fetch('/api/authenticated')
      .then(handleErrors)
      .then(data => {
        this.setState({
          authenticated: data.authenticated,
        });
      });
  }

  submitBooking = () => {
    const { startDate, endDate } = this.state;

    if (!startDate || !endDate) {
      this.setState({ error: 'Please select both start and end dates.' });
      return;
    }

    fetch(`/api/bookings`, safeCredentials({
      method: 'POST',
      body: JSON.stringify({
        booking: {
          property_id: this.props.property_id,
          start_date: startDate.toISOString(),
          end_date: endDate.toISOString(),
        },
      }),
    }))
      .then(handleErrors)
      .then(response => {
        console.log(response);
        // Handle successful booking, e.g. show a success message
      })
      .catch(error => {
        console.log(error);
        // Handle error case, e.g. show an error message
      });
  };

  handleStartDateChange = event => {
    const startDate = moment(event.target.value);
    this.setState({ startDate });
  };

  handleEndDateChange = event => {
    const endDate = moment(event.target.value);
    this.setState({ endDate });
  };

  render() {
    const { authenticated, startDate, endDate } = this.state;

    if (!authenticated) {
      return (
        <div className="border p-4 mb-4">
          Please <a href={`/login?redirect_url=${window.location.pathname}`}>log in</a> to make a booking.
        </div>
      );
    }

    const { price_per_night } = this.props;

    return (
      <div className="border p-4 mb-4">
        <form onSubmit={this.submitBooking}>
          <h5>${price_per_night} <small>per night</small></h5>
          <hr />
          <p>date selection</p>
          <div>
            <label>Start Date:</label>
            <input type="date" value={startDate ? startDate.format('YYYY-MM-DD') : ''} onChange={this.handleStartDateChange} />
          </div>
          <div>
            <label>End Date:</label>
            <input type="date" value={endDate ? endDate.format('YYYY-MM-DD') : ''} onChange={this.handleEndDateChange} />
          </div>
          <button type="submit" className="btn btn-large btn-danger btn-block">Book</button>
        </form>
      </div>
    );
  }
}

export default BookingWidget;
