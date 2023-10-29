import { Image, useTheme } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View } from '../themedCustom';



export default function ProfilePicViewer({ currentImage ,newImage } : any) {

  const themeColors = useTheme().theme.colors;
  console.log("new Image: " + newImage)
  const imageSource = newImage != '' ? { uri: newImage } : { uri: currentImage }; 
  if (imageSource) {
    return (
      <View style={styles.container}>
        <Image source={imageSource} style={[styles.image, {borderColor: themeColors.background}]} />
      </View>
      
    )
  } else {
    return <Text> Loading... </Text>
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