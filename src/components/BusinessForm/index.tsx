// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Modal, StyleSheet } from 'react-native';
// import { Alert } from 'react-native';
// import tw from 'twrnc';



// export const NewfetchAddressSuggestions = async (input: any, zipCode = '') => {
//     if (!input) {
//         Alert.alert("Error", "No input provided");
//         return [];
//     }

//     try {
//         const authId = '7a47c71c-3fbe-0616-0436-25e403929f51';
//         const authToken = 'CiES7AJmoRjsLhVJbBzR';
//         const maxResults = 5; // Set the maximum number of results


//         // Define the API endpoint
//         const url = `https://us-autocomplete-pro.api.smarty.com/lookup?auth-id=${authId}&auth-token=${authToken}&search=${encodeURIComponent(input)}&max-results=${maxResults}&zipcode=${encodeURIComponent(zipCode)}`;

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         // if (!response.ok) {
//         //     throw new Error('Failed to fetch address suggestions');
//         // }

//         const data = await response.json();
//         console.log('data', data);

//         // Map the response data to the format needed in your React Native app
//         const formattedResults = data.suggestions.map((suggestion: any) => ({
//             streetLine: suggestion.street_line || suggestion.text,
//             city: suggestion.city || suggestion.entries[0]?.city,
//             state: suggestion.state || suggestion.entries[0]?.state,
//             zipcode: suggestion.zipcode || suggestion.entries[0]?.zipcode,
//             country: 'USA', // Since SmartyStreets only provides US addresses
//         }));

//         return formattedResults;
//     } catch (error: any) {
//         console.log('API Error:', error.message);
//         Alert.alert("Error", "Failed to fetch address suggestions");
//         return [];
//     }
// };



// const useDebounce = (value: any, delay: any) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedValue(value), delay);
//         return () => clearTimeout(handler);
//     }, [value, delay]);

//     return debouncedValue;
// };

// const BusinessForm = ({ formState, setFormState }: any) => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [selectedSuggestion, setSelectedSuggestion] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
//     const debouncedStreet = useDebounce(formState.street, 800);
//     const [modalVisible, setModalVisible] = useState(false);

//     const handleInputChange = (name: any, value: any) => {
//         setFormState((prevState: any) => ({
//             ...prevState,
//             [name]: value,
//         }));
//         setSelectedSuggestion(null);
//     };

//     const fetchAddressSuggestions = useCallback(async (street: any, zipCode: any) => {
//         if (!street.trim()) return;
//         setLoading(true);
//         setError(null);

//         try {
//             // const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(street)}`);
//             const res: any = await NewfetchAddressSuggestions(street, zipCode);
//             console.log('====================================');
//             console.log('res', res);
//             console.log('====================================');
//             // const data = await response.json();
//             setSuggestions(res.length ? res : []);
//         } catch (err: any) {
//             setError(err.message || 'An unexpected error occurred.');
//             setSuggestions([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (debouncedStreet && !selectedSuggestion) fetchAddressSuggestions(debouncedStreet, formState?.zipCode);
//     }, [debouncedStreet, fetchAddressSuggestions, selectedSuggestion]);

//     const handleSuggestionClick = (suggestion: any) => {
//         setFormState((prevState: any) => ({
//             ...prevState,
//             street: suggestion.streetLine,
//             city: suggestion.city,
//             state: suggestion.state,
//             zipCode: suggestion.zipcode,
//         }));
//         setSelectedSuggestion(suggestion);
//         setSuggestions([]);
//     };

//     return (
//         <View style={tw`p-4 bg-white rounded-lg`}>
//             <Text style={tw`text-lg font-bold mb-4`}>Business Form</Text>

//             <Text style={tw`text-sm text-gray-700 mb-1`}>Business Name</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. Nora's Kitchen"
//                 value={formState.businessName}
//                 onChangeText={(text) => handleInputChange('businessName', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Year Founded</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. 2002"
//                 value={formState.yearFounded}
//                 onChangeText={(text) => handleInputChange('yearFounded', text)}
//                 keyboardType="numeric"
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Number of Employees</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. 5"
//                 value={formState.numberOfEmployees}
//                 onChangeText={(text) => handleInputChange('numberOfEmployees', text)}
//                 keyboardType="numeric"
//             />

//             {/* <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Street</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="Enter street"
//                 value={formState.street}
//                 onChangeText={(text) => handleInputChange('street', text)}
//             /> */}

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Street</Text>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={tw`border border-gray-300 p-3 rounded-md flex-1`}
//                     placeholder="Enter street"
//                     value={formState.street}
//                     onChangeText={(text) => handleInputChange('street', text)}
//                     onFocus={() => {
//                         if (suggestions.length > 0) setModalVisible(true);
//                     }}
//                 />
//                 {loading && <ActivityIndicator style={tw`ml-2`} size="small" color="blue" />}
//             </View>
//             {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>}
//             {/* {loading && <ActivityIndicator style={tw`mt-2`} size="small" color="blue" />} */}
//             {/* {suggestions.length > 0 && (
//                     <FlatList
//                         data={suggestions}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }: any) => (
//                             <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={tw`p-2`}>
//                                 <Text>{`${item.streetLine}, ${item.city}, ${item.state}, ${item.country}`}</Text>
//                             </TouchableOpacity>
//                         )}
//                         style={tw`mt-2 border border-gray-300 rounded-md max-h-48`}
//                     />
//             )} */}

