import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


const UserTable = () => {
  const [users, setUsers] = useState([]);

  const handleOnClick = (userid) => {
    console.log(userid)
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/users');
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
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

              <tr key={user._id} onClick={()=>handleOnClick(user._id)} >
                {/* <Link to={`/users/${user._id}`}> */}
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.address}
                </td>
                {/* </Link> */}
              </tr>

            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default UserTable;
