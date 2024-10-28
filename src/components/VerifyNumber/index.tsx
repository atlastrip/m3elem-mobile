// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
// import  tw  from 'twrnc';

// const PhoneVerification = ({ navigation }:any) => {
//   const [phoneNumber, setPhoneNumber] = useState('');

//   return (
//     <View style={tw`flex-1 bg-white justify-center items-center p-6`}>
//       {/* <Image source={{ uri: 'https://example.com/phone-icon.png' }} style={tw`w-24 h-24 mb-6`} /> */}
//       <Text style={tw`text-2xl font-semibold text-purple-700 mb-2`}>Verify Your Number</Text>
//       <Text style={tw`text-gray-500 text-center mb-4`}>Please enter your Country & your Phone Number</Text>
//       <View style={tw`flex-row items-center bg-gray-100 rounded-lg w-full mb-4`}>
//         <TextInput
//           style={tw`flex-1 px-4 py-2 text-lg bg-white rounded-lg`}
//           placeholder="Enter Phone Number"
//           keyboardType="phone-pad"
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//         />
//       </View>
//       <TouchableOpacity
//         style={tw`bg-green-500 rounded-lg py-3 px-8 w-full items-center`}
//         onPress={() => navigation.navigate('OTPVerificationScreen')}
//       >
//         <Text style={tw`text-white text-lg font-semibold`}>Send</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const OTPVerification = () => {
//   const [otp, setOtp] = useState(['', '', '', '', '', '']);

//   const handleOtpChange = (value:any, index:any) => {
//     let otpArray = [...otp];
//     otpArray[index] = value;
//     setOtp(otpArray);
//   };

//   return (
//     <View style={tw`flex-1 bg-white justify-center items-center p-6`}>
//       <Image source={{ uri: 'https://example.com/mailbox-icon.png' }} style={tw`w-24 h-24 mb-6`} />
//       <Text style={tw`text-2xl font-semibold text-purple-700 mb-2`}>Verification Code</Text>
//       <Text style={tw`text-gray-500 text-center mb-4`}>Please enter the code sent to your number</Text>
//       <View style={tw`flex-row justify-between w-full mb-6`}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             style={tw`w-12 h-12 bg-gray-100 text-lg text-center rounded-lg`}
//             keyboardType="number-pad"
//             maxLength={1}
//             onChangeText={(value) => handleOtpChange(value, index)}
//             value={digit}
//           />
//         ))}
//       </View>
//       <TouchableOpacity style={tw`bg-green-500 rounded-lg py-3 px-8 w-full items-center`}>
//         <Text style={tw`text-white text-lg font-semibold`}>Verify</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export { PhoneVerification, OTPVerification };










import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const VerificationScreens = () => {
    const [phoneNumber, setPhoneNumber] = useState('010277 62 986');
    const [verificationCode, setVerificationCode] = useState(['6', '8', '', '']);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* Verify Your Number Screen */}
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="phone-portrait-outline" size={32} color="white" />
                    </View>
                    <Text style={styles.title}>Verify Your Number</Text>
                    <Text style={styles.subtitle}>Please enter your Country & your Phone Number</Text>
                    <View style={styles.inputContainer}>
                        <TouchableOpacity style={styles.countrySelector}>
                            <Text>🇪🇬</Text>
                            <Ionicons name="chevron-down" size={16} color="gray" />
                        </TouchableOpacity>
                        <TextInput
                            style={styles.input}
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                        />
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>SEND</Text>
                    </TouchableOpacity>
                </View>

               
            </ScrollView>
        </SafeAreaView>
    );
}

export default VerificationScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c3aed', // Purple background
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#7c3aed',
        borderRadius: 50,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7c3aed',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    codeInput: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#7c3aed',
        fontSize: 24,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#10b981',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});