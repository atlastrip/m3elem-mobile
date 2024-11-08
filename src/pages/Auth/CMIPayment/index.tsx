import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  // WebView
} from "react-native";
import * as Crypto from "expo-crypto";
import { WebView } from "react-native-webview";
import React, { FC, useEffect, useState } from "react";
import Navigation, { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import window from "../../../constants/Layout";

import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { COLORS } from "../../../constants/theme";
import { IUser, setConfetti } from "../../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";


const CMIPayment = ({
  navigation,
  route,
}: {
  navigation: Navigate;
  route: any;
}) => {
  const insets = useSafeAreaInsets();
  const Params = route.params;
  const User: IUser = Params.User;
  // const [User, setUser] = useState<IUser | null>(null);
  const [Show, setShow] = useState(false);
  const [Headerss, setHeaders] = useState();
  const [HTML, setHTML] = useState("");

  const getToken = async () => {
    const data = await getData("@token");
    console.log({ access: data?.access });
    return data?.access;
  };

  const RandomNumber = () => {
    return Math.floor(Math.random() * 1000000000);
  };
  const randomNumberOid = `${RandomNumber()}`;
  const callbackUrl = "https://pantofit.pythonanywhere.com/payment/callback/";
  const phone = `${User?.phone}`;
  const email = `${User?.user?.email}`;
  const okUrl = "https://pantofit.pythonanywhere.com/payment/ok";
  const failUrl = "https://pantofit.pythonanywhere.com/payment/fail";
  const shopurl = "https://pantofit.pythonanywhere.com/";
  const [TheBody, setTheBody] = useState("");
  const [Url, setUrl] = useState("");

  console.log({
    body: `BillToCity=&BillToCompany=pantofit&BillToCountry=Maroc&BillToName=${encodeURIComponent(
      (User?.user?.first_name || "Utilisateur") +
        " " +
        (User?.user?.last_name || "Pantofit")
    )}&BillToPostalCode=&BillToStateProv=&BillToStreet1=&CallbackResponse=True&TranType=PreAuth&amount=${
      Params.Price
    }&callbackUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Fcallback%2F&clientid=600002873&csrfmiddlewaretoken=CAY4HSYiVoLM6tToZFLBg0MO8KeN1uBAgFemiROk1B04IVmO6JReZhbFnF77BeQi&currency=504&email=${encodeURIComponent(
      User?.user?.email || "Utilisateur@email.com"
    )}&encoding=UFT-8&failUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Ffail&hashAlgorithm=ver3&lang=fr&oid=${encodeURIComponent(
      randomNumberOid
    )}&okUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Fok&qty1=10&refreshtime=5&rnd=658815787&shopurl=https%3A%2F%2Fpantofit.pythonanywhere.com%2F&storetype=3D_PAY_HOSTING&tel=${encodeURIComponent(
      User?.phone || "0666666666"
    )}`,
  });

  useEffect(() => {
    (async () => {
      const accessToken = await getToken();
      fetch("https://pantofit.pythonanywhere.com/payment/process/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `BillToCity=&BillToCompany=pantofit&BillToCountry=Maroc&BillToName=${encodeURIComponent(
          (User?.user?.first_name || "Utilisateur") +
            " " +
            (User?.user?.last_name || "Pantofit")
        )}&BillToPostalCode=&BillToStateProv=&BillToStreet1=&CallbackResponse=True&TranType=PreAuth&amount=${
          Params.Price
        }&callbackUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Fcallback%2F&clientid=600002873&csrfmiddlewaretoken=CAY4HSYiVoLM6tToZFLBg0MO8KeN1uBAgFemiROk1B04IVmO6JReZhbFnF77BeQi&currency=504&email=${encodeURIComponent(
          User?.user?.email || "Utilisateur@email.com"
        )}&encoding=UFT-8&failUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Ffail&hashAlgorithm=ver3&lang=fr&oid=${encodeURIComponent(
          randomNumberOid
        )}&okUrl=https%3A%2F%2Fpantofit.pythonanywhere.com%2Fpayment%2Fok&qty1=10&refreshtime=5&rnd=658815787&shopurl=https%3A%2F%2Fpantofit.pythonanywhere.com%2F&storetype=3D_PAY_HOSTING&tel=${encodeURIComponent(
          User?.phone || "0666666666"
        )}`,
      })
        .then((response) => response.text())
        .then((text) => {
          setHTML(text);
        });
    })();
  }, [Params]);
  const dispatch = useDispatch();
  const [EmForFB, setEmForFB] = useState("");

  useEffect(() => {
    (async () => {
      const digest = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        User?.user?.email || ""
      );
      setEmForFB(digest);
      console.log("Digest: ", digest);
      /* Some crypto operation... */
    })();
  }, []);

  const SendFBEvent = async (Json: string) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: Json,
    };
    fetch(
      "https://graph.facebook.com/v16.0/240582138407948/events?access_token=EAAQakZAQpv1UBAJGefPzjOVfL9m6cZCp59cuQ4LGOaH4Hj04ITQI0Hz6QGTFv2kK0zLQFOT2mnquOJ8dROOQXoxhGpga7EMgectIteajdxYsffaZA5TodWzhSVAuwK6xj7lZBFzhtZCAaHYnzWpwuFhsMBaCUrGcdHI72UhBzm0sjp1kDqGQmBZC75PXnr5fEZD",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => console.log({ result }))
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    console.log({ Url });
    (async () => {
      const CurrentTimeStamp = Math.floor(Date.now() / 1000);

      const Json = JSON.stringify({
        data: [
          {
            event_name: "Purchase",
            event_time: CurrentTimeStamp,
            action_source: "app",
            user_data: {
              em: [EmForFB],
              ph: [null],
            },
            custom_data: {
              currency: "MAD",
              value: `${Params.Price}`,
            },
            app_data: {
              advertiser_tracking_enabled: "True",
              application_tracking_enabled: "True",
              extinfo: [
                "a2",
                `${
                  Platform.OS === "ios"
                    ? "com.serviceday.serviceday"
                    : "com.serviceday.serviceday"
                }`,
                "771",
                "Version 7.7.1",
                "10.1.1",
                "IPHONE",
                "en_US",
                "GMT-0",
                "TMobile",
                `${window.width}`,
                `${window.height}`,
                "2.00",
                "2",
                "128",
                "8",
                "MOROCCO/MOROCCO",
              ],
            },
          },
        ],
      });

      if (Url === okUrl) {
        dispatch(setConfetti(true));
        SendFBEvent(Json);
        navigation.navigate("Congrats", {
          User: User,
          Text: `Votre commande numéro ${randomNumberOid} du montant de ${Params.Price} MAD TTC a été bien traitée. Votre solde sera crédité de ${Params.NumberOfAttendances} séances.`,
          Lottie: "Felicitations",
          Title: "Felicitations",
          to: "Map",
        });
      } else if (Url === failUrl) {
        dispatch(setConfetti(false));
        navigation.navigate("Congrats", {
          User: User,
          Text: `Malheureusement️, votre paiement de la commande numéro ${randomNumberOid} a échoué. Veuillez contacter votre banque et réssayer ultérieurement`,
          Lottie: "Oh no",
          Title: "Oh no",
          to: "Packs",
        });
      } else if (Url === shopurl) {
        navigation.navigate("Packs");
      }
    })();
  }, [Url]);

  const sendFBEventBtn = () => {
    const CurrentTimeStamp = Math.floor(Date.now() / 1000);
    const Json = JSON.stringify({
      data: [
        {
          event_name: "Purchase",
          event_time: CurrentTimeStamp,
          action_source: "app",
          user_data: {
            em: [EmForFB],
            ph: [null],
          },
          custom_data: {
            currency: "MAD",
            value: `${Params.Price}`,
          },
          app_data: {
            advertiser_tracking_enabled: "True",
            application_tracking_enabled: "True",
            extinfo: [
              "a2",
              `${
                Platform.OS === "ios"
                  ? "com.serviceday.serviceday"
                  : "com.serviceday.serviceday"
              }`,
              "771",
              "Version 7.7.1",
              "10.1.1",
              "IPHONE",
              "en_US",
              "GMT-0",
              "TMobile",
              `${window.width}`,
              `${window.height}`,
              "2.00",
              "2",
              "128",
              "8",
              "MOROCCO/MOROCCO",
            ],
          },
        },
      ],
    });
    SendFBEvent(Json);
  };

  return (
    <View
      style={{
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <View
        style={{
          paddingTop: insets?.top + 10,
          paddingBottom: 10,
        }}
        className="p-2 flex-row justify-between items-center bg-white/5"
      >
        <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
          <Ionicons name="chevron-back" color="white" size={24} />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Checkout</Text>
        <View className="p-2">
          <Ionicons name="share-outline" color="transparent" size={24} />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        {/* <TouchableOpacity onPress={sendFBEventBtn} className="bg-red-600 ">
          <Text className="text-white p-3">SEND EVENT</Text>
        </TouchableOpacity> */}
        <WebView
          onNavigationStateChange={(e) => setUrl(e?.url)}
          style={{}}
          source={{
            baseUrl: "https://pantofit.pythonanywhere.com/payment/process/",
            html: HTML,
          }}
        />
      </View>
    </View>
  );
};

export default CMIPayment;

const styles = StyleSheet.create({
  between: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
