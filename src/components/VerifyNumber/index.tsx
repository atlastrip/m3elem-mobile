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










// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Svg, { Path, Rect, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
// import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from 'react-native-reanimated';

// import { LinearGradient as LinearGradientExpo } from 'expo-linear-gradient';
// import AsyncStorage from '@react-native-async-storage/async-storage';













// const AnimatedCircle = Animated.createAnimatedComponent(Circle);
// const AnimatedG = Animated.createAnimatedComponent(G);

// const { width } = Dimensions.get('window');
// const size = width * 0.8;

// const MagicalPhoneIllustration = () => {
//     const rotation = useSharedValue(0);
//     const scale = useSharedValue(1);

//     useEffect(() => {
//         rotation.value = withRepeat(withTiming(360, { duration: 10000, easing: Easing.linear }), -1, false);
//         scale.value = withRepeat(withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }), -1, true);
//     }, []);

//     const animatedProps = useAnimatedProps(() => {
//         return {
//             transform: [{ rotate: `${rotation.value}deg` }],
//         };
//     });

//     const scaleProps = useAnimatedProps(() => {
//         return {
//             transform: [{ scale: scale.value }],
//         };
//     });

//     return (
//         <View style={{
//             width: size, height: size, justifyContent: 'center', alignItems: 'center', marginBottom: 20
//         }}>
//             <Svg width="100%" height="100%" viewBox="0 0 100 100">
//                 <Defs>
//                     <LinearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
//                         <Stop offset="0" stopColor="#8A2387" />
//                         <Stop offset="0.5" stopColor="#E94057" />
//                         <Stop offset="1" stopColor="#F27121" />
//                     </LinearGradient>
//                 </Defs>

//                 {/* Background */}
//                 {/* <Rect x="0" y="0" width="100" height="100" fill="url(#bgGradient)" /> */}

//                 {/* Hand */}
//                 <Path
//                     d="M30 70 Q35 75, 40 70 Q45 65, 50 70 Q55 75, 60 70 L60 90 Q55 95, 50 90 Q45 85, 40 90 Q35 95, 30 90 Z"
//                     fill="#FFA07A"
//                 />

//                 {/* Phone */}
//                 <AnimatedG animatedProps={scaleProps}>
//                     <Rect x="40" y="30" width="30" height="50" rx="3" fill="#4169E1" />

//                     {/* Screen */}
//                     <Rect x="42" y="32" width="26" height="46" rx="2" fill="#FFFFFF" />

//                     {/* Checkmark */}
//                     <Path
//                         d="M50 55 L55 60 L65 50"
//                         stroke="#4169E1"
//                         strokeWidth="3"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         fill="none"
//                     />
//                 </AnimatedG>

//                 {/* Rotating Dots */}
//                 <AnimatedG animatedProps={animatedProps}>
//                     {[...Array(12)].map((_, i) => {
//                         const angle = (i * 30 * Math.PI) / 180;
//                         const cx = 55 + 30 * Math.cos(angle);
//                         const cy = 55 + 30 * Math.sin(angle);
//                         return <Circle key={i} cx={cx} cy={cy} r="2" fill="#FFD700" />;
//                     })}
//                 </AnimatedG>

//                 {/* Sparkles */}
//                 {[...Array(10)].map((_, i) => (
//                     <AnimatedCircle
//                         key={i}
//                         cx={Math.random() * 100}
//                         cy={Math.random() * 100}
//                         r="1"
//                         fill="#FFFFFF"
//                         animatedProps={useAnimatedProps(() => ({
//                             opacity: withRepeat(withTiming(Math.random(), { duration: 1000 + Math.random() * 1000 }), -1, true),
//                         }))}
//                     />
//                 ))}
//             </Svg>
//         </View>
//     );
// }



// const VerificationScreens = ({ navigation }: any) => {
//     const [phoneNumber, setPhoneNumber] = useState('010277 62 986');


//     const handleSetOtpToUser = async () => {
//         let token = await AsyncStorage.getItem('@setTokenToVerifyOtp');
//         console.log('====================================');
//         console.log('Tokenasfasf:', token);
//         console.log('====================================');
//     }


//     useEffect(() => {
//         handleSetOtpToUser();
//     }, []);


//     return (

//         <SafeAreaView style={styles.container}>
//             <LinearGradientExpo
//                 colors={['#4CAF50', '#2E7D32']}
//                 style={styles.container}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollView}>
//                     {/* Verify Your Number Screen */}
//                     <View style={styles.card}>
//                         {/* <View style={styles.iconContainer}> */}
//                         {/* <Ionicons name="phone-portrait-outline" size={32} color="white" /> */}
//                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
//                             <MagicalPhoneIllustration />
//                         </View>
//                         {/* </View> */}
//                         <Text style={{
//                             ...styles.title,
//                             marginTop: 20
//                         }}>Verify Your Number</Text>
//                         <Text style={styles.subtitle}>Please enter your Country & your Phone Number</Text>
//                         <View style={styles.inputContainer}>
//                             <TouchableOpacity style={styles.countrySelector}>
//                                 <Text style={{ fontSize: 24, marginRight: 8 }}>
//                                     🇺🇸
//                                 {/* <Ionicons name="flag-outline" size={24} color="gray" /> */}
//                                 </Text>
//                                 <Ionicons name="chevron-down" size={16} color="gray" />
//                             </TouchableOpacity>
//                             <TextInput
//                                 style={styles.input}
//                                 value={phoneNumber}
//                                 onChangeText={setPhoneNumber}
//                                 placeholder="Enter phone number"
//                                 keyboardType="phone-pad"
//                             />
//                         </View>
//                         <TouchableOpacity
//                             onPress={() => navigation.navigate('PhoneConfirmCodeScreen')}
//                             style={styles.button}>
//                             <Text style={styles.buttonText}>SEND</Text>
//                         </TouchableOpacity>
//                     </View>


