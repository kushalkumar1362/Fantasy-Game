import React, { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const TeamDetails = () => {
  const [teams, setTeams] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchTeams = async () => {
      let id = toast.loading("Loading Teams");
      try {
        const { data } = await axios.get(`${API_URL}/get-all-teams`);
        if (data.success) {
          const sortedTeams = data.teams.sort((a, b) => b.totalPoints - a.totalPoints);
          setTeams(sortedTeams);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
      } finally {
        toast.dismiss(id);
      }
    };

    fetchTeams();
  }, [API_URL]);

  return (
    <div className="w-full h-full bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">All Teams</h2>
      <table className="mt-4 w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Sr. No.</th>
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Total Points</th>
          </tr>
        </thead>
        <tbody>
          {teams.map((team, index) => (
            <tr key={team._id} className="border-t border-b border-gray-300 hover:bg-gray-100 text-center">
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Link to={`/team/${team._id}`} className="text-blue-600 underline">
                  {team.name}
                </Link>
              </td>
              <td className="px-4 py-2">{team.totalPoint}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamDetails;


