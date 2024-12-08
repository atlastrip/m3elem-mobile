// import React from 'react';
// import { View, Text, Image, Button, Dimensions, StyleSheet } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ButtonPrimary } from '@/components/index';
// import { FontAwesome } from '@expo/vector-icons';

// import dayjs from 'dayjs';




// const getUserCategory = (createdAt: any) => {
//     const today = dayjs();
//     const createdDate = dayjs(createdAt);
//     const daysDifference = today.diff(createdDate, 'day');
//     const monthsDifference = today.diff(createdDate, 'month');

//     if (daysDifference <= 10) {
//         return { label: 'New House Guru', color: '#FF9900' }; // Orange
//     } else if (monthsDifference >= 1) {
//         return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
//     } else {
//         return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
//     }
// };

// const getRatingCategory = (rating: any) => {
//     if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
//     if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
//     if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
//     return { label: '', color: '#D32F2F' }; // Red
// };


// const calculateAverageRating = (reviews: any) => {
//     if (!reviews || reviews?.length === 0) return 0;
//     const totalRating = reviews?.reduce(
//         (acc: any, review: any) => acc + parseInt(review?.rating),
//         0
//     );
//     return Math.round(totalRating / reviews?.length);
// };

// const AverageRatingDisplay = React.memo(({ reviews }: any) => {
//     const averageRating = calculateAverageRating(reviews);
//     const { label, color } = getRatingCategory(averageRating);

//     return (
//         <View style={styles.ratingContainer}>
//             <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
//             {Array.from({ length: 5 }).map((_, i) => (
//                 <FontAwesome
//                     key={i}
//                     name={i < averageRating ? 'star' : 'star-o'}
//                     size={16}
//                     color={color}
//                 />
//             ))}
//             <Text style={[styles.ratingCount, { color }]}>
//                 ({reviews?.length || 0})
//             </Text>
//         </View>
//     );
// });




// const MyQrCode = ({ navigation, route }: any) => {
//     const Params = route.params;
//     console.log('====================================');
//     console.log('id', Params?.infoPro?.id);
//     console.log('====================================');
//     const avatarUrl = 'https://example.com/avatar.png'; // Replace with actual avatar URL
//     const qrValue = 'https://m3elem.vercel.app/en/profile/artisant/1'; // Replace with the value for the QR code
//     const insets = useSafeAreaInsets();
//     const { width } = Dimensions.get('window')
//     return (
//         <View className="flex-1 justify-center items-center bg-white p-4 flex-row ">
//             <View className="w-full  bg-gray-100 rounded-2xl p-2">
//                 <View className="items-center mb-4">
//                     <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
//                     <Text className="text-lg font-bold">{
//                         Params?.infoPro?.firstName
//                     }{" "}{
//                             Params?.infoPro?.lastName
//                         }</Text>
//                     <View className="flex-row items-center mt-1">
//                         {/* <Text className="text-red-500">★</Text> */}
//                         {/* <Text className="text-lg ml-1">4.9/5 (15)</Text> */}
//                         <AverageRatingDisplay reviews={Params?.reviews?.filter((e: any) => e)} />

//                     </View>
//                 </View>
//                 <View className="items-center mb-4">
//                     <QRCode value={qrValue}
//                         size={width > 300 ? width * .8 : 300}
//                     />
//                 </View>
//                 <ButtonPrimary text="OK" onPress={() => navigation.goBack()} Loading={false} setLoading={() => { }} />

//             </View>
//         </View>
//     );
// };

// export default MyQrCode;

// const styles = StyleSheet.create({
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ratingLabel: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginRight: 8,
//     },
//     ratingCount: {
//         fontSize: 12,
//         marginLeft: 8,
//     },
// })


// import React, { useRef } from 'react';
// import { View, Text, Image, Button, Dimensions, StyleSheet, TouchableOpacity, Share } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ButtonPrimary } from '@/components/index';
// import { FontAwesome } from '@expo/vector-icons';
// import dayjs from 'dayjs';
// import ViewShot from 'react-native-view-shot';
// // import { captureRef } from 'react-native-view-shot';

