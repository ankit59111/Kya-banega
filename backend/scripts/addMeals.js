const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/annapurna')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters'],
  },
}, { timestamps: true });

// Define Meal schema
const mealSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Meal name is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Meal type is required'],
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
  },
  calories: {
    type: Number,
    required: [true, 'Calories are required'],
    min: [0, 'Calories cannot be negative'],
  },
  protein: {
    type: Number,
    required: [true, 'Protein content is required'],
    min: [0, 'Protein cannot be negative'],
  },
  carbs: {
    type: Number,
    required: [true, 'Carb content is required'],
    min: [0, 'Carbs cannot be negative'],
  },
  fat: {
    type: Number,
    required: [true, 'Fat content is required'],
    min: [0, 'Fat cannot be negative'],
  },
  ingredients: [{
    type: String,
    required: [true, 'Ingredients are required'],
  }],
  instructions: {
    type: String,
    required: [true, 'Instructions are required'],
  },
  imageUrl: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Meal = mongoose.model('Meal', mealSchema);

// Sample meals data
const sampleMeals = [
  {
    name: 'Butter Chicken',
    type: 'dinner',
    calories: 450,
    protein: 25,
    carbs: 15,
    fat: 30,
    ingredients: [
      'Chicken breast',
      'Butter',
      'Heavy cream',
      'Tomato paste',
      'Garam masala',
      'Turmeric',
      'Cumin',
      'Coriander'
    ],
    instructions: 'Marinate chicken in yogurt and spices. Cook in a pan with butter and cream. Add tomato paste and simmer until thickened.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Palak Paneer',
    type: 'dinner',
    calories: 320,
    protein: 18,
    carbs: 12,
    fat: 22,
    ingredients: [
      'Paneer',
      'Spinach',
      'Onions',
      'Garlic',
      'Ginger',
      'Cumin',
      'Coriander',
      'Garam masala'
    ],
    instructions: 'Blend spinach with spices. Cook paneer cubes and add to spinach mixture. Simmer until well combined.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Biryani',
    type: 'dinner',
    calories: 580,
    protein: 22,
    carbs: 85,
    fat: 18,
    ingredients: [
      'Basmati rice',
      'Chicken',
      'Onions',
      'Saffron',
      'Cardamom',
      'Cinnamon',
      'Bay leaves',
      'Mint leaves'
    ],
    instructions: 'Layer cooked rice with spiced chicken. Add saffron milk and steam until fragrant and well-cooked.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Masala Dosa',
    type: 'breakfast',
    calories: 280,
    protein: 8,
    carbs: 45,
    fat: 8,
    ingredients: [
      'Rice',
      'Urad dal',
      'Potatoes',
      'Onions',
      'Mustard seeds',
      'Curry leaves',
      'Turmeric'
    ],
    instructions: 'Make dosa batter from rice and dal. Fill with spiced potato mixture and serve with chutney.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Chicken Tikka Masala',
    type: 'dinner',
    calories: 420,
    protein: 28,
    carbs: 18,
    fat: 26,
    ingredients: [
      'Chicken thighs',
      'Yogurt',
      'Tomato sauce',
      'Heavy cream',
      'Garam masala',
      'Cumin',
      'Coriander',
      'Ginger'
    ],
    instructions: 'Marinate chicken in spiced yogurt. Grill until charred. Simmer in tomato-cream sauce.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Dal Makhani',
    type: 'dinner',
    calories: 280,
    protein: 12,
    carbs: 35,
    fat: 10,
    ingredients: [
      'Black lentils',
      'Kidney beans',
      'Butter',
      'Cream',
      'Onions',
      'Garlic',
      'Ginger',
      'Garam masala'
    ],
    instructions: 'Cook lentils until soft. Add butter, cream, and spices. Simmer until creamy and well-seasoned.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Pav Bhaji',
    type: 'lunch',
    calories: 320,
    protein: 8,
    carbs: 45,
    fat: 12,
    ingredients: [
      'Mixed vegetables',
      'Butter',
      'Pav bread',
      'Onions',
      'Tomatoes',
      'Pav bhaji masala',
      'Coriander'
    ],
    instructions: 'Mash cooked vegetables with spices and butter. Serve with toasted pav bread.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Gulab Jamun',
    type: 'snack',
    calories: 180,
    protein: 3,
    carbs: 28,
    fat: 6,
    ingredients: [
      'Khoya',
      'All-purpose flour',
      'Sugar',
      'Cardamom',
      'Saffron',
      'Rose water'
    ],
    instructions: 'Make dough from khoya and flour. Shape into balls, deep fry, and soak in sugar syrup.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Rasgulla',
    type: 'snack',
    calories: 150,
    protein: 4,
    carbs: 25,
    fat: 4,
    ingredients: [
      'Chenna',
      'Sugar',
      'Cardamom',
      'Rose water',
      'Saffron'
    ],
    instructions: 'Make chenna from milk. Shape into balls and cook in sugar syrup until spongy.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  },
  {
    name: 'Samosa',
    type: 'snack',
    calories: 220,
    protein: 6,
    carbs: 25,
    fat: 12,
    ingredients: [
      'All-purpose flour',
      'Potatoes',
      'Peas',
      'Spices',
      'Oil for frying'
    ],
    instructions: 'Make pastry dough. Fill with spiced potato mixture. Deep fry until golden brown.',
    imageUrl: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400'
  }
];

async function addMeals() {
  try {
    // First, let's find a user to associate the meals with
    const user = await User.findOne();
    
    if (!user) {
      console.log('No user found. Please create a user first.');
      return;
    }

    console.log(`Adding meals for user: ${user.name} (${user.email})`);

    // Add meals with the user ID
    const mealsWithUser = sampleMeals.map(meal => ({
      ...meal,
      user: user._id
    }));

    // Insert meals
    const result = await Meal.insertMany(mealsWithUser);
    
    console.log(`Successfully added ${result.length} meals to the database:`);
    result.forEach(meal => {
      console.log(`- ${meal.name} (${meal.type})`);
    });

  } catch (error) {
    console.error('Error adding meals:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Run the script
addMeals(); 