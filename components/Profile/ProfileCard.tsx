import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { useTheme } from "@rneui/themed";
import { FBauth } from "../../firebase-config";

export default function ProfileCard() {
  const textColor = useTheme().theme.colors.lightText;
  const color = {color:textColor}
  const iconInfoSize = 16;
  return (
    <View style={styles.container}>

      <View style={styles.titleContainer}>
        <Text style={styles.title} >{FBauth.currentUser?.displayName}</Text>
      </View>

      {/* <View style={styles.infoContainer}>
        <CustomIcon size={iconInfoSize} style={[styles.infoIcon, color]} name="map-marker" />
        <Text style={styles.infoText}>Düsseldorf, Deutschland</Text>
      </View> */}

      {/* <View style={styles.infoContainer}>
        <CustomIcon size={iconInfoSize} style={[styles.infoIcon, color]} name="email" />
        <Text style={styles.infoText}>JavierDev@gmail.com</Text>
      </View> */}
      <View style={styles.bioContainer}>
        <Text style={styles.bioText}>Me gusta el vino 
          porque el vino es bueno, el que vino al mundo y no tomo vino a que chucha vino?
          porque el vino es bueno, el que vino al mundo y no tomo vino a que chucha vino?
          porque el vino es bueno, el que vino al mundo y no tomo vino a que chucha vino?
        </Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
    // paddingHorizontal: "10%",
    // justifyContent: "center",
    // borderColor: "orange",borderWidth: 1,
  },
  titleContainer: {
    // marginBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "blue",borderWidth: 1,
    backgroundColor: "transparent",
    marginTop: -10,
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
    marginTop: 3,
    // borderColor: "orange",borderWidth: 1,
  },
  infoIcon: {
    // justifyContent: "flex-start",
    alignItems: "center",
    // paddingRight: 4,
    // width: 20,
  },
  infoText: {
    fontSize: 16,
    // marginLeft: 2,
    // marginRight: 16,
    // paddingRight: 16,
    opacity: 0.7,
  },
  bioContainer: {
    // width: "60%",
    paddingHorizontal: "15%",
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "orange", borderWidth:1,
  },
  bioText: {
    lineHeight: 20,
  },
})