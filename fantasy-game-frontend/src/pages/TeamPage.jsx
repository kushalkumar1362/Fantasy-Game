import React from 'react';
import { useParams } from 'react-router-dom';
import PlayerList from '../components/PlayerList';

const TeamPage = () => {
  const { teamId } = useParams(); // Get team ID from route params

  return (
    <div className="container mx-auto p-6">
      <PlayerList teamId={teamId} />
    </div>
  );
};

export default TeamPage;