//                 </ScrollView>
//             </LinearGradientExpo>
//         </SafeAreaView>
//     );
// }

// export default VerificationScreens;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#7c3aed', // Purple background
//     },
//     scrollView: {
//         flexGrow: 1,
//         justifyContent: 'center',
//         padding: 20,
//     },
//     card: {
//         backgroundColor: 'white',
//         borderRadius: 24,
//         padding: 24,
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     iconContainer: {
//         backgroundColor: '#7c3aed',
//         borderRadius: 50,
//         width: 64,
//         height: 64,
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginBottom: 24,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#7c3aed',
//         marginBottom: 8,
//         textAlign: 'center',
//     },
//     subtitle: {
//         fontSize: 14,
//         color: 'gray',
//         marginBottom: 24,
//         textAlign: 'center',
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         marginBottom: 24,
//     },
//     countrySelector: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: '#f3f4f6',
//         borderTopLeftRadius: 8,
//         borderBottomLeftRadius: 8,
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//     },
//     input: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: '#e5e7eb',
//         borderTopRightRadius: 8,
//         borderBottomRightRadius: 8,
//         paddingHorizontal: 12,
//         paddingVertical: 8,
//     },
//     codeInputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginBottom: 24,
//     },
//     codeInput: {
//         width: 50,
//         height: 50,
//         borderBottomWidth: 2,
//         borderBottomColor: '#7c3aed',
//         fontSize: 24,
//         textAlign: 'center',
//     },
//     button: {
//         backgroundColor: '#10b981',
//         borderRadius: 8,
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         width: '100%',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
// });



// VerificationScreens.js

import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Dimensions,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Path, Rect, Circle, Defs, LinearGradient, Stop, G } from 'react-native-svg';
import Animated, { useSharedValue, useAnimatedProps, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { LinearGradient as LinearGradientExpo } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig, Newauth } from '../../firebase/index'; // Adjust the path as needed
import { useFirebaseLogin } from "@itzsunny/firebase-login";
import Constants from 'expo-constants';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedG = Animated.createAnimatedComponent(G);

const { width } = Dimensions.get('window');
const size = width * 0.8;

// ... (MagicalPhoneIllustration component remains unchanged)

