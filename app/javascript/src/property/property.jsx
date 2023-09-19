import React from 'react';
import Layout from '@src/layout';
import BookingWidget from './bookingWidget';
import { handleErrors, safeCredentialsFormData } from '@utils/fetchHelper';

import './property.scss';

class Property extends React.Component {
  state = {
    property: {},
    loading: true,
    isEditing: false, 
    editedProperty: {}, 
  }

  componentDidMount() {
    fetch(`/api/properties/${this.props.property_id}`)
      .then(handleErrors)
      .then(data => {
        this.setState({
          property: data.property,
          loading: false,
        });
      })
      .catch(error => {
        console.error('Error fetching property data:', error);
      });
  }

  toggleEditForm = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
      editedProperty: { ...prevState.property },
    }));
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      editedProperty: {
        ...prevState.editedProperty,
        [name]: value,
      },
    }));
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { editedProperty } = this.state;
    let imagePicker = document.getElementById('image-input');

    const formData = new FormData();
    formData.append('property[title]', editedProperty.title);
    formData.append('property[description]', editedProperty.description);
    formData.append('property[property_type]', editedProperty.property_type);
    formData.append('property[max_guests]', editedProperty.max_guests);
    formData.append('property[bedrooms]', editedProperty.bedrooms);
    formData.append('property[beds]', editedProperty.beds);
    formData.append('property[baths]', editedProperty.baths);
    formData.append('property[price_per_night]', editedProperty.price_per_night);
    
    // Check if a new image has been selected before appending it
    if (imagePicker.files[0]) {
      formData.append('property[image]', imagePicker.files[0]);
    }
    
  
    fetch(`/api/properties/${this.props.property_id}`, safeCredentialsFormData ({
      method: 'PUT',
      body: formData,
    }))
      .then(handleErrors)
      .then(() => {
        this.setState(
          (prevState) => ({
            isEditing: false,
            property: { ...prevState.editedProperty },
          }),
          () => {
            console.log('Property updated:', this.state.property);
            window.location.reload();
          }
        );
      })
      .catch((error) => {
        console.error('Error updating property:', error);
      });
  };

  cancelEdit = () => {
    this.setState({
      isEditing: false,
    });
  }

  render() {
    const { property, loading, isEditing, editedProperty } = this.state;
    if (loading) {
      return <p>loading...</p>;
    }

    return (
      <Layout>
        <div className="property-image mb-3">
          <img src={property.image_url} alt="Property Image" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div className="container property-information">
          <div className="row">
            <div className="info col-12 col-lg-7">
              <div className="mb-3">
              <div className="edit-mode d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">{property.title}</h3>
                  {property.is_owner && (
                    <button className="btn btn-outline-danger" onClick={this.toggleEditForm}>
                      Edit Property
                    </button>
                  )}
                </div> 
                <p className="text-uppercase mb-0 text-secondary"><small>{property.city}, {property.country}</small></p>
                <p className="mb-0"><small>Hosted by <b>{property.user.username}</b></small></p>
              </div>
              <div>
                <p className="mb-0 text-capitalize ammenities"><b>{property.property_type}</b></p>
                <p>
                  <span className="me-3">{property.max_guests} guests</span>
                  <span className="me-3">{property.bedrooms} bedroom</span>
                  <span className="me-3">{property.beds} bed</span>
                  <span className="me-3">{property.baths} bath</span>
                </p>
              </div>
              <hr />
              <p>{property.description}</p>
            </div>
            <div className="col-12 col-lg-5">
              <BookingWidget property_id={property.id} price_per_night={property.price_per_night} />
            </div>
          </div>
        </div>
        {isEditing && (
            <EditForm
              property={editedProperty}
              onInputChange={this.handleInputChange}
              onSubmit={this.handleFormSubmit}
              onCancel={this.cancelEdit}
            />
            )}
      </Layout>
    )
  }
}

// Create a separate EditForm component
function EditForm({ property, onInputChange, onSubmit, onCancel }) {
  return (
    <div className="container edit-form">
      <h3>Edit Property</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={property.title}
            onChange={onInputChange}
            className="form-control"
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={property.description}
            onChange={onInputChange}
            className="form-control"
          />
        </div>
        <div className="row">
        <div className="col-md-6">
        <div className="form-group mb-2">
          <label htmlFor="property_type">Property Type</label>
          <input
            type="text"
            id="property_type"
            name="property_type"
            value={property.property_type}
            onChange={onInputChange}
            className="form-control"
          />
        </div>
        </div>
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label htmlFor="max_guests">Max Guests</label>
              <input
                type="number"
                id="max_guests"
                name="max_guests"
                value={property.max_guests}
                onChange={onInputChange}
                className="form-control"
              />
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label htmlFor="price_per_night">Price Per Night</label>
              <input
                type="number"
                id="price_per_night"
                name="price_per_night"
                value={property.price_per_night}
                onChange={onInputChange}
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
                value={property.bedrooms}
                onChange={onInputChange}
                className="form-control"
              />
            </div>
          </div>
          </div>
          <div className="row">
          <div className="col-md-6">
            <div className="form-group mb-2">
              <label htmlFor="beds">Beds</label>
              <input
                type="number"
                id="beds"
                name="beds"
                value={property.beds}
                onChange={onInputChange}
                className="form-control"
              />
            </div>
          </div>
        <div className="col-md-6">
        <div className="form-group mb-2">
          <label htmlFor="baths">Baths</label>
          <input
            type="number"
            id="baths"
            name="baths"
            value={property.baths}
            onChange={onInputChange}
            className="form-control"
          />
        </div>
        </div>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="images">Images</label>
          <input
            type="file"
            id="image-input"
            name="image-input"
            accept="image/*"
            onChange={onInputChange}
            className="form-control"
          />
          <small className="form-text text-muted">Choose one or more images to upload.</small>
        </div>
        <button type="submit" className="btn btn-danger mt-2 mb-2 save-button">Save</button>
        <button type="button" onClick={onCancel} className="btn btn-secondary mt-2 mb-2">Cancel</button>
      </form>
    </div>
  );
}

export default Property;