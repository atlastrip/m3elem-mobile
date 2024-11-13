import React, { useEffect, useState } from 'react'
import { Alert, Switch, Text, TouchableOpacity, View } from 'react-native'
import * as Device from 'expo-device';
import {
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome6
} from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import SetNotificationWithInfoDevice from '@/components/SetNotificationWithInfoDevice';

const NotificationsPage = () => {
    

    const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState<any>({});
    const toggleSwitch = async (name: string) => {
        setIsEnabled((prev: any) => ({ ...prev, [name]: !prev?.[name] }));
        await EditUser(name, !isEnabled?.[name]);
    }


    const Menu2 = [
        {
            name: "Application Push notifications",
            field: "pushUsingAppNotification",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Email",
            field: "pushUsingEmailNotification",
            icon: <MaterialIcons name="email" color="white" size={20} />,
            colorIcon: "blue",
            onPress: () => { }
        },
        {
            name: "Phone",
            field: "pushUsingPhoneNotification",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ]



    const EditUser = async (method: any, status: any) => {
        const token = await getToken();
        const user: any = await getUser();

        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const methods = {
            ...isEnabled,
            [method]: status
        };


        console.log('method', method);


        try {


            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation updatePushNotificationSettings($input: inputUpdatePushNotificationSettings) {
                                updatePushNotificationSettings(input: $input)
                            }
                        `,
                        variables: {
                            input: {
                                ...methods,
                                
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            // console.log('====================================');
            // console.log('json', json);
            // console.log('====================================');
            await getInfo();

        } catch (err) {
            console.log('err', err);

            Alert.alert("Erreur", "Une erreur est survenue lors de la modification de votre compte.");
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
                                user {
                                    id
                                    pushUsingAppNotification
                                    pushUsingEmailNotification
                                    pushUsingPhoneNotification
                                }
                            }
                        `,
                    }),
                }
            );

            const json = await res.json();
            //         setIsEnabled((prev: any) => ({ ...prev, [name]: !prev?.[name] }));
            // console.log('json?.data?.user', json?.data?.user);

            setIsEnabled((prev: any) => ({
                ...prev,
                "pushUsingAppNotification": json?.data?.user?.pushUsingAppNotification,
                "pushUsingEmailNotification": json?.data?.user?.pushUsingEmailNotification,
                "pushUsingPhoneNotification": json?.data?.user?.pushUsingPhoneNotification
            }));

        } catch (err) {
            Alert.alert("Erreur", "Une erreur est survenue lors de la récupération des informations de votre compte.");
        }
    };

    useEffect(() => {
        if (isFocused) {
            getInfo();
        }
    }, [isFocused]);

    const getNotificationsHere = async ()=>{

    }



    return (
        <View className="">

            <View className="my-2">
                <Text className='font-bold text-xl text-center'>Manage notifications</Text>
            </View>
            <SetNotificationWithInfoDevice />

            <View className="px-3">
                {Menu2?.map((menu, idx) => (
                    <View key={idx}
                        style={{ backgroundColor: '#00000010' }}
                        className="rounded-lg  mb-3">
                        <View>
                            <View className="flex-row justify-between p-4 pl-5 ">
                                <View className="flex-row justify-center ">
                                    <View
                                        style={{
                                            backgroundColor: menu.colorIcon,
                                            aspectRatio: 1,
                                        }}
                                        className="p-[1px] rounded-md flex-row items-center justify-center"
                                    >
                                        {menu.icon}
                                    </View>
                                    <Text className="text-base font-bold  text-black ml-4 mt-1">
                                        {menu.name}
                                    </Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={isEnabled?.[menu?.field] ? COLORS.primary : "#f4f3f4"}
                                    ios_backgroundColor="#fef"
                                    onValueChange={() => toggleSwitch(menu?.field)}
                                    value={isEnabled?.[menu?.field]}
                                />
                            </View>
                            {idx !== Menu2.length - 1 && (
                                <View className="flex-row justify-end">
                                    <View className="w-10/12 h-[1px] bg-white/10" />
                                </View>
                            )}
                        </View>
                    </View>
                ))}
            </View>

        </View>
    )
}

export default NotificationsPage