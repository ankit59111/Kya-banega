import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { AppDispatch } from '../../store';
import { updatePreferences, RecipePreference } from '../../store/slices/preferencesSlice';
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
  Checkbox,
  CheckboxGroup,
  Select,
  Progress,
  Icon,
  SimpleGrid,
  Badge,
} from '@chakra-ui/react';
import { FaUtensils, FaHeart, FaClock, FaStar } from 'react-icons/fa';

interface PreferencesOnboardingProps {
  onComplete: () => void;
}

const PreferencesOnboarding: React.FC<PreferencesOnboardingProps> = ({ onComplete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [preferences, setPreferences] = useState<Partial<RecipePreference>>({
    preferredCuisines: [
      'north-indian', 'south-indian', 'east-indian', 'west-indian', 
      'indian-chinese', 'indo-italian', 'indo-mexican'
    ],
    dietaryRestrictions: [],
    spiceLevel: 'medium',
    cookingTime: { min: 15, max: 60 },
    mealTypes: ['breakfast', 'lunch', 'dinner', 'snack'],
    seasonalPreferences: true,
  });

  const cuisineOptions = [
    { value: 'north-indian', label: 'North Indian', emoji: '🍛' },
    { value: 'south-indian', label: 'South Indian', emoji: '🍛' },
    { value: 'east-indian', label: 'East Indian', emoji: '🍛' },
    { value: 'west-indian', label: 'West Indian', emoji: '🍛' },
    { value: 'indian-chinese', label: 'Indian Chinese', emoji: '🥡' },
    { value: 'indo-italian', label: 'Indo Italian', emoji: '🍝' },
    { value: 'indo-mexican', label: 'Indo Mexican', emoji: '🌮' },
  ];

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vegetarian', emoji: '🥬' },
    { value: 'vegan', label: 'Vegan', emoji: '🌱' },
    { value: 'gluten-free', label: 'Gluten-Free', emoji: '🌾' },
    { value: 'dairy-free', label: 'Dairy-Free', emoji: '🥛' },
    { value: 'nut-free', label: 'Nut-Free', emoji: '🥜' },
  ];

  const handleCuisineChange = (values: string[]) => {
    setPreferences(prev => ({
      ...prev,
      preferredCuisines: values,
    }));
  };

  const handleDietaryChange = (values: string[]) => {
    setPreferences(prev => ({
      ...prev,
      dietaryRestrictions: values,
    }));
  };

  const handleSpiceLevelChange = (value: string) => {
    setPreferences(prev => ({
      ...prev,
      spiceLevel: value as 'mild' | 'medium' | 'hot',
    }));
  };

  const handleSubmit = async () => {
    try {
      await dispatch(updatePreferences(preferences)).unwrap();
      toast({
        title: 'Preferences saved!',
        description: 'Your preferences have been set up successfully.',
        status: 'success',
        duration: 3000,
      });
      onComplete();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save preferences. You can update them later.',
        status: 'error',
        duration: 3000,
      });
      onComplete();
    }
  };

  const steps = [
    {
      title: 'Welcome to Annapurna!',
      subtitle: 'Let\'s set up your food preferences to get personalized meal suggestions.',
      icon: FaStar,
    },
    {
      title: 'What cuisines do you love?',
      subtitle: 'Select all the cuisines you enjoy (you can change these later)',
      icon: FaUtensils,
    },
    {
      title: 'Any dietary restrictions?',
      subtitle: 'Let us know if you have any dietary requirements',
      icon: FaHeart,
    },
    {
      title: 'How spicy do you like it?',
      subtitle: 'Choose your preferred spice level',
      icon: FaClock,
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <VStack spacing={6} textAlign="center">
            <Icon as={FaStar} boxSize={12} color="orange.400" />
            <Heading size="lg">Welcome to Annapurna! 🍽️</Heading>
            <Text fontSize="lg" color="gray.600">
              We'll help you discover delicious meals based on your preferences. 
              This will only take a minute!
            </Text>
            <Text fontSize="md" color="gray.500">
              Don't worry, you can always change these settings later in your profile.
            </Text>
          </VStack>
        );

      case 2:
        return (
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={2}>Select Your Favorite Cuisines</Heading>
              <Text color="gray.600">
                We'll suggest meals from these cuisines. Select all that you enjoy!
              </Text>
            </Box>
            <CheckboxGroup
              value={preferences.preferredCuisines}
              onChange={handleCuisineChange}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {cuisineOptions.map((option) => (
                  <Checkbox key={option.value} value={option.value} size="lg">
                    <HStack>
                      <Text fontSize="lg">{option.emoji}</Text>
                      <Text>{option.label}</Text>
                    </HStack>
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
          </VStack>
        );

      case 3:
        return (
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={2}>Dietary Restrictions</Heading>
              <Text color="gray.600">
                Do you follow any dietary restrictions? (Optional)
              </Text>
            </Box>
            <CheckboxGroup
              value={preferences.dietaryRestrictions}
              onChange={handleDietaryChange}
            >
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                {dietaryOptions.map((option) => (
                  <Checkbox key={option.value} value={option.value} size="lg">
                    <HStack>
                      <Text fontSize="lg">{option.emoji}</Text>
                      <Text>{option.label}</Text>
                    </HStack>
                  </Checkbox>
                ))}
              </SimpleGrid>
            </CheckboxGroup>
          </VStack>
        );

      case 4:
        return (
          <VStack spacing={6} align="stretch">
            <Box>
              <Heading size="md" mb={2}>Spice Level Preference</Heading>
              <Text color="gray.600">
                How spicy do you like your food?
              </Text>
            </Box>
            <Select
              value={preferences.spiceLevel}
              onChange={(e) => handleSpiceLevelChange(e.target.value)}
              size="lg"
            >
              <option value="mild">🌶️ Mild - Not too spicy</option>
              <option value="medium">🌶️🌶️ Medium - Moderate spice</option>
              <option value="hot">🌶️🌶️🌶️ Hot - I love spicy food!</option>
            </Select>
          </VStack>
        );

      default:
        return null;
    }
  };

  const progress = (currentStep / steps.length) * 100;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Progress Bar */}
        <Box>
          <Progress value={progress} colorScheme="orange" size="lg" borderRadius="full" />
          <Text fontSize="sm" color="gray.500" mt={2} textAlign="center">
            Step {currentStep} of {steps.length}
          </Text>
        </Box>

        {/* Step Content */}
        <Card>
          <CardBody>
            {renderStepContent()}
          </CardBody>
        </Card>

        {/* Navigation Buttons */}
        <HStack spacing={4} justify="space-between">
          <Button
            variant="ghost"
            onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
            isDisabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < steps.length ? (
            <Button
              colorScheme="orange"
              onClick={() => setCurrentStep(prev => prev + 1)}
            >
              Next
            </Button>
          ) : (
            <Button
              colorScheme="orange"
              onClick={handleSubmit}
              size="lg"
              px={8}
            >
              Complete Setup
            </Button>
          )}
        </HStack>

        {/* Skip Option */}
        {currentStep === 1 && (
          <Button
            variant="link"
            color="gray.500"
            onClick={onComplete}
            size="sm"
          >
            Skip for now, I'll set preferences later
          </Button>
        )}
      </VStack>
    </Container>
  );
};

export default PreferencesOnboarding; 