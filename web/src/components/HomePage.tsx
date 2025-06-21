import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Card,
  CardBody,
  CardHeader,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useToast,
  Icon,
  useDisclosure,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { 
  FaUtensils, 
  FaClock, 
  FaStar, 
  FaUser,
  FaCalendar,
  FaHeart,
  FaCog
} from 'react-icons/fa';
import { RootState, AppDispatch } from '../store';
import { fetchPreferences } from '../store/slices/preferencesSlice';
import { 
  getCurrentMealConfig, 
  getMealGreeting, 
  formatTime,
  isMealTime,
  getNextMealTime,
  MealType 
} from '../utils/mealTimeUtils';
import MealSuggestionModal from './MealSuggestionModal';
import { Meal } from '../types/meal';

const HomePage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { preferences, loading: preferencesLoading } = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentMeal, setCurrentMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState(false);
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const mealConfig = getCurrentMealConfig();
  const nextMeal = getNextMealTime();

  // Fetch preferences on component mount
  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  // Function to create sample meals if none exist
  const createSampleMeals = async () => {
    const sampleMeals = [
      {
        name: 'Butter Chicken',
        type: 'dinner',
        cuisine: 'indian',
        calories: 450,
        protein: 25,
        carbs: 15,
        fat: 30,
        ingredients: ['chicken', 'butter', 'tomatoes', 'cream', 'spices'],
        instructions: 'Marinate chicken in yogurt and spices. Cook with tomato sauce and cream.',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Masala Dosa',
        type: 'breakfast',
        cuisine: 'indian',
        calories: 280,
        protein: 8,
        carbs: 45,
        fat: 6,
        ingredients: ['rice', 'lentils', 'potatoes', 'onions', 'spices'],
        instructions: 'Make dosa batter with rice and lentils. Fill with spiced potato mixture.',
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Paneer Tikka',
        type: 'lunch',
        cuisine: 'indian',
        calories: 320,
        protein: 18,
        carbs: 12,
        fat: 22,
        ingredients: ['paneer', 'yogurt', 'spices', 'bell peppers', 'onions'],
        instructions: 'Marinate paneer in spiced yogurt and grill until golden.',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Idli Sambar',
        type: 'breakfast',
        cuisine: 'indian',
        calories: 220,
        protein: 6,
        carbs: 38,
        fat: 4,
        ingredients: ['rice', 'lentils', 'vegetables', 'spices', 'coconut'],
        instructions: 'Steam rice-lentil batter in idli molds. Serve with sambar.',
        imageUrl: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Chicken Biryani',
        type: 'dinner',
        cuisine: 'indian',
        calories: 580,
        protein: 32,
        carbs: 65,
        fat: 28,
        ingredients: ['chicken', 'basmati rice', 'spices', 'yogurt', 'saffron'],
        instructions: 'Layer spiced chicken with aromatic rice and steam together.',
        imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500',
        date: new Date().toISOString(),
      },
      // Add some meals with different cuisines to match various preferences
      {
        name: 'Grilled Salmon',
        type: 'dinner',
        cuisine: 'international',
        calories: 380,
        protein: 35,
        carbs: 5,
        fat: 22,
        ingredients: ['salmon', 'lemon', 'herbs', 'olive oil', 'garlic'],
        instructions: 'Season salmon with herbs and lemon, grill until flaky.',
        imageUrl: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Caesar Salad',
        type: 'lunch',
        cuisine: 'international',
        calories: 250,
        protein: 12,
        carbs: 8,
        fat: 18,
        ingredients: ['lettuce', 'chicken', 'croutons', 'parmesan', 'caesar dressing'],
        instructions: 'Toss lettuce with dressing, top with chicken and croutons.',
        imageUrl: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500',
        date: new Date().toISOString(),
      },
      {
        name: 'Oatmeal with Berries',
        type: 'breakfast',
        cuisine: 'international',
        calories: 180,
        protein: 6,
        carbs: 30,
        fat: 4,
        ingredients: ['oats', 'berries', 'honey', 'milk', 'nuts'],
        instructions: 'Cook oats with milk, top with berries and honey.',
        imageUrl: 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?w=500',
        date: new Date().toISOString(),
      },
    ];

    try {
      for (const meal of sampleMeals) {
        await fetch('/api/meals', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(meal),
        });
      }
      console.log('Sample meals created successfully');
    } catch (error) {
      console.error('Error creating sample meals:', error);
    }
  };

  // Enhanced meal suggestion function that uses preferences
  const getMealSuggestion = async () => {
    setLoading(true);
    try {
      // Call the real API to get a random meal based on preferences
      const response = await fetch('/api/surprise-me/random', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        // If no meals found, create sample meals and try again
        if (response.status === 404) {
          await createSampleMeals();
          // Try again after creating sample meals
          const retryResponse = await fetch('/api/surprise-me/random', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
          });
          
          if (retryResponse.ok) {
            const data = await retryResponse.json();
            if (data.status === 'success' && data.data.recipe) {
              setCurrentMeal(data.data.recipe);
              onOpen();
              return;
            }
          }
        }
        throw new Error('Failed to fetch meal suggestion');
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.data.recipe) {
        setCurrentMeal(data.data.recipe);
        onOpen();
      } else {
        throw new Error('No meal found');
      }
    } catch (error) {
      console.error('Error fetching meal suggestion:', error);
      toast({
        title: 'Error',
        description: 'Failed to get meal suggestion. Please try again.',
        status: 'error',
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptMeal = (meal: Meal) => {
    // TODO: Add meal to user's accepted meals
    console.log('Meal accepted:', meal);
    toast({
      title: 'Meal accepted!',
      description: 'We\'ll remember you liked this meal.',
      status: 'success',
      duration: 3000,
    });
  };

  const handleRejectMeal = (meal: Meal) => {
    // TODO: Add meal to user's rejected meals
    console.log('Meal rejected:', meal);
    toast({
      title: 'Meal rejected',
      description: 'We\'ll avoid suggesting similar meals.',
      status: 'info',
      duration: 3000,
    });
  };

  const handleSurpriseMe = () => {
    getMealSuggestion();
  };

  const handleSetupPreferences = () => {
    navigate('/profile');
  };

  // Show preferences setup prompt if no preferences are set
  if (!preferencesLoading && !preferences) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={8} align="stretch">
          <Alert status="info" borderRadius="lg">
            <AlertIcon />
            <Box>
              <Text fontWeight="semibold">Set up your preferences</Text>
              <Text fontSize="sm">
                To get personalized meal suggestions, please set up your food preferences.
              </Text>
            </Box>
          </Alert>

          <Card>
            <CardBody>
              <VStack spacing={6} textAlign="center">
                <Icon as={FaCog} boxSize={12} color="blue.400" />
                <Heading size="lg">Personalize Your Experience</Heading>
                <Text color="gray.600">
                  Tell us about your favorite cuisines, dietary restrictions, and spice preferences 
                  to get better meal suggestions.
                </Text>
                <Button
                  colorScheme="blue"
                  size="lg"
                  leftIcon={<FaCog />}
                  onClick={handleSetupPreferences}
                >
                  Set Up Preferences
                </Button>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Current Time and Meal Context */}
        <Card>
          <CardHeader>
            <HStack spacing={3}>
              <Icon as={FaClock} color={mealConfig.color} />
              <Box>
                <Heading size="md">{mealConfig.label} Time</Heading>
                <Text fontSize="sm" color="gray.600">
                  {formatTime(currentTime)} • {mealConfig.emoji}
                </Text>
              </Box>
            </HStack>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Text fontSize="lg" textAlign="center" color="gray.700">
                Ready to decide what to cook for {mealConfig.label.toLowerCase()}?
              </Text>
              
              {preferences && (
                <Box textAlign="center" p={4} bg="blue.50" borderRadius="md">
                  <Text fontSize="sm" color="blue.700">
                    🎯 Suggestions will be based on your preferences: 
                    {preferences.preferredCuisines?.slice(0, 2).map(cuisine => 
                      cuisine.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())
                    ).join(', ')}
                    {preferences.preferredCuisines && preferences.preferredCuisines.length > 2 && ' and more...'}
                  </Text>
                </Box>
              )}
              
              <Button
                leftIcon={<FaStar />}
                colorScheme="blue"
                size="lg"
                onClick={getMealSuggestion}
                isLoading={loading}
                loadingText="Finding your perfect meal..."
                bg={mealConfig.color}
                _hover={{ bg: mealConfig.color, opacity: 0.8 }}
              >
                Get {mealConfig.label} Suggestion
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Today's Meals</StatLabel>
                <StatNumber color="blue.500">0</StatNumber>
                <StatHelpText>
                  <Icon as={FaUtensils} mr={2} />
                  Meals planned
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Calories Today</StatLabel>
                <StatNumber color="green.500">0</StatNumber>
                <StatHelpText>
                  <Icon as={FaHeart} mr={2} />
                  kcal consumed
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Next Meal</StatLabel>
                <StatNumber color="orange.500">{nextMeal?.label || 'None'}</StatNumber>
                <StatHelpText>
                  <Icon as={FaCalendar} mr={2} />
                  {nextMeal ? `${nextMeal.startHour}:00` : 'No upcoming meals'}
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <Heading size="md">Quick Actions</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Button
                leftIcon={<FaUser />}
                variant="outline"
                size="lg"
                onClick={() => navigate('/profile')}
              >
                My Profile
              </Button>
              <Button
                leftIcon={<FaCog />}
                variant="outline"
                size="lg"
                onClick={() => navigate('/preferences')}
              >
                Preferences
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>

      {/* Meal Suggestion Modal */}
      {currentMeal && (
        <MealSuggestionModal
          isOpen={isOpen}
          onClose={onClose}
          meal={currentMeal}
          mealType={mealConfig.type}
          onAccept={handleAcceptMeal}
          onReject={handleRejectMeal}
          onSurpriseMe={handleSurpriseMe}
        />
      )}
    </Container>
  );
};

export default HomePage; 