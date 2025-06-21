import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { RootState, AppDispatch } from '../store';
import { fetchMeals, addMeal, updateMeal, deleteMeal } from '../store/slices/mealPlanSlice';
import { Meal } from '../types/meal';
import {
  Box,
  Container,
  Grid,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  CardHeader,
  Badge,
  IconButton,
  Flex,
  Spacer,
  Alert,
  AlertIcon,
  SimpleGrid,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from '@chakra-ui/react';
import { AddIcon, EditIcon, DeleteIcon, TimeIcon } from '@chakra-ui/icons';

const MealPlan: React.FC = () => {
  const { meals, loading, error } = useSelector((state: RootState) => state.mealPlan);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  const [selectedDay, setSelectedDay] = useState('today');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [formData, setFormData] = useState<Partial<Meal>>({
    name: '',
    type: 'breakfast',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    ingredients: [],
    instructions: '',
    date: new Date().toISOString().split('T')[0], // Default to today
  });

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  // Helper function to get date range based on selection
  const getDateRange = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay()); // Start of current week (Sunday)
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6); // End of current week (Saturday)

    switch (selectedDay) {
      case 'today':
        return {
          start: today.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        };
      case 'tomorrow':
        return {
          start: tomorrow.toISOString().split('T')[0],
          end: tomorrow.toISOString().split('T')[0]
        };
      case 'week':
        return {
          start: startOfWeek.toISOString().split('T')[0],
          end: endOfWeek.toISOString().split('T')[0]
        };
      default:
        return {
          start: today.toISOString().split('T')[0],
          end: today.toISOString().split('T')[0]
        };
    }
  };

  // Filter meals by selected date range
  const getFilteredMeals = () => {
    if (!Array.isArray(meals)) {
      return [];
    }
    
    const { start, end } = getDateRange();
    return meals.filter(meal => {
      // Handle meals that don't have a date field (existing meals)
      if (!meal.date) {
        // For existing meals without date, show them for today by default
        return selectedDay === 'today';
      }
      
      const mealDate = meal.date.split('T')[0]; // Extract date part only
      return mealDate >= start && mealDate <= end;
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedMeal) {
        await dispatch(updateMeal({ _id: selectedMeal._id, meal: formData })).unwrap();
        toast({
          title: 'Meal updated',
          status: 'success',
          duration: 3000,
        });
      } else {
        await dispatch(addMeal(formData as Omit<Meal, '_id'>)).unwrap();
        toast({
          title: 'Meal added',
          status: 'success',
          duration: 3000,
        });
      }
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Something went wrong',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const handleDelete = async (_id: string) => {
    if (!window.confirm('Are you sure you want to delete this meal?')) return;
    
    try {
      await dispatch(deleteMeal(_id)).unwrap();
      toast({
        title: 'Meal deleted',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to delete meal',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const getMealsByType = (type: Meal['type']) => {
    const filteredMeals = getFilteredMeals();
    return filteredMeals.filter(meal => meal.type === type);
  };

  const getTotalNutrition = () => {
    const filteredMeals = getFilteredMeals();
    
    return filteredMeals.reduce((acc, meal) => ({
      calories: acc.calories + meal.calories,
      protein: acc.protein + meal.protein,
      carbs: acc.carbs + meal.carbs,
      fat: acc.fat + meal.fat,
    }), { calories: 0, protein: 0, carbs: 0, fat: 0 });
  };

  const renderMealCard = (meal: Meal) => (
    <Card key={meal._id} size="sm" variant="outline" _hover={{ shadow: 'md' }}>
      <CardHeader pb={2}>
        <Flex align="center" justify="space-between">
          <VStack align="start" spacing={1}>
            <Heading size="sm">{meal.name}</Heading>
            <HStack spacing={2}>
              <Badge colorScheme="blue" size="sm">{meal.type}</Badge>
              {meal.date && (
                <Badge colorScheme="gray" size="sm" variant="outline">
                  {new Date(meal.date).toLocaleDateString()}
                </Badge>
              )}
            </HStack>
          </VStack>
          <HStack spacing={1}>
            <IconButton
              aria-label="Edit meal"
              icon={<EditIcon />}
              size="sm"
              variant="ghost"
              onClick={() => {
                setSelectedMeal(meal);
                setFormData({
                  ...meal,
                  date: meal.date || new Date().toISOString().split('T')[0], // Use existing date or default to today
                });
                onOpen();
              }}
            />
            <IconButton
              aria-label="Delete meal"
              icon={<DeleteIcon />}
              size="sm"
              variant="ghost"
              colorScheme="red"
              onClick={() => handleDelete(meal._id)}
            />
          </HStack>
        </Flex>
      </CardHeader>
      <CardBody pt={0}>
        <SimpleGrid columns={2} spacing={2}>
          <Stat size="sm">
            <StatLabel fontSize="xs">Calories</StatLabel>
            <StatNumber fontSize="sm">{meal.calories}</StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel fontSize="xs">Protein</StatLabel>
            <StatNumber fontSize="sm">{meal.protein}g</StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel fontSize="xs">Carbs</StatLabel>
            <StatNumber fontSize="sm">{meal.carbs}g</StatNumber>
          </Stat>
          <Stat size="sm">
            <StatLabel fontSize="xs">Fat</StatLabel>
            <StatNumber fontSize="sm">{meal.fat}g</StatNumber>
          </Stat>
        </SimpleGrid>
      </CardBody>
    </Card>
  );

  const renderMealSection = (type: Meal['type'], title: string, color: string) => {
    const mealsOfType = getMealsByType(type);
    
    return (
      <Box>
        <HStack mb={4}>
          <Heading size="md" color={`${color}.500`}>{title}</Heading>
          <Badge colorScheme={color} variant="subtle">{mealsOfType.length} meals</Badge>
        </HStack>
        <VStack spacing={3} align="stretch">
          {mealsOfType.length > 0 ? (
            mealsOfType.map(renderMealCard)
          ) : (
            <Box
              p={6}
              borderWidth="2px"
              borderStyle="dashed"
              borderColor="gray.200"
              borderRadius="lg"
              textAlign="center"
            >
              <Text color="gray.500" fontSize="sm">No {type} meals for selected period</Text>
              <Button
                size="sm"
                colorScheme={color}
                variant="outline"
                mt={2}
                onClick={() => {
                  setSelectedMeal(null);
                  setFormData({
                    name: '',
                    type,
                    calories: 0,
                    protein: 0,
                    carbs: 0,
                    fat: 0,
                    ingredients: [],
                    instructions: '',
                    date: new Date().toISOString().split('T')[0],
                  });
                  onOpen();
                }}
              >
                Add {type} meal
              </Button>
            </Box>
          )}
        </VStack>
      </Box>
    );
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Text>Loading your meal plan...</Text>
        </VStack>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="container.xl" py={8}>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  const totalNutrition = getTotalNutrition();
  const filteredMeals = getFilteredMeals();

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Flex align="center" justify="space-between" mb={4}>
            <Box>
              <Heading size="xl" mb={2}>My Meal Plan</Heading>
              <Text color="gray.600">Plan and track your daily nutrition</Text>
            </Box>
            <Button
              leftIcon={<AddIcon />}
              colorScheme="blue"
              onClick={() => {
                setSelectedMeal(null);
                setFormData({
                  name: '',
                  type: 'breakfast',
                  calories: 0,
                  protein: 0,
                  carbs: 0,
                  fat: 0,
                  ingredients: [],
                  instructions: '',
                  date: new Date().toISOString().split('T')[0],
                });
                onOpen();
              }}
            >
              Add Meal
            </Button>
          </Flex>

          {/* Day Selector */}
          <HStack spacing={4}>
            <Text fontWeight="medium">View:</Text>
            <Select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
              maxW="200px"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="week">This Week</option>
            </Select>
            <Text fontSize="sm" color="gray.500">
              {filteredMeals.length} meals found
            </Text>
          </HStack>
        </Box>

        {/* Nutrition Summary */}
        <Card>
          <CardHeader>
            <Heading size="md">Nutrition Summary</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
              <Stat>
                <StatLabel>Total Calories</StatLabel>
                <StatNumber color="blue.500">{totalNutrition.calories}</StatNumber>
                <StatHelpText>kcal</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Protein</StatLabel>
                <StatNumber color="green.500">{totalNutrition.protein}g</StatNumber>
                <StatHelpText>Daily goal: 50g</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Carbs</StatLabel>
                <StatNumber color="purple.500">{totalNutrition.carbs}g</StatNumber>
                <StatHelpText>Daily goal: 200g</StatHelpText>
              </Stat>
              <Stat>
                <StatLabel>Fat</StatLabel>
                <StatNumber color="orange.500">{totalNutrition.fat}g</StatNumber>
                <StatHelpText>Daily goal: 65g</StatHelpText>
              </Stat>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Meal Sections */}
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
          {renderMealSection('breakfast', 'Breakfast', 'orange')}
          {renderMealSection('lunch', 'Lunch', 'green')}
          {renderMealSection('dinner', 'Dinner', 'purple')}
          {renderMealSection('snack', 'Snacks', 'teal')}
        </Grid>
      </VStack>

      {/* Add/Edit Meal Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedMeal ? 'Edit Meal' : 'Add New Meal'}</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <VStack spacing={4}>
                <FormControl isRequired>
                  <FormLabel>Meal Name</FormLabel>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter meal name"
                  />
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Meal Type</FormLabel>
                  <Select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </Select>
                </FormControl>

                <FormControl isRequired>
                  <FormLabel>Date</FormLabel>
                  <Input
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </FormControl>

                <SimpleGrid columns={2} spacing={4} width="full">
                  <FormControl isRequired>
                    <FormLabel>Calories</FormLabel>
                    <NumberInput
                      min={0}
                      value={formData.calories}
                      onChange={(value) => handleNumberChange('calories', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Protein (g)</FormLabel>
                    <NumberInput
                      min={0}
                      value={formData.protein}
                      onChange={(value) => handleNumberChange('protein', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Carbs (g)</FormLabel>
                    <NumberInput
                      min={0}
                      value={formData.carbs}
                      onChange={(value) => handleNumberChange('carbs', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>

                  <FormControl isRequired>
                    <FormLabel>Fat (g)</FormLabel>
                    <NumberInput
                      min={0}
                      value={formData.fat}
                      onChange={(value) => handleNumberChange('fat', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </SimpleGrid>

                <FormControl>
                  <FormLabel>Ingredients</FormLabel>
                  <Textarea
                    name="ingredients"
                    value={formData.ingredients?.join('\n')}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      ingredients: e.target.value.split('\n').filter(i => i.trim()),
                    }))}
                    placeholder="Enter ingredients (one per line)"
                    rows={4}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Cooking Instructions</FormLabel>
                  <Textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    placeholder="Enter cooking instructions"
                    rows={4}
                  />
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" colorScheme="blue">
                {selectedMeal ? 'Update Meal' : 'Add Meal'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default MealPlan; 