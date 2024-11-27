// import React from 'react'
// import { Dimensions, Modal, RefreshControl, StyleSheet, Text, TextInput } from 'react-native'
// import { ScrollView } from 'react-native'
// import { View } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import window from "../../constants/Layout";
// import { Image } from 'react-native'
// import UserOrderListing from '@/components/UserOrderLising'
// import MyQrCode from '../Auth/Artisan/Orders/MyQrCode'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import QRCode from 'react-native-qrcode-svg'
// import { ButtonPrimary } from '@/components/index'


// const Orders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets()
//     const [showQr, setShowQr] = React.useState(false)
// const [order, setOrder] = React.useState<any>(null)
//     const [user, setUser] = React.useState<any>(null)
//     const { width } = Dimensions.get('window')


//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user')
//         setUser(JSON.parse(User || '{}'))
//     }


//     React.useEffect(() => {
//         getInfo()
//     }, [])

//     return (
//         <ScrollView
//             refreshControl={
//                 <RefreshControl refreshing={false} onRefresh={() => { }} />
//             }
//         >

//             <View
//                 style={{
//                     width: window.width,
//                     height: window.height / 3,
//                     maxHeight: 400,
//                     backgroundColor: 'black',
//                     position: "relative"
//                 }}
//             >
//                 <Image
//                     style={{
//                         width: window.width,
//                         height: window.height / 3,
//                         maxHeight: 400,
//                         opacity: 0.6
//                     }}
//                     source={require('./images/abstraction.avif')}
//                 />
//                 <View className='absolute bottom-3 px-3 w-full'>
//                     <Text className='text-5xl font-bold text-white ' >
//                         My orders
//                     </Text>
//                     <TextInput
//                         placeholderTextColor="black"
//                         className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
//                         placeholder="Search"
//                     />
//                 </View>

//                 {
//                     showQr &&
//                     <Modal visible={showQr} transparent={true}
//                         onRequestClose={() => setShowQr(false)}
//                         animationType="slide">
//                         <View className="flex-1 justify-center items-center bg-white p-4 flex-row ">
//                             <View className="w-full  bg-gray-100 rounded-2xl p-2">
//                                 <View className="items-center mb-4">
//                                     <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
//                                     <Text className="text-lg font-bold">{
//                                         user?.firstName + ' ' + user?.lastName
//                                     }</Text>
//                                     {/* <View className="flex-row items-center mt-1">
//                         <Text className="text-red-500">★</Text>
//                         <Text className="text-lg ml-1">4.9/5 (15)</Text>
//                     </View> */}
//                                 </View>
//                                 <View className="items-center mb-4">
//                                     <QRCode value={JSON.stringify({order, user})}
//                                         size={width > 300 ? width * .8 : 300}
//                                     />
//                                 </View>
//                                 <ButtonPrimary text="OK" onPress={() => setShowQr(false)} Loading={false} setLoading={() => { }} />

//                             </View>
//                         </View>
//                     </Modal>

//                 }
//             </View>

//             <View className='' >

//                 <UserOrderListing
//                     setOrder={setOrder}
//                     setShowQr={setShowQr}
//                     navigation={navigation} />
//             </View>
//         </ScrollView>
//     )
// }


// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//         backgroundColor: '#f5f5f5',
//     },
//     orderCard: {
//         backgroundColor: 'white',
//         padding: 16,
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
//     locationType: {
//         fontSize: 14,
//         fontWeight: 'bold',
//         color: 'blue',
//     },
// });

// export default Orders



// import React from 'react'
// import { Dimensions, Modal, RefreshControl, StyleSheet, Text, TextInput, Animated, View } from 'react-native'
// import { ScrollView } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import window from "../../constants/Layout";
// import { Image } from 'react-native'
// import UserOrderListing from '@/components/UserOrderLising'
// import MyQrCode from '../Auth/Artisan/Orders/MyQrCode'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import QRCode from 'react-native-qrcode-svg'
// import { ButtonPrimary } from '@/components/index'
// import { LinearGradient } from 'expo-linear-gradient'
// import Svg, { Circle } from 'react-native-svg'

// const MagicSparkle = ({ x, y, size, color, duration }:any) => {
//   const [opacity] = React.useState(new Animated.Value(0))

//   React.useEffect(() => {
//     Animated.sequence([
//       Animated.timing(opacity, {
//         toValue: 1,
//         duration: duration * 0.4,
//         useNativeDriver: true,
//       }),
//       Animated.timing(opacity, {
//         toValue: 0,
//         duration: duration * 0.6,
//         useNativeDriver: true,
//       }),
//     ]).start()
//   }, [])

//   return (
//     <Animated.View style={{ position: 'absolute', left: x, top: y, opacity }}>
//       <Svg width={size} height={size} viewBox="0 0 100 100">
//         <Circle cx="50" cy="50" r="50" fill={color} />
//       </Svg>
//     </Animated.View>
//   )
// }

// const MagicSparkles = () => {
//   const [sparkles, setSparkles]:any = React.useState([])

//   React.useEffect(() => {
//     const interval = setInterval(() => {
//       setSparkles((prevSparkles:any) => [
//         ...prevSparkles,
//         {
//           id: Date.now(),
//           x: Math.random() * window.width,
//           y: Math.random() * window.height,
//           size: Math.random() * 10 + 5,
//           color: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},0.8)`,
//           duration: Math.random() * 1000 + 500,
//         },
//       ])
//     }, 200)

