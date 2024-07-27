import { Ionicons } from '@expo/vector-icons';
import ConfettiCannon from 'react-native-confetti-cannon';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import Animate from "react-native-reanimated"
import { ButtonPrimary } from '@/components/index';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import { LocationView } from '@/components/OrderLising';
import { COLORS } from 'constants/theme';
import { MaterialIcons } from "@expo/vector-icons";
import Constants from 'expo-constants';
import { getToken, getUser } from '@/helpers/getToken';


const OrderViewerArtisan = ({ route, navigation }: any) => {
    const { order, user } = route.params;
    const insets = useSafeAreaInsets();
    const [isUnlocked, setIsUnlocked] = useState(false);

    const [reviews, setReviews] = useState([]); // Replace with actual reviews if available
    const [newReview, setNewReview] = useState({ user: '', comment: '', rating: '', professionId: '' });
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['50%', '80%'], []);

    const handlePresentModalPress = useCallback(() => {
        setSelectedProfession(null)
        bottomSheetModalRef.current?.present();
    }, []);

    const handleAddReview = () => { };
    const [SelectedProfession, setSelectedProfession] = useState<any>(null);
    const [rating, setRating] = useState<number>(3);

    const handleRating = (newRating: number) => {
        setRating(newRating);
    };

    const [showConfetti, setShowConfetti] = useState(false);

    const handleAlert = () => {
        Alert.alert(
            "Are you sure?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",

                    onPress: () => {
                        HandleUnlock(order.id);
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 4000); // hide confetti after 3 seconds
                    }
                }
            ]
        );
    };

    const handlePhoneCall = () => {
        Linking.openURL('tel:' + order?.owner?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', ''));
    };

    const handleWhatsApp = () => {
        const url = 'whatsapp://send?phone=' + order?.owner?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', '') + '&text=Hello';
        Linking.openURL(url).catch(() => {
            Alert.alert('Make sure WhatsApp is installed on your device');
        });
    };



    const HandleUnlock = async (id: any) => {
        console.log('id', id);
        
        const token:any = await getToken();
        const newUser:any = await getUser();
      
        if (!token) {
            Alert.alert('You need to login first');
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
                        mutation unlockLead($input: LeadUnlockInput) {
                                unlockLead(input: $input) {
                                    id
                                    title
                                    description
                                    status
                                    images
                                    owner {
                                    id
                                    leads {
                                        id
                                    }
                                    firstName
                                    lastName
                                    phone
                                    imageProfile
                                    }
                                    professionals {
                                    id
                                    text
                                    img
                                    }
                                    artisantUnlockedLead {
                                    id
                                    }
                                    location
                                }
                        }

                        `,
                        variables: {
                            input: {
                                id: id
                            }
                        }

                    }),
                }
            );

            const lead = await res.json();
            
            setIsUnlocked((lead.data.unlockLead?.artisantUnlockedLead || [])?.map((e: any) => e?.id)?.includes(JSON.parse(newUser)?.id));
        } catch (error: any) {
            return Alert.alert(error.message)
        }
    }



    useEffect(() => {
        if (order?.artisantUnlockedLead?.length > 0) {
            setIsUnlocked((order?.artisantUnlockedLead || [])?.map((e: any) => e?.id)?.includes(JSON.parse(user)?.id));
        }
    }, [isUnlocked]);

    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.card}>
                    <Image source={{ uri: order.images?.[0] }} className='w-full h-64' />
                    <View className='p-3'>
                        <Text style={styles.orderId}>{order.title}</Text>
                        <Text >{order.description}</Text>
                        <Text style={styles.label}>Location:</Text>
                        <LocationView navigation={navigation} order={order} />
                    </View>
                    <View className='px-3'>
                        <Text style={styles.label}>Images:</Text>

                        <ScrollView horizontal>
                            {order.images.map((uri: any, index: any) => (
                                <TouchableOpacity key={index} onPress={() => navigation.navigate('ImagePreview', { images: order.images })}>
                                    <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2">
                                        <Image
                                            source={{ uri }}
                                            className="w-24 h-24 rounded-lg"
                                        />
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </View>
                </View>
                <View className="p-3 bg-red">
                    {isUnlocked ? (
                        <TouchableOpacity className='flex-row p-3 justify-between rounded-lg bg-gray-100'>
                            {
                                order?.owner?.imageProfile ? (
                                    <Image source={{ uri: order?.owner?.imageProfile }} className='w-12 h-12 rounded-full' />
                                ) : (
                                    <View className='w-12 h-12 rounded-full bg-gray-400' ></View>
                                )
                            }
                            {/* <View className='w-12 h-12 rounded-full bg-gray-400' ></View> */}
                            <View className='ml-3 flex-grow' >
                                <Text className='font-bold text-left text-sm break-words' >
                                    {order?.owner?.firstName} {order?.owner?.lastName}
                                </Text>
                                <Text className='font-bold text-left text-sm ' >
                                    {order?.owner?.phone}
                                </Text>
                            </View>
                            <View className='flex-row items-center'>
                                <TouchableOpacity onPress={handleWhatsApp} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 mr-1 justify-center items-center rounded-lg'>
                                    <Text className='font-bold text-full text-white' >
                                        <Ionicons name="logo-whatsapp" size={18} />
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handlePhoneCall} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 justify-center items-center rounded-lg'>
                                    <Text className='font-bold text-full text-white' >
                                        <MaterialIcons name="phone" size={18} />
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ) : (


                        order?.artisantUnlockedLead?.length > 0 ?


                            isUnlocked ?
                                <View className="px-3">
                                    <Text className='text-center text-lg font-bold'>You have unlocked this lead
                                    </Text>
                                </View>
                                :
                                <View
                                    // onPress={() => HandleUnlock(order.id)}
                                    className="px-3">
                                    <ButtonPrimary className='mt-3' Loading={false} setLoading={() => { }} onPress={handleAlert} text="Unlock now" />
                                </View>
                            :
                            <View
                                // onPress={() => HandleUnlock(order.id)}
                                className="px-3">
                                <ButtonPrimary className='mt-3' Loading={false} setLoading={() => { }} onPress={handleAlert} text="Unlock now" />
                            </View>


                    )}
                </View>
                <View className='my-20' />
            </ScrollView>
            {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white', // Semi-transparent background
    },
    card: {
        flex: 1,
        backgroundColor: 'white',
        // alignItems: 'center',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end",
        gap: 10,
        width: '80%',
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    orderId: {
        fontSize: 18,
        textAlign: "left",
        fontWeight: 'bold',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
    },
    professionList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    professionItem: {
        marginRight: 12,
        marginBottom: 12,
    },
    professionName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    professionText: {
        fontSize: 12,
        color: 'grey',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },
    locationDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
    },
    map: {
        height: 150,
        borderRadius: 8,
        marginVertical: 8,
    },
});

export default OrderViewerArtisan;
