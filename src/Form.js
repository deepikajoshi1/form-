import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Form = () => {
  // State variables for form fields
  const [salutation, setSalutation] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to handle blur event of the email input box
  const handleEmailBlur = async () => {

    const regEx = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const regexCheck = regEx.test(email);

    if (regexCheck) {
      try {
        const response = await axios.get(`http://localhost:3000/api/user/email/${email}`);
        const { emailExists } = response.data;
        if (emailExists) {
          setMessage("Email already exists");
        } else {
          setMessage("");
        }
      } catch (error) {
        console.error('Error checking email:', error);
        setMessage('Error checking email. Please try again later.');
      }
    } else if (!regexCheck || email !== "") {
      setMessage("Email is not valid");
    } else {
      setMessage("");
    }
  };
  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:3000/api/user', {
        salutation,
        firstName,
        lastName,
        dateOfBirth,
        gender,
        email,
      });
      // Handle successful submission
      alert('Form submitted successfully');
      // Clear fields
      setSalutation('');
      setFirstName('');
      setLastName('');
      setDateOfBirth('');
      setGender('');
      setEmail('');

    } catch (error) {
      // Handle error, e.g., display error message
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    }
  };
  // Function to check if the message is in red color (i.e., error message)
  const isErrorMessage = () => {
    return message && message.length > 0 && message !== '';
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto col-10 col-md-8 col-lg-6">
          <form onSubmit={handleSubmit}>
            {/* Email input field */}
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  required
                />
                <span style={{ color: 'red' }}>{message}</span>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="salutation" className="col-sm-2 col-form-label">
                Salutation
              </label>
              <div className="col-sm-10">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="salutationDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {salutation ? salutation : 'Select Salutation'}
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="salutationDropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Ms')}
                      >
                        Ms
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Mrs')}
                      >
                        Mrs
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Madam')}
                      >
                        Madam
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Mr')}
                      >
                        Mr
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Master')}
                      >
                        Master
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setSalutation('Sir')}
                      >
                        Sir
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="firstName" className="col-sm-2 col-form-label">
                First Name
              </label>
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
              <label htmlFor="lastName" className="col-sm-2 col-form-label">
                Last Name
              </label>
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
              <label htmlFor="dateOfBirth" className="col-sm-2 col-form-label">
                Date of Birth
              </label>
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
              <label htmlFor="gender" className="col-sm-2 col-form-label">
                Gender
              </label>
              <div className="col-sm-10">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="genderDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {gender ? gender : 'Select Gender'}
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="genderDropdown">
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setGender('male')}
                      >
                        Male
                      </button>
                    </li>
                    <li>
                      <button
                        className="dropdown-item"
                        type="button"
                        onClick={() => setGender('female')}
                      >
                        Female
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <button type="submit" className="btn btn-primary mb-2" disabled={isErrorMessage()}>
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
