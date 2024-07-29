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

const NotificationsPage = () => {

    const [isEnabled, setIsEnabled] = useState<any>({
        "Application Push notifications": true,
        "Email": false,
        "Phone": false
    });
    const toggleSwitch = (name: string) => setIsEnabled((v: any) => { return { ...v, [name]: !isEnabled?.[name] || false } });
    const Menu2 = [
        {
            name: "Application Push notifications",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Email",
            icon: <MaterialIcons name="email" color="white" size={20} />,
            colorIcon: "blue",
            onPress: () => { }
        },
        {
            name: "Phone",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ]
    return (
        <View className="">
            <View className="my-2">
                <Text className='font-bold text-xl text-center'>Manage notifications</Text>
            </View>

            <View className="px-3">

                {Menu2?.map((menu, idx) => (
                    <View key={idx}
                        style={{ backgroundColor: '#00000010' }}
                        className="rounded-lg  mb-3">
                        <View>
                            <View className="flex-row justify-between p-4 pl-5">
                                <View className="flex-row">
                                    <View
                                        style={{
                                            backgroundColor: menu.colorIcon,
                                            aspectRatio: 1,
                                        }}
                                        className="p-[1px] rounded-md items-center justify-center"
                                    >
                                        {menu.icon}
                                    </View>
                                    <Text className="text-lg font-bold  text-black ml-4">
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