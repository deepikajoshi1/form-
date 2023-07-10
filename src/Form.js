import React, { useState } from 'react';
import axios from 'axios';

const Form = () => {
  const [salutation, setSalutation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post('http://localhost:3000/api/user', {
        salutation,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
      });
      // Handle successful response
      console.log('Form submitted successfully:', response);
    } catch (error) {
      // Handle error, e.g., display error message
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
    if (response && response.status === 201) {
      alert('User is saved!');
      // Clear fields
      setSalutation('');
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      setGender('');
      setEmail('');
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            <div className="form-group row">
              <label htmlFor="salutation">Salutation</label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="salutation"
                  value={salutation}
                  onChange={(e) => setSalutation(e.target.value)}
                  required
                >
                  <option value="">Select Salutation</option>
                  <option value="Ms">Ms</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Madam">Madam</option>
                  <option value="Mr">Mr</option>
                  <option value="Master">Master</option>
                  <option value="Sir">Sir</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="firstName">First Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="lastName">Last Name</label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <div className="col-sm-10">
                <input
                  type="date"
                  className="form-control"
                  id="dateOfBirth"
                  value={dateOfBirth}
                  onChange={(e) => setDateOfBirth(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="gender">Gender</label>
              <div className="col-sm-10">
                <select
                  className="form-control"
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="email">Email</label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary mb-2">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
