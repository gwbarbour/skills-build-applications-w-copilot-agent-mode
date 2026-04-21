import React, { useState, useEffect } from 'react';
import { formatApiURL, parseData } from '../utils/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const apiUrl = formatApiURL('teams');
        console.log('Fetching teams from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response for teams:', data);
        
        const parsedData = parseData(data);
        console.log('Parsed teams data:', parsedData);
        
        setTeams(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching teams:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4 mb-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h2 mb-0">👥 Teams</h1>
        <button className="btn btn-success">+ Create Team</button>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="alert-heading">No Teams Found</h5>
          <p>No teams available yet. Create your first team to get started!</p>
        </div>
      ) : (
        <div className="row g-4">
          {teams.map((team) => (
            <div className="col-md-6 col-lg-4" key={team.id}>
              <div className="card h-100 shadow-sm border-0 team-card">
                <div className="card-header bg-primary">
                  <h5 className="card-title mb-0 text-white">👥 {team.name}</h5>
                </div>
                <div className="card-body d-flex flex-column">
                  <p className="card-text text-muted flex-grow-1">{team.description || 'No description available'}</p>
                  <div className="row text-center mb-3">
                    <div className="col-6">
                      <small className="text-muted">Members</small>
                      <h5 className="mb-0">{team.member_count || 0}</h5>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Created</small>
                      <p className="mb-0 small">{new Date(team.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-white border-top">
                  <button className="btn btn-outline-primary btn-sm w-100">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
