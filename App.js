import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "./constants/Colors";
import LoginScreen from "./screens/LoginScreen";
import PlayerScreen from "./screens/PlayerScreen";
import CategoryScreen from "./screens/CategoryScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <>
      <StatusBar style="light" />

      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerStyle: {backgroundColor: Colors.primaryBlack},
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: Colors.primaryBlack
          }
        }}>
          <Stack.Screen
          name = "Category"
          component={CategoryScreen}
          options={{title: "Hello, user"}}
          />
          <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{title: "Login" }}          
          />
          <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{title: "Register"}}
          />
          <Stack.Screen
          name =  "Player"
          component={PlayerScreen}
          options={{title: "Player"}}
          //title: Category Name
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    backgroundColor: Colors.primaryBlack
  }
})