import React from 'react';
import { View, Text, Image, Button, Dimensions } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonPrimary } from '@/components/index';

const MyQrCode = ({ navigation }: any) => {
    const avatarUrl = 'https://example.com/avatar.png'; // Replace with actual avatar URL
    const qrValue = 'https://m3elem.vercel.app/en/profile/artisant/1'; // Replace with the value for the QR code
    const insets = useSafeAreaInsets();
    const { width } = Dimensions.get('window')
    return (
        <View className="flex-1 justify-center items-center bg-white p-4 flex-row ">
            <View className="w-full  bg-gray-100 rounded-2xl p-2">
                <View className="items-center mb-4">
                    <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
                    <Text className="text-lg font-bold">Ghita selek</Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-red-500">★</Text>
                        <Text className="text-lg ml-1">4.9/5 (15)</Text>
                    </View>
                </View>
                <View className="items-center mb-4">
                    <QRCode value={qrValue}
                        size={width > 300 ? width * .8 : 300}
                    />
                </View>
                <ButtonPrimary text="OK" onPress={() => navigation.goBack()} Loading={false} setLoading={() => { }} />

            </View>
        </View>
    );
};

export default MyQrCode;
