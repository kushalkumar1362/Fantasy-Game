import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CreateTeamPage from './pages/CreateTeamPage';
import TeamPage from './pages/TeamPage';
import Home from './pages/Home';
import TeamDetails from './components/TeamDetails';

function App() {
  return (
    <div className=" w-screen mx-auto bg-gray-100">
      <Routes>
        {/* Redirect from "/" to "/create-team" */}
        <Route path="/" element={<Home />} />
        <Route path="/create-team" element={<CreateTeamPage />} />
        <Route path="/team/:teamId" element={<TeamPage />} />
        <Route path="/teams" element={<TeamDetails />} />
      </Routes>
    </div>
  );
}

export default App;
