// AccountScreen.js

import { COLORS } from 'constants/theme';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl, Alert, Modal, Button as ButtonReactNative } from 'react-native';
import { Avatar, Button, Card } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Feather';
import { Ionicons } from "@expo/vector-icons";
import window from "../../constants/Layout";
import { TextInput } from 'react-native';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet';
import { IsCompleteProfile } from '@/components/IsCompleteProfile';

export interface Audio {
  id: string
  name: string
  description: string
  shortDescription: string
  city: string
  longitude: string
  latitude: string
  image: string
  audio: string
  type: string
  archived: boolean
}

export const Images = ({ images }: { images: string[] }) => {
  return (
    <View className='h-[200px] rounded-t-2xl overflow-hidden'>
      {images.length === 1 && (
        <Image className='h-[200px] w-full rounded-t-2xl' source={{ uri: images[0] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
      )}
      {images.length === 2 && (
        <View className='flex-row'>
          <Image className='h-[200px] w-1/2 rounded-tl-2xl' source={{ uri: images[0] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
          <Image className='h-[200px] w-1/2 rounded-tr-2xl' source={{ uri: images[1] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
        </View>
      )}
      {images.length >= 3 && (
        <View className='flex-row'>
          <Image className='h-[200px] w-1/2 rounded-tl-2xl' source={{ uri: images[0] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
          <View className='h-[200px]  w-1/2' >
            <Image className='h-[100px] w-full rounded-tr-2xl' source={{ uri: images[1] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
            <Image className='h-[100px] w-full ' source={{ uri: images[2] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
          </View>
        </View>
      )}
    </View>
  )
}

export default function HomeScreen({ navigation }: any) {
  const insets = useSafeAreaInsets();
  const [services, setServices] = useState<any[]>([]);
  const [SelectedCategory, setSelectedCategory] = useState("Popular");
  const images: any = {
    Popular: require('./images/morocco.png'),
    Lake: require('./images/lake.jpg'),
    Beach: require('./images/beach.jpg'),
    Mountain: require('./images/mountain.webp'),
    Ruins: require('./images/ruins.webp'),
  }

  const [Audios, setAudios] = useState<Audio[]>([]);
  const [Loading, setLoading] = useState(false);
  const [Types, setTypes] = useState<string[]>([]);

  // useEffect(() => {
  //   setTypes([...new Set(Audios?.filter(e => e.archived != true)?.map(e => e.type))])
  // }, [Audios])


  // const getData = async () => {
  //   setLoading(true)
  //   const myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   const graphql = JSON.stringify({
  //     query: "query AllAudio {\r\n  AllAudio {\r\n    id\r\n    name\r\n    description\r\n    shortDescription\r\n    city\r\n    longitude\r\n    latitude\r\n    image\r\n    audio\r\n    archived\r\n    type\r\n    createdAt\r\n    updatedAt\r\n  }\r\n}\r\n",
  //     variables: {}
  //   })
  //   const requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: graphql,
  //   };

  //   fetch("https://m3elem-app-ecj9f.ondigitalocean.app/m3elem", requestOptions)
  //     .then((response) => response.json())
  //     .then((result) => {
  //       // @ts-ignore
  //       setAudios(result?.data?.AllAudio?.filter(e => e?.archive != true) || []);
  //       setLoading(false)
  //     })
  //     .catch((error) => console.error(error));
  // }

  // useEffect(() => {
  //   getData();
  // }, []);



  function getCityData(audios: Audio[]) {
    // Use a Map to store unique cities and their data
    const cityMap = new Map<string, { city: string, images: string[], audios: Audio[] }>();

    audios.forEach(audio => {
      // Normalize the city name to lower case to handle different capitalizations
      const normalizedCity = audio.city.toLowerCase();

      if (!cityMap.has(normalizedCity)) {
        cityMap.set(normalizedCity, { city: audio.city, images: [], audios: [] });
      }
      const cityData = cityMap.get(normalizedCity)!;
      cityData.images.push(audio.image);
      cityData.audios.push(audio);
    });

    // Convert the Map values to an array
    const cityDataArray = Array.from(cityMap.values());

    return cityDataArray;
  }


  const getServices = async () => {

    const token = await getToken();
    const user: any = await getUser();
    // setUser(user);
    console.log('====================================');
    console.log('token', token);
    console.log('====================================');
    if (!token) {
      return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    try {
      setLoading(true);
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
                    query Professionals {
                        Professionals{
                          id
                          text
                          img
                        }
                      }

                    `,

          }),
        }
      );

      const json = await res.json();

      setServices(json.data.Professionals);


      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      Alert.alert("error", JSON.stringify(err.message, undefined, 2));
      // Alert.alert(json?.detail);
    }

  }



  useEffect(() => {
    getServices();
  }, []);



  const [showQr, setShowQr] = React.useState(false);
  const [order, setOrder] = React.useState(null);
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [searchCategory, setSearchCategory] = React.useState('');
  const [searchZipCode, setSearchZipCode] = React.useState('');

  React.useEffect(() => {
    (async () => {
      const { status }: any = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status == 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: any) => {
    setScanned(true);
    setShowQr(false);
    const scannedData = JSON.parse(data)
    console.log(scannedData);


    navigation.navigate('OrderViewUser', { order: scannedData.order, user: scannedData.user });

  };



  const goToFilter = () => {
    navigation.navigate('InstantResult', {
      searchCategory: searchCategory,
      searchZipCode: searchZipCode
    });
  }

  // if (hasPermission === null) {
  //   return <Text>Requesting for camera permission</Text>;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={Audios.length > 0 && Loading} onRefresh={() =>
          getServices()
        } />
      }
    >

      <View
        style={{
          width: window.width,
          height: window.height / 3,
          maxHeight: 400,
          backgroundColor: 'black',
          position: "relative"
        }}
      >

        <Image
          style={{
            width: window.width,
            height: window.height / 3,
            maxHeight: 400,
            opacity: 0.6
          }}
          source={{ uri: "https://thumbs.dreamstime.com/b/blue-green-background-8525790.jpg" }}
        />
        <View className='absolute bottom-3 px-3 w-full'>

          <Text className='text-5xl font-bold text-white ' >
            Service day
          </Text>
          <View
            className='flex-row items-center justify-between'
          >
            <TextInput
              placeholderTextColor="black"
              className="text-black placeholder:text-black border border-black/25 bg-white w-[70%] rounded-lg text-xl p-3 mb-3"
              placeholder="Search"
              value={searchCategory}
              onChangeText={setSearchCategory}
            />
            <TextInput
              placeholderTextColor="black"
              className="text-black placeholder:text-black border border-black/25 bg-white  rounded-lg text-xl p-3 mb-3 w-[30%]"
              placeholder="Zip Code"
              value={searchZipCode}
              onChangeText={setSearchZipCode}
            />
          </View>
          <TouchableOpacity onPress={goToFilter} className='bg-primary-500 p-3 rounded-lg'>
            <Text className='text-white font-bold text-xl text-center' >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className='flex items-center justify-between flex-row px-3' >
        <Text className='font-bold text-lg' >
          Artisans and technicians
        </Text>
        <TouchableOpacity onPress={() => navigation?.navigate('ProfessionPage')} className='p-2'>
          <Text className='font-bold text-primary-500 text-lg' >
            View All
          </Text>
        </TouchableOpacity>

      </View>
      <View className='flex-row'>

        <View className=' pt-0 pb-7 flex-row flex-wrap gap-3 items-center justify-center w-fit ' >
          {services?.sort((a, b) => a?.text.toLowerCase().localeCompare(b.text.toLowerCase()))?.slice(0, 8)?.map((e, i) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Order', { profession: [e] })}
              key={i}
              className={``} >
              <View className='bg-white rounded-full items-center justify-center' style={{ width: window.width * .22, height: window.width * .22 }}>
                <Image style={{ width: window.width * .13, height: window.width * .13 }} source={{ uri: e.img }} />
              </View>
              <Text className={`text-sm text-primary-500 font-bold text-center`} >
                {e.text}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View className="px-3">
        <Text className='font-bold text-lg' >
          Order again
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Order', { professions: [] })}
          style={{ backgroundColor: "#0e5b31" }} className="rounded-lg p-3 py-7 relative ">
          <Text className='font-bold text-lg text-white' >
            You don't have any order yet!
          </Text>
          <View className='flex-row'>

            <View style={{ backgroundColor: "white" }} className=' px-5 py-3 rounded-full'>
              <Text className='font-bold text-lg text-primary-500' >
                Order Now!
              </Text>
            </View>
          </View>
          <Image source={require('./images/woman.png')} resizeMode='contain' className='absolute w-40 h-40 bottom-0 right-0' />

        </TouchableOpacity>

      </View>
      <View className="px-3 mt-6">
        <Text className='font-bold text-lg' >
          Reviews
        </Text>
        <View style={{ backgroundColor: "#fec72e" }} className=' rounded-lg flex-row justify-end' >
          <Image source={require('./images/reviews.webp')} style={{ height: 150, width: 150 }} resizeMode='contain' className='rounded-lg' />
          <ScrollView horizontal
            style={{ height: 150 }}
            className='w-full absolute top-0 p-4 left-0' >
            <View className='flex-1 flex-col justify-center'>
              <View className='flex-row items-center'>
                <Ionicons size={20} name='star' />
                <Text className='text-lg'>
                  (4.8)
                </Text>
              </View>
              <Text className='text-black  font-bold text-2xl' >
                {`"I love your system."`}
              </Text>

              <Text className='text-black font-bold text-2xl' >
                -Salim zridi
              </Text>
            </View>
          </ScrollView>
          <View className='flex-row absolute bottom-5 left-5 gap-2'>
            <View className='w-3 h-3 rounded-full bg-black' />
            <View className='w-3 h-3 rounded-full bg-white' />
            <View className='w-3 h-3 rounded-full bg-white' />
            <View className='w-3 h-3 rounded-full bg-white' />
          </View>
        </View>
      </View>

      <View
        className='px-1 mt-6'
      >
        <TouchableOpacity
          onPress={() => setShowQr(true)}
          className="flex-1 ml-2">
          <LinearGradient
            colors={['#f44336', '#e57373']}
            start={[0, 0]}
            end={[1, 1]}
            className="p-4 rounded-2xl flex justify-between"
          >
            <MaterialCommunityIcons name="account-outline" size={38} color="white" />
            <Text className="text-white mt-8 font-bold text-xl">QrCode Scanner</Text>
          </LinearGradient>
        </TouchableOpacity>


      </View>

      {showQr && (
        <Modal
          visible={showQr}
          transparent={true}
          onRequestClose={() => setShowQr(false)}
          animationType="slide"

        >
          <View
            className='flex-1 relative  justify-center items-center  p-4 flex-row '
          >
            <BarCodeScanner
              onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
              style={{
                flex: 1,
                height: WINDOW_HEIGHT - 100,
              }}
            />

            {scanned && (

              <ButtonReactNative title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
            )}
          </View>
        </Modal>
      )}


      <View style={{ height: insets.top + 10 }} />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    marginLeft: 10,
    fontSize: 20,
    fontWeight: 'bold',
  },
  balanceCard: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  underBalanceCard: {
    padding: 20,
    borderRadius: 99999,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  balanceText: {
    fontSize: 16,
    color: '#888',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    marginTop: 10,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardDetail: {
    fontSize: 16,
    color: '#888',
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardExp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 0,
    gap: 10
  },
  depositButton: {
    backgroundColor: COLORS.primary,
  },
  withdrawButton: {
    borderColor: COLORS.primary,
  },
  transactionsSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  transactionIcon: {
    marginRight: 10,
    color: COLORS.primary,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionType: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  transactionDate: {
    fontSize: 14,
    color: '#888',
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amountText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary
  },
  feeText: {
    fontSize: 14,
    color: '#888',
  },
});
