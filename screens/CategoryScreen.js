import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Pressable,
  ActivityIndicator,
  Image
} from "react-native";
import Colors from "../constants/Colors";
import getRecent from "../components/Recent";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import Genres from "../constants/GenreIds";

function CategoryScreen() {
  const navigation = useNavigation();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  function getColor() {
    const values = Object.values(Colors);
    values.shift();
    return values[Math.floor(Math.random() * values.length)];
  }

  const getCategory = async () => {
    try {
      let listOfGenres = [];
      for (const element of Genres) {
        const url = "https://api.deezer.com/genre/" + element;
        const response = await fetch(url);
        await response.json().then((res) => {
          const obj = {
            name: res.name,
            image: res.picture_big,
          };
          listOfGenres.push(obj);
          setData(listOfGenres);
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  function renderCategoryItem(itemData) {
    function pressHandler() {
      navigation.navigate("Player", {id: itemData.index});
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
          {
            backgroundColor: Colors.primaryGrey,
          },
        ]}
        onPress={pressHandler}
      >
        <Image style = {styles.image} source={{uri: itemData.item.image}}>

        </Image>
        <Text
          style={[
            styles.textStyle,
            {
              color: "white",
            },
          ]}
        >
          {itemData.item.name}
        </Text>
      </Pressable>
    );
  }

  return (
    <View style={styles.container}>
      {data ? (
        <FlatList
        data={data}
        // extraData={this.state.first}
        keyExtractor={(data, index) => index.toString() }
        renderItem={renderCategoryItem}
        initialNumToRender={3}
        numColumns={1}
        ListHeaderComponent={getRecent()}
      ></FlatList>
      ) : (
        <ActivityIndicator></ActivityIndicator>

      )}
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
    
    marginRight: 10,
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    height: 80,
    flex: 1,
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
    color: "white",
    flexShrink: 1,
    fontSize: 25,
    textAlign: "center",
    flex: 2,
  },
});