// const getUserCategory = (createdAt: any) => {
//     const today = dayjs();
//     const createdDate = dayjs(createdAt);
//     const daysDifference = today.diff(createdDate, 'day');
//     const monthsDifference = today.diff(createdDate, 'month');

//     if (daysDifference <= 10) {
//         return { label: 'New House Guru', color: '#FF9900' }; // Orange
//     } else if (monthsDifference >= 1) {
//         return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
//     } else {
//         return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
//     }
// };

// const getRatingCategory = (rating: any) => {
//     if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
//     if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
//     if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
//     return { label: '', color: '#D32F2F' }; // Red
// };

// const calculateAverageRating = (reviews: any) => {
//     if (!reviews || reviews?.length === 0) return 0;
//     const totalRating = reviews?.reduce(
//         (acc: any, review: any) => acc + parseInt(review?.rating),
//         0
//     );
//     return Math.round(totalRating / reviews?.length);
// };

// const AverageRatingDisplay = React.memo(({ reviews }: any) => {
//     const averageRating = calculateAverageRating(reviews);
//     const { label, color } = getRatingCategory(averageRating);

//     return (
//         <View style={styles.ratingContainer}>
//             <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
//             {Array.from({ length: 5 }).map((_, i) => (
//                 <FontAwesome
//                     key={i}
//                     name={i < averageRating ? 'star' : 'star-o'}
//                     size={16}
//                     color={color}
//                 />
//             ))}
//             <Text style={[styles.ratingCount, { color }]}>
//                 ({reviews?.length || 0})
//             </Text>
//         </View>
//     );
// });

// const MyQrCode = ({ navigation, route }: any) => {
//     const Params = route.params;
//     console.log('====================================');
//     console.log('id', Params?.infoPro?.id);
//     console.log('====================================');
//     const avatarUrl = 'https://example.com/avatar.png'; // Replace with actual avatar URL
//     const qrValue = `https://ahouseguru.com/en/profile/artisant/${Params?.infoPro?.id}`; // Dynamic QR code value
//     const insets = useSafeAreaInsets();
//     const { width } = Dimensions.get('window');
//     const viewShotRef = useRef<any>();

//     const shareQrCode = async () => {
//         try {
//             const uri = await viewShotRef.current.capture();




//             let result = await Share.share({
//                 url: uri
//             });
//             if (result.action === Share.sharedAction) {
//                 console.log('Link shared successfully!');
//             } else if (result.action === Share.dismissedAction) {
//                 console.log('Link sharing dismissed');
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <View className="flex-1 justify-center items-center bg-white p-4 flex-row ">
//             <View className="w-full  bg-gray-100 rounded-2xl p-2">
//                 <View className="items-center mb-4">
//                     <View className="my-5 w-20 h-2 rounded-xl bg-gray-600"></View>
//                     <Text className="text-lg font-bold">
//                         {Params?.infoPro?.firstName} {Params?.infoPro?.lastName}
//                     </Text>
//                     <View className="flex-row items-center mt-1">
//                         <AverageRatingDisplay reviews={Params?.reviews?.filter((e: any) => e)} />
//                     </View>
//                 </View>
//                 <View className="items-center mb-4">
//                     <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//                         <QRCode
//                             value={qrValue}
//                             size={width > 300 ? width * 0.8 : 300}
//                         />
//                     </ViewShot>
//                 </View>
//                 <ButtonPrimary text="OK" onPress={() => navigation.goBack()} Loading={false} setLoading={() => { }} />
//                 <TouchableOpacity onPress={shareQrCode} style={styles.shareButton}>
//                     <Text style={styles.shareButtonText}>Share QR Code</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default MyQrCode;

// const styles = StyleSheet.create({
//     ratingContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 8,
//     },
//     ratingLabel: {
//         fontSize: 14,
//         fontWeight: '600',
//         marginRight: 8,
//     },
//     ratingCount: {
//         fontSize: 12,
//         marginLeft: 8,
//     },
//     shareButton: {
//         marginTop: 16,
//         backgroundColor: '#007BFF',
//         paddingVertical: 12,
//         borderRadius: 8,
//         alignItems: 'center',
//     },
//     shareButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: '600',
//     },
// });


