import React, { useEffect, useState } from 'react';
import { 
    Alert, 
    Switch, 
    Text, 
    View, 
    StyleSheet, 
    ScrollView, 
    ActivityIndicator, 
    SafeAreaView,
    useWindowDimensions
} from 'react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from "@expo/vector-icons";
import { getToken } from '@/helpers/getToken';
import { WINDOW_HEIGHT } from '@gorhom/bottom-sheet'; // Ensure this is used appropriately

const PaymentMethodPage = () => {
    const [isEnabled, setIsEnabled]: any = useState({});
    const [loading, setLoading]: any = useState(false);
    const [loadingItem, setLoadingItem] = useState("");

    const { width } = useWindowDimensions();
    const isLargeScreen = width >= 640; // Tailwind 'sm' breakpoint is 640px

    // Define payment methods
    const MenuMA = [
        { name: 'Cash on Delivery', field: 'CashOnDeliveryPayment', colorIcon: '#FF4D4D' }, // Red
        { name: 'Bank Transfer', field: 'BankTransferPayment', colorIcon: '#4CAF50' }, // Green
        { name: 'Check', field: 'CheckPayment', colorIcon: '#4CAF50' }, // Green
        { name: 'Apple Pay', field: 'ApplePay', colorIcon: '#000000' }, // Black
        { name: 'Cash', field: 'CashPayment', colorIcon: '#4CAF50' }, // Green
        { name: 'Credit Card', field: 'CreditCardPayment', colorIcon: '#FFD700' }, // Gold
        { name: 'Google Pay', field: 'GooglePay', colorIcon: '#DB4437' }, // Red
        { name: 'Paypal', field: 'PaypalPayment', colorIcon: '#003087' }, // Blue
        { name: 'Samsung Pay', field: 'SamsungPay', colorIcon: '#FF6F61' }, // Coral
        { name: 'Square Cash App', field: 'SquareCashApp', colorIcon: '#FFA500' }, // Orange
        { name: 'Stripe', field: 'StripePayment', colorIcon: '#008CDD' }, // Teal Blue
        { name: 'Venmo', field: 'VenmoPayment', colorIcon: '#3D95CE' }, // Blue
        { name: 'Zelle', field: 'ZellePayment', colorIcon: '#0077B5' }, // Dark Blue
    ];

    const MenuUSA = MenuMA; // Adjust if there are country-specific differences

    // Fetch user data and set enabled payment methods
    const fetchUserData = async () => {
        setLoading(true);
        const token = await getToken();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        query getUserData {
                            user {
                                id
                                CashOnDeliveryPayment
                                BankTransferPayment
                                CheckPayment
                                ApplePay
                                CashPayment
                                CreditCardPayment
                                GooglePay
                                PaypalPayment
                                SamsungPay
                                SquareCashApp
                                StripePayment
                                VenmoPayment
                                ZellePayment
                            }
                        }
                    `,
                }),
            });

            const data = await response.json();

            const userData = data?.data?.user;

            if (userData) {
                setIsEnabled({
                    CashOnDeliveryPayment: userData.CashOnDeliveryPayment,
                    BankTransferPayment: userData.BankTransferPayment,
                    CheckPayment: userData.CheckPayment,
                    ApplePay: userData.ApplePay,
                    CashPayment: userData.CashPayment,
                    CreditCardPayment: userData.CreditCardPayment,
                    GooglePay: userData.GooglePay,
                    PaypalPayment: userData.PaypalPayment,
                    SamsungPay: userData.SamsungPay,
                    SquareCashApp: userData.SquareCashApp,
                    StripePayment: userData.StripePayment,
                    VenmoPayment: userData.VenmoPayment,
                    ZellePayment: userData.ZellePayment,
                });
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            Alert.alert("Error", "Failed to load user data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    // Update user payment method
    const editUser = async (method: any, status: any) => {
        const token = await getToken();
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        const methods = { ...isEnabled, [method]: status };

        try {
            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                        mutation updatePaymentMethodChoosed($input: updatePaymentMethodForArtisant!) {
                            updatePaymentMethodChoosed(input: $input) 
                        }
                    `,
                    variables: { input: methods },
                }),
            });

            const result = await response.json();
            if (!result?.data?.updatePaymentMethodChoosed) {
                throw new Error("Failed to update payment method");
            }

            fetchUserData(); // Refetch user data after updating
        } catch (error: any) {
            Alert.alert("Error", error.message || "Failed to update payment method.");
        }
    };

    // Toggle switch handler
    const toggleSwitch = async (name: any) => {
        const newValue = !isEnabled[name];
        setIsEnabled((prev: any) => ({ ...prev, [name]: newValue }));
        await editUser(name, newValue);
    };

    // Function to map payment method names to icon names
    const getIconName = (name: string) => {
        switch(name.toLowerCase()) {
            case 'cash on delivery':
                return 'local-atm';
            case 'bank transfer':
                return 'account-balance';
            case 'check':
                return 'receipt';
            case 'apple pay':
                return 'apple';
            case 'cash':
                return 'attach-money';
            case 'credit card':
                return 'credit-card';
            case 'google pay':
                return 'payment';
            case 'paypal':
                return 'account-balance-wallet';
            case 'samsung pay':
                return 'phone-android';
            case 'square cash app':
                return 'monetization-on';
            case 'stripe':
                return 'payment';
            case 'venmo':
                return 'account-balance-wallet';
            case 'zelle':
                return 'send';
            default:
                return 'payment';
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.container}>
                {/* Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.headerTitle}>Manage Payment Methods</Text>
                </View>

                {/* Content */}
                <View style={styles.contentRow}>
                    {/* Payment Methods List */}
                    <View style={styles.paymentMethodsContainer}>
                        {MenuUSA.map((menu, idx) => (
                            <View key={idx} style={styles.menuItemWrapper}>
                                <View style={styles.menuItem}>
                                    <View style={[styles.iconContainer, { backgroundColor: menu.colorIcon }]}>
                                        <MaterialIcons name={getIconName(menu.name)} size={24} color="#ffffff" />
                                    </View>
                                    <Text style={styles.menuText}>{menu.name}</Text>
                                    <View style={styles.switchContainer}>
                                        {loading && loadingItem === menu.name ? (
                                            <ActivityIndicator size="small" color="#4CAF50" />
                                        ) : (
                                            <Switch
                                                value={isEnabled[menu.field] || false}
                                                onValueChange={() => {
                                                    setLoadingItem(menu.name);
                                                    toggleSwitch(menu.field).then(() => setLoadingItem(""));
                                                }}
                                                trackColor={{ false: "#767577", true: "#3a7f41" }}
                                                thumbColor={isEnabled[menu.field] ? "#ffffff" : "#f4f3f4"}
                                                ios_backgroundColor="#3e3e3e"
                                                accessibilityLabel={`Toggle ${menu.name}`}
                                            />
                                        )}
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>

                    {/* Info Section */}
                    {isLargeScreen && (
                        <View style={styles.infoSection}>
                            <View style={styles.infoBox}>
                                <View style={styles.infoHeader}>
                                    {/* You can add an icon here if needed */}
                                    <Text style={styles.infoTitle}>Info</Text>
                                </View>
                                <Text style={styles.infoText}>
                                    You can enable or disable payment methods by toggling the switches on the left.
                                </Text>
                            </View>
                        </View>
                    )}
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
        marginBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: '700',
        color: '#333333', // Dark Gray Text
    },
    contentRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    paymentMethodsContainer: {
        flex: 1,
    },
    menuItemWrapper: {
        backgroundColor: '#ffffff', // White Card Background
        borderRadius: 12,
        marginBottom: 20,
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
    switchContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoSection: {
        width: '30%',
        borderLeftWidth: 1,
        borderLeftColor: '#e0e0e0', // Light Gray Border
        paddingLeft: 16,
    },
    infoBox: {
        backgroundColor: '#f5f5f5',
        padding: 16,
        borderRadius: 8,
        ...shadowStyles.small,
    },
    infoHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333333',
    },
    infoText: {
        fontSize: 14,
        color: '#666666',
    },
});

export default PaymentMethodPage;