//     return () => clearInterval(interval)
//   }, [])

//   React.useEffect(() => {
//     if (sparkles.length > 20) {
//       setSparkles((prevSparkles:any) => prevSparkles.slice(1))
//     }
//   }, [sparkles])

//   return (
//     <>
//       {sparkles.map((sparkle:any) => (
//         <MagicSparkle key={sparkle.id} {...sparkle} />
//       ))}
//     </>
//   )
// }

// const Orders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets()
//     const [showQr, setShowQr] = React.useState(false)
//     const [order, setOrder] = React.useState<any>(null)
//     const [user, setUser] = React.useState<any>(null)
//     const { width } = Dimensions.get('window')
//     const scrollY = React.useRef(new Animated.Value(0)).current

//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user')
//         setUser(JSON.parse(User || '{}'))
//     }

//     React.useEffect(() => {
//         getInfo()
//     }, [])

//     const headerHeight = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [(window.height - 50) / 3, 100],
//         extrapolate: 'clamp'
//     })

//     const headerOpacity = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [1, 0.6],
//         extrapolate: 'clamp'
//     })

//     return (
//         <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
//             <Animated.View
//                 style={{
//                     position: 'absolute',
//                     top: 0,
//                     left: 0,
//                     right: 0,
//                     height: headerHeight,
//                     zIndex: 1000,
//                 }}
//             >
//                 <LinearGradient
//                     colors={['#6a11cb', '#2575fc']}
//                     style={{ flex: 1 }}
//                 >
//                     <Animated.Image
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             opacity: headerOpacity,
//                         }}
//                         source={require('./images/abstraction.avif')}
//                     />
//                 </LinearGradient>
//             </Animated.View>

//             <ScrollView
//                 refreshControl={
//                     <RefreshControl refreshing={false} onRefresh={() => { }} />
//                 }
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                     { useNativeDriver: false }
//                 )}
//                 scrollEventThrottle={16}
//             >
//                 <View style={{ height: window.height / 3 }} />
//                 <View style={{
//                     backgroundColor: '#f0f0f0',
//                     borderTopLeftRadius: 30,
//                     borderTopRightRadius: 30,
//                     marginTop: -30,
//                     paddingTop: 20,
//                     paddingHorizontal: 20,
//                 }}>
//                     <Text style={styles.title}>My Orders</Text>
//                     <View style={styles.searchContainer}>
//                         <TextInput
//                             style={styles.searchInput}
//                             placeholderTextColor="#999"
//                             placeholder="Search orders..."
//                         />
//                     </View>

//                     <UserOrderListing
//                         setOrder={setOrder}
//                         setShowQr={setShowQr}
//                         navigation={navigation}
//                     />
//                 </View>
//             </ScrollView>

//             <Modal visible={showQr} transparent={true}
//                 onRequestClose={() => setShowQr(false)}
//                 animationType="fade">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <View style={styles.modalHeaderLine} />
//                             <Text style={styles.modalTitle}>{user?.firstName + ' ' + user?.lastName}</Text>
//                         </View>
//                         <View style={styles.qrContainer}>
//                             <QRCode
//                                 value={JSON.stringify({order, user})}
//                                 size={width > 300 ? width * .6 : 200}
//                                 color="#6a11cb"
//                             />
//                         </View>
//                         <ButtonPrimary text="Close" onPress={() => setShowQr(false)} Loading={false} setLoading={() => { }} />
//                     </View>
//                 </View>
//             </Modal>

//             <MagicSparkles />
//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 20,
//     },
//     searchContainer: {
//         backgroundColor: 'white',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     searchInput: {
//         fontSize: 16,
//         paddingVertical: 12,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//     },
//     modalHeader: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalHeaderLine: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#ccc',
//         borderRadius: 2,
//         marginBottom: 15,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     qrContainer: {
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
// });

// export default Orders

// Orders.tsx



// import React from 'react'
// import {
//     Dimensions,
//     Modal,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TextInput,
//     Animated,
//     View,
//     TouchableOpacity,
//     Keyboard,
// } from 'react-native'
// import { ScrollView } from 'react-native'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import window from "../../constants/Layout"
// import { Image } from 'react-native'
// import UserOrderListing from '@/components/UserOrderLising' // Note: Check the import path and name
// import MyQrCode from '../Auth/Artisan/Orders/MyQrCode'
// import AsyncStorage from '@react-native-async-storage/async-storage'
// import QRCode from 'react-native-qrcode-svg'
// import { ButtonPrimary } from '@/components/index' // Adjusted import if necessary
// import { LinearGradient } from 'expo-linear-gradient'
// import Svg, { Circle } from 'react-native-svg'
// import { AntDesign } from '@expo/vector-icons' // For a magical search icon
// import UserUnlockedOrders from '@/components/UserOrderLising'

// const MagicSparkle = ({ x, y, size, color, duration }: any) => {
//     const [opacity] = React.useState(new Animated.Value(0))

//     React.useEffect(() => {
//         Animated.sequence([
//             Animated.timing(opacity, {
//                 toValue: 1,
//                 duration: duration * 0.4,
//                 useNativeDriver: true,
//             }),
//             Animated.timing(opacity, {
//                 toValue: 0,
//                 duration: duration * 0.6,
//                 useNativeDriver: true,
//             }),
//         ]).start()
//     }, [])

