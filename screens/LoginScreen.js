import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  Pressable,
} from "react-native";
import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Colors from "../constants/Colors";

function LoginScreen() {
  const navigation = useNavigation();
  function pressHandler() {
    navigation.navigate("Register");
  }

  function onLoginPressHandler() {
    navigation.navigate("Category");
  }
  return (
    <View style={styles.root}>
      <LinearGradient
        start={[0.8, 0.3]}
        colors={[Colors.primaryGrey, Colors.primaryRed]}
        style={styles.gradient}
      >
        <Image
          source={require("../assets/icon.png")}
          style={styles.image}
        ></Image>

        <Title textStyle={styles.titleStyle}>Sign In</Title>

        <Text style={styles.hint}>E-mail</Text>

        <TextInput
          style={styles.textField}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your email"
          placeholderTextColor={Colors.accentGrey}
        ></TextInput>

        <Text style={styles.hint}>Password</Text>

        <TextInput
          style={styles.textField}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Enter your password"
          placeholderTextColor={Colors.accentGrey}
          secureTextEntry={true}
          textContentType="password"
        ></TextInput>
        <PrimaryButton onPress={onLoginPressHandler}>Login</PrimaryButton>

        <Text
          style={[styles.hint, { color: Colors.accentGrey, marginTop: "12%" }]}
        >
          Don't have an account?
        </Text>
        <Pressable style={{ alignSelf: "flex-start" }} onPress={pressHandler}>
          {({ pressed }) => (
            <Text
              style={[
                styles.hint,
                { color: pressed ? "white" : Colors.accentGrey },
              ]}
            >
              Sign up! {">"}
            </Text>
          )}
        </Pressable>
      </LinearGradient>
    </View>
  );
}

export default LoginScreen;

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
    width: "80%",
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
