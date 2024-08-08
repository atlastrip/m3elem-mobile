import React, { useEffect, useState } from 'react';
import { Alert, Switch, Text, View } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import Constants from 'expo-constants';
import { getToken, getUser } from '@/helpers/getToken';
import { useIsFocused } from '@react-navigation/native';

const country = Constants?.expoConfig?.extra?.country;

const PaymentMethodPage = () => {
    const isFocused = useIsFocused();
    const [isEnabled, setIsEnabled] = useState<any>({});

    const toggleSwitch = async (name: string) => {
        setIsEnabled((prev: any) => ({ ...prev, [name]: !prev?.[name] }));
        await EditUser(name, !isEnabled?.[name]);
    };

    const MenuMA = [
        {
            name: "Cash on delivery",
            field: "CashOnDeliveryPayment",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Bank transfer",
            field: "BankTransferPayment",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Check",
            field: "CheckPayment",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ];

    const MenuUSA = [
        {
            name: "Cash on delivery",
            field: "CashOnDeliveryPayment",
            icon: <MaterialIcons name="notifications" color="white" size={20} />,
            colorIcon: "red",
            onPress: () => { }
        },
        {
            name: "Apple pay",
            field: "ApplePayPayment",
            icon: <MaterialIcons name="email" color="white" size={20} />,
            colorIcon: "blue",
            onPress: () => { }
        },
        {
            name: "Google pay",
            field: "GooglePayPayment",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Bank transfer",
            field: "BankTransferPayment",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
        {
            name: "Check",
            field: "CheckPayment",
            icon: <MaterialIcons name="phone" color="white" size={20} />,
            colorIcon: "green",
            onPress: () => { }
        },
    ];

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
                            mutation updateUser($input: inputUpdateUser) {
                                updateUser(input: $input){
                                    id
                                }
                            }
                        `,
                        variables: {
                            input: {
                                id: JSON.parse(user)?.id,
                                ...methods,
                                newImage: []
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            console.log('====================================');
            console.log('json', json);
            console.log('====================================');
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
                                    CashOnDeliveryPayment
                                    BankTransferPayment
                                    CheckPayment
                                }
                            }
                        `,
                    }),
                }
            );

            const json = await res.json();
            //         setIsEnabled((prev: any) => ({ ...prev, [name]: !prev?.[name] }));
            console.log('json?.data?.user', json?.data?.user);

            setIsEnabled((prev: any) => ({
                ...prev,
                "CashOnDeliveryPayment": json?.data?.user?.CashOnDeliveryPayment,
                "BankTransferPayment": json?.data?.user?.BankTransferPayment,
                "CheckPayment": json?.data?.user?.CheckPayment
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

    return (
        <View>
            <View className="my-2">
                <Text className='font-bold text-xl text-center'>Manage payment methods</Text>
            </View>

            <View className="px-3">
                {(country === 'ma' ? MenuMA : MenuUSA)?.map((menu, idx) => (
                    <View key={idx}
                        style={{ backgroundColor: '#00000010' }}
                        className="rounded-lg mb-3">
                        <View>
                            <View className="flex-row justify-between p-4 pl-5">
                                <View className="flex-row">
                                    <Text className="text-lg font-bold text-black">
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
    );
};

export default PaymentMethodPage;
