// import React from 'react';
// import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet, Platform, Linking } from 'react-native';
// import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'; // Use Expo's vector icons
// import AntDesign from '@expo/vector-icons/AntDesign';
// import dayjs from 'dayjs';
// import tw from 'twrnc'

// // // Function to get user category based on `createdAt` date
// // const getUserCategory = (createdAt: string) => {
// //     const today = dayjs();
// //     const createdDate = dayjs(createdAt);
// //     const daysDifference = today.diff(createdDate, 'day');
// //     const monthsDifference = today.diff(createdDate, 'month');

// //     if (daysDifference <= 10) {
// //         return { label: 'New in House Guru', color: 'orange' };
// //     } else if (monthsDifference >= 1) {
// //         return { label: 'Pro House Guru', color: 'purple' };
// //     } else {
// //         return { label: 'Regular House Guru', color: 'blue' };
// //     }
// // };

// // // Display user category based on `createdAt`
// // const UserCategoryDisplay = ({ createdAt }: { createdAt: string }) => {
// //     const { label, color } = getUserCategory(createdAt);
// //     return (
// //         <View style={styles.categoryContainer}>
// //             <Text style={{ color, fontStyle: 'italic' }}>{label}</Text>
// //         </View>
// //     );
// // };

// // // Function to get rating category based on the average rating
// // const getRatingCategory = (rating: number) => {
// //     if (rating === 5) return { label: 'Excellent', color: 'green' };
// //     if (rating === 4) return { label: 'Good', color: 'blue' };
// //     if (rating === 3 || rating === 2) return { label: 'Fine', color: 'gray' };
// //     return { label: 'Poor', color: 'red' };
// // };

// // // Function to calculate average rating from reviews
// // const calculateAverageRating = (reviews: any) => {
// //     const totalRating = reviews.reduce((acc: number, review: any) => acc + parseInt(review.rating), 0);
// //     return Math.round(totalRating / reviews.length);
// // };





// export const getUserCategory = (createdAt: any) => {
//     const today = dayjs();
//     const createdDate = dayjs(createdAt);
//     const daysDifference = today.diff(createdDate, 'day');
//     const monthsDifference = today.diff(createdDate, 'month');

//     if (daysDifference <= 10) {
//         return { label: 'New House Guru', color: '#FF9900' }; // Orange
//     } else if (monthsDifference >= 1) {
//         return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
//     } else {
//         return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
//     }
// };

// const getRatingCategory = (rating: any) => {
//     if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
//     if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
//     if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
//     return { label: '', color: '#D32F2F' }; // Red
// };

// const calculateAverageRating = (reviews: any) => {
//     if (!reviews || reviews.length === 0) return 0;
//     const totalRating = reviews.reduce(
//         (acc: any, review: any) => acc + parseInt(review.rating),
//         0
//     );
//     return Math.round(totalRating / reviews.length);
// };

// export const AverageRatingDisplay = ({ reviews }: any) => {
//     const averageRating = calculateAverageRating(reviews);
//     const { label, color } = getRatingCategory(averageRating);

//     return (
//         <View style={tw`flex-row items-center mt-1`}>
//             <Text style={[tw`text-sm font-semibold mr-2`, { color }]}>{label}</Text>
//             {Array.from({ length: 5 }).map((_, i) => (
//                 // <StarIcon
//                 //     key={i}
//                 //     name={i < averageRating ? 'star' : 'star-o'}
//                 //     size={16}
//                 //     color={color}
//                 // />
//                 <FontAwesome key={i} name={i < averageRating ? 'star' : 'star-o'} size={16} color={color} />
//             ))}
//             <Text style={[tw`text-sm ml-2`, { color }]}>
//                 ({reviews?.length || 0})
//             </Text>
//         </View>
//     );
// };

// // Display average rating based on reviews
// // const AverageRatingDisplay = ({ reviews }: any) => {
// //     const averageRating = calculateAverageRating(reviews);
// //     const { label, color } = getRatingCategory(averageRating);

// //     return (
// //         <View style={styles.ratingContainer}>
// //             {label !== 'Poor' && (
// //                 <>
// //                     <Text style={[styles.ratingText, { color }]}>{label}</Text>
// //                     {Array.from({ length: 5 }).map((_, i) =>
// //                         i < averageRating ? (
// //                             <FontAwesome key={i} name="star" size={20} color={color} />
// //                         ) : (
// //                             <FontAwesome key={i} name="star-o" size={20} color={color} />
// //                         )
// //                     )}
// //                     <Text style={[styles.ratingText, { color }]}>({reviews.length})</Text>
// //                 </>
// //             )}
// //         </View>
// //     );
// // };

