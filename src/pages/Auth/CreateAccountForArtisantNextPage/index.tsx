// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Image, Alert, Animated as RNAnimated } from 'react-native';
// import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring, withTiming, Easing } from 'react-native-reanimated';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { Feather, Ionicons } from '@expo/vector-icons';
// import FormCreateArtisanCategories from './FormCreateArtisanCategories';
// import PhoneInputComponent from '@/components/PhoneInputComponent';
// import { useRoute } from '@react-navigation/native';
// import Constants from 'expo-constants';
// import { getToken } from '@/helpers/getToken';
// import { useFirebaseLogin } from '@itzsunny/firebase-login';
// import { firebaseConfig, Newauth } from 'firebase';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { COLORS } from 'constants/theme';
// const { width, height } = Dimensions.get('window');

// export const Logo = ({ style = styles.logo }) => (
//   <Image
//     resizeMode='contain'

//     source={require('@/assets/AHOUSEGURU LOGO.png')} style={style} />
// );

// // Dummy data for categories
// const dummyCategories = [
//   { id: '1', name: 'Plumbing' },
//   { id: '2', name: 'Electrical' },
//   { id: '3', name: 'Carpentry' },
//   { id: '4', name: 'Painting' },
//   { id: '5', name: 'Landscaping' },
// ];

// const CreateAccountForArtisantNextPage = ({ navigation }: any) => {
//   const [selectedCategories, setSelectedCategories]: any = useState([]);
//   const [viewMode, setViewMode] = useState('grid');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [done, setDone] = useState(false);
//   const [enableTextMessage, setEnableTextMessage] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState(null); // New state for error messages
//   const buttonScale = useSharedValue(1);
//   const route = useRoute();
//   const { recaptcha, recaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });


//   const { categoryId, zipCode } = route.params as { categoryId: string, zipCode: string };
//   const [country, setCountry] = useState({ name: 'USA', code: '+1', flag: '🇺🇸' });




//   const validatePhoneNumber = (phone: any) => {
//     // Simple regex patterns for USA and Morocco
//     const usaRegex = /^\+1\d{10}$/; // +1 followed by 10 digits
//     const marocRegex = /^\+212\d{11}$/; // +212 followed by 9 digits
//     return true
//     if (country.code === '+1') {
//       return usaRegex.test(phone);
//     } else if (country.code === '+212') {
//       return marocRegex.test(phone);
//     }
//     return false;
//   };

//   const toggleCountry = () => {
//     if (country.code === '+1') {
//       setCountry({ name: 'Morocco', code: '+212', flag: '🇲🇦' });
//     } else {
//       setCountry({ name: 'USA', code: '+1', flag: '🇺🇸' });
//     }
//   };


//   const handleSignup = async () => {
//     // Reset error message before new attempt
//     setErrorMessage(null);

//     console.log('Email:', email);
//     console.log('Phone:', phone);
//     console.log('Selected categories:', selectedCategories);
//     console.log('Enable text message:', enableTextMessage);
//     console.log('====================================');
//     console.log('zip code:', zipCode);
//     console.log('====================================');
//     console.log('categoryId:', categoryId);

//     const categories = selectedCategories.find((category: any) => category?.id === categoryId)?.subcategories?.map((e: any) => e?.id) || [];

//     try {
//       setLoading(true);
//       const token = await getToken();
//       const headers = new Headers({
//         "Content-Type": "application/json",
//         "Authorization": `Bearer ${token}`,
//       });



//       const fullPhoneNumber = `+${phone}`;

//       if (!validatePhoneNumber(fullPhoneNumber)) {
//         setLoading(false);
//         Alert.alert('Invalid Phone Number', 'Please enter a valid phone number.');
//         return;
//       }

//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             mutation signUpAsProInMobile($inputSignUp: inputSignUp) {
//               signUpAsProInMobile(inputSignUp: $inputSignUp) {
//                 user {
//                   id
//                   firstName
//                   lastName
//                   email
//                   password
//                   provider
//                   role
//                   categories {
//                     id
//                   }
//                 }
//                 token
//               }
//             }
//           `,
//           variables: {
//             inputSignUp: {
//               email: email,
//               phone: phone,
//               role: "artisant",
//               categories: [...categories, categoryId],
//               zipCodes: [zipCode],
//               enableTextMessage: enableTextMessage,
//               confirmationResult: null,
//             }
//           }
//         }),
//       });

