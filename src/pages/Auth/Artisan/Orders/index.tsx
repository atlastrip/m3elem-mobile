
// import React, { useEffect, useState } from 'react';
// import { Dimensions, Modal, RefreshControl, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { Image } from 'react-native';
// import OrderListing from '@/components/OrderLising';
// import window from "../../../../constants/Layout";
// import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import { COLORS, SHADOWS } from 'constants/theme';
// import { Motion } from '@legendapp/motion';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-svg';
// import { ButtonPrimary } from '@/components/index';





// const ArtisanOrders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets();
//     const [showQr, setShowQr] = useState(false);
//     const [order, setOrder] = useState(null);
//     const [user, setUser]: any = useState(null);
//     const [filterVisible, setFilterVisible] = useState(false);
//     const [filter, setFilter] = useState({ title: '', profession: '', location: '', search: '' });
//     const { width } = Dimensions.get('window');
//     const [showFilterModal, setShowFilterModal] = useState(false);



//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user');
//         setUser(JSON.parse(User || '{}'));
//     };

//     useEffect(() => {
//         getInfo();
//     }, []);

//     return (
//         <View style={{ flex: 1 }} >
//             <TouchableOpacity
//                 style={{
//                     backgroundColor: COLORS.primary,
//                     ...SHADOWS.medium.primary
//                 }}
//                 className='rounded-full justify-center items-center w-20 z-10 h-20 absolute bottom-3 right-3' onPress={() => navigation.navigate('DeckOrders')}>
//                 <Motion.View initial={{ rotate: `${-20}deg` }} animate={{ rotate: `${0}deg` }}>
//                     <MaterialIcons name="swipe" color="white" size={30} />
//                 </Motion.View>
//             </TouchableOpacity>
//             <ScrollView
//                 refreshControl={
//                     <RefreshControl refreshing={false} onRefresh={() => { }} />
//                 }
//             >
//                 <View
//                     style={{
//                         width: window.width,
//                         height: window.height / 3,
//                         maxHeight: 400,
//                         backgroundColor: 'black',
//                         position: "relative"
//                     }}
//                 >
//                     <Image
//                         style={{
//                             width: window.width,
//                             height: window.height / 3,
//                             maxHeight: 400,
//                             opacity: 0.6
//                         }}
//                         source={require('./images/abstract.avif')}
//                     />
//                     <View className='absolute bottom-3 px-3 w-full'>
//                         <Text className='text-5xl font-bold text-white'>Leads</Text>
//                         <View className='flex-row gap-3'>
//                             <TextInput
//                                 placeholderTextColor="black"
//                                 className="text-black h-12 flex-1 placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
//                                 placeholder="Search"
//                                 value={filter.search}
//                                 onChangeText={(text) => setFilter({ ...filter, search: text })}
//                             />
//                             <TouchableOpacity className='rounded-lg h-12 w-12 items-center justify-center bg-white border border-black/25' onPress={() => setShowFilterModal(true)}>
//                                 <Ionicons name="filter" size={24} />
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>

//                 <OrderListing
//                     setShowQr={setShowQr}
//                     setOrder={setOrder}
//                     navigation={navigation}
//                     filter={filter}
//                     showFilterModal={showFilterModal}
//                     setShowFilterModal={setShowFilterModal}
//                     setFilter={setFilter}

//                 />
//             </ScrollView>

//             <Modal visible={filterVisible} transparent={true} animationType="slide" onRequestClose={() => setFilterVisible(false)}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Filter Leads</Text>
//                         <TextInput
//                             placeholder="Title"
//                             style={styles.modalInput}
//                             value={filter.title}
//                             onChangeText={(text) => setFilter({ ...filter, title: text })}
//                         />
//                         <TextInput
//                             placeholder="Profession"
//                             style={styles.modalInput}
//                             value={filter.profession}
//                             onChangeText={(text) => setFilter({ ...filter, profession: text })}
//                         />
//                         <TextInput
//                             placeholder="Location"
//                             style={styles.modalInput}
//                             value={filter.location}
//                             onChangeText={(text) => setFilter({ ...filter, location: text })}
//                         />
//                         <View style={styles.modalActions}>
//                             <TouchableOpacity style={styles.modalButton} onPress={() => setFilterVisible(false)}>
//                                 <Text style={styles.modalButtonText}>Cancel</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity style={styles.modalButton} onPress={() => setFilterVisible(false)}>
//                                 <Text style={styles.modalButtonText}>Apply</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>
//                 </View>
//             </Modal>

