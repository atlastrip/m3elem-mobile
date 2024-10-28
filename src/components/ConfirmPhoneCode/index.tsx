// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Svg, Path } from 'react-native-svg';




// const PhoneOtpConfirmationSvg = () => (
//     <Svg width="200" height="200" viewBox="0 0 24 24" fill="none">
//         <Path d="M17.707 10.707a1 1 0 0 0-1.414-1.414L10 15.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7z" fill="#4CAF50" />
//         <Path d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm7 13h-2v2h2v-2zm-2-3h2v2h-2v-2zm-1-2v2h-2v-2h2zm2-2h2v2h-2v-2zm-3 0v2h-2v-2h2zm6 0v2h-2v-2h2z" fill="#000" />
//     </Svg>
// );

// const ConfirmPhoneCode = () => {
//     const [phoneNumber, setPhoneNumber] = useState('010277 62 986');
//     const [verificationCode, setVerificationCode] = useState(['6', '8', '', '']);

//     return (
//         <SafeAreaView style={styles.container}>
//             <LinearGradient
//                 colors={['#4CAF50', '#2E7D32']}
//                 style={styles.container}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollView}>
//                     {/* Verification Code Screen */}
//                     <View style={styles.card}>
//                         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }}>
//                             {/* <Ionicons name="mail-outline" size={32} color="white" /> */}
//                             <PhoneOtpConfirmationSvg />
//                         </View>
//                         <Text style={{
//                             ...styles.title, marginTop: 24
//                         }}>Verification Code</Text>
//                         <Text style={styles.subtitle}>Please enter Code sent to {phoneNumber}</Text>
//                         <View style={styles.codeInputContainer}>
//                             {verificationCode.map((digit, index) => (
//                                 <TextInput
//                                     key={index}
//                                     style={styles.codeInput}
//                                     value={digit}
//                                     onChangeText={(text) => {
//                                         const newCode = [...verificationCode];
//                                         newCode[index] = text;
//                                         setVerificationCode(newCode);
//                                     }}
//                                     maxLength={1}
//                                     keyboardType="number-pad"
//                                 />
//                             ))}
//                         </View>
//                         <TouchableOpacity style={styles.button}>
//                             <Text style={styles.buttonText}>VERIFY</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </LinearGradient>
//         </SafeAreaView>
//     );
// }

// export default ConfirmPhoneCode;

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


// import React, { useState, useRef, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     SafeAreaView,
//     ScrollView,
//     Keyboard,
//     Alert,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';
// import { Svg, Path } from 'react-native-svg';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Constants from 'expo-constants';
// import { useFirebaseLogin } from '@itzsunny/firebase-login';
// import { firebaseConfig, Newauth } from 'firebase';
// const PhoneOtpConfirmationSvg = () => (
//     <Svg width="100" height="100" viewBox="0 0 24 24" fill="none">
//         <Path
//             d="M17.707 10.707a1 1 0 0 0-1.414-1.414L10 15.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7z"
//             fill="#4CAF50"
//         />
//         <Path
//             d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm7 13h-2v2h2v-2zm-2-3h2v2h-2v-2zm-1-2v2h-2v-2h2zm2-2h2v2h-2v-2zm-3 0v2h-2v-2h2zm6 0v2h-2v-2h2z"
//             fill="#000"
//         />
//     </Svg>
// );

// const ConfirmPhoneCode = () => {
//     const [phoneNumber, setPhoneNumber] = useState('');
//     const [verificationCode, setVerificationCode] = useState(['', '', '', '']);
//     const [isResendDisabled, setIsResendDisabled] = useState(true);
//     const [timer, setTimer] = useState(60);
//     const [isSending, setIsSending] = useState(false);
//     const { recaptchaBanner, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });
//     const [verificationId, setVerificationId] = useState('');

//     // Create refs for each TextInput
//     const inputRefs: any = useRef([]);

