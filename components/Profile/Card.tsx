import { StyleSheet } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { useTheme } from "@rneui/themed";

export default function ProfileCard() {
  const textColor = useTheme().theme.colors.lightText;
  const color = {color:textColor}
  const hasMedia = true;
  const noMedia = false;
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} >Software Developer from Volkswagen</Text>
      </View>
      <View style={styles.infoContainer}>
        <CustomIcon size={18} style={[styles.infoIcon, color]} name="map-marker" />
        <Text style={styles.infoText} >Düsseldorf, Germany</Text>
      </View>
      <View style={styles.infoContainer}>
        <CustomIcon size={18} style={[styles.infoIcon, color]} name="email-fast" />
        <Text style={styles.infoText} >JavierDev@gmail.com</Text>
      </View>
      <View style={styles.socialContainer}>
        <CustomIcon size={22} style={[styles.socialIcon, color, {opacity: hasMedia ? 1 : 0.5}]} name="facebook" />
        <CustomIcon size={22} style={[styles.socialIcon, color, {opacity: noMedia ? 1 : 0.5}]} name="instagram" />
        <CustomIcon size={22} style={[styles.socialIcon, color, {opacity: hasMedia ? 1 : 0.5}]} name="linkedin" />
        <CustomIcon size={22} style={[styles.socialIcon, color, {opacity: noMedia ? 1 : 0.5}]} name="twitter" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: "100%",
    height: "100%",
    justifyContent: "center",
    marginLeft: "5%",
    // borderColor: "orange",
    // borderWidth: 1,
  },
  titleContainer: {
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.3,
    marginBottom: 10,
  },
  infoIcon: {
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 14,
    marginLeft: 2,
    opacity: 0.7,
  },
  socialContainer: {
    flexDirection: "row",
  },
  socialIcon: {
    paddingHorizontal: 2,
  }
})