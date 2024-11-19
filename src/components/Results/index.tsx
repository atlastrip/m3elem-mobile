


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
import { COLORS } from 'constants/theme';

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

const ArtisanCard = React.memo(({ artisan, title, selectedCategories, navigation }: any) => {
    const handleChatPress = useCallback(() => {


        navigation.navigate('ServiceProviderProfile', {
            id: artisan.id,
            selectedCategories: selectedCategories,
            role: 'artisant',
            title: title,
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

                {/* Address */}
                <View style={styles.addressContainer}>
                    <MaterialIcons name="location-on" size={16} color="gray" />
                    <Text style={styles.addressText}>
                        {/* {artisan?.adress
                            ? `${JSON.parse(artisan?.adress)?.streetLine}, ${JSON.parse(artisan?.adress)?.city}, ${JSON.parse(artisan?.adress)?.state} ${JSON.parse(artisan?.adress)?.zipcode}`
                            : 'No address provided'} */}
                        {
                            artisan?.adress
                                ? (() => {
                                    try {
                                        const address = JSON.parse(artisan?.adress);
                                        // const streetLine = address?.streetLine || '';
                                        const city = address?.city || "";
                                        const state = address?.state || "";
                                        // const zipcode = address?.zipcode || '';

                                        return (
                                            `${city}, ${state}`.trim() ||
                                            "No address provided"
                                        );
                                    } catch (error) {
                                        return "No address provided";
                                    }
                                })()
                                : "No address provided"
                        }
                    </Text>
                </View>

                {/* Actions */}
                <View className='flex-row '>
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
                        className='mr-2'

                    >
                        <MaterialIcons name="phone" size={20} color={COLORS.primary} />
                        <Text style={styles.actionButtonText}>Call</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => navigation.navigate("ProProfile", {
                            id: artisan.id,
                            category: title,
                            zipcode: 90009
                        })}
                    >
                        <MaterialIcons name="remove-red-eye" size={20} color={COLORS.primary} />
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
        borderWidth: 1,
        borderColor: '#ccc',
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