// // Component to display artisan's image and details



// const ArtisanCard = ({ artisan, selectedCategories, title, navigation }: any) => {
//     const handleChatPress = () => {
//         // Navigate to chat screen or perform chat action
//         navigation.navigate('ServiceProviderProfile', {
//             id: artisan.id,
//             selectedCategories: title,
//             role: 'artisant',
//         });


//     };

//     const handleCallPress = () => {
//         let phoneNumber = '';
//         if (Platform.OS === 'android') {
//             phoneNumber = `tel:${artisan.phone}`;
//         } else {
//             phoneNumber = `telprompt:${artisan.phone}`;
//         }
//         Linking.openURL(phoneNumber);
//     };

//     return (
//         <View
//             style={tw`bg-white rounded-lg shadow-md w-full p-2 mb-4`}

//         >
//             <View style={tw`flex-col`}>
//                 {/* Left Side */}
//                 <View style={tw`flex-row items-center p-4 border-r-2 border-gray-100 bg-gray-100 `}>
//                     <Image
//                         source={{ uri: artisan?.imageProfile }}
//                         style={tw`h-16 w-16 rounded-full bg-gray-200`}
//                         resizeMode="cover"
//                     />
//                     <View style={tw`ml-4  flex-col`}>
//                         <Text style={tw` text-sm font-semibold text-gray-800`}>
//                             {artisan?.firstName} {artisan?.lastName}
//                         </Text>
//                         <View style={tw`flex-row items-center mt-2`}>
//                             <Text
//                                 style={tw`px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium`}
//                             >
//                                 Pro House Guru
//                             </Text>
//                         </View>
//                     </View>
//                 </View>

//                 {/* Right Side */}
//                 <View style={tw`flex-1 p-6`}>
//                     <View style={tw`flex-row `}>

//                         {artisan?.available && (
//                             <Text
//                                 style={tw`text-xs font-medium text-green-500 bg-green-100 p-1 rounded-full`}
//                             >
//                                 Available now
//                             </Text>
//                         )}
//                     </View>

//                     {/* Average Rating */}
//                     <AverageRatingDisplay reviews={artisan?.reviews} />

//                     {/* User Category */}
//                     <View style={tw`flex-row items-center mt-1`}>
//                         <Text style={tw`italic text-gray-600`}>
//                             {getUserCategory(artisan?.createdAt).label}
//                         </Text>
//                     </View>

//                     {/* About Me */}
//                     <Text style={tw`mt-4 text-gray-700`}>
//                         About me: {artisan?.aboutYou}
//                     </Text>

//                     {/* Address */}
//                     <View style={tw`mt-2 flex-row items-center`}>
//                         <MaterialIcons name="location-on" size={16} color="gray" />
//                         <Text style={tw`ml-1 text-gray-500`}>
//                             {artisan?.adress
//                                 ? `${artisan?.adress?.streetLine}, ${artisan?.adress?.city}, ${artisan?.adress?.state} ${artisan?.adress?.zipcode}`
//                                 : 'No address provided'}
//                         </Text>
//                     </View>

//                     {/* Actions */}
//                     <View style={tw`mt-4 flex-row gap-2`}>
//                         <TouchableOpacity
//                             style={tw`border border-blue-500 rounded px-4 py-2 flex-row items-center`}
//                             onPress={handleChatPress}
//                         >
//                             <MaterialIcons name="chat" size={20} color="#1E40AF" />
//                             <Text style={tw`ml-2 text-blue-500`}>Chat</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                             style={tw`border border-blue-500 rounded px-4 py-2 flex-row items-center`}
//                             onPress={handleCallPress}
//                         >
//                             <MaterialIcons name="phone" size={20} color="#1E40AF" />
//                             <Text style={tw`ml-2 text-blue-500`}>Call</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </View>
//         </View>
//     );
// };

// // const ArtisanCard = ({ artisan, selectedCategories, title, navigation }: any) => {
// //     return (
// //         <TouchableOpacity
// //             style={styles.cardContainer}
// //             onPress={() => {
// //                 // Handle navigation or click events
// //                 navigation.navigate('ServiceProviderProfile', {
// //                     id: artisan.id,
// //                     selectedCategories, title,
// //                     role: 'artisant'
// //                 });
// //             }}
// //         >
// //             <View style={styles.imageContainer}>
// //                 <Image source={{ uri: artisan.imageProfile }} style={styles.image} />
// //                 <Text style={styles.name}>
// //                     {artisan.firstName} {artisan.lastName}
// //                 </Text>
// //                 <UserCategoryDisplay createdAt={artisan.createdAt} />
// //             </View>

