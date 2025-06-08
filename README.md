# Annapurna - Indian Meal Planning App

## Project Overview
Annapurna is a comprehensive meal planning application designed specifically for Indian households. The app aims to simplify daily meal planning while celebrating the rich diversity of Indian cuisine. Built using React Native, it provides a seamless experience across both mobile and web platforms.

## Vision
To empower home cooks, particularly women who manage household meals, by reducing the mental load of daily meal planning while preserving the joy and creativity of cooking Indian cuisine.

## Development Phases

### Phase 1 - Daily Meal Planning (Current)
- Personalized meal suggestions for breakfast, lunch, dinner, and snacks
- Smart meal rotation to prevent repetition
- Dietary preference and restriction management
- Portion size customization
- Basic recipe database with essential Indian recipes
- Simple user authentication
- Basic shopping list generation

### Future Phases
#### Phase 2
- Enhanced Recipe Management
- "What's in Your Fridge?" feature
- "Surprise Me!" random recipe generator
- Advanced shopping list features

#### Phase 3
- Community Features
- Recipe sharing platform
- User-generated content
- Photo sharing capabilities

#### Phase 4
- Localization
- Multiple Indian language support
- Regional measurement units
- Festival and special occasion menus

## Technical Stack

### Frontend
- React Native (Mobile)
- React.js (Web)
- Redux for state management
- React Navigation
- Native Base UI components

### Backend
- Node.js
- Express.js
- MongoDB
- Firebase (Authentication & Storage)

### Additional Technologies
- AWS S3 (Media storage)
- Redis (Caching)

## Project Structure
```
annapurna/
├── mobile/                 # React Native mobile app
├── web/                    # React web application
├── backend/               # Node.js backend server
├── shared/                # Shared utilities and components
└── docs/                  # Project documentation
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- React Native development environment
- MongoDB
- Android Studio / Xcode (for mobile development)

### Installation
1. Clone the repository
```bash
git clone https://github.com/your-username/annapurna.git
```

2. Install dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install mobile app dependencies
cd ../mobile
npm install

# Install web app dependencies
cd ../web
npm install
```

3. Set up environment variables
```bash
# Create .env files in respective directories
cp .env.example .env
```

4. Start the development servers
```bash
# Start backend server
cd backend
npm run dev

# Start mobile app
cd ../mobile
npm run android # or npm run ios

# Start web app
cd ../web
npm start
```

## Contributing
We welcome contributions to Annapurna! Please read our contributing guidelines before submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Contact
For any queries or support, please reach out to [contact@annapurna.app](mailto:contact@annapurna.app)

## Acknowledgments
- Indian culinary experts and nutritionists
- Open-source community
- Beta testers and early adopters

## Phase 1 - Daily Meal Planning

Annapurna is a meal planning application designed specifically for Indian households. This phase focuses on the core functionality of daily meal planning.

### Features

- User authentication (login/register)
- Personalized meal suggestions for:
  - Breakfast
  - Lunch
  - Dinner
  - Snacks
- Smart meal rotation to prevent repetition
- Basic recipe database with essential Indian recipes
- Simple shopping list generation

### Tech Stack

#### Frontend (Web)
- React.js with TypeScript
- Chakra UI for components
- Redux for state management
- React Router for navigation

#### Backend
- Node.js with Express
- MongoDB for database
- JWT for authentication

### Getting Started

1. Install dependencies:
```bash
npm run install:all
```

2. Set up environment variables:
```bash
# Backend
cd backend
cp .env.example .env

# Web
cd ../web
cp .env.example .env
```

3. Start development servers:
```bash
# Start both frontend and backend
npm run dev

# Or start separately
npm run start:backend
npm run start:web
```

### Project Structure
```
annapurna/
├── web/                    # React web application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── store/        # Redux store
│   │   └── services/     # API services
│   └── public/           # Static files
│
└── backend/              # Node.js backend server
    ├── src/
    │   ├── controllers/ # Route controllers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   └── services/    # Business logic
    └── config/          # Configuration files
```

### Development Guidelines

1. **Code Style**
   - Use TypeScript for type safety
   - Follow ESLint configuration
   - Write meaningful commit messages

2. **Git Workflow**
   - Create feature branches from main
   - Submit PRs for review
   - Keep commits atomic and focused

3. **Testing**
   - Write unit tests for critical functionality
   - Test API endpoints
   - Test UI components

### Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

### License
This project is licensed under the MIT License.
