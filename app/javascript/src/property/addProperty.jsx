// AddProperty.jsx
import React from 'react';
import { handleErrors, safeCredentialsFormData } from '@utils/fetchHelper';
import '@src/property/property.scss';

class AddProperty extends React.Component {
  state = {
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
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { formData } = this.state;
    console.log(formData);
    let formdata = new FormData();
  
    // Set the property data in the FormData
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
    formdata.append('property[images][]', formData.image_url);
  
    console.log(formdata);
  
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
        this.props.fetchProperty();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

  render() {
    const { formData } = this.state;

    return (
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
    );
  }
}

export default AddProperty
