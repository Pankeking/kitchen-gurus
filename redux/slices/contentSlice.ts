import { createSlice } from '@reduxjs/toolkit';

interface Extra {
  vegan?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  lactoseFree?: boolean;
}
interface Details {
  duration?: string;
  ingredients?: string[];
  cuisine?: string;
}
interface Recipe {
  name: string;
  instructions: string[];
  photo: string;
  details: Details;
  extra: Extra;
}

interface ContentState {
  recipe: Recipe;
  isPhotoName: boolean;
  isInstructions: boolean;
  isDetails: boolean;
  isExtra: boolean;
  isLoading: boolean;  
}

const initialState: ContentState = {
  recipe: {
    name: '',
    instructions: [],
    photo: '',
    details: {},
    extra: {},
  },
  isPhotoName: false,
  isInstructions: false,
  isDetails: false,
  isExtra: false,
  isLoading: false,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setPhotoName: (state, action) => {
      const { photo, name} = action.payload;
      state.recipe.photo = photo;
      state.recipe.name = name;
      state.isPhotoName = true;
    },
    setInstructions: (state, action) => {
      state.recipe.instructions = action.payload;
      state.isInstructions = true;
    },
    setDetails: (state, action) => {
      const { duration, ingredients, cuisine } = action.payload;
      state.recipe.details.duration = duration;
      state.recipe.details.ingredients = ingredients;
      state.recipe.details.cuisine = cuisine;
      state.isDetails = true;
    },
    setExtra: (state, action) => {
      const { vegan, vegetarian, glutenFree, lactoseFree } = action.payload;
      state.recipe.extra.vegan = vegan;
      state.recipe.extra.vegetarian = vegetarian;
      state.recipe.extra.glutenFree = glutenFree;
      state.recipe.extra.lactoseFree = lactoseFree;
      state.isDetails = true;
    },
    nullifyRecipe: (state) => {
      state.recipe = {
        name: '',
        instructions: [],
        photo: '',
        details: {},
        extra: {},
      }
      state.isPhotoName    = false;
      state.isInstructions = false;
      state.isDetails      = false;
      state.isExtra        = false;
    }
  },
});

export const selectRecipe = (state: ContentState) => state.recipe;

export const { setPhotoName, setInstructions, setDetails, setExtra, nullifyRecipe } = contentSlice.actions;

export default contentSlice;
