import { Pressable, View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/Colors";

function CategoryGridTile({ title, color, onPress, style, textStyle, height }) {



  return (
    <View style={[styles.gridItem, style, { height: height }]}>
      <Pressable
        android_ripple={{ color: color }}
        style={[
          ({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ],
          styles.innerContainer,
          { backgroundColor: color },
        ]}
        onPress={onPress}
      >
        <View style={[textStyle]}>
          <Text
            style={[
              styles.title,
              {
                color:
                  color === "white" || color == Colors.accentGrey
                    ? Colors.primaryBlack
                    : "white",
              },
            ]}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    margin: 4,
    borderRadius: 20,
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
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingHorizontal: 20,
    textAlign: "center",
  },
});
