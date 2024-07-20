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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import window from "../../constants/Layout";
import {
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome
} from "@expo/vector-icons";
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { COLORS } from "../../constants/theme";
import { useDispatch } from "react-redux";
import { isLogin, IUser } from "../../store/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVersion } from "@/helpers/GetVersion";
import { useFocusEffect } from "@react-navigation/native";
import { PacksCard } from "../../components/cards/PacksCard";

const Categories = ({ navigation, route }: { navigation: Navigate; route: any }) => {
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
                    <View className="flex-row bg-white rounded-full">
                        <MaterialCommunityIcons name="chevron-left" color='red' size={30} />
                    </View>
                    <View className=" ">
                        <Image source={require('../../assets/png/DeallkhirLogo.png')}
                            style={{ width: 70, height: 35 }}
                            className="" />
                    </View>
                    <View className="">
                        <Image source={require('../../assets/png/private-session.jpg')}
                            className="rounded-full border-black border-2 object-cover"
                            style={{ width: 40, height: 40 }} />
                    </View>
                </TouchableOpacity>

                <View className="bg-slate-100 rounded-lg p-3">
                    <TouchableOpacity
                    >
                        <View className="mt-2 ml-1 flex-row justify-center">
                            <FontAwesome name="book" color={'#007ecd'} size={24} />
                        </View>
                        <View>
                            <Text className="text-xl font-bold text-[#007ecd] text-center p-1">
                                Soutenir l'Education
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View className="mb-3">
                        <Text className="text-gray-500">
                            Les élèves d’aujourd'hui sont les citoyens de demain.
                            Lorsque l'accès à l'éducation et à l'apprentissage s'améliore,
                            les effets d'entraînement sur notre communauté et notre pays seront remarquables.
                            Le soutien des jeunes apprentis est l'un des investissements les plus importants
                            qu'un pays puisse faire pour une future société bien instruite.
                        </Text>
                    </View>
                </View>


            </View>

            <View className="ml-2 p-3">
                <Text className="text-lg font-bold text-blue-950">Projets à soutenir:</Text>
            </View>

            <View className="flex-row justify-center p-2">
                <View
                // refreshControl={
                //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="white" />
                // }
                // horizontal
                >
                    {Card?.map((card, idx) => (
                        <View key={idx}
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
                                    <View
                                        className={` bg-[#007ecd]/70 mt-4 justify-center rounded-2xl flex-row w-52`}
                                    >
                                        <View className="mt-2 ">
                                            <FontAwesome name="book" color='white' size={19} />
                                        </View>
                                        <View>
                                            <Text className="text-lg font-semibold text-white text-start p-1">
                                                Soutenir l'Education
                                            </Text>
                                        </View>
                                    </View>
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
                        </View>
                    ))}
                </View>
            </View>
        </ScrollView>
    );
};

export default Categories;

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
