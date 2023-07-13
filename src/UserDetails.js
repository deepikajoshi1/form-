import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { useParams } from 'react-router-dom';



export default function UserDetail() {

  let {userid} = useParams();
  let [user, setUser] = useState(null)

  const [salutation, setSalutation] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [dateOfBirth, setDateOfBirth] = useState();
  const [gender, setGender] = useState();
  const [email, setEmail] = useState();


  const fetchData = async (userid) => {

    // using fetch here... axios
    // let data = await (
    //   await fetch(`http://localhost:3000/api/user/${userid}`)
    // ).json();

    let response = await axios.get(`http://localhost:3000/api/user/${userid}`)
    let data = response.data
    setUser(data.user)
    setSalutation(data.user.salutation)
    setDateOfBirth(data.user.dateOfBirth)
    setEmail(data.user.email)
    setGender(data.user.gender)
    setLastName(data.user.lastName)
    setFirstName(data.user.firstName)
  };



useEffect(() => {
  fetchData(userid);
}
,[userid])


  const navigate = useNavigate();

  const handleUpdate = async () => {
    let response;
    try{
       response = await axios.put(
        `http://localhost:3000/api/user/${user._id}`,
        {
          salutation,
          firstName,
          lastName,
          dateOfBirth,
          gender,
          email,
        }
      );
      alert('User data updated successfully:', response.data);
      navigate(`/`);
    } catch (err) {
      console.error('Error updating user data:', err);
    }
    console.log("This line", response)
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/${user._id}`
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
