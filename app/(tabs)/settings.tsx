import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

import { router } from 'expo-router';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth } from '../../firebase-config';

import { Button } from '@rneui/themed';
import { CustomIcon, ToggleMode, View, Text } from '../../components/themedCustom';

export default function SettingsScreen() {

  const dispatch = useDispatch();

  const appSignOut = async () => {
    try {
      await signOut(FBauth);
      dispatch(setUser(null));
      return { user: null};
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  const handleSignOut = async () => {
      const resp = await appSignOut();
      router.replace('/(auth)')
    if (!resp?.error) {
      router.replace('/(auth)')
    } else {
      console.error(resp.error)
    }
  }

  return (
    <View style={styles.container}>
      <ToggleMode />
      <Text style={styles.title}>Settings Screen</Text>
      <View style={styles.separator} />
      <View style={styles.innerContainer}>
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
