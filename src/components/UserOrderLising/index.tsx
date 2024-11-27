import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Animated, Dimensions, TextInput } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import {  FONTS } from '../../constants/theme';
import { useUnlockedOrders } from 'hooks/useUnlockedOrders';
import OrderItem from '../OrdersItemsForUser';
const { height } = Dimensions.get('window');
import { AntDesign } from '@expo/vector-icons';

import { LinearGradient } from 'expo-linear-gradient';



const COLORS: any = {
    primary: "#3a7f41",
    secondary: "#321a47",
    black: {
        dark: "#141721",
        med: "#202534",
        light: "#34394A",
    },
    white: "#fff",
};

const SIZES: any = {
    base: 8,
    font: 14,
    radius: 12,
    padding: 24,
    h1: 24,
    h2: 20,
    body3: 16,
    body4: 14,
};

const SHADOWS = {
    light: {
        shadowColor: COLORS.black.dark,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    medium: {
        shadowColor: COLORS.black.dark,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    dark: {
        shadowColor: COLORS.black.dark,
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        elevation: 14,
    },
};

const UserUnlockedOrders = ({ navigation }: any) => {
    const isFocused = useIsFocused();
    const scrollY = useRef(new Animated.Value(0)).current;

    const { loading, unlockedOrders, user, refetch }: any = useUnlockedOrders();
    const [orderStats, setOrderStats] = useState({ total: 0, completed: 0, pending: 0 });
    const [searchQuery, setSearchQuery] = useState('');

    React.useEffect(() => {
        if (isFocused) {
            refetch();
        }
    }, [isFocused, refetch]);



    const renderHeader = useCallback(() => {
        const headerHeight = scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [height / 3, 100],
            extrapolate: 'clamp',
        });

        const headerOpacity = scrollY.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0],
            extrapolate: 'clamp',
        });

        return (
            <Animated.View style={[styles.header, { height: headerHeight }]}>
                <LinearGradient
                    colors={[COLORS.primary, COLORS.secondary]}
                    style={StyleSheet.absoluteFill}
                >
                    <Animated.Image
                        style={[
                            StyleSheet.absoluteFill,
                            { opacity: headerOpacity },
                        ]}
                        source={require('./images/abstraction.avif')}
                        resizeMode="cover"
                    />
                </LinearGradient>
                <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
                    My Orders
                </Animated.Text>
                <Animated.View style={[styles.statsContainer, { opacity: headerOpacity }]}>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{orderStats.total}</Text>
                        <Text style={styles.statLabel}>Total</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{orderStats.completed}</Text>
                        <Text style={styles.statLabel}>Completed</Text>
                    </View>
                    <View style={styles.statItem}>
                        <Text style={styles.statValue}>{orderStats.pending}</Text>
                        <Text style={styles.statLabel}>Pending</Text>
                    </View>
                </Animated.View>
            </Animated.View>
        );
    }, [scrollY, orderStats]);

    const filteredOrders = useMemo(() => {
        return unlockedOrders.filter((order: any) =>
            order?.title?.toLowerCase().includes(searchQuery?.toLowerCase())
            //   order?.description?.toLowerCase().includes(searchQuery?.toLowerCase())
        );
    }, [unlockedOrders, searchQuery]);

    const renderSearchBar = () => (
        <View style={styles.searchContainer}>
            <AntDesign name="search1" size={20} color={COLORS.black.light} style={styles.searchIcon} />
            <TextInput
                style={styles.searchInput}
                placeholderTextColor={COLORS.black.light}
                placeholder="Search orders..."
                value={searchQuery}
                onChangeText={(e) => setSearchQuery(e)}
                returnKeyType="search"
            />
        </View>
    );


    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.loadingText}>Loading your unlocked orders...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                renderItem={({ item: order, index }) => (
                    <OrderItem
                        order={order}
                        index={index}
                        navigation={navigation}
                        user={user}
                    />
                )}
                ListHeaderComponent={
                    <>
                        {renderHeader()}
                        {renderSearchBar()}
                    </>
                }
                ListEmptyComponent={
                    <View style={styles.noResultsContainer}>
                        <Text style={styles.noResultsText}>No orders found matching your search.</Text>
                    </View>
                }
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContent}
                // contentContainerStyle={filteredOrders.length === 0 && styles.container}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingBottom: SIZES.padding,
        // backgroundColor: COLORS.white,
        width:"100%"
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    loadingText: {
        marginTop: SIZES.base,
        color: COLORS.primary,
        ...FONTS.body3,
    },
    noResultsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: SIZES.padding,
    },
    noResultsText: {
        color: COLORS.black.med,
        textAlign: 'center',
        ...FONTS.body2,
    },
    header: {
        justifyContent: 'flex-end',
        paddingBottom: SIZES.padding,
    },
    headerTitle: {
        fontSize: SIZES.h1,
        fontWeight: '700',
        color: COLORS.white,
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SIZES.base,
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: SIZES.h2,
        fontWeight: '700',
        color: COLORS.white,
    },
    statLabel: {
        fontSize: SIZES.body4,
        color: COLORS.white,
        opacity: 0.8,
    },
    scrollViewContent: {
        paddingBottom: SIZES.padding,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: SIZES.radius,
        paddingHorizontal: SIZES.base * 2,
        marginHorizontal: SIZES.padding,
        marginVertical: SIZES.padding,
        ...SHADOWS.light,
    },
    searchIcon: {
        marginRight: SIZES.base,
    },
    searchInput: {
        flex: 1,
        fontSize: SIZES.body3,
        paddingVertical: SIZES.base * 1.5,
        color: COLORS.black.dark,
    },
    listFooter: {
        height: 80,
    },
});

export default UserUnlockedOrders;

