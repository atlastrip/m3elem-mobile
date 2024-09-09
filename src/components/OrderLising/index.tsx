// import React, { useEffect, useState } from 'react';
// import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import Animate from "react-native-reanimated"
// import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { COLORS } from 'constants/theme';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import QRCode from 'react-native-qrcode-svg';

// const dummyOrders = [
//     {
//         id: 1,
//         title: "I want create new home",
//         description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//         professions: [
//             { name: 'Electrician', text: 'Electrical work', id: 'e1' },
//             { name: 'Plumber', text: 'Plumbing', id: 'p1' },
//         ],
//         images: [
//             'https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpainting.1b635af6.jpg&w=828&q=75',
//             "https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgeometric_painted_walls.37658c7c.jpg&w=750&q=75"
//         ],
//         locationType: 'address',
//         locationDetails: '123 Main St, Springfield',
//     },
//     {
//         id: 2,
//         title: "I want create new home",
//         description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//         professions: [
//             { name: 'Painter', text: 'Painting', id: 'pa1' },
//         ],
//         images: [
//             'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHmLQ148g25uFSMzLqm_P-i0haDhV9n756w&s',
//             // 'https://example.com/image4.jpg',
//         ],
//         locationType: 'zipCode',
//         locationDetails: '90210',
//     },
//     {
//         id: 3,
//         title: "I want create new home",
//         description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//         professions: [
//             { name: 'Gardener', text: 'Gardening', id: 'g1' },
//             { name: 'Cleaner', text: 'Cleaning', id: 'c1' },
//         ],
//         images: [
//             'https://cdn-s-www.bienpublic.com/images/23485D24-4CF5-4D97-9B5B-E2A6F209D927/NW_raw/apres-la-saison-de-reproduction-des-oiseaux-et-avant-la-pousse-d-ete-c-est-la-periode-ideale-les-tailler-les-haies-photo-adobe-stock-1686751307.jpg',
//             'https://fr.jardins-animes.com/images/outils-jardinage.jpg',
//             "https://i-dj.unimedias.fr/2023/09/12/djadechet-vert-tailleas-650022e24b664.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
//         ],
//         locationType: 'currentLocation',
//         locationDetails: {
//             latitude: 37.7749,
//             longitude: -122.4194,
//         },
//     },
// ];


// const OrderListing = ({ navigation, setShowQr, setOrder }: any) => {
//     const [loading, setLoading] = useState(false);
//     const [leads, setLeads]: any = useState([]);
//     const [unlocked, setUnlocked] = useState(false);
//     const [user, setUser]: any = useState(null);
//     const isFocused = useIsFocused();
//     // const {
//     //     data,
//     //     error,
//     //     loading,
//     //     fetchMore,
//     // } = useLeadsQuery({
//     //     fetchPolicy: 'network-only',
//     // })





//     const getLeads = async () => {

//         const token = await getToken();
//         const user: any = await getUser();
//         setUser(user);
//         console.log('====================================');
//         console.log('token', token);
//         console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoading(true);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                         query getLeadsThatMatchUserProfessionals {
//                             getLeadsThatMatchUserProfessionals {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     images
//                                     locationType
//                                     owner {
//                                     id
//                                     leads {
//                                         id
//                                     }
//                                     firstName
//                                     lastName
//                                     phone
//                                     imageProfile
//                                     }
//                                     professionals {
//                                     id
//                                     text
//                                     img
//                                     }
//                                     artisantUnlockedLead {
//                                     id
//                                     firstName
//                                     lastName
//                                     imageProfile
//                                     }
//                                     location
//                                 }
//                                 }

//                         `,

//                     }),
//                 }
//             );

//             const json = await res.json();
//             setLeads(json.data.getLeadsThatMatchUserProfessionals || []);

//             setLoading(false);
//         } catch (err: any) {
//             setLoading(false);
//             Alert.alert("error", JSON.stringify(err.message, undefined, 2));
//             // Alert.alert(json?.detail);
//         }
//     }




//     useEffect(() => {
//         getLeads();
//     }, [isFocused]);





//     const HandleUnlock = async (id: any) => {
//         const token = await getToken();
//         const user: any = await getUser();
//         setUser(user);
//         console.log('====================================');
//         console.log('token', token);
//         console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);


