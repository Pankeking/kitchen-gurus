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
  isPhoto: boolean;
  isName: boolean;
  isInstructions: boolean;
  isDetails: boolean;
  isExtra: boolean;
  isLoading: boolean;  
}

const initialState: ContentState = {
  recipe: {
    name: '',
    photo: '',
    instructions: [],
    details: {},
    extra: {},
  },
  isName: false,
  isPhoto: false,
  isInstructions: false,
  isDetails: false,
  isExtra: false,
  isLoading: false,
}

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.recipe.name = action.payload;
      if (action.payload != '') {
        state.isName = true;
      } else {
        state.isName = false;
      }
      console.log("Recipe Name is: ", state.recipe.name)
    },
    setPhoto: (state, action) => {
      const photo = action.payload;
      state.recipe.photo = photo;
      state.isPhoto = true;
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
      state.isName        = false;
      state.isPhoto        = false;
      state.isInstructions = false;
      state.isDetails      = false;
      state.isExtra        = false;
    }
  },
});

export const selectRecipe = (state: ContentState) => state.recipe;

export const { setName, setPhoto, setInstructions, setDetails, setExtra, nullifyRecipe } = contentSlice.actions;

export default contentSlice;
