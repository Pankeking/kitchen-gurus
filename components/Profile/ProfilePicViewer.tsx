import React from 'react'
import { StyleSheet } from 'react-native';

import { useTheme } from '@rneui/themed'
import { Text, View } from '../themedCustom';

import { Image } from 'expo-image';



export default function ProfilePicViewer({ newImage } : any) {

  const themeColors = useTheme().theme.colors;
  if (newImage != '') {
    const imageSource = { uri: newImage }
    return (
      <View style={styles.container}>
        <Image source={imageSource} style={[styles.image, {borderColor: themeColors.background}]} />
      </View>
      
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.image}> Loading... </Text>
      </View>
    )
  }

}


const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'transparent',
    opacity:1,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
  }
})