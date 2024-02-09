import React from 'react';
import { Text } from "react-native"

import { Image } from 'expo-image';

export default function ProfileBackGroundViewer({ newImage } : any) {

  if (newImage != '') {
    const imageSource = { uri: newImage }
    return (
      <Image source={imageSource} 
        style={{
          backgroundColor: "transparent",
          width: "99%",
          borderRadius: 3,
          height: "100%",
          }}
      />
    )
  } else {
    return (
      <Text>Loading...</Text>
    )
  }
}