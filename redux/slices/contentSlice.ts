import { createSlice } from '@reduxjs/toolkit';

interface Recipe {
  name: string;
  duration: string;
  ingredients: string[];
  cuisine?: string;
  vegan?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  instructions: string[];
}

