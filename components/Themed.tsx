/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, useColorScheme, View as DefaultView, Pressable, PressableProps, StyleSheet } from 'react-native';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import Colors from '../constants/Colors';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useState } from 'react';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
  styles?: any;
};

type ButtonProp = {
  title: string;
  onPress: () => void;
}
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type ButtonProps = ButtonProp & ViewProps;

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

export function Button(props: ButtonProps) {
  const { style, title, onPress, lightColor, darkColor, ...otherProps} = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor}, 'background');
  const color = useThemeColor({ light: darkColor, dark: lightColor}, 'text');


  const styles = StyleSheet.compose(style, { 
    alignItems: "center", 
    borderRadius: 5, 
    backgroundColor, 
    justifyContent: "center", 
    paddingHorizontal: 8
  })

  return (
    <Pressable
      style={styles}
      onPress={onPress}
    >
      {({ pressed }) => (
        <Animated.Text style={[{ color }, {opacity: pressed ? 0.5 : 1 }, { fontWeight: "500" }, { fontSize: 22 }]}>
          <FontAwesome
                    name="apple"
                    size={18}
                    // color={Colors[colorScheme ?? 'light'].text}
                    style={{ opacity: pressed ? 0.5 : 1 }}
          />
          &nbsp;
          {title}
        </Animated.Text>        
      )}
    </Pressable>
  )
}