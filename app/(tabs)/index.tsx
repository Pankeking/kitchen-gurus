import { StyleSheet } from 'react-native';

import { View } from '../../components/Themed';
import { Text } from '@rneui/base';
import { Link } from 'expo-router';
import { Button } from '@rneui/base';
import { AntDesign } from '@expo/vector-icons';

export default function TabOneScreen() {

  const iconO = () => {
    return (
      <AntDesign
        name="logout"
        size={18}
        color="#fff"
        style={styles.buttonIcon}
      />
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Text style={styles.title}>Conectado</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <Link href="/(auth)/login" asChild>
          <Button 
            color={"#000"} 
            containerStyle={styles.buttonContainer}
            icon={iconO()}
            iconPosition='right'
            radius={5} 
            size="lg" 
            title="Log Out" 
            titleStyle={styles.buttonTitle}
          />
        </Link>
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  buttonIcon: {
    paddingHorizontal: 8,
  },
  buttonTitle: {
    fontSize: 24,
  },
  buttonContainer: {
    width: "50%",
    borderWidth: 1,
    borderColor: "white"
  }
});
