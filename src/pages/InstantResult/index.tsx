
// import { useRouter, useSearchParams } from 'expo-router'; // Adjust this if you're not using Expo router
// import Results from '@/components/filters/results'; // Keep these components unchanged
// import ViewFilters from '@/components/filters/viewFilters'; // Keep these components unchanged
// import QuizFilters from '@/components/filters/quizeFilters'; // Keep these components unchanged

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



// const CategorySelectionPopup = ({
//     categories,
//     selectedCategories,
//     handleCategoryChange,
//     open,
//     onClose,
//     handleGetFilters,
// }: any) => {
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
//             <View
//                 style={{
//                     flex: 1,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                 }}
//             >
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
//                                 <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>
//                                     {category?.name}
//                                 </Text>
//                             </TouchableOpacity>
//                         ))}

//                         {/* Other possible matches */}
//                         {categories?.slice(1).length > 0 && (
//                             <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>
//                                 Other possible matches
//                             </Text>
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
//                                 <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>
//                                     {category?.name}
//                                 </Text>
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

//             console.log('Retrieved selectedCategories from AsyncStorage:', selectedCats);

//             if (selectedCats.length > 0) {
//                 setSelectedCategories(selectedCats);
//                 selectedCategoriesRef.current = selectedCats;
//                 // State is updated, use useEffect to proceed
//             } else {
//                 // No selected categories, need to show modal
//                 setOpen(true);
//             }
//         }
//     }, [fetchData, category, zipCode]);




//   useEffect(() => {
//     if (category && zipCode) {
//       getCategoryAndZipCode();
//     }
//   }, [getCategoryAndZipCode]);



//     const handleCategoryChange = async (id: any) => {
//         const updatedSelectedCategories: any = [id];

//         setSelectedCategories(updatedSelectedCategories);
//         selectedCategoriesRef.current = updatedSelectedCategories;

//         // Store selectedCategories in AsyncStorage
//         try {
//             const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
//             const selectedCategoriesStore = selectedCategoriesData
//                 ? JSON.parse(selectedCategoriesData)
//                 : {};
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
//             console.log('selectedCategories', selectedCategories);
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
//                   artisans {
//                     id
//                     firstName
//                     lastName
//                     email
//                     role
//                     available
//                     phone
//                     reviews {
//                       id
//                       description
//                       rating
//                       owner {
//                         id
//                         firstName
//                         lastName
//                         imageProfile
//                       }
//                       reviewer {
//                         id
//                         firstName
//                         lastName
//                         imageProfile
//                       }
//                       createdAt
//                     }
//                     imageProfile
//                     filters {
//                       filterName
//                       selectedOption
//                     }
//                     aboutYou
//                     adress
//                   }
//                   total
//                   currentPage
//                   totalPages
//                 }
//               }
//             `,
//                     variables: {
//                         filters: filterArray,
//                         page: value,
//                         limit: 10,
//                         zipCode: zipCode,
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

//         setOpenQuiz(true);

//         if (Object.keys(allFilters).length === 0) {
//             handleGetArtisants();
//         }
//     };

//     // Synchronize selectedCategoriesRef with selectedCategories
//     // useEffect(() => {
//     //     selectedCategoriesRef.current = selectedCategories;
//     // }, [selectedCategories]);

//     useEffect(() => {
//         if (selectedCategories.length > 0 && !open) {
//           const currentCategory = category.trim().toLowerCase();
//             console.log('currentCategory', currentCategory);
            
//           (async () => {
//             // Retrieve filters from AsyncStorage
//             const filtersData = await AsyncStorage.getItem('filtersStore');
//             let filtersStore = filtersData ? JSON.parse(filtersData) : {};
//             const storedFilters = filtersStore[currentCategory] || [];
    
//             if (storedFilters.length > 0) {
//               setFilters(storedFilters);
//               setOpenQuiz(true);
    
//               if (storedFilters.length === 0) {
//                 handleGetArtisants();
//               }
//             } else {
//               // Build filters
//               let allFilters: any = [];
//               setFilters([]);
//               setArtisants([]);
    