//     return (
//         <Animated.View style={{ position: 'absolute', left: x, top: y, opacity }}>
//             <Svg width={size} height={size} viewBox="0 0 100 100">
//                 <Circle cx="50" cy="50" r="50" fill={color} />
//             </Svg>
//         </Animated.View>
//     )
// }

// const MagicSparkles = () => {
//     const [sparkles, setSparkles]: any = React.useState([])

//     React.useEffect(() => {
//         const interval = setInterval(() => {
//             setSparkles((prevSparkles: any) => [
//                 ...prevSparkles,
//                 {
//                     id: Date.now(),
//                     x: Math.random() * window.width,
//                     y: Math.random() * window.height * 0.5, // Limit sparkles to upper half
//                     size: Math.random() * 10 + 5,
//                     color: `rgba(${Math.floor(Math.random() * 256)},${Math.floor(
//                         Math.random() * 256
//                     )},${Math.floor(Math.random() * 256)},0.8)`,
//                     duration: Math.random() * 1000 + 500,
//                 },
//             ])
//         }, 150) // Increased frequency

//         return () => clearInterval(interval)
//     }, [])

//     React.useEffect(() => {
//         if (sparkles.length > 30) {
//             setSparkles((prevSparkles: any) => prevSparkles.slice(1))
//         }
//     }, [sparkles])

//     return (
//         <>
//             {sparkles.map((sparkle: any) => (
//                 <MagicSparkle key={sparkle.id} {...sparkle} />
//             ))}
//         </>
//     )
// }

// const Orders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets()
//     const [showQr, setShowQr] = React.useState(false)
//     const [order, setOrder] = React.useState<any>(null)
//     const [user, setUser] = React.useState<any>(null)
//     const { width } = Dimensions.get('window')
//     const scrollY = React.useRef(new Animated.Value(0)).current
//     const [searchQuery, setSearchQuery] = React.useState<string>('') // Added search query state

//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user')
//         setUser(JSON.parse(User || '{}'))
//     }

//     React.useEffect(() => {
//         getInfo()
//     }, [])

//     const headerHeight = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [(window.height - 50) / 3, 100],
//         extrapolate: 'clamp',
//     })

//     const headerOpacity = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [1, 0.6],
//         extrapolate: 'clamp',
//     })

//     // Debounce search input to optimize performance
//     const debounceTimeout = React.useRef<NodeJS.Timeout | null>(null)

//     const [debouncedQuery, setDebouncedQuery] = React.useState<string>('')

//     const handleSearchChange = (text: string) => {
//         setSearchQuery(text)
//         if (debounceTimeout.current) {
//             clearTimeout(debounceTimeout.current)
//         }
//         debounceTimeout.current = setTimeout(() => {
//             setDebouncedQuery(text)
//         }, 300) // 300ms debounce
//     }

//     return (
//         <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
//             <View
//                 style={{

//                     height: headerHeight,
//                 }}
//             >
//                 <LinearGradient
//                     colors={['#6a11cb', '#2575fc']}
//                     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//                 >
//                     <Image
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             opacity: headerOpacity,
//                             position: 'absolute',
//                         }}
//                         source={require('./images/abstraction.avif')}
//                         resizeMode="cover"
//                     />
//                     {/* <Text style={styles.headerTitle}> My Magical Orders </Text> Added header title */}
//                 </LinearGradient>
//             </View>



//             <View style={styles.contentContainer}>
//                 <Text style={styles.title}>My Orders</Text>
//                 <View style={styles.searchContainer}>
//                     <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholderTextColor="#999"
//                         placeholder="Search orders..."
//                         value={searchQuery}
//                         onChangeText={handleSearchChange}
//                         returnKeyType="search"
//                         onSubmitEditing={Keyboard.dismiss}
//                     />
//                     {searchQuery.length > 0 && (
//                         <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
//                             <AntDesign name="closecircle" size={20} color="#999" />
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <UserUnlockedOrders
//                     // setOrder={setOrder}
//                     // setShowQr={setShowQr}
//                     navigation={navigation}
//                     searchQuery={debouncedQuery} // Passed debounced search query
//                 />
//             </View>

//             <Modal
//                 visible={showQr}
//                 transparent={true}
//                 onRequestClose={() => setShowQr(false)}
//                 animationType="fade"
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <View style={styles.modalHeaderLine} />
//                             <Text style={styles.modalTitle}>{user?.firstName + ' ' + user?.lastName}</Text>
//                         </View>
//                         <View style={styles.qrContainer}>
//                             <QRCode
//                                 value={JSON.stringify({ order, user })}
//                                 size={width > 300 ? width * 0.6 : 200}
//                                 color="#6a11cb"
//                             />
//                         </View>
//                         <ButtonPrimary
//                             text="Close"
//                             onPress={() => setShowQr(false)}
//                             Loading={false}
//                             setLoading={() => { }}
//                         />
//                     </View>
//                 </View>
//             </Modal>

//         </View>
//     )
// }

