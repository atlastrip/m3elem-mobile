import React from 'react'
import { Dimensions, Modal, RefreshControl, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import window from "../../constants/Layout";
import { Image } from 'react-native'
import UserOrderListing from '@/components/UserOrderLising'
import MyQrCode from '../Auth/Artisan/Orders/MyQrCode'
import AsyncStorage from '@react-native-async-storage/async-storage'
import QRCode from 'react-native-qrcode-svg'
import { ButtonPrimary } from '@/components/index'


const Orders = ({ navigation }: any) => {
    const insets = useSafeAreaInsets()
    const [showQr, setShowQr] = React.useState(false)
    const [order, setOrder] = React.useState<any>(null)
    const [user, setUser] = React.useState<any>(null)
    const { width } = Dimensions.get('window')


    const getInfo = async () => {
        const User = await AsyncStorage.getItem('@user')
        setUser(JSON.parse(User || '{}'))
    }


    React.useEffect(() => {
        getInfo()
    }, [])

    return (
        <ScrollView
            refreshControl={
                <RefreshControl refreshing={false} onRefresh={() => { }} />
            }
        >

            <View
                style={{
                    width: window.width,
                    height: window.height / 3,
                    maxHeight: 400,
                    backgroundColor: 'black',
                    position: "relative"
                }}
            >
                <Image
                    style={{
                        width: window.width,
                        height: window.height / 3,
                        maxHeight: 400,
                        opacity: 0.6
                    }}
                    source={require('./images/abstraction.avif')}
                />
                <View className='absolute bottom-3 px-3 w-full'>
                    <Text className='text-5xl font-bold text-white ' >
                        My orders
                    </Text>
                    <TextInput
                        placeholderTextColor="black"
                        className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                        placeholder="Search"
                    />
                </View>

                {
                    showQr &&
                    <Modal visible={showQr} transparent={true}
                        onRequestClose={() => setShowQr(false)}
                        animationType="slide">
                        <View className="flex-1 justify-center items-center bg-white p-4 flex-row ">
                            <View className="w-full  bg-gray-100 rounded-2xl p-2">
                                <View className="items-center mb-4">
                                    <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
                                    <Text className="text-lg font-bold">{
                                        user?.firstName + ' ' + user?.lastName
                                    }</Text>
                                    {/* <View className="flex-row items-center mt-1">
                        <Text className="text-red-500">★</Text>
                        <Text className="text-lg ml-1">4.9/5 (15)</Text>
                    </View> */}
                                </View>
                                <View className="items-center mb-4">
                                    <QRCode value={JSON.stringify({order, user})}
                                        size={width > 300 ? width * .8 : 300}
                                    />
                                </View>
                                <ButtonPrimary text="OK" onPress={() => setShowQr(false)} Loading={false} setLoading={() => { }} />

                            </View>
                        </View>
                    </Modal>

                }
            </View>

            <View className='' >

                <UserOrderListing
                    setOrder={setOrder}
                    setShowQr={setShowQr}
                    navigation={navigation} />
            </View>
        </ScrollView>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
    },
    professionList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    professionItem: {
        marginRight: 12,
        marginBottom: 12,
    },
    professionName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    professionText: {
        fontSize: 12,
        color: 'grey',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },
    locationType: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
    },
});

export default Orders