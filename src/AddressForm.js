import React, { useState } from 'react';
import axios from 'axios';

const AddressForm = () => {
  const [addressData, setAddressData] = useState({
    addressLine1: '',
    addressLine2: '',
    state: '',
    country: '',
    postalCode: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddressData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/user/address', addressData);
      if (response.data.success) {
        console.log('Address added successfully');
        setAddressData({
          addressLine1: '',
          addressLine2: '',
          state: '',
          country: '',
          postalCode: '',
        });
      }
    } catch (error) {
      console.error('Error adding address:', error);
    }

  };

  const handleUpdate = () => {
    // Handle update logic here
    console.log('Update address clicked');
  };

  const handleDelete = () => {
    // Handle delete logic here
    console.log('Delete address clicked');
  };

  return (
    <div>
      <h2>Add Address</h2>
      <form onSubmit={handleSubmit}>
      <label>
          Address Line 1:
          <input
            type="text"
            name="addressLine1"
            value={addressData.addressLine1}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Address Line 2:
          <input
            type="text"
            name="addressLine2"
            value={addressData.addressLine2}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          State:
          <input
            type="text"
            name="state"
            value={addressData.state}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Country:
          <input
            type="text"
            name="country"
            value={addressData.country}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Postal Code:
          <input
            type="text"
            name="postalCode"
            value={addressData.postalCode}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="submit">Add Address</button>
      </form>
      <div>
        <button onClick={handleUpdate}>Update Address</button>
        <button onClick={handleDelete}>Delete Address</button>
      </div>
    </div>
  );
};

export default AddressForm;
