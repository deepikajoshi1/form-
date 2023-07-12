import React, { useState } from 'react';
import axios from 'axios';
import { useLoaderData } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export async function loader({ params }) {
  const API = `http://localhost:3000/api/user/${params.userid}`;

  try {
    const response = await fetch(API);

    if (!response.ok) throw new Error();
    const data = await response.json();
    return data;
  } catch {
    throw new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}

export default function UserDetail() {
  const data = useLoaderData();
  const navigate = useNavigate();

  const [salutation, setSalutation] = useState(data.user.salutation);
  const [firstName, setFirstName] = useState(data.user.firstName);
  const [lastName, setLastName] = useState(data.user.lastName);
  const [dateOfBirth, setDateOfBirth] = useState(data.user.dateOfBirth);
  const [gender, setGender] = useState(data.user.gender);
  const [email, setEmail] = useState(data.user.email);

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${data.user._id}`,
        { salutation, firstName, lastName, dateOfBirth, gender, email }
      );

      alert('User data updated successfully:', response.data);
      navigate(`/`);
    } catch (err) {
      console.error('Error updating user data:', err);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${data.user._id}`
      );

      alert('User data deleted successfully:', response.data);
      navigate(`/`);
    } catch (err) {
      console.error('Error deleting user data:', err);
    }
  };

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label htmlFor="salutationInput">Salutation</label>
              <input
                type="text"
                className="form-control"
                id="salutationInput"
                value={salutation}
                onChange={(e) => setSalutation(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="firstNameInput">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastNameInput">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastNameInput">Date of Birth</label>
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genderInput">Gender</label>
              <input
                type="text"
                className="form-control"
                id="genderInput"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="emailInput">Email</label>
              <input
                type="email"
                className="form-control"
                id="emailInput"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </form>
          <button className="btn btn-danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
