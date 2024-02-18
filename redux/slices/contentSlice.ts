import { createSlice } from '@reduxjs/toolkit';

export type dietOptions = {
  [key: string] : {
    label: string; 
    selected: boolean
  };
}
export interface Ingredient {
  name: string;
  type: string;
  quantity: number;
  measureType: string;
}
export interface Photo {
  uri: string;
  type: string;
  width: number;
  height: number;
  fileSize: number;
}
export interface Recipe {
  name: string;
  instructions: {
    subtitle: string;
    steps: string[];
  }[];
  photo: Photo[];
  ingredients: Ingredient[];
  extra: dietOptions;
}

export interface queryRecipe {
  recipeID: string;
  name: string;
  username: string;
  userID: string;
  photo: string;
  profilePicture: string;
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
    extra: {
      "Vegetarian": { label: "Vegetarian", selected: false },
      "Vegan": { label: "Vegan", selected: false },
      "Gluten-Free": { label: "Gluten-Free", selected: false },
      "Sugar-Free": { label: "Sugar-Free", selected: false },
      "Dairy-Free": { label: "Dairy-Free", selected: false },
      "High-Protein": { label: "High-Protein", selected: false },
      "Organic": { label: "Organic", selected: false },
      "Egg-Free": { label: "Egg-Free", selected: false },
      "Low-Sodium": { label: "Low-Sodium", selected: false },
      "Low-Carb": { label: "Low-Carb", selected: false },
      "Nut-Free": { label: "Nut-Free", selected: false },
      "Paleo": { label: "Paleo", selected: false },
      "Keto-Friendly": { label: "Keto-Friendly", selected: false },
      "Non-GMO": { label: "Non-GMO", selected: false },
      "Low-Fat": { label: "Low-Fat", selected: false },
      "Whole30": { label: "Whole30", selected: false },
      "Soy-Free": { label: "Soy-Free", selected: false },
      "Pescatarian": { label: "Pescatarian", selected: false },
      "Heart-Healthy": { label: "Heart-Healthy", selected: false },
      "Allergen-Free": { label: "Allergen-Free", selected: false },
      
    },
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
    },
    setIngredients: (state, action) => {
      state.recipe.ingredients = action.payload;
      state.isIngredients = true;
    },
    setExtra: (state, action) => {
      state.recipe.extra = action.payload;
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
        extra: toggleExtra(state.recipe.extra, false),
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

const toggleExtra = (extra: dietOptions, trueness:boolean) => {
  const updatedExtra = {...extra};
  for (const key in updatedExtra) {
    if (updatedExtra.hasOwnProperty(key)) {
      updatedExtra[key] = {
        ...updatedExtra[key],
        selected: trueness
      }
    }
  }
  return updatedExtra
}

export const selectRecipe = (state: ContentState) => state.recipe;

export const { setName, addPhoto, setInstructions, setIngredients, setExtra, nullifyRecipe } = contentSlice.actions;

export default contentSlice;
