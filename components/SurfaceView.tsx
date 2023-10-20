import { View as DefaultView, StyleSheet } from 'react-native';
import { useTheme } from '@rneui/themed';


export default function SurfaceView(props: any) {
  
  const theme = useTheme().theme;


  return (
    <DefaultView
      {...props} 
      style={[
        {
          borderColor: theme.colors.grey5,
          borderRadius: 5,
          borderWidth: 1,
          backgroundColor: theme.colors.background,
          ...props.style,  
        },
      ]}
    />
  )
}

