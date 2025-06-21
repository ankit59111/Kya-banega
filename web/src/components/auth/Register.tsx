import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, clearError, getProfile } from '../../store/slices/authSlice';
import { RootState, AppDispatch } from '../../store';
import PreferencesOnboarding from './PreferencesOnboarding';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Container,
  Box,
  Heading,
  Alert,
  AlertIcon,
  VStack,
} from '@chakra-ui/react';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPreferences, setShowPreferences] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error, user, token, isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user && isAuthenticated && !showPreferences) {
      setShowPreferences(true);
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, isAuthenticated, showPreferences, dispatch]);

  useEffect(() => {
    // Fetch user profile after successful registration
    if (token && isAuthenticated && !user) {
      dispatch(getProfile());
    }
  }, [token, isAuthenticated, user, dispatch]);

  const validateForm = () => {
    let isValid = true;
    const errors = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.name) {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (!formData.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }

    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const { confirmPassword, ...registerData } = formData;
      dispatch(register(registerData));
    }
  };

  const handlePreferencesComplete = () => {
    navigate('/home');
  };

  // Show preferences onboarding if user is authenticated and we should show it
  if (showPreferences && isAuthenticated) {
    return <PreferencesOnboarding onComplete={handlePreferencesComplete} />;
  }

  return (
    <Container maxW="md" mt={8}>
      <Box
        p={8}
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
      >
        <VStack spacing={4} align="stretch">
          <Heading textAlign="center" mb={6}>
            Create Account
          </Heading>
          {error && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={!!formErrors.name}>
                <FormLabel>Full Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  autoComplete="name"
                />
                <FormErrorMessage>{formErrors.name}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formErrors.email}>
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                />
                <FormErrorMessage>{formErrors.email}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formErrors.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <FormErrorMessage>{formErrors.password}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!formErrors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  autoComplete="new-password"
                />
                <FormErrorMessage>{formErrors.confirmPassword}</FormErrorMessage>
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                mt={4}
                isLoading={isLoading}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Container>
  );
};

export default Register; 