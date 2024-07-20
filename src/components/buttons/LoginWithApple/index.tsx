import { useEffect, useState } from "react";
import * as AppleAuthentication from "expo-apple-authentication";
import { AppleAuthenticationCredential } from "expo-apple-authentication";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IUser, isLogin, setLoadingPage } from "../../../store/User";
import { registerForPushNotificationsAsync } from "@/components/pushNotification";
import { Alert, Platform, View } from "react-native";
import { sendCrushlytic } from "@/helpers/Crushlytics";

export const getStringProperty = (
  someUnknown: unknown,
  propertyName: string
): string | unknown => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const p = (someUnknown as any)[propertyName];
    if (typeof p === "string") {
      return p;
    }
  } catch {
    // Ignore.
  }

  return undefined;
};
export const LoginWithApple = () => {
  interface IToken {
    identityToken: string;
  }

  const [identity, setIdentity] = useState<
    AppleAuthenticationCredential | undefined
  >(undefined);

  const dispatch = useDispatch();

  const HandleLoginWithApple = async (token: IToken) => {
    dispatch(setLoadingPage(true));
    const headers = new Headers();
    let USER;
    headers.append("Content-Type", "application/json");
    try {
      const res = await fetch(
        "https://pantofit.pythonanywhere.com/social-auth/apple",
        {
          method: "POST",
          headers,
          body: JSON.stringify(token),
        }
      );
      const json = await res.json();
      console.info(json);
      if (json?.user) {
        await AsyncStorage.setItem(
          "@token",
          JSON.stringify({
            refresh: json?.refresh_token,
            access: json?.access_token,
          })
        );
        await AsyncStorage.setItem("@user", JSON.stringify(json?.user));
        USER = json?.user
        dispatch(isLogin(true));
        dispatch(setLoadingPage(false));
      } else {
        // setLoading(false);
        dispatch(setLoadingPage(false));

        Alert.alert(JSON.stringify(json, undefined, 2));
        // Alert.alert(json?.detail);
        // setERR(JSON.stringify(json, undefined, 2));
      }
    } catch (err) {
      // setLoading(false);
      const error = `error-catch:[${JSON.stringify(
        err
      )}], token : [${JSON.stringify(token)}]`;
      await sendCrushlytic({
        error: error,
        function: "loginWithApple",
        platform: Platform.OS,
        screen: "Auth",
        version: "2.0.4",
      });
      Alert.alert(
        "Erreur",
        "Une erreur est survenue, veuillez réessayer plus tard"
      );
      dispatch(setLoadingPage(false));
    }
  };

  useEffect(() => {
    if (identity?.identityToken) {
      HandleLoginWithApple({
        identityToken: identity?.identityToken || "",
      });
    }
  }, [identity?.identityToken]);

  const signIn = async () => {
    try {
      const Res = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      setIdentity(Res);
    } catch (error) {
      if (getStringProperty(error, "code") === "ERR_CANCELED") {
        console.info("The user cancelled in the sign in.", error);
      } else {
        console.info("An error occurred signing in.", error);
      }
    }
  };

  return (
    <>
      {Platform.OS === "ios" && (
        <View style={{ marginTop: 10, marginBottom: 10 }}>
          <AppleAuthentication.AppleAuthenticationButton
            buttonStyle={
              AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
            }
            buttonType={
              AppleAuthentication.AppleAuthenticationButtonType.CONTINUE
            }
            cornerRadius={555}
            onPress={signIn}
            style={{ height: 50, width: "100%" }}
          />
        </View>
      )}
    </>
  );
};