//     // Effect to handle the countdown timer
//     useEffect(() => {
//         let interval: any = null;
//         if (isResendDisabled) {
//             interval = setInterval(() => {
//                 setTimer((prevTimer) => {
//                     if (prevTimer <= 1) {
//                         clearInterval(interval);
//                         setIsResendDisabled(false);
//                         return 60;
//                     }
//                     return prevTimer - 1;
//                 });
//             }, 1000);
//         }
//         return () => clearInterval(interval);
//     }, [isResendDisabled]);

//     // Simulate sending the code (replace with actual API call)
//     const sendVerificationCode = async () => {
//         try {
//             setIsSending(true);
//             // Simulate network request delay
//             await new Promise((resolve) => setTimeout(resolve, 2000));
//             // Assume the code is sent successfully
//             Alert.alert('Success', 'Verification code sent!');
//             setIsResendDisabled(true);
//             setTimer(60);
//         } catch (error) {
//             Alert.alert('Error', 'Failed to send verification code. Please try again.');
//         } finally {
//             setIsSending(false);
//         }
//     };


//     // Function to focus the first empty input
//     const focusFirstEmpty = () => {
//         const firstEmptyIndex: any = verificationCode.findIndex((digit) => digit === '');
//         if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
//             inputRefs.current[firstEmptyIndex].focus();
//         } else {
//             // If all are filled, dismiss the keyboard
//             Keyboard.dismiss();
//         }
//     };

//     // Handle text change for each input
//     const handleChangeText = (text: any, index: any) => {
//         if (/^\d$/.test(text)) { // Ensure only single digit is entered
//             const newCode = [...verificationCode];
//             newCode[index] = text;
//             setVerificationCode(newCode);
//             // Move to next input if not the last
//             if (index < inputRefs.current.length - 1) {
//                 inputRefs.current[index + 1].focus();
//             } else {
//                 // If last input, dismiss the keyboard and verify
//                 Keyboard.dismiss();
//                 verifyCode(newCode.join(''));
//             }
//         } else if (text === '') {
//             const newCode = [...verificationCode];
//             newCode[index] = '';
//             setVerificationCode(newCode);
//         }
//     };

//     // Handle key press for backspace
//     const handleKeyPress = ({ nativeEvent }: any, index: any) => {
//         if (nativeEvent.key === 'Backspace' && verificationCode[index] === '') {
//             if (index > 0) {
//                 inputRefs.current[index - 1].focus();
//             }
//         }
//     };

//     // Handle onFocus to focus the first empty input
//     const handleOnFocus = () => {
//         focusFirstEmpty();
//     };

//     // Function to verify the code (you can implement this)
//     const verifyCode = async (code: any) => {
//         console.log('Verifying code:', code);

//         if (code.length !== 6) {
//             Alert.alert('Error', 'Please enter a valid code');
//             return;
//         }

//         let yo = await verifyOtp(verificationId, code);
//         console.log('yo:', yo);

//         // Add your verification logic here
//         // For example, navigate to the next screen on success
//     };

//     // Handle Resend Code
//     const handleResendCode = () => {
//         if (!isResendDisabled) {
//             sendVerificationCode();
//             setVerificationCode(['', '', '', '']);
//             focusFirstEmpty();
//         }
//     };



//     const getUserInfo = async () => {
//         const token = await AsyncStorage.getItem('@setTokenToVerifyOtp');

//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//             method: 'POST',
//             headers,
//             body: JSON.stringify({
//                 query: `
//     query user {
//             user {
//             id
//             phone
//             confirmationResultInMobile
//      }
// }
//   `,

//             }),
//         });

//         const data = await response.json();

//         setPhoneNumber(data.data.user.phone);
//         setVerificationId(data.data.user.confirmationResultInMobile);
//         console.log('data:', data);

//     }

//     useEffect(() => {
//         getUserInfo();
//     }, []);

