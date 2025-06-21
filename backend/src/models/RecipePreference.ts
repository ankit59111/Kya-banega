import mongoose, { Document, Schema } from 'mongoose';

export interface IRecipePreference extends Document {
  user: mongoose.Types.ObjectId;
  dietaryRestrictions: string[];
  preferredCuisines: string[];
  spiceLevel: 'mild' | 'medium' | 'hot';
  cookingTime: {
    min: number;
    max: number;
  };
  mealTypes: ('breakfast' | 'lunch' | 'dinner' | 'snack')[];
  seasonalPreferences: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const recipePreferenceSchema = new Schema<IRecipePreference>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      unique: true,
    },
    dietaryRestrictions: [{
      type: String,
      enum: ['vegetarian', 'vegan', 'gluten-free', 'dairy-free', 'nut-free', 'halal', 'kosher'],
    }],
    preferredCuisines: [{
      type: String,
      enum: ['north-indian', 'south-indian', 'east-indian', 'west-indian', 'indian-chinese', 'indo-italian', 'indo-mexican'],
    }],
    spiceLevel: {
      type: String,
      enum: ['mild', 'medium', 'hot'],
      default: 'medium',
    },
    cookingTime: {
      min: {
        type: Number,
        default: 15,
        min: 0,
      },
      max: {
        type: Number,
        default: 60,
        min: 0,
      },
    },
    mealTypes: [{
      type: String,
      enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    }],
    seasonalPreferences: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const RecipePreference = mongoose.model<IRecipePreference>('RecipePreference', recipePreferenceSchema); 