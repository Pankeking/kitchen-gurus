import { router } from "expo-router"
import { View } from "../../components/themedCustom"
import WideButton from "../../components/WideButton"

export default function IndexScreen() {
  const onPress = () => {
    router.push('/login');
  }

  return (
    <>
      <View style={{flex: 1,alignItems: "center",justifyContent: "center"}}>
        <WideButton 
          title="Proceed to Sign In" 
          iconName="account-alert"
          onPress={onPress}
        />
      </View>
    </>
  )
}
