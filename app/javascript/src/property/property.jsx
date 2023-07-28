// property.jsx
import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors, safeCredentialsFormData } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    formData: {
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: 0,
      max_guests: 0,
      bedrooms: 0,
      beds: 0,
      baths: 0,
      image_url: '',
    },
  }
  
  isPropertyOwner = () => {
    const { property } = this.state;
    const { user } = property;
    const token = cookies.signed.airbnb_session_token;
    const session = Session.find(token);
    return session && user && user.id === session.user.id;
  };

  componentDidMount() {
    this.fetchProperty();
  }

  fetchProperty() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        });
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  }

handleSubmit = (event) => {
  event.preventDefault();
  const { formData } = this.state;

  console.log(formData)

  // Add the provided code here
  let formdata = new FormData();

  // const fileInputElement = document.getElementById('image-input');

  // for (let i = 0; i < fileInputElement.files.length; i++) {
  //   formdata.append('property[images][]', fileInputElement.files[i]);
  // }

  formdata.set('property[title]', formData.title);
  formdata.set('property[description]', formData.description);
  formdata.set('property[city]', formData.city);
  formdata.set('property[country]', formData.country);
  formdata.set('property[property_type]', formData.property_type);
  formdata.set('property[price_per_night]', formData.price_per_night);
  formdata.set('property[max_guests]', formData.max_guests);
  formdata.set('property[bedrooms]', formData.bedrooms);
  formdata.set('property[beds]', formData.beds);
  formdata.set('property[baths]', formData.baths);

  console.log(formdata)

  fetch('/api/properties', safeCredentialsFormData({
    method: 'POST',
    body: formdata,
  }))
    .then(handleErrors)
    .then(() => {
      // Clear the form fields
      this.setState({
        formData: {
          title: '',
          description: '',
          city: '',
          country: '',
          property_type: '',
          price_per_night: 0,
          max_guests: 0,
          bedrooms: 0,
          beds: 0,
          baths: 0,
        },
      });

      // Fetch the updated property list
      this.fetchProperty();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

  render () {
    const { property, loading, formData } = this.state;
    if (loading) {
      return <p>loading...</p>;
    };

    const {
      id,
      title,
      description,
      city,
      country,
      property_type,
      price_per_night,
      max_guests,
      bedrooms,
      beds,
      baths,
      image_url,
      user,
    } = property

    return (
      <Layout>
        <div className="property-image mb-3" style={{ backgroundImage: `url(${image_url})` }} />
        <div className="container">
          <div className="row">
            <div className="info col-12 col-lg-7 pb-4">
              <div className="mb-3">
                <h3 className="mb-0">{title}</h3>
                <p className="text-uppercase mb-0 text-secondary"><small>{city}</small></p>
                <div>
                  {user ? (
                    <div className="mb-0">
                      <p className="mb-0">
                        <small>Hosted by <b>{user.username}</b></small>
                      </p>
                    </div>
                  ) : (
                    <p className="mb-0">
                      <small>Hosted by <b>Anonymous</b></small>
                    </p>
                  )}
                </div>
              </div>
              <div>
                <p className="mb-0 text-capitalize"><b>{property_type}</b></p>
                <p>
                  <span className="me-3">{max_guests} guests</span>
                  <span className="me-3">{bedrooms} bedroom</span>
                  <span className="me-3">{beds} bed</span>
                  <span className="me-3">{baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={id} price_per_night={price_per_night} />
            </div>
            <div className='add-prop-foot border-top'>
            <div className="row pt-4">
              <div className="col-12 col-lg-7">
                <div className="add-property-image">
                  <img
                    src={image_url}
                    alt="Property"
                    className="add-property-img"
                  />
                </div>
              </div>
            <div className="col-12 col-lg-5 border p-4 mb-4 add-property">
              <div className='add-property-widget'>
              <h3>Add New Property</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group mb-2">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={this.handleInputChange}
                    className="form-control"
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={this.handleInputChange}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="country">Country</label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="property_type">Property Type</label>
                      <input
                        type="text"
                        id="property_type"
                        name="property_type"
                        value={formData.property_type}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="price_per_night">Price per Night</label>
                      <input
                        type="number"
                        id="price_per_night"
                        name="price_per_night"
                        value={formData.price_per_night}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="max_guests">Max Guests</label>
                      <input
                        type="number"
                        id="max_guests"
                        name="max_guests"
                        value={formData.max_guests}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="bedrooms">Bedrooms</label>
                      <input
                        type="number"
                        id="bedrooms"
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="baths">Baths</label>
                      <input
                        type="number"
                        id="baths"
                        name="baths"
                        value={formData.baths}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group mb-2">
                      <label htmlFor="beds">Beds</label>
                      <input
                        type="number"
                        id="beds"
                        name="beds"
                        value={formData.beds}
                        onChange={this.handleInputChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="image-input">Upload Images</label>
                    <input
                      type="file"
                      id="image-input"
                      name="image-input"
                      onChange={this.handleInputChange}
                      className="form-control"
                      multiple
                    />
                  </div>
                <button type="submit" className="btn btn-primary mt-2 mb-2 submit-button">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
      </div>
      </Layout>
    )
  }
}

export default Property