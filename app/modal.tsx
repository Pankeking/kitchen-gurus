import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';

import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../redux/slices/authSlice';

import { FBauth } from '../firebase-config';
import { signOut as FBsignOut } from 'firebase/auth';

import { Button } from '@rneui/themed';
import { CustomIcon, View, Text } from '../components/themedCustom';

export default function ModalScreen() {

  const dispatch = useDispatch();
  // const userState = useSelector((state: any) => state.auth.user);

  // useEffect(() => {
  //   async function AuthInOut() {
  //     if (userState == null) {
  //       router.replace('/(auth)')
  //     }
  //     console.log("auth in logic")
  //   AuthInOut();
  //   }
  // }, [userState])

  const handleSignOut = async () => {
    try {
      await FBsignOut(FBauth)
      dispatch(setUser(null));
      router.replace('/(auth)')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View background style={styles.container}>
      <Text style={styles.title}>CONEKTAO</Text>
      {/* {userState && <Text style={styles.title}>{userState.id} - {userState.email}</Text>} */}
      <View style={styles.separator} />
      <View background style={styles.innerContainer}>
        <Button 
          buttonStyle={styles.buttonContainer}
          icon={<CustomIcon
            name="logout"
            size={18}
            />}
          size="lg"
          title="Sign Out"
          onPress={handleSignOut}
        />
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
  buttonContainer: {
    width: "100%",
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
