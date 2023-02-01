import {
  Text,
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
} from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ControlButton from "../components/ControlButton";
import Colors from "../constants/Colors";
import { useState, useRef } from "react";
import { Pressable, Animated } from "react-native";

function PlayerScreen() {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [isPaused, setIsPaused] = useState(false);
  const togglePause = () => setIsPaused((previousState) => !previousState);
  let spinValue = useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const spin = () => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => spinValue.setValue(0));
  };

  const interpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function showImage() {
    spin();
    return isEnabled ? (
      <Animated.View
        style={[
          styles.details,
          {
            transform: [
              {
                rotateY: interpolate,
              },
              { perspective: 1000 },
            ],
          },
        ]}
      >
        <Title>Hello</Title>
      </Animated.View>
    ) : (
      <AnimatedImage
        style={[
          styles.image,
          {
            transform: [
              {
                rotateY: interpolate,
              },
              { perspective: 1000 },
            ],
          },
        ]}
        source={{
          uri: "https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg",
        }}
      />
    );
  }

  const grey = Colors.accentGrey;

  function PlayButton() {
    return isPaused ? (
      <ControlButton onPress={togglePause}>
        <Ionicons name="pause-outline" size={45} color={grey} />
      </ControlButton>
    ) : (
      <ControlButton onPress={togglePause}>
        <Ionicons name="play-outline" size={45} color={grey} />
      </ControlButton>
    );
  }

  return (
    <View style={styles.rootContainer}>
      <AnimatedPressable
        style={styles.container}
        onPress={() => {
          toggleSwitch();
        }}
      >
        {showImage}
      </AnimatedPressable>

      <Title>Placeholder for the name of the song</Title>
      <Subtitle>Placeholder for the artist name</Subtitle>
      <Slider></Slider>
      <View style={styles.timer}>
        <Subtitle textStyle={styles.timerTextStyle}>03:05</Subtitle>
        <Subtitle textStyle={styles.timerTextStyle}>04:15</Subtitle>
      </View>
      <View style={styles.row}>
        <ControlButton onPress={() => {}}>
          <Ionicons name="play-skip-back-outline" size={24} color={grey} />
        </ControlButton>
        <ControlButton onPress={() => {}}>
          <Ionicons name="play-back-outline" size={30} color={grey} />
        </ControlButton>
        <Pressable>{PlayButton}</Pressable>

        <ControlButton onPress={() => {}}>
          <Ionicons name="play-forward-outline" size={30} color={grey} />
        </ControlButton>
        <ControlButton onPress={() => {}}>
          <Ionicons name="play-skip-forward-outline" size={24} color={grey} />
        </ControlButton>
      </View>
    </View>
  );
}

export default PlayerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginBottom: 20,
  },
  image: {
    flex: 1,
    borderRadius: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  timer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 15,
  },
  timerTextStyle: {
    fontSize: 13,
  },
  container: {
    width: 250,
    height: "50%",
    marginRight: 10,
    borderRadius: 15,
    alignSelf: "center",
  },
  details: {
    flex: 1,
    backgroundColor: Colors.primaryGrey,
    borderRadius: 15,
    justifyContent: "center",
  },
});
