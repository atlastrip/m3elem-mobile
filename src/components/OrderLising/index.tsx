import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Animate from "react-native-reanimated"
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';


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


const OrderListing = ({ navigation }: any) => {
    return (
        <ScrollView style={styles.container}>
            {dummyOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                    {/* <Text style={styles.orderId}>Order #{order.id}</Text> */}
                    <TouchableOpacity 
                            onPress={() => navigation.navigate('OrderView', { order })}
                            >
                    <Text style={styles.orderId}>{order.title}</Text>
                    <Text >{order.description}</Text>
                    {/* <Text style={styles.label}>Professions:</Text>
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
                    </View> */}
                    <Text style={styles.label}>Images:</Text>
                    <ScrollView

                        horizontal>
                        {order.images.map((image, index) => (
                            <Image
                                key={index + Math.random()} source={{ uri: image }} style={styles.image} />
                        ))}
                    </ScrollView>
                    <Text style={styles.label}>Location:</Text>
                    <LocationView order={order} />
                    </TouchableOpacity>
                    <View className='border-t-2 flex-row border-gray-100' >
                        {/* onPress={() => navigation.navigate('OrderView', { order })}  */}
                        <TouchableOpacity className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'
                        >
                            <MaterialCommunityIcons name="close" color="red" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'
                        >
                            <MaterialCommunityIcons name="check" color="green" size={28} />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('OrderView', { order })}
                            className='w-1/3 mt-1 items-center py-2 '
                        >
                            <MaterialCommunityIcons name="eye" color="purple" size={28} />
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
};

export const LocationView = ({ order }: any) => {
    if (order.locationType === 'address') {
        return <Text style={styles.locationDetail}>Address: {order.locationDetails}</Text>;
    } else if (order.locationType === 'zipCode') {
        return <Text style={styles.locationDetail}>Zip Code: {order.locationDetails}</Text>;
    } else if (order.locationType === 'currentLocation') {
        const { latitude, longitude } = order.locationDetails;
        return (
            <MapView
                style={styles.map}
                scrollEnabled={false}
                initialRegion={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            >
                <Marker coordinate={{ latitude, longitude }} />
            </MapView>
        );
    } else {
        return <Text style={styles.locationDetail}>Unknown location type</Text>;
    }
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    orderCard: {
        backgroundColor: 'white',
        padding: 16,
        paddingBottom: 8,
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },
    orderId: {
        fontSize: 18,
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

export default OrderListing;