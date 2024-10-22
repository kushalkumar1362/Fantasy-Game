const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Player = require('./models/player.model');

const players = [
  // India
  { name: "Virat Kohli", team: "India", position: "Batsman", points: 1500, matchesPlayed: 250, runsScored: 12000, wicketsTaken: 0, rating: 9.5 },
  { name: "Rohit Sharma", team: "India", position: "Batsman", points: 1400, matchesPlayed: 220, runsScored: 11000, wicketsTaken: 0, rating: 9.3 },
  { name: "Shubman Gill", team: "India", position: "Batsman", points: 1300, matchesPlayed: 70, runsScored: 3000, wicketsTaken: 0, rating: 8.9 },
  { name: "KL Rahul", team: "India", position: "Batsman", points: 1200, matchesPlayed: 90, runsScored: 4000, wicketsTaken: 0, rating: 8.8 },
  { name: "Hardik Pandya", team: "India", position: "All-Rounder", points: 1400, matchesPlayed: 100, runsScored: 3500, wicketsTaken: 80, rating: 9.0 },
  { name: "Ravindra Jadeja", team: "India", position: "All-Rounder", points: 1600, matchesPlayed: 200, runsScored: 4000, wicketsTaken: 150, rating: 9.3 },
  { name: "Jasprit Bumrah", team: "India", position: "Bowler", points: 1800, matchesPlayed: 100, runsScored: 250, wicketsTaken: 200, rating: 9.4 },
  { name: "Yuzvendra Chahal", team: "India", position: "Bowler", points: 1400, matchesPlayed: 80, runsScored: 100, wicketsTaken: 120, rating: 8.7 },
  { name: "Mohammed Shami", team: "India", position: "Bowler", points: 1600, matchesPlayed: 90, runsScored: 200, wicketsTaken: 140, rating: 9.0 },
  { name: "Rishabh Pant", team: "India", position: "Wicket-Keeper", points: 1600, matchesPlayed: 70, runsScored: 3000, wicketsTaken: 0, rating: 8.7 },
  { name: "Suryakumar Yadav", team: "India", position: "Batsman", points: 1400, matchesPlayed: 50, runsScored: 2000, wicketsTaken: 0, rating: 8.9, isAvailable :false },
  { name: "Shikhar Dhawan", team: "India", position: "Batsman", points: 1500, matchesPlayed: 150, runsScored: 6000, wicketsTaken: 0, rating: 8.8 },
  { name: "Bhuvneshwar Kumar", team: "India", position: "Bowler", points: 1400, matchesPlayed: 100, runsScored: 300, wicketsTaken: 120, rating: 8.6 },

  // Australia
  { name: "David Warner", team: "Australia", position: "Batsman", points: 1650, matchesPlayed: 140, runsScored: 8500, wicketsTaken: 0, rating: 9.1 },
  { name: "Steve Smith", team: "Australia", position: "Batsman", points: 1700, matchesPlayed: 150, runsScored: 9000, wicketsTaken: 5, rating: 9.4 },
  { name: "Pat Cummins", team: "Australia", position: "Bowler", points: 1600, matchesPlayed: 90, runsScored: 600, wicketsTaken: 180, rating: 9.2 },
  { name: "Glenn Maxwell", team: "Australia", position: "All-Rounder", points: 1600, matchesPlayed: 100, runsScored: 5000, wicketsTaken: 60, rating: 9.1 },
  { name: "Aaron Finch", team: "Australia", position: "Batsman", points: 1400, matchesPlayed: 120, runsScored: 5500, wicketsTaken: 0, rating: 8.9 },
  { name: "Mitchell Starc", team: "Australia", position: "Bowler", points: 1700, matchesPlayed: 110, runsScored: 500, wicketsTaken: 200, rating: 9.3 },
  { name: "Josh Hazlewood", team: "Australia", position: "Bowler", points: 1600, matchesPlayed: 100, runsScored: 250, wicketsTaken: 160, rating: 9.0 },
  { name: "Marcus Stoinis", team: "Australia", position: "All-Rounder", points: 1400, matchesPlayed: 80, runsScored: 4000, wicketsTaken: 90, rating: 8.8 },
  { name: "Adam Zampa", team: "Australia", position: "Bowler", points: 1500, matchesPlayed: 90, runsScored: 100, wicketsTaken: 110, rating: 8.9 },
  { name: "Matthew Wade", team: "Australia", position: "Wicket-Keeper", points: 1400, matchesPlayed: 100, runsScored: 3500, wicketsTaken: 0, rating: 8.7 },
  { name: "Alex Carey", team: "Australia", position: "Wicket-Keeper", points: 1400, matchesPlayed: 90, runsScored: 3200, wicketsTaken: 0, rating: 8.6 },
  { name: "Cameron Green", team: "Australia", position: "All-Rounder", points: 1400, matchesPlayed: 50, runsScored: 1500, wicketsTaken: 40, rating: 8.5 },
  { name: "Mitchell Marsh", team: "Australia", position: "All-Rounder", points: 1500, matchesPlayed: 100, runsScored: 4000, wicketsTaken: 100, rating: 8.9 },

  // England
  { name: "Joe Root", team: "England", position: "Batsman", points: 1800, matchesPlayed: 140, runsScored: 8000, wicketsTaken: 30, rating: 9.4 },
  { name: "Ben Stokes", team: "England", position: "All-Rounder", points: 2300, matchesPlayed: 85, runsScored: 4500, wicketsTaken: 150, rating: 9.6 },
  { name: "Jos Buttler", team: "England", position: "Wicket-Keeper", points: 1600, matchesPlayed: 130, runsScored: 5000, wicketsTaken: 0, rating: 8.9 },
  { name: "Jonny Bairstow", team: "England", position: "Wicket-Keeper", points: 1600, matchesPlayed: 110, runsScored: 5500, wicketsTaken: 0, rating: 9.0 },
  { name: "Jofra Archer", team: "England", position: "Bowler", points: 1500, matchesPlayed: 50, runsScored: 200, wicketsTaken: 80, rating: 9.0 },
  { name: "Chris Woakes", team: "England", position: "Bowler", points: 1600, matchesPlayed: 100, runsScored: 1000, wicketsTaken: 120, rating: 8.9 },
  { name: "Moeen Ali", team: "England", position: "All-Rounder", points: 1500, matchesPlayed: 100, runsScored: 3000, wicketsTaken: 90, rating: 8.8 },
  { name: "Adil Rashid", team: "England", position: "Bowler", points: 1400, matchesPlayed: 90, runsScored: 200, wicketsTaken: 100, rating: 8.8 },
  { name: "Sam Curran", team: "England", position: "All-Rounder", points: 1500, matchesPlayed: 50, runsScored: 1500, wicketsTaken: 80, rating: 8.7 },
  { name: "Jason Roy", team: "England", position: "Batsman", points: 1400, matchesPlayed: 90, runsScored: 5000, wicketsTaken: 0, rating: 8.6, isAvailable:false },
  { name: "Dawid Malan", team: "England", position: "Batsman", points: 1300, matchesPlayed: 60, runsScored: 2000, wicketsTaken: 0, rating: 8.4 },
  { name: "Mark Wood", team: "England", position: "Bowler", points: 1500, matchesPlayed: 60, runsScored: 250, wicketsTaken: 90, rating: 8.9 },
  { name: "Ollie Pope", team: "England", position: "Batsman", points: 1300, matchesPlayed: 40, runsScored: 1500, wicketsTaken: 0, rating: 8.2 },

  // New Zealand
  { name: "Kane Williamson", team: "New Zealand", position: "Batsman", points: 2000, matchesPlayed: 150, runsScored: 8000, wicketsTaken: 0, rating: 9.5 },
  { name: "Martin Guptill", team: "New Zealand", position: "Batsman", points: 1800, matchesPlayed: 140, runsScored: 6000, wicketsTaken: 0, rating: 9.2 },
  { name: "Trent Boult", team: "New Zealand", position: "Bowler", points: 1900, matchesPlayed: 100, runsScored: 200, wicketsTaken: 180, rating: 9.3 },
  { name: "Tim Southee", team: "New Zealand", position: "Bowler", points: 1800, matchesPlayed: 120, runsScored: 400, wicketsTaken: 180, rating: 9.1 },
  { name: "Tom Latham", team: "New Zealand", position: "Wicket-Keeper", points: 1600, matchesPlayed: 100, runsScored: 4000, wicketsTaken: 0, rating: 8.8 },
  { name: "Ross Taylor", team: "New Zealand", position: "Batsman", points: 2000, matchesPlayed: 230, runsScored: 11000, wicketsTaken: 0, rating: 9.4 },
  { name: "Jimmy Neesham", team: "New Zealand", position: "All-Rounder", points: 1500, matchesPlayed: 80, runsScored: 2500, wicketsTaken: 100, rating: 8.6 },
  { name: "Mitchell Santner", team: "New Zealand", position: "All-Rounder", points: 1600, matchesPlayed: 90, runsScored: 2000, wicketsTaken: 70, rating: 8.7 },
  { name: "Devon Conway", team: "New Zealand", position: "Batsman", points: 1500, matchesPlayed: 60, runsScored: 2000, wicketsTaken: 0, rating: 8.5 },
  { name: "Lockie Ferguson", team: "New Zealand", position: "Bowler", points: 1700, matchesPlayed: 80, runsScored: 100, wicketsTaken: 120, rating: 8.8 },
  { name: "Daryl Mitchell", team: "New Zealand", position: "All-Rounder", points: 1400, matchesPlayed: 50, runsScored: 1500, wicketsTaken: 40, rating: 8.4 },
  { name: "Colin de Grandhomme", team: "New Zealand", position: "All-Rounder", points: 1300, matchesPlayed: 60, runsScored: 1800, wicketsTaken: 50, rating: 8.3 },
  { name: "Ish Sodhi", team: "New Zealand", position: "Bowler", points: 1400, matchesPlayed: 70, runsScored: 50, wicketsTaken: 100, rating: 8.5 },


  // Pakistan
  { name: "Babar Azam", team: "Pakistan", position: "Batsman", points: 2000, matchesPlayed: 100, runsScored: 5000, wicketsTaken: 0, rating: 9.5 },
  { name: "Shaheen Afridi", team: "Pakistan", position: "Bowler", points: 1800, matchesPlayed: 70, runsScored: 100, wicketsTaken: 130, rating: 9.0 },
  { name: "Mohammad Rizwan", team: "Pakistan", position: "Wicket-Keeper", points: 1700, matchesPlayed: 80, runsScored: 3000, wicketsTaken: 0, rating: 8.9 },
  { name: "Fakhar Zaman", team: "Pakistan", position: "Batsman", points: 1600, matchesPlayed: 50, runsScored: 2000, wicketsTaken: 0, rating: 8.6 },
  { name: "Shadab Khan", team: "Pakistan", position: "All-Rounder", points: 1500, matchesPlayed: 90, runsScored: 1800, wicketsTaken: 100, rating: 8.7 },
  { name: "Haris Rauf", team: "Pakistan", position: "Bowler", points: 1400, matchesPlayed: 50, runsScored: 100, wicketsTaken: 70, rating: 8.4 },
  { name: "Hasan Ali", team: "Pakistan", position: "Bowler", points: 1300, matchesPlayed: 80, runsScored: 150, wicketsTaken: 90, rating: 8.5 },
  { name: "Imad Wasim", team: "Pakistan", position: "All-Rounder", points: 1400, matchesPlayed: 60, runsScored: 1200, wicketsTaken: 60, rating: 8.3 },
  { name: "Sarfaraz Ahmed", team: "Pakistan", position: "Wicket-Keeper", points: 1500, matchesPlayed: 70, runsScored: 2500, wicketsTaken: 0, rating: 8.2 },
  { name: "Mohammad Nawaz", team: "Pakistan", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 800, wicketsTaken: 40, rating: 8.4 },
  { name: "Usman Qadir", team: "Pakistan", position: "Bowler", points: 1400, matchesPlayed: 30, runsScored: 50, wicketsTaken: 30, rating: 8.3 },
  { name: "Iftikhar Ahmed", team: "Pakistan", position: "All-Rounder", points: 1300, matchesPlayed: 50, runsScored: 1200, wicketsTaken: 20, rating: 8.1 },

  // West Indies
  { name: "Kieron Pollard", team: "West Indies", position: "All-Rounder", points: 1600, matchesPlayed: 100, runsScored: 4000, wicketsTaken: 100, rating: 8.8 },
  { name: "Jason Holder", team: "West Indies", position: "All-Rounder", points: 1500, matchesPlayed: 90, runsScored: 3500, wicketsTaken: 150, rating: 8.7 },
  { name: "Shimron Hetmyer", team: "West Indies", position: "Batsman", points: 1400, matchesPlayed: 60, runsScored: 2000, wicketsTaken: 0, rating: 8.5 },
  { name: "Nicholas Pooran", team: "West Indies", position: "Wicket-Keeper", points: 1600, matchesPlayed: 50, runsScored: 1800, wicketsTaken: 0, rating: 8.6 },
  { name: "Andre Russell", team: "West Indies", position: "All-Rounder", points: 1800, matchesPlayed: 80, runsScored: 3000, wicketsTaken: 100, rating: 9.1 },
  { name: "Chris Gayle", team: "West Indies", position: "Batsman", points: 2000, matchesPlayed: 250, runsScored: 12000, wicketsTaken: 50, rating: 9.5 },
  { name: "Shai Hope", team: "West Indies", position: "Wicket-Keeper", points: 1500, matchesPlayed: 70, runsScored: 2500, wicketsTaken: 0, rating: 8.3 },
  { name: "Rovman Powell", team: "West Indies", position: "Batsman", points: 1400, matchesPlayed: 50, runsScored: 1500, wicketsTaken: 0, rating: 8.2 },
  { name: "Evin Lewis", team: "West Indies", position: "Batsman", points: 1300, matchesPlayed: 60, runsScored: 2000, wicketsTaken: 0, rating: 8.1 },
  { name: "Fabian Allen", team: "West Indies", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 800, wicketsTaken: 30, rating: 8.1 },
  { name: "Alzarri Joseph", team: "West Indies", position: "Bowler", points: 1400, matchesPlayed: 50, runsScored: 100, wicketsTaken: 50, rating: 8.4 },
  { name: "Sheldon Cottrell", team: "West Indies", position: "Bowler", points: 1400, matchesPlayed: 50, runsScored: 100, wicketsTaken: 40, rating: 8.5 },
  { name: "Roston Chase", team: "West Indies", position: "All-Rounder", points: 1300, matchesPlayed: 60, runsScored: 1200, wicketsTaken: 40, rating: 8.3 },

  // Sri Lanka
  { name: "Kusal Perera", team: "Sri Lanka", position: "Batsman", points: 1600, matchesPlayed: 70, runsScored: 3000, wicketsTaken: 0, rating: 8.9 },
  { name: "Angelo Mathews", team: "Sri Lanka", position: "All-Rounder", points: 1800, matchesPlayed: 150, runsScored: 7000, wicketsTaken: 100, rating: 9.1 },
  { name: "Dhananjaya de Silva", team: "Sri Lanka", position: "All-Rounder", points: 1400, matchesPlayed: 80, runsScored: 2500, wicketsTaken: 50, rating: 8.5 },
  { name: "Wanindu Hasaranga", team: "Sri Lanka", position: "All-Rounder", points: 1500, matchesPlayed: 50, runsScored: 1000, wicketsTaken: 70, rating: 8.8 },
  { name: "Dasun Shanaka", team: "Sri Lanka", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 900, wicketsTaken: 30, rating: 8.3 },
  { name: "Dimuth Karunaratne", team: "Sri Lanka", position: "Batsman", points: 1400, matchesPlayed: 60, runsScored: 4000, wicketsTaken: 0, rating: 8.6 },
  { name: "Kusal Mendis", team: "Sri Lanka", position: "Batsman", points: 1500, matchesPlayed: 50, runsScored: 2000, wicketsTaken: 0, rating: 8.5 },
  { name: "Dushmantha Chameera", team: "Sri Lanka", position: "Bowler", points: 1400, matchesPlayed: 50, runsScored: 100, wicketsTaken: 60, rating: 8.4 },
  { name: "Pathum Nissanka", team: "Sri Lanka", position: "Batsman", points: 1300, matchesPlayed: 40, runsScored: 1200, wicketsTaken: 0, rating: 8.2 },
  { name: "Charith Asalanka", team: "Sri Lanka", position: "Batsman", points: 1300, matchesPlayed: 30, runsScored: 1000, wicketsTaken: 0, rating: 8.1 },
  { name: "Lahiru Kumara", team: "Sri Lanka", position: "Bowler", points: 1400, matchesPlayed: 50, runsScored: 100, wicketsTaken: 50, rating: 8.3 },
  { name: "Avishka Fernando", team: "Sri Lanka", position: "Batsman", points: 1300, matchesPlayed: 40, runsScored: 1500, wicketsTaken: 0, rating: 8.2 },
  { name: "Maheesh Theekshana", team: "Sri Lanka", position: "Bowler", points: 1400, matchesPlayed: 40, runsScored: 100, wicketsTaken: 50, rating: 8.3 },

  // Bangladesh
  { name: "Shakib Al Hasan", team: "Bangladesh", position: "All-Rounder", points: 1800, matchesPlayed: 100, runsScored: 4000, wicketsTaken: 150, rating: 9.2 },
  { name: "Tamim Iqbal", team: "Bangladesh", position: "Batsman", points: 1600, matchesPlayed: 120, runsScored: 8000, wicketsTaken: 0, rating: 8.9 },
  { name: "Mushfiqur Rahim", team: "Bangladesh", position: "Wicket-Keeper", points: 1500, matchesPlayed: 90, runsScored: 6000, wicketsTaken: 0, rating: 8.8 },
  { name: "Liton Das", team: "Bangladesh", position: "Wicket-Keeper", points: 1400, matchesPlayed: 70, runsScored: 3000, wicketsTaken: 0, rating: 8.5 },
  { name: "Mustafizur Rahman", team: "Bangladesh", position: "Bowler", points: 1600, matchesPlayed: 90, runsScored: 100, wicketsTaken: 150, rating: 9.0 },
  { name: "Mahmudullah", team: "Bangladesh", position: "All-Rounder", points: 1500, matchesPlayed: 80, runsScored: 3500, wicketsTaken: 80, rating: 8.7 },
  { name: "Taskin Ahmed", team: "Bangladesh", position: "Bowler", points: 1400, matchesPlayed: 60, runsScored: 150, wicketsTaken: 50, rating: 8.4 },
  { name: "Soumya Sarkar", team: "Bangladesh", position: "Batsman", points: 1300, matchesPlayed: 50, runsScored: 1500, wicketsTaken: 0, rating: 8.2 },
  { name: "Mehidy Hasan", team: "Bangladesh", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 1000, wicketsTaken: 40, rating: 8.1 },
  { name: "Afif Hossain", team: "Bangladesh", position: "Batsman", points: 1300, matchesPlayed: 30, runsScored: 800, wicketsTaken: 0, rating: 8.0 },
  { name: "Mohammad Saifuddin", team: "Bangladesh", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 700, wicketsTaken: 30, rating: 8.0 },
  { name: "Shoriful Islam", team: "Bangladesh", position: "Bowler", points: 1300, matchesPlayed: 40, runsScored: 50, wicketsTaken: 40, rating: 8.0 },
  { name: "Nasum Ahmed", team: "Bangladesh", position: "Bowler", points: 1300, matchesPlayed: 30, runsScored: 30, wicketsTaken: 30, rating: 8.0 },

  // Afghanistan
  { name: "Rashid Khan", team: "Afghanistan", position: "Bowler", points: 2000, matchesPlayed: 80, runsScored: 150, wicketsTaken: 150, rating: 9.5 },
  { name: "Mohammad Nabi", team: "Afghanistan", position: "All-Rounder", points: 1800, matchesPlayed: 100, runsScored: 3000, wicketsTaken: 100, rating: 9.2 },
  { name: "Mujeeb Ur Rahman", team: "Afghanistan", position: "Bowler", points: 1600, matchesPlayed: 60, runsScored: 100, wicketsTaken: 80, rating: 8.9 },
  { name: "Rahmanullah Gurbaz", team: "Afghanistan", position: "Wicket-Keeper", points: 1400, matchesPlayed: 40, runsScored: 1200, wicketsTaken: 0, rating: 8.5 },
  { name: "Hazratullah Zazai", team: "Afghanistan", position: "Batsman", points: 1300, matchesPlayed: 30, runsScored: 800, wicketsTaken: 0, rating: 8.2 },
  { name: "Najibullah Zadran", team: "Afghanistan", position: "Batsman", points: 1300, matchesPlayed: 30, runsScored: 600, wicketsTaken: 0, rating: 8.1 },
  { name: "Gulbadin Naib", team: "Afghanistan", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 1200, wicketsTaken: 50, rating: 8.0 },
  { name: "Sharafuddin Ashraf", team: "Afghanistan", position: "All-Rounder", points: 1300, matchesPlayed: 40, runsScored: 800, wicketsTaken: 20, rating: 8.0 },
  { name: "Fazalhaq Farooqi", team: "Afghanistan", position: "Bowler", points: 1300, matchesPlayed: 30, runsScored: 40, wicketsTaken: 25, rating: 8.0 },
  { name: "Zahir Khan", team: "Afghanistan", position: "Bowler", points: 1300, matchesPlayed: 30, runsScored: 10, wicketsTaken: 20, rating: 8.0 },
];

async function seedPlayers() {
  try {
    await Player.deleteMany({});
    console.log('All existing players removed');

    await Player.insertMany(players);
    console.log('Player data added successfully');

  } catch (error) {
    console.error('Error seeding player data:', error);
  }
}

async function connectAndSeedPlayers() {
  try {
    console.log('Connecting to database for player seeding');
    await mongoose.connect(process.env.MONGODB_URL, {});
    console.log('Database connected successfully');

    await seedPlayers();
    console.log('Player data seeded successfully');

    await mongoose.disconnect();
    console.log('Database disconnected after seeding players');

  } catch (error) {
    console.error('Database connection error:', error);
    await mongoose.disconnect();
  }
}

connectAndSeedPlayers();


