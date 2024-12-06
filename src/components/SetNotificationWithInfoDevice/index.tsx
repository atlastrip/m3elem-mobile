// import React, { useEffect, useState } from 'react';
// import {
//     Ionicons,
//     MaterialCommunityIcons,
//     SimpleLineIcons,
//     MaterialIcons,
//     FontAwesome6
// } from "@expo/vector-icons";
// import { Text, View, Image, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
// import * as Device from 'expo-device';
// import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';

// interface DeviceInfo {
//     brand: string | null;
//     modelName: string | null;
//     osName: string | null;
//     osVersion: string | null;
//     deviceName: string | null;
// }

// const SetNotificationWithInfoDevice: React.FC = () => {
//     const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
//         brand: null,
//         modelName: null,
//         osName: null,
//         osVersion: null,
//         deviceName: null,
//     });
//     const [loading, setLoading] = useState(true);
//     const [imageUrl, setImageUrl] = useState<string | null>(null);


//     useEffect(() => {
//         const fetchImageUrl = async (q = "") => {
//             try {
//                 const response = await fetch(`https://www.jumia.ma/catalog/?q=${q}`);
//                 const html = await response.text();
//                 const imgRegex = /data-src="(https:\/\/ma\.jumia\.is\/unsafe\/fit-in[^"]+)"/;
//                 const match = html.match(imgRegex);
//                 if (match && match[1]) {
//                     setImageUrl(match[1]);
//                 } else {
//                     console.log('No image found');
//                 }
//             } catch (error) {
//                 console.log('Error fetching image URL:', error);
//             }
//         };


//         const getDeviceInfo = () => {
//             setDeviceInfo({
//                 brand: Device.brand,
//                 modelName: Device.modelName,
//                 osName: Device.osName,
//                 osVersion: Device.osVersion,
//                 deviceName: Device.deviceName,
//             });
//             fetchImageUrl(`${Device.brand} ${Device.modelName}`.split(' ').join('+'));

//             setLoading(false);
//         };

//         getDeviceInfo();
//     }, []);



//     return (
//         <View className='p-3  '>

//             <View className='p-3 rounded-lg border-gray-200 bg-white '>
//                 <View className='flex-row justify-between'>

//                     <View style={{ maxWidth: WINDOW_WIDTH * .5 }} className=''>
//                         <View className='flex-row mb-2'>
//                             <View
//                                 style={{ backgroundColor: "red" }}
//                                 className="p-[3px] rounded-md flex-row items-center justify-center"
//                             >
//                                 <MaterialIcons name="notifications" color="white" size={20} />
//                             </View>
//                             <Text className='font-bold text-lg ml-2'>
//                                 Notification device
//                             </Text>
//                         </View>
//                         <Text style={styles.text}>Brand: {deviceInfo.brand}</Text>
//                         <Text style={styles.text}>Model Name: {deviceInfo.modelName}</Text>
//                         <Text style={styles.text}>OS Name: {deviceInfo.osName}</Text>
//                         <Text style={styles.text}>OS Version: {deviceInfo.osVersion}</Text>
//                         <Text style={styles.text}>Device Name: {deviceInfo.deviceName || 'N/A'}</Text>
//                     </View>

//                     <View>


//                         {loading ? (
//                             <ActivityIndicator size="large" color="#0000ff" />
//                         ) : imageUrl ? (
//                             <Image source={{ uri: imageUrl }} style={{
//                                 width: WINDOW_WIDTH * .4,
//                                 height: WINDOW_WIDTH * .4,
//                             }} />
//                         ) : (
//                             <View ></View>
//                         )}
//                     </View>
//                 </View>
//                 <View className='border-t-2 py-3 flex-row flex-wrap border-gray-200 text-md mt-3' >
//                     <Text>
//                         Not your current phone?
//                     </Text>
//                     <TouchableOpacity

//                         onPress={() => {
//                             const pushToken = await registerForPushNotificationsAsyncBro();
//                             console.log({ pushToken });
//                         }
//                         }}
//                     >
//                     <Text
//                         className='text-primary-500 font-bold ml-1'
//                     >
//                         Use this device
//                     </Text>
//                 </TouchableOpacity>

//             </View>


//         </View>
//         </View >

//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         alignItems: 'center',
//     },
//     text: {
//         fontSize: 16,
//         marginVertical: 2,
//     },
//     deviceImage: {
//         width: 250,
//         height: 250,
//         marginTop: 20,
//     },
// });

// export default SetNotificationWithInfoDevice;


// import React, { useEffect, useState } from 'react';
// import {
//     Text,
//     View,
//     Image,
//     ActivityIndicator,
//     StyleSheet,
//     TouchableOpacity,
//     Alert,
//     Dimensions,
// } from 'react-native';
// import * as Device from 'expo-device';
// import { MaterialIcons } from "@expo/vector-icons";
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { registerForPushNotificationsAsyncBro } from 'navigation';

