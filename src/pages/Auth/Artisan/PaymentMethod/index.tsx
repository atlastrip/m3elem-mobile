import React, { useState } from 'react'
import { Switch, Text, TouchableOpacity, View } from 'react-native'
import {
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome6
} from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import Constants from 'expo-constants';

const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;


const PaymentMethodPage = () => {

    const [isEnabled, setIsEnabled] = useState<any>({
        "Cash on delivery": true,
    });
    const toggleSwitch = (name: string) => setIsEnabled((v: any) => { return { ...v, [name]: !isEnabled?.[name] || false } });
    const MenuMA = [
        {
            name: "Cash on delivery",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Bank transfer",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Check",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ]
    const MenuUSA = [
        {
            name: "Cash on delivery",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Apple pay",
            icon: <MaterialIcons name="email" color="white" size={20} />,
            colorIcon: "blue",
            onPress: () => { }
        },
        {
            name: "Google pay",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Bank transfer",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Check",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ]
    return (
        <View className="">
            <View className="my-2">
                <Text className='font-bold text-xl text-center'>Manage payment methods</Text>
            </View>

            <View className="px-3">

                {(country === 'ma' ? MenuMA : MenuUSA)?.map((menu, idx) => (
                    <View key={idx}
                        style={{ backgroundColor: '#00000010' }}
                        className="rounded-lg  mb-3">
                        <View>
                            <View className="flex-row justify-between p-4 pl-5">
                                <View className="flex-row">
                                    <Text className="text-lg font-bold  text-black">
                                        {menu.name}
                                    </Text>
                                </View>
                                <Switch
                                    trackColor={{ false: "#767577", true: "white" }}
                                    thumbColor={isEnabled?.[menu?.name] ? COLORS.primary : "#f4f3f4"}
                                    ios_backgroundColor="#fef"
                                    onValueChange={() => toggleSwitch(menu?.name)}
                                    value={isEnabled?.[menu?.name]}
                                />
                            </View>
                            {idx !== (country === 'ma' ? MenuMA : MenuUSA).length - 1 && (
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

export default PaymentMethodPage