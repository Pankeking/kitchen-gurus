import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, View } from "../../../components/themedCustom"
import { router } from "expo-router"
import { useDispatch } from "react-redux"
import { nullifyRecipe } from "../../../redux/slices/contentSlice";
import { useTheme } from "@rneui/themed";

export default function cancelModal() {

  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(nullifyRecipe());
    router.replace('/(tabs)/')
  }
  return (
    <>
    <View style={styles.container}>
      <View style={[styles.modal, {backgroundColor: themeColors.surface}]}>
        <Text style={styles.title}>Discard This Recipe?</Text>
        <Text style={styles.message}>Canceling now will discard any unsaved changes. Are you certain you want to proceed?</Text>
        <View style={[styles.buttonContainer, {backgroundColor: themeColors.surface}]}>
          <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
            <Text style={styles.buttonText}>Yes, Cancel</Text>
          </TouchableOpacity>
          <View style={{marginHorizontal: 25}}></View>
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
            <Text style={styles.buttonText}>No, Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    width: "80%",
    height: "30%",
    textAlign: 'justify',
    borderRadius: 8,
    padding: 30,
    margin: 20,
  },
  title: {
    fontSize: 26,
    textAlign: "center",
    
    fontFamily: "PlaypenSemiBold",
    marginBottom: 5,
  },
  message: {
    textAlign: "justify",
    fontSize: 16,
    fontFamily: "PlaypenRegular",
    marginBottom: 20,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  confirmButton: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});