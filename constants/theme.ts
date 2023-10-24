import { createTheme } from '@rneui/themed';

const black = '#121212';
const midnight = '#00040D'
const orange = '#FF9900'; 
const gradOrange = '#FF2222'
const rose = '#D81B60';
const snowWhite = '#F3F6FB'
const white = '#FFF'
const grey = '#86939e'

const altOrange = '#DB5223'; 
const ivory = "ivory"

// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: orange,
    secondary: black,
    accent: gradOrange,

    background: snowWhite,
    surface: white,

    lightText: midnight,
    darkText: snowWhite,
  },
  darkColors: {
    primary: rose,
    secondary: black,
    accent: gradOrange,

    background: midnight,
    surface: black,

    lightText: snowWhite,
    darkText: midnight,
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
    },
    
  },
  mode: "light",
})

// Export creator
export default createTheme(defaultTheme);
