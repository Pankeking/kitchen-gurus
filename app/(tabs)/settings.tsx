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
        <ToggleMode iconSize={100} />
        <Text style={{fontSize: 20, textAlign: "justify", fontFamily: "PlaypenMedium"}}>
          This is a sample text, it can be
          <Text style={{fontSize: 12}}> Small </Text> 
          or
          <Text style={{fontSize: 32}}> Big </Text>
          also 
          <Text style={{fontFamily: "PlaypenBold"}}> Bold </Text>
          or
          <Text style={{fontFamily: "PlaypenThin"}}> Thin, </Text>
          there is an
          <Text style={{fontFamily: "Handlee"}}> Alternative </Text>
          text too!
          Make sure to use the theme that best suits you!
        </Text>
        <Text></Text>
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
    top: "20%",
    alignItems: "center",
  },

  optionContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "50%",
    width: "80%",
    padding: "5%",
    borderRadius: 25,
  },
  
  separator: {
    marginVertical: 30,
    height: 1,
  },
});