// import React, { useRef } from 'react';
// import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ButtonPrimary } from '@/components/index';
// import { FontAwesome } from '@expo/vector-icons';
// import dayjs from 'dayjs';
// import ViewShot from 'react-native-view-shot';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

// const getUserCategory = (createdAt: any) => {
//   const today = dayjs();
//   const createdDate = dayjs(createdAt);
//   const daysDifference = today.diff(createdDate, 'day');
//   const monthsDifference = today.diff(createdDate, 'month');

//   if (daysDifference <= 10) {
//     return { label: 'New House Guru', color: '#FF9900' }; // Orange
//   } else if (monthsDifference >= 1) {
//     return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
//   } else {
//     return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
//   }
// };

// const getRatingCategory = (rating: any) => {
//   if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
//   if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
//   if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
//   return { label: '', color: '#D32F2F' }; // Red
// };

// const calculateAverageRating = (reviews: any) => {
//   if (!reviews || reviews?.length === 0) return 0;
//   const totalRating = reviews?.reduce(
//     (acc: any, review: any) => acc + parseInt(review?.rating),
//     0
//   );
//   return Math.round(totalRating / reviews?.length);
// };

// const AverageRatingDisplay = React.memo(({ reviews }: any) => {
//   const averageRating = calculateAverageRating(reviews);
//   const { label, color } = getRatingCategory(averageRating);

//   return (
//     <View style={styles.ratingContainer}>
//       <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <FontAwesome
//           key={i}
//           name={i < averageRating ? 'star' : 'star-o'}
//           size={16}
//           color={color}
//         />
//       ))}
//       <Text style={[styles.ratingCount, { color }]}>
//         ({reviews?.length || 0})
//       </Text>
//     </View>
//   );
// });

// const MyQrCode = ({ navigation, route }: any) => {
//   const Params = route.params;
//   const qrValue = `https://ahouseguru.com/en/profile/artisant/${Params?.infoPro?.id}`; // Dynamic QR code value
//   const insets = useSafeAreaInsets();
//   const { width } = Dimensions.get('window');
//   const viewShotRef = useRef<any>();

//   const shareQrCode = async () => {
//     try {
//       const uri = await viewShotRef.current.capture();

//       // Save the captured image to the device's cache directory
//       const fileUri = FileSystem.cacheDirectory + 'QRCode.png';
//       await FileSystem.writeAsStringAsync(fileUri, uri.split('data:image/png;base64,')[1], {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       // Share the image using expo-sharing
//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing QR code:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.contentWrapper}>
//         <View style={styles.header}>
//           <View style={styles.divider}></View>
//           <Text style={styles.nameText}>
//             {Params?.infoPro?.firstName} {Params?.infoPro?.lastName}
//           </Text>
//           <View style={styles.ratingWrapper}>
//             <AverageRatingDisplay reviews={Params?.reviews?.filter((e: any) => e)} />
//           </View>
//         </View>
//         <View style={styles.qrCodeWrapper}>
//           <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//             <QRCode value={qrValue} size={width > 300 ? width * 0.8 : 300} />
//           </ViewShot>
//         </View>
//         <ButtonPrimary
//           text="OK"
//           onPress={() => navigation.goBack()}
//           Loading={false}
//           setLoading={() => {}}
//         />
//         <TouchableOpacity onPress={shareQrCode} style={styles.shareButton}>
//           <Text style={styles.shareButtonText}>Share QR Code</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default MyQrCode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 4,
//     paddingHorizontal: 4,
//     backgroundColor: 'white',
//   },
//   contentWrapper: {
//     width: '100%',
//     backgroundColor: '#f3f4f6', // Equivalent to bg-gray-100
//     borderRadius: 16, // Equivalent to rounded-2xl
//     padding: 8, // Equivalent to p-2
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 16, // Equivalent to mb-4
//   },
//   divider: {
//     marginVertical: 20, // Equivalent to my-5
//     width: 80, // Equivalent to w-20
//     height: 8, // Equivalent to h-2
//     borderRadius: 8, // Equivalent to rounded-xl
//     backgroundColor: '#4b5563', // Equivalent to bg-gray-600
//   },
//   nameText: {
//     fontSize: 18, // Equivalent to text-lg
//     fontWeight: 'bold',
//   },
//   ratingWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4, // Equivalent to mt-1
//   },
//   qrCodeWrapper: {
//     alignItems: 'center',
//     marginBottom: 16, // Equivalent to mb-4
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   ratingLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   ratingCount: {
//     fontSize: 12,
//     marginLeft: 8,
//   },
//   shareButton: {
//     marginTop: 16,
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   shareButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });


