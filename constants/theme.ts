import { createTheme, useTheme } from '@rneui/themed';

const black = '#212121';
const orange = 'orange'; 
const red = '#D81B60';
const white = '#FFF'
const ivory = "ivory"


// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: red,
    secondary: black,
    background: ivory,
    surface: white,
  },
  darkColors: {
    primary: orange,
    secondary: black,
    background: black
  },
  components: {
    Button: {
      raised: false,
    },
  },
  mode: "light",
})

// Export creator
export default createTheme(defaultTheme);