//             {/* Modal for Suggestions */}
//             <Modal
//                 visible={modalVisible}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//                     <View style={styles.modalContent}>
//                         <FlatList
//                             data={suggestions}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }: any) => (
//                                 <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={tw`p-2`}>
//                                     <Text>{`${item.streetLine}, ${item.city}, ${item.state}, ${item.country}`}</Text>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//             {/* {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>} */}

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>City</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.city}
//                 onChangeText={(text) => handleInputChange('city', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>State</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.state}
//                 onChangeText={(text) => handleInputChange('state', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>ZIP Code</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.zipCode}
//                 onChangeText={(text) => handleInputChange('zipCode', text)}
//                 keyboardType="numeric"
//             />

//             {/* <TouchableOpacity
//                 style={tw`mt-6 bg-blue-600 p-3 rounded-md`}
//                 onPress={() => console.log("Form submitted:", formState)}
//             >
//                 <Text style={tw`text-center text-white font-bold`}>Save Profile</Text>
//             </TouchableOpacity> */}
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         maxHeight: 300,
//     },
// });

// export default BusinessForm;


// BusinessForm.tsx

import React, { useEffect, useState } from 'react';
import { 
    Alert, 
    Switch, 
    Text, 
    View, 
    StyleSheet, 
    ScrollView, 
    SafeAreaView 
} from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';
import Constants from 'expo-constants';
import SetNotificationWithInfoDevice from '@/components/SetNotificationWithInfoDevice';
import * as Notifications from 'expo-notifications'; // Import Expo Notifications

