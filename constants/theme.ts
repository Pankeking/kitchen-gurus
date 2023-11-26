import { createTheme } from '@rneui/themed';

const orange = '#FF9900'; 
const gradOrange = '#FF2222'
const altOrange = '#DB5223'; 

const rose = '#D81B60';

const black = '#121212';
const midnight__ = '#00040D'
const lightMidnight = '#00061A'; // Lighter Midnight blue

const grey = '#86939e'

const white = '#FFF'
const snowWhite__ = '#F3F6FB'
const ivoryWhite = '#F7F5E6';


// Create default theme
const defaultTheme = createTheme({
  lightColors: {
    primary: orange,
    secondary: black,
    accent: gradOrange,

    background: ivoryWhite,
    surface: white,

    lightText: lightMidnight,
    darkText: ivoryWhite,
  },
  darkColors: {
    primary: rose,
    secondary: white,
    accent: gradOrange,

    background: lightMidnight,
    surface: black,

    lightText: ivoryWhite,
    darkText: lightMidnight,
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
