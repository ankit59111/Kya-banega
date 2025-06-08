import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  useToast,
  VStack,
  HStack,
  Select,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
} from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setMeals, setLoading, setError } from '../store/slices/mealPlanSlice';

interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  cookTime: number;
  servings: number;
}

const MealPlan: React.FC = () => {
  const { meals, loading, error } = useSelector((state: RootState) => state.mealPlan);
  const dispatch = useDispatch();
  const toast = useToast();
  const [selectedDay, setSelectedDay] = useState('today');

  useEffect(() => {
    fetchMeals();
  }, [selectedDay]);

  const fetchMeals = async () => {
    dispatch(setLoading(true));
    try {
      // TODO: Replace with actual API call
      const response = await fetch(`http://localhost:3000/api/meals?day=${selectedDay}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch meals');
      }

      dispatch(setMeals(data.meals));
    } catch (error) {
      dispatch(setError(error instanceof Error ? error.message : 'Failed to fetch meals'));
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to fetch meals',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getMealsByType = (type: Meal['type']) => {
    return meals.filter(meal => meal.type === type);
  };

  const renderMealCard = (meal: Meal) => (
    <Card key={meal.id} size="sm" variant="outline">
      <CardHeader>
        <Heading size="md">{meal.name}</Heading>
      </CardHeader>
      <CardBody>
        <VStack align="start" spacing={2}>
          <Text>Prep Time: {meal.prepTime} mins</Text>
          <Text>Cook Time: {meal.cookTime} mins</Text>
          <Text>Servings: {meal.servings}</Text>
        </VStack>
      </CardBody>
      <CardFooter>
        <Button size="sm" colorScheme="brand" variant="outline">
          View Recipe
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <HStack justify="space-between">
          <Heading size="lg">Daily Meal Plan</Heading>
          <Select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            maxW="200px"
          >
            <option value="today">Today</option>
            <option value="tomorrow">Tomorrow</option>
            <option value="next-week">Next Week</option>
          </Select>
        </HStack>

        {loading ? (
          <Text>Loading...</Text>
        ) : error ? (
          <Text color="red.500">{error}</Text>
        ) : (
          <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
            <Box>
              <Heading size="md" mb={4}>Breakfast</Heading>
              <VStack spacing={4} align="stretch">
                {getMealsByType('breakfast').map(renderMealCard)}
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Lunch</Heading>
              <VStack spacing={4} align="stretch">
                {getMealsByType('lunch').map(renderMealCard)}
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Dinner</Heading>
              <VStack spacing={4} align="stretch">
                {getMealsByType('dinner').map(renderMealCard)}
              </VStack>
            </Box>

            <Box>
              <Heading size="md" mb={4}>Snacks</Heading>
              <VStack spacing={4} align="stretch">
                {getMealsByType('snack').map(renderMealCard)}
              </VStack>
            </Box>
          </Grid>
        )}
      </VStack>
    </Container>
  );
};

export default MealPlan; 