//       const data: any = await response.json();
//       console.log('data:', data);

//       if (data.errors && data.errors.length > 0) {
//         // Set the error message from backend
//         setErrorMessage(data.errors[0].message);
//         setLoading(false);
//         return;
//       }


//       await AsyncStorage.setItem('@token', data?.data?.signUpAsProInMobile?.token);
//       await AsyncStorage.setItem('@user', JSON.stringify(data?.data?.signUpAsProInMobile?.user));





//       let id = await sendOtp(fullPhoneNumber);
//       console.log('id', id);

//       if (id) {

//         const newtoken = data?.data?.signUpAsProInMobile?.token;

//         const headers = new Headers({
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${newtoken}`,
//         });

//         const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//           method: 'POST',
//           headers,
//           body: JSON.stringify({
//             query: `
//     mutation updateVerificationOtpStep($input: inputUpdateVerificationOtpStep) {
//         updateVerificationOtpStep(input: $input) 
//     }
//   `,
//             variables: {
//               input: {
//                 confirmationResultInMobile: id,
//                 phone: fullPhoneNumber,
//               }
//             }

//           }),
//         });

//         const result = await response.json();
//         console.log('result:', result);

//         Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
//         setLoading(false);

//         navigation.navigate('VerificationAccountArtisantScreen');
//       }


//       // Handle successful signup (e.g., navigate to next screen)
//       // You might want to navigate or perform other actions here
//       setLoading(false);

//     } catch (error: any) {
//       setLoading(false);
//       console.log('====================================');
//       console.log('error:', error.message);
//       console.log('====================================');
//       setErrorMessage(error.message);
//     }
//   };

//   const animatedButtonStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: buttonScale.value }],
//   }));

//   const handlePressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const handlePressOut = () => {
//     buttonScale.value = withSpring(1);
//   };

//   const modalAnimation = useSharedValue(0);

//   const animatedModalStyle = useAnimatedStyle(() => ({
//     opacity: modalAnimation.value,
//     transform: [{ scale: modalAnimation.value }],
//   }));

//   useEffect(() => {
//     if (showModal) {
//       modalAnimation.value = withSpring(1);
//     } else {
//       modalAnimation.value = withSpring(0);
//       setErrorMessage(null); // Clear error message when modal is closed
//     }
//   }, [showModal]);

//   return (
//     <LinearGradient
//       colors={['#4CAF50', '#2E7D32']}
//       style={styles.container}
//     >
//       {
//         recaptcha
//       }
//       <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
//         <View style={styles.blurContainer}>
//           <Text style={styles.title}>Select any other services you do.</Text>
         
//           <ScrollView style={styles.scrollView}>
//             <FormCreateArtisanCategories
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               email={email}
//               setEmail={setEmail}
//               phone={phone}
//               setPhone={setPhone}
//               showModal={showModal}
//               setShowModal={setShowModal}
//               Done={done}
//               setDone={setDone}
//               handleSignup={handleSignup}
//               setEnableTextMessage={setEnableTextMessage}
//               enableTextMessage={enableTextMessage}
//               Loading={loading}
//               categories={dummyCategories}
//               SelectedTypeOfView={viewMode}
//             />
//             <Modal
//               visible={showModal}
//               transparent
//               animationType="fade"
//               onRequestClose={() => setShowModal(false)}
//             >
//               <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
//                 <View style={styles.modalContent}>
//                   <Logo />
//                   <Text style={styles.modalTitle}>New customers are waiting.</Text>
//                   <Text style={styles.modalSubtitle}>There are 30,000 leads on A HOUSE GURU a day.</Text>

//                   {/* Error Message */}
//                   {errorMessage && (
//                     <Animated.View
//                       entering={FadeIn.duration(300)}
//                       exiting={FadeOut.duration(300)}
//                       style={styles.errorContainer}
//                     >
//                       <Ionicons name="alert-circle" size={20} color="#D32F2F" />
//                       <Text style={styles.errorText}>{errorMessage}</Text>
//                       <TouchableOpacity onPress={() => setErrorMessage(null)}>
//                         <Ionicons name="close-circle" size={20} color="#D32F2F" style={styles.errorCloseIcon} />
//                       </TouchableOpacity>
//                     </Animated.View>
//                   )}

