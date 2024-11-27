import React, { useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS, SIZES, SHADOWS, FONTS } from '../../constants/theme';
import { useLocation } from '../../hooks/useLocations';

const OrderItem = React.memo(({ order, index, navigation, user }:any) => {
    const location = useLocation(order.zipCode);

    const handleViewDetails = useCallback(() => {
        navigation.navigate('OrderViewUser', { order, user });
    }, [navigation, order, user]);

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100).springify()}
            style={styles.orderCard}
        >
            <View style={styles.cardHeader}>
                <Text style={styles.orderId}>{order?.title}</Text>
                <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{order?.status}</Text>
                </View>
            </View>

            <Text style={styles.description}>{order?.description}</Text>

            {order?.images && order.images.length > 0 && (
                <>
                    <Text style={styles.label}>Images:</Text>
                    <FlatList
                        data={order.images}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, idx) => idx.toString()}
                        renderItem={({ item: image }) => (
                            <Image source={{ uri: image }} style={styles.image} />
                        )}
                        style={styles.imageContainer}
                    />
                </>
            )}

            <Text style={styles.label}>
                Location:{" "}
                <Text style={styles.locationDetail}>{location}</Text>
            </Text>

            <TouchableOpacity onPress={handleViewDetails} style={styles.viewButton}>
                <MaterialCommunityIcons name="eye" color={COLORS.white} size={20} />
                <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
        </Animated.View>
    );
});

const styles = StyleSheet.create({
    orderCard: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        marginHorizontal: SIZES.padding - 10,
        marginVertical: SIZES.base,
        ...SHADOWS.medium,
        overflow: 'hidden',
        // width:"100%"
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.primary,
        padding: SIZES.padding,
    },
    orderId: {
        fontWeight: '700',
        color: COLORS.white,
        flex: 1,
        ...FONTS.h2,
    },
    statusBadge: {
        backgroundColor: COLORS.secondary,
        paddingHorizontal: SIZES.base * 1.5,
        paddingVertical: SIZES.base / 2,
        borderRadius: SIZES.radius,
        marginLeft: SIZES.base,
    },
    statusText: {
        color: COLORS.white,
        fontWeight: '600',
        ...FONTS.body4,
    },
    description: {
        color: COLORS.black.light,
        paddingHorizontal: SIZES.padding,
        paddingTop: SIZES.base,
        ...FONTS.body3,
    },
    label: {
        fontWeight: '600',
        marginVertical: SIZES.base / 2,
        paddingHorizontal: SIZES.padding,
        color: COLORS.black.dark,
        ...FONTS.h4,
    },
    imageContainer: {
        paddingLeft: SIZES.padding,
    },
    image: {
        width: 120,
        height: 120,
        borderRadius: SIZES.radius / 2,
        marginRight: SIZES.base,
    },
    locationDetail: {
        color: COLORS.black.med,
        ...FONTS.body4,
    },
    viewButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.base,
        paddingVertical: SIZES.base * 1.2,
        borderRadius: SIZES.radius,
    },
    viewButtonText: {
        color: COLORS.white,
        marginLeft: SIZES.base / 2,
        fontWeight: '600',
        ...FONTS.body3,
    },
});

export default OrderItem;

