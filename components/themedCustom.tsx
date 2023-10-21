import SurfaceView from "./SurfaceView"

import { View as DefaultView } from 'react-native';

export { SurfaceView }

import { useTheme, useThemeMode, Button } from '@rneui/themed';
import { MaterialCommunityIcons as DefaultIcon } from "@expo/vector-icons";


// DEFAULT THEMED BACKGROUND 
export function BackgroundView(props: DefaultView['props']) {
  const themeColors = useTheme().theme.colors;
  const { style } = props;
  return (
    <DefaultView
      {...props}
      style={[{ backgroundColor: themeColors.background } ,style]} 
    />
  )
}


// CUSTOM ICON
export function CustomIcon(props: any) {
  const themeColors = useTheme().theme.colors;
  return (
    <DefaultIcon
      {...props}
      style={{
        color: themeColors.secondary,
        ...props.style
      }}
    />
  )
}


// TOGGLE MODE BUTTON
export function ToggleMode() {
  const themeColors = useTheme().theme.colors;
  const { mode, setMode } = useThemeMode();
  function IconNode() {
    return (
      <CustomIcon 
        name={mode === 'dark' ? "moon-waxing-crescent": "white-balance-sunny"} 
        size={24}
        style={{color: themeColors.primary, backgroundColor: themeColors.background}}
      />
    )
  }
  return (
    <Button 
      onPress={() => setMode(mode === 'dark' ? 'light' : 'dark')} 
      buttonStyle={{backgroundColor: themeColors.background}}
      icon={<IconNode />}
      raised={false}
    />
  ) 
}