import { FC, useEffect, useState } from "react";
import { Text, View, Image, Animated } from "react-native";
import tw from "twrnc";
import { COLORS } from "../../../constants/theme";
import  window  from "../../../constants/Layout";

interface IProps {
  name: string;
  source: any;
  isFocuse: boolean;
  Icon?: React.ReactElement;
  hasNewFeature?: boolean;
}

export const TabBarIcon: FC<IProps> = ({
  name,
  source,
  isFocuse,
  Icon,
  hasNewFeature = false,
}) => {
  return (
    <View
    style={{
      width : window.width * .2
    }}
    className="relative justify-center items-center"
    >
        <Image
          source={source}
          resizeMode="contain"
          style={[
            tw`w-6 h-6`,
            { tintColor: isFocuse ? COLORS.primary : "#738c94" },
          ]}
        />
        {hasNewFeature && (
          <View
            style={{
              width: 6,
              height: 6,
              backgroundColor: COLORS.primary,
              right  :  '40%'
            }}
            className="rounded-full absolute top-0"
          />
        )}
        <View className="">
          <Text
            style={[
              tw`font-semibold mt-1 text-xs`,
              { color: isFocuse ? COLORS.primary : "#738c94" },
            ]}
          >
            {name}
          </Text>
        
        </View>
    </View>
  );
};
export const AnimatedTabBarIcon: FC<IProps> = ({
  name,
  source,
  isFocuse,
  Icon,
  hasNewFeature = false,
}) => {
  const [scale] = useState(new Animated.Value(0.5));

  useEffect(() => {
    const pulse = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.2,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 0.5,
        duration: 800,
        useNativeDriver: true,
      }),
    ]);
    Animated.loop(pulse).start();
  }, []);

  return (
    <View
    style={{
      width : window.width * .2
    }}
    className="relative justify-center items-center"
    >
        <Image
          source={source}
          resizeMode="contain"
          style={[
            tw`w-6 h-6`,
            { tintColor: isFocuse ? COLORS.primary : "#738c94" },
          ]}
        />
        {(hasNewFeature && !isFocuse) && (
          <Animated.View
            style={{
              width: 6,
              height: 6,
              backgroundColor: COLORS.primary,
              right  :  '40%',
               transform: [{ scale }] 
            }}
            className="rounded-full absolute top-0"
          />
        )}
        <View className="">
          <Text
            style={[
              tw`font-semibold mt-1 text-xs`,
              { color: isFocuse ? COLORS.primary : "#738c94" },
            ]}
          >
            {name}
          </Text>
        
        </View>
    </View>
  );
};
