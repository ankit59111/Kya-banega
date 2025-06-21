import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { getProfile } from '../../store/slices/authSlice';
import { Box, Spinner, Center, Text } from '@chakra-ui/react';

interface AuthInitializerProps {
  children: React.ReactNode;
}

const AuthInitializer: React.FC<AuthInitializerProps> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { token, user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    // If we have a token but no user, fetch the user profile on app startup
    if (token && !user) {
      dispatch(getProfile());
    }
  }, [token, user, dispatch]);

  // Show loading spinner while fetching user profile on app startup
  if (token && !user && isLoading) {
    return (
      <Center h="100vh">
        <Box textAlign="center">
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>Initializing...</Text>
        </Box>
      </Center>
    );
  }

  return <>{children}</>;
};

export default AuthInitializer; 