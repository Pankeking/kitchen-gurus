import { useEffect } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth } from '../../firebase-config';

import { Button, useTheme } from '@rneui/themed';
import { CustomIcon, ToggleMode, View, Text } from '../../components/themedCustom';

export default function SettingsScreen() {
  const themeColors = useTheme().theme.colors;
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
      <View style={styles.buttonContainer}>
        <LinearGradient
            colors={[themeColors.primary, themeColors.accent]}
            style={styles.gradient}
        >
          <TouchableOpacity 
            onPress={handleSignOut}
            style={styles.button}
          >
            <CustomIcon
              style={[styles.icon, {color: themeColors.background}]}
              name="logout"
              size={24}
            />
            <Text style={[styles.buttonTitle, {color: themeColors.darkText}]} >Sign Out</Text>
          </TouchableOpacity>
        </LinearGradient>
          
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
    flexDirection: "row",
    height: 70,
    width: "90%",
    
  },
  gradient: {
    flex:1,
    alignItems: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  icon: {
    // alignItems: "center",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: 'transparent',
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonTitle: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: 'bold',
    justifyContent: "center",
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