// //             <View style={styles.detailsContainer}>
// //                 {artisan.available && (
// //                     <View style={styles.availabilityContainer}>
// //                         <Entypo name="dot-single" size={24} color="green" />
// //                         <Text style={styles.availabilityText}>Available now</Text>
// //                     </View>
// //                 )}
// //                 <AverageRatingDisplay reviews={artisan.reviews} />
// //                 <Text style={styles.aboutTitle}>About me:</Text>
// //                 <Text style={styles.aboutText}>{artisan.aboutYou}</Text>
// //                 <View style={styles.addressContainer}>
// //                     <MaterialIcons name="location-on" size={20} color="gray" />
// //                     <Text style={styles.addressText}>{artisan.adress}</Text>
// //                 </View>
// //             </View>
// //         </TouchableOpacity>
// //     );
// // };



// // Component to render a list of artisans
// // const Results = ({ Artisants, selectedCategories, title, navigation }: any) => {
// //     // console.log('Artisants', Artisants);

// //     const artisans = Artisants.filter((e: any) => e.role === 'artisant');

// //     return (
// //         <FlatList
// //             data={artisans}

// //             keyExtractor={(item) => item.id.toString()}
// //             renderItem={({ item }) => <ArtisanCard
// //                 navigation={navigation}
// //                 selectedCategories={selectedCategories}
// //                 title={title}
// //                 artisan={item} />}
// //         />
// //     );
// // };

// const Results = ({ Artisants, selectedCategories, title, navigation }: any) => {
//     const artisans = Artisants?.filter((e: any) => e?.role === 'artisant');

//     return (
//         <View style={tw`w-full px-6 mt-2 flex justify-center`}>
//             <FlatList
//                 data={artisans}
//                 keyExtractor={(item) => {
//                     console.log('item?.id', item?.id);

//                     return item.id.toString();
//                 }}
//                 renderItem={({ item }) => (
//                     <ArtisanCard
//                         artisan={item}
//                         navigation={navigation}
//                         title={title}
//                         selectedCategories={selectedCategories} />
//                 )}
//             />
//         </View>
//     );
// };


// export { Results };

// const styles = StyleSheet.create({
//     categoryContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     ratingText: {
//         fontSize: 16,
//         marginRight: 8,
//     },
//     cardContainer: {
//         backgroundColor: 'white',
//         marginVertical: 10,
//         borderRadius: 10,
//         overflow: 'hidden',
//         elevation: 2,
//     },
//     imageContainer: {
//         alignItems: 'center',
//         padding: 20,
//     },
//     image: {
//         width: 80,
//         height: 80,
//         borderRadius: 40,
//     },
//     name: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
//     detailsContainer: {
//         padding: 20,
//     },
//     availabilityContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     availabilityText: {
//         fontSize: 14,
//         color: 'green',
//     },
//     aboutTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginTop: 10,
//     },
//     aboutText: {
//         fontSize: 14,
//         marginTop: 5,
//     },
//     addressContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 10,
//     },
//     addressText: {
//         fontSize: 14,
//         color: 'gray',
//     },
// });



import React, { useMemo, useCallback } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
    StyleSheet,
    Platform,
    Linking,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import tw from 'twrnc';

// Utility functions
const getUserCategory = (createdAt:any) => {
    const today = dayjs();
    const createdDate = dayjs(createdAt);
    const daysDifference = today.diff(createdDate, 'day');
    const monthsDifference = today.diff(createdDate, 'month');

    if (daysDifference <= 10) {
        return { label: 'New House Guru', color: '#FF9900' }; // Orange
    } else if (monthsDifference >= 1) {
        return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
    } else {
        return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
    }
};

const getRatingCategory = (rating:any) => {
    if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
    if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
    if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
    return { label: '', color: '#D32F2F' }; // Red
};

const calculateAverageRating = (reviews:any) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
        (acc:any, review:any) => acc + parseInt(review.rating),
        0
    );
    return Math.round(totalRating / reviews.length);
};

const AverageRatingDisplay = React.memo(({ reviews }:any) => {
    const averageRating = calculateAverageRating(reviews);
    const { label, color } = getRatingCategory(averageRating);

    return (
        <View style={styles.ratingContainer}>
            <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
            {Array.from({ length: 5 }).map((_, i) => (
                <FontAwesome
                    key={i}
                    name={i < averageRating ? 'star' : 'star-o'}
                    size={16}
                    color={color}
                />
            ))}
            <Text style={[styles.ratingCount, { color }]}>
                ({reviews?.length || 0})
            </Text>
        </View>
    );
});

