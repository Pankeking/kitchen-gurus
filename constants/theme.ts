import { createTheme } from '@rneui/themed';

const black = '#212121';
const orange = 'orange'; 
const red = '#D81B60';
const white = '#FFF'
const ivory = "ivory"
const grey = '#86939e'


// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: red,
    secondary: black,
    background: ivory,
    surface: white,
    text: black,
  },
  darkColors: {
    primary: orange,
    secondary: black,
    background: black,
    text: white,
  },
  components: {
    Button: {
      raised: false,
      radius: 20,
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
