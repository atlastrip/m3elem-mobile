import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isLogin, setUser } from 'store/User';
import { useDispatch } from 'react-redux';
import { useFirebaseLogin } from '@itzsunny/firebase-login';
import { firebaseConfig, Newauth } from 'firebase';

type FormData = {
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
    token: string;
};

const VerificationAccountArtisantScreen: React.FC = ({ navigation }: any) => {
    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: '',
        token: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage]: any = useState('');
    const { recaptchaBanner, verifyOtp } = useFirebaseLogin({ auth: Newauth, firebaseConfig: firebaseConfig });

    //   const navigation = useNavigation();
    const dispatch = useDispatch();
    const handleChange = (name: keyof FormData, value: string) => {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        const { firstName, lastName, password, confirmPassword, token } = formData;

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            // Fetch the confirmation result (replace with your API endpoint)
            const mytoken = await getToken();
            const user: any = await getUser();
            const parseUser = JSON.parse(user);
            const headers = new Headers({
                "Content-Type": "application/json",
                "Authorization": `Bearer ${mytoken}`,
            });


            console.log('parseUser:', parseUser.email);



            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
            mutation getArtisantByEmailForVerificationOtpForMobile($input: inputGetArtisantByEmailForVerificationOtp) {
                getArtisantByEmailForVerificationOtpForMobile(input: $input) {
                    confirmationResultInMobile
                }
                }

          `,
                    variables: {
                        input: {
                            email: parseUser.email
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
            //   const data = await response.json();
            const confirmationResult = data.data.getArtisantByEmailForVerificationOtpForMobile.confirmationResultInMobile;

            if (!confirmationResult) {
                throw new Error('No OTP verification session found');
            }

            console.log('====================================');
            console.log('confirmationResult:', confirmationResult);
            console.log('====================================');




            // Verify OTP token
            //   const credential = PhoneAuthProvider.credential(confirmationResult.verificationId, token);
            //   await signInWithCredential(auth, credential);

            // Update user information (replace with your API endpoint)



            try {
                let yo = await verifyOtp(confirmationResult, token);
                console.log('yo:', yo);
            } catch (error) {
                console.log('error:', error);
                throw new Error('Invalid OTP token');
            }


            const updateResponse = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
            mutation UpdateArtisantProForMobile($inputUpdateUser: inputUpdateArtisantPro) {
                UpdateArtisantProForMobile(inputUpdateUser: $inputUpdateUser) {
                  user {
                    id
                    firstName
                    lastName
                    email
                    password
                    provider
                    role
                    categories{
                      id
                    }
                    AccountStatus
                  }
                  token
                }
              }

          `,
                    variables: {
                        inputUpdateUser: {
                            email: parseUser.email,
                            firstName,
                            
                            lastName,
                            password,
                        }
                    }
                }),
            });


            const updateData = await updateResponse.json();

            console.log('updateData:', updateData);

            await AsyncStorage.setItem('@token', updateData?.data?.UpdateArtisantProForMobile?.token);
            await AsyncStorage.setItem('@user', JSON.stringify(updateData?.data?.UpdateArtisantProForMobile?.user));

            Alert.alert('Success', 'Phone number verified successfully.');
            dispatch(isLogin(true));
            dispatch(setUser(updateData?.data?.UpdateArtisantProForMobile?.user));


        } catch (error) {
            Alert.alert('Error', (error as Error).message || 'An unexpected error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (

        <LinearGradient
            colors={['#4CAF50', '#2E7D32']}
            style={tw`flex-1`}>
            <ScrollView contentContainerStyle={tw`flex-grow justify-center items-center py-10`}>
                <View style={tw`w-11/12 max-w-md bg-white p-6 rounded-3xl shadow-lg`}>
                    <Text style={tw`text-3xl font-bold mb-6 text-center text-green-600`

                    }>Verify Your Account</Text>
                    <TextInput
                        style={tw`w-full px-4 py-3 mb-4 border border-gray-300 rounded-full text-gray-700`}
                        placeholder="First Name"
                        value={formData.firstName}
                        onChangeText={(text) => handleChange('firstName', text)}
                    />
                    <TextInput
                        style={tw`w-full px-4 py-3 mb-4 border border-gray-300 rounded-full text-gray-700`}
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChangeText={(text) => handleChange('lastName', text)}
                    />
                    <TextInput
                        style={tw`w-full px-4 py-3 mb-4 border border-gray-300 rounded-full text-gray-700`}
                        placeholder="Password"
                        secureTextEntry
                        value={formData.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                    <TextInput
                        style={tw`w-full px-4 py-3 mb-4 border border-gray-300 rounded-full text-gray-700`}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={formData.confirmPassword}
                        onChangeText={(text) => handleChange('confirmPassword', text)}
                    />
                    <TextInput
                        style={tw`w-full px-4 py-3 mb-4 border border-gray-300 rounded-full text-gray-700`}
                        placeholder="Verification Token (OTP)"
                        value={formData.token}
                        onChangeText={(text) => handleChange('token', text)}
                    />
                    <TouchableOpacity
                        onPress={handleSubmit}
                        disabled={loading}
                        style={tw`w-full bg-green-600 py-3 rounded-full items-center justify-center flex-row`}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <>
                                <Ionicons name="checkmark-circle-outline" size={24} color="white" style={tw`mr-2`} />
                                <Text style={tw`text-white font-bold text-lg`}>Verify Account</Text>
                            </>
                        )}
                    </TouchableOpacity>
                    {loading && <Text style={tw`text-green-600 font-bold text-lg mt-4 text-center`}>Verifying...</Text>}
                </View>
            </ScrollView>
        </LinearGradient>
    );
};

export default VerificationAccountArtisantScreen;