// import React, { useRef } from 'react';
// import { View, Text, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
// import QRCode from 'react-native-qrcode-svg';
// import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { ButtonPrimary } from '@/components/index';
// import { FontAwesome } from '@expo/vector-icons';
// import dayjs from 'dayjs';
// import ViewShot from 'react-native-view-shot';
// import * as Sharing from 'expo-sharing';
// import * as FileSystem from 'expo-file-system';

// const getUserCategory = (createdAt: any) => {
//   const today = dayjs();
//   const createdDate = dayjs(createdAt);
//   const daysDifference = today.diff(createdDate, 'day');
//   const monthsDifference = today.diff(createdDate, 'month');

//   if (daysDifference <= 10) {
//     return { label: 'New House Guru', color: '#FF9900' }; // Orange
//   } else if (monthsDifference >= 1) {
//     return { label: 'Pro House Guru', color: '#6A0DAD' }; // Purple
//   } else {
//     return { label: 'Regular House Guru', color: '#007BFF' }; // Blue
//   }
// };

// const getRatingCategory = (rating: any) => {
//   if (rating === 5) return { label: 'Outstanding', color: '#00C853' }; // Green
//   if (rating === 4) return { label: 'Very Good', color: '#2979FF' }; // Blue
//   if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' }; // Amber
//   return { label: '', color: '#D32F2F' }; // Red
// };

// const calculateAverageRating = (reviews: any) => {
//   if (!reviews || reviews?.length === 0) return 0;
//   const totalRating = reviews.reduce((acc: any, review: any) => acc + parseInt(review?.rating), 0);
//   return Math.round(totalRating / reviews.length);
// };

// const AverageRatingDisplay = React.memo(({ reviews }: any) => {
//   const averageRating = calculateAverageRating(reviews);
//   const { label, color } = getRatingCategory(averageRating);

//   return (
//     <View style={styles.ratingContainer}>
//       <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
//       {Array.from({ length: 5 }).map((_, i) => (
//         <FontAwesome
//           key={i}
//           name={i < averageRating ? 'star' : 'star-o'}
//           size={16}
//           color={color}
//         />
//       ))}
//       <Text style={[styles.ratingCount, { color }]}>({reviews?.length || 0})</Text>
//     </View>
//   );
// });

// const MyQrCode = ({ navigation, route }: any) => {
//   const Params = route.params;
//   // Use a deep link scheme instead of a regular URL
//   const qrValue = `com.serviceday.serviceday://profile/artisant/${Params?.infoPro?.id}`;

//   const insets = useSafeAreaInsets();
//   const { width } = Dimensions.get('window');
//   const viewShotRef = useRef<any>();

//   const shareQrCode = async () => {
//     try {
//       const uri = await viewShotRef.current.capture(); 
//       const base64Data = uri.replace('data:image/png;base64,', '');
//       const fileUri = FileSystem.cacheDirectory + 'QRCode.png';

//       await FileSystem.writeAsStringAsync(fileUri, base64Data, {
//         encoding: FileSystem.EncodingType.Base64,
//       });

//       await Sharing.shareAsync(fileUri);
//     } catch (error) {
//       console.error('Error sharing QR code:', error);
//     }
//   };


