import React, { useState, useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

const ProfessionTag = ({ text }: any) => (
    <View style={styles.professionTag}>
        <Text style={styles.professionText}>{text}</Text>
    </View>
);

const ActionButton = ({ icon, color, onPress }: any) => {
    const scaleAnim = useState(new Animated.Value(1))[0];

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.9,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    return (
        <AnimatedTouchableOpacity
            style={[styles.actionButton, { transform: [{ scale: scaleAnim }] }]}
            onPress={onPress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.7}
        >
            <MaterialCommunityIcons name={icon} color={color} size={28} />
        </AnimatedTouchableOpacity>
    );
};

export default function OrderListCard({ leads, user, navigation, HandleUnlock, setOrder, setShowQr, locations }: any) {
    const [expandedCard, setExpandedCard] = useState(null);
    const [fadeAnim] = useState(new Animated.Value(0));

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);

    const toggleExpand = (id: any) => {
        setExpandedCard(expandedCard === id ? null : id);
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {leads?.map((order: any, index: any) => (
                <Animated.View
                    key={order?.id}
                    style={[
                        styles.card,
                        {
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [50, 0],
                                    }),
                                },
                            ],
                        },
                    ]}
                >
                    <LinearGradient
                        colors={['#1D976C', '#93F9B9']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.cardGradient}
                    >
                        <TouchableOpacity onPress={() => toggleExpand(order.id)}>
                            <View style={styles.cardHeader}>
                                <Text style={styles.title}>{order?.title}</Text>
                                <View style={styles.professions}>
                                    {/* {order?.professionals?.map((prof:any) => (
                    <ProfessionTag key={prof.id} text={prof?.text} />
                  ))} */}
                                </View>
                            </View>

                            <View style={styles.expandedContent}>
                                <Text style={styles.description}>{order?.description}</Text>
                                <Text style={styles.label}>Images:</Text>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageScroll}>
                                    {order?.images?.map((image: any, index: any) => (
                                        <Image key={index} source={{ uri: image }} style={styles.image} />
                                    ))}
                                </ScrollView>

                                <Text style={styles.label}>
                                    Location:{" "}
                                    <Text style={styles.locationDetail}>
                                        {locations?.find((loc: any) => loc?.id === order?.id)?.location}
                                    </Text>
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <View style={styles.actionContainer}>
                            {order?.artisantUnlockedLead?.map((e: any) => e?.id)?.includes(JSON.parse(user)?.id) ? (
                                <>
                                    <View>
                                        <ActionButton
                                            icon="eye"
                                            color="white"
                                            onPress={() => navigation.navigate('OrderView', { order, user })}
                                        />
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => {
                                            setOrder(order);
                                            setShowQr(true);
                                        }}
                                        style={styles.qrButton}
                                    >
                                        <QRCode
                                            value={JSON.stringify({ id: order?.id, reviewer: "", description: "" })}
                                            size={40}
                                            color="#6a3093"
                                        />
                                    </TouchableOpacity>
                                </>
                            ) : (
                                <View style={styles.actionButtons}>
                                    <ActionButton icon="close" color="#e74c3c" onPress={() => { }} />
                                    <ActionButton
                                        icon="check"
                                        color="#2ecc71"
                                        onPress={() => HandleUnlock(order?.id, order?.categoryId?.id)}
                                    />
                                    <ActionButton
                                        icon="eye"
                                        color="white"
                                        onPress={() => navigation.navigate('OrderView', { order, user })}
                                    />
                                </View>
                            )}
                        </View>
                    </LinearGradient>
                </Animated.View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        // padding: 16,
        // backgroundColor: '#1a0033',
    },
    card: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: 'white',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    cardGradient: {
        padding: 16,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    professions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    professionTag: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginLeft: 4,
        marginBottom: 4,
        borderWidth: 1,
        borderColor: 'white',
    },
    professionText: {
        color: '#ffffff',
        fontSize: 12,
    },
    expandedContent: {
        marginTop: 8,
    },
    description: {
        color: '#ffffff',
        marginBottom: 8,
        fontStyle: 'italic',
    },
    label: {
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 4,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    imageScroll: {
        marginBottom: 8,
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
        borderWidth: 2,
        borderColor: 'white',
    },
    locationDetail: {
        fontWeight: 'normal',
        color: '#ffffff',
    },
    actionContainer: {
        marginTop: 16,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    actionButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 20,
        padding: 8,
        borderWidth: 1,
        borderColor: 'white',
    },
    qrButton: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 4,
        borderWidth: 2,
        borderColor: 'white',
    },
});