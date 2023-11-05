import { StyleSheet } from "react-native"
import { View } from "../../../components/themedCustom"
import CameraComp from "../../../components/AddContent/Camera"

export default function CameraScreen() {
  return (
    <View style={styles.container}>
      <CameraComp />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

})