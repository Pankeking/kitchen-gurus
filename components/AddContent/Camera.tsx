import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import PhotoEditor from "./PhotoEditor";
import { useTheme } from "@rneui/themed";

export default function CameraComp(props: {
  
}) {
  const themeColors = useTheme().theme.colors;
  const ICON_SIZE = 22;
  const [isEditing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState<CameraCapturedPicture>();
  
  const cameraRef = useRef<Camera>(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      const status = await requestPermission();
      console.log("perm"+permission)
      console.log("stat"+status)
    })
  }, [])
  
  if (!permission) return <Text>hallo</Text>

  function ToggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  const handleClose = () => {
    if (router.canGoBack()) {
      router.back()
    } else {
      router.replace('/(content)/(add)/addPhotoName')
    }
  }

  const handleTakePicture = async () => {
    if (isReady && cameraRef.current) {
      try {
        const newPhoto = await cameraRef.current.takePictureAsync();
        if (newPhoto) {
          setNewImage(newPhoto)
          setEditing(true)
        }
      } catch (e) {
        alert("Camera Failed, try again");
        console.error("error: ", e);
      }
    } else {
      alert("Camera error please try again");
    }
  }

  return (
    <View style={styles.container}>
      {isEditing && newImage ? (
        <PhotoEditor newImage={newImage} />
        ) : (
      <>
      <View style={[styles.mask, {backgroundColor: themeColors.background}]}>
        <View style={styles.closeContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={handleClose}
          >
            <CustomIcon 
              style={[styles.closeIcon, {color: themeColors.lightText}]}
              name="window-close"
              size={40}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.rotateContainer, {backgroundColor: themeColors.lightText}]}>
          <TouchableOpacity
            onPress={() => ToggleCameraType()}
            style={[styles.rotateButton, {backgroundColor: themeColors.lightText, borderColor: themeColors.background}]}
          >
            <CustomIcon
              name="rotate-3d-variant"
              size={ICON_SIZE}
              style={{color: themeColors.background}}
            />
          </TouchableOpacity>
        </View>
      </View>    

      <Camera
        ref={cameraRef}
        style={styles.camera}
        ratio={'1:1'}
        type={type}
        onCameraReady={() => {
          setReady(true);
        }}
      >
      </Camera>

      <View style={[styles.mask, {backgroundColor: themeColors.background}]}>
        <View style={[styles.shutter, {backgroundColor: themeColors.lightText}]}>
          <TouchableOpacity 
            style={[styles.innerCircle, {borderColor: themeColors.background , backgroundColor: themeColors.lightText}]}  
            onPress={handleTakePicture} 
          />
        </View>
      </View>
      </>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mask: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
    height: "25%",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  shutter: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderWidth: 3,
    width: "80%",
    height: "80%",
  },

  rotateContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  rotateButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "black",
  },

  closeContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
  },
  closeButton: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  closeIcon: {
    color: "white",
  }
})