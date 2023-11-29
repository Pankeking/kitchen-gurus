import { createSlice } from '@reduxjs/toolkit';

type dietOptions = {
  [key: string] : {label: string; selected: boolean};
}
interface Ingredient {
  name: string;
  type: string;
  quantity: number;
  measureType: string;
}
export interface Recipe {
  name: string;
  instructions: {
    subtitle: string;
    steps: string[];
  }[];
  photo: string[];
  ingredients: Ingredient[];
  extra: dietOptions;
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
      "Dairy-Free": { label: "Dairy-Free", selected: false },
      "Nut-Free": { label: "Nut-Free", selected: false },
      "Low-Carb": { label: "Low-Carb", selected: false },
      "High-Protein": { label: "High-Protein", selected: false },
      "Paleo": { label: "Paleo", selected: false },
      "Keto-Friendly": { label: "Keto-Friendly", selected: false },
      "Organic": { label: "Organic", selected: false },
      "Non-GMO": { label: "Non-GMO", selected: false },
      "Low-Fat": { label: "Low-Fat", selected: false },
      "Whole30": { label: "Whole30", selected: false },
      "Soy-Free": { label: "Soy-Free", selected: false },
      "Egg-Free": { label: "Egg-Free", selected: false },
      "Pescatarian": { label: "Pescatarian", selected: false },
      "Low-Sodium": { label: "Low-Sodium", selected: false },
      "Heart-Healthy": { label: "Heart-Healthy", selected: false },
      "Allergen-Free": { label: "Allergen-Free", selected: false },
      "Vegetarian": { label: "Vegetarian", selected: false },
      "Vegan": { label: "Vegan", selected: false },
      "Gluten-Free": { label: "Gluten-Free", selected: false },
      "Sugar-Free": { label: "Sugar-Free", selected: false },
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
      console.log(state.recipe.instructions)
    },
    setIngredients: (state, action) => {
      state.recipe.ingredients = action.payload;
      state.isIngredients = true;
    },
    setExtra: (state, action) => {
      state.recipe.extra = action.payload;
      console.log(state.recipe.extra)
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
