import { FlatList, StyleSheet } from "react-native"
import { Text, View } from "../themedCustom";

export default function Steps(props: {
  instructions: {
    subtitle:string;
    steps: string[];
  }[]
}) {
  const { instructions } = props;

  const RenderInstruction = ({ item } : any) => {
    const { subtitle, steps } = item;
    return (
      <>
        <View style={styles.title}>
          <Text style={styles.titleText}>{subtitle}</Text>
        </View>
        {
          steps.map((element:string, index:number) => (
            <View style={styles.step} key={index}>
              <Text style={styles.stepText}>
                {index + 1}. {element}
              </Text>
            </View>
            )
          )
        }
      </>
    )
  }

  
  return (
    <View style={styles.container}>
      <FlatList 
        data={instructions}
        renderItem={({ item }) => (
            <RenderInstruction item={item} />
          )
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "90%",
    backgroundColor: "transparent",
  },
  title: {
    backgroundColor: "#ffffffc0",
    padding: 7,
    borderRadius: 7,
    marginTop: 50,
    marginBottom: 7,
  },
  titleText: {
    fontSize: 32,
    fontFamily: "PlaypenSemiBold",
    color: "black",
  },
  step: {
    backgroundColor: "#ffffffc0",
    marginTop: 7,
    padding: 7,
    borderRadius: 7,
  },
  stepText: {
    fontSize: 16, 
    fontFamily: "PlaypenSemiBold",
  },
})