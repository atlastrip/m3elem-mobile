import { LocationView } from '@/components/OrderLising';
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import ConfettiCannon from 'react-native-confetti-cannon';
import ImageViewing from 'react-native-image-viewing';



const SwiperComponent = ({ navigation }: any) => {

    const [showConfetti, setShowConfetti] = useState(false);

    const dummyOrders = [
        {
            id: 1,
            title: "I want create new home",
            description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
            professions: [
                { name: 'Electrician', text: 'Electrical work', id: 'e1' },
                { name: 'Plumber', text: 'Plumbing', id: 'p1' },
            ],
            images: [
                'https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpainting.1b635af6.jpg&w=828&q=75',
                "https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgeometric_painted_walls.37658c7c.jpg&w=750&q=75"
            ],
            locationType: 'address',
            locationDetails: '123 Main St, Springfield',
        },
        {
            id: 2,
            title: "I want create new home",
            description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
            professions: [
                { name: 'Painter', text: 'Painting', id: 'pa1' },
            ],
            images: [
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHmLQ148g25uFSMzLqm_P-i0haDhV9n756w&s',
                // 'https://example.com/image4.jpg',
            ],
            locationType: 'zipCode',
            locationDetails: '90210',
        },
        {
            id: 3,
            title: "I want create new home",
            description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
            professions: [
                { name: 'Gardener', text: 'Gardening', id: 'g1' },
                { name: 'Cleaner', text: 'Cleaning', id: 'c1' },
            ],
            images: [
                'https://cdn-s-www.bienpublic.com/images/23485D24-4CF5-4D97-9B5B-E2A6F209D927/NW_raw/apres-la-saison-de-reproduction-des-oiseaux-et-avant-la-pousse-d-ete-c-est-la-periode-ideale-les-tailler-les-haies-photo-adobe-stock-1686751307.jpg',
                'https://fr.jardins-animes.com/images/outils-jardinage.jpg',
                "https://i-dj.unimedias.fr/2023/09/12/djadechet-vert-tailleas-650022e24b664.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
            ],
            locationType: 'currentLocation',
            locationDetails: {
                latitude: 37.7749,
                longitude: -122.4194,
            },
        },
    ];

    let swiperRef: any = null;

    const handleAlert = () => {
        Alert.alert(
            "Are you sure?",
            "",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "OK",

                    onPress: () => {
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 4000); // hide confetti after 3 seconds
                    }
                }
            ]
        );
    };


    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const openImageModal = (index: number) => {
        setCurrentImageIndex(index);
        setIsModalVisible(true);
    };
    const [SelectedIndex, setSelectedIndex] = useState(0);
    const [SelectedCard, setSelectedCard] = useState(0);


    return (
        <View style={styles.container}>
            {/* <ImageViewing
                images={dummyOrders[SelectedIndex]?.images.map(uri => ({ uri }))}
                imageIndex={currentImageIndex}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            /> */}
            <Swiper
                ref={(swiper) => { swiperRef = swiper }}
                cards={dummyOrders}
                renderCard={(order) => (
                    <View style={styles.card}>
                        <ImageViewing
                            images={order?.images.map(uri => ({ uri }))}
                            imageIndex={currentImageIndex}
                            visible={isModalVisible}
                            onRequestClose={() => setIsModalVisible(false)}
                        />
                        <Image source={{ uri: order.images?.[0] }} className='w-full h-64' />
                        <View className='p-3'>

                            <Text style={styles.orderId}>{order.title}</Text>
                            <Text >{order.description}</Text>
                            <Text style={styles.label}>Professions:</Text>
                            <View style={styles.professionList}>
                                {order.professions.map((profession) => (
                                    <View key={profession.id} style={styles.professionItem}>
                                        <View
                                            style={{ backgroundColor: COLORS.primary }}
                                            className='p-1 rounded-full px-3'>
                                            <Text className="text-white font-bold text-lg">{profession.name}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                            <Text style={styles.label}>Location:</Text>
                            <LocationView order={order} />
                        </View>
                        {/* <ScrollView

                            horizontal>
                            {order.images.map((image, index) => (
                                <Image
                                    key={index + Math.random()} source={{ uri: image }} style={styles.image} />
                            ))}
                        </ScrollView> */}
                        <View className='px-3'>
                        <Text style={styles.label}>Images:</Text>

                            <ScrollView horizontal>
                                {order.images.map((uri, index) => (
                                    <TouchableOpacity key={index} onPress={() => navigation.navigate('ImagePreview', { images: order.images })}>
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



                    </View>
                )}

                onSwipedLeft={(cardIndex) => {
                    setSelectedIndex(cardIndex)
                    return (cardIndex + 1) === dummyOrders.length && navigation.goBack()
                }}
                onSwipedRight={(cardIndex) => {
                    setSelectedIndex(cardIndex)
                    return (cardIndex + 1) === dummyOrders.length && navigation.goBack()
                }}
                cardIndex={0}
                backgroundColor={'transparent'}
                stackSize={9}
            />
            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    className='bg-red-600 justify-center items-center'
                    style={{ width: 50, height: 50, borderRadius: 300 }}
                    onPress={() => swiperRef.swipeLeft()}
                >
                    <MaterialCommunityIcons name="close" color="white" size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    className=' justify-center items-center'
                    style={{ width: 70, height: 70, borderRadius: 300, backgroundColor: COLORS.primary }}
                    onPress={handleAlert}
                >
                    <MaterialCommunityIcons name="check" color="white" size={40} />
                </TouchableOpacity>
                <TouchableOpacity
                    className='bg-violet-600 justify-center items-center'
                    style={{ width: 50, height: 50, borderRadius: 300 }}
                    onPress={() => swiperRef.swipeRight()}
                >
                    <MaterialCommunityIcons name="chevron-right" color="white" size={30} />
                </TouchableOpacity>
            </View>
            {showConfetti && <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // Semi-transparent background
    },
    card: {
        flex: 1,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: 'rgba(0, 0, 0, 0.2)',
        backgroundColor: 'white',
        // alignItems: 'center',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end",
        gap: 10,
        width: '80%',
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        color: '#000',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    orderId: {
        fontSize: 18,
        textAlign: "left",
        fontWeight: 'bold',
        marginBottom: 8,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginVertical: 8,
    },
    professionList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    professionItem: {
        marginRight: 12,
        marginBottom: 12,
    },
    professionName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    professionText: {
        fontSize: 12,
        color: 'grey',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 8,
        marginRight: 8,
    },
    locationDetail: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'blue',
    },
    map: {
        height: 150,
        borderRadius: 8,
        marginVertical: 8,
    },
});

export default SwiperComponent;
