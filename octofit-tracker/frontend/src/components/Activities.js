import React, { useState, useEffect } from 'react';
import { formatApiURL, parseData } from '../utils/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const apiUrl = formatApiURL('activities');
        console.log('Fetching activities from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response for activities:', data);
        
        const parsedData = parseData(data);
        console.log('Parsed activities data:', parsedData);
        
        setActivities(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching activities:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="alert alert-info">Loading activities...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">📊 Activities</h1>
        <button className="btn btn-success">+ Add Activity</button>
      </div>
      
      {activities.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="alert-heading">No Activities Yet</h5>
          <p>No activities found. Start by adding your first activity!</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-dark">
            <h5 className="mb-0 text-white">Activity List</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="10%">ID</th>
                  <th scope="col" width="25%">Name</th>
                  <th scope="col" width="45%">Description</th>
                  <th scope="col" width="20%">Created At</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity.id}>
                    <td><span className="badge bg-primary">{activity.id}</span></td>
                    <td><strong>{activity.name}</strong></td>
                    <td>{activity.description}</td>
                    <td>{new Date(activity.created_at).toLocaleDateString()}</td>
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