// const WINDOW_WIDTH = Dimensions.get('window').width;

// // Define the DeviceInfo interface
// interface DeviceInfo {
//     brand: string | null;
//     modelName: string | null;
//     osName: string | null;
//     osVersion: string | null;
//     deviceName: string | null;
// }

// // Placeholder functions for backend API interactions
// const fetchDeviceInfoFromBackend = async (): Promise<DeviceInfo | null> => {
//     try {
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//                 query: `
//                     query getDeviceInfo {
//                         getDeviceInfo {
//                             deviceInfo
//                         }
//                     }
//                 `,
//             }),
//         });

//         const data = await response.json();

//         console.log('data:', data);
//         const deviceInfoString = data?.data?.getDeviceInfo?.deviceInfo;

//         if (deviceInfoString) {
//             return JSON.parse(deviceInfoString);
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error('Error fetching device info from backend:', error);
//         return null;
//     }
// };

// const saveDeviceInfoToBackend = async (deviceInfo: DeviceInfo): Promise<void> => {
//     try {
//         console.log('====================================');
//         console.log('deviceInfo:', deviceInfo);
//         console.log('====================================');
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         await fetch(Constants.expoConfig?.extra?.apiUrl, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//                 query: `
//                     mutation updateDeviceInfo($input: inputUpdateDeviceInfo) {
//                         updateDeviceInfo(input: $input)
//                     }
//                 `,
//                 variables: {
//                     input: {
//                         deviceInfo: JSON.stringify(deviceInfo),
//                     },
//                 },
//             }),
//         });
//     } catch (error) {
//         console.error('Error saving device info to backend:', error);
//     }
// };

// const updateDeviceInfoInBackend = async (deviceInfo: DeviceInfo): Promise<void> => {
//     try {
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         await fetch(Constants.expoConfig?.extra?.apiUrl, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//                 query: `
//                     mutation updateDeviceInfo($input: inputUpdateDeviceInfo) {
//                         updateDeviceInfo(input: $input)
//                     }
//                 `,
//                 variables: {
//                     input: {
//                         deviceInfo: JSON.stringify(deviceInfo),
//                     },
//                 },
//             }),
//         });
//     } catch (error) {
//         console.error('Error updating device info in backend:', error);
//     }
// };


// const SetNotificationWithInfoDevice: React.FC = () => {
//     const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
//         brand: null,
//         modelName: null,
//         osName: null,
//         osVersion: null,
//         deviceName: null,
//     });
//     const [loading, setLoading] = useState(true);
//     const [imageUrl, setImageUrl] = useState<string | null>(null);


//     useEffect(() => {

//         const getDeviceInfoFromExpo = (): DeviceInfo => ({
//             brand: Device.brand,
//             modelName: Device.modelName,
//             osName: Device.osName,
//             osVersion: Device.osVersion,
//             deviceName: Device.deviceName,
//         });

//         const initializeDeviceInfo = async () => {
//             try {
//                 const backendDeviceInfo: DeviceInfo | null = await fetchDeviceInfoFromBackend();
//                 console.log('====================================');
//                 console.log('backendDeviceInfo:', backendDeviceInfo);
//                 console.log('====================================');
//                 if (backendDeviceInfo) {
//                     setDeviceInfo(backendDeviceInfo);

//                     if (backendDeviceInfo.brand && backendDeviceInfo.modelName) {
//                         const query = `${backendDeviceInfo.brand} ${backendDeviceInfo.modelName}`.replace(/\s+/g, '+');
//                         // await fetchImageUrl(query);
//                     }
//                 } else {
//                     const expoDeviceInfo = getDeviceInfoFromExpo();
//                     console.log('expoDeviceInfo:', expoDeviceInfo);

//                     setDeviceInfo(expoDeviceInfo);
//                     await saveDeviceInfoToBackend(expoDeviceInfo);

//                     if (expoDeviceInfo.brand && expoDeviceInfo.modelName) {
//                         const query = `${expoDeviceInfo.brand} ${expoDeviceInfo.modelName}`.replace(/\s+/g, '+');
//                         // await fetchImageUrl(query);
//                     }
//                 }
//             } catch (error) {
//                 console.error('Error initializing device info:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         initializeDeviceInfo();
//     }, []);

//     const handleUseThisDevice = async () => {
//         try {
//             setLoading(true);
//             const pushToken = await registerForPushNotificationsAsyncBro();
//             console.log({ pushToken });

//             const expoDeviceInfo = {
//                 brand: Device.brand,
//                 modelName: Device.modelName,
//                 osName: Device.osName,
//                 osVersion: Device.osVersion,
//                 deviceName: Device.deviceName,
//                 pushToken,
//             };
//             console.log('expoDeviceInfo:', expoDeviceInfo);

//             await updateDeviceInfoInBackend(expoDeviceInfo);
//             setDeviceInfo(expoDeviceInfo);

//             if (expoDeviceInfo.brand && expoDeviceInfo.modelName) {
//                 const query = `${expoDeviceInfo.brand} ${expoDeviceInfo.modelName}`.replace(/\s+/g, '+');
//                 // await fetchImageUrl(query);
//             }

//             Alert.alert('Success', 'Device info updated successfully.');
//         } catch (error: any) {
//             console.error('Error using this device:', error);
//             Alert.alert('Error', `Failed to update device info, ${error?.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.card}>
//                 <View style={styles.header}>
//                     <View style={styles.titleContainer}>
//                         <Text style={styles.title}>Notification Device</Text>
//                     </View>
//                 </View>
//                 <View style={styles.infoContainer}>
//                     <Text style={styles.text}>Brand: {deviceInfo.brand || 'N/A'}</Text>
//                     <Text style={styles.text}>Model Name: {deviceInfo.modelName || 'N/A'}</Text>
//                     <Text style={styles.text}>OS Name: {deviceInfo.osName || 'N/A'}</Text>
//                     <Text style={styles.text}>OS Version: {deviceInfo.osVersion || 'N/A'}</Text>
//                     <Text style={styles.text}>Device Name: {deviceInfo.deviceName || 'N/A'}</Text>
//                 </View>
//                 <View style={styles.footer}>
//                     <Text style={styles.footerText}>Not your current phone?</Text>
//                     <TouchableOpacity onPress={handleUseThisDevice}>
//                         <Text style={styles.useDeviceText}> Use this device</Text>
//                     </TouchableOpacity>
//                 </View>
//             </View>
//         </View>
//     );
// };

// // Stylesheet for the component
// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//         // flex: 1,
//         justifyContent: 'center',
//     },
//     card: {
//         padding: 20,
//         borderRadius: 12,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         backgroundColor: '#fff',
//         width: '100%',
//         maxWidth: 400,
//         alignSelf: 'center',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     header: {
//         marginBottom: 20,
//     },
//     titleContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     iconContainer: {
//         backgroundColor: "red",
//         padding: 6,
//         borderRadius: 6,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     title: {
//         fontWeight: 'bold',
//         fontSize: 18,
//         marginLeft: 10,
//         flexShrink: 1,
//     },
//     imageContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     image: {
//         width: WINDOW_WIDTH * 0.6,
//         height: WINDOW_WIDTH * 0.6,
//         borderRadius: 8,
//     },
//     placeholder: {
//         width: WINDOW_WIDTH * 0.6,
//         height: WINDOW_WIDTH * 0.6,
//         backgroundColor: '#eee',
//         borderRadius: 8,
//     },
//     infoContainer: {
//         marginBottom: 20,
//     },
//     text: {
//         fontSize: 16,
//         marginVertical: 4,
//         color: '#333',
//     },
//     footer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     footerText: {
//         fontSize: 16,
//         color: '#555',
//     },
//     useDeviceText: {
//         fontSize: 16,
//         color: '#1e90ff',
//         fontWeight: 'bold',
//     },
// });

// export default SetNotificationWithInfoDevice;


import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    Alert,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import * as Device from 'expo-device';
import { MaterialIcons } from "@expo/vector-icons";
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { registerForPushNotificationsAsyncBro } from 'navigation';

const WINDOW_WIDTH = Dimensions.get('window').width;

// Define the DeviceInfo interface
interface DeviceInfo {
    brand: string;
    modelName: string;
    osName: string;
    osVersion: string;
    deviceName: string;
    pushToken?: string;
}

const fetchDeviceInfoFromBackend = async (): Promise<DeviceInfo | null> => {
    try {
        const token = await getToken();
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        });

        const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: `
                    query getDeviceInfo {
                        getDeviceInfo {
                            deviceInfo
                        }
                    }
                `,
            }),
        });

        const data = await response.json();

        console.log('data:', data);
        const deviceInfoString = data?.data?.getDeviceInfo?.deviceInfo;

        if (deviceInfoString) {
            return JSON.parse(deviceInfoString);
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching device info from backend:', error);
        return null;
    }
};

