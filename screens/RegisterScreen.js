import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import auth from "../firebaseConfig";
import Toast from "react-native-simple-toast";

function RegisterScreen() {
  const [value, setValue] = useState({
    email: "",
    password: "",
    name: "",
  });

  function onRegisterPressHandler() {
    if (value.email === "" || value.password === "" || value.name === "") {
      console.log("empty values");
      return;
    }

    createUserWithEmailAndPassword(auth, value.email, value.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: value.name,
        });
      })
      .catch((error) => {
        const errorMessage = error.message;
        Toast.show(errorMessage, Toast.LONG);
      });
  }
  return (
    <View style={styles.root}>
      <LinearGradient
        start={[0.8, 0.5]}
        colors={[Colors.primaryGrey, Colors.primaryRed]}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          style={{ alignItems: "stretch" }}
          behavior="position"
        >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        ></Image>
        
        <Title textStyle={styles.titleStyle}>Sign Up</Title>
        
          <Text style={styles.hint}>Name</Text>

          <TextInput
            style={styles.textField}
            autoCapitalize="Words"
            autoCorrect={false}
            placeholder="Enter your name"
            placeholderTextColor={Colors.accentGrey}
            value={value.name}
            onChangeText={(text) => setValue({ ...value, name: text })}
          ></TextInput>

          <Text style={styles.hint}>E-mail</Text>

          <TextInput
            style={styles.textField}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            placeholder="Enter your email"
            placeholderTextColor={Colors.accentGrey}
          ></TextInput>

          <Text style={styles.hint}>Password</Text>
          <TextInput
            style={styles.textField}
            autoCapitalize="none"
            autoCorrect={false}
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            placeholder="Enter your password"
            placeholderTextColor={Colors.accentGrey}
            secureTextEntry={true}
            textContentType="password"
          ></TextInput>
        </KeyboardAvoidingView>

        <PrimaryButton onPress={onRegisterPressHandler}>Sign Up</PrimaryButton>
      </LinearGradient>
    </View>
  );
}

export default RegisterScreen;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  textField: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.accentGrey,
    marginBottom: 30,
    fontSize: 26,
    paddingHorizontal: 10,
    color: "white",
  },
  image: {
    marginTop: "20%",
    width: 100,
    height: 100,
    marginBottom: "10%",
    alignSelf: "center"
  },
  titleStyle: {
    marginBottom: "20%",
    fontSize: 42,
  },
  hint: {
    paddingLeft: "12%",
    alignSelf: "flex-start",
    fontSize: 16,
    color: Colors.accentGrey,
  },
});
