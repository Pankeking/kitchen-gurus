/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, Pressable } from 'react-native';

import Colors from '../constants/Colors';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Button(props: {
  title: string;
  onPress?: () => void;
  lightColor?: string;
  darkColor?: string;
}) {
  const { title, onPress, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor}, 'background');
  const color = useThemeColor({ light: darkColor, dark: lightColor}, 'text');

  return (
    <Pressable
      style={[ { backgroundColor }, { borderRadius: 5 }, { padding: 10 }]}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Text style={{ color, opacity: pressed ? 0.5 : 1 }}>{title}</Text>
      )}
    </Pressable>
  )
}