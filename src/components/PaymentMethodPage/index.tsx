import React, { useEffect, useState } from 'react';
import { View, Text, Switch, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import Constants from 'expo-constants';

import tw from 'twrnc';
import { getToken } from '@/helpers/getToken';

// PaymentMethodPage component
const PaymentMethodPage = () => {
  const [isEnabled, setIsEnabled]:any = useState({});
  const [loading, setLoading]:any = useState(false);

  // Toggle switch handler
  const toggleSwitch = async (name:any) => {
    setIsEnabled((prev:any) => ({ ...prev, [name]: !prev[name] }));
    await editUser(name, !isEnabled[name]);
  };

  // Define menu items for each country
  const MenuMA = [
    { name: 'Cash on delivery', field: 'CashOnDeliveryPayment', colorIcon: 'red' },
    { name: 'Bank transfer', field: 'BankTransferPayment', colorIcon: 'green' },
    { name: 'Check', field: 'CheckPayment', colorIcon: 'green' },
    { name: 'Apple Pay', field: 'ApplePay', colorIcon: 'blue' },
    { name: 'Cash', field: 'CashPayment', colorIcon: 'green' },
    { name: 'Credit card', field: 'CreditCardPayment', colorIcon: 'yellow' },
    { name: 'Google Pay', field: 'GooglePay', colorIcon: 'red' },
    { name: 'Paypal', field: 'PaypalPayment', colorIcon: 'purple' },
    { name: 'Samsung Pay', field: 'SamsungPay', colorIcon: 'pink' },
    { name: 'Square cash app', field: 'SquareCashApp', colorIcon: 'orange' },
    { name: 'Stripe', field: 'StripePayment', colorIcon: 'teal' },
    { name: 'Venmo', field: 'VenmoPayment', colorIcon: 'brown' },
    { name: 'Zelle', field: 'ZellePayment', colorIcon: 'blue' },
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
  const editUser = async (method:any, status:any) => {
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
            mutation updatePaymentMethodChoosed($input: UpdatePaymentMethodInput!) {
              updatePaymentMethodChoosed(input: $input) {
                success
              }
            }
          `,
          variables: { input: methods },
        }),
      });

      const result = await response.json();
      if (!result?.data?.updatePaymentMethodChoosed?.success) {
        throw new Error("Failed to update payment method");
      }

      fetchUserData(); // Refetch user data after updating
    } catch (error:any) {
      Alert.alert("Error", error.message);
    }
  };

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <ScrollView style={tw`w-full`}>
      <View style={tw`p-4`}>
        <View style={tw`flex-row`}>
          <View style={tw`flex-1`}>
            {(MenuUSA).map((menu, idx) => (
              <View key={idx} style={tw`bg-gray-100 p-4 rounded-lg mb-4`}>
                <View style={tw`flex-row items-center justify-between`}>
                  <Text style={tw`text-lg font-bold`}>{menu.name}</Text>
                  <Switch
                    value={isEnabled[menu.field] || false}
                    onValueChange={() => toggleSwitch(menu.field)}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={tw`hidden sm:flex w-1/3 border-l border-gray-200 p-4`}>
            <View style={tw`bg-gray-50 p-3 rounded-md`}>
              <View style={tw`flex-row items-center`}>
                {/* <Info size={20} style={tw`mr-2`} /> */}
                <Text>Info</Text>
              </View>
              <Text style={tw`mt-3 text-sm`}>
                You can enable or disable payment methods by toggling the switches on the left.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default PaymentMethodPage;
