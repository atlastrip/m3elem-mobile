import React from 'react'
import { RefreshControl, StyleSheet, Text, TextInput } from 'react-native'
import { ScrollView } from 'react-native'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import window from "../../constants/Layout";
import { Image } from 'react-native'
import OrderListing from '@/components/OrderLising'


const Orders = ({navigation} : any) => {
    const insets = useSafeAreaInsets()
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
            </View>
            <View className='' >

                <OrderListing navigation={navigation} />
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