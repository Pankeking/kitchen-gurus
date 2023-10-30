import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "../themedCustom";
import { FBauth, FBstore } from "../../firebase-config";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUserId } from "../../redux/slices/authSlice";


const MAX_BIO_LENGTH = 105;
const bioTextSample = "Aspiring tech enthusiast with a passion for all things digital. " +
  "Constantly seeking knowledge and pushing boundaries in the world of technology. " +
  "From coding to design, I love exploring the endless possibilities. " +
  "Coffee addict, problem solver, and believer in the transformative power of technology. " +
  "Let's create something amazing together! 🚀✨"

export default function ProfileCard() {
  
  const [bioText, setBioText] = useState()
  const [expanded, setExpanded] = useState(false);
  const userId = useSelector(selectUserId);

  const handleReadMore = () => {
    setExpanded(!expanded);
  }
  const truncatedBioText = `${bioTextSample.substring(0, MAX_BIO_LENGTH)}...`;

  const handleBioUpdate = async () => {
    if (userId) {

      const userDocRef = doc(FBstore, "users", userId)
      await updateDoc(userDocRef, {
        bio: bioText
      })
    } else {
      console.error("alarm")
    }
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title} >{FBauth.currentUser?.displayName}</Text>
      </View>

      {expanded &&
      <ScrollView 
        style={styles.bioScrollContainer}
        contentContainerStyle={[styles.bioContainer, {height: "160%"}]}
      >
          <Text style={styles.bioText}>
          {bioTextSample}
          </Text>
          <TouchableOpacity onPress={handleReadMore}>
            <Text style={styles.readMoreText}>Less</Text>
          </TouchableOpacity>
      </ScrollView>
          
      }
      {(!expanded || bioTextSample.length <= MAX_BIO_LENGTH) &&
        <View style={styles.bioContainer}>
          <Text style={styles.bioText}>{truncatedBioText}</Text>
          <TouchableOpacity onPress={handleReadMore}>
            <Text style={styles.readMoreText}>Read More</Text>
          </TouchableOpacity>
        </View>
      }
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "transparent",
  },
  titleContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    marginTop: -10,
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    fontFamily: "Arial",
  },
  bioScrollContainer: {
    // borderColor: "green", borderWidth: 2,
  },
  bioContainer: {
    height: "160%",
    paddingHorizontal: "15%",
    alignItems: "center",
    // borderColor: "green", borderWidth: 2,
  },
  bioText: {
    lineHeight: 20,
    // borderColor: "green", borderWidth: 2,
  },
  readMoreText: {
    color: "blue",
  }
})