// const styles = StyleSheet.create({
//     headerTitle: {
//         position: 'absolute',
//         bottom: 20,
//         fontSize: 24,
//         fontWeight: '700',
//         color: '#fff',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 2,
//     },
//     contentContainer: {
//         backgroundColor: '#f0f0f0',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         marginTop: -30,
//         paddingTop: 20,
//         paddingHorizontal: 0, // Removed horizontal padding for full-width cards
//     },
//     title: {
//         fontSize: 32,
//         fontWeight: 'bold',
//         color: '#333',
//         marginBottom: 20,
//         textAlign: 'center', // Centered title
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//         marginHorizontal: 20, // Added horizontal margin to align with full-width cards
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     clearIcon: {
//         marginLeft: 'auto',
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 16,
//         paddingVertical: 12,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//         elevation: 5,
//     },
//     modalHeader: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalHeaderLine: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#ccc',
//         borderRadius: 2,
//         marginBottom: 15,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     qrContainer: {
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
// })

// export default Orders




// import React from 'react';
// import {
//     Dimensions,
//     Modal,
//     RefreshControl,
//     StyleSheet,
//     Text,
//     TextInput,
//     Animated,
//     View,
//     TouchableOpacity,
//     Keyboard,
//     Image,
// } from 'react-native';
// import { ScrollView } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import window from "../../constants/Layout";
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-svg';
// import { ButtonPrimary } from '@/components/index';
// import { LinearGradient } from 'expo-linear-gradient';
// import Svg, { Circle } from 'react-native-svg';
// import { AntDesign } from '@expo/vector-icons';
// import { useEffect, useRef, useState } from 'react';
// import UserUnlockedOrders from '@/components/UserOrderLising';

// const Orders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets();
//     const [showQr, setShowQr] = useState(false);
//     const [order, setOrder] = useState<any>(null);
//     const [user, setUser] = useState<any>(null);
//     const { width } = Dimensions.get('window');
//     const scrollY = useRef(new Animated.Value(0)).current;
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [debouncedQuery, setDebouncedQuery] = useState<string>('');

//     const getInfo = async () => {
//         const User = await AsyncStorage.getItem('@user');
//         setUser(JSON.parse(User || '{}'));
//     };

//     useEffect(() => {
//         getInfo();
//     }, []);

//     const headerHeight = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [(window.height - 50) / 3, 100],
//         extrapolate: 'clamp',
//     });

//     const headerOpacity = scrollY.interpolate({
//         inputRange: [0, 100],
//         outputRange: [1, 0.6],
//         extrapolate: 'clamp',
//     });

//     // Debounce search input to optimize performance
//     const debounceTimeout: any = useRef<number | null>(null);

//     const handleSearchChange = (text: string) => {
//         setSearchQuery(text);
//         if (debounceTimeout.current) {
//             clearTimeout(debounceTimeout.current);
//         }
//         debounceTimeout.current = setTimeout(() => {
//             setDebouncedQuery(text);
//         }, 300);
//     };

//     useEffect(() => {
//         return () => {
//             if (debounceTimeout.current) {
//                 clearTimeout(debounceTimeout.current);
//             }
//         };
//     }, []);

//     return (
//         <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
//             <Animated.View
//                 style={{
//                     height: headerHeight,
//                 }}
//             >
//                 <LinearGradient
//                     colors={['#6a11cb', '#2575fc']}
//                     style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
//                 >
//                     <Animated.Image
//                         style={{
//                             width: '100%',
//                             height: '100%',
//                             opacity: headerOpacity,
//                             position: 'absolute',
//                         }}
//                         source={require('./images/abstraction.avif')}
//                         resizeMode="cover"
//                     />
//                     <Text style={styles.headerTitle}>My Orders</Text>
//                 </LinearGradient>
//             </Animated.View>

//             <View style={styles.contentContainer}>
//                 <View style={styles.searchContainer}>
//                     <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
//                     <TextInput
//                         style={styles.searchInput}
//                         placeholderTextColor="#999"
//                         placeholder="Search orders..."
//                         value={searchQuery}
//                         onChangeText={handleSearchChange}
//                         returnKeyType="search"
//                         onSubmitEditing={Keyboard.dismiss}
//                     />
//                     {searchQuery.length > 0 && (
//                         <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearIcon}>
//                             <AntDesign name="closecircle" size={20} color="#999" />
//                         </TouchableOpacity>
//                     )}
//                 </View>

//                 <UserUnlockedOrders
//                     navigation={navigation}
//                     searchQuery={debouncedQuery}
//                 />

//             </View>

//             <Modal
//                 visible={showQr}
//                 transparent={true}
//                 onRequestClose={() => setShowQr(false)}
//                 animationType="fade"
//             >
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <View style={styles.modalHeaderLine} />
//                             <Text style={styles.modalTitle}>{user?.firstName + ' ' + user?.lastName}</Text>
//                         </View>
//                         <View style={styles.qrContainer}>
//                             <QRCode
//                                 value={JSON.stringify({ order, user })}
//                                 size={width > 300 ? width * 0.6 : 200}
//                                 color="#6a11cb"
//                             />
//                         </View>
//                         <ButtonPrimary
//                             text="Close"
//                             onPress={() => setShowQr(false)}
//                             Loading={false}
//                             setLoading={() => { }}
//                         />
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     headerTitle: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: '#fff',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 2,
//     },
//     contentContainer: {
//         backgroundColor: '#f0f0f0',
//         borderTopLeftRadius: 30,
//         borderTopRightRadius: 30,
//         marginTop: -30,
//         paddingTop: 20,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//         marginHorizontal: 20,
//         marginBottom: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     clearIcon: {
//         marginLeft: 'auto',
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 16,
//         paddingVertical: 12,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//         elevation: 5,
//     },
//     modalHeader: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalHeaderLine: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#ccc',
//         borderRadius: 2,
//         marginBottom: 15,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     qrContainer: {
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
// });

// export default Orders;


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//     Dimensions,
//     Modal,
//     StyleSheet,
//     Text,
//     TextInput,
//     Animated,
//     View,
//     TouchableOpacity,
//     Keyboard,
//     Image,
//     Platform,
//     StatusBar,
//     RefreshControl,
//     ActivityIndicator,
//     FlatList,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-svg';
// import { ButtonPrimary } from '@/components/index';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import UserUnlockedOrders from '@/components/UserOrderLising';
// import { useFocusEffect } from '@react-navigation/native';
// import * as Haptics from 'expo-haptics';
// import { BlurView } from 'expo-blur';

// const { width, height } = Dimensions.get('window');

// const Orders = ({ navigation }: any) => {
//     const insets = useSafeAreaInsets();
//     const [showQr, setShowQr] = useState(false);
//     const [order, setOrder] = useState<any>(null);
//     const [user, setUser] = useState<any>(null);
//     const scrollY = useRef(new Animated.Value(0)).current;
//     const [searchQuery, setSearchQuery] = useState<string>('');
//     const [debouncedQuery, setDebouncedQuery] = useState<string>('');
//     const [refreshing, setRefreshing] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [orderStats, setOrderStats] = useState({ total: 0, completed: 0, pending: 0 });

//     const getInfo = useCallback(async () => {
//         try {
//             setLoading(true);
//             const userString = await AsyncStorage.getItem('@user');
//             if (userString) {
//                 setUser(JSON.parse(userString));
//             }
//             // Simulating API call for order stats
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             setOrderStats({ total: 15, completed: 8, pending: 7 });
//         } catch (error) {
//             console.error('Error fetching user info:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             getInfo();
//         }, [getInfo])
//     );

//     const handleSearchChange = useCallback((text: string) => {
//         setSearchQuery(text);
//         const timeoutId = setTimeout(() => {
//             setDebouncedQuery(text);
//         }, 300);
//         return () => clearTimeout(timeoutId);
//     }, []);

//     const handleRefresh = useCallback(async () => {
//         setRefreshing(true);
//         await getInfo();
//         setRefreshing(false);
//     }, [getInfo]);

//     const renderHeader = useCallback(() => {
//         const headerHeight = scrollY.interpolate({
//             inputRange: [0, 100],
//             outputRange: [(height - 50) / 3, 100],
//             extrapolate: 'clamp',
//         });

//         const headerOpacity = scrollY.interpolate({
//             inputRange: [0, 100],
//             outputRange: [1, 0.6],
//             extrapolate: 'clamp',
//         });

//         return (
//             <Animated.View style={[styles.header, { height: headerHeight }]}>
//                 <LinearGradient
//                     colors={['#6a11cb', '#2575fc']}
//                     style={StyleSheet.absoluteFill}
//                 >
//                     <Animated.Image
//                         style={[
//                             StyleSheet.absoluteFill,
//                             { opacity: headerOpacity },
//                         ]}
//                         source={require('./images/abstraction.avif')}
//                         resizeMode="cover"
//                     />
//                 </LinearGradient>
//                 <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
//                     My Orders
//                 </Animated.Text>
//                 <Animated.View style={[styles.statsContainer, { opacity: headerOpacity }]}>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.total}</Text>
//                         <Text style={styles.statLabel}>Total</Text>
//                     </View>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.completed}</Text>
//                         <Text style={styles.statLabel}>Completed</Text>
//                     </View>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.pending}</Text>
//                         <Text style={styles.statLabel}>Pending</Text>
//                     </View>
//                 </Animated.View>
//             </Animated.View>
//         );
//     }, [scrollY, orderStats]);

//     const renderSearchBar = useCallback(() => (
//         <View style={styles.searchContainer}>
//             <AntDesign name="search1" size={20} color="#999" style={styles.searchIcon} />
//             <TextInput
//                 style={styles.searchInput}
//                 placeholderTextColor="#999"
//                 placeholder="Search orders..."
//                 value={searchQuery}
//                 onChangeText={handleSearchChange}
//                 returnKeyType="search"
//                 onSubmitEditing={Keyboard.dismiss}
//             />
//             {searchQuery.length > 0 && (
//                 <TouchableOpacity 
//                     onPress={() => {
//                         setSearchQuery('');
//                         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//                     }} 
//                     style={styles.clearIcon}
//                 >
//                     <AntDesign name="closecircle" size={20} color="#999" />
//                 </TouchableOpacity>
//             )}
//         </View>
//     ), [searchQuery, handleSearchChange]);

//     const renderQRModal = useCallback(() => (
//         <Modal
//             visible={showQr}
//             transparent={true}
//             onRequestClose={() => setShowQr(false)}
//             animationType="fade"
//         >
//             <BlurView intensity={100} style={StyleSheet.absoluteFill}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <View style={styles.modalHeaderLine} />
//                             <Text style={styles.modalTitle}>{user?.firstName} {user?.lastName}</Text>
//                         </View>
//                         <View style={styles.qrContainer}>
//                             <QRCode
//                                 value={JSON.stringify({ order, user })}
//                                 size={width > 300 ? width * 0.6 : 200}
//                                 color="#6a11cb"
//                             />
//                         </View>
//                         <ButtonPrimary
//                             text="Close"
//                             onPress={() => {
//                                 setShowQr(false);
//                                 Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//                             }}
//                             Loading={false}
//                             setLoading={() => {}}
//                         />
//                     </View>
//                 </View>
//             </BlurView>
//         </Modal>
//     ), [showQr, order, user]);

//     const renderListHeader = useCallback(() => (
//         <>
//             {renderHeader()}
//             {renderSearchBar()}
//         </>
//     ), [renderHeader, renderSearchBar]);

//     const renderListFooter = useCallback(() => (
//         <View style={styles.listFooter} />
//     ), []);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color="#6a11cb" />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" />
//             <FlatList
//                 data={[{ key: 'orders' }]}
//                 renderItem={() => (
//                     <UserUnlockedOrders
//                         navigation={navigation}
//                         searchQuery={debouncedQuery}
//                         onRefresh={handleRefresh}
//                         refreshing={refreshing}
//                     />
//                 )}
//                 ListHeaderComponent={renderListHeader}
//                 ListFooterComponent={renderListFooter}
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                     { useNativeDriver: false }
//                 )}
//                 scrollEventThrottle={16}
//                 contentContainerStyle={styles.scrollViewContent}
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={handleRefresh}
//                         tintColor="#6a11cb"
//                         colors={['#6a11cb', '#2575fc']}
//                     />
//                 }
//             />
//             {renderQRModal()}
//             <TouchableOpacity
//                 style={styles.fabContainer}
//                 onPress={() => {
//                     setShowQr(true);
//                     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//                 }}
//             >
//                 <Ionicons name="qr-code" size={24} color="#fff" />
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f0f0f0',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f0f0f0',
//     },
//     header: {
//         justifyContent: 'flex-end',
//         paddingBottom: 20,
//     },
//     headerTitle: {
//         fontSize: 28,
//         fontWeight: '700',
//         color: '#fff',
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 2,
//     },
//     statsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 10,
//     },
//     statItem: {
//         alignItems: 'center',
//     },
//     statValue: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: '#fff',
//     },
//     statLabel: {
//         fontSize: 14,
//         color: '#fff',
//         opacity: 0.8,
//     },
//     scrollViewContent: {
//         paddingBottom: 20,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'white',
//         borderRadius: 25,
//         paddingHorizontal: 15,
//         marginHorizontal: 20,
//         marginVertical: 20,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 3,
//             },
//         }),
//     },
//     searchIcon: {
//         marginRight: 10,
//     },
//     clearIcon: {
//         marginLeft: 'auto',
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 16,
//         paddingVertical: 12,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 20,
//         padding: 20,
//         alignItems: 'center',
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.25,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 5,
//             },
//         }),
//     },
//     modalHeader: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     modalHeaderLine: {
//         width: 40,
//         height: 4,
//         backgroundColor: '#ccc',
//         borderRadius: 2,
//         marginBottom: 15,
//     },
//     modalTitle: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         color: '#333',
//     },
//     qrContainer: {
//         marginBottom: 20,
//         padding: 10,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.1,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 3,
//             },
//         }),
//     },
//     fabContainer: {
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         backgroundColor: '#6a11cb',
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...Platform.select({
//             ios: {
//                 shadowColor: '#000',
//                 shadowOffset: { width: 0, height: 2 },
//                 shadowOpacity: 0.3,
//                 shadowRadius: 4,
//             },
//             android: {
//                 elevation: 5,
//             },
//         }),
//     },
//     listFooter: {
//         height: 80, // Add some space at the bottom for the FAB
//     },
// });

// export default Orders;


// import React, { useEffect, useRef, useState, useCallback } from 'react';
// import {
//     Dimensions,
//     Modal,
//     StyleSheet,
//     Text,
//     TextInput,
//     Animated,
//     View,
//     TouchableOpacity,
//     Keyboard,
//     Image,
//     Platform,
//     StatusBar,
//     RefreshControl,
//     ActivityIndicator,
//     FlatList,
// } from 'react-native';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import QRCode from 'react-native-qrcode-svg';
// import { ButtonPrimary } from '@/components/index';
// import { LinearGradient } from 'expo-linear-gradient';
// import { AntDesign, Ionicons } from '@expo/vector-icons';
// import UserUnlockedOrders from '@/components/UserOrderLising';
// import { useFocusEffect } from '@react-navigation/native';
// import * as Haptics from 'expo-haptics';
// import { BlurView } from 'expo-blur';

// const { width, height } = Dimensions.get('window');

// const COLORS:any = {
//     primary: "#3a7f41",
//     secondary: "#321a47",
//     black: {
//         dark: "#141721",
//         med: "#202534",
//         light: "#34394A",
//     },
//     white: "#fff",
// };

// const SIZES:any = {
//     base: 8,
//     font: 14,
//     radius: 12,
//     padding: 24,
// };

// const SHADOWS = {
//     light: {
//         shadowColor: COLORS.black.dark,
//         shadowOffset: {
//             width: 0,
//             height: 1,
//         },
//         shadowOpacity: 0.22,
//         shadowRadius: 2.22,
//         elevation: 3,
//     },
//     medium: {
//         shadowColor: COLORS.black.dark,
//         shadowOffset: {
//             width: 0,
//             height: 3,
//         },
//         shadowOpacity: 0.29,
//         shadowRadius: 4.65,
//         elevation: 7,
//     },
//     dark: {
//         shadowColor: COLORS.black.dark,
//         shadowOffset: {
//             width: 0,
//             height: 7,
//         },
//         shadowOpacity: 0.41,
//         shadowRadius: 9.11,
//         elevation: 14,
//     },
// };

// const Orders = ({ navigation }:any) => {
//     const insets = useSafeAreaInsets();
//     const [showQr, setShowQr] = useState(false);
//     const [order, setOrder] = useState(null);
//     const [user, setUser]:any = useState(null);
//     const scrollY = useRef(new Animated.Value(0)).current;
//     const [searchQuery, setSearchQuery] = useState('');
//     const [debouncedQuery, setDebouncedQuery] = useState('');
//     const [refreshing, setRefreshing] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const [orderStats, setOrderStats] = useState({ total: 0, completed: 0, pending: 0 });

//     const getInfo = useCallback(async () => {
//         try {
//             setLoading(true);
//             const userString = await AsyncStorage.getItem('@user');
//             if (userString) {
//                 setUser(JSON.parse(userString));
//             }
//             // Simulating API call for order stats
//             await new Promise(resolve => setTimeout(resolve, 1000));
//             setOrderStats({ total: 15, completed: 8, pending: 7 });
//         } catch (error) {
//             console.error('Error fetching user info:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useFocusEffect(
//         useCallback(() => {
//             getInfo();
//         }, [getInfo])
//     );

//     const handleSearchChange = useCallback((text:any) => {
//         setSearchQuery(text);
//         const timeoutId = setTimeout(() => {
//             setDebouncedQuery(text);
//         }, 300);
//         return () => clearTimeout(timeoutId);
//     }, []);

//     const handleRefresh = useCallback(async () => {
//         setRefreshing(true);
//         await getInfo();
//         setRefreshing(false);
//     }, [getInfo]);

//     const renderHeader = useCallback(() => {
//         const headerHeight = scrollY.interpolate({
//             inputRange: [0, 100],
//             outputRange: [height / 3, 100],
//             extrapolate: 'clamp',
//         });

//         const headerOpacity = scrollY.interpolate({
//             inputRange: [0, 100],
//             outputRange: [1, 0.6],
//             extrapolate: 'clamp',
//         });

//         return (
//             <Animated.View style={[styles.header, { height: headerHeight }]}>
//                 <LinearGradient
//                     colors={[COLORS.primary, COLORS.secondary]}
//                     style={StyleSheet.absoluteFill}
//                 >
//                     <Animated.Image
//                         style={[
//                             StyleSheet.absoluteFill,
//                             { opacity: headerOpacity },
//                         ]}
//                         source={require('./images/abstraction.avif')}
//                         resizeMode="cover"
//                     />
//                 </LinearGradient>
//                 <Animated.Text style={[styles.headerTitle, { opacity: headerOpacity }]}>
//                     My Orders
//                 </Animated.Text>
//                 <Animated.View style={[styles.statsContainer, { opacity: headerOpacity }]}>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.total}</Text>
//                         <Text style={styles.statLabel}>Total</Text>
//                     </View>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.completed}</Text>
//                         <Text style={styles.statLabel}>Completed</Text>
//                     </View>
//                     <View style={styles.statItem}>
//                         <Text style={styles.statValue}>{orderStats.pending}</Text>
//                         <Text style={styles.statLabel}>Pending</Text>
//                     </View>
//                 </Animated.View>
//             </Animated.View>
//         );
//     }, [scrollY, orderStats]);

//     const renderSearchBar = useCallback(() => (
//         <View style={styles.searchContainer}>
//             <AntDesign name="search1" size={20} color={COLORS.black.light} style={styles.searchIcon} />
//             <TextInput
//                 style={styles.searchInput}
//                 placeholderTextColor={COLORS.black.light}
//                 placeholder="Search orders..."
//                 value={searchQuery}
//                 onChangeText={handleSearchChange}
//                 returnKeyType="search"
//                 onSubmitEditing={Keyboard.dismiss}
//             />
//             {searchQuery.length > 0 && (
//                 <TouchableOpacity 
//                     onPress={() => {
//                         setSearchQuery('');
//                         Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
//                     }} 
//                     style={styles.clearIcon}
//                 >
//                     <AntDesign name="closecircle" size={20} color={COLORS.black.light} />
//                 </TouchableOpacity>
//             )}
//         </View>
//     ), [searchQuery, handleSearchChange]);

//     const renderQRModal = useCallback(() => (
//         <Modal
//             visible={showQr}
//             transparent={true}
//             onRequestClose={() => setShowQr(false)}
//             animationType="fade"
//         >
//             <BlurView intensity={100} style={StyleSheet.absoluteFill}>
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <View style={styles.modalHeader}>
//                             <View style={styles.modalHeaderLine} />
//                             <Text style={styles.modalTitle}>{user?.firstName} {user?.lastName}</Text>
//                         </View>
//                         <View style={styles.qrContainer}>
//                             <QRCode
//                                 value={JSON.stringify({ order, user })}
//                                 size={width > 300 ? width * 0.6 : 200}
//                                 color={COLORS.primary}
//                             />
//                         </View>
//                         <ButtonPrimary
//                             text="Close"
//                             onPress={() => {
//                                 setShowQr(false);
//                                 Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
//                             }}
//                             Loading={false}
//                             setLoading={() => {}}
//                         />
//                     </View>
//                 </View>
//             </BlurView>
//         </Modal>
//     ), [showQr, order, user]);

//     const renderListHeader = useCallback(() => (
//         <>
//             {renderHeader()}
//             {renderSearchBar()}
//         </>
//     ), [renderHeader, renderSearchBar]);

//     const renderListFooter = useCallback(() => (
//         <View style={styles.listFooter} />
//     ), []);

//     if (loading) {
//         return (
//             <View style={styles.loadingContainer}>
//                 <ActivityIndicator size="large" color={COLORS.primary} />
//             </View>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <StatusBar barStyle="light-content" />
//             <FlatList
//                 data={[{ key: 'orders' }]}
//                 renderItem={() => (
//                     <UserUnlockedOrders
//                         navigation={navigation}
//                         searchQuery={debouncedQuery}
//                         onRefresh={handleRefresh}
//                         refreshing={refreshing}
//                     />
//                 )}
//                 ListHeaderComponent={renderListHeader}
//                 ListFooterComponent={renderListFooter}
//                 onScroll={Animated.event(
//                     [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                     { useNativeDriver: false }
//                 )}
//                 scrollEventThrottle={16}
//                 contentContainerStyle={styles.scrollViewContent}
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl
//                         refreshing={refreshing}
//                         onRefresh={handleRefresh}
//                         tintColor={COLORS.primary}
//                         colors={[COLORS.primary, COLORS.secondary]}
//                     />
//                 }
//             />
//             {/* {renderQRModal()} */}
//             {/* <TouchableOpacity
//                 style={styles.fabContainer}
//                 onPress={() => {
//                     setShowQr(true);
//                     Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
//                 }}
//             >
//                 <Ionicons name="qr-code" size={24} color={COLORS.white} />
//             </TouchableOpacity> */}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: COLORS.white,
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//     },
//     header: {
//         justifyContent: 'flex-end',
//         paddingBottom: SIZES.padding,
//     },
//     headerTitle: {
//         fontSize: SIZES.h1,
//         fontWeight: '700',
//         color: COLORS.white,
//         textAlign: 'center',
//         textShadowColor: 'rgba(0, 0, 0, 0.3)',
//         textShadowOffset: { width: 0, height: 1 },
//         textShadowRadius: 2,
//     },
//     statsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: SIZES.base,
//     },
//     statItem: {
//         alignItems: 'center',
//     },
//     statValue: {
//         fontSize: SIZES.h2,
//         fontWeight: '700',
//         color: COLORS.white,
//     },
//     statLabel: {
//         fontSize: SIZES.body4,
//         color: COLORS.white,
//         opacity: 0.8,
//     },
//     scrollViewContent: {
//         paddingBottom: SIZES.padding,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: COLORS.white,
//         borderRadius: SIZES.radius,
//         paddingHorizontal: SIZES.base * 2,
//         marginHorizontal: SIZES.padding,
//         marginVertical: SIZES.padding,
//         ...SHADOWS.light,
//     },
//     searchIcon: {
//         marginRight: SIZES.base,
//     },
//     clearIcon: {
//         marginLeft: 'auto',
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: SIZES.body3,
//         paddingVertical: SIZES.base * 1.5,
//         color: COLORS.black.dark,
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: COLORS.white,
//         borderRadius: SIZES.radius * 2,
//         padding: SIZES.padding,
//         alignItems: 'center',
//         ...SHADOWS.dark,
//     },
//     modalHeader: {
//         width: '100%',
//         alignItems: 'center',
//         marginBottom: SIZES.padding,
//     },
//     modalHeaderLine: {
//         width: 40,
//         height: 4,
//         backgroundColor: COLORS.black.light,
//         borderRadius: 2,
//         marginBottom: SIZES.base * 2,
//     },
//     modalTitle: {
//         fontSize: SIZES.h2,
//         fontWeight: 'bold',
//         color: COLORS.black.dark,
//     },
//     qrContainer: {
//         marginBottom: SIZES.padding,
//         padding: SIZES.base,
//         backgroundColor: COLORS.white,
//         borderRadius: SIZES.radius,
//         ...SHADOWS.medium,
//     },
//     fabContainer: {
//         position: 'absolute',
//         bottom: SIZES.padding,
//         right: SIZES.padding,
//         backgroundColor: COLORS.primary,
//         width: 56,
//         height: 56,
//         borderRadius: 28,
//         justifyContent: 'center',
//         alignItems: 'center',
//         ...SHADOWS.medium,
//     },
//     listFooter: {
//         height: 80, // Add some space at the bottom for the FAB
//     },
// });

// export default Orders;
import React, { useRef, useState, useCallback, useEffect } from 'react';
import {
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    Animated,
    View,
    StatusBar,
    FlatList,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import UserUnlockedOrders from '@/components/UserOrderLising';

const { height } = Dimensions.get('window');

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

const Orders = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />

            <UserUnlockedOrders
                navigation={navigation}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
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

export default Orders;
