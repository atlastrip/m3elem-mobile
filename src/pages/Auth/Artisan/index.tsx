import React, { useEffect, useState } from 'react'
import { Alert, Button, Dimensions, Image, Modal, ScrollView, StyleSheet, Switch, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from 'constants/theme';
import { Motion } from '@legendapp/motion';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';
import { IsCompleteProfile } from '@/components/IsCompleteProfile';



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
    const [reviews, setReviews] = useState([])
    const [infoPro, setInfoPro] = useState({
        firstName: '',
        lastName: '',
        id: ''
    })


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
                            mutation isArtisantAvailable($input: isArtisantAvailableInput) {
                                isArtisantAvailable(input: $input){
                                    id
                                    available
                                }
                            }
                        `,
                        variables: {
                            "input": {
                                available: !isEnabled,
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            // console.log('json broo', json);

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
                                    firstName
                                    lastName
                                    available
                                    reviews{
                                        id
                                    reviewer{
                                        id 
                                        firstName
                                        lastName
                                    }
                                    description
                                    rating
                                    }
                                }
                            }
                        `,
                    }),
                }
            );

            const json = await res.json();
            setIsEnabled(json?.data?.user?.available);
            console.log('====================================');
            console.log('json?.data?.user?.reviews', json?.data?.user?.reviews);
            console.log('====================================');
            setReviews(json?.data?.user?.reviews)
            // setLastName(json?.data?.user?.lastName)
            // setFirstName(json?.data?.user?.firstName)
            setInfoPro({
                firstName: json?.data?.user?.firstName,
                lastName: json?.data?.user?.lastName,
                id: json?.data?.user?.id
            })

        } catch (err1) {
            Alert.alert("Erreur", "Une erreur est servenue lors de modification de votre compte.");
        }
    }



    const [isCompleted, setIsCompleted] = useState(false)
    const [loading, setLoading] = useState(false)


    const getProfileCompleted = async () => {

        const token = await getToken();
        const user: any = await getUser();
        console.log('====================================');
        // console.log('token', token);
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
                   query ArtisantProfileCompleted {
                          user{
                            profileCompleted
                          }
                        }

                    `,

                    }),
                }
            );

            const json = await res.json();
            // console.log('json', json?.data?.user?.profileCompleted);

            setIsCompleted(json?.data?.user?.profileCompleted)

            setLoading(false);
        } catch (err: any) {
            setLoading(false);
            Alert.alert("error", JSON.stringify(err.message, undefined, 2));
            // Alert.alert(json?.detail);
        }
    }



    useEffect(() => {
        getProfileCompleted()

        getInfo()
    }, [IsFocused])

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


            <IsCompleteProfile
                profileCompletedData={isCompleted}
                navigation={navigation}
            />
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
                                onPress={() => navigation.push('MyQrCode', {
                                    reviews,
                                    infoPro
                                })}
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

                    </View>
                </View>


            </View>
        </ScrollView>
    )
}

export default ArtisanHomePage