//               Newcategories?.forEach((category: any) => {
//                 // @ts-ignore
//                 if (selectedCategories.includes(category?.id)) {
//                   allFilters = allFilters.concat(category?.filters);
//                 }
//               });
    
//               setFilters(allFilters);
//               setOpenQuiz(true);
    
//               if (allFilters.length === 0) {
//                 handleGetArtisants();
//               }
//             }
//           })();
//         }
//       }, [selectedCategories]);

//     // Ensure handleGetArtisants is called when filters change
//     useEffect(() => {
//         if (Object.keys(selectedFilters).length > 0) {
//             handleGetArtisants();
//         }
//     }, [selectedFilters]);

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



// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 20,
//     },
//     searchContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 20,
//     },
//     searchInput: {
//         flex: 1,
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//     },
//     zipInput: {
//         width: 100,
//         padding: 10,
//         marginLeft: 10,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//     },
//     searchButton: {
//         backgroundColor: '#4F46E5',
//         padding: 10,
//         marginLeft: 10,
//         borderRadius: 5,
//     },
//     searchButtonText: {
//         color: 'white',
//     },
//     dialogContainer: {
//         backgroundColor: 'white',
//         padding: 20,
//         borderRadius: 10,
//     },
//     dialogTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         textAlign: 'center',
//     },
//     dialogContent: {
//         marginTop: 20,
//     },
//     categoryContainer: {
//         padding: 10,
//         borderWidth: 1,
//         borderColor: '#ddd',
//         borderRadius: 5,
//         marginBottom: 10,
//     },
//     categoryContainerSelected: {
//         padding: 10,
//         backgroundColor: '#4F46E5',
//         borderRadius: 5,
//         marginBottom: 10,
//     },
//     categoryLabel: {
//         color: 'white',
//     },
//     submitButton: {
//         backgroundColor: '#4F46E5',
//         padding: 10,
//         marginTop: 10,
//         borderRadius: 5,
//     },
//     submitButtonText: {
//         color: 'white',
//         textAlign: 'center',
//     },
//     otherMatches: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
// });

// export default InstantResult;



