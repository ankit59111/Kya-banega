import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Input,
  FormControl,
  FormLabel,
  Select,
  Badge,
  IconButton,
  Alert,
  AlertIcon,
  useToast,
  Grid,
  Card,
  CardBody,
  CardHeader,
  Switch,
  VStack,
  HStack,
  useDisclosure,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons';
import api from '../utils/api';

interface User {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

interface Meal {
  _id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface RecipePreference {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  dietaryRestrictions: string[];
  preferredCuisines: string[];
  spiceLevel: 'mild' | 'medium' | 'hot';
  cookingTime: {
    min: number;
    max: number;
  };
  mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
  seasonalPreferences: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Stats {
  users: number;
  meals: number;
  preferences: number;
}

const DatabaseDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [preferences, setPreferences] = useState<RecipePreference[]>([]);
  const [stats, setStats] = useState<Stats>({ users: 0, meals: 0, preferences: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Edit modal states
  const [editData, setEditData] = useState<{
    type: 'user' | 'meal' | 'preference';
    data: any;
    originalData: any;
  }>({
    type: 'user',
    data: {},
    originalData: {},
  });

  const fetchData = async () => {
    try {
      setLoading(true);
      const [usersRes, mealsRes, preferencesRes, statsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/meals'),
        api.get('/admin/preferences'),
        api.get('/admin/stats'),
      ]);

      setUsers(usersRes.data);
      setMeals(mealsRes.data);
      setPreferences(preferencesRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError('Failed to fetch data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = (type: 'user' | 'meal' | 'preference', data: any) => {
    setEditData({
      type,
      data: { ...data },
      originalData: data,
    });
    onOpen();
  };

  const handleDelete = async (type: 'user' | 'meal' | 'preference', id: string) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      await api.delete(`/admin/${type}s/${id}`);

      toast({
        title: 'Success',
        description: `${type} deleted successfully`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      fetchData();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete item',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleSave = async () => {
    try {
      const { type, data } = editData;
      const response = await api.put(`/admin/${type}s/${data._id}`, data);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: `${type} updated successfully`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
        onClose();
        fetchData();
      } else {
        toast({
          title: 'Error',
          description: 'Failed to update item',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update item',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setEditData({
      ...editData,
      data: { ...editData.data, [field]: value },
    });
  };

  const handleArrayChange = (field: string, value: string[]) => {
    setEditData({
      ...editData,
      data: { ...editData.data, [field]: value },
    });
  };

  const renderUserTable = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Created</Th>
          <Th>Updated</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user._id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>{new Date(user.createdAt).toLocaleDateString()}</Td>
            <Td>{new Date(user.updatedAt).toLocaleDateString()}</Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Edit user"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => handleEdit('user', user)}
                />
                <IconButton
                  aria-label="Delete user"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete('user', user._id)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const renderMealTable = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Type</Th>
          <Th>Calories</Th>
          <Th>Protein</Th>
          <Th>Carbs</Th>
          <Th>Fat</Th>
          <Th>User</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {meals.map((meal) => (
          <Tr key={meal._id}>
            <Td>{meal.name}</Td>
            <Td>
              <Badge colorScheme="blue">{meal.type}</Badge>
            </Td>
            <Td>{meal.calories}</Td>
            <Td>{meal.protein}g</Td>
            <Td>{meal.carbs}g</Td>
            <Td>{meal.fat}g</Td>
            <Td>{meal.user.name}</Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Edit meal"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => handleEdit('meal', meal)}
                />
                <IconButton
                  aria-label="Delete meal"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete('meal', meal._id)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const renderPreferenceTable = () => (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Dietary Restrictions</Th>
          <Th>Preferred Cuisines</Th>
          <Th>Spice Level</Th>
          <Th>Cooking Time</Th>
          <Th>Meal Types</Th>
          <Th>Seasonal</Th>
          <Th>Actions</Th>
        </Tr>
      </Thead>
      <Tbody>
        {preferences.map((pref) => (
          <Tr key={pref._id}>
            <Td>{pref.user.name}</Td>
            <Td>
              <HStack spacing={1}>
                {pref.dietaryRestrictions.map((restriction) => (
                  <Badge key={restriction} colorScheme="green" size="sm">
                    {restriction}
                  </Badge>
                ))}
              </HStack>
            </Td>
            <Td>
              <HStack spacing={1}>
                {pref.preferredCuisines.map((cuisine) => (
                  <Badge key={cuisine} colorScheme="purple" size="sm">
                    {cuisine}
                  </Badge>
                ))}
              </HStack>
            </Td>
            <Td>
              <Badge colorScheme="orange">{pref.spiceLevel}</Badge>
            </Td>
            <Td>{pref.cookingTime.min}-{pref.cookingTime.max} min</Td>
            <Td>
              <HStack spacing={1}>
                {pref.mealTypes.map((type) => (
                  <Badge key={type} colorScheme="blue" size="sm">
                    {type}
                  </Badge>
                ))}
              </HStack>
            </Td>
            <Td>
              <Badge colorScheme={pref.seasonalPreferences ? 'green' : 'gray'}>
                {pref.seasonalPreferences ? 'Yes' : 'No'}
              </Badge>
            </Td>
            <Td>
              <HStack spacing={2}>
                <IconButton
                  aria-label="Edit preference"
                  icon={<EditIcon />}
                  size="sm"
                  onClick={() => handleEdit('preference', pref)}
                />
                <IconButton
                  aria-label="Delete preference"
                  icon={<DeleteIcon />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => handleDelete('preference', pref._id)}
                />
              </HStack>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );

  const renderEditModal = () => {
    const { type, data } = editData;

    return (
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit {type}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {type === 'user' && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={data.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    value={data.email || ''}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </FormControl>
              </VStack>
            )}

            {type === 'meal' && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    value={data.name || ''}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Type</FormLabel>
                  <Select
                    value={data.type || ''}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                  >
                    <option value="breakfast">Breakfast</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="snack">Snack</option>
                  </Select>
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <FormControl>
                    <FormLabel>Calories</FormLabel>
                    <Input
                      type="number"
                      value={data.calories || ''}
                      onChange={(e) => handleInputChange('calories', Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Protein (g)</FormLabel>
                    <Input
                      type="number"
                      value={data.protein || ''}
                      onChange={(e) => handleInputChange('protein', Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Carbs (g)</FormLabel>
                    <Input
                      type="number"
                      value={data.carbs || ''}
                      onChange={(e) => handleInputChange('carbs', Number(e.target.value))}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Fat (g)</FormLabel>
                    <Input
                      type="number"
                      value={data.fat || ''}
                      onChange={(e) => handleInputChange('fat', Number(e.target.value))}
                    />
                  </FormControl>
                </Grid>
                <FormControl>
                  <FormLabel>Ingredients (comma-separated)</FormLabel>
                  <Input
                    value={Array.isArray(data.ingredients) ? data.ingredients.join(', ') : ''}
                    onChange={(e) => handleArrayChange('ingredients', e.target.value.split(',').map(s => s.trim()))}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Instructions</FormLabel>
                  <Input
                    value={data.instructions || ''}
                    onChange={(e) => handleInputChange('instructions', e.target.value)}
                  />
                </FormControl>
              </VStack>
            )}

            {type === 'preference' && (
              <VStack spacing={4}>
                <FormControl>
                  <FormLabel>Spice Level</FormLabel>
                  <Select
                    value={data.spiceLevel || ''}
                    onChange={(e) => handleInputChange('spiceLevel', e.target.value)}
                  >
                    <option value="mild">Mild</option>
                    <option value="medium">Medium</option>
                    <option value="hot">Hot</option>
                  </Select>
                </FormControl>
                <Grid templateColumns="repeat(2, 1fr)" gap={4} w="full">
                  <FormControl>
                    <FormLabel>Min Cooking Time (min)</FormLabel>
                    <Input
                      type="number"
                      value={data.cookingTime?.min || ''}
                      onChange={(e) => handleInputChange('cookingTime', { ...data.cookingTime, min: Number(e.target.value) })}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Max Cooking Time (min)</FormLabel>
                    <Input
                      type="number"
                      value={data.cookingTime?.max || ''}
                      onChange={(e) => handleInputChange('cookingTime', { ...data.cookingTime, max: Number(e.target.value) })}
                    />
                  </FormControl>
                </Grid>
                <FormControl display="flex" alignItems="center">
                  <FormLabel htmlFor="seasonal-preferences" mb="0">
                    Seasonal Preferences
                  </FormLabel>
                  <Switch
                    id="seasonal-preferences"
                    isChecked={data.seasonalPreferences || false}
                    onChange={(e) => handleInputChange('seasonalPreferences', e.target.checked)}
                  />
                </FormControl>
              </VStack>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleSave}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  if (loading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text fontSize="2xl" fontWeight="bold">
          Loading Database Dashboard...
        </Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Database Dashboard
      </Text>

      {/* Statistics Cards */}
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6} mb={8}>
        <Card>
          <CardBody>
            <Text fontSize="3xl" fontWeight="bold" color="blue.500">
              {stats.users}
            </Text>
            <Text color="gray.600">Total Users</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="3xl" fontWeight="bold" color="purple.500">
              {stats.meals}
            </Text>
            <Text color="gray.600">Total Meals</Text>
          </CardBody>
        </Card>
        <Card>
          <CardBody>
            <Text fontSize="3xl" fontWeight="bold" color="green.500">
              {stats.preferences}
            </Text>
            <Text color="gray.600">Recipe Preferences</Text>
          </CardBody>
        </Card>
      </Grid>

      {/* Tabs */}
      <Tabs>
        <TabList>
          <Tab>Users</Tab>
          <Tab>Meals</Tab>
          <Tab>Recipe Preferences</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box overflowX="auto">
              {renderUserTable()}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box overflowX="auto">
              {renderMealTable()}
            </Box>
          </TabPanel>
          <TabPanel>
            <Box overflowX="auto">
              {renderPreferenceTable()}
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>

      {/* Edit Modal */}
      {renderEditModal()}

      {/* Error Alert */}
      {error && (
        <Alert status="error" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}
    </Container>
  );
};

export default DatabaseDashboard; 