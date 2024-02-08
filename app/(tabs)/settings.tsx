import { StyleSheet } from 'react-native';

import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch } from 'react-redux';
import { nullifyUser, setUser } from '../../redux/slices/authSlice';

import { signOut } from 'firebase/auth';
import { FBauth } from '../../firebase-config';

import { Button, useTheme } from '@rneui/themed';
import { CustomIcon, ToggleMode, View, Text } from '../../components/themedCustom';
import WideButton from '../../components/WideButton';

export default function SettingsScreen() {
  const themeColors = useTheme().theme.colors;
  const dispatch = useDispatch();

  const appSignOut = async () => {
    try {
      await signOut(FBauth);
      dispatch(nullifyUser());
      return null;
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  const handleSignOut = async () => {
    const resp = await appSignOut();
    if (!resp?.error) {
      router.replace('/(auth)')
    } else {
      console.error(resp.error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      <View style={[styles.optionContainer, {backgroundColor: themeColors.surface}]}>
        
        <ToggleMode />
      </View>
      <View style={styles.bottom}>
        <WideButton
          title="Sign Out"
          iconName="logout"
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
  },
  bottom: {
    width: "90%",
    top: "35%",
    alignItems: "center",
  },

  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "40%",
    width: "70%",    
    borderRadius: 25,
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