//   return (
//     <View style={styles.container}>
//       <View style={styles.contentWrapper}>
//         <View style={styles.header}>
//           <View style={styles.divider} />
//           <Text style={styles.nameText}>
//             {Params?.infoPro?.firstName} {Params?.infoPro?.lastName}
//           </Text>
//           <View style={styles.ratingWrapper}>
//             <AverageRatingDisplay reviews={Params?.reviews?.filter((e: any) => e)} />
//           </View>
//         </View>
//         <View style={styles.qrCodeWrapper}>
//           {/* <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1 }}>
//             <QRCode value={qrValue} size={width > 300 ? width * 0.8 : 300} />
//           </ViewShot> */}
//           <ViewShot ref={viewShotRef} options={{ format: 'png', quality: 1, result: 'data-uri' }}>
//             <QRCode value={qrValue} size={width > 300 ? width * 0.8 : 300} />
//           </ViewShot>
//         </View>
//         <ButtonPrimary
//           text="OK"
//           onPress={() => navigation.goBack()}
//           Loading={false}
//           setLoading={() => { }}
//         />
//         <TouchableOpacity onPress={shareQrCode} style={styles.shareButton}>
//           <Text style={styles.shareButtonText}>Share QR Code</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default MyQrCode;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingTop: 4,
//     paddingHorizontal: 4,
//     backgroundColor: 'white',
//   },
//   contentWrapper: {
//     width: '100%',
//     backgroundColor: '#f3f4f6',
//     borderRadius: 16,
//     padding: 8,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   divider: {
//     marginVertical: 20,
//     width: 80,
//     height: 8,
//     borderRadius: 8,
//     backgroundColor: '#4b5563',
//   },
//   nameText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   ratingWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 4,
//   },
//   qrCodeWrapper: {
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   ratingLabel: {
//     fontSize: 14,
//     fontWeight: '600',
//     marginRight: 8,
//   },
//   ratingCount: {
//     fontSize: 12,
//     marginLeft: 8,
//   },
//   shareButton: {
//     marginTop: 16,
//     backgroundColor: '#007BFF',
//     paddingVertical: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   shareButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

import React, { useRef } from 'react';
import { View, Text, Dimensions, StyleSheet, TouchableOpacity, Share, Platform, Alert } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ButtonPrimary } from '@/components/index';
import { FontAwesome } from '@expo/vector-icons';
import dayjs from 'dayjs';
import ViewShot from 'react-native-view-shot';
import * as FileSystem from 'expo-file-system';
import * as Linking from 'expo-linking';

const getUserCategory = (createdAt: any) => {
  const today = dayjs();
  const createdDate = dayjs(createdAt);
  const daysDifference = today.diff(createdDate, 'day');
  const monthsDifference = today.diff(createdDate, 'month');

  if (daysDifference <= 10) {
    return { label: 'New House Guru', color: '#FF9900' };
  } else if (monthsDifference >= 1) {
    return { label: 'Pro House Guru', color: '#6A0DAD' };
  } else {
    return { label: 'Regular House Guru', color: '#007BFF' };
  }
};

const getRatingCategory = (rating: any) => {
  if (rating === 5) return { label: 'Outstanding', color: '#00C853' };
  if (rating === 4) return { label: 'Very Good', color: '#2979FF' };
  if (rating === 3 || rating === 2) return { label: 'Average', color: '#FFAB00' };
  return { label: '', color: '#D32F2F' };
};

const calculateAverageRating = (reviews: any) => {
  if (!reviews || reviews?.length === 0) return 0;
  const totalRating = reviews.reduce((acc: any, review: any) => acc + parseInt(review?.rating), 0);
  return Math.round(totalRating / reviews.length);
};

const AverageRatingDisplay = React.memo(({ reviews }: any) => {
  const averageRating = calculateAverageRating(reviews);
  const { label, color } = getRatingCategory(averageRating);

  return (
    <View style={styles.ratingContainer}>
      <Text style={[styles.ratingLabel, { color }]}>{label}</Text>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesome
          key={i}
          name={i < averageRating ? 'star' : 'star-o'}
          size={16}
          color={color}
        />
      ))}
      <Text style={[styles.ratingCount, { color }]}>({reviews?.length || 0})</Text>
    </View>
  );
});

