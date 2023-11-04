import { StyleSheet } from 'react-native';

import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slices/authSlice';

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
      dispatch(setUser(null));
      return { user: null};
    } catch (e) {
      console.error(e);
      return { error: e };
    }
  }

  const handleSignOut = async () => {
      const resp = await appSignOut();
      if (!resp?.error) {
        dispatch(setUser(null));
        router.replace('/(auth)')
    } else {
      console.error(resp.error)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Settings</Text>
      </View>
      
      <View style={styles.separator} />
      
      <View style={[styles.optionContainer, {backgroundColor: themeColors.surface}]}>
      
        <View style={[styles.options, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.background }]}>
          <View style={styles.optionInfo}>
            <CustomIcon style={styles.optionIcon} name="circle" />
            
            <Text style={styles.optionText}>Settings</Text>
          </View>
            <CustomIcon name="circle" />
        </View>

        {/* //////
        
        //////
        //////
        // CREATE A REUSABLE COMPONENT FOR OPTION: ICON 1 / ICON 2? / TITLE / ONPRESS
        // CREATE A REUSABLE COMPONENT FOR OPTION: ICON 1 / ICON 2? / TITLE / ONPRESS
        //////
        // CREATE A REUSABLE COMPONENT FOR OPTION: ICON 1 / ICON 2? / TITLE / ONPRESS
        // CREATE A REUSABLE COMPONENT FOR OPTION: ICON 1 / ICON 2? / TITLE / ONPRESS 
        //////
        //////

        ////// */}
      
        <View style={[styles.options, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.background }]}>
          <ToggleMode />
        </View>
      
        <View style={[styles.options, { backgroundColor: themeColors.surface, borderBottomColor: themeColors.background }]}>
          <CustomIcon name="circle" />
          <Text style={styles.optionText}>Settings</Text>
        </View>
        
      </View>

      <View style={styles.separator} />

      <WideButton
        title="Sign Out"
        iconName="logout"
        onPress={handleSignOut}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  titleContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: "10%",
    width: "100%",      
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },

  optionContainer: {
    alignItems: "center",
    height: "60%",
    width: "90%",    
    borderRadius: 25,

    // borderColor:"blue",borderWidth:1,
  },
  options: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "#F3F6FB",
    borderBottomWidth: 4,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    height: "10%",
    marginVertical: 2,
    // alignContent: "space-between",
    borderRadius: 25,
    // borderColor:"green",borderWidth:1,
  },
  optionInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
    // borderColor:"green",borderWidth:1,
  },
  optionText: {
    fontSize: 18,
  },
  optionIcon: {
    marginHorizontal: 12,
  },
  optionButton: {

  },
  

  
  // BUTTON
  buttonContainer: {
    width: "80%",
    height: 50,
  },
  // OUTER BUTTON
  gradient: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    overflow: "hidden",
  },
  button: {
    backgroundColor: 'transparent',
    width: "100%",
  },
  // INNER BUTTON
  icon: {
    justifyContent: "flex-end",
  },
  buttonTitle: {
    alignItems: "center",
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  
  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
