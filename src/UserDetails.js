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

  const [name, setName] = useState(data.user.name);
  const [email, setEmail] = useState(data.user.email);
  const [address, setAddress] = useState(data.user.address);
  const [gender, setGender] = useState(data.user.gender); // Added gender state

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/${data.user._id}`,
        { name, email, address, gender } // Included gender in the request payload
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
              <label htmlFor="nameInput">Name</label>
              <input
                type="text"
                className="form-control"
                id="nameInput"
                value={name}
                onChange={(e) => setName(e.target.value)}
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
            <div className="form-group">
              <label htmlFor="addressInput">Address</label>
              <input
                type="text"
                className="form-control"
                id="addressInput"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="genderInput">Gender</label>
              <input
                type="text"
                className="form-control"
                id="genderInput"
                value={gender}
                onChange={(e) => setGender(e.target.value)} // Updated setGender usage
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
