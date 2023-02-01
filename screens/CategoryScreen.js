import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Image,
  Pressable,
} from "react-native";
import Colors from "../constants/Colors";
import getRecent from "../components/Recent";
import { useNavigation } from "@react-navigation/native";

function CategoryScreen() {
  const navigation = useNavigation();
  const data = [
    {
      id: "1",
      text: "lorem ipsum",
      height: 100,
    },
    {
      id: "2",
      text: "lorem ipsum dorem lorem ipsum lorem ipsum",
      height: 200,
    },
    {
      id: "3",
      text: "lorem ipsum lorem ipsum",
      height: 200,
    },
    {
      id: "4",
      text: "lorem ipsum",
      height: 100,
    },
    {
      id: "5",
      text: "lorem ipsum dorem lorem ipsum lorem ipsum",
      height: 200,
    },
    {
      id: "6",
      text: "lorem ipsum lorem ipsum",
      height: 200,
    },
    {
      id: "7",
      text: "lorem ipsum",
      height: 100,
    },
    {
      id: "8",
      text: "lorem ipsum dorem lorem ipsum lorem ipsum",
      height: 200,
    },
    {
      id: "9",
      text: "lorem ipsum lorem ipsum",
      height: 200,
    },
  ];

  function getColor() {
    const values = Object.values(Colors);
    values.shift();
    return values[Math.floor(Math.random() * values.length)];
  }

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Player");
    }
    return (
      <Pressable
        android_ripple={{ color: Colors.primaryBlack }}
        style={[
          ({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ],
          styles.innerContainer,
          { backgroundColor: Colors.primaryGrey },
        ]}
        onPress={pressHandler}
      >
        <Image
          style={styles.image}
          source={{
            uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
          }}
        />
        <Text style={styles.textStyle}>Underground Hip Hop </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(data) => data.id}
        renderItem={renderCategoryItem}
        numColumns={1}
        ListHeaderComponent={getRecent()}
      ></FlatList>
    </View>
  );
}

export default CategoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: 120,
    height: 120,
    marginRight: 10,
  },
  innerContainer: {
    flexDirection: "row",
    height: 120,
    paddingRight: 15,
    flex: 1,
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 10,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.7,
  },
  textStyle: {
    alignSelf: "center",
    marginBottom: 10,
    color: "white",
    flexShrink: 1,
    fontSize: 25,
    textAlign: "center",
  },
});
