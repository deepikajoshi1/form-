import React, { useState } from 'react';
import axios from 'axios';


const Form = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
     response  = await axios.post('http://localhost:3000/api/user', {
        name,
        email,
        address,
      });
      // Handle successful response
      console.log('Form submitted successfully:', response);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
    if(response.status === 201){
      alert("user is saved !")
       // Clear textarea
       setName('');
       setEmail('');
       setAddress('');

    }


  };


  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label className="form-label">
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Email:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
        />
      </label>

      <label className="form-label">
        Address:
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="form-textarea"
        />
      </label>

      <button type="submit" className="form-button">Submit</button>
    </form>
  );
};

export default Form;
