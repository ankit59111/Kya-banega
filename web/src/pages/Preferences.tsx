import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useToast } from '@chakra-ui/react';
import { RootState, AppDispatch } from '../store';
import { fetchPreferences, updatePreferences, RecipePreference } from '../store/slices/preferencesSlice';
import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  FormControl,
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Card,
  CardBody,
  CardHeader,
  Alert,
  AlertIcon,
  SimpleGrid,
  Divider,
  Badge,
  Switch,
} from '@chakra-ui/react';

const Preferences: React.FC = () => {
  const { preferences, loading, error } = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();
  
  const [formData, setFormData] = useState<Partial<RecipePreference>>({
    dietaryRestrictions: [],
    preferredCuisines: [],
    spiceLevel: 'medium',
    cookingTime: { min: 15, max: 60 },
    mealTypes: ['breakfast', 'lunch', 'dinner', 'snack'],
    seasonalPreferences: true,
  });

  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (preferences) {
      setFormData(preferences);
    }
  }, [preferences]);

  const handleCheckboxChange = (field: keyof RecipePreference, values: string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: values,
    }));
  };

  const handleNumberChange = (field: 'min' | 'max', value: string) => {
    setFormData(prev => ({
      ...prev,
      cookingTime: {
        ...prev.cookingTime!,
        [field]: Number(value),
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(updatePreferences(formData)).unwrap();
      toast({
        title: 'Preferences updated',
        description: 'Your dietary preferences have been saved successfully.',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to update preferences',
        status: 'error',
        duration: 3000,
      });
    }
  };

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian' },
    { value: 'vegan', label: 'Vegan' },
    { value: 'gluten-free', label: 'Gluten-Free' },
    { value: 'dairy-free', label: 'Dairy-Free' },
    { value: 'nut-free', label: 'Nut-Free' },
    { value: 'halal', label: 'Halal' },
    { value: 'kosher', label: 'Kosher' },
  ];

  const cuisineOptions = [
    { value: 'north-indian', label: 'North Indian' },
    { value: 'south-indian', label: 'South Indian' },
    { value: 'east-indian', label: 'East Indian' },
    { value: 'west-indian', label: 'West Indian' },
    { value: 'indian-chinese', label: 'Indian Chinese' },
    { value: 'indo-italian', label: 'Indo Italian' },
    { value: 'indo-mexican', label: 'Indo Mexican' },
  ];

  const mealTypeOptions = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' },
    { value: 'snack', label: 'Snack' },
  ];

  if (loading) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={4}>
          <Text>Loading your preferences...</Text>
        </VStack>
      </Container>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="xl" mb={2}>Dietary Preferences</Heading>
          <Text color="gray.600">
            Set your preferences to get personalized meal recommendations and better "Surprise Me" suggestions.
          </Text>
        </Box>

        {error && (
          <Alert status="error">
            <AlertIcon />
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack spacing={8} align="stretch">
            {/* Dietary Restrictions */}
            <Card>
              <CardHeader>
                <Heading size="md">Dietary Restrictions</Heading>
                <Text fontSize="sm" color="gray.600">
                  Select any dietary restrictions you follow
                </Text>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  value={formData.dietaryRestrictions}
                  onChange={(values) => handleCheckboxChange('dietaryRestrictions', values as string[])}
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {dietaryOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </CardBody>
            </Card>

            {/* Preferred Cuisines */}
            <Card>
              <CardHeader>
                <Heading size="md">Preferred Cuisines</Heading>
                <Text fontSize="sm" color="gray.600">
                  Choose your favorite types of cuisine
                </Text>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  value={formData.preferredCuisines}
                  onChange={(values) => handleCheckboxChange('preferredCuisines', values as string[])}
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {cuisineOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </CardBody>
            </Card>

            {/* Spice Level */}
            <Card>
              <CardHeader>
                <Heading size="md">Spice Level Preference</Heading>
                <Text fontSize="sm" color="gray.600">
                  How spicy do you like your food?
                </Text>
              </CardHeader>
              <CardBody>
                <FormControl>
                  <Select
                    value={formData.spiceLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, spiceLevel: e.target.value as 'mild' | 'medium' | 'hot' }))}
                  >
                    <option value="mild">Mild - Not spicy</option>
                    <option value="medium">Medium - Moderately spicy</option>
                    <option value="hot">Hot - Very spicy</option>
                  </Select>
                </FormControl>
              </CardBody>
            </Card>

            {/* Cooking Time */}
            <Card>
              <CardHeader>
                <Heading size="md">Cooking Time Range</Heading>
                <Text fontSize="sm" color="gray.600">
                  How much time do you typically have for cooking?
                </Text>
              </CardHeader>
              <CardBody>
                <HStack spacing={4}>
                  <FormControl>
                    <FormLabel>Minimum (minutes)</FormLabel>
                    <NumberInput
                      min={0}
                      max={formData.cookingTime?.max}
                      value={formData.cookingTime?.min}
                      onChange={(value) => handleNumberChange('min', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Maximum (minutes)</FormLabel>
                    <NumberInput
                      min={formData.cookingTime?.min}
                      value={formData.cookingTime?.max}
                      onChange={(value) => handleNumberChange('max', value)}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>
              </CardBody>
            </Card>

            {/* Meal Types */}
            <Card>
              <CardHeader>
                <Heading size="md">Preferred Meal Types</Heading>
                <Text fontSize="sm" color="gray.600">
                  Which meal types do you want recommendations for?
                </Text>
              </CardHeader>
              <CardBody>
                <CheckboxGroup
                  value={formData.mealTypes}
                  onChange={(values) => handleCheckboxChange('mealTypes', values as string[])}
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {mealTypeOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        {option.label}
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </CardBody>
            </Card>

            {/* Seasonal Preferences */}
            <Card>
              <CardHeader>
                <Heading size="md">Seasonal Preferences</Heading>
                <Text fontSize="sm" color="gray.600">
                  Would you like seasonal ingredient recommendations?
                </Text>
              </CardHeader>
              <CardBody>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="seasonal-preferences" mb="0">
                    Consider seasonal ingredients
                  </FormLabel>
                  <Switch
                    id="seasonal-preferences"
                    isChecked={formData.seasonalPreferences}
                    onChange={(e) => setFormData(prev => ({ ...prev, seasonalPreferences: e.target.checked }))}
                  />
                </FormControl>
                <Text fontSize="sm" color="gray.500" mt={2}>
                  When enabled, we'll prioritize ingredients that are in season
                </Text>
              </CardBody>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              isLoading={loading}
              loadingText="Saving Preferences"
            >
              Save Preferences
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
};

export default Preferences; 