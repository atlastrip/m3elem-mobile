import { useRoute } from '@react-navigation/native';
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from 'react'
import { Button, Image, Text, View } from 'react-native'
import { ScrollView } from 'react-native';
import window from "../../constants/Layout";
import { TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import PlayButton from '@/components/PlayButton';
import { Motion } from '@legendapp/motion';
import { COLORS } from 'constants/theme';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import MapView, { Marker } from 'react-native-maps';
import { ButtonPrimary } from '@/components/index';
import ReviewModal from './rating';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { isLogin } from 'store/User';

interface TAudio {
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

const AudioDistanceCalculator = ({ audioUrl }: { audioUrl: string }) => {


    const [WalkingSpeedKmph, setWalkingSpeedKmph] = useState(1.4);
    const [audioDuration, setAudioDuration] = useState(null);
    const [distanceCovered, setDistanceCovered] = useState(null);

    const downloadAndMeasureAudio = async () => {
        try {
            // Download the audio file to a temporary directory
            const downloadResumable = FileSystem.createDownloadResumable(
                audioUrl,
                FileSystem.documentDirectory + 'audio.mp3'
            );
            // @ts-ignore
            const { uri } = await downloadResumable.downloadAsync();

            // Load the downloaded audio file
            const soundObject = new Audio.Sound();
            await soundObject.loadAsync({ uri });

            // Get duration of the audio in milliseconds
            const status = await soundObject.getStatusAsync();
            // @ts-ignore
            const durationMillis = status.durationMillis;
            let durationOutput;
            if (durationMillis < 60000) {
                durationOutput = `${(durationMillis / 1000).toFixed(0)} seconds`;
            } else {
                const durationMinutes = durationMillis / 60000;
                durationOutput = `${durationMinutes.toFixed(2)} minutes`;
            }
            // @ts-ignore
            setAudioDuration(durationOutput);

            // Calculate distance covered while listening
            const distance = (WalkingSpeedKmph) * (durationMillis / (60 * 1000) * .1); // Convert millis to minutes
            let distanceOutput;
            if (distance < 1) {
                distanceOutput = `${(distance * 1000).toFixed(0)} meters`;
            } else {
                distanceOutput = `${distance.toFixed(2)} kilometers`;
            }

            // @ts-ignore
            setDistanceCovered(distanceOutput);

            // Clean up: Unload the sound object and delete the downloaded file
            await soundObject.unloadAsync();
            await FileSystem.deleteAsync(uri);
        } catch (error) {
            console.error('Error downloading or calculating:', error);
        }
    };


    useEffect(() => {
        downloadAndMeasureAudio();
    }, [WalkingSpeedKmph])



    return (
        <View className='mb-2 pb-2 border-b-2 border-solid border-gray-100'>
            {audioDuration !== null && distanceCovered !== null ? (
                <View className='flex-row  justify-between items-center my-2'>
                    <Text className='text-lg max-w-[85%]'>
                        You can enjoy the audio for {audioDuration} while {WalkingSpeedKmph === 1.4 ? 'walking' : 'jogging'} {distanceCovered} at {WalkingSpeedKmph} km/h.
                    </Text>

                    <TouchableOpacity
                        onPress={() => setWalkingSpeedKmph(v => v === 1.4 ? 2 : 1.4)}
                    >
                        <MaterialIcons size={40} name={WalkingSpeedKmph === 1.4 ? 'directions-walk' : 'directions-run'} />

                    </TouchableOpacity>
                </View>
            ) : (
                <ActivityIndicator className='mt-3' />
            )}
        </View>
    );
}

interface Review {
    id: number;
    user: {
        fullName: string
    }
    comment: string;
    rating: number;
}

const CityPage = ({ navigation }: any) => {
    const { params }: any = useRoute();
    const dispatch = useDispatch();
    const handleLogout = () => {
        (async () => {
            await AsyncStorage.removeItem("@token");
            await AsyncStorage.removeItem("@user");
            dispatch(isLogin(false));
        })();
    };
    const [IsConnected, setIsConnected] = useState<boolean | null>(null);
    const HandleConnected = async () => {
        const UserFromAsyncStorage = await AsyncStorage.getItem("@user");
        const ParsedUser: any = await JSON.parse(UserFromAsyncStorage || "");
        // @ts-ignore
        setIsConnected(!!ParsedUser?.phone)
    }
    useEffect(() => {
        HandleConnected();
    }, [params])
    const city = params.city;
    const [PlayAudio, setPlayAudio] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [LoadingComments, setLoadingComments] = useState(false);
    const [SelectedAudio, setSelectedAudio] = useState<TAudio | null>(null);
    const scrollViewRef1 = useRef<any>(null);
    const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: elementIndex * window.width, animated: true });
        }
    };
    const [Tab, setTab] = useState("about");
    const [Reviews, setReviews] = useState<any>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    const addReview = (newReview: Omit<Review, 'id'>) => {
        // @ts-ignore
        setReviews([...Reviews, { id: String(Reviews.length + 1), ...newReview }]);
    };
    const getComments = async () => {
        setLoadingComments(true)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const graphql = JSON.stringify({
            query: "\r\nquery AllAudioCommentsOfAudio($allAudioCommentsOfAudioId: ID!) {\r\n  AllAudioCommentsOfAudio(id: $allAudioCommentsOfAudioId) {\r\n    user {\r\n    id\r\n    fullName  \r\n    }\r\n    rating\r\n    id\r\n    comment\r\n  }\r\n}",
            variables: { "allAudioCommentsOfAudioId": SelectedAudio?.id }
        })
        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: graphql,
        };

        fetch("https://m3elem-app-ecj9f.ondigitalocean.app/m3elem", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setLoadingComments(false)
                console.log({ rev: result?.data?.AllAudioCommentsOfAudio })
                return setReviews(result?.data?.AllAudioCommentsOfAudio || [])
            })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        getComments();
    }, [SelectedAudio?.id])

    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);


    return (
        <View style={{ flex: 1 }}>
            <View
                style={{
                    width: window.width,
                    height: window.height / 3,
                    maxHeight: 400,
                    backgroundColor: 'black',
                    position: "relative"
                }}>
                <Image
                    style={{
                        width: window.width,
                        height: window.height / 3,
                        maxHeight: 400,
                        opacity: 0.6,
                    }}
                    source={{ uri: city?.images[0] || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }}
                />
                <View className='absolute w-full bottom-3 left-0'>
                    <Motion.Text
                        initial={{
                            fontSize: 40
                        }}
                        animate={{
                            fontSize: SelectedAudio ? 14 : 40
                        }}
                        className='font-bold ml-3 text-white ' >
                        {city?.city}
                    </Motion.Text>
                    <Motion.Text
                        initial={{
                            fontSize: 0
                        }}
                        animate={{
                            fontSize: SelectedAudio ? 24 : 0
                        }}
                        className=' font-bold ml-3 text-white ' >
                        {SelectedAudio?.name}
                    </Motion.Text>
                    <Motion.View
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: SelectedAudio ? 110 : 0
                        }}
                        className="overflow-hidden px-3"
                    >
                        {SelectedAudio && (
                            <PlayButton
                                isPlaying={isPlaying}
                                setIsPlaying={setIsPlaying}
                                url={
                                    SelectedAudio.audio
                                } />
                        )}
                    </Motion.View>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef1}
                snapToInterval={window?.width} // Snaps at each element width
                decelerationRate="fast"
                scrollEnabled={!!SelectedAudio}
                onScroll={(event) => {
                    if (event.nativeEvent.contentOffset.x <= 0) {
                        setSelectedAudio(null)
                    }
                }}
                horizontal>
                <ScrollView className='px-3' style={{ flex: 1, width: window.width }}>
                    {city?.audios?.map((audio: TAudio, i: number) => (
                        <TouchableOpacity
                            key={i}
                            onPress={() => {
                                setSelectedAudio(audio);
                                scrollToElement(scrollViewRef1, 1)
                            }}
                            className='flex-row mt-3'>
                            <View 
                            style={{backgroundColor : COLORS.primary }}
                            className='rounded-md w-20 h-20 relative justify-center items-center mr-2 '>
                                <Image className='object-center opacity-40 object-cover w-full h-full absolute' source={{ uri: audio?.image || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
                                <AntDesign name={"play"} size={24} className='shadow-lg' color={"#ffffff"} />
                            </View>
                            <View >
                                <Text className='text-lg font-bold' >
                                    {audio?.name}
                                </Text>
                                <Text
                                    className='max-w-[80%] max-h-10 truncate'
                                >
                                    {audio?.description}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
                <ScrollView className='px-3' style={{ flex: 1, width: window.width, backgroundColor: 'white' }}>
                    {!!SelectedAudio && (
                        <View >
                            <View className='flex-row'>
                                <TouchableOpacity
                                    onPress={() => setTab('about')}
                                    className='border-solid border-b-2'
                                    style={{ width: window.width / 2.1, padding: 10, borderBottomColor: Tab === 'about' ? COLORS.primary : '#00000010' }}
                                >
                                    <Text
                                        style={{ color: COLORS.primary }}
                                        className='text-lg font-bold text-center ' >
                                        About
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => setTab('other')}
                                    className='border-solid border-b-2'
                                    style={{ width: window.width / 2.1, padding: 10, borderBottomColor: Tab !== 'about' ? COLORS.primary : '#00000010' }}
                                >
                                    <Text
                                        style={{ color: COLORS.primary }}
                                        className='text-lg font-bold text-center ' >
                                        Before You Go
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {Tab === 'about' ? (
                                <View >
                                    <Text className='font-bold text-lg my-3'>
                                        {SelectedAudio?.name}
                                    </Text>
                                    <Image
                                        style={{
                                            aspectRatio: 1.2
                                        }}
                                        className='w-full rounded-lg border-2 border-gray-100'
                                        source={{
                                            uri: SelectedAudio?.image || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif"
                                        }}
                                    />
                                    <View className='mb-20'>
                                        <Text className='font-bold text-lg my-3'>
                                            About the place
                                        </Text>
                                        <Text className='text-md'>{SelectedAudio?.description}</Text>
                                    </View>
                                </View>
                            ) : (
                                <View >
                                    <AudioDistanceCalculator audioUrl={SelectedAudio?.audio} />
                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('MapView', { audio: SelectedAudio })}
                                    >
                                        <MapView
                                            scrollEnabled={false}
                                            style={{
                                                height: 200,
                                                borderRadius: 10
                                            }}
                                            initialRegion={{
                                                latitude: +SelectedAudio?.latitude || 37.78825,
                                                longitude: +SelectedAudio?.longitude || -122.4324,
                                                latitudeDelta: 0.0922,
                                                longitudeDelta: 0.0421,
                                            }}
                                        >
                                            <Marker
                                                coordinate={{
                                                    latitude: +SelectedAudio?.latitude,
                                                    longitude: +SelectedAudio?.longitude,
                                                }}>
                                                <Image style={{
                                                    width: 40,
                                                    height: 40,
                                                }} source={require('../Auth/Home/Images/marker.png')} />
                                            </Marker>
                                        </MapView>
                                    </TouchableOpacity>
                                    <View className='mt-3 pt-3 border-t-2 border-gray-200'>
                                        <Text
                                            className='text-lg font-bold' >
                                            Comments and reviews
                                        </Text>
                                        {LoadingComments &&
                                            (<View className='items-center my-10'>
                                                <ActivityIndicator />
                                            </View>)
                                        }
                                        {(!LoadingComments && Reviews.length === 0) &&
                                            (<View className='items-center my-10'>
                                                <Text className='text-lg '>
                                                    No reviews yet, add yours now
                                                </Text>
                                            </View>)
                                        }

                                        {Reviews?.map((e: any, i: any) => (
                                            <View key={i} className='flex-row gap-3  mb-3'>
                                                <View 
                                                style={{ backgroundColor : COLORS.primary }}
                                                className='w-10 h-10 rounded-full  justify-center items-center' >
                                                    <Text className='font-bold capitalize text-md text-white'>
                                                        {e.user.fullName[0]}
                                                    </Text>
                                                </View>
                                                <View className='p-2 rounded-md border-2 w-[70%] border-gray-100'>
                                                    <Text className=' font-bold'>
                                                        {e.user.fullName}
                                                    </Text>
                                                    <View className='flex-row'>
                                                        {Array(+e.rating).fill('').map((e, i) => (
                                                            <View key={i}>
                                                                <AntDesign name="star" color={COLORS.primary} size={24} />
                                                            </View>
                                                        ))}
                                                    </View>
                                                    <Text className='text-lg'>
                                                        {e.comment}
                                                    </Text>
                                                </View>
                                            </View>
                                        ))}
                                        {/* @ts-ignore */}
                                        <ReviewModal visible={modalVisible} onDismiss={hideModal} onSubmitReview={addReview} audioId={SelectedAudio.id} />
                                        {IsConnected ? (
                                            <View className='mb-20' >
                                                <ButtonPrimary Loading={false} setLoading={() => { }} text='Add my review' onPress={showModal} />
                                            </View>
                                        ) : (
                                            <View className='mb-20' >
                                                <ButtonPrimary Loading={false} setLoading={() => { }} text='Connect to add review' onPress={() => handleLogout()} />
                                            </View>

                                        )}
                                    </View>

                                </View>
                            )}


                        </View>
                    )}
                </ScrollView>
            </ScrollView>


        </View>
    )
}

export default CityPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#1DB954',
        borderRadius: 50,
        padding: 20,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        marginTop: 10,
        fontSize: 16,
        color: '#1DB954',
    },
});