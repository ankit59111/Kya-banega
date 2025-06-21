import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Image,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  useToast,
  IconButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { 
  CheckIcon, 
  CloseIcon, 
  StarIcon, 
  TimeIcon,
  RepeatIcon 
} from '@chakra-ui/icons';
import { MealType, getMealConfig } from '../utils/mealTimeUtils';
import { Meal } from '../types/meal';
import { keyframes } from '@emotion/react';

interface MealSuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  meal: Meal | null;
  mealType: MealType;
  onAccept: (meal: Meal) => void;
  onReject: (meal: Meal) => void;
  onSurpriseMe: () => void;
  loading?: boolean;
}

const slideUp = keyframes`
  from { transform: translateY(100%); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const MealSuggestionModal: React.FC<MealSuggestionModalProps> = ({
  isOpen,
  onClose,
  meal,
  mealType,
  onAccept,
  onReject,
  onSurpriseMe,
  loading = false,
}) => {
  const toast = useToast();
  const mealConfig = getMealConfig(mealType);

  const handleAccept = () => {
    if (meal) {
      onAccept(meal);
      toast({
        title: 'Great choice! 🎉',
        description: `${meal.name} has been added to your meal plan.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleReject = () => {
    if (meal) {
      onReject(meal);
      toast({
        title: 'No worries! 😊',
        description: 'Let\'s find something else for you.',
        status: 'info',
        duration: 2000,
        isClosable: true,
      });
      onClose();
    }
  };

  const handleSurpriseMe = () => {
    onSurpriseMe();
    toast({
      title: 'Surprise! 🎲',
      description: 'Finding a random meal for you...',
      status: 'info',
      duration: 2000,
      isClosable: true,
    });
  };

  if (!meal) {
    return null;
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      size="full" 
      motionPreset="slideInBottom"
      closeOnOverlayClick={false}
    >
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
      <ModalContent 
        maxW="500px" 
        mx="auto" 
        mt={{ base: '30vh', md: 'auto' }} 
        mb={0}
        borderTopRadius="2xl"
        borderBottomRadius={0}
        bg="white"
        boxShadow="2xl"
        maxH={{ base: '70vh', md: '90vh' }}
        sx={{
          '@media (max-width: 48em)': {
            animation: `${slideUp} 0.4s cubic-bezier(0.22, 1, 0.36, 1)`
          }
        }}
      >
        <ModalCloseButton 
          position="absolute" 
          right={4} 
          top={4} 
          zIndex={10}
          color="gray.500"
        />
        
        <ModalBody p={0}>
          <VStack spacing={0} align="stretch">
            {/* Header with meal type */}
            <Box
              bg={`linear-gradient(135deg, ${mealConfig.color}20, ${mealConfig.color}40)`}
              p={6}
              textAlign="center"
              borderTopRadius="2xl"
            >
              <VStack spacing={2}>
                <Text fontSize="4xl">{mealConfig.emoji}</Text>
                <Heading size="md" color={mealConfig.color}>
                  {mealConfig.label} Suggestion
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Here's what we think you'll love today!
                </Text>
              </VStack>
            </Box>

            {/* Scrollable content */}
            <Box overflowY="auto" maxH={{ base: 'calc(70vh - 96px)', md: 'calc(90vh - 96px)' }}>
              <VStack spacing={0} align="stretch">
                {/* Meal Image */}
                {meal.imageUrl && (
                  <Box position="relative" h="200px" overflow="hidden">
                    <Image
                      src={meal.imageUrl}
                      alt={meal.name}
                      w="full"
                      h="full"
                      objectFit="cover"
                    />
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bg="blackAlpha.200"
                    />
                  </Box>
                )}

                {/* Meal Details */}
                <Box p={6}>
                  <VStack spacing={4} align="stretch">
                    {/* Meal Name and Type */}
                    <Box>
                      <Heading size="lg" mb={2}>
                        {meal.name}
                      </Heading>
                      <HStack spacing={2}>
                        <Badge colorScheme="blue" variant="subtle">
                          {meal.type}
                        </Badge>
                        <Badge colorScheme="green" variant="subtle">
                          {meal.cuisine || 'Indian'}
                        </Badge>
                      </HStack>
                    </Box>

                    {/* Nutrition Stats */}
                    <SimpleGrid columns={2} spacing={4}>
                      <Stat>
                        <StatLabel fontSize="xs" color="gray.600">Calories</StatLabel>
                        <StatNumber fontSize="lg" color="blue.500">
                          {meal.calories}
                        </StatNumber>
                        <StatHelpText fontSize="xs">kcal</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel fontSize="xs" color="gray.600">Protein</StatLabel>
                        <StatNumber fontSize="lg" color="green.500">
                          {meal.protein}g
                        </StatNumber>
                        <StatHelpText fontSize="xs">Daily goal: 50g</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel fontSize="xs" color="gray.600">Carbs</StatLabel>
                        <StatNumber fontSize="lg" color="purple.500">
                          {meal.carbs}g
                        </StatNumber>
                        <StatHelpText fontSize="xs">Daily goal: 200g</StatHelpText>
                      </Stat>
                      <Stat>
                        <StatLabel fontSize="xs" color="gray.600">Fat</StatLabel>
                        <StatNumber fontSize="lg" color="orange.500">
                          {meal.fat}g
                        </StatNumber>
                        <StatHelpText fontSize="xs">Daily goal: 65g</StatHelpText>
                      </Stat>
                    </SimpleGrid>

                    {/* Action Buttons */}
                    <VStack spacing={3} pt={4}>
                      <HStack spacing={3} w="full">
                        <Button
                          leftIcon={<CheckIcon />}
                          colorScheme="green"
                          size="lg"
                          flex={1}
                          onClick={handleAccept}
                          isLoading={loading}
                          loadingText="Accepting..."
                        >
                          Accept
                        </Button>
                        <Button
                          leftIcon={<CloseIcon />}
                          colorScheme="red"
                          variant="outline"
                          size="lg"
                          flex={1}
                          onClick={handleReject}
                          isLoading={loading}
                          loadingText="Rejecting..."
                        >
                          Reject
                        </Button>
                      </HStack>
                      
                      <Button
                        leftIcon={<RepeatIcon />}
                        colorScheme="blue"
                        variant="ghost"
                        size="md"
                        w="full"
                        onClick={handleSurpriseMe}
                        isLoading={loading}
                        loadingText="Finding..."
                      >
                        Surprise Me Again
                      </Button>
                    </VStack>
                  </VStack>
                </Box>
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MealSuggestionModal; 