import React, { useState, useRef, useCallback, useMemo } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import ImageViewing from 'react-native-image-viewing';
import { ButtonPrimary } from '@/components/index';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface ReviewProps {
    name: string;
    comment: string;
    rating: number;
    timeAgo: string;
}

const Review: React.FC<ReviewProps> = ({ name, comment, rating, timeAgo }) => {
    return (
        <View className="flex-row items-start mt-4">
            <Image source={{ uri: 'https://scrubnbubbles.com/wp-content/uploads/2022/05/cleaning-service.jpeg' }} className="w-10 h-10 rounded-full mr-3" />
            <View className="flex-1">
                <View className="flex-row justify-between">
                    <Text className="font-bold">{name}</Text>
                    <Text className="text-gray-500">{timeAgo}</Text>
                </View>
                <Text className="text-gray-600">{comment}</Text>
                <View className="flex-row mt-1">
                    <Ionicons name="star" color="orange" size={16} />
                    <Text className="text-gray-600 ml-1">{rating}</Text>
                </View>
            </View>
        </View>
    );
};

const ArtisanPage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        'https://www.millcitycleaning.com/wp-content/uploads/2021/10/hire-home-cleaner.jpg',
        'https://mastergreencleaning.com/wp-content/uploads/2020/03/residential-1.jpg',
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQV8QFU1L0Fit9fK_5WxQoe7VKgZcRAIg-REbLYECCvRQoRV5JMkSQedmzdpUW9e3ROj1U&usqp=CAU'
    ];

    const openImageModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalVisible(true);
    };

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const openBottomSheet = useCallback(() => {
        setBottomView('book')
        bottomSheetModalRef.current?.present();
    }, []);
    const openBottomSheetProfessions = useCallback(() => {
        setBottomView('professions')
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePhoneCall = () => {
        Linking.openURL('tel:1234567890');
    };

    const handleWhatsApp = () => {
        const url = 'whatsapp://send?phone=1234567890&text=Hello';
        Linking.openURL(url).catch(() => {
            Alert.alert('Make sure WhatsApp is installed on your device');
        });
    };
    const snapPoints = useMemo(() => ['20%', '35%'], []);
    const [BottomView, setBottomView] = useState("book");
    const [Profession, setProfession] = useState("House Cleaning");

    return (
        <GestureHandlerRootView >
            <BottomSheetModalProvider>
                <View style={{ flex: 1 }} className='bg-white'>
                    <ScrollView className="">
                        <View className="bg-white shadow-md">
                            <View className="w-full h-64 rounded-t-lg">
                                <Image
                                    source={{ uri: 'https://scrubnbubbles.com/wp-content/uploads/2022/05/cleaning-service.jpeg' }}
                                    className="w-full h-64 rounded-t-lg"
                                />
                            </View>
                            <View className="p-4 ">
                                <View className='flex-row'>


                                    <TouchableOpacity
                                        onPress={openBottomSheetProfessions}
                                        className="flex-row items-center gap-2" >
                                        {/* <TouchableOpacity> */}
                                        <Text className="text-lg font-bold text-primary-500">{Profession}</Text>
                                        <View
                                            style={{ backgroundColor: COLORS.primary }}
                                            className='p-1 px-2 rounded-full '>
                                            <Text className="text-xs font-bold text-white">+1</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row items-center gap-2" >
                                    <Text className="text-gray-600 mt-1">Jenny Wilson</Text>
                                    <Ionicons name="star" color="orange" size={18} />
                                    <Text className="text-gray-600 mt-1">
                                        4.8 (6,479 reviews)
                                    </Text>
                                </View>
                                <Text style={{ color: COLORS.primary }} className="text-2xl font-bold mt-2">$20</Text>
                                <Text className="text-gray-600 mt-1">Floor price</Text>
                                <Text className="text-gray-600 mt-2">
                                    233 Grand Park Avenue, New York
                                </Text>
                                <Text className="text-gray-600 mt-2">
                                    Cleaning service in New York
                                </Text>
                                {/* <TouchableOpacity className="mt-4">
                                    <Text style={{ color: COLORS.primary }} className="font-bold">Read more...</Text>
                                </TouchableOpacity> */}
                            </View>
                            <View className="p-4">
                                <Text className="text-lg font-bold">Photos & Videos</Text>
                                <ScrollView horizontal className="mt-2">
                                    {images.map((uri, index) => (
                                        <TouchableOpacity key={index} onPress={() => openImageModal(index)}>
                                            <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2">
                                                <Image
                                                    source={{ uri }}
                                                    className="w-24 h-24 rounded-lg"
                                                />
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                            </View>
                            <View className="p-4 mb-32">
                                <Text className="text-lg font-bold">Reviews</Text>
                                <ScrollView horizontal>
                                    <TouchableOpacity style={{ borderColor: COLORS.primary }} className='m-3 mx-1 p-2 flex-row items-center justify-center border-2 rounded-full px-3 min-w-[90px]'>
                                        <Text style={{ color: COLORS.primary }} className="text-center font-bold text-lg">All</Text>
                                    </TouchableOpacity>
                                    {Array(6).fill('').map((_, i) => (
                                        <TouchableOpacity key={i} style={{ borderColor: COLORS.primary }} className='m-3 mx-1 p-2 flex-row items-center justify-center border-2 rounded-full px-3 min-w-[90px]'>
                                            <Ionicons name="star" color={COLORS.primary} size={16} />
                                            <Text style={{ color: COLORS.primary }} className="text-center font-bold text-lg">{i}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                <Review
                                    name="Laurelee Quintero"
                                    comment="Awesome! This is what I was looking for. I recommend to everyone."
                                    rating={5}
                                    timeAgo="2 weeks ago"
                                />
                                <Review
                                    name="Clinton Mcclure"
                                    comment="The workers are very professional and the results are very satisfying! I like it very much."
                                    rating={5}
                                    timeAgo="3 weeks ago"
                                />
                                <Review
                                    name="Chaya Chute"
                                    comment="This is the first time I've used his services, and the results were amazing!"
                                    rating={5}
                                    timeAgo="4 weeks ago"
                                />
                            </View>
                        </View>
                        <ImageViewing
                            images={images.map(uri => ({ uri }))}
                            imageIndex={currentImageIndex}
                            visible={isModalVisible}
                            onRequestClose={() => setIsModalVisible(false)}
                        />
                    </ScrollView>
                    <View className="absolute bottom-0 left-0 w-full px-3 pb-3">
                        <ButtonPrimary onPress={openBottomSheet} Loading={false} setLoading={() => { }} text='Book Now' />
                    </View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        snapPoints={snapPoints}
                        index={1}
                        style={{ borderTopColor: 'gray', borderTopWidth: 2 }}

                        backgroundStyle={{ backgroundColor: 'white' }}
                    >
                        {BottomView === 'book' ? (
                            <View className='px-3'>
                                <Text className='text-center font-bold mb-3 text-lg'>
                                    Contact Jenny Wilson
                                </Text>

                                <TouchableOpacity
                                    onPress={handlePhoneCall}
                                    className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100 '>
                                    <Text
                                        className='text-lg font-bold'>
                                        Call Phone
                                    </Text>
                                    <Ionicons name="chevron-forward" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={handleWhatsApp}
                                    className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100 '>
                                    <Text
                                        className='text-lg font-bold'>
                                        Open WhatsApp
                                    </Text>
                                    <Ionicons name="chevron-forward" size={20} />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <View className='px-3'>
                                <Text className='text-center font-bold mb-3 text-lg'>
                                    Change Category
                                </Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        bottomSheetModalRef.current?.close();
                                        setProfession("House cleaning")
                                    }}
                                    className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100 '>
                                    <Text
                                        className='text-lg font-bold'>
                                        House cleaning
                                    </Text>
                                    <Ionicons name="chevron-forward" size={20} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        bottomSheetModalRef.current?.close();
                                        setProfession("Outdoor cleaning")
                                    }}
                                    className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100 '>
                                    <Text
                                        className='text-lg font-bold'>
                                        Outdoor cleaning
                                    </Text>
                                    <Ionicons name="chevron-forward" size={20} />
                                </TouchableOpacity>
                            </View>
                        )}


                    </BottomSheetModal>
                </View>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

export default ArtisanPage;
