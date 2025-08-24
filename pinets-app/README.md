# PiNets - Pi Coin Management Platform

PiNets is a web application for managing and selling Pi Coin. It provides a user-friendly interface for users to register, log in with their Pi Coin passphrase, view their wallet balance, and sell their Pi Coin.

## Features

### User Features
- Registration with email and Pi Coin passphrase
- Secure login with passphrase verification
- Dashboard to view Pi Coin wallet balance
- Option to sell Pi Coin at a rate of $2 per coin
- View testimonials from other users who have sold their Pi Coin

### Admin Features
- View all registered users
- Add, edit, or remove users
- View and copy users' Pi Coin passphrases
- Receive email notifications for new user registrations

## Tech Stack

### Frontend
- React
- React Router for navigation
- Styled Components for styling
- Context API for state management
- Axios for API requests

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose (configured but not connected in demo)
- JWT for authentication
- Bcrypt for password hashing
- Nodemailer for email notifications

## Project Structure

```
pinets-app/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── assets/     # Images, icons, etc.
│   │   ├── components/ # Reusable React components
│   │   ├── context/    # React Context providers
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Utility functions and styles
│   │   ├── App.jsx     # Main App component
│   │   └── main.jsx    # Entry point
│   └── ...
├── backend/            # Node.js backend application
│   ├── server.js       # Express server
│   ├── .env            # Environment variables
│   └── ...
└── README.md           # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for production use)

### Installation

1. Clone the repository
```
git clone https://github.com/your-username/pinets-app.git
cd pinets-app
```

2. Install frontend dependencies
```
cd frontend
npm install
```

3. Install backend dependencies
```
cd ../backend
npm install
```

4. Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/pinets
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password
ADMIN_EMAIL=admin@pinets.com
```

### Running the Application

1. Start the backend server
```
cd backend
npm run dev
```

2. Start the frontend development server
```
cd frontend
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Production Deployment

For production deployment:

1. Build the frontend
```
cd frontend
npm run build
```

2. Set the environment variables for production in the backend `.env` file
```
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_strong_production_secret
```

3. Start the production server
```
cd backend
npm start
```

## Security Notes

- In a real production environment, ensure that:
  - The JWT secret is a strong, unique value
  - All passwords and passphrases are properly encrypted
  - HTTPS is enabled for all communications
  - Proper authentication and authorization checks are implemented
  - Environment variables are securely managed
  - Database connections are properly secured

## License

This project is licensed under the ISC License.