const saveDeviceInfoToBackend = async (deviceInfo: DeviceInfo): Promise<void> => {
    try {
        const token = await getToken();
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        });

        const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: `
                    mutation updateDeviceInfo($input: inputUpdateDeviceInfo) {
                        updateDeviceInfo(input: $input){
                            
                        }
                    }
                `,
                variables: {
                    input: {
                        deviceInfo: JSON.stringify(deviceInfo),
                    },
                },
            }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error('Backend returned errors:', data.errors);
            throw new Error(data.errors[0]?.message || 'Failed to save device info.');
        }
    } catch (error) {
        console.error('Error saving device info to backend:', error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};

const updateDeviceInfoInBackend = async (deviceInfo: DeviceInfo): Promise<void> => {
    try {
        const token = await getToken();
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        });

        const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
            method: 'POST',
            headers,
            body: JSON.stringify({
                query: `
                    mutation updateDeviceInfo($input: inputUpdateDeviceInfo) {
                        updateDeviceInfo(input: $input){
                            id
                        }
                    }
                `,
                variables: {
                    input: {
                        deviceInfo: JSON.stringify(deviceInfo),
                    },
                },
            }),
        });

        const data = await response.json();

        if (data.errors) {
            console.error('Backend returned errors:', data.errors);
            throw new Error(data.errors[0]?.message || 'Failed to update device info.');
        }
    } catch (error) {
        console.error('Error updating device info in backend:', error);
        throw error; // Re-throw the error to be caught in the calling function
    }
};

