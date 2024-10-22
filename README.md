# Fantasy Game

Fantasy Game is a comprehensive application that enables users to create, manage, and track their fantasy teams within a fantasy league. It features a robust backend powered by Node.js and Express.js with MongoDB for data storage and a dynamic React frontend for user interaction.

## Features
- Build and manage fantasy teams
- Choose players from an extensive pool
- Each team can include up to 11 players

## Backend Documentation

### Technology Stack

- **Backend Framework:** Node.js with Express.js
- **Database:** MongoDB
- **Hosting:** Render

### API Endpoints

#### Teams

- **GET /teams**: Fetches all teams.
  - **Response:** A list of teams with player details and total points.
- **GET /teams/:id**: Fetches a specific team by its ID.
  - **Response:** Details of the specified team, including players and total points.
- **POST /teams**: Creates a new team with selected players.
  - **Response:** Details of the newly created team.

#### Players

- **GET /players/:teamName**: Fetches all players in a specified team.
  - **Response:** A list of players and their attributes.

## Frontend Documentation

### Technology Stack

- **Frontend Framework:** React.js
- **Styling:** Tailwind CSS
- **Hosting:** Vercel

### Components

- **CreateTeamForm.jsx**: A form component for creating fantasy teams, allowing users to input team names and select players.
- **PlayerList.jsx**: Displays a comprehensive list of all available players.
- **TeamDetails.jsx**: Shows details of a user's team, including selected players and total points.
- **CreateTeamPage.jsx**: Hosts the CreateTeamForm component, serving as the interface for team creation.
- **Home.jsx**: The app's landing page, allowing navigation to team creation or team overview.
- **TeamPage.jsx**: Displays detailed information about a specific team, utilizing the TeamDetails component and fetching data based on the team ID route parameter.
