import { StyleSheet, TouchableOpacity } from "react-native";
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
        <CustomIcon size={20} style={[styles.infoIcon, color]} name="map-marker" />
        <Text style={styles.infoText} >Düsseldorf, Germany</Text>
      </View>
      <View style={styles.infoContainer}>
        <CustomIcon size={20} style={[styles.infoIcon, color]} name="email" />
        <Text style={styles.infoText} >JavierDevLongerEmail@gmail.com</Text>
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity onPress={() => alert('Go to Javier\'s Facebook')}>
          <CustomIcon size={24} style={[styles.socialIcon, color, {opacity: hasMedia ? 1 : 0.5}]} name="facebook" />
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomIcon size={24} style={[styles.socialIcon, color, {opacity: noMedia ? 1 : 0.5}]} name="instagram" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Go to Javier\'s Linkedin')}>
          <CustomIcon size={24} style={[styles.socialIcon, color, {opacity: hasMedia ? 1 : 0.5}]} name="linkedin" />
        </TouchableOpacity>
        <TouchableOpacity>
          <CustomIcon size={24} style={[styles.socialIcon, color, {opacity: noMedia ? 1 : 0.5}]} name="twitter" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 22,
    height: "80%",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: 10,
    justifyContent: "flex-start",
    // borderColor: "black",
    // borderWidth: 1,
  },
  titleContainer: {
    marginBottom: 16,
    // borderColor: "blue",
    // borderWidth: 1,
  },
  title: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  infoContainer: {
    flexDirection: "row",
    // alignItems: "center",
    justifyContent: "flex-start",
    opacity: 0.3,
    marginBottom: 10,
    // marginEnd: "30%",
    // width: "100%%",
    // borderColor: "black",
    // borderWidth: 1,
  },
  infoIcon: {
    // justifyContent: "flex-start",
    alignItems: "center",
    paddingRight: 4,
    // width: 20,
  },
  infoText: {
    fontSize: 14,
    marginLeft: 2,
    marginRight: 16,
    paddingRight: 16,
    opacity: 0.7,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    paddingTop: 10,
    // borderColor: "orange",
    // borderWidth: 1,
  },
  socialIcon: {
    paddingRight: 8,
    marginRight: 4,
  }
})