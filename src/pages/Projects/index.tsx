import {
    ActivityIndicator,
    Alert,
    Button,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Linking,
    Platform,
    RefreshControl,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { Navigate } from "navigation";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import { IPack } from "../Reservation";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import window from "../../constants/Layout";
import {
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
} from "@expo/vector-icons";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../components/cards/PacksCard";

const ProjectDetails = ({ navigation, route }: { navigation: Navigate; route: any }) => {
    const dispatch = useDispatch();
    const [User, setUser] = useState<IUser | null>(null);
    const insets = useSafeAreaInsets();

    useFocusEffect(
        React.useCallback(() => {
            (async () => {
                const user = await AsyncStorage.getItem("@user");
                // @ts-ignore
                console.log({ user: JSON.parse(user) })
                // @ts-ignore
                setUser(JSON.parse(user));
            })();
        }, [])
    );

    useEffect(() => {
        (async () => {
            const user = await AsyncStorage.getItem("@user");
            // @ts-ignore
            setUser(JSON.parse(user));
        })();
    }, []);

    const Menus = [
        {
            name: "À propos",
            icon: <Ionicons name="help" color="white" size={24} />,
            colorIcon: "#007cff",
            onPress: () =>
                navigation.navigate("WebView", {
                    PageName: "À propos",
                    Url: "https://www.pantofit.com/aboutus.html",
                }),
        },
        {
            name: "Conditions d'utilisation",
            icon: (
                <Ionicons name="shield-checkmark-sharp" color="white" size={20} />
            ),
            colorIcon: "#fe2d58",
            onPress: () =>
                navigation.navigate("WebView", {
                    PageName: "Conditions d'utilisation",
                    Url: "https://www.pantofit.com/termsofuse.html",
                }),
        },
        {
            name: "Conditions de vente",
            icon: (
                <MaterialCommunityIcons
                    name="handshake-outline"
                    color="white"
                    size={24}
                />
            ),
            colorIcon: "#5855d6",
            onPress: () =>
                navigation.navigate("WebView", {
                    PageName: "Conditions de vente",
                    Url: "https://www.pantofit.com/termsofsell.html",
                }),
        },
        {
            name: "Gérer votre compte",
            icon: <SimpleLineIcons name="user" color="white" size={20} />,
            colorIcon: "#39c559",
            onPress: () => navigation.navigate("GestionDeCompte"),
        },
    ];

    const Card = [
        {
            title: 'Inspyre.ma',
            description: 'Les miracles existent et c est ainsi que c est produit et que perdure depuis...',
            image: require('../../assets/png/Inspyre.png'),
            icon: <MaterialIcons name="model-training" color="red" size={30} />,
            colorIcon: 'white',
            onPress: () => navigation.navigate('Products'),
        },
        {
            title: 'Inspyre.ma',
            description: 'Les miracles existent et c est ainsi que c est produit et que perdure depuis...',
            image: require('../../assets/png/Inspyre.png'),
            icon: <MaterialIcons name="model-training" color="red" size={30} />,
            colorIcon: 'white',
            onPress: () => navigation.navigate('Products'),
        },
        {
            title: 'Inspyre.ma',
            description: 'Les miracles existent et c est ainsi que c est produit et que perdure depuis...',
            image: require('../../assets/png/Inspyre.png'),
            icon: <MaterialIcons name="model-training" color="red" size={30} />,
            colorIcon: 'white',
            onPress: () => navigation.navigate('Products'),
        },
        {
            title: 'Inspyre.ma',
            description: 'Les miracles existent et c est ainsi que c est produit et que perdure depuis...',
            image: require('../../assets/png/Inspyre.png'),
            icon: <MaterialIcons name="model-training" color="red" size={30} />,
            colorIcon: 'white',
            onPress: () => navigation.navigate('Products'),
        },
    ];

    const showAlert = () =>
        Alert.alert(
            "Se Déconnecter",
            "Voulez vous vraiment se déconnecter ?",
            [
                {
                    text: "Annuler",
                    onPress: () => { },
                    style: "cancel",
                },
                {
                    text: "Déconnexion",
                    onPress: handleLogout,
                    style: "destructive",
                },
            ],
            {
                cancelable: true,
                onDismiss: () => { },
            }
        );
    const [Version, setVersion] = useState(window?.version);
    const [TextSearch, setTextSearch] = useState('');

    useEffect(() => {
        FetchVersion();
    }, []);

    const FetchVersion = async () => {
        const { version, loading } = await getVersion();
        setVersion(version);
        setRefreshing(false);
    };

    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        FetchVersion();
    }, []);

    const handleLogout = () => {
        (async () => {
            await AsyncStorage.removeItem("@token");
            await AsyncStorage.removeItem("@user");
            dispatch(isLogin(false));
        })();
    };


    return (
        <ScrollView style={{ flex: 1 }} className="bg-white text-black">
            <PacksCard navigation={navigation} />
            <View
                style={{ paddingTop: insets?.top + 10, paddingBottom: 10 }}
                className="p-2  justify-start items-center bg-white/5"
            >
                <TouchableOpacity
                    style={{
                        width: window.width * .8
                    }}
                    className="flex-row justify-between mb-5"
                >

                    <View className="flex p-3">
                        <Image source={require('../../assets/png/DeallkhirLogo.png')}
                            style={{ width: 70, height: 35 }}
                            className="" />
                    </View>
                    <View className=" mt-3 ">
                        <Image source={require('../../assets/png/private-session.jpg')}
                            className="rounded-full border-black border-2 object-cover"
                            style={{ width: 40, height: 40 }} />
                    </View>
                </TouchableOpacity>

                <View className="flex-row justify-between items-center w-full ">
                    <View className="flex-row justify-between items-center bg-[#eff8ff] rounded-lg p-2 w-[83%]">
                        <Ionicons
                            name="search"
                            size={24}
                            color="black"
                            style={{
                                paddingHorizontal: 10,
                            }}
                        />
                        <TextInput
                            onChangeText={setTextSearch}
                            placeholderTextColor="#000000"
                            className="text-black text-base justify-end w-full"
                            value={TextSearch}
                            placeholder="Recherche des projets..."
                        />
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('AddProduct');
                        }}
                        className=" justify-between items-center bg-[#eff8ff] rounded-lg p-1 py-2"
                    >
                        <Ionicons
                            name="add"
                            size={24}
                            color="black"
                            style={{
                                paddingHorizontal: 10,
                            }}
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <View className="ml-2 p-3">
                <Text className="text-lg font-bold text-blue-950">Projets à soutenir:</Text>
            </View>

            <TouchableOpacity
                className="flex-row justify-center p-2">
                <View
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
                // }
                // horizontal
                >
                    {Card?.map((card, idx) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("ProjectDetails")}

                            key={idx}
                            style={{
                                width: window.width * .9
                            }}
                            className="m-3 ">
                            <View className="justify-between rounded-3xl shadow-md shadow-gray-200 bg-white">
                                <View className="flex-row justify-between">
                                    <View>
                                        <Text className="text-md font-normal mt-6 text-black ml-4">{card.title}</Text>
                                    </View>
                                    <View style={{ backgroundColor: card.colorIcon }} className="flex items-center mt-5 mr-3 justify-center">
                                        <Ionicons name="heart-outline" color='red' size={24} />
                                    </View>
                                </View>

                                <View className="object-cover mt-3">
                                    <Image source={card.image} style={{ width: '100%', height: 200 }} />
                                </View>
                                <ImageBackground
                                    className="m-1 p-2"
                                >
                                    <TouchableOpacity
                                        className={` bg-sky-300  rounded-2xl flex-row w-52`}
                                    >
                                        <View className="mt-2 ml-1">
                                            <Ionicons name="heart-outline" color='white' size={19} />
                                        </View>
                                        <View>
                                            <Text className="text-lg font-bold text-white text-start p-1">
                                                soutenir l'éducation
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </ImageBackground>
                                <View className=" bg-[#eff8ff] w-full rounded-b-xl">
                                    <View className="">
                                        <Text className="text-lg font-semibold text-blue-950 ml-4">{card.description}</Text>
                                    </View>
                                    <View className="bg-[#eff8ff] w-full">
                                        <Text className="text-[16px] font-normal text-gray-400 ml-4">Donation</Text>
                                    </View>
                                    <View className="bg-[#eff8ff]">
                                        <View style={styles.progressBar}>
                                            <View style={styles.progress} />
                                        </View>
                                    </View>
                                    <TouchableOpacity className="flex-row justify-between bg-[#eff8ff] mb-2 ">
                                        <View className=" ">
                                            <Text className="text-[14px] font-normal text-[#2B61E3] ml-4">59 000 / 100 000 dh</Text>
                                        </View>
                                        <View className="bg-[#eff8ff]">
                                            <Text className="text-[14px] font-normal text-gray-500 mr-4">19 Donateurs</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {idx !== Card.length - 1 && (
                                <View className="flex-row justify-end">
                                    <View className="w-10/12 h-[1px] bg-white/10" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default ProjectDetails;

const styles = StyleSheet.create({
    between: {
        justifyContent: "space-between",
        flexDirection: "row",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
    button: {
        backgroundColor: 'red',
        padding: 5,
        color: 'white',
    },
    progressBar: {
        height: 12,
        borderWidth: 1,
        borderColor: '#FFF',
        backgroundColor: 'white',
        borderRadius: 10,
        margin: 10,
    },
    progress: {
        flex: 1,
        backgroundColor: 'red',
        color: 'red',
        borderRadius: 10,
        zIndex: 10,
        // width: 2,
        height: '100%',
        width: '50%',
    },
});
