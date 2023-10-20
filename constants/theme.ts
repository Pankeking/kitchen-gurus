import { createTheme } from '@rneui/themed';

const black = '#212121';
const orange = 'orange'; 
const red = '#D81B60';
const white = '#faafaf'


// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: orange,
    secondary: black,
    background: white,
  },
  darkColors: {
    primary: black,
    secondary: orange,
    background: white
  },
  components: {
    Button: {
      raised: true,
    },
  },
  mode: "light",
})

// Export creator
export default createTheme(defaultTheme);
