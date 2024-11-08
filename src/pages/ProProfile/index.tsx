import { COLORS } from 'constants/theme';
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Button, Image, Linking, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants';
import * as Sharing from 'expo-sharing';

import { MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { getToken } from '@/helpers/getToken';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import { Card } from 'react-native-paper';
import ImageGallery from '@/components/ImageGallery';

// Utility functions
const getUserCategory = (createdAt: any) => {
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

const getRatingCategory = (rating: any) => {
    if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
    if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
    if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
    return { label: '', color: '#D32F2F' }; // Red
};

const calculateAverageRating = (reviews: any) => {
    if (!reviews || reviews.length === 0) return 0;
    const totalRating = reviews.reduce(
        (acc: any, review: any) => acc + parseInt(review.rating),
        0
    );
    return Math.round(totalRating / reviews.length);
};

const AverageRatingDisplay = React.memo(({ reviews }: any) => {
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

    const insets = useSafeAreaInsets();
    // @ts-ignore
    const sortedReviews = [...(artisan?.reviews || [])].sort((a: any, b: any) => new Date(b?.createdAt) - new Date(a?.createdAt));


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
    const [ViewAllReviews, setViewAllReviews] = useState(false);

    const userCategory = useMemo(() => getUserCategory(artisan?.createdAt), [
        artisan?.createdAt,
    ]);

    return (
        <View style={[styles.cardContainer, { paddingTop: insets.top + 20 }]}>
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
                        <View className='flex-row'>
                            <ShareLink url={"https://www.m3alempro.com/en/profile/pro/" + artisan?.id} />
                        </View>
                    </View>
                </View>

                {/* Availability */}
                <View className='flex-row'>

                    {artisan?.available && (
                        <View
                            style={{
                                backgroundColor: '#C8E6C9',
                                marginBottom: 8,
                            }}
                            className='rounded-full'>
                            <Text style={styles.availabilityText}>Available now</Text>
                        </View>
                    )}
                </View>

                {/* Average Rating */}
                <AverageRatingDisplay reviews={artisan?.reviews} />

                {/* About Me */}
                <Text style={styles.aboutText}>
                    About me: {artisan?.aboutYou}
                </Text>
                <View className='flex-row mb-3'>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleChatPress}
                        className='mr-2'
                    >
                        <MaterialIcons name="chat" size={20} color={COLORS.primary} />
                        <Text style={styles.actionButtonText}>Chat</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.actionButton}
                        onPress={handleCallPress}

                    >
                        <MaterialIcons name="phone" size={20} color={COLORS.primary} />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>

                </View>
                <View

                    className='rounded-lg border border-gray-200'
                    style={[styles.cardContainer, { marginBottom: 16 }]}>
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Overview</Text>
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                            {/* Address */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                                <Feather name="map-pin" size={16} color="gray" style={{ marginRight: 8 }} />
                                <Text style={{ flex: 1 }} numberOfLines={1}>
                                    {artisan?.adress
                                        ? `${JSON.parse(artisan?.adress)?.streetLine}, ${JSON.parse(artisan?.adress)?.city}, ${JSON.parse(artisan?.adress)?.state} ${JSON.parse(artisan?.adress)?.zipcode}`
                                        : 'No address provided'}
                                </Text>
                            </View>
                            {/* User Category */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                                <Feather name="clock" size={16} color="gray" style={{ marginRight: 8 }} />
                                <Text>{getUserCategory(artisan?.createdAt).label}</Text>
                            </View>
                            {/* Profile Completion */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                                <Feather name="briefcase" size={16} color="gray" style={{ marginRight: 8 }} />
                                <Text>
                                    {artisan?.profileCompleted ? (
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text>Profile Completed </Text>
                                            <MaterialIcons name="check-circle-outline" size={16} color="green" />
                                        </View>
                                    ) : (
                                        'Profile Incomplete'
                                    )}
                                </Text>
                            </View>
                            {/* Contact Info */}
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 8 }}>
                                <Feather name="dollar-sign" size={16} color="gray" style={{ marginRight: 8 }} />
                                <Text>Contact for more info</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    className='rounded-lg border border-gray-200'
                    style={[styles.cardContainer, { marginBottom: 16 }]}>
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Accepted Payment Methods</Text>
                        {artisan?.CashOnDeliveryPayment && <Text className='text-lg'>• Cash</Text>}
                        {artisan?.BankTransferPayment && <Text className='text-lg'>• Bank Transfer</Text>}
                        {artisan?.CheckPayment && <Text className='text-lg'>• Check Payment</Text>}
                        {artisan?.ApplePay && <Text className='text-lg'>• Apple Pay</Text>}
                        {artisan?.CreditCardPayment && <Text className='text-lg'>• Credit Card Payment</Text>}
                        {artisan?.GooglePay && <Text className='text-lg'>• Google Pay</Text>}
                        {artisan?.PaypalPayment && <Text className='text-lg'>• Paypal Payment</Text>}
                        {artisan?.SamsungPay && <Text className='text-lg'>• Samsung Pay</Text>}
                        {artisan?.SquareCashApp && <Text className='text-lg'>• Square Cash App</Text>}
                        {artisan?.StripePayment && <Text className='text-lg'>• Stripe Payment</Text>}
                        {artisan?.VenmoPayment && <Text className='text-lg'>• Venmo Payment</Text>}
                        {artisan?.ZellePayment && <Text className='text-lg'>• Zelle Payment</Text>}
                    </View>

                </View>
                <View
                    className='rounded-lg border border-gray-200'
                    style={[styles.cardContainer, { marginBottom: 16 }]}>
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Recent Reviews</Text>
                        <Text>
                            {!(sortedReviews?.length) && (
                                <Text className='text-lg'>
                                    No reviews yet, reviews will appear here.
                                </Text>
                            )}
                        </Text>
                        <View className="space-y-4">
                            {sortedReviews.slice(0, !ViewAllReviews ? 5 : sortedReviews?.length).map((review: any) => (
                                <View key={review?.id} className="p-4 border rounded-lg border-gray-200">
                                    <View className="flex  gap-2 mb-2">
                                        <Text className="font-semibold">{review?.owner?.firstName} {review?.owner?.lastName}</Text>
                                        <View className="flex-row">

                                            {[...Array(+(review?.rating || "0"))].map((_, i) => (
                                                <FontAwesome
                                                    key={i}
                                                    name={'star'}
                                                    color={COLORS.primary}
                                                    className={`w-4 h-4 `} />
                                            ))}
                                        </View>

                                    </View>
                                    <Text className="text-sm text-gray-600">{review?.description}</Text>
                                    <Text className="text-xs text-gray-400">{new Date(review?.createdAt).toLocaleDateString()}</Text>
                                </View>
                            ))}
                            {!ViewAllReviews && (
                                <>
                                    {artisan?.reviews?.length > 5 && (
                                        <TouchableOpacity onPress={() => setViewAllReviews(true)} className="w-full border border-gray-200 mt-4">

                                            <Text>
                                                View all reviews
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                </>
                            )}
                        </View>

                    </View>
                </View>

                {/* Actions */}
                <View
                    className='rounded-lg border border-gray-200'
                    style={[styles.cardContainer, { marginBottom: 16 }]}>
                    <View style={{ padding: 16 }}>
                        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16 }}>Gallery</Text>
                        <ImageGallery images={artisan?.images} />
                    </View>
                </View>
            </View>
        </View>
    );
});


const ShareLink = ({ url = "" }) => {
    const shareLink = async () => {
        if (Platform.OS === 'web') {
            Alert.alert('Sharing is not supported on web');
            return;
        }

        try {
            await Sharing.shareAsync(url);
            console.log('Link shared successfully!');
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    };

    return <Button onPress={shareLink} title="Share" />;
};

const ProProfile = ({ navigation, route }: any) => {
    const { id, category, zipcode } = route.params;
    const [Pro, setPro] = useState<any>(null);

    const handleGetPro = async () => {
        const token = await getToken();
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        // headers.append('Authorization', `Bearer ${token}`);
        try {
            const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
                  query UserByPK($userByPkId: String) {
                    userByPK(id: $userByPkId) {
                        id
                        firstName
                        lastName
                        email
                        password
                        provider
                        role
                        available
                        zipCodeUI
                        zipCodeHome
                        zipCodes
                        CashOnDeliveryPayment
                        BankTransferPayment
                        CheckPayment
                        ApplePay
                        CashPayment
                        CreditCardPayment
                        GooglePay
                        PaypalPayment
                        SamsungPay
                        SquareCashApp
                        StripePayment
                        VenmoPayment
                        ZellePayment
                        categories {
                        id
                        name
                        }
                        documents{
                        url
                        type
                        }
                        phone
                        amount
                        imageProfile
                        images {
                        id
                        source
                        }
                        reviews {
                        createdAt
                        description
                        id
                        rating
                        reviewer {
                            lastName
                            firstName
                            id
                        }
                        owner{
                            lastName
                            firstName
                            id
                        }
                        }
                        location
                        Radius
                        available
                        CashOnDeliveryPayment
                        BankTransferPayment
                        CheckPayment
                        aboutYou
                        adress
                        pushToken
                        pushUsingAppNotification
                        pushUsingEmailNotification
                        pushUsingPhoneNotification
                        currentWeekSpent
                        weeklyBudget
                        profileCompleted
                        createdAt
                        updatedAt
                    }
                    }
                `,
                    variables: { userByPkId: id },
                }),
            });
            console.log(id)

            const response = await res.json();
            response?.data?.userByPK && setPro(response?.data?.userByPK)
            console.log(response?.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        handleGetPro()
    }, [id])




    return (
        <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
            {Pro && (
                <ArtisanCard title={category} artisan={Pro} navigation={navigation} />
            )}

        </ScrollView>
    )
}

export default ProProfile;




const styles = StyleSheet.create({
    resultsContainer: {
        width: '100%',
        // paddingHorizontal: 16,
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
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        alignSelf: 'flex-start',
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
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    viewButton: {
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 4,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionButtonText: {
        marginLeft: 8,
        color: COLORS.primary,
        fontSize: 14,
        fontWeight: '600',
    },
});
