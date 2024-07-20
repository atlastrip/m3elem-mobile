import { INavigation } from "@/pages/other/splash";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const useSignOut = async (navigation : INavigation) => {

    try {
      await AsyncStorage.removeItem("@user");
      return navigation.navigate("Splash");
    } catch (err) {
      console.log(err);
    }
  };