const ArtisanCard = React.memo(({ artisan, title, navigation }: any) => {
    const handleChatPress = useCallback(() => {
        navigation.navigate('ServiceProviderProfile', {
            id: artisan.id,
            selectedCategories: title,
            role: 'artisant',
        });
    }, [navigation, artisan.id, title]);

    const handleCallPress = useCallback(() => {
        let phoneNumber = '';
        if (Platform.OS === 'android') {
            phoneNumber = `tel:${artisan.phone}`;
        } else {
            phoneNumber = `telprompt:${artisan.phone}`;
        }
        Linking.openURL(phoneNumber);
    }, [artisan.phone]);

    const userCategory = useMemo(() => getUserCategory(artisan?.createdAt), [
        artisan?.createdAt,
    ]);

    return (
        <View style={styles.cardContainer}>
            <View style={styles.cardContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: artisan?.imageProfile }}
                        style={styles.profileImage}
                        resizeMode="cover"
                    />
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.nameText}>
                            {artisan?.firstName} {artisan?.lastName}
                        </Text>
                        <View style={styles.categoryBadge}>
                            <Text style={styles.categoryBadgeText}>
                                {userCategory.label}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Availability */}
                {artisan?.available && (
                    <Text style={styles.availabilityText}>Available now</Text>
                )}

                {/* Average Rating */}
                <AverageRatingDisplay reviews={artisan?.reviews} />

                {/* About Me */}
                <Text style={styles.aboutText}>
                    About me: {artisan?.aboutYou}
                </Text>

                {/* Address */}
                <View style={styles.addressContainer}>
                    <MaterialIcons name="location-on" size={16} color="gray" />
                    <Text style={styles.addressText}>
                        {artisan?.adress
                            ? `${JSON.parse(artisan?.adress)?.streetLine}, ${JSON.parse(artisan?.adress)?.city}, ${JSON.parse(artisan?.adress)?.state} ${JSON.parse(artisan?.adress)?.zipcode}`
                            : 'No address provided'}
                    </Text>
                </View>

                {/* Actions */}
                <View style={styles.actionsContainer}>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleChatPress}
                    >
                        <MaterialIcons name="chat" size={20} color="#1E40AF" />
                        <Text style={styles.actionButtonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleCallPress}
                    >
                        <MaterialIcons name="phone" size={20} color="#1E40AF" />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const Results = ({ Artisants, selectedCategories, title, navigation }: any) => {
    const artisans = useMemo(
        () => Artisants?.filter((e: any) => e?.role === 'artisant'),
        [Artisants]
    );

    const renderItem = useCallback(
        ({ item }: any) => (
            <ArtisanCard
                artisan={item}
                navigation={navigation}
                title={title}
                selectedCategories={selectedCategories}
            />
        ),
        [navigation, title, selectedCategories]
    );

    return (
        <View style={styles.resultsContainer}>
            <FlatList
                data={artisans}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                windowSize={10}
                removeClippedSubviews={true}
                updateCellsBatchingPeriod={50}
                getItemLayout={(data, index) => ({
                    length: 200, // Approximate height of each item
                    offset: 200 * index,
                    index,
                })}
            />
        </View>
    );
};

export { Results };

const styles = StyleSheet.create({
    resultsContainer: {
        width: '100%',
        paddingHorizontal: 16,
        marginTop: 8,
        marginBottom: 50,
        justifyContent: 'center',
    },
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        overflow: 'hidden',
        elevation: 2,
        
    },
    cardContent: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#f0f0f0',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12,
    },
    profileImage: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#e0e0e0',
    },
    headerTextContainer: {
        marginLeft: 16,
        flex: 1,
    },
    nameText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    categoryBadge: {
        marginTop: 4,
        backgroundColor: '#E0F7FA',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
    },
    categoryBadgeText: {
        fontSize: 12,
        color: '#006064',
    },
    availabilityText: {
        fontSize: 12,
        color: '#388E3C',
        backgroundColor: '#C8E6C9',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingLabel: {
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    ratingCount: {
        fontSize: 12,
        marginLeft: 8,
    },
    aboutText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 12,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    addressText: {
        fontSize: 12,
        color: '#999',
        marginLeft: 4,
    },
    actionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        borderColor: '#1E40AF',
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.48,
    },
    actionButtonText: {
        marginLeft: 8,
        color: '#1E40AF',
        fontSize: 14,
        fontWeight: '600',
    },
});
