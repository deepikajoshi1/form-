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
      response = await axios.post('http://localhost:3000/api/user', {
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
    if (response.status === 201) {
      alert("user is saved !")
      // Clear textarea
      setName('');
      setEmail('');
      setAddress('');

    }


  };


  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit} >
            <div className="form-group row">
              <label htmlFor="name">Name</label>
              <div className="col-sm-10">
                <input type="name" className="form-control" id="name" placeholder="Name" value={name}
                  onChange={(e) => setName(e.target.value)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="email">Email</label>
              <div className="col-sm-10">
                <input type="email" className="form-control" id="email" placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} />
              </div>
            </div>


            <div className="form-group row">
              <label htmlFor="address">Address</label>
              <div className="col-sm-10">
                <input type="address" className="form-control" id="address"
                  placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mb-2">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
