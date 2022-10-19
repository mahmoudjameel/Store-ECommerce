import {
  Linking,
  ImageBackground,
  Alert,
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { firebase } from "../config";
import * as Animatable from "react-native-animatable";
import { BackHandler } from "react-native";

export default function AboutUs({ navigation }) {
  const firestore = firebase.firestore;
  const auth = firebase.auth;
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase
      .firestore()
      .collection("users")
      .doc(auth().currentUser.uid)
      .get()
      .then((user) => {
        setUser(user.data());
      });
  }, []);
  const [mesg, setMesg] = useState("");
  const add = async () => {
    const dataRef = firebase.firestore().collection("feedback");
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
    const data = {
      userfeedback: mesg,
      createdAt: timestamp,
      username: user?.username,
    };
    dataRef
      .add(data)
      .then(() => {
        setMesg("");
      })
      .then(() => {
        Alert.alert("Thank You for your feedback!");
      })
      .catch((error) => {
        alert(error);
      });
  };
  const makeCall = () => {
    let phoneNumber = "";

    if (Platform.OS === "android") {
      phoneNumber = "tel:${+95-9761432944}";
    } else {
      phoneNumber = "telprompt:${+95-9761432944}";
    }

    Linking.openURL(phoneNumber);
  };
  useEffect(() => {
    navigation.addListener("focus", () => {
      function handleBackButtonClick() {
        navigation.goBack();
        return true;
      }

      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener(
          "hardwareBackPress",
          handleBackButtonClick
        );
      };
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ marginBottom: 30 }}>
          <Animatable.View animation="fadeInRightBig" duration={4000}>
            <View style={{ flexDirection: "row", padding: 10 }}>
              <View style={{ width: "66%", alignItems: "center" }}>
                <Text style={styles.text}>
                  Store is the shopping application of e-commerce for Men &
                  Women's items of clothing, Shoes and Accessories. It manages
                  online order fulfilment by providing customers with a
                  convenient, fast, and secure shopping experience.
                </Text>
              </View>

              <View>
                <Image
                  style={styles.tinyLogo}
                  source={require("../assets/logo.png")}
                />
              </View>
            </View>
          </Animatable.View>
          <Animatable.View animation="fadeInLeftBig" duration={4000}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: "#f7d081",
                  padding: 5,
                }}
              >
                Our Goal
              </Text>
              <View style={{ flexDirection: "row" }}>
                <Image
                  style={styles.tinyLogo}
                  source={require("../assets/map.png")}
                />
                <View style={styles.mission}>
                  <Text style={styles.textGold}>
                    Our primary goal is to reach the highest number of customers
                    at the right time to increase sales and profitability of the
                    business. We move forward to catch the mindset of the future
                    generation by taking one step ahead of the norm and being
                    the first to establish a new trend.
                  </Text>
                </View>
              </View>
            </View>
          </Animatable.View>

          <Animatable.View animation="fadeInRightBig" duration={4000}>
            <View style={styles.vision}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "800",
                  color: "#f7d081",
                  padding: 5,
                }}
              >
                Our Vision
              </Text>
              <Text style={styles.textGold}>
                Our vision is to improve the standard of living of all customers
                and clients and provide them with a great buying experience with
                our brand Products that have been at the core of our business.
              </Text>
            </View>
          </Animatable.View>
          <Animatable.View animation="pulse" iterationCount="infinite">
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                color: "#f7d081",
                padding: 10,
                textAlign: "center",
              }}
            >
              We Belong To Something Smart & Chic.
            </Text>
          </Animatable.View>

          <Animatable.View animation="fadeInRightBig" duration={4000}>
            <View style={{ padding: 10, flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="phone"
                size={30}
                color={"#f7d081"}
              />
              <TouchableOpacity onPress={makeCall}>
                <Text
                  style={{
                    color: "#f7d081",
                    padding: 7,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  +95-9761432944
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ padding: 10, flexDirection: "row" }}>
              <MaterialCommunityIcons
                name="email"
                size={30}
                color={"#f7d081"}
              />
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "mailto:Store@brandmail.com?subject=SendMail&body=Description"
                  )
                }
              >
                <Text
                  style={{
                    color: "#f7d081",
                    padding: 7,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  Store@brandmail.com
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 10, flexDirection: "row" }}>
              <MaterialCommunityIcons name="home" size={30} color={"#f7d081"} />

              <Text
                style={{
                  color: "#f7d081",
                  padding: 7,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                No.1409,Myintawthar Road,Tharkayta
              </Text>
            </View>
            <View style={{ flexDirection: "row", paddingLeft: 20 }}>
              <TextInput
                style={styles.inputAddress}
                placeholder="FeelFree To Give Your Feedback "
                onChangeText={(text) => setMesg(text)}
                value={mesg}
                multiline={true}
                numberOfLines={4}
              />
              <View>
                <TouchableOpacity onPress={add} style={styles.btn}>
                  <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                    Send
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Animatable.View>
          <Animatable.View animation="bounceIn" duration={4000}>
            <View>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  padding: 10,
                  color: "#f7d081",
                  letterSpacing: 1,
                }}
              >
                Developed By
              </Text>
              <Text style={styles.devName}>Wunna</Text>
              <Text style={styles.devName}>Theint Yadanar Lwin</Text>
              <Text style={styles.devName}>Thiri Sein</Text>
              <Text style={styles.devName}>Hay Man Oo</Text>
            </View>
            <View style={{ backgroundColor: "#f7d081", marginTop: 20 }}>
              <Text style={styles.devName1}>
                Copyright &#169; Store Co.,ltd.All Right reserved 2022.
              </Text>
            </View>
          </Animatable.View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "black",
  },
  devName: {
    fontSize: 14,
    fontWeight: "600",
    padding: 5,
    color: "#f7d081",
    letterSpacing: 1,
    paddingLeft: 10,
  },
  devName1: {
    fontSize: 12,
    fontWeight: "600",
    padding: 5,
    color: "#000",
    letterSpacing: 1,
    textAlign: "center",
  },
  aboutText: {
    fontSize: 30,
    fontWeight: "bold",
    //padding: 10,
    color: "#f7d081",
    letterSpacing: 1,
  },
  tinyLogo: {
    width: 110,
    height: 110,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: "#fff",
    marginTop: 20,
    marginRight: -4,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    color: "white",
  },
  textGold: {
    fontSize: 14,
    fontWeight: "500",
    lineHeight: 16,
    letterSpacing: 1,
    padding: 8,
    color: "white",
  },
  mission: {
    paddingTop: 5,
    width: "66%",
    marginBottom: 10,
    marginTop: 5,
  },
  vision: {
    paddingTop: 5,
    marginBottom: 10,
    borderBottomColor: "gold",
  },
  contact: {
    justifyContent: "center",
    alignItems: "center",
  },
  inputAddress: {
    width: "70%",
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f7d081",
  },
  btn: {
    marginLeft: 20,
    backgroundColor: "#f7d081",
    borderWidth: 1,
    borderRadius: 10,
    height: 40,
    justifyContent: "center",
    width: 50,
  },
});
