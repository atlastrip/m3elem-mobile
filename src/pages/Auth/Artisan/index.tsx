import React, { useState } from 'react'
import { Image, ScrollView, Switch, TouchableOpacity, View } from 'react-native'
import { Text } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS, SHADOWS } from 'constants/theme';
import { Motion } from '@legendapp/motion';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import Constants from 'expo-constants';


const ArtisanHomePage = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(v => !v);
const country = Constants?.manifest2?.extra?.expoClient?.extra?.country;


    return (
        <ScrollView style={{ flex: 1}}>
            {country == 'ma' && (
                
                <Image source={require('./Orders/images/paint-morocco.jpg')} className='opacity-10' style={{width : WINDOW_WIDTH , height : WINDOW_HEIGHT , position : "absolute" , top : 0, left : 0 }} />
            )}
            {country == 'usa' && (
                <Image source={require('./Orders/images/flag-usa.jpg')} className='opacity-10' style={{width : WINDOW_WIDTH , height : WINDOW_HEIGHT , position : "absolute" , top : 0, left : 0 }} />
            )}
            <View 
            style={{paddingTop : insets.top + 10  }}
            className="flex-1 z-20 p-4">
                <View className='flex-row justify-center py-2 mb-5'>
                    <Motion.View
                        initial={{ backgroundColor: isEnabled ? COLORS.primary : 'red', scale: 0 }}
                        animate={{ backgroundColor: isEnabled ? COLORS.primary : 'red', scale: !isEnabled ? 1 : 1.1 }}
                        style={SHADOWS.medium}
                        className='flex-row p-1 items-center rounded-full'>
                        <Text className='text-white mx-2 font-bold text-xl '>
                            {!isEnabled ? "Turn on availability" : 'You are available'}
                        </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "white" }}
                            thumbColor={isEnabled ? COLORS.primary : "#f4f3f4"}
                            ios_backgroundColor="#fef"
                            onValueChange={toggleSwitch}
                            value={isEnabled}
                        />
                    </Motion.View>
                </View>
                <ScrollView horizontal className="mb-4">
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-purple-100 p-4 rounded-lg flex-1 mr-2">
                        <Text className="text-purple-600 text-5xl font-bold">10</Text>
                        <Text className="text-gray-500 text-xl">New Leads</Text>
                    </View>
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-green-100 p-4 rounded-lg flex-1 mx-2">
                        <Text className="text-green-600 text-5xl font-bold">1200</Text>
                        <Text className="text-gray-500  text-xl">Chiffre d'affaire</Text>
                    </View>
                    <View
                        style={{ width: WINDOW_WIDTH * .7 }}
                        className="bg-red-100 p-4 rounded-lg flex-1 ml-2">
                        <Text className="text-red-600 text-5xl font-bold">4</Text>
                        <Text className="text-gray-500 text-xl">(40%) Accepted leads</Text>
                    </View>
                </ScrollView>

                {/* Shortcuts */}
                <Text className="text-xl font-bold mb-4">Shortcuts</Text>
                <View className=" justify-between gap-3">
                    <TouchableOpacity
                        onPress={() => navigation.navigate('MyQrCode')}
                        className="flex-1">
                        <LinearGradient
                            colors={['#4caf50', '#4fa866']}

                            start={[0, 0]}
                            end={[1, 1]}
                            className="p-4 rounded-2xl flex justify-between"
                        >
                            <FontAwesome name="qrcode" size={38} color="white" />
                            <Text className="text-white mt-8 font-bold text-xl">My QRcode, request review</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Leads')}
                        className="flex-1">
                        <LinearGradient
                            colors={['#8e24aa', '#ab47bc']}
                            start={[0, 0]}
                            end={[1, 1]}
                            className="p-4 rounded-2xl flex justify-between"
                        >
                            <MaterialCommunityIcons name="account-group-outline" size={38} color="white" />
                            <Text className="text-white mt-8 font-bold text-xl">Leads</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Menu')}
                        className="flex-1">
                        <LinearGradient
                            colors={['#f44336', '#e57373']}
                            start={[0, 0]}
                            end={[1, 1]}
                            className="p-4 rounded-2xl flex justify-between"
                        >
                            <MaterialCommunityIcons name="account-outline" size={38} color="white" />
                            <Text className="text-white mt-8 font-bold text-xl">Profile</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default ArtisanHomePage