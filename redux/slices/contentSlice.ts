import { createSlice } from '@reduxjs/toolkit';

interface Extra {
  vegan?: boolean;
  vegetarian?: boolean;
  glutenFree?: boolean;
  lactoseFree?: boolean;
}

interface Ingredient {
  name: string;
  type: string;
  quantity: number;
  measureType: string;
}
interface Recipe {
  name: string;
  instructions: {
    subtitle: string;
    steps: string[];
  }[];
  photo: string[];
  ingredients: Ingredient[];
  extra: Extra;
}

interface ContentState {
  recipe: Recipe;
  isPhoto: boolean;
  isName: boolean;
  isInstructions: boolean;
  isIngredients: boolean;
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
    ingredients: [],
    extra: {},
  },
  photoCounter: 0,
  isName: false,
  isPhoto: false,
  isInstructions: false,
  isIngredients: false,
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
      state.isPhoto = true;
      state.photoCounter = state.photoCounter + 1;
    },
    setInstructions: (state, action) => {
      const newInstructions = action.payload;
      if (state.recipe.instructions[0].subtitle == '' 
        && state.recipe.instructions[0].steps[0] == '') {
          state.recipe.instructions = newInstructions;
      } else {
          state.recipe.instructions.push(newInstructions)
      }
      state.isInstructions = true;
      console.log(state.recipe.instructions)
    },
    setIngredients: (state, action) => {
      state.recipe.ingredients = action.payload;
      state.isIngredients = true;
    },
    setExtra: (state, action) => {
      const { vegan, vegetarian, glutenFree, lactoseFree } = action.payload;
      state.recipe.extra.vegan = vegan;
      state.recipe.extra.vegetarian = vegetarian;
      state.recipe.extra.glutenFree = glutenFree;
      state.recipe.extra.lactoseFree = lactoseFree;
      state.isExtra = true;
    },
    nullifyRecipe: (state) => {
      state.recipe = {
        name: '',
        instructions: [{
          subtitle: '',
          steps: ['']
        }],
        photo: [],
        ingredients: [],
        extra: {},
      }
      state.photoCounter   = 0;
      state.isName         = false;
      state.isPhoto        = false;
      state.isInstructions = false;
      state.isIngredients  = false;
      state.isExtra        = false;
    }
  },
});

export const selectRecipe = (state: ContentState) => state.recipe;

export const { setName, addPhoto, setInstructions, setIngredients, setExtra, nullifyRecipe } = contentSlice.actions;

export default contentSlice;
