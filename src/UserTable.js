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

    const interval = setInterval(() => {
      fetchUsers();
    }, 1000); // Fetch users every 1 second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="container">
      <div className="card text-center">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} onClick={() => handleOnClick(user._id)}>
                <td>
                  <a href={`/user/${user._id}`} className="table-link">
                    {user.name}
                  </a>
                </td>
                <td>{user.email}</td>
                <td>{user.address}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
