import { View as DefaultView } from 'react-native';
import { useTheme } from '@rneui/themed';


export default function BackgroundView(props: any) {

  const theme = useTheme().theme;


  return (
    <DefaultView
      {...props} 
      style={[
        {
          backgroundColor: theme.colors.background,
          ...props.style,  
        },
      ]}
    />
  )
}