const MagicalPhoneIllustration = () => {
    // [Your existing MagicalPhoneIllustration code]
    // ... (Same as before)
    const rotation = useSharedValue(0);
    const scale = useSharedValue(1);

    useEffect(() => {
        rotation.value = withRepeat(
            withTiming(360, { duration: 10000, easing: Easing.linear }),
            -1,
            false
        );
        scale.value = withRepeat(
            withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedProps = useAnimatedProps(() => {
        return {
            transform: [{ rotate: `${rotation.value}deg` }],
        };
    });

    const scaleProps = useAnimatedProps(() => {
        return {
            transform: [{ scale: scale.value }],
        };
    });

    return (
        <View
            style={{
                width: size,
                height: size,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
            }}
        >
            <Svg width="100%" height="100%" viewBox="0 0 100 100">
                <Defs>
                    <LinearGradient id="bgGradient" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor="#8A2387" />
                        <Stop offset="0.5" stopColor="#E94057" />
                        <Stop offset="1" stopColor="#F27121" />
                    </LinearGradient>
                </Defs>

                {/* Background */}
                {/* <Rect x="0" y="0" width="100" height="100" fill="url(#bgGradient)" /> */}

                {/* Hand */}
                <Path
                    d="M30 70 Q35 75, 40 70 Q45 65, 50 70 Q55 75, 60 70 L60 90 Q55 95, 50 90 Q45 85, 40 90 Q35 95, 30 90 Z"
                    fill="#FFA07A"
                />

                {/* Phone */}
                <AnimatedG animatedProps={scaleProps}>
                    <Rect x="40" y="30" width="30" height="50" rx="3" fill="#4169E1" />

                    {/* Screen */}
                    <Rect x="42" y="32" width="26" height="46" rx="2" fill="#FFFFFF" />

                    {/* Checkmark */}
                    <Path
                        d="M50 55 L55 60 L65 50"
                        stroke="#4169E1"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                    />
                </AnimatedG>

                {/* Rotating Dots */}
                <AnimatedG animatedProps={animatedProps}>
                    {[...Array(12)].map((_, i) => {
                        const angle = (i * 30 * Math.PI) / 180;
                        const cx = 55 + 30 * Math.cos(angle);
                        const cy = 55 + 30 * Math.sin(angle);
                        return <Circle key={i} cx={cx} cy={cy} r="2" fill="#FFD700" />;
                    })}
                </AnimatedG>

                {/* Sparkles */}
                {[...Array(10)].map((_, i) => (
                    <AnimatedCircle
                        key={i}
                        cx={Math.random() * 100}
                        cy={Math.random() * 100}
                        r="1"
                        fill="#FFFFFF"
                        animatedProps={useAnimatedProps(() => ({
                            opacity: withRepeat(
                                withTiming(Math.random(), { duration: 1000 + Math.random() * 1000 }),
                                -1,
                                true
                            ),
                        }))}
                    />
                ))}
            </Svg>
        </View>
    );
};

const VerificationScreens = ({ navigation }: any) => {
    const [country, setCountry] = useState({ name: 'USA', code: '+1', flag: '🇺🇸' });
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSending, setIsSending] = useState(false);
    const { recaptcha, recaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });

    // Resend Timer States
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [timer, setTimer] = useState(60);
    const timerRef: any = useRef(null);

    useEffect(() => {
        // Cleanup timer on unmount
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    const startTimer = () => {
        setIsResendDisabled(true);
        setTimer(60);
        timerRef.current = setInterval(() => {
            setTimer((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setIsResendDisabled(false);
                    return 60;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleSendOtp = async () => {
        // Validate phone number based on selected country
        const fullPhoneNumber = `${country.code}${phoneNumber}`;

        if (!validatePhoneNumber(fullPhoneNumber)) {
            Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
            return;
        }

        try {
            setIsSending(true);
            console.log('====================================');
            console.log('FullPhoneNumber:', fullPhoneNumber);
            console.log('====================================');
            let id = await sendOtp(fullPhoneNumber);
            console.log('id', id);

            //   const confirmation = await Newauth().signInWithPhoneNumber(fullPhoneNumber);
            // Store confirmation object to verify OTP later
            //   await AsyncStorage.setItem('@confirmation', JSON.stringify(confirmation));
            if (id) {

                const token = await AsyncStorage.getItem('@setTokenToVerifyOtp');

                const headers = new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                });

                const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        query: `
            mutation updateVerificationOtpStep($input: inputUpdateVerificationOtpStep) {
                updateVerificationOtpStep(input: $input) 
            }
          `,
                        variables: {
                            input: {
                                confirmationResultInMobile: id,
                                phone: fullPhoneNumber,
                            }
                        }

                    }),
                });

                const data = await response.json();
                console.log('data:', data);

                Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
                navigation.navigate('PhoneConfirmCodeScreen');
            }
        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'Failed to send OTP. Please try again later.');



        }
        setIsSending(false);
    }



    const validatePhoneNumber = (phone: any) => {
        // Simple regex patterns for USA and Morocco
        const usaRegex = /^\+1\d{10}$/; // +1 followed by 10 digits
        const marocRegex = /^\+212\d{9}$/; // +212 followed by 9 digits

        if (country.code === '+1') {
            return usaRegex.test(phone);
        } else if (country.code === '+212') {
            return marocRegex.test(phone);
        }
        return false;
    };

    const toggleCountry = () => {
        if (country.code === '+1') {
            setCountry({ name: 'Morocco', code: '+212', flag: '🇲🇦' });
        } else {
            setCountry({ name: 'USA', code: '+1', flag: '🇺🇸' });
        }
    };

    return (
        <SafeAreaView style={styles.container}>

            {
                recaptcha
            }
            <LinearGradientExpo colors={['#4CAF50', '#2E7D32']} style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                    {/* Verify Your Number Screen */}
                    <View style={styles.card}>
                        <MagicalPhoneIllustration />
                        <Text style={styles.title}>Verify Your Number</Text>
                        <Text style={styles.subtitle}>Please enter your Country & Phone Number</Text>
                        <View style={styles.inputContainer}>
                            <TouchableOpacity style={styles.countrySelector} onPress={toggleCountry}>
                                <Text style={{ fontSize: 24, marginRight: 8 }}>{country.flag}</Text>
                                <Ionicons name="chevron-down" size={16} color="gray" />
                                <Text style={{ marginLeft: 8 }}>{country.code}</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.input}
                                value={phoneNumber}
                                onChangeText={setPhoneNumber}
                                placeholder="Enter phone number"
                                keyboardType="phone-pad"
                                maxLength={country.code === '+1' ? 10 : 9}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={handleSendOtp}
                            style={styles.button}
                            disabled={isSending}
                        >
                            {isSending ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>SEND OTP</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradientExpo>
        </SafeAreaView>
    );
};

export default VerificationScreens;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gradient: {
        flex: 1,
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
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
        color: '#2E7D32',
        marginTop: 20,
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
        alignItems: 'center',
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
        fontSize: 16,
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resendButton: {
        marginTop: 16,
    },
    resendButtonDisabled: {
        opacity: 0.6,
    },
    resendButtonText: {
        color: '#2E7D32',
        fontSize: 14,
    },
    resendButtonTextDisabled: {
        color: '#A5D6A7',
    },
});
