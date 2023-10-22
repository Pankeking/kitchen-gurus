import { createTheme } from '@rneui/themed';

const black = '#212121';
const midnight = '#00040D'
const orange = '#FF9900'; 
const rose = '#D81B60';
const white = '#FFF'
const ivory = "ivory"
const grey = '#86939e'


// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: rose,
    secondary: black,
    background: ivory,
    surface: white,
    lightText: black,
    darkText: white,
  },
  darkColors: {
    primary: orange,
    secondary: black,
    background: black,
    surface: midnight,
    lightText: white,
    darkText: black,
  },
  components: {
    Button: {
      raised: false,
      radius: 15,
      buttonStyle: {
        justifyContent: "flex-start"
      },
      titleStyle: {
        marginHorizontal: 10
      }
    },
    Input: {
      placeholderTextColor: grey
    }
  },
  mode: "light",
})

// Export creator
export default createTheme(defaultTheme);
