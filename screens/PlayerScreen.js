import { StyleSheet, Image, View } from "react-native";
import Subtitle from "../components/Subtitle";
import Title from "../components/Title";
import Slider from "@react-native-community/slider";
import { Ionicons } from "@expo/vector-icons";
import ControlButton from "../components/ControlButton";
import Colors from "../constants/Colors";
import { useState, useRef, useEffect, useMemo } from "react";
import { Pressable, Animated } from "react-native";
import { Audio } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PlayerScreen({ route }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);
  const [position, setPosition] = useState(0);
  const [songArray, setSongArray] = useState([]);
  const [sound, setSound] = useState(new Audio.Sound());
  const [isPaused, setIsPaused] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const togglePause = () => {
    setIsPaused((previousState) => !previousState);
    isPaused ? pauseSong() : playSong();
  };
  let spinValue = useRef(new Animated.Value(0)).current;
  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
  const AnimatedImage = Animated.createAnimatedComponent(Image);

  const fetchSongs = async () => {
    const url =
      "https://api.deezer.com/chart/" + route.params.id + "/tracks&limit=50";
    const response = await fetch(url);
    await response.json().then((res) => {
      const obj = res.data;
      setSongArray(obj);
      sound.getStatusAsync().then(function (result) {
        if (result.isLoaded === false) {
          sound.loadAsync({
            uri: obj[currentSongIndex].preview,
          });
          setIsLoaded(true);
        }
      });
    });
  };

  const saveRecent = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("recent", jsonValue);
    } catch (e) {
      console.log("error while storing data" + e);
    }
  };

  const readRecent = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("recent");
      if (jsonValue != null) {
        const recentData = JSON.parse(jsonValue);
        recentData.push({ name: route.params.name, id: route.params.id });
        if (recentData.length > 5) {
          recentData.shift();
        }
        saveRecent(recentData);
      } else {
        const recentData = [];
        recentData.push({ name: route.params.name, id: route.params.id });      
        saveRecent(recentData);
      }
    } catch (e) {
      console.log("error while reading recent" + e);
    }
  };

  useEffect(() => {
    readRecent();
  }, []);

  useEffect(() => {
    fetchSongs();

    const interval = setInterval(() => {
      sound.getStatusAsync().then((sound) => {
        setPosition(sound.positionMillis);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (Math.round(position / 100) >= 300) {
      setCurrentSongIndex(currentSongIndex + 1);
    }
  }, [position]);

  async function playSong() {
    await sound.playAsync();
  }

  async function pauseSong() {
    await sound.pauseAsync();
  }

  async function back() {
    sound.getStatusAsync().then(function (result) {
      sound.setPositionAsync(result.positionMillis - 5000);
    });
  }

  async function forward() {
    sound.getStatusAsync().then(function (result) {
      sound.setPositionAsync(result.positionMillis + 5000);
    });
  }

  async function setPositionAsync(value) {
    await sound.setPositionAsync(Math.round(value));
  }

  const spin = useMemo(() => {
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => spinValue.setValue(0));
  }, [isEnabled]);

  const interpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  function showImage() {
    spin;
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
        <Title>Next Song:</Title>
        <Title>{songArray[currentSongIndex + 1]?.title}</Title>
        <Subtitle>{songArray[currentSongIndex + 1]?.artist.name}</Subtitle>
        <Image
          source={{ uri: songArray[currentSongIndex + 1]?.album.cover_big }}
          style={{ width: "50%", height: "30%", alignSelf: "center" }}
        ></Image>
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
          uri: songArray[currentSongIndex]?.album.cover_big,
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

  const updateSong = async () => {
    if (songArray !== []) {
      await sound.unloadAsync();

      if (isLoaded) {
        await sound.loadAsync({
          uri: songArray[currentSongIndex].preview,
        });
        await sound.playAsync();
      }
    }
  };

  useEffect(() => {
    updateSong();
  }, [currentSongIndex]);

  async function PlayNextSong() {
    if (currentSongIndex < songArray.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else if (currentSongIndex === songArray.length - 1) {
      setCurrentSongIndex(0);
    }
  }

  async function PlayPreviousSong() {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else if (currentSongIndex === 0) {
      setCurrentSongIndex(songArray.length - 1);
    }
  }

  return songArray !== [] ? (
    <View style={styles.rootContainer}>
      <AnimatedPressable
        style={styles.container}
        onPress={() => {
          toggleSwitch();
        }}
      >
        {showImage}
      </AnimatedPressable>

      <Title>{songArray[currentSongIndex]?.title || ""}</Title>
      <Subtitle>{songArray[currentSongIndex]?.artist.name || ""}</Subtitle>
      <Slider
        value={position ? position : 0}
        maximumValue={30000}
        onSlidingComplete={(value) => setPositionAsync(value)}
      ></Slider>
      <View style={styles.timer}>
        <Subtitle textStyle={styles.timerTextStyle}>
          00:{Math.round(position / 1000)}
        </Subtitle>
        <Subtitle textStyle={styles.timerTextStyle}>00:30</Subtitle>
      </View>
      <View style={styles.row}>
        <ControlButton
          onPress={() => {
            PlayPreviousSong();
          }}
        >
          <Ionicons name="play-skip-back-outline" size={24} color={grey} />
        </ControlButton>
        <ControlButton
          onPress={() => {
            back();
          }}
        >
          <Ionicons name="play-back-outline" size={30} color={grey} />
        </ControlButton>
        <Pressable>{PlayButton}</Pressable>

        <ControlButton
          onPress={() => {
            forward();
          }}
        >
          <Ionicons name="play-forward-outline" size={30} color={grey} />
        </ControlButton>
        <ControlButton
          onPress={() => {
            PlayNextSong();
          }}
        >
          <Ionicons name="play-skip-forward-outline" size={24} color={grey} />
        </ControlButton>
      </View>
    </View>
  ) : (
    <View></View>
  );
}

export default PlayerScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "space-evenly",
    alignSelf: "center",
    marginBottom: 20,
    width: "90%",
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
