import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Alert, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import ImageViewing from 'react-native-image-viewing';
import { ButtonPrimary } from '@/components/index';
import { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { FontAwesome } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';

interface ReviewProps {
    name: string;
    comment: string;
    rating: number;
    timeAgo: string;
    image: string;
}

const CustomerReviews = ({ averageRating, totalReviews, ratingPercentages = [] }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Customer Reviews</Text>
            <View style={styles.overallRatingContainer}>
                <Text style={styles.averageRating}>
                    {averageRating}
                </Text>
                <FontAwesome name="star" size={24} color="#FFD700" style={styles.starIcon} />
                <Text style={styles.totalReviews}>Based on {totalReviews} reviews</Text>
            </View>
            {ratingPercentages?.map((percentage, index) => (
                <View key={index} style={styles.ratingRow}>
                    <View style={styles.starLabelContainer}>
                        <FontAwesome name="star" size={16} color="#FFD700" />
                        <Text style={styles.starLabelText}>{index + 1}</Text>
                    </View>
                    <View style={styles.progressBarContainer}>
                        <View style={[styles.progressBar, { width: `${percentage}%` }]} />
                    </View>
                    <Text style={styles.percentageText}>{percentage}%</Text>
                </View>
            ))}
        </View>
    );
};

export const Review: React.FC<ReviewProps> = ({ name, comment, rating, timeAgo, image }: any) => {


    return (
        <View className="flex-row items-start mt-4">
            <Image source={{ uri: image || 'https://scrubnbubbles.com/wp-content/uploads/2022/05/cleaning-service.jpeg' }} className="w-10 h-10 rounded-full mr-3" />
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

const ArtisanPage: React.FC = ({ route, navigation }: any) => {

    const { artisan, SelectedProfession } = route.params;
    console.log('SelectedProfession', SelectedProfession);
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const [userId, setUserId]: any = useState(null);
    const images = artisan?.images.map((uri: any) => uri?.source) || [];



    const fetchUserId = async () => {
        const newUser: any = await getUser();
        setUserId(JSON.parse(newUser));
    };
    useEffect(() => {
        fetchUserId();
    }, [])

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

    const handlePhoneCall = async () => {
        if (!artisan?.phone) return Alert.alert("No phone number found")
        let data: any = await HandleUnlockDirectLead(artisan?.id, "CALL")
        // const { isOkay, error } = JSON.parse(data?.data?.addDirectLead)
        console.log('====================================');
        console.log('data?.data?.addDirectLead', data?.data?.addDirectLead);
        console.log('====================================');
        if (!JSON.parse(data?.data?.addDirectLead)?.isOkay) return Alert.alert(JSON.parse(data?.data?.addDirectLead)?.error)
        Linking.openURL(`tel:${artisan?.phone}`)
    };

    const handleWhatsApp = async () => {
        if (!artisan?.phone) return Alert.alert("No phone number found")
        let data: any = await HandleUnlockDirectLead(artisan?.id, "WHATSAPP")
        // const { isOkay, error } = JSON.parse(data?.data?.addDirectLead)
        console.log('====================================');
        console.log('data?.data?.addDirectLead', data?.data?.addDirectLead);
        console.log('====================================');


        if (data?.data?.addDirectLead?.id) {
            const conversationId = await createOrRetrieveConversation(
                data?.data?.addDirectLead?.id,
                data?.data?.addDirectLead?.artisantId?.id,
                userId?.id
            );

            setLoading(false);
            navigation.navigate('Chat', {
                conversationId,
                userId: userId?.id,
                userName: userId?.firstName,
                order: {
                    ...data?.data?.addDirectLead,
                    owner: userId,
                    artisant: data?.data?.addDirectLead?.artisantId
                }
            });
        } else {
            setLoading(false);
            return Alert.alert(data?.data?.addDirectLead?.error);
        }
    };
    const snapPoints = useMemo(() => ['20%', '35%'], []);
    const [BottomView, setBottomView] = useState("book");
    const [Profession, setProfession] = useState(SelectedProfession?.name);
    const [selectedFilter, setSelectedFilter] = useState(null); // null means "All"

    const filteredReviews = selectedFilter === null
        ? artisan?.reviews
        : artisan?.reviews.filter((review: any) => review?.rating == selectedFilter);


    const HandleUnlockDirectLead = async (id: any, callMethod: any) => {
        const token = await getToken();
        const User: any = await getUser();

        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        // console.log('SelectedProfession', SelectedProfession);
        // console.log('artisan', artisan);
        // console.log('callMethod', callMethod);

        try {

            setLoading(true);

            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation addDirectLead($input: directLeadInput) {
                                addDirectLead(input: $input){
                                        id
                                        owner{
                                            id
                                            firstName
                                            lastName
                                            pushToken
                                            imageProfile
                                            images {
                                            id 
                                            source
                                            }
                                        }
                                        artisantUnlockedLead{
                                            id
                                            firstName
                                            lastName
                                            pushToken
                                            imageProfile
                                            images {
                                            id 
                                            source
                                            }
                                        }
                                        artisantId{
                                            id
                                            firstName
                                            lastName
                                            pushToken
                                            imageProfile
                                            images {
                                            id 
                                            source
                                            }
                                        }
                                    
                                    error
                                    isOkay
                                }
                            }
    
                            `,
                        variables: {
                            input: {
                                title: `Direct lead `,
                                images: SelectedProfession?.img,
                                professionals: SelectedProfession?.id,
                                directLeadStatus: "PENDING",
                                callOrWhatsapp: callMethod,
                                artisantId: artisan?.id
                            }
                        }

                    }),
                }
            );

            const json = await res.json();
            setLoading(false);
            return json;
        } catch (error: any) {
            setLoading(false);
            return Alert.alert(error.message)

        }
    }



    const calculateReviewSummary = (reviews: any) => {
        const totalReviews = reviews.length;
        const ratingCounts = [0, 0, 0, 0, 0]; // [1-star, 2-star, 3-star, 4-star, 5-star]

        reviews.forEach(({ rating }: any) => {
            ratingCounts[parseInt(rating) - 1] += 1;
        });

        const averageRating = (
            ratingCounts.reduce((acc, count, index) => acc + (count * (index + 1)), 0) / totalReviews
        ).toFixed(1);

        const ratingPercentages = ratingCounts.map(count => ((count / totalReviews) * 100).toFixed(0));

        return { averageRating, totalReviews, ratingPercentages };
    };



    const { averageRating, totalReviews, ratingPercentages } = calculateReviewSummary(artisan?.reviews?.filter((review: any) => review?.order?.professionals[0].id === SelectedProfession.id));

    console.log('artisan?.images', artisan?.images);




    return (
        <GestureHandlerRootView >
            <BottomSheetModalProvider>
                <View style={{ flex: 1 }} className='bg-white'>
                    <ScrollView className="">
                        <View className="bg-white shadow-md">
                            <View className="w-full h-64 rounded-t-lg">
                                <Image
                                    source={{
                                        uri:
                                            artisan?.images[0]?.source ||
                                            'https://scrubnbubbles.com/wp-content/uploads/2022/05/cleaning-service.jpeg'
                                    }}
                                    className="w-full h-64 rounded-t-lg"
                                />
                            </View>
                            <View className="p-4 ">
                                <View className='flex-row'>


                                    <TouchableOpacity
                                        onPress={() => { }}
                                        className="flex-row items-center gap-2" >
                                        <Text className="text-lg font-bold text-primary-500">{Profession}</Text>

                                    </TouchableOpacity>
                                </View>
                                <View className="flex-row items-center gap-2" >
                                    <Text className="text-gray-600 mt-1">{
                                        artisan?.firstName + ' ' + artisan?.lastName
                                    }</Text>
                                    {/* <Ionicons name="star" color="orange" size={18} /> */}
                                    <Text className="text-gray-600 mt-1">

                                        {/* calcul the number of reviews that match this professional */}
                                        {
                                            artisan?.reviews?.filter((review: any) => review?.order?.professionals[0].id === SelectedProfession.id).length + ' reviews'
                                        }
                                    </Text>
                                </View>
                                {/* <Text style={{ color: COLORS.primary }} className="text-2xl font-bold mt-2">$20</Text> */}
                                {/* <Text className="text-gray-600 mt-1">Floor price</Text> */}
                                <View>
                                    <Text className="text-gray-600 mt-2">
                                        {
                                            artisan?.adress ? artisan?.adress : 'No address found'
                                        }
                                    </Text>
                                </View>
                                <View>
                                    <Text className="text-lg font-bold mt-4">About</Text>
                                    <Text className="text-gray-600 mt-2">
                                        {
                                            artisan?.aboutYou ? artisan?.aboutYou : 'No description found'
                                        }
                                    </Text>

                                </View>
                                {/* <TouchableOpacity className="mt-4">
                                    <Text style={{ color: COLORS.primary }} className="font-bold">Read more...</Text>
                                </TouchableOpacity> */}
                            </View>
                            {/* <View className="p-4">
                                <Text className="text-lg font-bold">Photos & Videos</Text>
                                <ScrollView horizontal className="mt-2">

                                    {
                                        artisan?.images?.length > 0 ?
                                            artisan?.images.map((uri: any, index: any) => (
                                                
                                                <TouchableOpacity key={index} onPress={() => openImageModal(index)}>
                                                    <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2">
                                                        <Image
                                                            source={{ uri: uri?.source }}
                                                            className="w-24 h-24 rounded-lg"
                                                        />
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                            :
                                            <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2 flex-row justify-center items-center">
                                                <Text className="text-center text-xs text-gray-600">No images</Text>
                                            </View>
                                    }
                                </ScrollView>
                            </View> */}

                            <View className="p-4">
                                <Text className="text-lg font-bold">Photos & Videos</Text>
                                <ScrollView horizontal className="mt-2">
                                    {
                                        artisan?.images?.length > 0 ?
                                            artisan?.images.map((mediaItem: any, index: any) => (
                                                <TouchableOpacity key={index} onPress={() => openImageModal(index)}>
                                                    <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2">
                                                        {
                                                            mediaItem?.name?.split('.')[1]?.toLowerCase() == 'jpg' || mediaItem?.name?.split('.')[1]?.toLowerCase() == 'png' || mediaItem?.name?.split('.')[1]?.toLowerCase() == 'jpeg' ? (
                                                                <Image
                                                                    source={{ uri: mediaItem?.source }}
                                                                    className="w-24 h-24 rounded-lg"
                                                                />
                                                            ) : mediaItem?.name?.split('.')[1] == 'mp4' ? (
                                                                <Video
                                                                    source={{ uri: mediaItem?.source }}
                                                                    style={{ width: 96, height: 96, borderRadius: 8 }}
                                                                    // resizeMode="cover"
                                                                    // muted
                                                                    resizeMode={ResizeMode.COVER}
                                                                    isMuted={false}
                                                                />
                                                            ) : mediaItem?.name?.split('.')[1] == 'gif' ? (
                                                                <Image
                                                                    source={{ uri: mediaItem?.source }}
                                                                    className="w-24 h-24 rounded-lg"
                                                                    style={{ resizeMode: 'cover' }}
                                                                />
                                                            ) : (
                                                                <Text className="text-center text-xs text-gray-600">Unsupported media</Text>
                                                            )
                                                        }
                                                    </View>
                                                </TouchableOpacity>
                                            ))
                                            :
                                            <View className="w-24 h-24 bg-gray-200 rounded-lg mr-2 flex-row justify-center items-center">
                                                <Text className="text-center text-xs text-gray-600">No media</Text>
                                            </View>
                                    }
                                </ScrollView>
                            </View>

                            {/* payment method availible CashOnDeliveryPayment
                                    BankTransferPayment
                                    CheckPayment  */}
                            <View className="p-4 flex-col">
                                <Text className="text-lg font-bold">Accepted Payment Methods</Text>
                                <View className="flex-col items-start mt-2 ">
                                    <View className="flex-row items-center gap-2 mb-2">
                                        {
                                            artisan?.CashOnDeliveryPayment &&

                                            <>
                                                <Ionicons name="checkmark-circle" color={
                                                    COLORS.primary
                                                } size={16} />
                                                <Text className="text-gray-600">Cash</Text>
                                            </>

                                        }
                                    </View>
                                    <View className="flex-row items-center gap-2">

                                        {
                                            artisan?.BankTransferPayment &&

                                            <>
                                                <Ionicons name="checkmark-circle" color={
                                                    COLORS.primary
                                                } size={16} />
                                                <Text className="text-gray-600">Bank transfer</Text>
                                            </>

                                        }
                                    </View>
                                    <View className="flex-row items-center gap-2">

                                        {
                                            artisan?.CheckPayment &&

                                            <>
                                                <Ionicons name="checkmark-circle" color={
                                                    COLORS.primary
                                                } size={16} />
                                                <Text className="text-gray-600">Check payment</Text>
                                            </>

                                            // :
                                            // <Ionicons name="remove-circle" color={'gray'} size={16} />
                                        }
                                    </View>
                                </View>
                            </View>

                            <View>
                                {
                                    artisan?.reviews?.filter((review: any) => review?.order?.professionals[0].id === SelectedProfession.id).length > 0 &&
                                    <CustomerReviews averageRating={averageRating} totalReviews={totalReviews} ratingPercentages={ratingPercentages} />
                                }
                            </View>

                            <View className="p-4 mb-32">
                                <Text className="text-lg font-bold">Reviews</Text>
                                <ScrollView horizontal>
                                    <TouchableOpacity
                                        style={{ borderColor: COLORS.primary }}
                                        className={`m-3 mx-1 p-2 flex-row items-center justify-center border-2 rounded-full px-3 min-w-[90px] ${selectedFilter === null ? 'bg-primary' : ''}`}
                                        onPress={() => setSelectedFilter(null)}
                                    >
                                        <Text style={{ color: COLORS.primary }} className="text-center font-bold text-lg">All</Text>
                                    </TouchableOpacity>
                                    {Array(6).fill('').map((_, i) => (
                                        <TouchableOpacity
                                            key={i}
                                            style={{ borderColor: COLORS.primary }}
                                            className={`m-3 mx-1 p-2 flex-row items-center justify-center border-2 rounded-full px-3 min-w-[90px] ${selectedFilter === i ? 'bg-primary' : ''}`}
                                            onPress={() => setSelectedFilter(i)}
                                        >
                                            <Ionicons name="star" color={COLORS.primary} size={16} />
                                            <Text style={{ color: COLORS.primary }} className="text-center font-bold text-lg">{i}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </ScrollView>
                                {filteredReviews && filteredReviews.length > 0 ? (
                                    filteredReviews.map((review: any, index: any) => {
                                        if (review?.order?.professionals[0].id === SelectedProfession.id) {
                                            return (
                                                <Review
                                                    key={index}
                                                    name={review?.owner?.firstName + ' ' + review?.owner?.lastName}
                                                    comment={review?.description}
                                                    rating={review?.rating}
                                                    timeAgo={review?.timeAgo}
                                                    image={review?.owner?.imageProfile}
                                                />
                                            );
                                        } else {
                                            return null;
                                        }
                                    })
                                ) : (
                                    <View className="flex-row items-center justify-center">
                                        <Text className="text-gray-600">No reviews yet</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                        <ImageViewing
                            images={images.map((uri: any) => ({ uri }))}
                            imageIndex={currentImageIndex}
                            visible={isModalVisible}

                            onRequestClose={() => setIsModalVisible(false)}
                        />

                    </ScrollView>
                    <View className="absolute bottom-0 left-0 w-full px-3 pb-3">
                        {
                            loading ? <ButtonPrimary text='Loading...' onPress={() => { }} setLoading={() => { }} />
                                :
                                <ButtonPrimary onPress={openBottomSheet} setLoading={() => { }} text='Book Now' />
                        }
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
                                    Contact {artisan?.firstName + ' ' + artisan?.lastName}
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


const styles = StyleSheet.create({
    container: {
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    heading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    overallRatingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    averageRating: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFD700',
        marginRight: 5,
    },
    starIcon: {
        marginRight: 5,
    },
    totalReviews: {
        fontSize: 14,
        color: '#888',
    },
    ratingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    starLabelContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
    },
    starLabelText: {
        marginLeft: 5,
        fontSize: 16,
        color: '#333',
    },
    progressBarContainer: {
        flex: 1,
        height: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
        overflow: 'hidden',
        marginHorizontal: 10,
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFD700',
    },
    percentageText: {
        width: 40,
        fontSize: 14,
        color: '#333',
        textAlign: 'right',
    },
});
