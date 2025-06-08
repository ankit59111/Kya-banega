import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MealPlan from './pages/MealPlan';
import Login from './pages/Login';
import Register from './pages/Register';
import { useSelector } from 'react-redux';
import { RootState } from './store';

const App: React.FC = () => {
  const { token } = useSelector((state: RootState) => state.auth);

  return (
    <Box minH="100vh">
      <Navbar />
      <Box as="main" p={4}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/meal-plan"
            element={token ? <MealPlan /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!token ? <Login /> : <Navigate to="/meal-plan" />}
          />
          <Route
            path="/register"
            element={!token ? <Register /> : <Navigate to="/meal-plan" />}
          />
        </Routes>
      </Box>
    </Box>
  );
};

export default App; 