//         try {
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                         mutation unlockLead($input: LeadUnlockInput) {
//                                 unlockLead(input: $input) {
//                                     id
//                                 }
//                         }

//                         `,
//                         variables: {
//                             input: {
//                                 id: id
//                             }
//                         }

//                     }),
//                 }
//             );

//             const json = await res.json();
//             console.log('====================================');
//             console.log('json', json);
//             console.log('====================================');
//             await getLeads();
//         } catch (error: any) {
//             return Alert.alert(error.message)
//         }
//     }



//     return (
//         <ScrollView style={styles.container}>
//             {leads.map((order: any) => (
//                 <View key={order?.id} style={styles.orderCard}>
//                     {/* <Text style={styles.orderId}>Order #{order?.id}</Text> */}
//                     <TouchableOpacity
//                     // onPress={() => navigation.navigate('OrderView', { order })}
//                     >
//                         <Text style={styles.orderId}>{order?.title}</Text>
//                         <Text >{order?.description}</Text>
//                         {/* <Text style={styles.label}>Professions:</Text>
//                     <View style={styles.professionList}>
//                         {order?.professions.map((profession) => (
//                             <View key={profession.id} style={styles.professionItem}>
//                                 <View
//                                     style={{ backgroundColor: COLORS.primary }}
//                                     className='p-1 rounded-full px-3'>
//                                     <Text className="text-white font-bold text-lg">{profession.name}</Text>
//                                 </View>
//                             </View>
//                         ))}
//                     </View> */}
//                         <Text style={styles.label}>Images:</Text>
//                         <ScrollView

//                             horizontal>
//                             {order?.images.map((image: any, index: any) => (
//                                 <Image
//                                     key={index + Math.random()} source={{ uri: image }} style={styles.image} />
//                             ))}
//                         </ScrollView>
//                         <Text style={styles.label}>Location</Text>
//                         <LocationView order={order} />
//                     </TouchableOpacity>

//                     {

//                         order?.artisantUnlockedLead.map((e: any) => e?.id)?.includes(JSON.parse(user)?.id)
//                             ? <>
//                                 <TouchableOpacity
//                                     onPress={() => navigation.navigate('OrderView', { order, user: user })}
//                                     className='w-[100%] mt-1 items-center py-2 '
//                                 >
//                                     <MaterialCommunityIcons name="eye" color="purple" size={28} />

//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         setOrder(order);
//                                         setShowQr(true);
//                                     }}
//                                     className="items-center mb-4">
//                                     <QRCode value={
//                                         JSON.stringify({
//                                             id: order?.id,
//                                             reviewer: "",
//                                             description: "",
//                                         })
//                                     }
//                                         size={40}
//                                     />
//                                 </TouchableOpacity>
//                             </>
//                             :
//                             <View className='border-t-2 flex-row border-gray-100' >
//                                 {/* onPress={() => navigation.navigate('OrderView', { order })}  */}
//                                 <TouchableOpacity className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'
//                                 >
//                                     <MaterialCommunityIcons name="close" color="red" size={28} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => {
//                                         HandleUnlock(order?.id)
//                                     }}

//                                     className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'
//                                 >
//                                     <MaterialCommunityIcons name="check" color="green" size={28} />
//                                 </TouchableOpacity>
//                                 <TouchableOpacity
//                                     onPress={() => navigation.navigate('OrderView', { order })}
//                                     className='w-1/3 mt-1 items-center py-2 '
//                                 >
//                                     <MaterialCommunityIcons name="eye" color="purple" size={28} />


//                                 </TouchableOpacity>

//                             </View>
//                     }
//                 </View>
//             ))}
//         </ScrollView>
//     );
// };

// export const LocationView = ({ order, navigation = null }: any) => {
//     if (order?.locationType === 'address') {
//         return <Text style={styles?.locationDetail}>Address: {order?.location}</Text>;
//     } else if (order?.locationType === 'zipCode') {
//         return <Text style={styles?.locationDetail}>Zip Code: {order?.location}</Text>;
//     } else if (order?.locationType === 'currentLocation') {
//         const { latitude, longitude } = JSON.parse(order?.location);
//         return (
//             <TouchableOpacity
//                 onPress={navigation ? () => navigation.navigate('MapViewArtisan', { marker: { latitude, longitude } }) : () => { }}
//             >
//                 <MapView
//                     style={styles.map}
//                     scrollEnabled={false}
//                     initialRegion={{
//                         latitude: latitude,
//                         longitude: longitude,
//                         latitudeDelta: 0.01,
//                         longitudeDelta: 0.01,
//                     }}
//                 >
//                     <Marker coordinate={{ latitude, longitude }} />
//                 </MapView>
//             </TouchableOpacity>
//         );
//     } else {
//         return <Text style={styles.locationDetail}>Unknown location type</Text>;
//     }
// };

// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         padding: 16,
//         paddingBottom: 8,
//         borderRadius: 8,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOpacity: 0.1,
//         shadowOffset: { width: 0, height: 2 },
//         shadowRadius: 4,
//     },
//     orderId: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: '600',
//         marginVertical: 8,
//     },
//     professionList: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     professionItem: {
//         marginRight: 12,
//         marginBottom: 12,
//     },
//     professionName: {
//         fontSize: 14,
//         fontWeight: 'bold',
//     },
//     professionText: {
//         fontSize: 12,
//         color: 'grey',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         borderRadius: 8,
//         marginRight: 8,
//     },
//     locationDetail: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'blue',
//     },
//     map: {
//         height: 150,
//         borderRadius: 8,
//         marginVertical: 8,
//     },
// });

// export default OrderListing;


import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal, TextInput, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from 'constants/theme';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';



export const moroccanCities = [
    { name: 'Casablanca', lat: 33.5731, lon: -7.5898 },
    { name: 'Rabat', lat: 34.0209, lon: -6.8416 },
    { name: 'Marrakech', lat: 31.6295, lon: -7.9811 },
    { name: 'Fes', lat: 34.0331, lon: -5.0003 },
    { name: 'Tangier', lat: 35.7595, lon: -5.8340 },
    { name: 'Agadir', lat: 30.4278, lon: -9.5981 },
    { name: 'Meknes', lat: 33.8935, lon: -5.5473 },
    { name: 'Oujda', lat: 34.6826, lon: -1.9076 },
    { name: 'Tetouan', lat: 35.5720, lon: -5.3684 },
    { name: 'Safi', lat: 32.2994, lon: -9.2372 },
    { name: 'Mohammedia', lat: 33.6866, lon: -7.3829 },
    { name: 'Khouribga', lat: 32.8811, lon: -6.9063 },
    { name: 'El Jadida', lat: 33.2560, lon: -8.5080 },
    { name: 'Kenitra', lat: 34.2610, lon: -6.5802 },
    { name: 'Nador', lat: 35.1681, lon: -2.9335 },
    { name: 'Beni Mellal', lat: 32.3372, lon: -6.3498 },
    { name: 'Taza', lat: 34.2173, lon: -4.0112 },
    { name: 'Settat', lat: 33.0011, lon: -7.6165 },
    { name: 'Larache', lat: 35.1932, lon: -6.1557 },
    { name: 'Ksar El Kebir', lat: 35.0028, lon: -5.9043 },
    { name: 'Khenifra', lat: 32.9343, lon: -5.6616 },
    { name: 'Guelmim', lat: 28.9870, lon: -10.0574 },
    { name: 'Tiznit', lat: 29.6964, lon: -9.7316 },
    { name: 'Ouarzazate', lat: 30.9189, lon: -6.8934 },
    { name: 'Errachidia', lat: 31.9314, lon: -4.4247 },
    { name: 'Sidi Kacem', lat: 34.2133, lon: -5.7083 },
    { name: 'Sidi Ifni', lat: 29.3796, lon: -10.1775 },
    { name: 'Dakhla', lat: 23.6847, lon: -15.9570 },
    { name: 'Laayoune', lat: 27.1253, lon: -13.1625 },
    { name: 'Smara', lat: 26.7392, lon: -11.6719 },
    { name: 'Al Hoceima', lat: 35.2515, lon: -3.9315 },
    { name: 'Inezgane', lat: 30.3571, lon: -9.5373 },
    { name: 'Oued Zem', lat: 32.8622, lon: -6.5726 },
    { name: 'Berrechid', lat: 33.2672, lon: -7.5878 },
    { name: 'Taourirt', lat: 34.4076, lon: -2.8972 },
    { name: 'Sidi Bennour', lat: 32.6520, lon: -8.4264 },
    { name: 'Azrou', lat: 33.4334, lon: -5.2212 },
    { name: 'Midelt', lat: 32.6850, lon: -4.7437 },
    { name: 'Boujdour', lat: 26.1300, lon: -14.5000 },
    { name: 'Zagora', lat: 30.3473, lon: -5.8399 },
    { name: 'Ifrane', lat: 33.5322, lon: -5.1135 },
    { name: 'Youssoufia', lat: 32.2453, lon: -8.5292 },
    { name: 'Essaouira', lat: 31.5085, lon: -9.7595 },
    { name: 'Oued Laou', lat: 35.4500, lon: -5.0833 },
    { name: 'Azemmour', lat: 33.2906, lon: -8.3431 },
    { name: 'Chefchaouen', lat: 35.1715, lon: -5.2706 },
    { name: 'Bouznika', lat: 33.7896, lon: -7.1598 },
    { name: 'Ben Guerir', lat: 32.2333, lon: -7.9500 },
    { name: 'Ouazzane', lat: 34.7951, lon: -5.5708 },
    { name: 'Tantan', lat: 28.4333, lon: -11.1000 },
    { name: 'Asilah', lat: 35.4653, lon: -6.0352 },
    { name: 'Souk El Arbaa', lat: 34.6998, lon: -5.9515 },
    { name: 'Benslimane', lat: 33.6133, lon: -7.1177 },
    { name: 'Martil', lat: 35.6160, lon: -5.2752 },
    { name: 'Fnideq', lat: 35.8500, lon: -5.3581 },
    { name: 'Tifelt', lat: 33.9000, lon: -6.3183 },
    { name: 'Bouarfa', lat: 32.5333, lon: -1.9500 },
    { name: 'Jerada', lat: 34.3108, lon: -2.1575 },
    { name: 'Tan-Tan', lat: 28.4389, lon: -11.1044 },
    { name: 'Ait Melloul', lat: 30.3242, lon: -9.4984 },
    { name: 'Sefrou', lat: 33.8291, lon: -4.8295 },
    { name: 'Kasba Tadla', lat: 32.5972, lon: -6.2614 },
    { name: 'El Kelaa des Sraghna', lat: 32.0522, lon: -7.4044 },
    { name: 'Tinghir', lat: 31.5147, lon: -5.5328 },
    { name: 'Berkane', lat: 34.9204, lon: -2.3211 },
    { name: 'Fkih Ben Salah', lat: 32.5054, lon: -6.6810 },
    { name: 'Azilal', lat: 31.9614, lon: -6.5744 },
    { name: 'El Hajeb', lat: 33.6944, lon: -5.3719 },
    { name: 'El Aioun', lat: 34.5852, lon: -2.5061 },
    { name: 'Erfoud', lat: 31.4345, lon: -4.2313 },
    { name: 'Moulay Yacoub', lat: 34.0972, lon: -5.1136 },
    { name: 'Sidi Slimane', lat: 34.2616, lon: -5.9227 },
    { name: 'Sidi Taibi', lat: 34.1250, lon: -6.7573 },
    { name: 'Ouled Teima', lat: 30.4007, lon: -9.2089 },
    { name: 'Ain Harrouda', lat: 33.5833, lon: -7.5333 },
    { name: 'Tamesna', lat: 33.9167, lon: -6.8900 },
    { name: 'Lqliaa', lat: 30.3186, lon: -9.5028 },
    { name: 'Skhirat', lat: 33.8492, lon: -7.0312 },
    { name: 'Sidi Rahal', lat: 32.8283, lon: -8.3767 },
    { name: 'Ain Aouda', lat: 33.7725, lon: -6.8491 },
    { name: 'Tabriquet', lat: 34.0306, lon: -6.8000 },
    { name: 'Mdiq', lat: 35.6786, lon: -5.3306 },
    { name: 'Bhalil', lat: 33.8622, lon: -4.8578 },
    { name: 'Tarfaya', lat: 27.9333, lon: -12.9167 },
    { name: 'Ain Taoujdate', lat: 33.9167, lon: -5.1750 },
    { name: 'Ben Ahmed', lat: 33.2167, lon: -7.0833 },
    { name: 'Zawyat an Nwacer', lat: 33.5171, lon: -7.6466 },
    { name: 'Mechra Bel Ksiri', lat: 34.5735, lon: -5.9523 },
    { name: 'Jemaa Shaim', lat: 32.2833, lon: -9.0333 },
    { name: 'Laayoune Plage', lat: 27.1942, lon: -13.3078 },
    { name: 'Temsia', lat: 30.3400, lon: -9.4660 },
    { name: 'Tahala', lat: 34.9736, lon: -4.4144 },
    { name: 'Tanalt', lat: 30.2940, lon: -9.4213 },
    { name: 'Temara', lat: 33.9293, lon: -6.9404 },
    { name: 'Touissite', lat: 34.2996, lon: -1.9745 }
    // Continue adding cities if needed
];


// Helper function to convert degrees to radians
function toRadians(degrees: any) {
    return degrees * (Math.PI / 180);
}

// Haversine formula to calculate the distance between two coordinates
function haversine(lat1: any, lon1: any, lat2: any, lon2: any) {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
}

// Function to determine if the given location is near a city in Morocco

export function isNearCity(location: any, cities: any, maxDistance = 50) {

    try {
        console.log('location', location);


        if (!location) {
            return 'The location is not near any listed cities in Morocco.';
        } else {

            const { latitude, longitude } = JSON.parse(location)

            console.log('lat', latitude);
            console.log('lon', longitude);


            for (let city of cities) {
                const distance = haversine(latitude, longitude, city.lat, city.lon);
                if (distance <= maxDistance) {
                    // (${distance.toFixed(2)} km away)
                    return `The location is near ${city.name} `;
                }
            }
            return 'The location is not near any listed cities in Morocco.';
        }
    } catch (error: any) {
        console.log('====================================');
        console.log('error', error.message);
        console.log('====================================');
    }
}


const OrderListing = ({ navigation, setShowQr, setOrder, setShowFilterModal, showFilterModal, setFilter, filter }: any) => {
    const [loading, setLoading] = useState(false);
    const [leads, setLeads] = useState([]);
    const [unlocked, setUnlocked] = useState(false);
    const [user, setUser]: any = useState(null);
    const isFocused = useIsFocused();

    const getLeads = async () => {
        const token = await getToken();
        const user: any = await getUser();
        setUser(user);

        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            setLoading(true);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                        query getLeadsThatMatchUserProfessionals {
                            getLeadsThatMatchUserProfessionals {
                                id
                                title
                                description
                                status
                                images
                                locationType
                                owner {
                                    id
                                    leads {
                                        id
                                    }
                                    pushToken
                                    firstName
                                    lastName
                                    phone
                                    imageProfile
                                }
                                professionals {
                                    id
                                    text
                                    img
                                }
                                artisantUnlockedLead {
                                    id
                                    firstName
                                    lastName
                                    pushToken
                                    imageProfile
                                }
                                location
                                review{
                                id
                                description
                                rating
                                owner{
                                  id
                                  pushToken
                                  firstName
                                  lastName
                                  imageProfile
                                }
                                
                              }
                            }
                        }
                        `,
                    }),
                }
            );

            const json = await res.json();
            let fetchedLeads = json.data.getLeadsThatMatchUserProfessionals || [];
            console.log('json.data',json.data);
            

            // Apply filters
            if (filter.title) {
                fetchedLeads = fetchedLeads.filter((lead: any) =>
                    lead.title.toLowerCase().includes(filter.title.toLowerCase())
                );
            }
            if (filter.search) {
                fetchedLeads = fetchedLeads.filter((lead: any) =>
                    lead.title.toLowerCase().includes(filter.search.toLowerCase())
                );
            }
            if (filter.profession) {
                fetchedLeads = fetchedLeads.filter((lead: any) =>
                    lead.professionals.some((prof: any) =>
                        prof.text.toLowerCase().includes(filter.profession.toLowerCase())
                    )
                );
            }
            if (filter.location) {
                fetchedLeads = fetchedLeads.filter((lead: any) =>
                    lead.location.toLowerCase().includes(filter.location.toLowerCase())
                );
            }


            setLeads(fetchedLeads);
        } catch (err: any) {
            Alert.alert("Error", JSON.stringify(err.message, undefined, 2));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('====================================');
        console.log('filter', filter);
        console.log('====================================');
        if (isFocused) {
            getLeads();
        }
    }, [isFocused, filter]);

    const HandleUnlock = async (id: any) => {
        const token = await getToken();
        const user: any = await getUser();
        setUser(user);

        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);

        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                        mutation unlockLead($input: LeadUnlockInput) {
                            unlockLead(input: $input) {
                                id
                            }
                        }
                        `,
                        variables: {
                            input: {
                                id: id
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            await getLeads();
        } catch (error: any) {
            return Alert.alert(error.message);
        }
    };



    // isNearCity(
    //     JSON.parse(leads[0]?.order?.location)?.latitude,
    //     JSON.parse(leads[0]?.order?.location)?.longitude,
    //     moroccanCities
    // )

    return (
        <ScrollView style={styles.container}>
            <Modal
                visible={showFilterModal}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setShowFilterModal(false)}
            >
                <View style={styles.modalView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Title"
                        value={filter.title}
                        onChangeText={(text) => setFilter({ ...filter, title: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Profession"
                        value={filter.profession}
                        onChangeText={(text) => setFilter({ ...filter, profession: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Location"
                        value={filter.location}
                        onChangeText={(text) => setFilter({ ...filter, location: text })}
                    />
                    <Button title="Apply Filter" onPress={() => setShowFilterModal(false)} />
                </View>
            </Modal>
            {leads?.map((order: any) => (
                <View key={order?.id} style={styles.orderCard}>
                    <TouchableOpacity>
                        <View
                            className='flex-row justify-between items-center'
                        >
                            <Text style={styles.orderId}>{order?.title}</Text>
                            <View style={styles.professions}>
                                {order?.professionals?.map((prof: any) => (
                                    <Text key={prof.id} style={styles.profession}>{prof?.text}</Text>
                                ))}
                            </View>
                        </View>
                        <Text>{order?.description}</Text>
                        <Text style={styles.label}>Images:</Text>
                        <ScrollView horizontal>
                            {order?.images.map((image: any, index: any) => (
                                <Image key={index} source={{ uri: image }} style={styles.image} />
                            ))}
                        </ScrollView>



                        <Text style={styles.label}>Location</Text>

                        {
                            order?.artisantUnlockedLead.map((e: any) => e.id)?.includes(JSON.parse(user)?.id) ?
                                <LocationView order={order} />
                                :
                                <Text style={styles.label}>
                                    {
                                        isNearCity(
                                            order?.location ? order?.location : null,
                                            moroccanCities
                                        )
                                    }
                                </Text>
                        }
                    </TouchableOpacity>

                    {
                        order?.artisantUnlockedLead.map((e: any) => e.id)?.includes(JSON.parse(user)?.id)
                            ? <>
                                <TouchableOpacity
                                    onPress={() => {


                                        navigation.navigate('OrderView', { order, user })
                                    }}
                                    className='w-[100%] mt-1 items-center py-2 '
                                >
                                    <MaterialCommunityIcons name="eye" color="purple" size={28} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setOrder(order);
                                        setShowQr(true);
                                    }}
                                    className="items-center mb-4">
                                    <QRCode value={JSON.stringify({ id: order?.id, reviewer: "", description: "" })} size={40} />
                                </TouchableOpacity>
                            </>
                            : <View className='border-t-2 flex-row border-gray-100'>
                                <TouchableOpacity className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'>
                                    <MaterialCommunityIcons name="close" color="red" size={28} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { HandleUnlock(order?.id); }}
                                    className='w-1/3 mt-1 items-center border-r-2 py-2 border-gray-100'>
                                    <MaterialCommunityIcons name="check" color="green" size={28} />
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate('OrderView', { order, user })}
                                    className='w-1/3 mt-1 items-center py-2 '>
                                    <MaterialCommunityIcons name="eye" color="purple" size={28} />
                                </TouchableOpacity>
                            </View>
                    }
                </View>
            ))}
        </ScrollView>
    );
};

export const LocationView = ({ order, navigation = null }: any) => {
    if (order?.locationType === 'address') {
        return <Text style={styles.locationDetail}>Address: {order?.location}</Text>;
    } else if (order?.locationType === 'zipCode') {
        return <Text style={styles.locationDetail}>Zip Code: {order?.location}</Text>;
    } else if (order?.locationType === 'currentLocation') {
        const { latitude, longitude } = JSON.parse(order?.location);
        return (
            <TouchableOpacity
                onPress={navigation ? () => navigation.navigate('MapViewArtisan', { marker: { latitude, longitude } }) : () => { }}
            >
                <MapView
                    style={styles?.map}
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
            </TouchableOpacity>
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
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 5,
        width: '80%',
        borderRadius: 5,
    },
    professions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    profession: {
        backgroundColor: COLORS.primary,
        color: 'white',
        borderRadius: 5,
        padding: 5,
        margin: 2,
        fontSize: 12,
    },
});

export default OrderListing;

