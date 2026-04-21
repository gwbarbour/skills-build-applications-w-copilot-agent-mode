import React, { useState, useEffect } from 'react';
import { formatApiURL, parseData } from '../utils/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiUrl = formatApiURL('users');
        console.log('Fetching users from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response for users:', data);
        
        const parsedData = parseData(data);
        console.log('Parsed users data:', parsedData);
        
        setUsers(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">👤 Users</h1>
        <button className="btn btn-success">+ Add User</button>
      </div>
      
      {users.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="alert-heading">No Users Found</h5>
          <p>No users available yet.</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-dark">
            <h5 className="mb-0 text-white">User Directory</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="10%">ID</th>
                  <th scope="col" width="20%">Username</th>
                  <th scope="col" width="25%">Email</th>
                  <th scope="col" width="20%">Team</th>
                  <th scope="col" width="15%">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td><span className="badge bg-info">{user.id}</span></td>
                    <td><strong>{user.username}</strong></td>
                    <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                    <td>{user.team_name || user.team ? <span className="badge bg-primary">{user.team_name || user.team}</span> : <span className="text-muted">—</span>}</td>
                    <td>{new Date(user.created_at || user.date_joined).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