//                   <TextInput
//                     style={styles.input}
//                     placeholder="Email"
//                     value={email}
//                     onChangeText={setEmail}
//                     keyboardType="email-address"
//                   />
//                   {/* <TextInput
//                     style={styles.input}
//                     placeholder="Phone"
//                     value={phone}
//                     onChangeText={setPhone}
//                     keyboardType="phone-pad"
//                   /> */}

//                   <View style={{
//                     display: 'flex',
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}>
//                     <TextInput
//                       style={{ ...styles.input, flex: 1 }}
//                       value={phone}
//                       onChangeText={setPhone}
//                       placeholder="e.g 15044754720"
//                       keyboardType="phone-pad"
//                       maxLength={12}
//                     />
//                   </View>
               


//                   <Text style={styles.disclaimer}>
//                     We'll text you with a verification code. Carrier rates may apply.
//                   </Text>

//                   <TouchableOpacity
//                     style={styles.checkbox}
//                     onPress={() => setEnableTextMessage(!enableTextMessage)}
//                   >
//                     <Ionicons
//                       name={enableTextMessage ? 'checkbox-outline' : 'square-outline'}
//                       size={24}
//                       color="#007AFF"
//                     />
//                     <Text style={styles.checkboxText}>Enable text messages</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity
//                     style={styles.continueButton}
//                     onPress={handleSignup}
//                   >
//                     <Text style={styles.continueButtonText}>
//                       {loading ? "Loading..." : "Continue"}
//                     </Text>
//                   </TouchableOpacity>

//                   <Text style={styles.termsText}>
//                     By clicking Continue, you agree to the Terms of Use and Privacy Policy.
//                   </Text>

//                   <TouchableOpacity
//                     style={styles.closeButton}
//                     onPress={() => setShowModal(false)}
//                   >
//                     <Ionicons name="close" size={24} color="black" />
//                   </TouchableOpacity>
//                 </View>
//               </Animated.View>
//             </Modal>
//           </ScrollView>

