import { Image } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text } from './themedCustom';



export default function ImageViewer({ currentImage ,newImage } : any) {

  
  const imageSource = newImage != '' ? { uri: newImage } : { uri: currentImage }; 
  if (imageSource) {
    return (
      <Image source={imageSource} style={styles.image} />
    )
  } else {
    return <Text> Loading... </Text>
  }

}


const styles = StyleSheet.create({
  image: {
    width: 160,
    height: 160,
    borderRadius: 80,
  }
})