//             {showQr && (
//                 <Modal visible={showQr} transparent={true} onRequestClose={() => setShowQr(false)} animationType="slide">
//                     <View className="flex-1 justify-center items-center bg-white p-4 flex-row">
//                         <View className="w-full bg-gray-100 rounded-2xl p-2">
//                             <View className="items-center mb-4">
//                                 <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
//                                 <Text className="text-lg font-bold">
//                                     {user?.firstName + ' ' + user?.lastName}
//                                 </Text>
//                             </View>
//                             <View className="items-center mb-4">
//                                 <QRCode value={JSON.stringify({ order, user })} size={width > 300 ? width * 0.8 : 300} />
//                             </View>
//                             <ButtonPrimary text="OK" onPress={() => setShowQr(false)} Loading={false} setLoading={() => { }} />
//                         </View>
//                     </View>
//                 </Modal>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 10,
//         padding: 20,
//     },
//     modalTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 20,
//     },
//     modalInput: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//     },
//     modalActions: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     modalButton: {
//         padding: 10,
//     },
//     modalButtonText: {
//         color: 'blue',
//     },
// });

// export default ArtisanOrders;




import React, { useEffect, useState } from 'react';
import { Dimensions, Modal, RefreshControl, StyleSheet, Text, TextInput, View, ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import OrderListing from '@/components/OrderLising';
import window from "../../../../constants/Layout";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { COLORS, SHADOWS } from 'constants/theme';
import { Motion } from '@legendapp/motion';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg';
import { ButtonPrimary } from '@/components/index';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import FilterModal from '@/components/FilterModal';

const ArtisanOrders = ({ navigation }: any) => {
    const insets = useSafeAreaInsets();
    const [showQr, setShowQr] = useState(false);
    const [order, setOrder] = useState(null);
    const [user, setUser]: any = useState(null);
    const [filterVisible, setFilterVisible] = useState(false);
    const [filter, setFilter] = useState({ title: '', profession: '', location: '', search: '' });
    const { width } = Dimensions.get('window');
    const [showFilterModal, setShowFilterModal] = useState(false);

    const getInfo = async () => {
        const User = await AsyncStorage.getItem('@user');
        setUser(JSON.parse(User || '{}'));
    };

    useEffect(() => {
        getInfo();
    }, []);

    return (
        <View style={{ flex: 1, backgroundColor: '#f0f0f0' }} >
            <Motion.View
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                style={{
                    position: 'absolute',
                    bottom: 20,
                    right: 20,
                    zIndex: 10,
                }}
            >
                <TouchableOpacity
                    style={{
                        backgroundColor: COLORS.primary,
                        ...SHADOWS.medium.primary,
                        borderRadius: 30,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => navigation.navigate('DeckOrders')}
                >
                    <Motion.View
                        animate={{ rotate: '360deg' }}
                        // @ts-ignore
                        transition={{ repeat: Infinity, duration: 2000, ease: 'linear' }}
                    >
                        <MaterialIcons name="swipe" color="white" size={30} />
                    </Motion.View>
                </TouchableOpacity>
            </Motion.View>

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={false} onRefresh={() => { }} />
                }
            >
                <LinearGradient
                    colors={['#000000', '#3b3b3b']}
                    style={{
                        width: window.width,
                        height: window.height / 3,
                        maxHeight: 400,
                        position: "relative"
                    }}
                >
                    <Image
                        style={{
                            width: window.width,
                            height: window.height / 3,
                            maxHeight: 400,
                            opacity: 0.4
                        }}
                        source={require('./images/abstract.avif')}
                    />
                    <BlurView intensity={20} style={StyleSheet.absoluteFill} />
                    <Motion.View
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
                        style={{ position: 'absolute', bottom: 20, left: 20, right: 20 }}
                    >
                        <Text style={styles.headerTitle}>Leads</Text>
                        <View style={styles.searchContainer}>
                            <TextInput
                                placeholderTextColor="#999"
                                style={styles.searchInput}
                                placeholder="Search"
                                value={filter.search}
                                onChangeText={(text) => setFilter({ ...filter, search: text })}
                            />
                            <TouchableOpacity style={styles.filterButton} onPress={() => setShowFilterModal(true)}>
                                <Ionicons name="filter" size={24} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>
                    </Motion.View>
                </LinearGradient>

                <OrderListing
                    setShowQr={setShowQr}
                    setOrder={setOrder}
                    navigation={navigation}
                    filter={filter}
                    showFilterModal={showFilterModal}
                    setShowFilterModal={setShowFilterModal}
                    setFilter={setFilter}
                />
            </ScrollView>

            {/* <Modal visible={filterVisible} transparent={true} animationType="slide" onRequestClose={() => setFilterVisible(false)}>
                <BlurView intensity={100} style={styles.modalContainer}>
                    <Motion.View
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        style={styles.modalContent}
                    >
                        <Text style={styles.modalTitle}>Filter Leads</Text>
                        <TextInput
                            placeholder="Title"
                            style={styles.modalInput}
                            value={filter.title}
                            onChangeText={(text) => setFilter({ ...filter, title: text })}
                        />
                        <TextInput
                            placeholder="Profession"
                            style={styles.modalInput}
                            value={filter.profession}
                            onChangeText={(text) => setFilter({ ...filter, profession: text })}
                        />
                        <TextInput
                            placeholder="Location"
                            style={styles.modalInput}
                            value={filter.location}
                            onChangeText={(text) => setFilter({ ...filter, location: text })}
                        />
                        <View style={styles.modalActions}>
                            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setFilterVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modalButton, styles.applyButton]} onPress={() => setFilterVisible(false)}>
                                <Text style={[styles.modalButtonText, { color: 'white' }]}>Apply</Text>
                            </TouchableOpacity>
                        </View>
                    </Motion.View>
                </BlurView>
            </Modal> */}
            <FilterModal filterVisible={showFilterModal} setFilterVisible={setShowFilterModal} filter={filter} setFilter={setFilter} />

            {showQr && (
                <Modal visible={showQr} transparent={true} onRequestClose={() => setShowQr(false)} animationType="fade">
                    <BlurView intensity={100} style={styles.qrModalContainer}>
                        <Motion.View
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            style={styles.qrModalContent}
                        >
                            <View style={styles.qrHeader}>
                                <View style={styles.qrHeaderBar}></View>
                                <Text style={styles.qrHeaderText}>
                                    {user?.firstName + ' ' + user?.lastName}
                                </Text>
                            </View>
                            <View style={styles.qrCodeContainer}>
                                <QRCode value={JSON.stringify({ order, user })} size={width > 300 ? width * 0.6 : 200} />
                            </View>
                            <ButtonPrimary text="Close" onPress={() => setShowQr(false)} Loading={false} setLoading={() => { }} />
                        </Motion.View>
                    </BlurView>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    headerTitle: {
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: 25,
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        height: 50,
        color: 'white',
        fontSize: 16,
    },
    filterButton: {
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        ...SHADOWS.medium.primary,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.primary,
    },
    modalInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    modalButton: {
        padding: 15,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    qrModalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    qrModalContent: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        ...SHADOWS.medium.primary,
    },
    qrHeader: {
        alignItems: 'center',
        marginBottom: 20,
    },
    qrHeaderBar: {
        width: 40,
        height: 5,
        backgroundColor: '#ddd',
        borderRadius: 3,
        marginBottom: 15,
    },
    qrHeaderText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    qrCodeContainer: {
        marginBottom: 20,
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        ...SHADOWS.medium.primary,
    },
});

export default ArtisanOrders;