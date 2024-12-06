// import { AntDesign } from '@expo/vector-icons';
// import React, { useEffect, useRef, useState } from 'react';
// import { PanGestureHandler, State } from 'react-native-gesture-handler';
// import Animated, { useAnimatedGestureHandler, useSharedValue, withTiming } from 'react-native-reanimated';
// import { StyleSheet, View, Text, Modal, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import { TextInput } from 'react-native-paper';
// import Icon from 'react-native-vector-icons/Feather';
// import IconFontisto from 'react-native-vector-icons/Fontisto';
// import IconMIC from 'react-native-vector-icons/MaterialCommunityIcons';
// import AntDIcon from 'react-native-vector-icons/AntDesign';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { COLORS } from 'constants/theme';
// import { Motion } from '@legendapp/motion';
// import { MaterialIcons } from "@expo/vector-icons";
// import GestureRecognizer from 'react-native-swipe-gestures';
// import { ActivityIndicator } from 'react-native';
// import PlayButton from '@/components/PlayButton';
// import TextToSpeech from '@/components/TextToSpeach';
// const { width, height } = Dimensions.get('window');

// interface partner {

// }



// const ViewPartner = ({ audio, onPress, minimied, onPressAudio, onPressText, isPlaying, setIsPlaying }: any) => {


//   return (
//     <ScrollView
//       scrollEnabled={!minimied}
//       style={{ flex: 1, width }}>
//       <View className='px-3 items-center flex-row gap-3 justify-between'>
//         <View className='flex-row gap-3 justify-center' >
//           {minimied ? (
//             <TouchableOpacity
//               style={{
//                 aspectRatio: 1
//               }}
//               className='relative'
//               onPress={onPressAudio}
//             >
//               <View
//               style={{backgroundColor : COLORS.primary }}
//               className='rounded-md w-11 h-11 justify-center items-center mr-2'>
//                 <AntDesign name={"play"} size={24} color={"#ffffff"} />
//               </View>
//             </TouchableOpacity>
//           ) : (
//             <TouchableOpacity onPress={onPress} className='px-1 py-3'>
//               <Icon name='arrow-left' />
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             onPress={onPressText}
//             className='flex-1'>
//             <Text className='text-xl font-bold'>
//               {audio?.name}
//             </Text>
//             <Text className='text-md'>
//               {audio?.city}

//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <View
//         className=' mt-5 relative'>
//         <View
//           style={{
//             zIndex: 9999
//           }}
//           className='p-3 absolute w-full bottom-0 left-0'>
//           <PlayButton
//             isPlaying={isPlaying}
//             setIsPlaying={setIsPlaying}
//             url={audio?.audio} />
//         </View>
//         <Image
//           style={{
//             aspectRatio: 1.2
//           }}
//           className='w-full '
//           source={{
//             uri: audio?.image || 'https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif'
//           }}
//         />
//       </View>
//       <View className='p-3'>

//         <Text className='text-xl font-bold'>
//           Description:
//         </Text>
//         <Text className='text-md'>
//           {audio?.description}
//         </Text>
//       </View>
//     </ScrollView>
//   )
// }

// const PartnerCard = ({
//   setSelectedMarker,
//   scrollToElement,
//   audio
// }: {
//   setSelectedMarker: any;
//   scrollToElement: any
//   audio: Audio
// }) => {
//   return <TouchableOpacity
//     onPress={() => {
//       setSelectedMarker(audio)
//       scrollToElement()
//     }}
//     className='px-3 my-3 flex-row gap-3 ' >

//     <View
//       style={{ backgroundColor: COLORS.primary }}
//       className='rounded-md w-20 relative h-20 justify-center items-center mr-2 '>
//       <Image className='absolute object-center z-10 object-cover w-full h-full opacity-30' source={{ uri: audio?.image || "https://cdn.dribbble.com/users/1415337/screenshots/10781083/loadingdots2.gif" }} />
//       <View className='z-20'>
//         <AntDesign name={"play"} size={24} color={"#ffffff"} />
//       </View>
//     </View>
//     <View >
//       <Text className='text-lg font-bold' >
//         {audio?.name}
//       </Text>
//       <Text >
//         {audio?.shortDescription}
//       </Text>
//     </View>
//   </TouchableOpacity>
// }

// interface Audio {
//   id: string
//   name: string
//   description: string
//   shortDescription: string
//   city: string
//   longitude: string
//   latitude: string
//   image: string
//   audio: string
//   type: string
//   archived: boolean

// }


// export default function HomeMapScreen({ navigation, route }: any) {
//   const insets = useSafeAreaInsets();
//   const [location, setLocation] = useState<any>(null);
//   // const [loadingLocation, setLoadingLocation] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");

