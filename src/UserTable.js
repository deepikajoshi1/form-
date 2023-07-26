import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const UserTable = () => {

  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const handleOnClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/users');

      setUsers(response.data.users);

    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (users.length > 0) {
    return (
      <div className="container">
        <div className="card text-center">
          <table className="table table-hover">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Salutation</th>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Date of Birth</th>
                <th scope="col">Gender</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (


                <tr style={{ cursor: "pointer" }} key={user._id} onClick={() => handleOnClick(user._id)}>
                  <td>{user.salutation}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.dateOfBirth}</td>
                  <td>{user.gender}</td>
                  <td>{user.email}</td>

                </tr>

              ))}
            </tbody>
          </table>
        </div>
      </div>

    );
  }
};

export default UserTable;
