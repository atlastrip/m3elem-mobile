import React, { useState, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Constants from 'expo-constants';
import tw from 'twrnc';
import { getToken } from '@/helpers/getToken';

const fetchUserInfo = async (setFormState:any) => {
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
          query userInfo {
            user { /* Your user fields */ }
          }
        `,
      }),
    });

    const data = await response.json();
    const userData = data?.data?.user;
    setFormState((prevState:any) => ({ ...prevState, ...userData }));
  } catch (error) {
    console.error("Error fetching user data:", error);
    Alert.alert("Error", "Failed to load user data.");
  }
};

const SearchRequirementChecker = ({
  categories,
  isProfileComplete,
  userAmount,
  paymentMethodChoosed,
  minRequiredAmount,
  acceptedByBO,
  weeklySpent,
  weeklyLimit,
  zipCodes,
}:any) => {
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    const checkEligibility = () => {
      const hasCategories = categories.length > 0;
      const hasEnoughAmount = userAmount >= minRequiredAmount;
      const hasNotExceededWeeklyLimit = weeklySpent <= weeklyLimit;

      if (hasCategories && isProfileComplete && hasEnoughAmount && acceptedByBO && hasNotExceededWeeklyLimit) {
        setIsEligible(true);
      } else {
        setIsEligible(false);
      }
    };
    checkEligibility();
  }, [categories, isProfileComplete, userAmount, minRequiredAmount, acceptedByBO, weeklySpent, weeklyLimit, zipCodes]);

  const renderStatus = (condition:any, text:any) => (
    <View style={tw`flex-row items-center mt-2`}>
      <Icon name={condition ? 'check-circle' : 'cancel'} size={20} color={condition ? 'green' : 'red'} />
      <Text style={tw`ml-2 text-base`}>{text}</Text>
    </View>
  );

  return (
    <View style={tw`p-4 bg-white border border-gray-200 rounded-lg`}>
      <Text style={tw`text-xl font-bold mb-4 text-center`}>
        {isEligible ? "You meet all the search requirements!" : "You don't meet all the search requirements"}
      </Text>

      {/* Render Statuses */}
      {renderStatus(categories.length > 0, 'Categories selected')}
      {renderStatus(userAmount >= minRequiredAmount, `Enough amount available ${paymentMethodChoosed === 'PayAsYouGo' ? '' : `$${userAmount}`}`)}
      {renderStatus(acceptedByBO === "Accepted", 'Accepted by the Business Office (BO)')}
      {renderStatus(weeklySpent <= weeklyLimit, `Weekly spend within limit (${weeklySpent}/${weeklyLimit})`)}
      {renderStatus(zipCodes?.length > 0, 'Zip codes selected')}
      {renderStatus(paymentMethodChoosed === 'PayAsYouGo' || paymentMethodChoosed === 'BuyCredits', 'Payment method exists')}
    </View>
  );
};

export default SearchRequirementChecker;
