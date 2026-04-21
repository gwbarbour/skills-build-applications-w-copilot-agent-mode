import React, { useState, useEffect } from 'react';
import { formatApiURL, parseData } from '../utils/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const apiUrl = formatApiURL('workouts');
        console.log('Fetching workouts from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response for workouts:', data);
        
        const parsedData = parseData(data);
        console.log('Parsed workouts data:', parsedData);
        
        setWorkouts(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching workouts:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  const getIntensityBadge = (intensity) => {
    if (!intensity) return <span className="badge bg-secondary">N/A</span>;
    const lower = intensity.toLowerCase();
    if (lower === 'high') return <span className="badge bg-danger">High</span>;
    if (lower === 'medium') return <span className="badge bg-warning">Medium</span>;
    if (lower === 'low') return <span className="badge bg-success">Low</span>;
    return <span className="badge bg-info">{intensity}</span>;
  };

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">💪 Workouts</h1>
        <button className="btn btn-success">+ Log Workout</button>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="alert-heading">No Workouts Yet</h5>
          <p>Start tracking your workouts to build your fitness journey!</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-dark">
            <h5 className="mb-0 text-white">Workout Log</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="8%">ID</th>
                  <th scope="col" width="20%">Name</th>
                  <th scope="col" width="15%">Duration</th>
                  <th scope="col" width="15%">Intensity</th>
                  <th scope="col" width="20%">User</th>
                  <th scope="col" width="15%">Date</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout) => (
                  <tr key={workout.id}>
                    <td><span className="badge bg-primary">{workout.id}</span></td>
                    <td><strong>{workout.name}</strong></td>
                    <td>{workout.duration ? <span>{workout.duration} min</span> : <span className="text-muted">—</span>}</td>
                    <td>{getIntensityBadge(workout.intensity)}</td>
                    <td>{workout.user_name || workout.user || 'Unknown'}</td>
                    <td>{new Date(workout.created_at || workout.date).toLocaleDateString()}</td>
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