const SetNotificationWithInfoDevice: React.FC = () => {
    const [deviceInfo, setDeviceInfo] = useState<DeviceInfo | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getDeviceInfoFromExpo = (): DeviceInfo => ({
            brand: Device.brand || 'Unknown',
            modelName: Device.modelName || 'Unknown',
            osName: Device.osName || 'Unknown',
            osVersion: Device.osVersion || 'Unknown',
            deviceName: Device.deviceName || 'Unknown',
        });

        const initializeDeviceInfo = async () => {
            try {
                const backendDeviceInfo: DeviceInfo | null = await fetchDeviceInfoFromBackend();
                console.log('backendDeviceInfo:', backendDeviceInfo);
                if (backendDeviceInfo) {
                    setDeviceInfo(backendDeviceInfo);
                } else {
                    const expoDeviceInfo = getDeviceInfoFromExpo();
                    console.log('expoDeviceInfo:', expoDeviceInfo);

                    setDeviceInfo(expoDeviceInfo);
                    await saveDeviceInfoToBackend(expoDeviceInfo);
                }
            } catch (error) {
                console.error('Error initializing device info:', error);
            } finally {
                setLoading(false);
            }
        };

        initializeDeviceInfo();
    }, []);

    const handleUseThisDevice = async () => {
        try {
            setLoading(true);

            // Register for push notifications and get the token
            const pushToken = await registerForPushNotificationsAsyncBro();
            console.log({ pushToken });

            if (!pushToken) {
                Alert.alert(
                    'Push Notification Error',
                    'Failed to get push notification token. Please ensure that push notifications are enabled.',
                );
                return;
            }

            const expoDeviceInfo: DeviceInfo = {
                brand: Device.brand || 'Unknown',
                modelName: Device.modelName || 'Unknown',
                osName: Device.osName || 'Unknown',
                osVersion: Device.osVersion || 'Unknown',
                deviceName: Device.deviceName || 'Unknown',
                pushToken,
            };
            console.log('expoDeviceInfo:', expoDeviceInfo);

            await updateDeviceInfoInBackend(expoDeviceInfo);
            setDeviceInfo(expoDeviceInfo);

            Alert.alert('Success', 'Device info updated successfully.');
        } catch (error: any) {
            console.error('Error using this device:', error);
            Alert.alert('Error', `Failed to update device info: ${error?.message || 'Unknown error'}`);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#3a7f41" />
            </View>
        );
    }

    if (!deviceInfo) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load device information.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <MaterialIcons name="devices" size={24} color="#3a7f41" />
                        <Text style={styles.title}>Notification Device</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.text}>Brand: {deviceInfo.brand}</Text>
                    <Text style={styles.text}>Model Name: {deviceInfo.modelName}</Text>
                    <Text style={styles.text}>OS Name: {deviceInfo.osName}</Text>
                    <Text style={styles.text}>OS Version: {deviceInfo.osVersion}</Text>
                    <Text style={styles.text}>Device Name: {deviceInfo.deviceName}</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Not your current device?</Text>
                    <TouchableOpacity onPress={handleUseThisDevice}>
                        <Text style={styles.useDeviceText}> Use this device</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

// Stylesheet for the component
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        padding: 2,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
    },
    card: {
        padding: 20,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#ddd',
        backgroundColor: '#fff',
        width: '100%',
        maxWidth: 400,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        marginBottom: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        marginLeft: 10,
        flexShrink: 1,
        color: '#333',
    },
    infoContainer: {
        marginBottom: 20,
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        color: '#333',
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        fontSize: 16,
        color: '#555',
    },
    useDeviceText: {
        fontSize: 16,
        color: '#1e90ff',
        fontWeight: 'bold',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: 16,
        color: 'red',
    },
});

export default SetNotificationWithInfoDevice;
