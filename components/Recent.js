import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Subtitle from "./Subtitle";

function getRecent() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const readRecent = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recent");
      if (jsonValue != null) {
        const recentData = JSON.parse(jsonValue).reverse();
        setData(recentData);
      }
    } catch (e) {
      console.log("error while reading recent" + e);
    }
  };

  useEffect(() => {
    readRecent();
  }, [isFocused]);

  const Row = ({ children }) => <View style={styles.row}>{children}</View>;

  const getColor = () => {
    const values = Object.values(Colors);
    values.shift();
    return values[Math.floor(Math.random() * values.length)];
  };

  function CategoryPressHandler(data) {
    navigation.navigate("Player", { id: data.id, name: data.name });
  }

  return data ? (
    <View>
      <Title children={"Recent"} textStyle={styles.textStyle}></Title>
      {isFocused ? (
        <View>
          <Row>
            {data[0] ? (
              <CategoryGridTile
                title={data[0].name}
                color={getColor()}
                onPress={() => CategoryPressHandler(data[0])}
                style={styles.adaptiveTile}
                height={75}
              />
            ) : (
              <></>
            )}
            {data[1] ? (
              <CategoryGridTile
                title={data[1].name}
                color={getColor()}
                onPress={() => CategoryPressHandler(data[1])}
                height={75}
              />
            ) : (
              <></>
            )}
          </Row>

          <Row>
            {data[4] ? (
              <View style={[{ maxHeight: 200 }, styles.adaptiveTile]}>
                <CategoryGridTile
                  title={data[4].name}
                  color={getColor()}
                  onPress={() => CategoryPressHandler(data[4])}
                  textStyle={styles.rotate}
                  height={"100%"}
                />
              </View>
            ) : (
              <></>
            )}

            <View style={styles.biggerTile}>
              {data[2] ? (
                <CategoryGridTile
                  title={data[2].name}
                  color={getColor()}
                  onPress={() => CategoryPressHandler(data[2])}
                  style={styles.adaptiveTile}
                  height={75}
                />
              ) : (
                <></>
              )}
              {data[3] ? (
                <CategoryGridTile
                  title={data[3].name}
                  color={getColor()}
                  onPress={() => CategoryPressHandler(data[3])}
                  height={75}
                />
              ) : (
                <></>
              )}
            </View>
          </Row>
        </View>
      ) : (
        <></>
      )}

      <Title children={"Categories"} textStyle={styles.textStyle}></Title>
    </View>
  ) : (
    <></>
  );
}

export default getRecent;

const styles = StyleSheet.create({
  textStyle: {
    color: "white",
    fontSize: 36,
    paddingVertical: 20,
    paddingLeft: 15,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
  },
  adaptiveTile: {
    flex: 1,
  },
  biggerTile: {
    flex: 3,
  },
  rotate: {
    transform: [{ rotate: "270deg" }],
    height: 100,
    width: 200,
    borderRadius: 5,
    marginVertical: 40,
    alignItems: "center",
    justifyContent: "center",
  },
});
