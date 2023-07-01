import React from 'react';
import { useLoaderData } from 'react-router-dom';


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

  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">User Details</h5>
          Name : <p className="card-text"> {data.user.name}</p>
          Email:<p className="card-text"> {data.user.email}</p>
          Address :<p className="card-text"> {data.user.address}</p>
        </div>
      </div>
    </div>

  );
}
