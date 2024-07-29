import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

export default {
  width,
  height,
  version : '2.0.4',
  isSmallDevice: width < 400,
};
