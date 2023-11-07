import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera'
import { useEffect, useRef, useState } from "react";
import { router } from "expo-router";
import { useDispatch } from "react-redux";
import { addPhoto } from "../../redux/slices/contentSlice";
import PhotoEditor from "./PhotoEditor";

import {manipulateAsync, FlipType, Action} from 'expo-image-manipulator'

export default function CameraComp(props: {
  
}) {
  
  
  // console.log("from Camera.tsx/camera comp router back")
  // router.replace('/(content)/(add)/addPhotoName');
  
  const [isEditing, setEditing] = useState(false);
  const [newImage, setNewImage] = useState<CameraCapturedPicture>();
  
  const cameraRef = useRef<Camera>(null);
  const [status, requestPermission] = Camera.useCameraPermissions();
  const [type, setType] = useState(CameraType.back);
  const [isReady, setReady] = useState(false);

  const dispatch = useDispatch();

  
  useEffect(() => {
    const unsub = () => {
      if (!status) {
        requestPermission();
      } else if (status?.granted !== true) {
        console.log("what: ",status.granted);
        requestPermission();
        alert("denied");
      }
      console.log("onMount: ",status?.granted);
    }
    return () => unsub();
  }, [])

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

  const autoCrop = async (newPhoto: CameraCapturedPicture) => {
    try {
      let actions :Action[] = []
      console.log(`width: ${newPhoto.width}, height: ${newPhoto.height}`)
      if (newPhoto.width > newPhoto.height) {
        actions.push( {crop: {
          originX: newPhoto.width / 4,
          originY: 0,
          width: newPhoto.width / 2,
          height: newPhoto.height
        }} )
      } else {
        actions.push( 
          {crop: {
            originX: 0,
            originY: newPhoto.height / 4,
            width: newPhoto.width,
            height: newPhoto.height / 2
          }} )
        
      }
      actions.push(
        {resize: {
          width: 300,
          height: 300
        }}
      )
      const cropedResult = await manipulateAsync(
        newPhoto.uri,
        actions
      )
      setNewImage(cropedResult)
      setEditing(true)
    } catch (e) {
      console.error("error: ", e);
    }
  }


  const handleTakePicture = async () => {
    if (isReady) {
      if (cameraRef.current) {
        try {
          const newPhoto = await cameraRef.current.takePictureAsync();
          if (newPhoto) {
            autoCrop(newPhoto)
          }
        } catch (e) {
          alert("Camera Failed, try again");
          console.error("error: ", e);
        }
        
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
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={type}
        onCameraReady={() => {
          setReady(true);
        }}
      >
        <View style={styles.mask} />
        <View style={[styles.mask, {top: "50%"}]} />

        <View style={styles.close}>
          <TouchableOpacity
            style={styles.innerClose}
            onPress={handleClose}
          >
            <CustomIcon 
              style={styles.closeIcon}
              name="window-close"
              size={32}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.rotateCamera}>
          <TouchableOpacity
            onPress={() => ToggleCameraType()}
            style={styles.innerRotate}
          >
            <CustomIcon 
              name="rotate-3d-variant"
              
            />
          </TouchableOpacity>
        </View>

        <View style={styles.shutter}>
          <TouchableOpacity 
            style={styles.innerCircle}  
            onPress={handleTakePicture} 
          />
        </View>
      </Camera>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    width: "100%",
    height: "100%",
  },
  mask: {
    width: "100%",
    height: "25%",
    opacity: 0.7,
    backgroundColor: "black"
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  shutter: {
    position: "absolute",
    top: "85%",
    left: "40%",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    borderColor: "black", 
    borderWidth: 3,
    width: "80%",
    height: "80%",
  },
  rotateCamera: {
    position: "absolute",
    top: "10%",
    right: "10%",
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  innerRotate: {
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: "80%",
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "black",
  },
  close: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    top: "10%",
    right: "80%",
    width: 40,
    height: 40,
    backgroundColor: "transparent",
  },
  innerClose: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%"
  },
  closeIcon: {
    color: "white",
    
  }

})