import React, { useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Image, Modal, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from 'constants/theme';
import { Motion } from '@legendapp/motion';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { BarCodeScanner } from 'expo-barcode-scanner';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';


const ArtisanHomePage = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const IsFocused = useIsFocused();

    const [isEnabled, setIsEnabled] = useState(false);
    // const toggleSwitch = () => setIsEnabled(v => !v);
    const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;
    const [available, setAvailable] = useState(false);
    const WINDOW_WIDTH = Dimensions.get('window').width;
    const [showQr, setShowQr] = React.useState(false);
    const [order, setOrder] = React.useState(null);
    const [hasPermission, setHasPermission] = React.useState(null);
    const [scanned, setScanned] = React.useState(false);
    const [LoadingAcceptedLeads, setLoadingAcceptedLeads] = React.useState(false);
    const [Leads, setLeads] = React.useState<any>([]);


    const EditUser = async () => {

        // setIsEnabled(v => !v);

        const token = await getToken();
        const user: any = await getUser();

        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation updateUser($input: inputUpdateUser) {
                                updateUser(input: $input){
                                    id
                                    available
                                }
                            }
                        `,
                        variables: {
                            "input": {
                                id: JSON.parse(user)?.id,
                                available: !isEnabled,
                                categories: [],
                                newImage:[]
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            console.log('json broo', json);
            
            await getInfo();

        } catch (err1) {
            console.log('====================================');
            console.log('err1', err1);
            console.log('====================================');
            Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
        }
    };


    const getInfo = async () => {
        const token = await getToken();
        const user: any = await getUser();

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            query user {
                                user{
                                    id
                                    available
                                }
                            }
                        `,
                    }),
                }
            );

            const json = await res.json();
            setIsEnabled(json?.data?.user?.available);

        } catch (err1) {
            Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
        }
    }



    useEffect(() => {
        getInfo()
    }, [IsFocused])


    useEffect(() => {
        (async () => {
            const { status }: any = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const handleBarCodeScanned = ({ type, data }: any) => {
        setScanned(true);
        setShowQr(false);
        const scannedData = JSON.parse(data);
        console.log(scannedData);

        navigation.navigate('OrderViewUser', { order: scannedData.order, user: scannedData.user });
    };

    // if (hasPermission === null) {
    //     return <Text>Requesting for camera permission</Text>;
    // }
    // if (hasPermission === false) {
    //     return <Text>No access to camera</Text>;
    // }


    

  const getLeads = async () => {

    const token = await getToken();
    const user: any = await getUser();
    // setUser(user);

    if (!token) {
      return;
    }
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${token}`);
    try {
      setLoadingAcceptedLeads(true);
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
                    query getAcceptedLeadsThatMatchUserProfessionals {
                        getAcceptedLeadsThatMatchUserProfessionals {
                                id
                                
                            }
                            }

                    `,

          }),
        }
      );

      const json = await res.json();

      setLeads(json.data.getAcceptedLeadsThatMatchUserProfessionals);


      setLoadingAcceptedLeads(false);
    } catch (err: any) {
      setLoadingAcceptedLeads(false);
      Alert.alert("error", JSON.stringify(err.message, undefined, 2));
      // Alert.alert(json?.detail);
    }
  }





    return (
        <ScrollView style={{ flex: 1 }}>
            {country == 'ma' && (

                <Image source={require('./Orders/images/paint-morocco.jpg')} className='opacity-10' style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT, position: "absolute", top: 0, left: 0 }} />
            )}
            {country == 'usa' && (
                <Image source={require('./Orders/images/flag-usa.jpg')} className='opacity-10' style={{ width: WINDOW_WIDTH, height: WINDOW_HEIGHT, position: "absolute", top: 0, left: 0 }} />
            )}
            <View
                style={{ paddingTop: insets.top + 10 }}
                className="flex-1 z-20 ">
                <View className='flex-row justify-center py-2 mb-5'>
                    <Motion.View
                        initial={{ backgroundColor: isEnabled ? COLORS.primary : 'red', scale: 0 }}
                        animate={{ backgroundColor: isEnabled ? COLORS.primary : 'red', scale: !isEnabled ? 1 : 1.1 }}
                        style={SHADOWS.medium}
                        className='flex-row p-1 items-center rounded-full'>
                        <Text className='text-white mx-2 font-bold text-xl '>
                            {!isEnabled ? "Turn on availability" : 'You are available'}
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "white" }}
                            thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
                            ios_backgroundColor="#fef"
                            onValueChange={
                                () => {
                                    EditUser();
                                }
                            }
                            value={isEnabled}
                        />
                    </Motion.View>
                </View>
                <ScrollView
                    snapToInterval={WINDOW_WIDTH * 0.7 + 16}
                    snapToAlignment="center"
                    decelerationRate="fast"
                    horizontal className="mb-4">
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-purple-100 p-4 ml-4 rounded-lg border-2 border-purple-600 flex-1 mr-2">
                        <Text className="text-purple-600 text-5xl font-bold">10</Text>
                        <Text className="text-gray-500 text-xl">New Leads</Text>
                    </View>
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-green-100 p-4 rounded-lg  border-2 border-green-600 flex-1 mx-2">
                        <Text className="text-green-600 text-5xl font-bold">1200</Text>
                        <Text className="text-gray-500  text-xl">Turnover</Text>
                    </View>
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-red-100 p-4 mr-4 rounded-lg flex-1  border-2 border-red-600 ml-2">
                        <Text className="text-red-600 text-5xl font-bold">4</Text>
                        <Text className="text-gray-500 text-xl">(40%) Accepted leads</Text>
                    </View>
                </ScrollView>

                {/* Shortcuts */}
                <View className='p-3'>
                    <Text className="text-xl font-bold mb-4">Shortcuts</Text>
                    <View className="justify-between gap-3 ">
                        <View className="flex-row ">
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Transactions')}
                                className="flex-1 mr-2">
                                <LinearGradient
                                    colors={['blue', '#05f']}

                                    start={[0, 0]}
                                    end={[1, 1]}
                                    className="p-4 rounded-2xl flex justify-between"
                                >
                                    <MaterialIcons name="money" color="white" size={38} />
                                    <Text className="text-white mt-8 font-bold text-xl">Balance and transactions</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyQrCode')}
                                className="flex-1 ml-2">
                                <LinearGradient
                                    colors={['#4caf50', '#4fa866']}

                                    start={[0, 0]}
                                    end={[1, 1]}
                                    className="p-4 rounded-2xl flex justify-between"
                                >
                                    <FontAwesome name="qrcode" size={38} color="white" />
                                    <Text className="text-white mt-8 font-bold text-xl">My QRcode, request review</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        <View className="flex-row ">
                            <TouchableOpacity
                                onPress={() => navigation.navigate('MyLeads')}
                                className="flex-1 mr-2">
                                <LinearGradient
                                    colors={['#8e24aa', '#ab47bc']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    className="p-4 rounded-2xl flex justify-between"
                                >
                                    <MaterialCommunityIcons name="account-group-outline" size={38} color="white" />
                                    <Text className="text-white mt-8 font-bold text-xl">My Leads</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Menu')}
                                className="flex-1 ml-2">
                                <LinearGradient
                                    colors={['#f44336', '#e57373']}
                                    start={[0, 0]}
                                    end={[1, 1]}
                                    className="p-4 rounded-2xl flex justify-between"
                                >
                                    <MaterialCommunityIcons name="account-outline" size={38} color="white" />
                                    <Text className="text-white mt-8 font-bold text-xl">Profile</Text>
                                </LinearGradient>
                            </TouchableOpacity>


                        </View>
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
                </View>
                {showQr && (
                    <Modal
                        visible={showQr}
                        transparent={true}
                        onRequestClose={() => setShowQr(false)}
                        animationType="slide"

                    >
                        <View
                            className='flex-1 justify-center items-center  p-4 flex-row '
                        >
                            <BarCodeScanner
                                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                                style={{
                                    flex: 1,
                                    height: WINDOW_HEIGHT - 100,
                                }}
                            />
                            {scanned && (
                                <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
                            )}
                        </View>
                    </Modal>
                )}

            </View>
        </ScrollView>
    )
}

export default ArtisanHomePage