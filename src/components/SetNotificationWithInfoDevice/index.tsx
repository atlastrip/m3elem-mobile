import React, { useEffect, useState } from 'react';
import {
    Ionicons,
    MaterialCommunityIcons,
    SimpleLineIcons,
    MaterialIcons,
    FontAwesome6
} from "@expo/vector-icons";
import { Text, View, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import * as Device from 'expo-device';
import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';

interface DeviceInfo {
    brand: string | null;
    modelName: string | null;
    osName: string | null;
    osVersion: string | null;
    deviceName: string | null;
}

const SetNotificationWithInfoDevice: React.FC = () => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
        brand: null,
        modelName: null,
        osName: null,
        osVersion: null,
        deviceName: null,
    });
    const [loading, setLoading] = useState(true);
    const [imageUrl, setImageUrl] = useState<string | null>(null);


    useEffect(() => {
        const fetchImageUrl = async (q = "") => {
            try {
                const response = await fetch(`https://www.jumia.ma/catalog/?q=${q}`);
                const html = await response.text();
                const imgRegex = /data-src="(https:\/\/ma\.jumia\.is\/unsafe\/fit-in[^"]+)"/;
                const match = html.match(imgRegex);
                if (match && match[1]) {
                    setImageUrl(match[1]);
                } else {
                    console.log('No image found');
                }
            } catch (error) {
                console.log('Error fetching image URL:', error);
            }
        };


        const getDeviceInfo = () => {
            setDeviceInfo({
                brand: Device.brand,
                modelName: Device.modelName,
                osName: Device.osName,
                osVersion: Device.osVersion,
                deviceName: Device.deviceName,
            });
            fetchImageUrl(`${Device.brand} ${Device.modelName}`.split(' ').join('+'));

            setLoading(false);
        };

        getDeviceInfo();
    }, []);



    return (
        <View className='p-3  '>

            <View className='p-3 rounded-lg border-gray-200 bg-white '>
                <View className='flex-row justify-between'>

                    <View style={{ maxWidth: WINDOW_WIDTH * .5 }} className=''>
                        <View className='flex-row mb-2'>
                            <View
                                style={{ backgroundColor: "red" }}
                                className="p-[3px] rounded-md flex-row items-center justify-center"
                            >
                                <MaterialIcons name="notifications" color="white" size={20} />
                            </View>
                            <Text className='font-bold text-lg ml-2'>
                                Notification device
                            </Text>
                        </View>
                        <Text style={styles.text}>Brand: {deviceInfo.brand}</Text>
                        <Text style={styles.text}>Model Name: {deviceInfo.modelName}</Text>
                        <Text style={styles.text}>OS Name: {deviceInfo.osName}</Text>
                        <Text style={styles.text}>OS Version: {deviceInfo.osVersion}</Text>
                        <Text style={styles.text}>Device Name: {deviceInfo.deviceName || 'N/A'}</Text>
                    </View>

                    <View>


                        {loading ? (
                            <ActivityIndicator size="large" color="#0000ff" />
                        ) : imageUrl ? (
                            <Image source={{ uri: imageUrl }} style={{
                                width: WINDOW_WIDTH * .4,
                                height: WINDOW_WIDTH * .4,
                            }} />
                        ) : (
                            <View ></View>
                        )}
                    </View>
                </View>
                <View className='border-t-2 py-3 flex-row flex-wrap border-gray-200 text-md mt-3' >
                    <Text>
                        Not your current phone?
                    </Text>
                    <TouchableOpacity>
                        <Text
                            className='text-primary-500 font-bold ml-1'
                        >
                            Use this device
                        </Text>
                    </TouchableOpacity>

                </View>


            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
        marginVertical: 2,
    },
    deviceImage: {
        width: 250,
        height: 250,
        marginTop: 20,
    },
});

export default SetNotificationWithInfoDevice;
