import mongoose, { Document, Schema } from 'mongoose';

export interface IMeal extends Document {
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisine: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  ingredients: string[];
  instructions: string;
  imageUrl?: string;
  user: mongoose.Types.ObjectId;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const mealSchema = new Schema<IMeal>(
  {
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
    cuisine: {
      type: String,
      required: [true, 'Cuisine is required'],
      default: 'indian',
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
    date: {
      type: Date,
      required: [true, 'Meal date is required'],
      default: Date.now,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
    },
  },
  {
    timestamps: true,
  }
);

export const Meal = mongoose.model<IMeal>('Meal', mealSchema); 