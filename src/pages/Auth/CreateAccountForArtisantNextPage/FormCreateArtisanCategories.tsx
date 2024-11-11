// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, StyleSheet, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// // import PhoneInput from 'react-native-phone-number-input';
// import BubblesCategoriesCreateSelector from './BubblesCategoriesCreateSelector';

// const Logo = () => (
//     <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );

// export default function FormCreateArtisanCategories({
//     selectedCategories,
//     setSelectedCategories,
//     email,
//     setEmail,
//     phone,
//     setPhone,
//     showModal,
//     setShowModal,
//     Done,
//     setDone,
//     handleSignup,
//     setEnableTextMessage,
//     enableTextMessage,
//     Loading
// }: any) {
//     const [selectedTypeOfView, setSelectedTypeOfView] = useState('grid');
//     const modalAnimation = useSharedValue(0);

//     const animatedModalStyle = useAnimatedStyle(() => {
//         return {
//             opacity: modalAnimation.value,
//             transform: [{ scale: modalAnimation.value }],
//         };
//     });

    // useEffect(() => {
    //     if (showModal) {
    //         modalAnimation.value = withSpring(1);
    //     } else {
    //         modalAnimation.value = withSpring(0);
    //     }
    // }, [showModal]);

//     const handleNextClick = () => {
//         setShowModal(true);
//     };

//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <Logo />
//                 <Text style={styles.headerText}>A HOUSE GURU</Text>
//             </View>

//             <View style={styles.content}>
//                 <Text style={styles.title}>Select any other services you do.</Text>
//                 <Text style={styles.subtitle}>You'll show up in search results and get jobs for all services you select.</Text>

//                 {!Done ? (
//                     <View style={styles.loadingContainer}>
//                         <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
//                         <Text style={styles.loadingText}>We are working on it!</Text>
//                     </View>
//                 ) : (
//                     <View style={styles.categoriesContainer}>
//                         <View style={styles.categoriesHeader}>
//                             <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
//                             <TouchableOpacity
//                                 onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
//                                 style={styles.viewToggle}
//                             >
//                                 <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
//                             </TouchableOpacity>
//                         </View>
//                         <BubblesCategoriesCreateSelector
//                             setDone={setDone}
//                             withInfo={false}
//                             //@ts-ignore
//                             SelectedTypeOfView={selectedTypeOfView}
//                             selectedCategories={selectedCategories}
//                             setSelectedCategories={setSelectedCategories}
//                         />
//                     </View>
//                 )}
//             </View>

//             <View style={styles.footer}>
//                 <TouchableOpacity onPress={() => { }} style={styles.backButton}>
//                     <Ionicons name="arrow-back" size={24} color="#007AFF" />
//                     <Text style={styles.backButtonText}>Back</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={handleNextClick} style={styles.nextButton}>
//                     <Text style={styles.nextButtonText}>Next</Text>
//                 </TouchableOpacity>
//             </View>

// <Modal visible={showModal} transparent animationType="none">
//     <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
//         <View style={styles.modalContent}>
//             <Logo />
//             <Text style={styles.modalTitle}>New customers are waiting.</Text>
//             <Text style={styles.modalSubtitle}>There are 30,000 leads on A HOUSE GURU a day.</Text>

//             <TextInput
//                 style={styles.input}
//                 placeholder="Email"
//                 value={email}
//                 onChangeText={setEmail}
//                 keyboardType="email-address"
//             />

//             {/* <PhoneInput
//                 defaultValue={phone}
//                 defaultCode="US"
//                 layout="first"
//                 onChangeText={(text) => {
//                     setPhone(text);
//                 }}
//                 withDarkTheme
//                 withShadow
//                 autoFocus
//             /> */}

//             <Text style={styles.disclaimer}>
//                 We'll text you with a verification code. Carrier rates may apply.
//             </Text>

//             <TouchableOpacity
//                 style={styles.checkbox}
//                 onPress={() => setEnableTextMessage(!enableTextMessage)}
//             >
//                 <Ionicons
//                     name={enableTextMessage ? 'checkbox-outline' : 'square-outline'}
//                     size={24}
//                     color="#007AFF"
//                 />
//                 <Text style={styles.checkboxText}>Enable text messages</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//                 style={styles.continueButton}
//                 onPress={async () => {
//                     await handleSignup();
//                     setShowModal(false);
//                 }}
//             >
//                 <Text style={styles.continueButtonText}>
//                     {Loading ? "Loading..." : "Continue"}
//                 </Text>
//             </TouchableOpacity>

//             <Text style={styles.termsText}>
//                 By clicking Continue, you agree to the Terms of Use and Privacy Policy.
//             </Text>

