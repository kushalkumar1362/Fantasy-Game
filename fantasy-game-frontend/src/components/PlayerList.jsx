import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PlayerList = ({ teamId }) => {
  const [players, setPlayers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-team/${teamId}`);
        const data = response.data;
        if (data.success) {
          const { team } = data;
          const sortedPlayers = team ? team.sort((a, b) => b.points - a.points) : [];
          setPlayers(sortedPlayers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayers();
  }, [API_URL, teamId]);

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-xl sm:text-2xl font-semibold mb-4">Players</h2>

      {/* Table layout for larger screens */}
      <div className="hidden sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="p-2 border border-gray-300">Rank</th>
              <th className="p-2 border border-gray-300 text-start">Name</th>
              <th className="p-2 border border-gray-300">Position</th>
              <th className="p-2 border border-gray-300">Points</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player, index) => (
              <tr key={player._id} className="bg-gray-100 hover:bg-gray-200">
                <td className="p-2 border border-gray-300 text-center">{index + 1}</td>
                <td className="p-2 border border-gray-300">{player.name}</td>
                <td className="p-2 border border-gray-300 text-center">{player.position}</td>
                <td className="p-2 border border-gray-300 text-center">{player.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Block layout for small screens */}
      <div className="sm:hidden">
        {players.map((player, index) => (
          <div key={player._id} className="border border-gray-300 p-4 mb-2 rounded-lg bg-gray-100">
            <p className="font-semibold flex items-center justify-between">Rank: <span className='font-normal '>{index + 1}</span></p>
            <p className="font-semibold flex items-center justify-between">Name: <span className='font-normal '>{player.name}</span></p>
            <p className="font-semibold flex items-center justify-between">Position: <span className='font-normal '>{player.position}</span></p>
            <p className="font-semibold flex items-center justify-between">Points: <span className='font-normal '>{player.points}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
