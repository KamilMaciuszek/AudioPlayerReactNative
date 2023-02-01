import { TouchableHighlight } from "react-native";
import Colors from "../constants/Colors";

function ControlButton({ children, onPress }) {
  return (
    <TouchableHighlight
      activeOpacity={0.99}
      underlayColor={Colors.primaryGrey}
      onPress={() => {onPress()}}
    >
      {children}
    </TouchableHighlight>
  );
}

export default ControlButton;
