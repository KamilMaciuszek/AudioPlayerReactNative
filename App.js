import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RootNavigation from "./navigation/RootNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <RootNavigation></RootNavigation>
    </>
  );
}
