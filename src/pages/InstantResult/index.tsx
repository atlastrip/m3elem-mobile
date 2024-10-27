import QuizFilters from '@/components/QuizFilters';
import { Results } from '@/components/Results';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Button, Modal, ActivityIndicator, FlatList, StyleSheet, Alert } from 'react-native';
import Checkbox from 'expo-checkbox';
import { getToken } from '@/helpers/getToken';
// import { useRouter, useSearchParams } from 'expo-router'; // Adjust this if you're not using Expo router
// import Results from '@/components/filters/results'; // Keep these components unchanged
// import ViewFilters from '@/components/filters/viewFilters'; // Keep these components unchanged
// import QuizFilters from '@/components/filters/quizeFilters'; // Keep these components unchanged
import Constants from 'expo-constants';
import ViewFilters from '@/components/ViewFilters';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const CategorySelectionPopup = ({
//     categories,
//     selectedCategories,
//     handleCategoryChange,
//     open,
//     onClose,
//     handleGetFilters,
// }: any) => {
//     const [cat, setCat] = useState<any[]>([]);

//     const handleSubmit = () => {
//         handleGetFilters(categories);
//         onClose(); // Close the modal after submission
//     };

//     useEffect(() => {
//         if (categories) {
//             handleCategoryChange(categories?.[0]?.id);
//         }
//     }, [categories]);

//     return (
//         <Modal visible={open} transparent={true} animationType="slide" onRequestClose={onClose}>
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
//                 <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
//                     <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
//                         Based on your search, we think this is the best match
//                     </Text>

//                     <ScrollView style={{ marginTop: 20 }}>
//                         {/* First Category (best match) */}
//                         {[categories?.[0]]?.map((category: any, i: any) => (
//                             <TouchableOpacity
//                                 key={i}
//                                 style={{
//                                     flexDirection: 'row',
//                                     alignItems: 'center',
//                                     padding: 10,
//                                     backgroundColor: '#e3f2fd',
//                                     borderColor: '#1976d2',
//                                     borderWidth: 2,
//                                     borderRadius: 8,
//                                     marginBottom: 10,
//                                 }}
//                                 onPress={() => handleCategoryChange(category?.id)}
//                             >
//                                 <Checkbox
//                                     value={selectedCategories.includes(category?.id) || false}
//                                     onValueChange={() => handleCategoryChange(category?.id)}
//                                 />
//                                 <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>{category?.name}</Text>
//                             </TouchableOpacity>
//                         ))}

//                         {/* Other possible matches */}
//                         {categories?.slice(1).length > 0 && (
//                             <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>Other possible matches</Text>
//                         )}

//                         {categories?.slice(1).map((category: any, i: any) => (
//                             <TouchableOpacity
//                                 key={i}
//                                 style={{
//                                     flexDirection: 'row',
//                                     alignItems: 'center',
//                                     padding: 10,
//                                     backgroundColor: 'white',
//                                     borderColor: '#bbdefb',
//                                     borderWidth: 2,
//                                     borderRadius: 8,
//                                     marginBottom: 10,
//                                 }}
//                                 onPress={() => handleCategoryChange(category?.id)}
//                             >
//                                 <Checkbox
//                                     value={selectedCategories.includes(category?.id) || false}
//                                     onValueChange={() => handleCategoryChange(category?.id)}
//                                 />
//                                 <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>{category?.name}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </ScrollView>

//                     {/* Continue button */}
//                     <View style={{ marginTop: 20 }}>
//                         <TouchableOpacity
//                             onPress={handleSubmit}
//                             style={{
//                                 backgroundColor: '#1976d2',
//                                 padding: 12,
//                                 borderRadius: 8,
//                                 alignItems: 'center',
//                             }}
//                         >
//                             <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>CONTINUE</Text>
//                         </TouchableOpacity>
//                     </View>

//                     {/* Close button */}
//                     <View style={{ marginTop: 10 }}>
//                         <Button title="Close" onPress={onClose} />
//                     </View>
//                 </View>
//             </View>
//         </Modal>
//     );
// };




// const InstantResult = ({ route, navigation }: any) => {
//     const [filters, setFilters] = useState([]);
//     const [selectedFilters, setSelectedFilters]: any = useState<any>({});
//     const { searchCategory, searchZipCode }: any = route.params;

//     const [Artisants, setArtisants] = useState([]);
//     const [Newcategories, setNewCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [categoryForAddOrder, setCategoryForAddOrder] = useState({});
//     const [open, setOpen] = useState(false);
//     const [openQuiz, setOpenQuiz] = useState(false);
//     const [loading, setLoading] = useState(false);
//     const [loadingArtisants, setLoadingArtisants] = useState(false);
//     const [category, setCategory]: any = useState(searchCategory || '');
//     const [zipCode, setZipCode] = useState(searchZipCode || '');

//     const previousSearchKeyRef = useRef('');
//     const selectedCategoriesRef = useRef([]);
//     const [currentQuestion, setCurrentQuestion] = useState<number>(0);

//     const fetchData = useCallback(async (categoryData: any, ignoreHistory: boolean) => {
//         try {
//             setLoading(true);
//             setNewCategories([]);
//             setSelectedCategories([]);
//             setFilters([]);
//             setSelectedFilters({});
//             console.log('ignoreHistory', ignoreHistory);

//             const response = await fetch(
//                 `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(
//                     categoryData.text
//                 )}&zip_code=${categoryData.zip_code}&ignoreHistory=${ignoreHistory}`
//             );


//             const data = await response.json();

//             if (data?.message) {
//                 Alert.alert(data.message);
//                 setLoading(false);
//                 return;
//             }

//             setLoading(false);
//             return data.result;
//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     }, []);

//     // const getCategoryAndZipCode = useCallback(async () => {
//     //     const currentCategory = category.trim().toLowerCase();
//     //     const currentZipCode = zipCode.trim();

//     //     const searchKey = `${currentCategory}_${currentZipCode}`;

//     //     // Now retrieve searchCounts from AsyncStorage
//     //     let searchCountsData = await AsyncStorage.getItem('searchCounts');
//     //     let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

//     //     // If the search term or zip code has changed, reset the count for this searchKey
//     //     const previousSearchKey = previousSearchKeyRef.current;
//     //     if (searchKey !== previousSearchKey) {
//     //         searchCounts[searchKey] = 0;
//     //     }

//     //     let count = searchCounts[searchKey] || 0;
//     //     count += 1;
//     //     searchCounts[searchKey] = count;
//     //     await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

//     //     // Update previousSearchKeyRef
//     //     previousSearchKeyRef.current = searchKey;

//     //     const isOddCount = count % 2 === 1;

//     //     const newParam = { text: currentCategory, zip_code: currentZipCode };

//     //     const categoriesData = await fetchData(newParam, isOddCount);
//     //     setNewCategories(categoriesData);

//     //     if (isOddCount) {
//     //         setOpen(true);
//     //     } else {
//     //         // Proceed without modal
//     //         // Retrieve selectedCategories from AsyncStorage
//     //         const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
//     //         let selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
//     //         const selectedCats = selectedCategoriesStore[currentCategory] || [];

//     //         if (selectedCats.length > 0) {
//     //             setSelectedCategories(selectedCats);
//     //             selectedCategoriesRef.current = selectedCats;

//     //             // Retrieve filters from AsyncStorage
//     //             const filtersData = await AsyncStorage.getItem('filtersStore');
//     //             let filtersStore = filtersData ? JSON.parse(filtersData) : {};
//     //             const storedFilters = filtersStore[currentCategory] || [];

//     //             if (storedFilters.length > 0) {
//     //                 setFilters(storedFilters);
//     //                 setOpenQuiz(true);

//     //                 if (Object.keys(storedFilters).length === 0) {
//     //                     handleGetArtisants();
//     //                 }
//     //             } else {
//     //                 // Build filters
//     //                 let allFilters: any = [];
//     //                 setFilters([]);
//     //                 setArtisants([]);

//     //                 categoriesData?.forEach((category: any) => {
//     //                     if (selectedCats.includes(category?.id)) {
//     //                         allFilters = allFilters.concat(category?.filters);
//     //                     }
//     //                 });

//     //                 setFilters(allFilters);
//     //                 setOpenQuiz(true);

//     //                 if (Object.keys(allFilters).length === 0) {
//     //                     handleGetArtisants();
//     //                 }
//     //             }
//     //         } else {
//     //             // No selected categories, need to show modal
//     //             setOpen(true);
//     //         }
//     //     }
//     // }, [fetchData, category, zipCode]);
//     const getCategoryAndZipCode = useCallback(async () => {
//         const currentCategory = category.trim().toLowerCase();
//         const currentZipCode = zipCode.trim();

//         const searchKey = `${currentCategory}_${currentZipCode}`;

//         // Retrieve searchCounts from AsyncStorage
//         let searchCountsData = await AsyncStorage.getItem('searchCounts');
//         let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

//         // Initialize count for this searchKey if undefined
//         if (searchCounts[searchKey] === undefined) {
//             searchCounts[searchKey] = 0;
//         }

//         // Increment the count
//         searchCounts[searchKey] += 1;
//         await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

//         const count = searchCounts[searchKey];

//         const isOddCount = count % 2 === 1;

//         // Adjust ignoreHistory based on count
//         const ignoreHistory = !isOddCount;

//         const newParam = { text: currentCategory, zip_code: currentZipCode };

//         const categoriesData = await fetchData(newParam, ignoreHistory);
//         setNewCategories(categoriesData);

//         if (isOddCount) {
//             setOpen(true); // Show category popup
//         } else {
//             // Proceed without modal
//             // Retrieve selectedCategories from AsyncStorage
//             const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
//             let selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
//             const selectedCats = selectedCategoriesStore[currentCategory] || [];

//             if (selectedCats.length > 0) {
//                 setSelectedCategories(selectedCats);
//                 selectedCategoriesRef.current = selectedCats;

//                 // Retrieve filters from AsyncStorage
//                 const filtersData = await AsyncStorage.getItem('filtersStore');
//                 let filtersStore = filtersData ? JSON.parse(filtersData) : {};
//                 const storedFilters = filtersStore[currentCategory] || [];

//                 if (storedFilters.length > 0) {
//                     setFilters(storedFilters);
//                     setOpenQuiz(true);

//                     if (Object.keys(storedFilters).length === 0) {
//                         handleGetArtisants();
//                     }
//                 } else {
//                     // Build filters
//                     let allFilters: any = [];
//                     setFilters([]);
//                     setArtisants([]);

//                     categoriesData?.forEach((category: any) => {
//                         if (selectedCats.includes(category?.id)) {
//                             allFilters = allFilters.concat(category?.filters);
//                         }
//                     });

//                     setFilters(allFilters);
//                     setOpenQuiz(true);

//                     if (Object.keys(allFilters).length === 0) {
//                         handleGetArtisants();
//                     }
//                 }
//             } else {
//                 // No selected categories, need to show modal
//                 setOpen(true);
//             }
//         }
//     }, [fetchData, category, zipCode]);


//     useEffect(() => {
//         if (category && zipCode) {
//             getCategoryAndZipCode();
//         }
//     }, [getCategoryAndZipCode]);

//     // const handleCategoryChange = (id: any) => {
//     //     // @ts-ignore
//     //     setSelectedCategories([id]);
//     //     // @ts-ignore
//     //     selectedCategoriesRef.current = [id];
//     // };

//     const handleCategoryChange = async (id: any) => {
//         const updatedSelectedCategories: any = [id];

//         setSelectedCategories(updatedSelectedCategories);
//         selectedCategoriesRef.current = updatedSelectedCategories;

//         // Store selectedCategories in AsyncStorage
//         try {
//             const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
//             const selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
//             selectedCategoriesStore[category.trim().toLowerCase()] = updatedSelectedCategories;
//             await AsyncStorage.setItem('selectedCategoriesStore', JSON.stringify(selectedCategoriesStore));
//         } catch (error) {
//             console.error('Error saving selectedCategoriesStore:', error);
//         }
//     };


//     const convertObjectToArray = (obj: any) => {
//         return Object.keys(obj).map((key) => ({
//             filterName: key,
//             selectedOption: Array.isArray(obj[key]) ? obj[key] : [obj[key]],
//         }));
//     };

//     const handleGetArtisants = async (value = 1) => {
//         const token = await getToken();
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append('Content-Type', 'application/json');
//         headers.append('Authorization', `Bearer ${token}`);
//         try {
//             setLoadingArtisants(true);
//             console.log('selectedCategoriesRef.current[0]', selectedCategoriesRef.current[0]);
//             const filterArray = convertObjectToArray(selectedFilters);
//             const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//               mutation getArtisansByFilters(
//                 $filters: [FilterInputInfo]
//                 $page: Int
//                 $limit: Int
//                 $zipCode: String
//                 $categoryId: String
//               ) {
//                 getArtisansByFilters(
//                   filters: $filters,
//                   page: $page,
//                   limit: $limit,
//                   zipCode: $zipCode,
//                   categoryId: $categoryId
//                 ) {
//                     artisans {
//                         id
//                         firstName
//                         lastName
//                         email
//                         role
//                         available
//                         phone
//                         reviews {
//                             id
//                             description
//                             rating
//                             owner {
//                             id
//                             firstName
//                             lastName
//                             imageProfile
//                             }
//                             reviewer {
//                             id
//                             firstName
//                             lastName
//                             imageProfile
//                             }

//                             createdAt
//                         }
//                         imageProfile
//                         filters {
//                             filterName
//                             selectedOption
//                         }
//                         aboutYou
//                         adress
//                         }
//                         total
//                         currentPage
//                         totalPages
//                 }
//               }
//             `,
//                     variables: {
//                         filters: filterArray,
//                         page: value,
//                         limit: 10,
//                         zipCode: zipCode,
//                         // categoryId: selectedCategoriesRef.current[0],
//                         categoryId: selectedCategories[0],

//                     },
//                 }),
//             });

//             const response = await res.json();
//             setLoadingArtisants(false);
//             setArtisants(response.data?.getArtisansByFilters?.artisans);
//         } catch (error) {
//             console.log(error);
//             setLoadingArtisants(false);
//         }
//     };

//     // const handleGetFilters = async (data: any) => {
//     //     let allFilters: any = [];
//     //     setFilters([]);
//     //     setArtisants([]);

//     //     data?.forEach((category: any) => {
//     //         // @ts-ignore
//     //         if (selectedCategories.includes(category?.id)) {
//     //             allFilters = allFilters.concat(category?.filters);
//     //         }
//     //     });

//     //     setFilters(allFilters);

//     //     // Store filters in AsyncStorage
//     //     try {
//     //         const filtersStoreData = await AsyncStorage.getItem('filtersStore');
//     //         const filtersStore = filtersStoreData ? JSON.parse(filtersStoreData) : {};
//     //         filtersStore[category] = allFilters;
//     //         await AsyncStorage.setItem('filtersStore', JSON.stringify(filtersStore));
//     //     } catch (error) {
//     //         console.error('Error saving filtersStore:', error);
//     //     }

//     //     setOpenQuiz(true);

//     //     if (Object.keys(allFilters).length === 0) {
//     //         handleGetArtisants();
//     //     }
//     // };

//     const handleGetFilters = async (data: any) => {
//         let allFilters: any = [];
//         setFilters([]);
//         setArtisants([]);

//         data?.forEach((category: any) => {
//             // @ts-ignore
//             if (selectedCategories.includes(category?.id)) {
//                 allFilters = allFilters.concat(category?.filters);
//             }
//         });

//         setFilters(allFilters);

//         // Store filters in AsyncStorage
//         try {
//             const filtersStoreData = await AsyncStorage.getItem('filtersStore');
//             const filtersStore = filtersStoreData ? JSON.parse(filtersStoreData) : {};
//             filtersStore[category.trim().toLowerCase()] = allFilters;
//             await AsyncStorage.setItem('filtersStore', JSON.stringify(filtersStore));
//         } catch (error) {
//             console.error('Error saving filtersStore:', error);
//         }

//         // // Store selectedCategories in AsyncStorage
//         // try {
//         //     const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
//         //     const selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
//         //     selectedCategoriesStore[category.trim().toLowerCase()] = selectedCategories;
//         //     await AsyncStorage.setItem('selectedCategoriesStore', JSON.stringify(selectedCategoriesStore));
//         // } catch (error) {
//         //     console.error('Error saving selectedCategoriesStore:', error);
//         // }

//         setOpenQuiz(true);

//         if (Object.keys(allFilters).length === 0) {
//             handleGetArtisants();
//         }
//     };


//     // Ensure handleGetArtisants is called when filters change
//     useEffect(() => {
//         if (Object.keys(selectedFilters).length > 0) {
//             handleGetArtisants();
//         }
//     }, [selectedFilters]);


//     useEffect(() => {
//         selectedCategoriesRef.current = selectedCategories;
//     }, [selectedCategories]);

//     return (
//         <View style={styles.container}>
//             <View style={styles.searchContainer}>
//                 <TextInput
//                     value={category}
//                     onChangeText={setCategory}
//                     placeholder="What are you looking for?"
//                     style={styles.searchInput}
//                 />
//                 <TextInput
//                     value={zipCode}
//                     onChangeText={setZipCode}
//                     placeholder="Zipcode"
//                     keyboardType="numeric"
//                     style={styles.zipInput}
//                 />
//                 <TouchableOpacity
//                     onPress={() => {
//                         getCategoryAndZipCode();
//                     }}
//                     style={styles.searchButton}
//                 >
//                     <Text style={styles.searchButtonText}>{loading ? 'Searching...' : 'SEARCH'}</Text>
//                 </TouchableOpacity>
//             </View>

//             {filters?.length > 0 && (
//                 <ViewFilters
//                     filters={filters}
//                     selectedFilters={selectedFilters}
//                     setSelectedFilters={setSelectedFilters}
//                     handleGetArtisants={handleGetArtisants}
//                 />
//             )}

//             {loadingArtisants ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : (
//                 <Results
//                     navigation={navigation}
//                     Artisants={Artisants}
//                     selectedCategories={selectedCategories}
//                     title={category}
//                 />
//             )}

//             <CategorySelectionPopup
//                 categories={Newcategories}
//                 selectedCategories={selectedCategories}
//                 handleCategoryChange={handleCategoryChange}
//                 open={open}
//                 onClose={() => setOpen(false)}
//                 handleGetFilters={handleGetFilters}
//             />

//             {filters?.length > 0 && (
//                 <QuizFilters
//                     open={openQuiz}
//                     handleGetArtisants={handleGetArtisants}
//                     setOpen={setOpenQuiz}
//                     filters={filters}
//                     selectedFilters={selectedFilters}
//                     setSelectedFilters={setSelectedFilters}
//                     currentQuestion={currentQuestion}
//                     setCurrentQuestion={setCurrentQuestion}
//                 />
//             )}
//         </View>
//     );
// };



const CategorySelectionPopup = ({
    categories,
    selectedCategories,
    handleCategoryChange,
    open,
    onClose,
    handleGetFilters,
}: any) => {
    const handleSubmit = () => {
        handleGetFilters(categories);
        onClose(); // Close the modal after submission
    };

    useEffect(() => {
        if (categories) {
            handleCategoryChange(categories?.[0]?.id);
        }
    }, [categories]);

    return (
        <Modal visible={open} transparent={true} animationType="slide" onRequestClose={onClose}>
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                }}
            >
                <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 18 }}>
                        Based on your search, we think this is the best match
                    </Text>

                    <ScrollView style={{ marginTop: 20 }}>
                        {/* First Category (best match) */}
                        {[categories?.[0]]?.map((category: any, i: any) => (
                            <TouchableOpacity
                                key={i}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 10,
                                    backgroundColor: '#e3f2fd',
                                    borderColor: '#1976d2',
                                    borderWidth: 2,
                                    borderRadius: 8,
                                    marginBottom: 10,
                                }}
                                onPress={() => handleCategoryChange(category?.id)}
                            >
                                <Checkbox
                                    value={selectedCategories.includes(category?.id) || false}
                                    onValueChange={() => handleCategoryChange(category?.id)}
                                />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {category?.name}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        {/* Other possible matches */}
                        {categories?.slice(1).length > 0 && (
                            <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
                                Other possible matches
                            </Text>
                        )}

                        {categories?.slice(1).map((category: any, i: any) => (
                            <TouchableOpacity
                                key={i}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    padding: 10,
                                    backgroundColor: 'white',
                                    borderColor: '#bbdefb',
                                    borderWidth: 2,
                                    borderRadius: 8,
                                    marginBottom: 10,
                                }}
                                onPress={() => handleCategoryChange(category?.id)}
                            >
                                <Checkbox
                                    value={selectedCategories.includes(category?.id) || false}
                                    onValueChange={() => handleCategoryChange(category?.id)}
                                />
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>
                                    {category?.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Continue button */}
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity
                            onPress={handleSubmit}
                            style={{
                                backgroundColor: '#1976d2',
                                padding: 12,
                                borderRadius: 8,
                                alignItems: 'center',
                            }}
                        >
                            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>CONTINUE</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Close button */}
                    <View style={{ marginTop: 10 }}>
                        <Button title="Close" onPress={onClose} />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const InstantResult = ({ route, navigation }: any) => {
    const [filters, setFilters] = useState([]);
    const [selectedFilters, setSelectedFilters]: any = useState<any>({});
    const { searchCategory, searchZipCode }: any = route.params;

    const [Artisants, setArtisants] = useState([]);
    const [Newcategories, setNewCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [openQuiz, setOpenQuiz] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingArtisants, setLoadingArtisants] = useState(false);
    const [category, setCategory]: any = useState(searchCategory || '');
    const [zipCode, setZipCode] = useState(searchZipCode || '');

    const previousSearchKeyRef = useRef('');
    const selectedCategoriesRef = useRef([]);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);

    // const fetchData = useCallback(async (categoryData: any, ignoreHistory: boolean) => {
    //     try {
    //         setLoading(true);
    //         setNewCategories([]);
    //         // setSelectedCategories([]); // Do not reset selectedCategories here
    //         setFilters([]);
    //         setSelectedFilters({});
    //         console.log('ignoreHistory', ignoreHistory);

    //         const response = await fetch(
    //             `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(
    //                 categoryData.text
    //             )}&zip_code=${categoryData.zip_code}&ignoreHistory=${ignoreHistory}`
    //         );

    //         const data = await response.json();

    //         if (data?.message) {
    //             Alert.alert(data.message);
    //             setLoading(false);
    //             return;
    //         }

    //         setLoading(false);
    //         return data.result;
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setLoading(false);
    //     }
    // }, []);


    const fetchData = useCallback(async (categoryData: any, ignoreHistory: boolean) => {
        try {
            setLoading(true);
            setNewCategories([]);
            setFilters([]);
            setSelectedFilters({});
            console.log('ignoreHistory', ignoreHistory);

            const response = await fetch(
                `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(
                    categoryData.text
                )}&zip_code=${categoryData.zip_code}&ignoreHistory=${ignoreHistory}`
            );

            const data = await response.json();

            if (data?.message) {
                Alert.alert(data.message);
                setLoading(false);
                return;
            }

            setLoading(false);
            return data.result;
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, []);


    // const getCategoryAndZipCode = useCallback(async () => {
    //     const currentCategory = category.trim().toLowerCase();
    //     const currentZipCode = zipCode.trim();

    //     const searchKey = `${currentCategory}_${currentZipCode}`;

    //     // Retrieve searchCounts from AsyncStorage
    //     let searchCountsData = await AsyncStorage.getItem('searchCounts');
    //     let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

    //     // Initialize count for this searchKey if undefined
    //     if (searchCounts[searchKey] === undefined) {
    //         searchCounts[searchKey] = 0;
    //     }

    //     // Increment the count
    //     searchCounts[searchKey] += 1;
    //     await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

    //     const count = searchCounts[searchKey];

    //     const isOddCount = count % 2 === 1;

    //     // Adjust ignoreHistory based on count
    //     const ignoreHistory = !isOddCount;

    //     const newParam = { text: currentCategory, zip_code: currentZipCode };

    //     const categoriesData = await fetchData(newParam, ignoreHistory);
    //     setNewCategories(categoriesData);

    //     if (isOddCount) {
    //         setOpen(true); // Show category popup
    //     } else {
    //         // Proceed without modal
    //         // Retrieve selectedCategories from AsyncStorage
    //         const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
    //         let selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
    //         const selectedCats = selectedCategoriesStore[currentCategory] || [];

    //         if (selectedCats.length > 0) {
    //             setSelectedCategories(selectedCats);
    //             selectedCategoriesRef.current = selectedCats;

    //             // Retrieve filters from AsyncStorage
    //             const filtersData = await AsyncStorage.getItem('filtersStore');
    //             let filtersStore = filtersData ? JSON.parse(filtersData) : {};
    //             const storedFilters = filtersStore[currentCategory] || [];

    //             if (storedFilters.length > 0) {
    //                 setFilters(storedFilters);
    //                 setOpenQuiz(true);

    //                 if (Object.keys(storedFilters).length === 0) {
    //                     handleGetArtisants();
    //                 }
    //             } else {
    //                 // Build filters
    //                 let allFilters: any = [];
    //                 setFilters([]);
    //                 setArtisants([]);

    //                 categoriesData?.forEach((category: any) => {
    //                     if (selectedCats.includes(category?.id)) {
    //                         allFilters = allFilters.concat(category?.filters);
    //                     }
    //                 });

    //                 setFilters(allFilters);
    //                 setOpenQuiz(true);

    //                 if (Object.keys(allFilters).length === 0) {
    //                     handleGetArtisants();
    //                 }
    //             }
    //         } else {
    //             // No selected categories, need to show modal
    //             setOpen(true);
    //         }
    //     }
    // }, [fetchData, category, zipCode]);

    const getCategoryAndZipCode = useCallback(async () => {
        const currentCategory = category.trim().toLowerCase();
        const currentZipCode = zipCode.trim();

        const searchKey = `${currentCategory}_${currentZipCode}`;

        // Retrieve searchCounts from AsyncStorage
        let searchCountsData = await AsyncStorage.getItem('searchCounts');
        let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

        // Initialize count for this searchKey if undefined
        if (searchCounts[searchKey] === undefined) {
            searchCounts[searchKey] = 0;
        }

        // Increment the count
        searchCounts[searchKey] += 1;
        await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

        const count = searchCounts[searchKey];

        const isOddCount = count % 2 === 1;

        // Adjust ignoreHistory based on count
        const ignoreHistory = !isOddCount;

        const newParam = { text: currentCategory, zip_code: currentZipCode };

        const categoriesData = await fetchData(newParam, ignoreHistory);
        setNewCategories(categoriesData);

        if (isOddCount) {
            setOpen(true); // Show category popup
        } else {
            // Proceed without modal
            // Retrieve selectedCategories from AsyncStorage
            const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
            let selectedCategoriesStore = selectedCategoriesData ? JSON.parse(selectedCategoriesData) : {};
            const selectedCats = selectedCategoriesStore[currentCategory] || [];

            console.log('Retrieved selectedCategories from AsyncStorage:', selectedCats);

            if (selectedCats.length > 0) {
                setSelectedCategories(selectedCats);
                selectedCategoriesRef.current = selectedCats;
                // State is updated, use useEffect to proceed
            } else {
                // No selected categories, need to show modal
                setOpen(true);
            }
        }
    }, [fetchData, category, zipCode]);




  useEffect(() => {
    if (category && zipCode) {
      getCategoryAndZipCode();
    }
  }, [getCategoryAndZipCode]);



    const handleCategoryChange = async (id: any) => {
        const updatedSelectedCategories: any = [id];

        setSelectedCategories(updatedSelectedCategories);
        selectedCategoriesRef.current = updatedSelectedCategories;

        // Store selectedCategories in AsyncStorage
        try {
            const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
            const selectedCategoriesStore = selectedCategoriesData
                ? JSON.parse(selectedCategoriesData)
                : {};
            selectedCategoriesStore[category.trim().toLowerCase()] = updatedSelectedCategories;
            await AsyncStorage.setItem('selectedCategoriesStore', JSON.stringify(selectedCategoriesStore));
        } catch (error) {
            console.error('Error saving selectedCategoriesStore:', error);
        }
    };

    const convertObjectToArray = (obj: any) => {
        return Object.keys(obj).map((key) => ({
            filterName: key,
            selectedOption: Array.isArray(obj[key]) ? obj[key] : [obj[key]],
        }));
    };

    const handleGetArtisants = async (value = 1) => {
        const token = await getToken();
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Authorization', `Bearer ${token}`);
        try {
            setLoadingArtisants(true);
            console.log('selectedCategories', selectedCategories);
            const filterArray = convertObjectToArray(selectedFilters);
            const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
              mutation getArtisansByFilters(
                $filters: [FilterInputInfo]
                $page: Int
                $limit: Int
                $zipCode: String
                $categoryId: String
              ) {
                getArtisansByFilters(
                  filters: $filters,
                  page: $page,
                  limit: $limit,
                  zipCode: $zipCode,
                  categoryId: $categoryId
                ) {
                  artisans {
                    id
                    firstName
                    lastName
                    email
                    role
                    available
                    phone
                    reviews {
                      id
                      description
                      rating
                      owner {
                        id
                        firstName
                        lastName
                        imageProfile
                      }
                      reviewer {
                        id
                        firstName
                        lastName
                        imageProfile
                      }
                      createdAt
                    }
                    imageProfile
                    filters {
                      filterName
                      selectedOption
                    }
                    aboutYou
                    adress
                  }
                  total
                  currentPage
                  totalPages
                }
              }
            `,
                    variables: {
                        filters: filterArray,
                        page: value,
                        limit: 10,
                        zipCode: zipCode,
                        categoryId: selectedCategories[0],
                    },
                }),
            });

            const response = await res.json();
            setLoadingArtisants(false);
            setArtisants(response.data?.getArtisansByFilters?.artisans);
        } catch (error) {
            console.log(error);
            setLoadingArtisants(false);
        }
    };

    const handleGetFilters = async (data: any) => {
        let allFilters: any = [];
        setFilters([]);
        setArtisants([]);

        data?.forEach((category: any) => {
            // @ts-ignore
            if (selectedCategories.includes(category?.id)) {
                allFilters = allFilters.concat(category?.filters);
            }
        });

        setFilters(allFilters);

        // Store filters in AsyncStorage
        try {
            const filtersStoreData = await AsyncStorage.getItem('filtersStore');
            const filtersStore = filtersStoreData ? JSON.parse(filtersStoreData) : {};
            filtersStore[category.trim().toLowerCase()] = allFilters;
            await AsyncStorage.setItem('filtersStore', JSON.stringify(filtersStore));
        } catch (error) {
            console.error('Error saving filtersStore:', error);
        }

        setOpenQuiz(true);

        if (Object.keys(allFilters).length === 0) {
            handleGetArtisants();
        }
    };

    // Synchronize selectedCategoriesRef with selectedCategories
    // useEffect(() => {
    //     selectedCategoriesRef.current = selectedCategories;
    // }, [selectedCategories]);

    useEffect(() => {
        if (selectedCategories.length > 0 && !open) {
          const currentCategory = category.trim().toLowerCase();
            console.log('currentCategory', currentCategory);
            
          (async () => {
            // Retrieve filters from AsyncStorage
            const filtersData = await AsyncStorage.getItem('filtersStore');
            let filtersStore = filtersData ? JSON.parse(filtersData) : {};
            const storedFilters = filtersStore[currentCategory] || [];
    
            if (storedFilters.length > 0) {
              setFilters(storedFilters);
              setOpenQuiz(true);
    
              if (storedFilters.length === 0) {
                handleGetArtisants();
              }
            } else {
              // Build filters
              let allFilters: any = [];
              setFilters([]);
              setArtisants([]);
    
              Newcategories?.forEach((category: any) => {
                // @ts-ignore
                if (selectedCategories.includes(category?.id)) {
                  allFilters = allFilters.concat(category?.filters);
                }
              });
    
              setFilters(allFilters);
              setOpenQuiz(true);
    
              if (allFilters.length === 0) {
                handleGetArtisants();
              }
            }
          })();
        }
      }, [selectedCategories]);

    // Ensure handleGetArtisants is called when filters change
    useEffect(() => {
        if (Object.keys(selectedFilters).length > 0) {
            handleGetArtisants();
        }
    }, [selectedFilters]);

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="What are you looking for?"
                    style={styles.searchInput}
                />
                <TextInput
                    value={zipCode}
                    onChangeText={setZipCode}
                    placeholder="Zipcode"
                    keyboardType="numeric"
                    style={styles.zipInput}
                />
                <TouchableOpacity
                    onPress={() => {
                        getCategoryAndZipCode();
                    }}
                    style={styles.searchButton}
                >
                    <Text style={styles.searchButtonText}>{loading ? 'Searching...' : 'SEARCH'}</Text>
                </TouchableOpacity>
            </View>

            {filters?.length > 0 && (
                <ViewFilters
                    filters={filters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    handleGetArtisants={handleGetArtisants}
                />
            )}

            {loadingArtisants ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Results
                    navigation={navigation}
                    Artisants={Artisants}
                    selectedCategories={selectedCategories}
                    title={category}
                />
            )}

            <CategorySelectionPopup
                categories={Newcategories}
                selectedCategories={selectedCategories}
                handleCategoryChange={handleCategoryChange}
                open={open}
                onClose={() => setOpen(false)}
                handleGetFilters={handleGetFilters}
            />

            {filters?.length > 0 && (
                <QuizFilters
                    open={openQuiz}
                    handleGetArtisants={handleGetArtisants}
                    setOpen={setOpenQuiz}
                    filters={filters}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    currentQuestion={currentQuestion}
                    setCurrentQuestion={setCurrentQuestion}
                />
            )}
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchInput: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    zipInput: {
        width: 100,
        padding: 10,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
    },
    searchButton: {
        backgroundColor: '#4F46E5',
        padding: 10,
        marginLeft: 10,
        borderRadius: 5,
    },
    searchButtonText: {
        color: 'white',
    },
    dialogContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    dialogTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    dialogContent: {
        marginTop: 20,
    },
    categoryContainer: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
    },
    categoryContainerSelected: {
        padding: 10,
        backgroundColor: '#4F46E5',
        borderRadius: 5,
        marginBottom: 10,
    },
    categoryLabel: {
        color: 'white',
    },
    submitButton: {
        backgroundColor: '#4F46E5',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    submitButtonText: {
        color: 'white',
        textAlign: 'center',
    },
    otherMatches: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default InstantResult;

























// const InstantResult = ({ route, navigation }: any) => {
//     const [filters, setFilters] = useState([]);
//     //   const searchParams = useSearchParams();
//     // const [selectedFilters, setSelectedFilters] = useState({});
//     const [selectedFilters, setSelectedFilters]: any = useState<any>({});
//     const { searchCategory, searchZipCode }: any = route.params;

//     const [Artisants, setArtisants] = useState([]);
//     const [Newcategories, setNewCategories] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [open, setOpen] = useState(false);
//     const [openQuiz, setOpenQuiz] = useState(false);
//     const [isButtonSearch, setIsButtonSearch] = useState(false);
//     //   const router = useRouter();
//     const [loading, setLoading] = useState(false);
//     const [loadingArtisants, setLoadingArtisants] = useState(false);
//     const [category, setCategory]: any = useState(searchCategory || '');
//     const [zipCode, setZipCode] = useState(searchZipCode || '');

//     const initialCategory = useRef('');
//     const initialZipCode = useRef('');
//     const hasFetched = useRef(false);
//     const [page, setPage] = useState(1);
//     const [totalCount, setTotalCount] = useState(0);
//     const [total, setTotal] = useState(0);
//     const [currentQuestion, setCurrentQuestion] = useState<number>(0);


//     const fetchData = useCallback(async (categoryData: any) => {
//         try {
//             setLoading(true);
//             setNewCategories([]);
//             setSelectedCategories([]);
//             setFilters([]);
//             setSelectedFilters({});
//             const response = await fetch(
//                 `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(categoryData.text)}&zip_code=${categoryData.zip_code}`
//             );
//             const data = await response.json();

//             if (data?.message) {
//                 Alert.alert(data.message);
//                 setLoading(false);
//                 return;
//             }
//             // console.log('data', data);

//             setLoading(false);
//             setNewCategories(data.result);
//             setOpen(true);
//             setCurrentQuestion(0);


//         } catch (error) {
//             console.error('Error fetching data:', error);
//             setLoading(false);
//         }
//     }, []);

//     const getCategoryAndZipCode = useCallback(() => {
//         const params: any = {
//             category: category || '',
//             zip_code: zipCode || '',

//         };

//         console.log('====================================');
//         console.log('params', params);
//         console.log('====================================');

//         // if (params.has('category')) {
//         const categoryValue = params.category || '';
//         const zipCodeValue = params.zip_code || '';


//         if (!hasFetched.current) {
//             fetchData({ text: categoryValue, zip_code: zipCodeValue });
//             hasFetched.current = true;
//         }

//         // }
//     }, [fetchData]);

//     useEffect(() => {
//         if (category) {
//             getCategoryAndZipCode();
//         }
//     }, [getCategoryAndZipCode]);

//     useEffect(() => {
//         if (category !== initialCategory.current || zipCode !== initialZipCode.current) {
//             setIsButtonSearch(true);
//         } else {
//             setIsButtonSearch(false);
//         }
//     }, [category, zipCode]);

//     const handleCategoryChange = (id: any) => {
//         // @ts-ignore
//         setSelectedCategories([id]);
//     };

//     const convertObjectToArray = (obj: any) => {
//         return Object.keys(obj).map((key) => ({
//             filterName: key,
//             selectedOption: Array.isArray(obj[key]) ? obj[key] : [obj[key]],
//         }));
//     };


//     const handleGetArtisants = async (value = 1) => {

//         const token = await getToken();
//         // setUser(user);
//         // console.log('====================================');
//         // console.log('token', token);
//         // console.log('====================================');
//         if (!token) {
//             return;
//         }
//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);
//         try {
//             setLoadingArtisants(true);
//             console.log('selectedCategories', selectedCategories);

//             // console.log('====================================');
//             const filterArray = convertObjectToArray(selectedFilters);
//             // console.log('filterArray', filterArray);
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                                                     mutation getArtisansByFilters(
//                             $filters: [FilterInputInfo]
//                             $page: Int
//                             $limit: Int
//                             $zipCode: String
//                             $categoryId: String
//                             ) {
//                             getArtisansByFilters(filters: $filters, page: $page, limit: $limit, zipCode: $zipCode, categoryId: $categoryId

//                                 ) {
//                                 artisans {
//                                 id
//                                 firstName
//                                 lastName
//                                 email
//                                 role
//                                 reviews {
//                                     id
//                                     description
//                                     rating
//                                     owner {
//                                     id
//                                     firstName
//                                     lastName
//                                     imageProfile
//                                     }
//                                     reviewer {
//                                     id
//                                     firstName
//                                     lastName
//                                     imageProfile
//                                     }

//                                     createdAt
//                                 }
//                                 imageProfile
//                                 filters {
//                                     filterName
//                                     selectedOption
//                                 }
//                                 aboutYou
//                                 adress
//                                 }
//                                 total
//                                 currentPage
//                                 totalPages
//                             }
//                             }

//                             `,
//                         variables: {
//                             filters: filterArray,
//                             page: value,
//                             limit: 10,
//                             zipCode:zipCode,
//                             categoryId: selectedCategories[0],
//                         }


//                     }),
//                 }
//             );

//             const response = await res.json();
//             // console.log('response', response);
//             setLoadingArtisants(false);
//             setArtisants(response.data?.getArtisansByFilters?.artisans);
//             setTotalCount(response.data?.getArtisansByFilters?.totalCount);
//             setTotal(response.data?.getArtisansByFilters?.total);

//         } catch (error) {
//             console.log(error);
//             setLoadingArtisants(false);
//         }
//     };

//     const handleGetFilters = (data: any) => {
//         let allFilters: any = [];
//         setFilters([]);
//         setArtisants([]);

//         // console.log('dataselectedCategories', data, selectedCategories);

//         // just get the selected category from data

//         data?.forEach((category: any) => {
//             // @ts-ignore

//             if (selectedCategories.includes(category?.id)) {
//                 // console.log('category', category);


//                 allFilters = allFilters.concat(category?.filters);
//             }
//         });

//         setFilters(allFilters);

//         setSelectedFilters((prevState: any) => ({
//             ...prevState,
//             [allFilters[currentQuestion]?.filterName]: allFilters[currentQuestion]?.options[0]?.value
//         }));
//         setOpenQuiz(true);
//     };


//     return (
//         <View style={styles.container}>
//             <View style={styles.searchContainer}>
//                 <TextInput
//                     value={category}
//                     onChangeText={setCategory}
//                     placeholder="What are you looking for?"
//                     style={styles.searchInput}
//                 />
//                 <TextInput
//                     value={zipCode}
//                     onChangeText={setZipCode}
//                     placeholder="Zipcode"
//                     keyboardType="numeric"
//                     style={styles.zipInput}
//                 />
//                 <TouchableOpacity
//                     onPress={() => {
//                         // window.sessionStorage.setItem('search', `category=${category}&zip_code=${zipCode}`);
//                         hasFetched.current = false;
//                         getCategoryAndZipCode();
//                     }}
//                     style={{
//                         backgroundColor: '#4F46E5',
//                         padding: 10,
//                         marginLeft: 10,
//                         borderRadius: 5,
//                     }}
//                 >
//                     <Text style={{
//                         color: 'white',
//                     }}>{loading ? 'Searching...' : 'SEARCH'}</Text>
//                 </TouchableOpacity>

//             </View>
//             <View
//                 style={{
//                     flexDirection: 'row',
//                     justifyContent: 'space-between',
//                     alignItems: 'center',
//                 }}
//             >

//                 {filters?.length > 0 && (
//                     <ViewFilters filters={filters}
//                         selectedFilters={selectedFilters}
//                         setSelectedFilters={setSelectedFilters}
//                         handleGetArtisants={handleGetArtisants}
//                     />
//                 )}
//             </View>
//             {loadingArtisants ? <ActivityIndicator size="large" color="#0000ff" /> : <Results
//                 navigation={navigation}
//                 Artisants={Artisants}
//                 selectedCategories={selectedCategories}
//                 title={category}
//             />}

//             <CategorySelectionPopup
//                 categories={Newcategories}
//                 setCategories={setNewCategories}
//                 selectedCategories={selectedCategories}
//                 setSelectedCategories={setSelectedCategories}
//                 open={open}
//                 handleCategoryChange={handleCategoryChange}
//                 onClose={() => setOpen(false)}
//                 handleGetFilters={handleGetFilters}
//             />
//             {filters?.length > 0 && (
//                 <QuizFilters
//                     open={openQuiz}
//                     handleGetArtisants={handleGetArtisants}
//                     setOpen={setOpenQuiz}
//                     filters={filters}
//                     selectedFilters={selectedFilters}
//                     setSelectedFilters={setSelectedFilters}
//                     currentQuestion={currentQuestion}
//                     setCurrentQuestion={setCurrentQuestion}
//                 />
//             )}


//         </View>
//     );
// };
