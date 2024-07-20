import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { COLORS } from 'constants/theme';
import React, { useRef, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'

const Transactions = () => {
    const [SelectedType, setSelectedType] = useState("");
    const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ x: elementIndex * WINDOW_WIDTH, animated: true });
        }
    };
    const scrollViewRef1 = useRef<any>(null);
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <View>
                    <Image source={require('./images/abstract.jpg')} className='w-full h-64' />
                    <View className='absolute bottom-3 px-3 w-full'>
                        <Text className='text-5xl font-bold text-white ' >
                            Transactions
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        height: 30,
                    }}
                />
            </ScrollView>
        </View>
    )
}

export default Transactions