//   // const getLocation = async () => {
//   //   setLoadingLocation(true);
//   //   let { status } = await Location.requestForegroundPermissionsAsync();
//   //   if (status !== "granted") {
//   //     setErrorMsg("Permission to access location was denied");
//   //     setLoadingLocation(false);
//   //     return;
//   //   }

//   //   let location = await Location.getCurrentPositionAsync({
//   //     accuracy: Location.Accuracy.Balanced,
//   //   });

//   //   setLocation(location.coords);
//   //   setLoadingLocation(false);
//   // };

//   // useEffect(() => {
//   //   getLocation(); // Get location when the component mounts
//   // }, []);

//   // const handlePositionate = ({
//   //   longitude,
//   //   latitude
//   // }: any) => {
//   //   if (location) {
//   //     mapRef.current.animateToRegion(
//   //       {
//   //         latitude: latitude,
//   //         longitude: longitude,
//   //         latitudeDelta: 0.015,
//   //         longitudeDelta: 0.0121,
//   //       },
//   //       1000
//   //     );
//   //   } else {
//   //     Alert.alert("Location not available");
//   //   }
//   // };

//   const mapRef = useRef<any>(null);

//   //--------------------------------------------------------------

//   const [selectedMarker, setSelectedMarker] = useState<Audio | null>(null);

//   const [modalVisible, setModalVisible] = useState(false);
//   useEffect(() => {
//     if (route?.params?.audio) {
//       handleMarkerPress(route?.params?.audio)
//       handlePositionate({
//         latitude: route?.params?.audio.latitude,
//         longitude: route?.params?.audio.longitude,
//       })
//       setOpenBottomModal(true)
//     }
//     return () => {
//       setSelectedMarker(null)
//     }
//   }, [route?.params?.audio])


//   const markers = [
//     {
//       id: 1,
//       title: 'KLM Pavillion Caffe',
//       description: 'Traditional Malaysian Coffee',
//       coordinate: { latitude: 25.276987, longitude: 55.296249 },
//       image: 'https://your-image-url.com/image1.jpg',
//       website: 'https://example.com',
//       phone: '+123456789',
//       instagram: '@klm_caffe',
//     },
//     // Add more markers as needed
//   ];

//   const handleMarkerPress = (marker: any) => {
//     setSelectedMarker(marker);
//     setOpenBottomModal(true);
//     scrollToElement(scrollViewRef1, 1)
//   };

//   const [SelectedCategory, setSelectedCategory] = useState('Resto');
//   const [OpenBottomModal, setOpenBottomModal] = useState(false);
//   const scrollViewRef1 = useRef<any>(null);
//   const scrollViewRef2 = useRef<any>(null);


//   const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({ x: elementIndex * width, animated: true });
//     }
//   };
//   // useEffect(()=>{
//   //     console.log(selectedMarker)
//   // },[selectedMarker])
//   const [isPlaying, setIsPlaying] = useState(false);

//   const [Audios, setAudios] = useState<Audio[]>([]);
//   const getData = async () => {
//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const graphql = JSON.stringify({
//       query: "query AllAudio {\r\n  AllAudio {\r\n    id\r\n    name\r\n    description\r\n    shortDescription\r\n    city\r\n    longitude\r\n    latitude\r\n    image\r\n    audio\r\n    archived\r\n    type\r\n    createdAt\r\n    updatedAt\r\n  }\r\n}\r\n",
//       variables: {}
//     })
//     const requestOptions = {
//       method: "POST",
//       headers: myHeaders,
//       body: graphql,
//     };

//     fetch("https://seashell-app-zt6ud.ondigitalocean.app/layli", requestOptions)
//       .then((response) => response.json())
//       .then((result) => setAudios(result?.data?.AllAudio?.filter((e: any) => e.archived != true) || []))
//       .catch((error) => console.error(error));
//   }
//   getData();

  

//   return (
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: "black",
//         position: "relative",

//       }}
//     >
//       <MapView
//         ref={mapRef}
//         style={{
//           flex: 1,
//         }}
//         initialRegion={{
//           latitude: location?.latitude || 37.78825,
//           longitude: location?.longitude || -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}>
//         {location && (
//           <Marker
//             onPress={() => handlePositionate({
//               latitude: location.latitude,
//               longitude: location.longitude,
//             })}
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}>
//             <View
//               style={
//                 styles.markerCircle
//               }
//             >

