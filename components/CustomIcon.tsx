import { useTheme } from '@rneui/themed';
import { MaterialCommunityIcons as DefaultIcon } from "@expo/vector-icons";

export default function CustomIcon(props:any) {

  const theme = useTheme().theme;

  return (
    <DefaultIcon
      {...props}
      style={{
        color: theme.colors.secondary,
        ...props.style  
      }} 
    />
  )
}