import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Button,
    Modal,
    ActivityIndicator,
    StyleSheet,
    Alert,
} from 'react-native';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QuizFilters from '@/components/QuizFilters';
import { Results } from '@/components/Results';
import ViewFilters from '@/components/ViewFilters';
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';

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
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>
                        Based on your search, we think this is the best match
                    </Text>

                    <ScrollView style={{ marginTop: 20 }}>
                        {/* First Category (best match) */}
                        {[categories?.[0]]?.map((category: any, i: any) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.bestMatchCategory}
                                onPress={() => handleCategoryChange(category?.id)}
                            >
                                <Checkbox
                                    value={selectedCategories.includes(category?.id) || false}
                                    onValueChange={() => handleCategoryChange(category?.id)}
                                />
                                <Text style={styles.categoryText}>{category?.name}</Text>
                            </TouchableOpacity>
                        ))}

                        {/* Other possible matches */}
                        {categories?.slice(1).length > 0 && (
                            <Text style={styles.otherMatches}>Other possible matches</Text>
                        )}

                        {categories?.slice(1).map((category: any, i: any) => (
                            <TouchableOpacity
                                key={i}
                                style={styles.otherCategory}
                                onPress={() => handleCategoryChange(category?.id)}
                            >
                                <Checkbox
                                    value={selectedCategories.includes(category?.id) || false}
                                    onValueChange={() => handleCategoryChange(category?.id)}
                                />
                                <Text style={styles.categoryText}>{category?.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {/* Continue button */}
                    <View style={{ marginTop: 20 }}>
                        <TouchableOpacity onPress={handleSubmit} style={styles.continueButton}>
                            <Text style={styles.continueButtonText}>CONTINUE</Text>
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

    const fetchData = async (categoryData: any) => {
        try {
            setLoading(true);
            setNewCategories([]);
            setFilters([]);
            setSelectedFilters({});

            const response = await fetch(
                `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(
                    categoryData.text
                )}&zip_code=${categoryData.zip_code}`
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
    };

    const getCategoryAndZipCode = async () => {
        const currentCategory = category.trim().toLowerCase();
        const currentZipCode = zipCode.trim();

        const searchKey = `${currentCategory}_${currentZipCode}`;

        // Retrieve searchCounts from AsyncStorage
        let searchCountsData = await AsyncStorage.getItem('searchCounts');
        let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

        // Check if search terms have changed
        const searchTermsChanged = searchKey !== previousSearchKeyRef.current;

        if (searchTermsChanged) {
            // Reset the count for this searchKey
            searchCounts[searchKey] = 0;
            // Update previousSearchKeyRef
            previousSearchKeyRef.current = searchKey;
        }

        // Initialize count for this searchKey if undefined
        if (searchCounts[searchKey] === undefined) {
            searchCounts[searchKey] = 0;
        }

        // Increment the count
        searchCounts[searchKey] += 1;
        await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

        const count = searchCounts[searchKey];
        const isOddCount = count % 2 === 1;

        // Fetch categories data
        const newParam = { text: currentCategory, zip_code: currentZipCode };
        const categoriesData = await fetchData(newParam);
        setNewCategories(categoriesData);

        if (isOddCount) {
            // Show popup
            setOpen(true);
        } else {
            // Proceed without popup
            // Retrieve selectedCategories from AsyncStorage
            const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
            let selectedCategoriesStore = selectedCategoriesData
                ? JSON.parse(selectedCategoriesData)
                : {};
            const selectedCats = selectedCategoriesStore[searchKey] || [];

            if (selectedCats.length > 0) {
                setSelectedCategories(selectedCats);
                selectedCategoriesRef.current = selectedCats;
                // Proceed to get filters and artisans
            } else {
                // No selected categories, need to show popup
                setOpen(true);
            }
        }
    };

    const handleSearch = () => {
        if (category && zipCode) {
            getCategoryAndZipCode();
        } else {
            Alert.alert('Please enter both category and zip code.');
        }
    };

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

            const currentCategory = category.trim().toLowerCase();
            const currentZipCode = zipCode.trim();
            const searchKey = `${currentCategory}_${currentZipCode}`;

            selectedCategoriesStore[searchKey] = updatedSelectedCategories;
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

            const currentCategory = category.trim().toLowerCase();
            const currentZipCode = zipCode.trim();
            const searchKey = `${currentCategory}_${currentZipCode}`;

            filtersStore[searchKey] = allFilters;
            await AsyncStorage.setItem('filtersStore', JSON.stringify(filtersStore));
        } catch (error) {
            console.error('Error saving filtersStore:', error);
        }

        setOpenQuiz(true);

        if (Object.keys(allFilters).length === 0) {
            handleGetArtisants();
        }
    };

    useEffect(() => {
        if (selectedCategories.length > 0 && !open) {
            const currentCategory = category.trim().toLowerCase();
            const currentZipCode = zipCode.trim();
            const searchKey = `${currentCategory}_${currentZipCode}`;

            (async () => {
                // Retrieve filters from AsyncStorage
                const filtersData = await AsyncStorage.getItem('filtersStore');
                let filtersStore = filtersData ? JSON.parse(filtersData) : {};
                const storedFilters = filtersStore[searchKey] || [];

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
    }, [selectedCategories, open]);

    // Ensure handleGetArtisants is called when filters change
    useEffect(() => {
        if (Object.keys(selectedFilters).length > 0) {
            handleGetArtisants();
        }
    }, [selectedFilters]);

    // Automatically perform search on initial page load
    useEffect(() => {
        if (category && zipCode) {
            getCategoryAndZipCode();
        }
    }, []); // Empty dependency array ensures this runs once on component mount

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
                <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
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
        backgroundColor: '#f0f2f5',
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
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    zipInput: {
        width: 100,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    searchButton: {
        backgroundColor: '#4F46E5',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
    },
    bestMatchCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#e3f2fd',
        borderColor: '#1976d2',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 10,
    },
    otherMatches: {
        marginTop: 20,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    otherCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        borderColor: '#bbdefb',
        borderWidth: 2,
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryText: {
        marginLeft: 10,
        fontWeight: 'bold',
        textTransform: 'capitalize',
    },
    continueButton: {
        backgroundColor: '#1976d2',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default InstantResult;