//     return (
//         <SafeAreaView style={styles.container}>
//             <LinearGradient
//                 colors={['#4CAF50', '#2E7D32']}
//                 style={styles.gradient}
//             >
//                 <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
//                     {/* Verification Code Screen */}
//                     <View style={styles.card}>
//                         <View style={styles.iconContainer}>
//                             <PhoneOtpConfirmationSvg />
//                         </View>
//                         <Text style={styles.title}>Verification Code</Text>
//                         <Text style={styles.subtitle}>
//                             Please enter the code sent to {phoneNumber}
//                         </Text>
//                         <View style={styles.codeInputContainer}>
//                             {verificationCode.map((digit, index) => (
//                                 <TextInput
//                                     key={index}
//                                     ref={(ref) => (inputRefs.current[index] = ref)}
//                                     style={styles.codeInput}
//                                     value={digit}
//                                     onChangeText={(text) =>
//                                         handleChangeText(text, index)
//                                     }
//                                     onKeyPress={(e) => handleKeyPress(e, index)}
//                                     keyboardType="number-pad"
//                                     maxLength={1}
//                                     returnKeyType="done"
//                                     onFocus={handleOnFocus}
//                                     autoFocus={index === 0 ? true : false}
//                                     importantForAutofill="no"
//                                 />
//                             ))}
//                         </View>
//                         <TouchableOpacity
//                             style={[
//                                 styles.button,
//                                 isSending && styles.buttonDisabled,
//                             ]}
//                             onPress={() => verifyCode(verificationCode.join(''))}
//                             disabled={isSending}
//                         >
//                             {isSending ? (
//                                 <Ionicons name="reload-outline" size={24} color="#fff" />
//                             ) : (
//                                 <Text style={styles.buttonText}>VERIFY</Text>
//                             )}
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={[
//                                 styles.resendButton,
//                                 isResendDisabled && styles.resendButtonDisabled,
//                             ]}
//                             onPress={handleResendCode}
//                             disabled={isResendDisabled || isSending}
//                         >
//                             <Text
//                                 style={[
//                                     styles.resendButtonText,
//                                     isResendDisabled && styles.resendButtonTextDisabled,
//                                 ]}
//                             >
//                                 {isResendDisabled ? `Resend Code in ${timer}s` : 'Resend Code'}
//                             </Text>
//                         </TouchableOpacity>
//                     </View>
//                 </ScrollView>
//             </LinearGradient>
//         </SafeAreaView>
//     );
// };

// export default ConfirmPhoneCode;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     gradient: {
//         flex: 1,
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
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 8,
//         elevation: 5,
//     },
//     iconContainer: {
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#4CAF50',
//         borderRadius: 100, // Make it circular
//         padding: 20,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#2E7D32',
//         marginTop: 24,
//         marginBottom: 8,
//         textAlign: 'center',
//     },
//     subtitle: {
//         fontSize: 14,
//         color: 'gray',
//         marginBottom: 24,
//         textAlign: 'center',
//     },
//     codeInputContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         width: '80%',
//         marginBottom: 24,
//     },
//     codeInput: {
//         width: 50,
//         height: 50,
//         borderBottomWidth: 2,
//         borderBottomColor: '#4CAF50',
//         fontSize: 24,
//         textAlign: 'center',
//         color: '#000',
//     },
//     button: {
//         backgroundColor: '#10b981',
//         borderRadius: 8,
//         paddingVertical: 12,
//         paddingHorizontal: 24,
//         width: '100%',
//         alignItems: 'center',
//         flexDirection: 'row',
//         justifyContent: 'center',
//     },
//     buttonDisabled: {
//         backgroundColor: '#6EE7B7',
//     },
//     buttonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     resendButton: {
//         marginTop: 16,
//     },
//     resendButtonDisabled: {
//         opacity: 0.6,
//     },
//     resendButtonText: {
//         color: '#2E7D32',
//         fontSize: 14,
//     },
//     resendButtonTextDisabled: {
//         color: '#A5D6A7',
//     },
// });


import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Keyboard,
    Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';
import { useFirebaseLogin } from '@itzsunny/firebase-login';
import { firebaseConfig, Newauth } from 'firebase';
import { useDispatch } from 'react-redux';
import { isLogin, setUser } from 'store/User';

const PhoneOtpConfirmationSvg = () => (
    <Svg width="100" height="100" viewBox="0 0 24 24" fill="none">
        <Path
            d="M17.707 10.707a1 1 0 0 0-1.414-1.414L10 15.586l-2.293-2.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l7-7z"
            fill="#4CAF50"
        />
        <Path
            d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v16h12V4H6zm7 13h-2v2h2v-2zm-2-3h2v2h-2v-2zm-1-2v2h-2v-2h2zm2-2h2v2h-2v-2zm-3 0v2h-2v-2h2zm6 0v2h-2v-2h2z"
            fill="#000"
        />
    </Svg>
);

const ConfirmPhoneCode = ({ navigation }: any) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationCode, setVerificationCode]: any = useState(['', '', '', '', '', '']); // Updated to 6 digits
    const [isResendDisabled, setIsResendDisabled]: any = useState(true);
    const [timer, setTimer] = useState(60);
    const [isSending, setIsSending] = useState(false);
    const { recaptchaBanner, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });
    const [verificationId, setVerificationId]: any = useState('');
    const dispatch = useDispatch();
    // Create refs for each TextInput
    const inputRefs: any = useRef([]);

    // Effect to handle the countdown timer
    useEffect(() => {
        let interval: any = null;
        if (isResendDisabled) {
            interval = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 1) {
                        clearInterval(interval);
                        setIsResendDisabled(false);
                        return 60;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isResendDisabled]);

    // Simulate sending the code (replace with actual API call)
    const sendVerificationCode = async () => {
        try {
            setIsSending(true);
            // Simulate network request delay
            await new Promise((resolve) => setTimeout(resolve, 2000));
            // Assume the code is sent successfully
            Alert.alert('Success', 'Verification code sent!');
            setIsResendDisabled(true);
            setTimer(60);
            setVerificationCode(['', '', '', '', '', '']); // Reset to 6 digits
            focusFirstEmpty();
        } catch (error) {
            Alert.alert('Error', 'Failed to send verification code. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    // Function to focus the first empty input
    const focusFirstEmpty = () => {
        const firstEmptyIndex = verificationCode.findIndex((digit: any) => digit === '');
        if (firstEmptyIndex !== -1 && inputRefs.current[firstEmptyIndex]) {
            inputRefs.current[firstEmptyIndex].focus();
        } else {
            // If all are filled, dismiss the keyboard
            Keyboard.dismiss();
        }
    };

    // Handle text change for each input
    const handleChangeText = (text: any, index: any) => {
        if (/^\d$/.test(text)) { // Ensure only single digit is entered
            const newCode = [...verificationCode];
            newCode[index] = text;
            setVerificationCode(newCode);
            // Move to next input if not the last
            if (index < inputRefs.current.length - 1) {
                inputRefs.current[index + 1].focus();
            } else {
                // If last input, dismiss the keyboard and verify
                Keyboard.dismiss();
                verifyCode(newCode.join(''));
            }
        } else if (text === '') {
            const newCode = [...verificationCode];
            newCode[index] = ''; // Clear the digit
            setVerificationCode(newCode);
            // Move focus to the previous input if we're removing a digit
            if (index > 0) {
                inputRefs.current[index - 1].focus();
            }
        }
    };

    // Handle key press for backspace
    const handleKeyPress = ({ nativeEvent }: any, index: any) => {
        if (nativeEvent.key === 'Backspace') {
            if (verificationCode[index] === '' && index > 0) {
                // Focus the previous input if the current input is empty
                inputRefs.current[index - 1].focus();
            }
        }
    };

    // Handle onFocus to focus the first empty input
    const handleOnFocus = () => {
        focusFirstEmpty();
    };

    // Function to verify the code (you can implement this)
    const verifyCode = async (code: any) => {

        try {
            console.log('Verifying code:', code);

            if (code.length !== 6) { // Updated to check for 6 digits
                Alert.alert('Error', 'Please enter a valid 6-digit code');
                return;
            }

            let yo = await verifyOtp(verificationId, code);
            console.log('yo:', yo);


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
            mutation updateConfirmationOtpStep{
                updateConfirmationOtpStep{
                    user {
                  id
                  firstName
                  lastName
                  email
                  phone
                  role
                  imageProfile
                  pushToken
                }
                token
                }
            }
          `,

                }),
            });

            const data = await response.json();
            console.log('====================================');
            console.log('data:', data);
            console.log('====================================');
            return
            await AsyncStorage.setItem('@token', data.data.updateConfirmationOtpStep.token);
            await AsyncStorage.setItem('@user', JSON.stringify(data.data.updateConfirmationOtpStep.user));
            await AsyncStorage.removeItem('@setTokenToVerifyOtp');
            console.log('data:', data);

            Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
            dispatch(isLogin(true));
            dispatch(setUser(data.data.updateConfirmationOtpStep.user));

        } catch (error) {
            Alert.alert('Error', 'Failed to verify code. Please try again.');
        }
    };

    // Handle Resend Code
    const handleResendCode = () => {
        if (!isResendDisabled) {
            sendVerificationCode();
        }
    };

    const getUserInfo = async () => {
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
    query user {
            user {
            id
            phone
            confirmationResultInMobile
     }
}
  `,

            }),
        });

        const data = await response.json();

        setPhoneNumber(data.data.user.phone);
        setVerificationId(data.data.user.confirmationResultInMobile);
        console.log('data:', data);
    }

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <LinearGradient
                colors={['#4CAF50', '#2E7D32']}
                style={styles.gradient}
            >
                <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
                    {/* Verification Code Screen */}
                    <View style={styles.card}>
                        <View style={styles.iconContainer}>
                            <PhoneOtpConfirmationSvg />
                        </View>
                        <Text style={styles.title}>Verification Code</Text>
                        <Text style={styles.subtitle}>
                            Please enter the code sent to {phoneNumber}
                        </Text>
                        <View style={styles.codeInputContainer}>
                            {verificationCode.map((digit: any, index: any) => (
                                <TextInput
                                    key={index}
                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                    style={styles.codeInput}
                                    value={digit}
                                    onChangeText={(text) =>
                                        handleChangeText(text, index)
                                    }
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                    keyboardType="number-pad"
                                    maxLength={1}
                                    returnKeyType="done"
                                    onFocus={handleOnFocus}
                                    autoFocus={index === 0 ? true : false}
                                    importantForAutofill="no"
                                />
                            ))}
                        </View>
                        <TouchableOpacity
                            style={[
                                styles.button,
                                isSending && styles.buttonDisabled,
                            ]}
                            onPress={() => verifyCode(verificationCode.join(''))}
                            disabled={isSending}
                        >
                            {isSending ? (
                                <Ionicons name="reload-outline" size={24} color="#fff" />
                            ) : (
                                <Text style={styles.buttonText}>VERIFY</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.resendButton,
                                isResendDisabled && styles.resendButtonDisabled,
                            ]}
                            onPress={handleResendCode}
                            disabled={isResendDisabled || isSending}
                        >
                            <Text
                                style={[
                                    styles.resendButtonText,
                                    isResendDisabled && styles.resendButtonTextDisabled,
                                ]}
                            >
                                {isResendDisabled ? `Resend Code in ${timer}s` : 'Resend Code'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </LinearGradient>
        </SafeAreaView>
    );
};

export default ConfirmPhoneCode;

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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4CAF50',
        borderRadius: 100, // Make it circular
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginTop: 24,
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 24,
        textAlign: 'center',
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%', // Adjusted to accommodate 6 inputs
        marginBottom: 24,
    },
    codeInput: {
        width: 40, // Adjusted width for 6 inputs
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#4CAF50',
        fontSize: 24,
        textAlign: 'center',
        color: '#000',
    },
    button: {
        backgroundColor: '#10b981',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#6EE7B7',
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
