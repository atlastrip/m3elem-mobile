import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, StyleSheet } from 'react-native';
import { MaterialIcons, Entypo, FontAwesome } from '@expo/vector-icons'; // Use Expo's vector icons
import dayjs from 'dayjs';

// Function to get user category based on `createdAt` date
const getUserCategory = (createdAt: string) => {
    const today = dayjs();
    const createdDate = dayjs(createdAt);
    const daysDifference = today.diff(createdDate, 'day');
    const monthsDifference = today.diff(createdDate, 'month');

    if (daysDifference <= 10) {
        return { label: 'New in House Guru', color: 'orange' };
    } else if (monthsDifference >= 1) {
        return { label: 'Pro House Guru', color: 'purple' };
    } else {
        return { label: 'Regular House Guru', color: 'blue' };
    }
};

// Display user category based on `createdAt`
const UserCategoryDisplay = ({ createdAt }: { createdAt: string }) => {
    const { label, color } = getUserCategory(createdAt);
    return (
        <View style={styles.categoryContainer}>
            <Text style={{ color, fontStyle: 'italic' }}>{label}</Text>
        </View>
    );
};

// Function to get rating category based on the average rating
const getRatingCategory = (rating: number) => {
    if (rating === 5) return { label: 'Excellent', color: 'green' };
    if (rating === 4) return { label: 'Good', color: 'blue' };
    if (rating === 3 || rating === 2) return { label: 'Fine', color: 'gray' };
    return { label: 'Poor', color: 'red' };
};

// Function to calculate average rating from reviews
const calculateAverageRating = (reviews: any) => {
    const totalRating = reviews.reduce((acc: number, review: any) => acc + parseInt(review.rating), 0);
    return Math.round(totalRating / reviews.length);
};

// Display average rating based on reviews
const AverageRatingDisplay = ({ reviews }: any) => {
    const averageRating = calculateAverageRating(reviews);
    const { label, color } = getRatingCategory(averageRating);

    return (
        <View style={styles.ratingContainer}>
            {label !== 'Poor' && (
                <>
                    <Text style={[styles.ratingText, { color }]}>{label}</Text>
                    {Array.from({ length: 5 }).map((_, i) =>
                        i < averageRating ? (
                            <FontAwesome key={i} name="star" size={20} color={color} />
                        ) : (
                            <FontAwesome key={i} name="star-o" size={20} color={color} />
                        )
                    )}
                    <Text style={[styles.ratingText, { color }]}>({reviews.length})</Text>
                </>
            )}
        </View>
    );
};

// Component to display artisan's image and details
const ArtisanCard = ({ artisan, selectedCategories, title, navigation }: any) => {
    return (
        <TouchableOpacity
            style={styles.cardContainer}
            onPress={() => {
                // Handle navigation or click events
                navigation.navigate('ServiceProviderProfile', {
                    id: artisan.id,
                    selectedCategories, title,
                    role: 'artisant'
                });
            }}
        >
            <View style={styles.imageContainer}>
                <Image source={{ uri: artisan.imageProfile }} style={styles.image} />
                <Text style={styles.name}>
                    {artisan.firstName} {artisan.lastName}
                </Text>
                <UserCategoryDisplay createdAt={artisan.createdAt} />
            </View>

            <View style={styles.detailsContainer}>
                {artisan.available && (
                    <View style={styles.availabilityContainer}>
                        <Entypo name="dot-single" size={24} color="green" />
                        <Text style={styles.availabilityText}>Available now</Text>
                    </View>
                )}
                <AverageRatingDisplay reviews={artisan.reviews} />
                <Text style={styles.aboutTitle}>About me:</Text>
                <Text style={styles.aboutText}>{artisan.aboutYou}</Text>
                <View style={styles.addressContainer}>
                    <MaterialIcons name="location-on" size={20} color="gray" />
                    <Text style={styles.addressText}>{artisan.adress}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

// Component to render a list of artisans
const Results = ({ Artisants, selectedCategories, title, navigation }: any) => {
    // console.log('Artisants', Artisants);

    const artisans = Artisants.filter((e: any) => e.role === 'artisant');

    return (
        <FlatList
            data={artisans}

            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <ArtisanCard
                navigation={navigation}
                selectedCategories={selectedCategories}
                title={title}
                artisan={item} />}
        />
    );
};

export { Results };

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        marginRight: 8,
    },
    cardContainer: {
        backgroundColor: 'white',
        marginVertical: 10,
        borderRadius: 10,
        overflow: 'hidden',
        elevation: 2,
    },
    imageContainer: {
        alignItems: 'center',
        padding: 20,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    detailsContainer: {
        padding: 20,
    },
    availabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    availabilityText: {
        fontSize: 14,
        color: 'green',
    },
    aboutTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    aboutText: {
        fontSize: 14,
        marginTop: 5,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    addressText: {
        fontSize: 14,
        color: 'gray',
    },
});
