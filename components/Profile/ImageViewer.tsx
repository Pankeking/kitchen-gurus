import { Image } from '@rneui/themed'
import React from 'react'
import { StyleSheet } from 'react-native';
import { Text, View } from '../themedCustom';



export default function ImageViewer({ currentImage ,newImage } : any) {

  
  const imageSource = newImage != '' ? { uri: newImage } : { uri: currentImage }; 
  if (imageSource) {
    return (
      <View style={styles.container}>
        <Image source={imageSource} style={styles.image} />
      </View>
      
    )
  } else {
    return <Text> Loading... </Text>
  }

}


const styles = StyleSheet.create({
  container: {
    width: "90%",
    height: "80%",
    backgroundColor: 'rgba(0,0,0,0)',
    opacity:1,
    shadowColor: "black",
    shadowOpacity: 0.6,
    shadowRadius: 6,
    shadowOffset: {
      height: 4,
      width: 0
    },
  },
  image: {
    width: 120,
    height: 160,
    borderRadius: 20,
  }
})