//             <TouchableOpacity
//                 style={styles.closeButton}
//                 onPress={() => setShowModal(false)}
//             >
//                 <Ionicons name="close" size={24} color="black" />
//             </TouchableOpacity>
//         </View>
//     </Animated.View>
// </Modal>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
//     backgroundColor: 'white',
// },
// header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
// },
// headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 8,
// },
// content: {
//     padding: 16,
// },
// title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
// },
// subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 16,
// },
// loadingContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 32,
// },
// loadingImage: {
//     width: 100,
//     height: 100,
// },
// loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
// },
// categoriesContainer: {
//     marginTop: 16,
// },
// categoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
// },
// categoriesTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// viewToggle: {
//     padding: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
// },
// footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
// },
// backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
// },
// backButtonText: {
//     marginLeft: 8,
//     color: '#007AFF',
//     fontSize: 16,
// },
// nextButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
// },
// nextButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
// },
// modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// },
// modalContent: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 16,
//     width: '80%',
// },
// modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 16,
//     textAlign: 'center',
// },
// modalSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
// },
// input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 16,
// },
// disclaimer: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 8,
// },
// checkbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
// },
// checkboxText: {
//     marginLeft: 8,
//     fontSize: 16,
// },
// continueButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
// },
// continueButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// termsText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 16,
//     textAlign: 'center',
// },
// closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
// },
// logo: {
//     width: 30,
//     height: 30,
// },
// });


// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, TextInput, ScrollView, Modal, StyleSheet, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// const Logo = () => (
//     <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );



// export default function FormCreateArtisanCategories({
//     selectedCategories,
//     setSelectedCategories,
//     email,
//     setEmail,
//     phone,
//     setPhone,
//     showModal,
//     setShowModal,
//     Done,
//     setDone,
//     handleSignup,
//     setEnableTextMessage,
//     enableTextMessage,
//     Loading
// }: any) {
//     const [selectedTypeOfView, setSelectedTypeOfView] = useState('list');
//     const [expandedCategory, setExpandedCategory] = useState(null);
//     const modalAnimation = useSharedValue(0);
//     const [categories, setCategories] = useState<any>([]);
//     const [loading, setLoading] = useState(false);

//     const animatedModalStyle = useAnimatedStyle(() => {
//         return {
//             opacity: modalAnimation.value,
//             transform: [{ scale: modalAnimation.value }],
//         };
//     });

//     useEffect(() => {
//         if (showModal) {
//             modalAnimation.value = withSpring(1);
//         } else {
//             modalAnimation.value = withSpring(0);
//         }
//     }, [showModal]);

//     const handleNextClick = () => {
//         setShowModal(true);
//     };

//     const toggleCategory = (categoryName: any) => {
//         if (expandedCategory === categoryName) {
//             setExpandedCategory(null);
//         } else {
//             setExpandedCategory(categoryName);
//         }
//     };

//     const toggleSubcategory = (subcategory: any) => {
//         setSelectedCategories((prev: any) =>
//             prev.includes(subcategory)
//                 ? prev.filter((cat: any) => cat !== subcategory)
//                 : [...prev, subcategory]
//         );
//     };






