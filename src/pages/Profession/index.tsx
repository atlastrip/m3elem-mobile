import { useIsFocused, useRoute } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Image, Text, View } from 'react-native'
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
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
interface TAudio {
    id: string
    name: string
    img: string
}

interface Review {
    id: number;
    user: {
        fullName: string
    }
    comment: string;
    rating: number;
}

const ProfessionPage = ({ navigation }: any) => {
    const { params }: any = useRoute();
    const [Loading, setLoading] = useState(false);
    const [services, setServices] = useState<any>([]);
    const [artisants, setArtisants] = useState<any>([]);
    const profession = params?.profession;
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
    // const city = params.city;
    const [PlayAudio, setPlayAudio] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [LoadingComments, setLoadingComments] = useState(false);
    const [SelectedProfession, setSelectedProfession] = useState<TAudio | null>(null);
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
            variables: { "allAudioCommentsOfAudioId": SelectedProfession?.id }
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
                return setReviews(result?.data?.AllAudioCommentsOfAudio || [])
            })
            .catch((error) => console.error(error));
    }




    const showModal = () => setModalVisible(true);
    const hideModal = () => setModalVisible(false);
    useEffect(() => {
        if (SelectedProfession) {
            scrollToElement(scrollViewRef1, 1)
        }
    }, [SelectedProfession])





    const getServices = async () => {

        const token = await getToken();
        const user: any = await getUser();
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

    const isFocused = useIsFocused();
    const getArtisantsByProfession = async (professionId: string) => {
        const token = await getToken();
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        console.log('====================================');
        console.log('professionId', professionId);
        console.log('====================================');
        try {
            setLoading(true);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                    query getArtisantByProfessinalId($id:String){
                            getArtisantByProfessinalId(id:$id){
                                id
                                firstName
                                lastName
                                imageProfile
                                adress
                                aboutYou
                                images{
                                    id
                                  source
                                }
                                CashOnDeliveryPayment
                                BankTransferPayment
                                CheckPayment
                                professionals{
                                        id
                                text
                                img
                                }
                                phone
                                images{
                                id
                                name
                                source
                                }
                                reviews{
                                id
                                reviewer{
                                    id
                                    firstName
                                    lastName
                                    imageProfile
                                }
                                owner{
                                    id
                                    firstName
                                    lastName
                                    imageProfile
                                }
                                description
                                rating
                                order{
                                    id
                                    title
                                    professionals{
                                    id
                                    text
                                    img
                                    }
                                }
                                }
                            }
                            }

                    `,
                        variables: JSON.stringify({
                            id: professionId
                        }),

                    }),
                }
            );

            const json = await res.json();


            setArtisants(json.data.getArtisantByProfessinalId);
        } catch (err: any) {
            setLoading(false);
            Alert.alert("error", JSON.stringify(err.message, undefined, 2));
            // Alert.alert(json?.detail);
        }
    }



    useEffect(() => {
        getServices();
    }, []);



    useEffect(() => {
        if (SelectedProfession?.id) {
            getArtisantsByProfession(SelectedProfession?.id);
        }
    }
        , [SelectedProfession, isFocused]);


    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View
                style={{
                    width: window.width,
                    height: window.height / 3,
                    maxHeight: 400,
                    backgroundColor: 'white',
                    position: "relative",
                }}
                className='py-10'
            >
                <Image
                    resizeMode='cover'
                    style={{
                        width: window.width,
                        height: window.height / 3,
                        maxHeight: 400,
                    }}
                    source={{ uri: SelectedProfession?.img || "https://thumbs.dreamstime.com/b/blue-green-background-8525790.jpg" }}
                />
                <View className='absolute w-full bottom-3 left-0'>
                    <Motion.Text
                        initial={{
                            fontSize: 40
                        }}
                        animate={{
                            fontSize: SelectedProfession ? 14 : 40
                        }}
                        className='font-bold ml-3  ' >
                        All Categories
                    </Motion.Text>
                    <Motion.Text
                        initial={{
                            fontSize: 0
                        }}
                        animate={{
                            fontSize: SelectedProfession ? 24 : 0
                        }}
                        className=' font-bold ml-3 mb-1  ' >
                        {SelectedProfession?.name}
                    </Motion.Text>
                    <Motion.View
                        initial={{
                            height: 0
                        }}
                        animate={{
                            height: SelectedProfession ? 60 : 0
                        }}
                        className="overflow-hidden px-3"
                    >
                        <ButtonPrimary setLoading={() => { }} onPress={() => navigation.navigate('Order', { profession: [{ text: SelectedProfession?.name, img: SelectedProfession?.img, id: SelectedProfession?.id }] })} Loading={false} text='Create order' />
                    </Motion.View>
                </View>
            </View>
            <ScrollView
                ref={scrollViewRef1}
                snapToInterval={window?.width} // Snaps at each element width
                decelerationRate="fast"
                scrollEnabled={!!SelectedProfession}
                onScroll={(event) => {
                    if (event.nativeEvent.contentOffset.x <= 0) {
                        setSelectedProfession(null)
                    }
                }}

                horizontal>
                <ScrollView className='' style={{ flex: 1, width: window.width }}>
                    {/* <View className="flex flex-wrap flex-row -mx-2"> */}
                    <View className=' pt-6 pb-7 flex-row flex-wrap gap-3 items-center justify-center w-fit ' >

                        {services?.sort((a: any, b: any) => a?.text.toLowerCase().localeCompare(b.text.toLowerCase()))?.map((e, i) => (
                            <TouchableOpacity
                                onPress={() => setSelectedProfession({ name: e.text, img: e.img, id: e.id })}
                                key={i}
                                className={``} >
                                <View className='bg-gray-50 rounded-full items-center justify-center' style={{ width: window.width * .22, height: window.width * .22 }}>
                                    <Image style={{ width: window.width * .13, height: window.width * .13 }} source={{ uri: e.img }} />
                                </View>
                                <Text
                                    style={{ flexWrap: 'wrap', width: window.width * .20 }}
                                    className={`text-sm flex-wrap text-primary-500 font-bold text-center break-words`} >
                                    {e.text.length > 10 ? e.text.slice(0, 6) + "..." : e.text}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView className='' style={{ flex: 1, width: window.width, backgroundColor: 'white' }}>

                    {/* <ScrollView horizontal>
                        {Array(12).fill('').map((e, i) => (
                            <TouchableOpacity
                                key={i}
                                style={{ borderColor: COLORS.primary }}
                                className='m-3 mx-1 p-2 border-2 rounded-full px-3 min-w-[90px]'>
                                <Text className="text-center">
                                    Hello bro
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView> */}
                    {

                        artisants?.map((e: any, i: number) => (

                            <View
                                key={i}
                                className='px-3'>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('ArtisanPage', {
                                        artisan: e,
                                        SelectedProfession
                                    })}
                                    className="flex-row  items-center p-4 bg-white rounded-lg shadow-md my-2">
                                    <Image source={{
                                        uri: e?.images[0]?.source
                                            || "https://thumbs.dreamstime.com/b/blue-green-background-8525790.jpg"

                                    }} className="w-16 h-16 rounded-full mr-4" />
                                    <View className="flex-1">
                                        <Text className="text-lg font-bold">
                                            {
                                                e.firstName + " " + e.lastName
                                            }
                                        </Text>
                                        <Text className="text-gray-600">{
                                            e.professionals.find((p: any) => p.id === SelectedProfession?.id)?.text
                                        }</Text>
                                        {/* <View className="flex-row items-center mt-1">
                                            <Text className="text-blue-600 text-lg font-bold">{`$${"30"}`}</Text>
                                        </View> */}
                                        <View className="flex-row items-center mt-1">
                                            {/* <Text className="text-yellow-500 mr-1">
                                                <Ionicons name="star" color="black" size={24} />
                                            </Text> */}
                                            <Text className="text-gray-600">

                                                {` ${e?.reviews?.filter((review: any) => review?.order?.professionals[0].id === SelectedProfession?.id).length + ' reviews'

                                                    } reviews`}
                                            </Text>
                                        </View>
                                    </View>
                                    {/* <View>
                                        <Text className="text-purple-600">🔖</Text>
                                    </View> */}
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                </ScrollView>
            </ScrollView>


        </View>
    )
}

export default ProfessionPage;

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