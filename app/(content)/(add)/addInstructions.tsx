import { View } from "../../../components/themedCustom";
import { FlatList, ImageBackground, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Steps from "../../../components/AddContent/Steps";
import { useEffect, useRef, useState } from "react";
import WideButton from "../../../components/WideButton";
import SmallButton from "../../../components/SmallButton";
import { Input } from "@rneui/themed";
import { Text } from "@rneui/base";
import { useDispatch } from "react-redux";
import { setInstructions } from "../../../redux/slices/contentSlice";
import { router } from "expo-router";

export default function addInstructionsScreen() {

  const dispatch = useDispatch();

  type InstructionType = {
    subtitle: string;
    steps: string[];
  }[]

  const nullInstruction = [{subtitle: '', steps: ['']}]

  const storeInstructions = useSelector((state:any) => state.content.recipe.instructions)
  const isInstructions = useSelector((state:any) => state.content.isInstructions)

  const [StepInstructions, setStepInstructions] = useState<InstructionType>(() => {
    if (isInstructions) {
      return storeInstructions
    } else {
      return nullInstruction
    }
  });

  const [EditingTitle, setEditingTitle] = useState(false);
  const [EditingSteps, setEditingSteps] = useState(false);

  const titleInputRef:any = useRef(null);
  const [Title, setTitle] = useState('');

  const stepInputRef:any = useRef(null);
  const [Step, setStep] = useState('');

  const [StepsArray, setStepsArray] = useState(['']);

  const isPhoto = useSelector((state:any) => state.content.isPhoto)
  const mainPhoto = useSelector((state:any) => state.content.recipe.photo[0])


  const handleEditTitle = () => {
    setEditingTitle(true)
    titleInputRef.current.focus()
  }

  const handleConfirmTitle = () => {
    if (Title != '') {
      setEditingTitle(false);
      setEditingSteps(true);
    } else {
      titleInputRef.current.focus();
      titleInputRef.current.shake();
    }
  }
  
  const handleAddStep = () => {
    if (Step !== '') {
      if (StepsArray[0] === '') {
        setStepsArray(current => [Step]);
        stepInputRef.current.focus();
      } else {
        setStepsArray(current => [...current, Step]);
        stepInputRef.current.focus();
      }
    }
    stepInputRef.current.focus();
    setStep('');
  }

  const handleConfirmInstruction = () => {
    if (Title != '' && StepsArray[0] != '') {
      const newInstruction = {
        subtitle: Title,
        steps: StepsArray
      }
      setStepInstructions(current => [...current, newInstruction])
      setTitle('')
      setStep('')
      setStepsArray([''])
      setEditingSteps(false)
      setEditingTitle(false)
    } else if (Title == '') {
      titleInputRef.current.shake()
      titleInputRef.current.focus()
    } else if (StepsArray[0] == '') {
      stepInputRef.current.shake()
      stepInputRef.current.focus()
    }
  }

  const handleSubmitInstructions = () => {
    if (Title != '') {
      alert('First confirm instruction')
      console.log("error catched")
    } else if (StepInstructions[0] != nullInstruction[0]) {
      dispatch(setInstructions(StepInstructions))
      setStepInstructions([{
        subtitle: '',
        steps: ['']
      }])
      router.replace('/(content)/(add)/')
    } else {}
  }

  useEffect(() => {
    titleInputRef.current.clear()
  },[StepInstructions])

  useEffect(() => {
    stepInputRef.current.clear();
    stepInputRef.current.focus();
  }, [StepsArray])

  useEffect(() => {
    if (EditingTitle) {
      titleInputRef.current.focus();
    }
    if (EditingSteps) {
      stepInputRef.current.focus();
    }
  },[EditingTitle, EditingSteps])


  return (
    <View style={styles.container}>
        <ImageBackground 
          source={isPhoto ? mainPhoto : null} 
          resizeMode="cover"
          style={styles.ImageBackground}
        >
          <View style={styles.topButtons}>
            {!EditingSteps ? (
              <View style={styles.topButtonsMask}> 
                <SmallButton 
                  title={"New Title"}
                  size={32}
                  iconName="plus"
                  onPress={handleEditTitle}
                />
              </View>
                ) : (
                  <View style={styles.topButtonsMask}> 
                    <SmallButton 
                      title={"New Step"}
                      size={32}
                      iconName="plus"
                      onPress={handleAddStep}
                    />
                  </View>
              )
            }
            <View style={styles.topButtonsMask}>
              <SmallButton 
                title={"Confirm"}
                size={32}
                iconName="check"
                onPress={handleConfirmInstruction}
              />
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Input 
              ref={titleInputRef}
              placeholder="Prepare kitchen"
              spellCheck={false}
              keyboardType="ascii-capable"
              enterKeyHint="enter"
              returnKeyType="done"
              onChangeText={setTitle}
              onSubmitEditing={handleConfirmTitle}
              inputStyle={styles.titleInput}
              disabledInputStyle={styles.titleInput}
              inputContainerStyle={{borderBottomWidth: 0}}
            />
            <Input 
              ref={stepInputRef}
              placeholder="Place the ingredients on the table..."
              spellCheck={false}
              keyboardType="ascii-capable"
              enterKeyHint="enter"
              returnKeyType="done"
              onChangeText={setStep}
              onSubmitEditing={handleAddStep}
              disabled={!EditingSteps}
              inputStyle={styles.stepInput}
              disabledInputStyle={styles.stepInput}
              inputContainerStyle={{borderBottomWidth: 0}}
            />
            <View style={styles.stepsContainer}>
              <FlatList 
                data={StepsArray}
                renderItem={({ item, index }) => (
                    <View style={styles.stepsArray}>
                      <Text style={styles.stepText}>
                        {index + 1}. {item}
                      </Text>
                    </View>
                  )
                }
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
          <View style={styles.steps}>
            <Steps 
              instructions={StepInstructions.slice(1)}
            />
          </View>
          <View style={styles.bottomButton}>
            <WideButton 
              title="Save & Continue"
              iconName="check-circle"
              onPress={handleSubmitInstructions}
            />
          </View>
        </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  null: {},
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  ImageBackground: {
    flex: 1,
    justifyContent: "center",
    opacity: 1,
  },
  steps: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "transparent",
    marginVertical: "10%",
    paddingTop: "10%",
  },
  topButtonsMask: {
    backgroundColor: "#ffffffc0",
    borderRadius: 7,
    padding: 3,
  },
  topButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "transparent",
    paddingTop: "10%",
  },
  inputContainer: {
    paddingHorizontal: "2.5%",
    paddingTop: "5%",
    height: "30%", 
    backgroundColor: "transparent"
  },
  titleInput: {
    opacity: 1,
    fontSize: 32, 
    fontFamily: "PlaypenSemiBold",
    backgroundColor: "#ffffffc0",
    padding: 7,
    borderRadius: 7,
  },
  stepInput: {
    opacity: 1,
    color: "black",
    fontSize: 16, 
    fontFamily: "PlaypenSemiBold",
    backgroundColor: "#ffffffc0",
    padding: 7,
    borderRadius: 7,
  },
  stepsContainer: {
    paddingHorizontal: "2.5%",
    maxHeight: "50%",
    backgroundColor: "#ffffff00",
  },
  stepsArray: {
    // marginVertical: "1%",
    textAlign: "left",
    color: "black",
    backgroundColor: "#ffffffc0",
    marginTop: 7,
    padding: 7,
    borderRadius: 7,
  },
  stepText: {
    fontSize: 16, 
    fontFamily: "PlaypenSemiBold",
  },
  bottomButton: {
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "20%",
  },
})