//             </View>
//           </Marker>
//         )}
//         {Audios?.map((marker, index) => (
//           <Marker
//             key={index}
//             onPress={() => {
//               handleMarkerPress(marker)
//               handlePositionate({
//                 latitude: +marker?.latitude,
//                 longitude: +marker?.longitude,
//               })
//             }}
//             coordinate={{
//               latitude: +marker?.latitude,
//               longitude: +marker?.longitude,
//             }}>
//             <Image style={{
//               width: 40,
//               height: 40,
//             }} source={require('./Images/marker.png')} />
//           </Marker>
//         ))}
//       </MapView>
//       <View className=' absolute bottom-0 left-0 w-full z-10' >
//         <GestureRecognizer
//           onSwipeUp={() => setOpenBottomModal(true)}
//           onSwipeDown={() => setOpenBottomModal(false)}
//         >

//           <TouchableOpacity
//             onPress={() => {
//               setOpenBottomModal(v => !v)
//             }}
//             className='p-3 pb-0 bg-white rounded-t-3xl w-full '>
//             <Motion.View
//               initial={{
//                 scale: 1
//               }}
//               animate={{
//                 scale: !OpenBottomModal ? 1 : 0
//               }}
//               className='w-10 h-1 rounded-full mx-auto bg-gray-300 mb-3' />
//             <Motion.View
//               initial={{
//                 scale: 1
//               }}
//               className="absolute top-3 right-3"
//               animate={{
//                 scale: OpenBottomModal ? 1 : 0
//               }}>
//               <AntDIcon name="close" size={20} />
//             </Motion.View>
//             {(!OpenBottomModal && !selectedMarker) && (
//               <>
//                 {Audios.length > 0 ? (
//                   <Text className='text-center' >

//                     +{Audios.length} audios
//                   </Text>
//                 ) : (
//                   <Text className='text-center' >

//                     +{Audios.length} audios
//                   </Text>

//                 )}
//               </>

//             )}
//             {!OpenBottomModal && (
//               <View className='border-solid border-b-2 border-gray-100 w-full' />
//             )}
//           </TouchableOpacity>
//         </GestureRecognizer>
//         <Motion.View
//           initial={{
//             height: 0
//           }}
//           className="bg-white"
//           animate={{
//             height: OpenBottomModal ? height * 0.7 : (!OpenBottomModal && selectedMarker) ? 60 : 0
//           }}>
//           <ScrollView
//             ref={scrollViewRef1}
//             snapToInterval={width} // Snaps at each element width
//             decelerationRate="fast"
//             scrollEnabled={selectedMarker != null}
//             showsHorizontalScrollIndicator={false}
//             onScroll={(event) => {
//               if (event.nativeEvent.contentOffset.x <= 0) {
//                 setSelectedMarker(null)
//               }
//             }}
//             horizontal >
//             <ScrollView
//               style={{
//                 flex: 1,
//                 width: width
//               }}>

//               {Audios?.map((e, i) => (
//                 <PartnerCard
//                   key={i}
//                   audio={e}
//                   setSelectedMarker={setSelectedMarker}
//                   scrollToElement={() => scrollToElement(scrollViewRef1, 1)}
//                 />
//               ))}
//             </ScrollView>
//             <ViewPartner
//               isPlaying={isPlaying}
//               audio={selectedMarker}
//               setIsPlaying={setIsPlaying}
//               onPressAudio={() => {
//                 setIsPlaying(v => !v)
//               }}

//               onPressText={() => {
//                 handlePositionate({
//                   latitude: 33.8999,
//                   longitude: -7,
//                 })
//               }}
//               minimied={!OpenBottomModal}
//               onPress={() => {
//                 scrollToElement(scrollViewRef1, 0)
//                 handleMarkerPress(null)
//               }} />
//           </ScrollView>
//         </Motion.View>
//       </View>
//       <Motion.View
//         initial={{
//           bottom: 50,
//           right: 30,
//           width: 60,
//           height: 60,
//         }}
//         style={{
//           position: 'absolute'
//         }}
//         animate={{
//           bottom: OpenBottomModal ? height * 0.7 + 40 : (!OpenBottomModal && selectedMarker) ? 60 + 40 : 0 + 60,
//           right: 30,
//           width: 60,
//           height: 60
//         }}
//       >
//         <TouchableOpacity
//           onPress={() => handlePositionate({
//             latitude: location.latitude,
//             longitude: location.longitude,
//           })}
//           style={styles.gpsButton}
//         >
//           {loadingLocation ? (
//             <ActivityIndicator size="small" color="#fff" />
//           ) : (
//             <MaterialIcons name="gps-fixed" color="white" size={24} />
//           )}
//         </TouchableOpacity>
//       </Motion.View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   gpsButton: {
//     backgroundColor: COLORS.primary,
//     height: 60,
//     width: 60,
//     borderRadius: 50,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   markerCircle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     backgroundColor: COLORS.primary,
//     borderWidth: 4,
//     borderColor: 'white'
//   },
// });
