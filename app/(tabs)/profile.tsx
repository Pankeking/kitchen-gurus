import { StyleSheet } from 'react-native';
import { Text, ToggleMode, View } from '../../components/themedCustom';
import { useSelector } from 'react-redux';
import { selectUser } from '../../redux/slices/authSlice';

export default function ProfileScreen() {
  const user = useSelector(selectUser);
  return (
    <View background style={styles.container}>
      <ToggleMode />
      <View background style={styles.innerContainer}>
        <Text> {user.uid} </Text>
        <Text> {user.email} </Text>
        <Text> {user.emailVerified} </Text>
        <Text> {user.displayName} </Text>
        <Text> {user.photoURL} </Text>
        <Text> {user.phoneNumber} </Text>
        <Text> {user.isAnonymous} </Text>
        <Text lightColor style={styles.title}>Tab Two</Text>
        <View style={styles.separator} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "90%",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
