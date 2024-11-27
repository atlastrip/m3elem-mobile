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

const NotificationsPage = () => {
    const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState<any>({});

    useEffect(() => {
        if (isFocused) {
            getInfo();
        }
    }, [isFocused]);

    const toggleSwitch = async (name: string) => {
        const newValue = !isEnabled?.[name];
        setIsEnabled((prev: any) => ({ ...prev, [name]: newValue }));
        await EditUser(name, newValue);
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

    const EditUser = async (method: any, status: any) => {
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
