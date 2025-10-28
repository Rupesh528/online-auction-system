# Online Auction App

A full-stack web application for conducting online auctions, built with React on the frontend and Node.js/Express on the backend. Users can register, create auctions, place bids, and track their activity through a comprehensive dashboard with analytics.

## Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Auction Management**: Create, view, and bid on auctions
- **Real-time Bidding**: Place bids on active auctions
- **Dashboard Analytics**: Comprehensive statistics including total auctions, bids placed, auctions won, and value metrics
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Responsive Design**: Mobile-friendly interface using Bootstrap
- **Protected Routes**: Secure access to user-specific features
- **Auction Details**: Detailed view of individual auctions with bidding history
- **Winners Page**: View completed auctions and winners

## Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** for build tooling
- **React Router** for navigation
- **Bootstrap 5** for styling
- **Axios** for API calls
- **React DatePicker** for date selection

### Backend

- **Node.js** with Express
- **TypeScript** for type safety
- **MongoDB** with Mongoose for data persistence
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud service like MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd online-auction-app
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Environment Setup:**

   Create a `.env` file in the `backend` directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/auction-app
   JWT_SECRET=your-secret-key-here
   ```

   For MongoDB Atlas, replace the MONGODB_URI with your connection string.

## Usage

1. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

   The server will run on `http://localhost:5000`

2. **Start the frontend development server:**

   ```bash
   cd frontend
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

3. **Build for production:**

   ```bash
   # Backend
   cd backend
   npm run build
   npm start

   # Frontend
   cd frontend
   npm run build
   npm run preview
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Auctions

- `GET /api/auctions` - Get all auctions
- `POST /api/auctions` - Create new auction (protected)
- `GET /api/auctions/:id` - Get auction details
- `POST /api/auctions/:id/bid` - Place bid on auction (protected)
- `GET /api/auctions/user/:userId` - Get user's auctions (protected)

## Project Structure

```
online-auction-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts
│   │   ├── controllers/
│   │   │   ├── authController.ts
│   │   │   └── auctionController.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── models/
│   │   │   ├── User.ts
│   │   │   └── AuctionItem.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   └── auction.ts
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── styles/
│   │   └── config/
│   ├── package.json
│   └── vite.config.ts
├── .gitignore
└── README.md
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Screenshots

_Add screenshots of your application here to showcase the UI_

## Future Enhancements

- Real-time notifications for bid updates
- Payment integration for auction settlements
- Advanced search and filtering options
- Admin panel for platform management
- Email notifications for auction events
