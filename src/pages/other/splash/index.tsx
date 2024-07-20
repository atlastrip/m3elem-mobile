import {
  StyleSheet,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeScreen, Text } from "../../../components";
import { SafeAreaView } from "react-navigation";
import tw from "twrnc";
import type { FC } from "react";
import { COLORS, FONTS, SHADOWS } from "../../../constants/theme";
import * as Animated from "react-native-animatable";
import { AnimatePresence, Motion } from "@legendapp/motion";
import AsyncStorage from "@react-native-async-storage/async-storage";

type navigateTo = (to: string, args?: any) => void;

export interface INavigation {
  navigate: navigateTo;
  goBack: () => void;
}

interface Props {
  navigation: INavigation;
}

const splashs = [
  "https://free4kwallpapers.com/uploads/originals/2020/11/15/sunset-vector-wallpaper.jpg",
  "https://s2.best-wallpaper.net/wallpaper/3840x2160/1804/Vector-design-landscape-mountains-lake-trees-deer_3840x2160.jpg",
  "https://i.pinimg.com/originals/e6/53/f5/e653f5f2b28067b4d36fb537f2679ee4.jpg",
];

const SplashScreen: FC<Props> = ({ navigation }) => {
  const [SpalshBg, setSpalshBg] = useState(2);
  const [Start, setStart] = useState(false);

  const storeData = async () => {
    setStart(false);
    try {
      const json = await AsyncStorage.getItem("@user");
      const user = JSON.parse(json || "");
      console.log({ user });
      if (user.token) {
        navigation?.navigate("Root");
      } else {
        setStart(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // storeData();
    // return setStart(true);
  }, []);

  return (
    <ImageBackground
      source={{ uri: splashs[SpalshBg] }}
      style={{
        flex: 1,
      }}
    >
      <SafeAreaView
        style={{
          flex: 1,
        }}
      >
        <View style={tw`p-2 w-full items-center android:mt-10(myt)`}>
          <TouchableOpacity
            onPress={() =>
              setSpalshBg((prev) => {
                if (prev !== splashs.length - 1) {
                  return prev + 1;
                } else {
                  return 0;
                }
              })
            }
          >
            <Image
              style={{
                width: 50,
                borderRadius: 100,
                aspectRatio: 1,
              }}
              source={{ uri: "https://atlastrip.vercel.app/og.png" }}
            />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{
            height: "100%",
          }}
        >
          <View
            style={{ ...tw`p-5 justify-end mb-5 `, flex: 1, height: "100%" }}
          >
            <AnimatePresence>
              {!Start ? (
                <Motion.View
                  initial={{
                    y: -20,
                    opacity: 0,
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                  }}
                  exit={{
                    y: -20,
                    opacity: 0,
                  }}
                >
                  <Animated.Text
                    animation="fadeInDown"
                    delay={500}
                    style={{
                      ...tw`font-bold text-5xl text-white mb-3`,
                      ...SHADOWS.xl,
                    }}
                  >
                    Commencez votre meilleur voyage
                  </Animated.Text>
                  <Motion.Text
                    style={{
                      ...tw`font-bold text-xl text-white mb-10`,
                      ...SHADOWS.xl,
                    }}
                  >
                    Il existe de nombreuses destinations pour votre programme de
                    vacances ou de ressourcement après des activités
                  </Motion.Text>
                  <TouchableOpacity
                    style={styles.ButtonPrimary}
                    onPress={() => navigation.navigate("Langue")}
                  >
                    <Text className="" style={styles.text}>
                      Commencer
                    </Text>
                  </TouchableOpacity>
                </Motion.View>
              ) : (
                <Text className="" style={styles.text}>
                  Chargement ...
                </Text>
              )}
            </AnimatePresence>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  ButtonPrimary: {
    padding: 10,
    backgroundColor: COLORS.primary,
    borderRadius: 100,
    width: "100%",
  },
  text: {
    textAlign: "center",
    width: "100%",
    fontWeight: "700",
    color: "white",
    ...FONTS.h2,
  },
});
