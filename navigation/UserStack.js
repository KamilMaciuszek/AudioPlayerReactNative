import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import PlayerScreen from "../screens/PlayerScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ControlButton from "../components/ControlButton";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Colors from "../constants/Colors";
import { useAuthentication } from "../utils/hooks/UseAuthentication";
import { Ionicons } from "@expo/vector-icons";
import { signOut } from "@firebase/auth";
import auth from "../firebaseConfig";

const Stack = createNativeStackNavigator();

function UserStack() {
  const { user } = useAuthentication();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primaryBlack },
          headerTintColor: "white",
          contentStyle: {
            backgroundColor: Colors.primaryBlack,
          },
        }}
      >
        <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{
            title: "Hello " + (user?.displayName ? user.displayName : ""),
            headerRight: () => (
              <ControlButton
                onPress={() => {
                  signOut(auth);
                }}
              >
                <Ionicons
                  name="log-out-outline"
                  size={40}
                  color={Colors.accentGrey}
                ></Ionicons>
              </ControlButton>
            ),
          }}
        />
        <Stack.Screen
          name="Player"
          component={PlayerScreen}
          options={{ title: "Player" }}
          //title: Category Name
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default UserStack;
