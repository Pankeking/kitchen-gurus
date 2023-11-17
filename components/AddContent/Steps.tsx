import { FlatList, StyleSheet } from "react-native"
import { Text, View } from "../themedCustom";

export default function Steps(props: {
  title: string;
  steps: string[];
}) {
  const { steps, title } = props;

  const RenderStep = ({ item, index } : any) => {
    return (
      <View style={styles.step}>
        <Text style={styles.stepText}> {index + 1}. {item}</Text>
      </View>
    )
  }

  
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <FlatList 
        data={steps}
        renderItem={({ item, index }) => <RenderStep index={index} item={item} />}
      />
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    justifyContent: "space-around",
    alignItems: "flex-start",
    height: "20%",
    // opacity: 0.5,
    backgroundColor: "transparent",
    marginVertical: 5,
  },
  title: {
    backgroundColor: "#ffffffc0",
    padding: 7,
    borderRadius: 7,
    marginBottom: 5,
  },
  titleText: {
    fontSize: 32,
    color: "black",
  },
  step: {
    backgroundColor: "#ffffffc0",
    marginTop: 5,
    padding: 7,
    borderRadius: 7,
  },
  stepText: {
    fontSize: 16,
  },
})