//     const GetCategories = async () => {
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         try {
//             setLoading(true);
//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `

//     query getCategoriesAsString {
//         getCategoriesAsString{
//           categoriesAsString
//         }
//       }

//           `
//                 }),
//             });

//             const data = await response.json();
//             console.log('====================================');
//             console.log('data', data);
//             console.log('====================================');
//             setLoading(false);
//             setCategories(JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString))

//         } catch (error: any) {
//             setLoading(false);
//             Alert.alert("Error", error.message);
//         }
//     }









//     useEffect(() => {
//         GetCategories()
//     }, [])





//     return (
//         <ScrollView style={styles.container}>
//             {/* <View style={styles.header}>
//                 <Logo />
//                 <Text style={styles.headerText}>A HOUSE GURU</Text>
//             </View> */}

//             <View style={styles.content}>
//                 {loading ? (
//                     <View style={styles.loadingContainer}>
//                         <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
//                         <Text style={styles.loadingText}>We are working on it!</Text>
//                     </View>
//                 ) : (
//                     <View style={styles.categoriesContainer}>
//                         <View style={styles.categoriesHeader}>
//                             <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
//                             <TouchableOpacity
//                                 onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
//                                 style={styles.viewToggle}
//                             >
//                                 <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
//                             </TouchableOpacity>
//                         </View>
//                         {categories.map((category: any) => (
//                             <View key={category.name}>
//                                 <TouchableOpacity
//                                     style={styles.categoryItem}
//                                     onPress={() => toggleCategory(category.name)}
//                                 >
//                                     <Ionicons
//                                         name={expandedCategory === category.name ? 'chevron-down' : 'chevron-forward'}
//                                         size={24}
//                                         color="black"
//                                     />
//                                     <Text style={styles.categoryText}>{category.name}</Text>
//                                 </TouchableOpacity>
//                                 {expandedCategory === category.name && (
//                                     <View style={styles.subcategoriesContainer}>
//                                         {category?.subcategories.map((subcategory: any) => (
//                                             <TouchableOpacity
//                                                 key={subcategory.id}
//                                                 style={[
//                                                     styles.subcategoryItem,
//                                                     selectedCategories.includes(subcategory) && styles.selectedSubcategory
//                                                 ]}
//                                                 onPress={() => toggleSubcategory(subcategory)}
//                                             >
//                                                 <Text style={styles.subcategoryText}>{subcategory?.name}</Text>
//                                             </TouchableOpacity>
//                                         ))}
//                                     </View>
//                                 )}
//                             </View>
//                         ))}
//                     </View>
//                 )}
//             </View>



//             {/* Modal code remains unchanged */}
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
// container: {
//     flex: 1,
// },
// header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
// },
// headerText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginLeft: 8,
// },
// content: {
//     padding: 16,
// },
// title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 8,
// },
// subtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginBottom: 16,
// },
// loadingContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 32,
// },
// loadingImage: {
//     width: 100,
//     height: 100,
// },
// loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
// },
// categoriesContainer: {
//     marginTop: 16,
// },
// categoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
// },
// categoriesTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// viewToggle: {
//     padding: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
// },
// footer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#e0e0e0',
// },
// backButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
// },
// backButtonText: {
//     marginLeft: 8,
//     color: '#007AFF',
//     fontSize: 16,
// },
// nextButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 8,
//     paddingHorizontal: 16,
//     borderRadius: 8,
// },
// nextButtonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
// },
// modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// },
// modalContent: {
//     backgroundColor: 'white',
//     padding: 24,
//     borderRadius: 16,
//     width: '80%',
// },
// modalTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 16,
//     textAlign: 'center',
// },
// modalSubtitle: {
//     fontSize: 16,
//     color: '#666',
//     marginTop: 8,
//     textAlign: 'center',
// },
// input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginTop: 16,
// },
// disclaimer: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 8,
// },
// checkbox: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 16,
// },
// checkboxText: {
//     marginLeft: 8,
//     fontSize: 16,
// },
// continueButton: {
//     backgroundColor: '#007AFF',
//     padding: 16,
//     borderRadius: 8,
//     marginTop: 24,
//     alignItems: 'center',
// },
// continueButtonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
// },
// termsText: {
//     fontSize: 12,
//     color: '#666',
//     marginTop: 16,
//     textAlign: 'center',
// },
// closeButton: {
//     position: 'absolute',
//     top: 8,
//     right: 8,
// },
// logo: {
//     width: 30,
//     height: 30,
// },
// categoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
// },
// categoryText: {
//     fontSize: 18,
//     marginLeft: 8,
// },
// subcategoriesContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     padding: 8,
// },
// subcategoryItem: {
//     backgroundColor: '#f0f0f0',
//     padding: 8,
//     margin: 4,
//     borderRadius: 8,
// },
// selectedSubcategory: {
//     backgroundColor: '#007AFF',
// },
// subcategoryText: {
//     fontSize: 14,
// },
//     // ... (add any other necessary styles)
// });

// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';

// const Logo = () => (
//     <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );

// const RecursiveCategory = ({ category, selectedCategories, setSelectedCategories, level = 0 }:any) => {
//     const [expanded, setExpanded] = useState(false);

//     const toggleExpand = () => setExpanded(!expanded);

//     const toggleSelection = (item:any) => {
//         setSelectedCategories((prev:any) =>
//             prev.includes(item)
//                 ? prev.filter((cat:any) => cat !== item)
//                 : [...prev, item]
//         );
//     };

//     return (
//         <View style={{ marginLeft: level * 20 }}>
//             <TouchableOpacity
//                 style={styles.categoryItem}
//                 onPress={toggleExpand}
//             >
//                 <Ionicons
//                     name={expanded ? 'chevron-down' : 'chevron-forward'}
//                     size={24}
//                     color="black"
//                 />
//                 <Text style={styles.categoryText}>{category.name}</Text>
//             </TouchableOpacity>
//             {expanded && (
//                 <View>
//                     {category.subcategories && category.subcategories.map((subcat:any) => (
//                         <RecursiveCategory
//                             key={subcat.id}
//                             category={subcat}
//                             selectedCategories={selectedCategories}
//                             setSelectedCategories={setSelectedCategories}
//                             level={level + 1}
//                         />
//                     ))}
//                     {!category.subcategories && (
//                         <TouchableOpacity
//                             style={[
//                                 styles.subcategoryItem,
//                                 selectedCategories.includes(category) && styles.selectedSubcategory
//                             ]}
//                             onPress={() => toggleSelection(category)}
//                         >
//                             <Text style={styles.subcategoryText}>{category.name}</Text>
//                         </TouchableOpacity>
//                     )}
//                 </View>
//             )}
//         </View>
//     );
// };

// export default function FormCreateArtisanCategories({
//     selectedCategories,
//     setSelectedCategories,
//     email,
//     setEmail,
//     phone,
//     setPhone,
//     showModal,
//     setShowModal,
//     Done,
//     setDone,
//     handleSignup,
//     setEnableTextMessage,
//     enableTextMessage,
//     Loading
// }:any) {
//     const [selectedTypeOfView, setSelectedTypeOfView] = useState('list');
//     const modalAnimation = useSharedValue(0);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const animatedModalStyle = useAnimatedStyle(() => {
//         return {
//             opacity: modalAnimation.value,
//             transform: [{ scale: modalAnimation.value }],
//         };
//     });

//     useEffect(() => {
//         if (showModal) {
//             modalAnimation.value = withSpring(1);
//         } else {
//             modalAnimation.value = withSpring(0);
//         }
//     }, [showModal]);

//     const handleNextClick = () => {
//         setShowModal(true);
//     };

//     const GetCategories = async () => {
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         try {
//             setLoading(true);
//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query getCategoriesAsString {
//               getCategoriesAsString{
//                 categoriesAsString
//               }
//             }
//           `
//                 }),
//             });

//             const data = await response.json();
//             setLoading(false);
//             setCategories(JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString));
//         } catch (error:any) {
//             setLoading(false);
//             Alert.alert("Error", error.message);
//         }
//     }

//     useEffect(() => {
//         GetCategories();
//     }, []);

//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.content}>
//                 {loading ? (
//                     <View style={styles.loadingContainer}>
//                         <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
//                         <Text style={styles.loadingText}>We are working on it!</Text>
//                     </View>
//                 ) : (
//                     <View style={styles.categoriesContainer}>
//                         <View style={styles.categoriesHeader}>
//                             <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
//                             <TouchableOpacity
//                                 onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
//                                 style={styles.viewToggle}
//                             >
//                                 <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
//                             </TouchableOpacity>
//                         </View>
//                         {categories.map((category:any) => (
//                             <RecursiveCategory
//                                 key={category.id}
//                                 category={category}
//                                 selectedCategories={selectedCategories}
//                                 setSelectedCategories={setSelectedCategories}
//                             />
//                         ))}
//                     </View>
//                 )}
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     // ... (keep all existing styles)
//     container: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     headerText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginLeft: 8,
//     },
//     content: {
//         padding: 16,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 8,
//     },
//     subtitle: {
//         fontSize: 16,
//         color: '#666',
//         marginBottom: 16,
//     },
//     loadingContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 32,
//     },
//     loadingImage: {
//         width: 100,
//         height: 100,
//     },
//     loadingText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 16,
//     },
//     categoriesContainer: {
//         marginTop: 16,
//     },
//     categoriesHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     categoriesTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     viewToggle: {
//         padding: 8,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 8,
//     },
//     footer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         padding: 16,
//         borderTopWidth: 1,
//         borderTopColor: '#e0e0e0',
//     },
//     backButton: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     backButtonText: {
//         marginLeft: 8,
//         color: '#007AFF',
//         fontSize: 16,
//     },
//     nextButton: {
//         backgroundColor: '#007AFF',
//         paddingVertical: 8,
//         paddingHorizontal: 16,
//         borderRadius: 8,
//     },
//     nextButtonText: {
//         color: 'white',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: 'white',
//         padding: 24,
//         borderRadius: 16,
//         width: '80%',
//     },
//     modalTitle: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginTop: 16,
//         textAlign: 'center',
//     },
//     modalSubtitle: {
//         fontSize: 16,
//         color: '#666',
//         marginTop: 8,
//         textAlign: 'center',
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 8,
//         padding: 12,
//         marginTop: 16,
//     },
//     disclaimer: {
//         fontSize: 12,
//         color: '#666',
//         marginTop: 8,
//     },
//     checkbox: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 16,
//     },
//     checkboxText: {
//         marginLeft: 8,
//         fontSize: 16,
//     },
//     continueButton: {
//         backgroundColor: '#007AFF',
//         padding: 16,
//         borderRadius: 8,
//         marginTop: 24,
//         alignItems: 'center',
//     },
//     continueButtonText: {
//         color: 'white',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     termsText: {
//         fontSize: 12,
//         color: '#666',
//         marginTop: 16,
//         textAlign: 'center',
//     },
//     closeButton: {
//         position: 'absolute',
//         top: 8,
//         right: 8,
//     },
//     logo: {
//         width: 30,
//         height: 30,
//     },

//     subcategoriesContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         padding: 8,
//     },
//     categoryItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     categoryText: {
//         fontSize: 18,
//         marginLeft: 8,
//     },
//     subcategoryItem: {
//         backgroundColor: '#f0f0f0',
//         padding: 8,
//         margin: 4,
//         borderRadius: 8,
//     },
//     selectedSubcategory: {
//         backgroundColor: '#007AFF',
//     },
//     subcategoryText: {
//         fontSize: 14,
//     },
// });



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';

// const Logo = () => (
//   <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );

// const RecursiveCategory = ({ category, selectedCategories, setSelectedCategories, level = 0 }:any) => {
//   const [expanded, setExpanded] = useState(false);

//   const toggleExpand = () => {
//     if (category.subcategories && category.subcategories.length > 0) {
//       setExpanded(!expanded);
//     }
//   };

//   const toggleSelection = (item:any) => {
//     setSelectedCategories((prev:any) =>
//       prev.some((cat:any) => cat.id === item.id)
//         ? prev.filter((cat:any) => cat.id !== item.id)
//         : [...prev, item]
//     );
//   };

//   const isSelected = selectedCategories.some((cat:any) => cat.id === category.id);

//   const hasSubcategories = category.subcategories && category.subcategories.length > 0;

//   return (
//     <View style={{ marginLeft: level * 20 }}>
//       <TouchableOpacity
//         style={[
//           styles.categoryItem,
//           !hasSubcategories && styles.leafCategory,
//           !hasSubcategories && isSelected && styles.selectedLeafCategory
//         ]}
//         onPress={hasSubcategories ? toggleExpand : () => toggleSelection(category)}
//       >
//         {hasSubcategories ? (
//           <Ionicons
//             name={expanded ? 'chevron-down' : 'chevron-forward'}
//             size={24}
//             color="black"
//           />
//         ) : (
//           <Ionicons
//             name={isSelected ? 'checkbox' : 'square-outline'}
//             size={24}
//             color={isSelected ? '#007AFF' : 'black'}
//           />
//         )}
//         <Text style={[styles.categoryText, !hasSubcategories && isSelected && styles.selectedCategoryText]}>
//           {category.name}
//         </Text>
//       </TouchableOpacity>
//       {expanded && hasSubcategories && (
//         <View>
//           {category.subcategories.map((subcat:any) => (
//             <RecursiveCategory
//               key={subcat.id}
//               category={subcat}
//               selectedCategories={selectedCategories}
//               setSelectedCategories={setSelectedCategories}
//               level={level + 1}
//             />
//           ))}
//         </View>
//       )}
//     </View>
//   );
// };

// export default function FormCreateArtisanCategories({
//   selectedCategories,
//   setSelectedCategories,
//   email,
//   setEmail,
//   phone,
//   setPhone,
//   showModal,
//   setShowModal,
//   Done,
//   setDone,
//   handleSignup,
//   setEnableTextMessage,
//   enableTextMessage,
//   Loading
// }:any) {
//   const [selectedTypeOfView, setSelectedTypeOfView] = useState('list');
//   const modalAnimation = useSharedValue(0);
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const animatedModalStyle = useAnimatedStyle(() => {
//     return {
//       opacity: modalAnimation.value,
//       transform: [{ scale: modalAnimation.value }],
//     };
//   });

//   useEffect(() => {
//     if (showModal) {
//       modalAnimation.value = withSpring(1);
//     } else {
//       modalAnimation.value = withSpring(0);
//     }
//   }, [showModal]);

//   const handleNextClick = () => {
//     setShowModal(true);
//   };

//   const GetCategories = async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       setLoading(true);
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//             query getCategoriesAsString {
//               getCategoriesAsString{
//                 categoriesAsString
//               }
//             }
//           `
//         }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       setCategories(JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString));
//     } catch (error:any) {
//       setLoading(false);
//       Alert.alert("Error", error.message);
//     }
//   }

//   useEffect(() => {
//     GetCategories();
//   }, []);

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.content}>
//         {loading ? (
//           <View style={styles.loadingContainer}>
//             <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
//             <Text style={styles.loadingText}>We are working on it!</Text>
//           </View>
//         ) : (
//           <View style={styles.categoriesContainer}>
//             <View style={styles.categoriesHeader}>
//               <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
//               <TouchableOpacity
//                 onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
//                 style={styles.viewToggle}
//               >
//                 <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
//               </TouchableOpacity>
//             </View>
//             {categories.map((category:any) => (
//               <RecursiveCategory
//                 key={category.id}
//                 category={category}
//                 selectedCategories={selectedCategories}
//                 setSelectedCategories={setSelectedCategories}
//               />
//             ))}
//           </View>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   content: {
//     padding: 16,
//   },
//   loadingContainer: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 32,
//   },
//   loadingImage: {
//     width: 100,
//     height: 100,
//   },
//   loadingText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 16,
//   },
//   categoriesContainer: {
//     marginTop: 16,
//   },
//   categoriesHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   categoriesTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   viewToggle: {
//     padding: 8,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 8,
//   },
//   categoryItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e0e0e0',
//   },
//   leafCategory: {
//     backgroundColor: '#f9f9f9',
//   },
//   selectedLeafCategory: {
//     backgroundColor: '#e6f2ff',
//   },
//   categoryText: {
//     fontSize: 18,
//     marginLeft: 8,
//   },
//   selectedCategoryText: {
//     color: '#007AFF',
//     fontWeight: 'bold',
//   },
//   logo: {
//     width: 30,
//     height: 30,
//   },
// });



// import React, { useState, useEffect } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, TextInput,Modal } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
// import { getToken } from '@/helpers/getToken';
// import Constants from 'expo-constants';

// const Logo = () => (
//     <Image source={require('@/assets/handyman.png')} style={styles.logo} />
// );

// const RecursiveCategory = ({ category, selectedCategories, setSelectedCategories, level = 0, isTopLevel = true }: any) => {
//     const [expanded, setExpanded] = useState(false);

//     const toggleExpand = () => {
//         setExpanded(!expanded);
//     };

//     const toggleSelection = (item: any) => {
//         setSelectedCategories((prev: any) => {
//             const isCurrentlySelected = prev.some((cat: any) => cat.id === item.id);
//             let newSelection;

//             if (isCurrentlySelected) {
//                 // Deselect this category and all its subcategories
//                 newSelection = prev.filter((cat: any) => !isDescendantOf(cat, item));
//             } else {
//                 // Select this category and all its subcategories
//                 const descendantIds = getAllDescendantIds(item);
//                 const descendantsToAdd = descendantIds.filter(id => !prev.some((cat: any) => cat.id === id));
//                 newSelection = [...prev, item, ...descendantsToAdd.map(id => findCategoryById(item, id))];
//             }

//             return newSelection;
//         });
//     };

//     const isDescendantOf = (descendant: any, ancestor: any) => {
//         if (descendant.id === ancestor.id) return true;
//         if (ancestor.subcategories) {
//             return ancestor.subcategories.some((subcat: any) => isDescendantOf(descendant, subcat));
//         }
//         return false;
//     };

//     const getAllDescendantIds = (item: any) => {
//         let ids = [item.id];
//         if (item.subcategories) {
//             item.subcategories.forEach((subcat: any) => {
//                 ids = [...ids, ...getAllDescendantIds(subcat)];
//             });
//         }
//         return ids;
//     };

//     const findCategoryById = (rootCategory: any, id: any) => {
//         if (rootCategory.id === id) return rootCategory;
//         if (rootCategory.subcategories) {
//             for (let subcat of rootCategory.subcategories) {
//                 const found: any = findCategoryById(subcat, id);
//                 if (found) return found;
//             }
//         }
//         return null;
//     };

//     const isSelected = selectedCategories.some((cat: any) => cat.id === category.id);
//     const hasSubcategories = category.subcategories && category.subcategories.length > 0;

//     return (
//         <View style={{ marginLeft: level * 20 }}>
//             <TouchableOpacity
//                 style={[
//                     styles.categoryItem,
//                     !isTopLevel && styles.selectableCategory,
//                     !isTopLevel && isSelected && styles.selectedCategory
//                 ]}
//                 onPress={isTopLevel ? toggleExpand : () => toggleSelection(category)}
//             >
//                 {hasSubcategories && (
//                     <Ionicons
//                         name={expanded ? 'chevron-down' : 'chevron-forward'}
//                         size={24}
//                         color="black"
//                         style={styles.expandIcon}
//                     />
//                 )}
//                 {!isTopLevel && (
//                     <Ionicons
//                         name={isSelected ? 'checkbox' : 'square-outline'}
//                         size={24}
//                         color={isSelected ? '#007AFF' : 'black'}
//                         style={styles.checkboxIcon}
//                     />
//                 )}
//                 <Text style={[
//                     styles.categoryText,
//                     !isTopLevel && isSelected && styles.selectedCategoryText
//                 ]}>
//                     {category.name}
//                 </Text>
//             </TouchableOpacity>
//             {(expanded || (!isTopLevel && isSelected)) && hasSubcategories && (
//                 <View>
//                     {category.subcategories.map((subcat: any) => (
//                         <RecursiveCategory
//                             key={subcat.id}
//                             category={subcat}
//                             selectedCategories={selectedCategories}
//                             setSelectedCategories={setSelectedCategories}
//                             level={level + 1}
//                             isTopLevel={false}
//                         />
//                     ))}
//                 </View>
//             )}
//         </View>
//     );
// };

// export default function FormCreateArtisanCategories({
//     selectedCategories,
//     setSelectedCategories,
//     email,
//     setEmail,
//     phone,
//     setPhone,
//     showModal,
//     setShowModal,
//     Done,
//     setDone,
//     handleSignup,
//     setEnableTextMessage,
//     enableTextMessage,
//     Loading
// }: any) {
//     const [selectedTypeOfView, setSelectedTypeOfView] = useState('list');
//     const modalAnimation = useSharedValue(0);
//     const [categories, setCategories] = useState([]);
//     const [loading, setLoading] = useState(false);

//     const animatedModalStyle = useAnimatedStyle(() => {
//         return {
//             opacity: modalAnimation.value,
//             transform: [{ scale: modalAnimation.value }],
//         };
//     });

//     useEffect(() => {
//         if (showModal) {
//             modalAnimation.value = withSpring(1);
//         } else {
//             modalAnimation.value = withSpring(0);
//         }
//     }, [showModal]);

//     const handleNextClick = () => {
//         setShowModal(true);
//     };

//     const GetCategories = async () => {
//         const token = await getToken();
//         const headers = new Headers({
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//         });

//         try {
//             setLoading(true);
//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query getCategoriesAsString {
//               getCategoriesAsString{
//                 categoriesAsString
//               }
//             }
//           `
//                 }),
//             });

//             const data = await response.json();
//             setLoading(false);
//             setCategories(JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString));
//         } catch (error: any) {
//             setLoading(false);
//             Alert.alert("Error", error.message);
//         }
//     }

//     useEffect(() => {
//         GetCategories();
//     }, []);

//     return (
//         <ScrollView style={styles.container}>
//             <View style={styles.content}>
//                 {loading ? (
//                     <View style={styles.loadingContainer}>
//                         <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
//                         <Text style={styles.loadingText}>We are working on it!</Text>
//                     </View>
//                 ) : (
//                     <View style={styles.categoriesContainer}>
//                         <View style={styles.categoriesHeader}>
//                             <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
//                             <TouchableOpacity
//                                 onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
//                                 style={styles.viewToggle}
//                             >
//                                 <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
//                             </TouchableOpacity>
//                         </View>
//                         {categories.map((category: any) => (
//                             <RecursiveCategory
//                                 key={category.id}
//                                 category={category}
//                                 selectedCategories={selectedCategories}
//                                 setSelectedCategories={setSelectedCategories}
//                                 isTopLevel={true}
//                             />
//                         ))}



//                     </View>



//                 )}
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     content: {
//         padding: 16,
//     },
//     loadingContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         marginTop: 32,
//     },
//     loadingImage: {
//         width: 100,
//         height: 100,
//     },
//     loadingText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginTop: 16,
//     },
//     categoriesContainer: {
//         marginTop: 16,
//     },
//     categoriesHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: 16,
//     },
//     categoriesTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     viewToggle: {
//         padding: 8,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 8,
//     },
//     categoryItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     selectableCategory: {
//         // backgroundColor: '#f9f9f9',
//     },
//     selectedCategory: {
//         // backgroundColor: '#e6f2ff',
//     },
//     categoryText: {
//         fontSize: 18,
//         marginLeft: 8,
//     },
//     selectedCategoryText: {
//         // color: '#007AFF',
//         fontWeight: 'bold',
//     },
//     logo: {
//         width: 30,
//         height: 30,
//     },
//     expandIcon: {
//         marginRight: 8,
//     },
//     checkboxIcon: {
//         marginRight: 8,
//     },
   
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image, Alert, TextInput, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { useRoute } from '@react-navigation/native';

const Logo = () => (
    <Image source={require('@/assets/handyman.png')} style={styles.logo} />
);

const RecursiveCategory = ({ category, selectedCategories, setSelectedCategories, level = 0, isTopLevel = true }: any) => {
    const [expanded, setExpanded] = useState(false);

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const toggleSelection = (item: any) => {
        setSelectedCategories((prev: any) => {
            const isCurrentlySelected = prev.some((cat: any) => cat.id === item.id);
            let newSelection;

            if (isCurrentlySelected) {
                // Deselect this category and all its subcategories
                newSelection = prev.filter((cat: any) => !isDescendantOf(cat, item));
            } else {
                // Select this category and all its subcategories
                const descendantIds = getAllDescendantIds(item);
                const descendantsToAdd = descendantIds.filter(id => !prev.some((cat: any) => cat.id === id));
                newSelection = [...prev, item, ...descendantsToAdd.map(id => findCategoryById(item, id))];
            }

            return newSelection;
        });
    };

    const isDescendantOf = (descendant: any, ancestor: any) => {
        if (descendant.id === ancestor.id) return true;
        if (ancestor.subcategories) {
            return ancestor.subcategories.some((subcat: any) => isDescendantOf(descendant, subcat));
        }
        return false;
    };

    const getAllDescendantIds = (item: any) => {
        let ids = [item.id];
        if (item.subcategories) {
            item.subcategories.forEach((subcat: any) => {
                ids = [...ids, ...getAllDescendantIds(subcat)];
            });
        }
        return ids;
    };

    const findCategoryById = (rootCategory: any, id: any) => {
        if (rootCategory.id === id) return rootCategory;
        if (rootCategory.subcategories) {
            for (let subcat of rootCategory.subcategories) {
                const found: any = findCategoryById(subcat, id);
                if (found) return found;
            }
        }
        return null;
    };

    const isSelected = selectedCategories.some((cat: any) => cat.id === category.id);
    const hasSubcategories = category.subcategories && category.subcategories.length > 0;

    return (
        <View style={{ marginLeft: level * 20 }}>
            <TouchableOpacity
                style={[
                    styles.categoryItem,
                    !isTopLevel && styles.selectableCategory,
                    !isTopLevel && isSelected && styles.selectedCategory
                ]}
                onPress={isTopLevel ? toggleExpand : () => toggleSelection(category)}
            >
                {hasSubcategories && (
                    <Ionicons
                        name={expanded ? 'chevron-down' : 'chevron-forward'}
                        size={24}
                        color="black"
                        style={styles.expandIcon}
                    />
                )}
                {!isTopLevel && (
                    <Ionicons
                        name={isSelected ? 'checkbox' : 'square-outline'}
                        size={24}
                        color={isSelected ? '#007AFF' : 'black'}
                        style={styles.checkboxIcon}
                    />
                )}
                <Text style={[
                    styles.categoryText,
                    !isTopLevel && isSelected && styles.selectedCategoryText
                ]}>
                    {category.name}
                </Text>
            </TouchableOpacity>
            {(expanded || (!isTopLevel && isSelected)) && hasSubcategories && (
                <View>
                    {category.subcategories.map((subcat: any) => (
                        <RecursiveCategory
                            key={subcat.id}
                            category={subcat}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            level={level + 1}
                            isTopLevel={false}
                        />
                    ))}
                </View>
            )}
        </View>
    );
};

export default function FormCreateArtisanCategories({
    selectedCategories,
    setSelectedCategories,
    email,
    setEmail,
    phone,
    setPhone,
    showModal,
    setShowModal,
    Done,
    setDone,
    handleSignup,
    setEnableTextMessage,
    enableTextMessage,
    Loading
}: any) {
    const [selectedTypeOfView, setSelectedTypeOfView] = useState('list');
    const modalAnimation = useSharedValue(0);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const route = useRoute();
    const { categoryId, zipCode } = route.params as { categoryId: string, zipCode: string };

    const animatedModalStyle = useAnimatedStyle(() => {
        return {
            opacity: modalAnimation.value,
            transform: [{ scale: modalAnimation.value }],
        };
    });

    useEffect(() => {
        if (showModal) {
            modalAnimation.value = withSpring(1);
        } else {
            modalAnimation.value = withSpring(0);
        }
    }, [showModal]);

    const handleNextClick = () => {
        setShowModal(true);
    };

    const GetCategories = async () => {
        const token = await getToken();
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
        });

        try {
            setLoading(true);
            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
            query getCategoriesAsString {
              getCategoriesAsString{
                categoriesAsString
              }
            }
          `
                }),
            });

            const data = await response.json();
            setLoading(false);
            const parsedCategories = JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString);
            setCategories(parsedCategories);

            // Select the category and its children based on the categoryId from navigation
            if (categoryId) {
                const selectedCategory = findCategoryById(parsedCategories, categoryId);
                if (selectedCategory) {
                    const descendantIds = getAllDescendantIds(selectedCategory);
                    const selectedCats = [selectedCategory, ...descendantIds.map(id => findCategoryById(parsedCategories, id))];
                    setSelectedCategories(selectedCats);
                }
            }
        } catch (error: any) {
            setLoading(false);
            Alert.alert("Error", error.message);
        }
    }

    const findCategoryById = (categories: any[], id: string): any => {
        for (let category of categories) {
            if (category.id === id) return category;
            if (category.subcategories) {
                const found = findCategoryById(category.subcategories, id);
                if (found) return found;
            }
        }
        return null;
    };

    const getAllDescendantIds = (category: any): string[] => {
        let ids: string[] = [];
        if (category.subcategories) {
            category.subcategories.forEach((subcat: any) => {
                ids.push(subcat.id);
                ids = [...ids, ...getAllDescendantIds(subcat)];
            });
        }
        return ids;
    };

    useEffect(() => {
        GetCategories();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <Image source={require('@/assets/icon.png')} style={styles.loadingImage} />
                        <Text style={styles.loadingText}>We are working on it!</Text>
                    </View>
                ) : (
                    <View style={styles.categoriesContainer}>
                        <View style={styles.categoriesHeader}>
                            <Text style={styles.categoriesTitle}>Select 1 or many services</Text>
                            {/* <TouchableOpacity
                                onPress={() => setSelectedTypeOfView(v => v === 'grid' ? 'list' : 'grid')}
                                style={styles.viewToggle}
                            >
                                <Ionicons name={selectedTypeOfView === 'list' ? 'list' : 'grid'} size={24} color="black" />
                            </TouchableOpacity> */}
                        </View>
                        {categories.map((category: any) => (
                            <RecursiveCategory
                                key={category.id}
                                category={category}
                                selectedCategories={selectedCategories}
                                setSelectedCategories={setSelectedCategories}
                                isTopLevel={true}
                            />
                        ))}
                    </View>
                )}
                <View style={styles.zipCodeContainer}>
                    <Text style={styles.zipCodeText}>Your Zip Code: {zipCode}</Text>
                </View>
                {/* <TouchableOpacity style={styles.nextButton} onPress={handleNextClick}>
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity> */}
            </View>
            {/* <Animated.View style={[styles.modalContainer, animatedModalStyle]}>
                <Modal
                    visible={showModal}
                    transparent={true}
                    animationType="none"
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Additional Information</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Phone"
                            value={phone}
                            onChangeText={setPhone}
                            keyboardType="phone-pad"
                        />
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => setEnableTextMessage(!enableTextMessage)}
                        >
                            <Ionicons
                                name={enableTextMessage ? 'checkbox' : 'square-outline'}
                                size={24}
                                color={enableTextMessage ? '#007AFF' : 'black'}
                            />
                            <Text style={styles.checkboxLabel}>Enable Text Messages</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signupButton}
                            onPress={handleSignup}
                            disabled={Loading}
                        >
                            <Text style={styles.signupButtonText}>
                                {Loading ? 'Signing Up...' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </Animated.View> */}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        padding: 16,
    },
    loadingContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 32,
    },
    loadingImage: {
        width: 100,
        height: 100,
    },
    loadingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 16,
    },
    categoriesContainer: {
        marginTop: 16,
    },
    categoriesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    categoriesTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewToggle: {
        padding: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    selectableCategory: {
        // backgroundColor: '#f9f9f9',
    },
    selectedCategory: {
        // backgroundColor: '#e6f2ff',
    },
    categoryText: {
        fontSize: 18,
        marginLeft: 8,
    },
    selectedCategoryText: {
        // color: '#007AFF',
        fontWeight: 'bold',
    },
    logo: {
        width: 30,
        height: 30,
    },
    expandIcon: {
        marginRight: 8,
    },
    checkboxIcon: {
        marginRight: 8,
    },
    zipCodeContainer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    zipCodeText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    nextButton: {
        marginTop: 16,
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    nextButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
    },
    signupButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        
        borderRadius: 8,
        alignItems: 'center',
    },
    signupButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});