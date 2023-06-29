import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/api/user', {
        name,
        email,
        address,
      });

      // Handle successful response, e.g., display success message or redirect
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error('Error submitting form:', error);
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      {/* Input fields for name, email, and address */}


      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label>
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>

      <label>
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};



export default Form;
