import { View } from "react-native";
import tw from "twrnc";
import { Ionicons, Octicons } from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";

export const MapButton = ({ isFocuse }: { isFocuse: boolean }) => {
  return (
    <View
      style={[
        {
          top: -28,
        },
        tw`shadow-md justify-center rounded-full items-center absolute`,
      ]}
    >
      <View
        style={[
          {
            backgroundColor: isFocuse ? COLORS.primary : "#738c94",
          },
          tw`justify-center items-center rounded-full w-14 h-14`,
        ]}
      >
        <Ionicons name="car-sport" size={24} color="white" />
      </View>
    </View>
  );
};
