import React, { useMemo, useRef, useState } from 'react'
import { Alert, Platform, Text } from 'react-native';
import { TouchableOpacity, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import { BottomSheetModal, BottomSheetModalProvider, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';



const MapViewArtisan = ({ route, navigation }: any) => {
    const { marker } = route.params;
    const snapPoints = useMemo(() => [300, '50', '80'], []);
    const bottomSheetModalRef = useRef<any>(null);

    const openBottomSheet = () => {
        bottomSheetModalRef.current?.present();
    };
    const closeBottomSheet = () => {
        bottomSheetModalRef.current?.close();
    };

    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);

    const openMaps = () => {
        const url = Platform.OS === 'ios' ? 'maps://app' : 'geo:0,0';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Maps is not supported on this device');
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openGoogleMaps = () => {
        const url = 'https://www.google.com/maps';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Google Maps is not supported on this device');
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    const openWaze = () => {
        const url = 'waze://';
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Waze is not installed on this device');
                }
            })
            .catch((err) => console.error('An error occurred', err));
    };

    return (
        <GestureHandlerRootView >
            <BottomSheetModalProvider>
                <View style={{ flex: 1 }}>
                    <MapView
                        initialRegion={{ latitude: marker?.latitude, longitude: marker?.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
                        style={{ flex: 1 }} >
                        <Marker coordinate={{ latitude: marker?.latitude, longitude: marker?.longitude }} title="My Location" />
                    </MapView>
                    <View className='absolute bottom-6 flex-row justify-center w-full'>
                        <View className='bg-white flex-row justify-center rounded-full p-2'>
                            <TouchableOpacity
                                onPress={openBottomSheet}
                                className='p-3 rounded-full bg-primary-500' >
                                <Text className='text-white text-xl font-bold px-3'>
                                    Navigation
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.goBack()}
                                className='p-3 ml-3 rounded-full border-primary-500 border-2' >
                                <Text className='text-primary-500 text-xl font-bold px-3'>
                                    back
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <BottomSheetModal
                    snapPoints={snapPoints}
                    style={{}}
                    ref={bottomSheetModalRef}>
                    <View className='px-3'>

                        <TouchableOpacity
                            onPress={openMaps}
                            className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100'>
                            <Text className='text-lg font-bold'>
                                Plans
                            </Text>
                            <Ionicons name="chevron-forward" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={openGoogleMaps}
                            className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100'>
                            <Text className='text-lg font-bold'>
                                Google maps
                            </Text>
                            <Ionicons name="chevron-forward" size={20} />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={openWaze}
                            className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100'>
                            <Text className='text-lg font-bold'>
                                Waze
                            </Text>
                            <Ionicons name="chevron-forward" size={20} />
                        </TouchableOpacity>
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView >
    )
}

export default MapViewArtisan