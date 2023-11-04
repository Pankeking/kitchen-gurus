import { StyleSheet, TouchableOpacity } from "react-native"
import { Text, View } from "../../../components/themedCustom"
import { router } from "expo-router"
import { useDispatch } from "react-redux"
import { nullifyRecipe } from "../../../redux/slices/contentSlice";

export default function cancelModal() {

  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(nullifyRecipe());
    router.replace('/(tabs)/')
  }
  return (
    <>
    <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Are You Sure You Want to Cancel?</Text>
          <Text style={styles.modalMessage}>Canceling now will discard any unsaved changes. Are you certain you want to proceed?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.buttonText}>No, Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Yes, Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    textAlign: 'center',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    marginBottom: 20,
  },
  // Optional Icon Styles
  // icon: {
  //   fontSize: 48,
  //   color: '#ff9900',
  // },
  buttonContainer: {
    flexDirection: 'row',
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