//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => {
//                 // handleSignup();
//                 setShowModal(true);
//               }}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <LinearGradient
//                 colors={['#4CAF50', '#45a049']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Next'}</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('CreateAccountForArtisant')}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <View
//                 style={styles.buttonGradient}
//               >
//                 <Text style={
//                   {
//                     color: COLORS.primary,
//                     fontSize: 18,
//                     fontWeight: 'bold',
//                   }
//                 }>{loading ? 'Loading...' : 'Back'}</Text>
//               </View>
//             </TouchableOpacity>
//           </Animated.View>
//         </View>
//       </Animated.View>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     width: width * 0.9,
//     maxWidth: 400,
//     height: height * 0.9,
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   countrySelector: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#f3f4f6',
//     borderTopLeftRadius: 8,
//     borderBottomLeftRadius: 8,
//     paddingHorizontal: 12,
//     paddingVertical: 8,
//   },
//   blurContainer: {
//     flex: 1,
//     borderRadius: 20,
//     overflow: 'hidden',
//     padding: 20,
//     backgroundColor: "white"
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   viewToggle: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginBottom: 20,
//   },
//   toggleButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 20,
//     marginHorizontal: 5,
//   },
//   activeToggleButton: {
//     backgroundColor: '#4CAF50',
//   },
//   toggleText: {
//     marginLeft: 5,
//     color: '#4CAF50',
//     fontWeight: 'bold',
//   },
//   activeToggleText: {
//     color: '#fff',
//   },
//   scrollView: {
//     flex: 1,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.4)', // Removed for animated opacity
//   },
//   modalContent: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 16,
//     width: '90%',
//     position: 'relative',
//   },
//   modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   modalSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 16,
//   },
//   disclaimer: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 8,
//   },
//   checkbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   checkboxText: {
//     marginLeft: 8,
//     fontSize: 16,
//   },
//   continueButton: {
//     backgroundColor: COLORS.primary,
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
//   },
//   continueButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   termsText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 16,
//     textAlign: 'center',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
//   },
//   logo: {
//     width: 30,
//     height: 30,
//   },
//   errorContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFCDD2',
//     padding: 10,
//     borderRadius: 8,
//     marginTop: 16,
//   },
//   errorText: {
//     flex: 1,
//     color: '#D32F2F',
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   errorCloseIcon: {
//     marginLeft: 8,
//   },
// });

// export default CreateAccountForArtisantNextPage;


import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Dimensions, Modal, TextInput, Image, Alert } from 'react-native';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FormCreateArtisanCategories from './FormCreateArtisanCategories';
import { useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';
import { useFirebaseLogin } from '@itzsunny/firebase-login';
import { firebaseConfig, Newauth } from 'firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from 'constants/theme';
const { width, height } = Dimensions.get('window');

export const Logo = ({ style = styles.logo }) => (
  <Image
    resizeMode='contain'
    source={require('@/assets/AHOUSEGURU LOGO.png')}
    style={style}
  />
);

// Dummy data for categories
const dummyCategories = [
  { id: '1', name: 'Plumbing' },
  { id: '2', name: 'Electrical' },
  { id: '3', name: 'Carpentry' },
  { id: '4', name: 'Painting' },
  { id: '5', name: 'Landscaping' },
];

const CreateAccountForArtisantNextPage = ({ navigation }: any) => {
  const [selectedCategories, setSelectedCategories]: any = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [done, setDone] = useState(false);
  const [enableTextMessage, setEnableTextMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Updated type
  const buttonScale = useSharedValue(1);
  const route = useRoute();
  const { recaptcha, recaptchaBanner, sendOtp, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });

  const { categoryId, zipCode } = route.params as { categoryId: string, zipCode: string };
  const [country, setCountry] = useState({ name: 'USA', code: '+1', flag: '🇺🇸' });

  // Email validation function
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Phone validation function (American number)
  const validatePhoneNumber = (phone: string) => {
    const usaRegex = /^\+1\d{10}$/; // +1 followed by 10 digits
    return usaRegex.test(phone);
  };

  const handleSignup = async () => {
    // Reset error message before new attempt
    setErrorMessage(null);

    // Validate email and phone
    if (!email) {
      setErrorMessage('Email is required.');
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!phone) {
      setErrorMessage('Phone number is required.');
      return;
    }
    if (!validatePhoneNumber(`+${phone}`)) {
      setErrorMessage('Please enter a valid American phone number.');
      return;
    }

    console.log('Email:', email);
    console.log('Phone:', phone);
    console.log('Selected categories:', selectedCategories);
    console.log('Enable text message:', enableTextMessage);
    console.log('====================================');
    console.log('zip code:', zipCode);
    console.log('====================================');
    console.log('categoryId:', categoryId);

    const categories = selectedCategories.find((category: any) => category?.id === categoryId)?.subcategories?.map((e: any) => e?.id) || [];

    try {
      setLoading(true);
      const token = await getToken();
      const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      });

      const fullPhoneNumber = `+${phone}`;

      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            mutation signUpAsProInMobile($inputSignUp: inputSignUp) {
              signUpAsProInMobile(inputSignUp: $inputSignUp) {
                user {
                  id
                  firstName
                  lastName
                  email
                  password
                  provider
                  role
                  categories {
                    id
                  }
                }
                token
              }
            }
          `,
          variables: {
            inputSignUp: {
              email: email,
              phone: phone,
              role: "artisant",
              categories: [...categories, categoryId],
              zipCodes: [zipCode],
              enableTextMessage: enableTextMessage,
              confirmationResult: null,
            }
          }
        }),
      });

      const data: any = await response.json();
      console.log('data:', data);

      if (data.errors && data.errors.length > 0) {
        // Set the error message from backend
        setErrorMessage(data.errors[0].message);
        setLoading(false);
        return;
      }

      await AsyncStorage.setItem('@token', data?.data?.signUpAsProInMobile?.token);
      await AsyncStorage.setItem('@user', JSON.stringify(data?.data?.signUpAsProInMobile?.user));

      let id = await sendOtp(fullPhoneNumber);
      console.log('id', id);

      if (id) {
        const newtoken = data?.data?.signUpAsProInMobile?.token;

        const headers = new Headers({
          "Content-Type": "application/json",
          "Authorization": `Bearer ${newtoken}`,
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

        const result = await response.json();
        console.log('result:', result);

        Alert.alert('OTP Sent', 'Please check your phone for the verification code.');
        setLoading(false);

        navigation.navigate('VerificationAccountArtisantScreen');
      }

      setLoading(false);

    } catch (error: any) {
      setLoading(false);
      console.log('====================================');
      console.log('error:', error.message);
      console.log('====================================');
      setErrorMessage(error.message);
    }
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const modalAnimation = useSharedValue(0);

  const animatedModalStyle = useAnimatedStyle(() => ({
    opacity: modalAnimation.value,
    transform: [{ scale: modalAnimation.value }],
  }));

  useEffect(() => {
    if (showModal) {
      modalAnimation.value = withSpring(1);
    } else {
      modalAnimation.value = withSpring(0);
      setErrorMessage(null); // Clear error message when modal is closed
    }
  }, [showModal]);

  return (
    <LinearGradient
      colors={['#4CAF50', '#2E7D32']}
      style={styles.container}
    >
      {recaptcha}
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
        <View style={styles.blurContainer}>
          <Text style={styles.title}>Select any other services you do.</Text>

          <ScrollView style={styles.scrollView}>
            <FormCreateArtisanCategories
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              showModal={showModal}
              setShowModal={setShowModal}
              Done={done}
              setDone={setDone}
              handleSignup={handleSignup}
              setEnableTextMessage={setEnableTextMessage}
              enableTextMessage={enableTextMessage}
              Loading={loading}
              categories={dummyCategories}
              SelectedTypeOfView={viewMode}
            />
            <Modal
              visible={showModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowModal(false)}
            >
              <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
                <View style={styles.modalContent}>
                  <Logo />
                  <Text style={styles.modalTitle}>New customers are waiting.</Text>
                  <Text style={styles.modalSubtitle}>There are 30,000 leads on A HOUSE GURU a day.</Text>

                  {/* Error Message */}
                  {errorMessage && (
                    <Animated.View
                      entering={FadeIn.duration(300)}
                      exiting={FadeOut.duration(300)}
                      style={styles.errorContainer}
                    >
                      <Ionicons name="alert-circle" size={20} color="#D32F2F" />
                      <Text style={styles.errorText}>{errorMessage}</Text>
                      <TouchableOpacity onPress={() => setErrorMessage(null)}>
                        <Ionicons name="close-circle" size={20} color="#D32F2F" style={styles.errorCloseIcon} />
                      </TouchableOpacity>
                    </Animated.View>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                  />

                  <View style={styles.phoneContainer}>
                    <Text style={styles.countryCode}>{country.flag} {country.code}</Text>
                    <TextInput
                      style={styles.phoneInput}
                      value={phone}
                      onChangeText={setPhone}
                      placeholder="e.g 1234567890"
                      keyboardType="phone-pad"
                      maxLength={11}
                    />
                  </View>

                  <Text style={styles.disclaimer}>
                    We'll text you with a verification code. Carrier rates may apply.
                  </Text>

                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setEnableTextMessage(!enableTextMessage)}
                  >
                    <Ionicons
                      name={enableTextMessage ? 'checkbox-outline' : 'square-outline'}
                      size={24}
                      color="#007AFF"
                    />
                    <Text style={styles.checkboxText}>Enable text messages</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.continueButton}
                    onPress={handleSignup}
                  >
                    <Text style={styles.continueButtonText}>
                      {loading ? "Loading..." : "Continue"}
                    </Text>
                  </TouchableOpacity>

                  <Text style={styles.termsText}>
                    By clicking Continue, you agree to the Terms of Use and Privacy Policy.
                  </Text>

                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setShowModal(false)}
                  >
                    <Ionicons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
              </Animated.View>
            </Modal>
          </ScrollView>

          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowModal(true)}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>{loading ? 'Loading...' : 'Next'}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('CreateAccountForArtisant')}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <View style={styles.buttonGradient}>
                <Text style={styles.backButtonText}>{loading ? 'Loading...' : 'Back'}</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: width * 0.9,
    maxWidth: 400,
    height: height * 0.9,
  },
  blurContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
    backgroundColor: "white",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButtonText: {
    color: COLORS.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    width: '90%',
    position: 'relative',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    textAlign: 'center',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    width: '100%',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  countryCode: {
    fontSize: 16,
    marginRight: 8,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  checkboxText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
    width: '100%',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFCDD2',
    padding: 10,
    borderRadius: 8,
    marginTop: 16,
    width: '100%',
  },
  errorText: {
    flex: 1,
    color: '#D32F2F',
    marginLeft: 8,
    fontSize: 14,
  },
  errorCloseIcon: {
    marginLeft: 8,
  },
});

export default CreateAccountForArtisantNextPage;
