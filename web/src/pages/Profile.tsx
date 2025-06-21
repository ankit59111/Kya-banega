import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { RootState, AppDispatch } from '../store';
import { fetchPreferences, updatePreferences, RecipePreference } from '../store/slices/preferencesSlice';
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
  Avatar,
  Badge,
  Divider,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Icon,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
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
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { 
  FaUser, 
  FaUtensils, 
  FaHeart, 
  FaClock, 
  FaEdit, 
  FaCog,
  FaStar,
  FaCalendar
} from 'react-icons/fa';

const Profile: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const { preferences, loading } = useSelector((state: RootState) => state.preferences);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editForm, setEditForm] = useState<Partial<RecipePreference>>({});

  useEffect(() => {
    dispatch(fetchPreferences());
  }, [dispatch]);

  useEffect(() => {
    if (preferences) {
      setEditForm(preferences);
    }
  }, [preferences]);

  const handleEditPreferences = () => {
    setEditForm(preferences || {});
    onOpen();
  };

  const handleSavePreferences = async () => {
    try {
      await dispatch(updatePreferences(editForm)).unwrap();
      toast({
        title: 'Preferences updated',
        description: 'Your preferences have been saved successfully.',
        status: 'success',
        duration: 3000,
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update preferences.',
        status: 'error',
        duration: 3000,
      });
    }
  };

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

  const getSpiceLevelEmoji = (level: string) => {
    switch (level) {
      case 'mild': return '🌶️';
      case 'medium': return '🌶️🌶️';
      case 'hot': return '🌶️🌶️🌶️';
      default: return '🌶️';
    }
  };

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        {/* User Info Card */}
        <Card>
          <CardBody>
            <HStack spacing={6}>
              <Avatar size="xl" name={user?.name} bg="blue.500" />
              <VStack align="start" spacing={2}>
                <Heading size="lg">{user?.name}</Heading>
                <Text color="gray.600">{user?.email}</Text>
                <Badge colorScheme="green" variant="subtle">
                  Member since {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'Recently'}
                </Badge>
              </VStack>
            </HStack>
          </CardBody>
        </Card>

        {/* Quick Stats */}
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Total Meals</StatLabel>
                <StatNumber color="blue.500">0</StatNumber>
                <StatHelpText>
                  <Icon as={FaUtensils} mr={2} />
                  Meals suggested
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">Accepted Meals</StatLabel>
                <StatNumber color="green.500">0</StatNumber>
                <StatHelpText>
                  <Icon as={FaHeart} mr={2} />
                  Meals you loved
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stat>
                <StatLabel color="gray.600">This Week</StatLabel>
                <StatNumber color="orange.500">0</StatNumber>
                <StatHelpText>
                  <Icon as={FaCalendar} mr={2} />
                  Meals planned
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Preferences Section */}
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <Box>
                <Heading size="md">Your Preferences</Heading>
                <Text fontSize="sm" color="gray.600">
                  Customize your meal suggestions
                </Text>
              </Box>
              <Button
                leftIcon={<FaEdit />}
                colorScheme="blue"
                variant="outline"
                onClick={handleEditPreferences}
              >
                Edit Preferences
              </Button>
            </HStack>
          </CardHeader>
          <CardBody>
            {loading ? (
              <Text>Loading preferences...</Text>
            ) : preferences ? (
              <VStack spacing={6} align="stretch">
                {/* Cuisine Preferences */}
                <Box>
                  <HStack mb={3}>
                    <Icon as={FaUtensils} color="orange.400" />
                    <Text fontWeight="semibold">Preferred Cuisines</Text>
                  </HStack>
                  <SimpleGrid columns={{ base: 2, md: 4 }} spacing={2}>
                    {preferences.preferredCuisines?.map((cuisine) => {
                      const option = cuisineOptions.find(opt => opt.value === cuisine);
                      return (
                        <Badge key={cuisine} colorScheme="orange" variant="subtle" p={2}>
                          {option?.emoji} {option?.label}
                        </Badge>
                      );
                    })}
                  </SimpleGrid>
                </Box>

                <Divider />

                {/* Dietary Restrictions */}
                <Box>
                  <HStack mb={3}>
                    <Icon as={FaHeart} color="green.400" />
                    <Text fontWeight="semibold">Dietary Restrictions</Text>
                  </HStack>
                  {preferences.dietaryRestrictions?.length > 0 ? (
                    <SimpleGrid columns={{ base: 2, md: 3 }} spacing={2}>
                      {preferences.dietaryRestrictions.map((restriction) => {
                        const option = dietaryOptions.find(opt => opt.value === restriction);
                        return (
                          <Badge key={restriction} colorScheme="green" variant="subtle" p={2}>
                            {option?.emoji} {option?.label}
                          </Badge>
                        );
                      })}
                    </SimpleGrid>
                  ) : (
                    <Text color="gray.500">No dietary restrictions set</Text>
                  )}
                </Box>

                <Divider />

                {/* Spice Level */}
                <Box>
                  <HStack mb={3}>
                    <Icon as={FaStar} color="red.400" />
                    <Text fontWeight="semibold">Spice Level</Text>
                  </HStack>
                  <Badge colorScheme="red" variant="subtle" p={2}>
                    {getSpiceLevelEmoji(preferences.spiceLevel || 'medium')} {preferences.spiceLevel || 'medium'}
                  </Badge>
                </Box>

                <Divider />

                {/* Cooking Time */}
                <Box>
                  <HStack mb={3}>
                    <Icon as={FaClock} color="blue.400" />
                    <Text fontWeight="semibold">Cooking Time Preference</Text>
                  </HStack>
                  <Text color="gray.600">
                    {preferences.cookingTime?.min || 15} - {preferences.cookingTime?.max || 60} minutes
                  </Text>
                </Box>
              </VStack>
            ) : (
              <Alert status="info">
                <AlertIcon />
                No preferences set. Click "Edit Preferences" to get started.
              </Alert>
            )}
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <Heading size="md">Quick Actions</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Button
                leftIcon={<FaCog />}
                variant="outline"
                size="lg"
                onClick={() => navigate('/preferences')}
              >
                Edit Preferences
              </Button>
              <Button
                leftIcon={<FaUtensils />}
                variant="outline"
                size="lg"
                onClick={() => navigate('/meal-plans')}
              >
                Meal Plans
              </Button>
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>

      {/* Edit Preferences Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Preferences</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={6} align="stretch">
              {/* Cuisine Preferences */}
              <Box>
                <FormLabel fontWeight="semibold">Preferred Cuisines</FormLabel>
                <CheckboxGroup
                  value={editForm.preferredCuisines || []}
                  onChange={(values) => setEditForm(prev => ({ ...prev, preferredCuisines: values as string[] }))}
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {cuisineOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        <HStack>
                          <Text fontSize="lg">{option.emoji}</Text>
                          <Text>{option.label}</Text>
                        </HStack>
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </Box>

              <Divider />

              {/* Dietary Restrictions */}
              <Box>
                <FormLabel fontWeight="semibold">Dietary Restrictions</FormLabel>
                <CheckboxGroup
                  value={editForm.dietaryRestrictions || []}
                  onChange={(values) => setEditForm(prev => ({ ...prev, dietaryRestrictions: values as string[] }))}
                >
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={3}>
                    {dietaryOptions.map((option) => (
                      <Checkbox key={option.value} value={option.value}>
                        <HStack>
                          <Text fontSize="lg">{option.emoji}</Text>
                          <Text>{option.label}</Text>
                        </HStack>
                      </Checkbox>
                    ))}
                  </SimpleGrid>
                </CheckboxGroup>
              </Box>

              <Divider />

              {/* Spice Level */}
              <Box>
                <FormLabel fontWeight="semibold">Spice Level</FormLabel>
                <Select
                  value={editForm.spiceLevel || 'medium'}
                  onChange={(e) => setEditForm(prev => ({ ...prev, spiceLevel: e.target.value as 'mild' | 'medium' | 'hot' }))}
                >
                  <option value="mild">🌶️ Mild - Not too spicy</option>
                  <option value="medium">🌶️🌶️ Medium - Moderate spice</option>
                  <option value="hot">🌶️🌶️🌶️ Hot - I love spicy food!</option>
                </Select>
              </Box>

              <Divider />

              {/* Cooking Time */}
              <Box>
                <FormLabel fontWeight="semibold">Cooking Time Range (minutes)</FormLabel>
                <HStack spacing={4}>
                  <FormControl>
                    <FormLabel fontSize="sm">Min</FormLabel>
                    <NumberInput
                      value={editForm.cookingTime?.min || 15}
                      onChange={(value) => setEditForm(prev => ({
                        ...prev,
                        cookingTime: { ...prev.cookingTime!, min: Number(value) }
                      }))}
                      min={5}
                      max={editForm.cookingTime?.max || 60}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                  <FormControl>
                    <FormLabel fontSize="sm">Max</FormLabel>
                    <NumberInput
                      value={editForm.cookingTime?.max || 60}
                      onChange={(value) => setEditForm(prev => ({
                        ...prev,
                        cookingTime: { ...prev.cookingTime!, max: Number(value) }
                      }))}
                      min={editForm.cookingTime?.min || 15}
                      max={180}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </FormControl>
                </HStack>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSavePreferences}>
              Save Preferences
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default Profile; 