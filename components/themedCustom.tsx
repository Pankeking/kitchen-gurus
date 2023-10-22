import { View as DefaultView, Text as DefaultText } from 'react-native';

import { useTheme, useThemeMode, Button } from '@rneui/themed';

import { MaterialCommunityIcons as DefaultIcon } from "@expo/vector-icons";

// TEXT
// VIEW
// ICON
// TOGGLE

// TYPE DEFINITIONS
type TextLightDark = {
  lightColor?: boolean;
  darkColor?: boolean;
}
type BackgroudViewProps = {
  background?: boolean;
  surface?: boolean;
}
export type TextProps = TextLightDark & DefaultText['props'];
export type ViewProps = BackgroudViewProps & DefaultView['props'];


// DEFAULT TEXT LIGHT/DARK MODE
export function Text(props: TextProps) {
  const themeColors = useTheme().theme.colors;
  const { style, lightColor, darkColor, ...otherProps } = props;
  const textColor = lightColor ? themeColors.lightText : darkColor ? themeColors.darkText : themeColors.secondary;

  return (
    <DefaultText 
      style={[{ color: textColor }, style]}
      {...otherProps}
    />
  )
}


// DEFAULT VIEW
export function View(props: ViewProps) {
  const themeColors = useTheme().theme.colors;
  const { style, background, surface,...otherProps } = props;
  const bgColor = background ? themeColors.background : surface ? themeColors.surface : themeColors.secondary;
  return (
    <DefaultView
      style={[{ backgroundColor: bgColor}, style]}
      {...otherProps}
    />
  )
}


// CUSTOM ICON
export function CustomIcon(props: any) {
  const { style } = props;
  const themeColors = useTheme().theme.colors;
  return (
    <DefaultIcon
      {...props}
      style={[{color: themeColors.secondary}, style]}
    />
  )
}


// TOGGLE MODE BUTTON
export function ToggleMode(props: any) {
  const { style, iconSize,...otherProps } = props
  const themeColors = useTheme().theme.colors;
  const { mode, setMode } = useThemeMode();
  function IconNode() {
    return (
      <CustomIcon 
        name={mode === 'dark' ? "moon-waxing-crescent": "white-balance-sunny"} 
        size={iconSize ? iconSize : 24}
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