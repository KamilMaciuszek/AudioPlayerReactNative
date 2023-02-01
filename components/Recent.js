import { View, StyleSheet, ScrollView, Text, FlatList } from "react-native";
import CategoryGridTile from "../components/CategoryGridTile";
import Title from "../components/Title";
import Colors from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";


function getRecent() {
  const navigation = useNavigation();

    const Row = ({ children }) => <View style={styles.row}>{children}</View>;
    function getColor() {
        const values = Object.values(Colors);
        values.shift();
        return values[Math.floor(Math.random() * values.length)];
      }

      function CategoryPressHandler() {
        navigation.navigate("Player");

      }

  return (
    <View>
      <Title children={"Recent"} textStyle={styles.textStyle}></Title>
      <View>
        <Row>
          <CategoryGridTile
            title={"Underground Hip Hop"}
            color={getColor()}
            onPress={CategoryPressHandler}
            style={styles.adaptiveTile}
            height={75}
          />
          <CategoryGridTile
            title={"Rock"}
            color={getColor()}
            onPress={CategoryPressHandler}
            height={75}
          />
        </Row>

        <Row>
          <View style={[{ maxHeight: 200 }, styles.adaptiveTile]}>
            <CategoryGridTile
              title={"Underground Hip Hop"}
              color={getColor()}
              onPress={CategoryPressHandler}
              textStyle={styles.rotate}
              height={"100%"}
            />
          </View>

          <View style={styles.biggerTile}>
            <CategoryGridTile
              title={"Underground Hip Hop"}
              color={getColor()}
              onPress={CategoryPressHandler}
              style={styles.adaptiveTile}
              height={75}
            />
            <CategoryGridTile
              title={"Pop"}
              color={getColor()}
              onPress={CategoryPressHandler}
              height={75}
            />
          </View>
        </Row>
      </View>
      <Title children={"Categories"} textStyle={styles.textStyle}></Title>
    </View>
  );
}

export default getRecent;

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontSize: 36,
        paddingVertical: 20,
        paddingLeft:15,
        textAlign: 'left'
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

})