import { WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'

const ImagePreview = ({ route }: any) => {
    const Params = route.params;

    return (
        <View style={{ flex: 1 }}>

            <Text className='text-center font-bold my-6 text-2xl' >
                Order Images
            </Text>
            <ScrollView style={{ flex: 1 }}>

                <View className='flex-col mx-auto items-center w-full gap-y-3'>
                    {Params?.images?.map((uri: any, i: any) => (
                        <View key={i} style={{ width: WINDOW_WIDTH * .95, height: WINDOW_WIDTH * .95 }} className=" bg-gray-200 rounded-lg">
                            <Image
                                source={{ uri }}
                                style={{ width: WINDOW_WIDTH * .95, height: WINDOW_WIDTH * .95 }}
                                className="rounded-lg"
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>

        </View>
    )
}

export default ImagePreview