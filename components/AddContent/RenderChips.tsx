import { StyleSheet, TouchableOpacity } from "react-native";
import { CustomIcon, Text, View } from "../themedCustom";
import { useTheme } from "@rneui/themed";

export default function RenderChips(props: {
  label: string;
  selected: boolean;
  color?: string;
  onPress: () => void;
}) {
  const ICON_SIZE = 22;
  const themeColors = useTheme().theme.colors;
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.chip,{backgroundColor: props.selected ? themeColors.secondary : themeColors.surface, shadowColor: themeColors.lightText}]}
        onPress={props.onPress}
      >
        <CustomIcon 
          style={styles.chipIcon}
          name={props.selected ? "leaf" : "circle-off-outline"} 
          color={props.selected ? "green" : "red"}
          size={ICON_SIZE}
        />
        <Text style={[styles.chipText, {color: props.selected ? themeColors.surface : themeColors.secondary}]}>{props.label}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    width: "45%",
    marginVertical: 10,
    paddingHorizontal: 0,
  },
  chip: { 
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 14,
    shadowOffset: {width: 2, height: 3},
    shadowRadius: 5,
    shadowOpacity: 0.4,
  },
  chipIcon: {
    marginHorizontal: 8
  },
  chipText: {
    fontSize: 16,
  },
})