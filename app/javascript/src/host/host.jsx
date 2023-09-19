import React, { Component } from 'react';
import Layout from '@src/layout';
import { safeCredentialsFormData, handleErrors } from '@utils/fetchHelper';
import './host.scss';

class Host extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      city: '',
      country: '',
      property_type: '',
      price_per_night: '',
      max_guests: '',
      bedrooms: '',
      beds: '',
      baths: '',
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    // grab file from id image-input
    let imagePicker = document.getElementById('image-input');

    const formData = new FormData();
    formData.append('property[title]', this.state.title);
    formData.append('property[description]', this.state.description);
    formData.append('property[city]', this.state.city);
    formData.append('property[country]', this.state.country);
    formData.append('property[property_type]', this.state.property_type);
    formData.append('property[price_per_night]', this.state.price_per_night);
    formData.append('property[max_guests]', this.state.max_guests);
    formData.append('property[bedrooms]', this.state.bedrooms);
    formData.append('property[beds]', this.state.beds);
    formData.append('property[baths]', this.state.baths);
    formData.append('property[image]', imagePicker.files[0]);

    fetch('/api/properties', safeCredentialsFormData({
      method: 'POST',
      body: formData,
    }))
    .then(handleErrors)
    .then(data => {
      window.location.href = `/property/${data.property.id}`;
    })
    .catch(error => {
        console.error('Error creating property:', error);
    });
}
    
      render() {
        return (
          <Layout>
            <div className="container pt-3">
              <h2>Add New Property</h2>
              <div className='add-property-widget'>
                <form onSubmit={this.handleSubmit}>
                  <div className="form-group mb-2">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={this.state.title}
                      onChange={this.handleInputChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="description">Description</label>
                    <textarea
                      id="description"
                      name="description"
                      value={this.state.description}
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
                          value={this.state.city}
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
                          value={this.state.country}
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
                          value={this.state.property_type}
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
                          value={this.state.price_per_night}
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
                          value={this.state.max_guests}
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
                          value={this.state.bedrooms}
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
                          value={this.state.baths}
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
                          value={this.state.beds}
                          onChange={this.handleInputChange}
                          className="form-control"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label htmlFor="image-input">Upload Images</label>
                    <input
                      id="image-input"
                      name="image-input"
                      type="file"
                      accept="image/*"
                      className='form-control'
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-outline-danger mt-2 mb-2 submit-button">Submit</button>
                </form>
              </div>
            </div>
          </Layout>
        );
      }
    }

export default Host;
