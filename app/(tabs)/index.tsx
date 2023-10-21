import { StyleSheet } from 'react-native';

import { Text, View } from '../../components/Themed';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import BackgroundView from '../../components/BackgroundView';
import { useEffect } from 'react';
import { router } from 'expo-router';
import { setLoading, signOut } from '../../redux/slices/authSlice';
import { signOut as FBsignOut } from 'firebase/auth';
import { FBauth } from '../../services/firebase';
import { Button } from '@rneui/themed';
import CustomIcon from '../../components/CustomIcon';

export default function TabOneScreen() {

  const dispatch = useDispatch();
  const userState = useSelector((state: any) => state.auth.user);

  useEffect(() => {
    async function AuthInOut() {
      if (userState == null) {
        router.replace('/(auth)')
      }
    AuthInOut();
    }
  }, [userState])

  const handleSignOut = async () => {
    dispatch(setLoading(true));
    try {
      await FBsignOut(FBauth)
      dispatch(signOut());
      router.replace('/(auth)')
    } catch (error: any) {
      const errorDispatched = {
        name: error.name,
        code: error.code
      }
      console.log(error)
    } finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <BackgroundView style={styles.container}>
      <Text style={styles.title}>KONEKTA2 EN EL INDIC</Text>
      {userState && 
        <Text style={styles.title}>{userState.id} - {userState.email}</Text>
      }
      <View style={styles.separator} />
      <BackgroundView style={styles.innerContainer}>
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
      </BackgroundView>
    </BackgroundView>
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