const NotificationsPage = () => {
    const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState<any>({});
    const [pushPermission, setPushPermission] = useState<boolean | null>(null); // State to track push permission

    useEffect(() => {
        if (isFocused) {
            getInfo();
            checkPushPermission(); // Check push permissions when the screen is focused
        }
    }, [isFocused]);

    // Function to check current push notification permissions
    const checkPushPermission = async () => {
        try {
            const { status } = await Notifications.getPermissionsAsync();
            setPushPermission(status === 'granted');
        } catch (error) {
            console.error('Error checking push permissions:', error);
            setPushPermission(false);
        }
    };

    // Function to request push notification permissions
    const requestPushPermission = async (): Promise<boolean> => {
        try {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status === 'granted') {
                setPushPermission(true);
                return true;
            } else {
                setPushPermission(false);
                Alert.alert(
                    "Permissions Required",
                    "Push notifications are essential for this feature. Please enable them in your settings.",
                    [{ text: "OK" }]
                );
                return false;
            }
        } catch (error) {
            console.error('Error requesting push permissions:', error);
            Alert.alert(
                "Error",
                "An error occurred while requesting push notification permissions.",
                [{ text: "OK" }]
            );
            return false;
        }
    };

    // Function to toggle notification switches
    const toggleSwitch = async (name: string) => {
        if (name === "pushUsingAppNotification") {
            // Handle toggling push notifications
            if (pushPermission === null) {
                // If permission status is unknown, check it
                await checkPushPermission();
            }

            if (!pushPermission) {
                // If not granted, request permission
                const granted = await requestPushPermission();
                if (!granted) {
                    // If permission denied, revert the switch
                    setIsEnabled((prev: any) => ({ ...prev, [name]: false }));
                    return;
                }
            }

            // Toggle the push notification setting
            const newValue = !isEnabled?.[name];
            setIsEnabled((prev: any) => ({ ...prev, [name]: newValue }));
            await EditUser(name, newValue);
        } else {
            // For other notification settings, ensure push notifications are enabled
            if (!isEnabled?.pushUsingAppNotification) {
                Alert.alert(
                    "Push Notifications Disabled",
                    "Please enable push notifications to update your notification settings.",
                    [
                        { text: "Cancel", style: "cancel" },
                        { text: "Enable", onPress: async () => {
                            const granted = await requestPushPermission();
                            if (granted) {
                                setIsEnabled((prev: any) => ({ ...prev, pushUsingAppNotification: true }));
                                await EditUser("pushUsingAppNotification", true);
                            }
                        }}
                    ]
                );
                return;
            }

            // Toggle other notification settings
            const newValue = !isEnabled?.[name];
            setIsEnabled((prev: any) => ({ ...prev, [name]: newValue }));
            await EditUser(name, newValue);
        }
    };

    const MenuItems = [
        {
            name: "Application Push Notifications",
            field: "pushUsingAppNotification",
            icon: "notifications",
            colorIcon: "#3a7f41", // Primary Green
        },
        {
            name: "Email Notifications",
            field: "pushUsingEmailNotification",
            icon: "email",
            colorIcon: "#1e90ff", // Dodger Blue
        },
        {
            name: "Phone Notifications",
            field: "pushUsingPhoneNotification",
            icon: "phone",
            colorIcon: "#4CAF50", // Success Green
        },
    ];

    // Function to edit user settings
    const EditUser = async (method: any, status: any) => {
        // If updating device info (other than push notifications), ensure push notifications are enabled
        if (method !== "pushUsingAppNotification" && !isEnabled?.pushUsingAppNotification) {
            Alert.alert(
                "Push Notifications Disabled",
                "Please enable push notifications to update your device info.",
                [
                    { text: "Cancel", style: "cancel" },
                    { text: "Enable", onPress: async () => {
                        const granted = await requestPushPermission();
                        if (granted) {
                            setIsEnabled((prev: any) => ({ ...prev, pushUsingAppNotification: true }));
                            await EditUser("pushUsingAppNotification", true);
                        }
                    }}
                ]
            );
            return;
        }

        const token = await getToken();
        const user: any = await getUser();

        if (!token) {
            Alert.alert("Authentication Error", "User token not found. Please log in again.");
            return;
        }

        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const updatedSettings = {
            ...isEnabled,
            [method]: status
        };

        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation updatePushNotificationSettings($input: inputUpdatePushNotificationSettings!) {
                                updatePushNotificationSettings(input: $input)
                            }
                        `,
                        variables: {
                            input: updatedSettings
                        }
                    }),
                }
            );

            const json = await res.json();

            if (json.errors) {
                throw new Error(json.errors[0]?.message || "Failed to update settings.");
            }

            await getInfo();

        } catch (err: any) {
            console.error('Error:', err);
            Alert.alert("Error", err.message || "An error occurred while updating your settings.");
        }
    };

    // Function to fetch user information and settings
    const getInfo = async () => {
        const token = await getToken();
        const user: any = await getUser();

        if (!token) {
            Alert.alert("Authentication Error", "User token not found. Please log in again.");
            return;
        }

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

            if (json.errors) {
                throw new Error(json.errors[0]?.message || "Failed to fetch user settings.");
            }

            setIsEnabled({
                pushUsingAppNotification: json?.data?.user?.pushUsingAppNotification,
                pushUsingEmailNotification: json?.data?.user?.pushUsingEmailNotification,
                pushUsingPhoneNotification: json?.data?.user?.pushUsingPhoneNotification
            });

            // Update push permission state based on fetched data
            const permissions = await Notifications.getPermissionsAsync();
            setPushPermission(permissions.status === 'granted');

        } catch (err: any) {
            console.error('Error:', err);
            Alert.alert("Error", err.message || "An error occurred while fetching your settings.");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Manage Notifications</Text>
                </View>

                {/* Device Info Section */}
                <View style={styles.deviceInfoContainer}>
                    <SetNotificationWithInfoDevice />
                </View>

                {/* Notification Settings */}
                <View style={styles.menuContainer}>
                    {MenuItems.map((menu, idx) => (
                        <View key={idx} style={styles.menuItemWrapper}>
                            <View style={styles.menuItem}>
                                <View style={[styles.iconContainer, { backgroundColor: menu.colorIcon }]}>
                                    <MaterialIcons 
                                        // @ts-ignore
                                        name={menu.icon} size={24} color="#ffffff" />
                                </View>
                                <Text style={styles.menuText}>{menu.name}</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#3a7f41" }}
                                    thumbColor={isEnabled?.[menu.field] ? "#ffffff" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={() => toggleSwitch(menu.field)}
                                    value={isEnabled?.[menu.field]}
                                    accessibilityLabel={`Toggle ${menu.name}`}
                                />
                            </View>
                            {idx !== MenuItems.length - 1 && <View style={styles.separator} />}
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

// Define shadowStyles before styles
const shadowStyles = {
    small: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    medium: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    large: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 6,
    },
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9f9f9', // Light Gray Background
    },
    container: {
        padding: 20,
    },
    headerContainer: {
        // marginBottom: 30,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333333', // Dark Gray Text
    },
    deviceInfoContainer: {
        marginBottom: 10,
    },
    menuContainer: {
        // Additional styling if needed
    },
    menuItemWrapper: {
        backgroundColor: '#ffffff', // White Card Background
        borderRadius: 12,
        marginBottom: 10,
        ...shadowStyles.medium,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: '#333333', // Dark Gray Text
    },
    separator: {
        height: 1,
        backgroundColor: '#e0e0e0', // Light Gray Separator
        marginLeft: 72, // Align with text start (icon + margin)
    },
});

export default NotificationsPage;
