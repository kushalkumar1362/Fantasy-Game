import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateTeamForm = () => {
  const [selectedTeam, setSelectedTeam] = useState('India');
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [players, setPlayers] = useState([]);
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(`${API_URL}/get-players/${selectedTeam}`);
        const data = response.data;
        if (data.success) {
          const sortedPlayers = data.players.sort((a, b) => b.rating - a.rating);
          setPlayers(sortedPlayers);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPlayers();
  }, [API_URL, selectedTeam]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedPlayers.length < 11) {
      return;
    }

    if (selectedPlayers.length > 11) {
      toast.error('You can only select up to 11 players.');
      return;
    }
    let id;
    try {
      id = toast.loading("Creating team")
      const response = await axios.post(`${API_URL}/create-teams`, {
        team: selectedTeam,
        players: selectedPlayers,
      });

      const data = response.data;
      if (data.success) {
        toast.success('Team created successfully!');
        setSelectedPlayers([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong.');
    }
    finally {
      toast.dismiss(id);
    }
  };

  const handlePlayerSelection = (playerId) => {
    if (selectedPlayers.includes(playerId)) {
      setSelectedPlayers(selectedPlayers.filter((id) => id !== playerId));
    } else {
      setSelectedPlayers([...selectedPlayers, playerId]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Create a New Team</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Your Team</label>
        <select
          value={selectedTeam}
          onChange={(e) => setSelectedTeam(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md outline-none"
          required
        >
          <option value="India">India</option>
          <option value="Australia">Australia</option>
          <option value="England">England</option>
          <option value="New Zealand">New Zealand</option>
          <option value="Pakistan">Pakistan</option>
          <option value="West Indies">West Indies</option>
          <option value="Sri Lanka">Sri Lanka</option>
          <option value="Bangladesh">Bangladesh</option>
          <option value="Afghanistan">Afghanistan</option>
        </select>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium">Select Players (Max 11)</h3>
        <p className="text-sm text-gray-600">{selectedPlayers.length} players selected</p>
        <div className="overflow-x-auto">
          <table className="mt-4 w-full border-collapse border border-gray-300">
            <thead className="text-left bg-gray-200">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Position</th>
                <th className="px-4 py-2 text-center">Rating</th>
                <th className="px-4 py-2 text-center">Points</th>
                <th className="px-4 py-2 text-center">Matches Played</th>
                <th className="px-4 py-2 text-center">Runs Scored</th>
                <th className="px-4 py-2 text-center">Wickets Taken</th>
              </tr>
            </thead>
            <tbody className="text-left">
              {players.map((player) => (
                <tr
                  key={player._id}
                  className={`${selectedPlayers.includes(player._id) ? 'bg-green-100' : 'hover:bg-gray-100'} 
                  cursor-pointer
                    ${player.isAvailable === false ? 'opacity-50' : ''}`}
                  onClick={() => player.isAvailable ? handlePlayerSelection(player._id) : null}
                  title={player.isAvailable ? '' : 'Player is not available'}
                >
                  <td className="px-4 py-2">{player.name}</td>
                  <td className="px-4 py-2">{player.position}</td>
                  <td className="px-4 py-2 text-center">{player.rating}</td>
                  <td className="px-4 py-2 text-center">{player.points}</td>
                  <td className="px-4 py-2 text-center">{player.matchesPlayed}</td>
                  <td className="px-4 py-2 text-center">{player.runsScored}</td>
                  <td className="px-4 py-2 text-center">{player.wicketsTaken}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        type="submit"
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 w-full"
      >
        Create Team
      </button>
    </form>
  );
};

export default CreateTeamForm;
