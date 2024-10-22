import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <NavLink
        to="/create-team"
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        Create Team
      </NavLink>
      <NavLink
        to="/teams"
        className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700"
      >
        View Teams
      </NavLink>
    </div>
  );
};

export default Home;