const MyQrCode = ({ navigation, route }: any) => {
  const Params = route.params;

  // Use Linking to create a deep link URL
  // Make sure the scheme is defined in app.json and that your navigation config matches this route
  const deepLinkUrl = "https://www.ahouseguru.com/en/profile/pro/" + Params?.infoPro?.id

  const insets = useSafeAreaInsets();
  const { width } = Dimensions.get('window');
  const viewShotRef = useRef<any>();

  const shareQrCode = async () => {
    try {
      // Capture the QR code as a base64 data URI
      const uri = await viewShotRef.current.capture();
      const base64Data = uri.replace('data:image/png;base64,', '');
      const fileUri = FileSystem.cacheDirectory + 'QRCode.png';

      // Write the file to the device's cache
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Use React Native's Share API to share both text (message) and the file (via url).
      // Note: On some platforms, the `url` might be treated differently.
      await Share.share({
        message: `Check out this profile: ${deepLinkUrl}`, // Deep link included in the message
        url: fileUri, // The QR code image
      });
    } catch (error) {
      console.error('Error sharing QR code:', error);
    }
  };


  const ShareLink = async () => {
    // const shareLink = async () => {
    if (Platform.OS === 'web') {
      Alert.alert('Sharing is not supported on web');
      return;
    }

    let url = "https://www.ahouseguru.com/en/profile/pro/" + Params?.infoPro?.id


    try {
      // const result = await Share.share({
      //     message: `Check out this user: ${url}`,
      // });


      const uri = await viewShotRef.current.capture();
      const base64Data = uri.replace('data:image/png;base64,', '');
      const fileUri = FileSystem.cacheDirectory + 'QRCode.png';

      // Write the file to the device's cache
      await FileSystem.writeAsStringAsync(fileUri, base64Data, {
        encoding: FileSystem.EncodingType.Base64,
      });

      // Use React Native's Share API to share both text (message) and the file (via url).
      // Note: On some platforms, the `url` might be treated differently.
      let result = await Share.share({
        message: `Check out this profile: ${url}`, // Deep link included in the message
        url: fileUri, // The QR code image
      });
      if (result.action === Share.sharedAction) {
        console.log('Link shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        console.log('Link sharing dismissed');
      }
    } catch (error: any) {
      console.error('Error sharing link:', error);
      Alert.alert('Error sharing the link:', error.message);
    }
    // };


  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.header}>
          <View style={styles.divider} />
          <Text style={styles.nameText}>
            {Params?.infoPro?.firstName} {Params?.infoPro?.lastName}
          </Text>
          <View style={styles.ratingWrapper}>
            <AverageRatingDisplay reviews={Params?.reviews?.filter((e: any) => e)} />
          </View>
        </View>
        <View style={styles.qrCodeWrapper}>
          <ViewShot
            ref={viewShotRef}
            options={{ format: 'png', quality: 1, result: 'data-uri' }}
          >
            <QRCode value={deepLinkUrl} size={width > 300 ? width * 0.8 : 300} />
          </ViewShot>
        </View>
        <ButtonPrimary
          text="OK"
          onPress={() => navigation.goBack()}
          Loading={false}
          setLoading={() => { }}
        />
        <TouchableOpacity onPress={ShareLink} style={styles.shareButton}>
          <Text style={styles.shareButtonText}>Share QR Code</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyQrCode;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 4,
    paddingHorizontal: 4,
    backgroundColor: 'white',
  },
  contentWrapper: {
    width: '100%',
    backgroundColor: '#f3f4f6',
    borderRadius: 16,
    padding: 8,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 20,
    width: 80,
    height: 8,
    borderRadius: 8,
    backgroundColor: '#4b5563',
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  qrCodeWrapper: {
    alignItems: 'center',
    marginBottom: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 12,
    marginLeft: 8,
  },
  shareButton: {
    marginTop: 16,
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
