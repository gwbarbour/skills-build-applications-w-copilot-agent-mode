import React, { useState, useEffect } from 'react';
import { formatApiURL, parseData } from '../utils/api';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const apiUrl = formatApiURL('leaderboard');
        console.log('Fetching leaderboard from:', apiUrl);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Raw API response for leaderboard:', data);
        
        const parsedData = parseData(data);
        console.log('Parsed leaderboard data:', parsedData);
        
        setLeaderboard(parsedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4 mb-5">
      <h1 className="h2 mb-4">🏆 Leaderboard Rankings</h1>
      
      {leaderboard.length === 0 ? (
        <div className="alert alert-info text-center py-5" role="alert">
          <h5 className="alert-heading">No Leaderboard Data</h5>
          <p>No leaderboard entries available yet.</p>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-header bg-dark">
            <h5 className="mb-0 text-white">Top Performers</h5>
          </div>
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" width="10%" className="text-center">Rank</th>
                  <th scope="col" width="25%">User</th>
                  <th scope="col" width="25%">Team</th>
                  <th scope="col" width="20%" className="text-center">Score</th>
                  <th scope="col" width="20%" className="text-center">Activities</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={entry.id} className={index < 3 ? 'table-light' : ''}>
                    <td className="text-center">
                      <h5 className="mb-0">
                        {index === 0 && <span className="badge bg-warning">🥇 1st</span>}
                        {index === 1 && <span className="badge bg-secondary">🥈 2nd</span>}
                        {index === 2 && <span className="badge bg-danger">🥉 3rd</span>}
                        {index > 2 && <span className="badge bg-primary">{index + 1}</span>}
                      </h5>
                    </td>
                    <td><strong>{entry.user_name || entry.username || 'Unknown'}</strong></td>
                    <td>{entry.team_name || entry.team || <span className="text-muted">N/A</span>}</td>
                    <td className="text-center"><span className="badge bg-success fs-6">{entry.score || entry.points || 0}</span></td>
                    <td className="text-center">{entry.activity_count || 0}</td>
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
