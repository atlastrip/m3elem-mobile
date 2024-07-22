import React, { useState, useEffect, useRef, useMemo } from 'react';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import ConfettiCannon from "react-native-confetti-cannon";
import { View, Text, TextInput, Button, TouchableOpacity, Image, FlatList, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons"
import { COLORS } from 'constants/theme';
import { ButtonPrimary } from '@/components/index';
import { useDispatch, useSelector } from 'react-redux';
import { setConfetti } from 'store/User';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { services } from 'constants/data';

const STORAGE_KEY = 'orderFormState';

export default function Order({ route }: any) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [profession, setProfession] = useState<any>([]);
    const [media, setMedia] = useState<any>([]);
    const [locationMethod, setLocationMethod] = useState<'address' | 'zipCode' | 'currentLocation'>();
    const [address, setAddress] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [showMap, setShowMap] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(false);
    const [currentLocation, setCurrentLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const bottomSheetModalRef = useRef<any>(null);

    const openBottomSheet = () => {
        setSearch('')
        bottomSheetModalRef.current?.present();
    };
    const insets = useSafeAreaInsets();

    useEffect(() => {
        // Load saved state on mount
        const loadSavedState = async () => {
            const savedState = await AsyncStorage.getItem(STORAGE_KEY);
            if (savedState) {
                Alert.alert(
                    'Saved State',
                    'You have a saved state. Do you want to load it?',
                    [
                        {
                            text: 'No',
                            onPress: () => clearState(),
                            style: 'cancel',
                        },
                        {
                            text: 'Yes',
                            onPress: () => restoreState(savedState),
                        },
                    ],
                    { cancelable: false }
                );
            }
        };

        loadSavedState();
    }, []);

    // Save state to AsyncStorage
    const saveState = async () => {
        const state = {
            title,
            description,
            date,
            time,
            media,
            locationMethod,
            address,
            professions,
            zipCode,
            profession
        };
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    };

    // Restore state from AsyncStorage
    const restoreState = (savedState: string) => {
        const state = JSON.parse(savedState);
        setTitle(state.title);
        setDescription(state.description);
        setDate(new Date(state.date));
        setTime(new Date(state.time));
        setMedia(state.media);
        setProfessions(state.professions);
        setLocationMethod(state.locationMethod);
        setAddress(state.address);
        setZipCode(state.zipCode);
        bottomSheetModalRef.current?.close();
    };

    // Clear state from AsyncStorage
    const clearState = async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
    };

    // Update state and save to AsyncStorage
    const handleStateChange = async (newState: any, setState: React.Dispatch<React.SetStateAction<any>>) => {
        setState(newState);
        saveState();
    };

    const pickMedia = async () => {
        const result: any = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result?.cancelled) {
            handleStateChange([...media, ...result.assets], setMedia);
        }
    };

    const [showDatePicker, setShowDatePicker] = useState(false);


    const removeMedia = (uri: string) => {
        handleStateChange(media.filter((item: any) => item.uri !== uri), setMedia);
    };

    const moveMedia = (index: number, direction: 'left' | 'right') => {
        const newMedia = [...media];
        if (direction === 'left' && index > 0) {
            [newMedia[index - 1], newMedia[index]] = [newMedia[index], newMedia[index - 1]];
        } else if (direction === 'right' && index < newMedia.length - 1) {
            [newMedia[index + 1], newMedia[index]] = [newMedia[index], newMedia[index + 1]];
        }
        handleStateChange(newMedia, setMedia);
    };

    const handleDateChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false); // Hide date picker
        handleStateChange(currentDate, setDate);
    };

    const handleTimeChange = (event: any, selectedDate: any) => {
        const currentDate = selectedDate || time;
        setShowDatePicker(false); // Hide date picker
        handleStateChange(currentDate, setTime);
    };


    const handleLocationMethod = async (method: 'address' | 'zipCode' | 'currentLocation') => {
        if (method === 'currentLocation') {
            Alert.alert(
                'Use Current Location',
                'We will use your current location to find you.',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: async () => {
                            setLocationMethod(method);
                            try {
                                setLoadingLocation(true); // Start loading indicator
                                const { status } = await Location.requestForegroundPermissionsAsync();
                                if (status === 'granted') {
                                    const { coords } = await Location.getCurrentPositionAsync({
                                        accuracy: Location.Accuracy.Balanced
                                    });
                                    setCurrentLocation({ latitude: coords.latitude, longitude: coords.longitude });
                                    setShowMap(true); // Show map with current location
                                } else {
                                    // Handle permission denied scenario
                                    Alert.alert('Permission Denied', 'Please grant location permission to use this feature.');
                                }
                            } catch (error) {
                                console.error('Error fetching current location:', error);
                                Alert.alert('Error', 'An error occurred while fetching your current location.');
                            } finally {
                                setLoadingLocation(false); // Stop loading indicator
                            }
                        },
                    },
                ],
                { cancelable: false }
            );
        } else {
            setLocationMethod(method);
            setShowMap(false); // Clear map display if not using current location
        }
    };
    const params = route?.params;
    const pros = params?.profession;
    const [professions, setProfessions] = useState([]);
    useEffect(() => {
        setProfessions(pros || []);
    }, [pros])
    const dispatch = useDispatch();
    const state = useSelector((state: any) => state?.user?.confetti);
    const [Search, setSearch] = useState("");
    // Define snap points
    const snapPoints = useMemo(() => ['50%', "80%"], []);
    useEffect(() => {
        if (!!!professions?.length) {
            openBottomSheet()
        }
    }, [professions])
    
    const scrollViewRef = useRef<any>(null)
    const scrollToEnd = () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
    };

    return (
        <GestureHandlerRootView >
            <BottomSheetModalProvider>
                <KeyboardAwareScrollView style={{ position: "relative", flex: 1, paddingTop: insets.top + 10, backgroundColor: "white" }}>
                    <View className="relative flex-1 p-4 bg-white">
                        {(state) && (
                            <ConfettiCannon
                                onAnimationEnd={() =>
                                    setTimeout(() => {
                                        dispatch(setConfetti(false));
                                    }, 2000)
                                }

                                count={200}
                                origin={{ x: 0, y: 0 }}
                            />
                        )}

                        <View className="mb-4">
                            <View className='flex-row items-center justify-between'>
                                <Text className="text-xl font-bold mb-2">Selected professionals</Text>
                                <TouchableOpacity
                                    style={{ backgroundColor: COLORS.primary }}
                                    onPress={openBottomSheet}
                                    className='py-2 rounded-full px-3'>
                                    <Text className="text-white font-bold">
                                        {!!!professions ? "Add professional" : "Change"}


                                    </Text>
                                </TouchableOpacity>

                            </View>
                            <ScrollView horizontal
                                ref={scrollViewRef}

                            >

                                {(professions || [])?.sort((a: any, b: any) => a?.text.toLowerCase().localeCompare(b.text.toLowerCase()))?.map((e: any, i: any) => (
                                    <TouchableOpacity
                                        // onPress={() => setSelectedProfession({ name: e.text, img: e.img, id: e.id })}
                                        key={i}
                                        className={` p-1 min-w-[100px] `} >
                                        <View className='p-3 flex-row items-center justify-center w-fit shadow-sm bg-white border-primary-500/20 border-2 rounded-md  px-5 '>
                                            <Image style={{ width: 50, height: 50 }} resizeMode='contain' source={{ uri: e.img }} />
                                            <Text className={`text-lg text-primary-500 font-bold text-center`} >
                                                {e.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                        <View className="mb-4">
                            <Text className="text-xl font-bold mb-2">Information</Text>
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold mb-2">Add title:</Text>
                            <TextInput
                                placeholderTextColor="black"
                                className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                placeholder="Enter title"
                                value={title}
                                onChangeText={(text) => handleStateChange(text, setTitle)}
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold mb-2">Add description:</Text>
                            <TextInput
                                placeholderTextColor="black"
                                className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                placeholder="Enter description"
                                value={description}
                                onChangeText={(text) => handleStateChange(text, setDescription)}
                                multiline
                            />
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold mb-2">When:</Text>
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)} // Show date picker
                                className="text-black bg-gray-600 placeholder:text-black border border-black/25 w-full rounded-lg text-xl p-1 mb-3 flex-row"
                            >
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display="default"
                                    textColor='black'
                                    onChange={handleDateChange}
                                // isVisible={showDatePicker} // Control visibility based on state
                                />
                                <DateTimePicker
                                    mode="time"
                                    value={time}
                                    display="default"
                                    textColor='black'
                                    onChange={handleTimeChange}
                                // isVisible={showDatePicker} // Control visibility based on state
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="mb-4">
                            <Text className="text-base font-semibold mb-2">How do you want us to find you?</Text>
                            <View className="flex-row justify-between mb-4">
                                <TouchableOpacity
                                    onPress={() => handleLocationMethod('address')}
                                    style={[styles.locationButton, locationMethod === 'address' && styles.selectedLocation]}
                                >
                                    <MaterialCommunityIcons size={32} color={locationMethod === 'address' ? "white" : "black"} name="home-map-marker" />
                                    <Text
                                        style={{ color: locationMethod === 'address' ? "white" : "black" }}

                                        className="text-center">Use Address</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleLocationMethod('zipCode')}
                                    style={[styles.locationButton, locationMethod === 'zipCode' && styles.selectedLocation]}
                                >
                                    <MaterialCommunityIcons size={32} color={locationMethod === 'zipCode' ? "white" : "black"} name="map-marker-radius-outline" />

                                    <Text

                                        style={{ color: locationMethod === 'zipCode' ? "white" : "black" }}
                                        className="text-center">Use Zip Code</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => handleLocationMethod('currentLocation')}
                                    style={[styles.locationButton, locationMethod === 'currentLocation' && styles.selectedLocation]}
                                >
                                    <MaterialIcons size={32} name="my-location" color={locationMethod === 'currentLocation' ? "white" : "black"} />

                                    <Text
                                        style={{ color: locationMethod === 'currentLocation' ? "white" : "black" }}
                                        className="text-center">Use Current Location</Text>
                                </TouchableOpacity>
                            </View>

                            {locationMethod === 'address' && (
                                <TextInput
                                    placeholderTextColor="black"
                                    className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChangeText={(text) => handleStateChange(text, setAddress)}
                                />
                            )}

                            {locationMethod === 'zipCode' && (
                                <TextInput
                                    placeholderTextColor="black"
                                    className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                    placeholder="Enter your zip code"
                                    value={zipCode}
                                    onChangeText={(text) => handleStateChange(text, setZipCode)}
                                />
                            )}

                            {locationMethod === 'currentLocation' && loadingLocation && (
                                <ActivityIndicator size="large" color="black" style={{ marginTop: 10 }} />
                            )}

                            {locationMethod === 'currentLocation' && !loadingLocation && showMap && currentLocation && (
                                <View style={styles.mapContainer}>
                                    <MapView
                                        scrollEnabled={false}
                                        style={styles.map} initialRegion={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                        <Marker coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }} title="My Location" />
                                    </MapView>
                                </View>
                            )}
                        </View>

                        <View className="mt-4">
                            <Text className="text-base font-semibold mb-2">Add media:</Text>
                            <FlatList
                                data={media}
                                horizontal
                                keyExtractor={(item) => item.uri}
                                renderItem={({ item, index }) => (
                                    <View className="relative rounded-md overflow-hidden w-40 h-40 mr-2">
                                        {item.type.startsWith('image') ? (
                                            <Image source={{ uri: item.uri }} className="w-full h-full" resizeMode="cover" />
                                        ) : (
                                            <Video
                                                source={{ uri: item.uri }}
                                                style={{ width: '100%', height: '100%' }}
                                                // @ts-ignore
                                                resizeMode="cover"
                                                useNativeControls
                                            />
                                        )}
                                        <View style={styles.iconContainer}>
                                            {index > 0 && (
                                                <TouchableOpacity onPress={() => moveMedia(index, 'left')} className='p-1 rounded-full bg-black/20' style={styles.leftArrow}>
                                                    <Ionicons name="arrow-back-circle" size={24} color="white" />
                                                </TouchableOpacity>
                                            )}
                                            {index < media.length - 1 && (
                                                <TouchableOpacity onPress={() => moveMedia(index, 'right')} className='p-1 rounded-full bg-black/20' style={styles.rightArrow}>
                                                    <Ionicons name="arrow-forward-circle" size={24} color="white" />
                                                </TouchableOpacity>
                                            )}
                                            <TouchableOpacity
                                                className='p-1 rounded-full bg-white/80'
                                                onPress={() => removeMedia(item.uri)}
                                            >
                                                <Ionicons name="close-circle" size={24} color="red" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                )}
                            />
                            {!media.length ? (

                                <TouchableOpacity
                                    onPress={pickMedia}
                                    className='border-dashed items-center justify-center  w-40 h-40  border-2 rounded-md border-primary-500' >
                                    <Text className='text-xl text-primary-500'>+</Text>
                                </TouchableOpacity>
                            ) : (
                                <View className='flex-row justify-end' >
                                    <Button

                                        title="Add New Media" onPress={pickMedia} />
                                </View>
                            )}
                        </View>
                    </View>
                    <View className='px-3'>

                        <ButtonPrimary
                            onPress={
                                () => dispatch(setConfetti(true))
                            }
                            setLoading={() => { }}
                            text='Create order'
                        />
                    </View>
                    <View className='my-20' />
                    <BottomSheetModal
                        snapPoints={snapPoints}
                        style={{ borderTopColor: "gray", borderTopWidth: 2 }}
                        ref={bottomSheetModalRef}>
                        <Text className='text-lg font-bold text-center'>
                            Professions
                        </Text>
                        <View className='px-3'>
                            <TextInput
                                placeholderTextColor="black"
                                className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                placeholder="Search..."
                                value={Search}
                                onChangeText={(v) => setSearch(v)}
                            />
                        </View>
                        <ScrollView style={{ backgroundColor: 'white', paddingHorizontal: 16 }}>
                            <View className="flex flex-wrap flex-row -mx-2">
                                {services?.filter(e => e.text?.toLowerCase().includes(Search?.toLowerCase()))?.sort((a, b) => a?.text.toLowerCase().localeCompare(b.text.toLowerCase()))?.map((e, i) => (
                                    <TouchableOpacity
                                        // onPress={() => setSelectedProfession({ name: e.text, img: e.img, id: e.id })}
                                        key={i}

                                        className={`w-1/2 p-1 min-w-[100px]`}
                                        onPress={() => {
                                            handleStateChange((() => {
                                                if (professions?.map((el: any) => el.text)?.includes(e.text)) {
                                                    return professions.filter((el: any) => el.text !== e.text);
                                                } else {
                                                    return [...professions, e]
                                                }
                                            })(), setProfessions)

                                        }}
                                    >
                                        <View
                                            style={{
                                                backgroundColor: professions?.map((e: any) => e.text).includes(e.text) ? COLORS.primary + 20 : 'white'
                                            }}
                                            className='p-3 shadow-sm border-primary-500/20 border-2 rounded-md  px-5 '>
                                            <Image style={{ width: "100%", height: 120 }} resizeMode='contain' source={{ uri: e.img }} />
                                            <Text className={`text-lg text-primary-500 font-bold text-center`} >
                                                {e.text}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </ScrollView>
                    </BottomSheetModal>
                </KeyboardAwareScrollView>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    locationButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    selectedLocation: {
        backgroundColor: COLORS.primary,
    },
    mapContainer: {
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        overflow: 'hidden',
        marginTop: 10,
    },
    map: {
        flex: 1,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    leftArrow: {
        marginRight: 5,
    },
    rightArrow: {
        marginRight: 5,
    },
    closeButton: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 2,
    },
});
