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
  instructions: {
    subtitle: string;
    steps: string[];
  }[];
  photo: string[];
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
  photoCounter: number;
}



const initialState: ContentState = {
  recipe: {
    name: '',
    photo: [],
    instructions: [{
      subtitle: '',
      steps: ['']
    }],
    details: {},
    extra: {},
  },
  photoCounter: 0,
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
    },
    addPhoto: (state, action) => {
      const newPhoto = action.payload;
      state.recipe.photo.push(newPhoto);
      console.log("array",state.recipe.photo);
      console.log("length",state.recipe.photo.length);
      state.isPhoto = true;
      state.photoCounter = state.photoCounter + 1;
    },
    setInstructions: (state, action) => {
      
      if (state.recipe.instructions[0].subtitle == '' 
        && state.recipe.instructions[0].steps[0] == '') {
          state.recipe.instructions = action.payload;
          state.isInstructions = true;
      } else {
        state.recipe.instructions = [...state.recipe.instructions, action.payload]
      }
      console.log(state.recipe.instructions)
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
        instructions: [{
          subtitle: '',
          steps: ['']
        }],
        photo: [],
        details: {},
        extra: {},
      }
      state.photoCounter   = 0;
      state.isName         = false;
      state.isPhoto        = false;
      state.isInstructions = false;
      state.isDetails      = false;
      state.isExtra        = false;
    }
  },
});

export const selectRecipe = (state: ContentState) => state.recipe;

export const { setName, addPhoto, setInstructions, setDetails, setExtra, nullifyRecipe } = contentSlice.actions;

export default contentSlice;
