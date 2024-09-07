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


const CategorySelectionPopup = ({
    categories,
    selectedCategories,
    handleCategoryChange,
    open,
    onClose,
    handleGetFilters,
}: any) => {
    const [cat, setCat] = useState<any[]>([]);

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
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
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>{category?.name}</Text>
                            </TouchableOpacity>
                        ))}

                        {/* Other possible matches */}
                        {categories?.slice(1).length > 0 && (
                            <Text style={{ marginTop: 20, marginBottom: 10, fontWeight: 'bold' }}>Other possible matches</Text>
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
                                <Text style={{ marginLeft: 10, fontWeight: 'bold', textTransform: 'capitalize' }}>{category?.name}</Text>
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


// const CategorySelectionPopup = ({ categories, setCategories, selectedCategories, setSelectedCategories, open, handleCategoryChange, onClose, handleGetFilters }: any) => {
//     const [cat, setCat]: any = useState([]);

//     const handleSubmit = () => {
//         handleGetFilters(categories);
//         onClose();
//     };

//     useEffect(() => {
//         if (categories) {
//             handleCategoryChange(categories?.[0]?.id);
//         }
//     }, [categories]);

//     return (
//         open && (
//             <View style={styles.dialogContainer}>
//                 <Text style={styles.dialogTitle}>Based on your search, we think this is the best match</Text>
//                 <ScrollView contentContainerStyle={styles.dialogContent}>
//                     {categories?.[0] && (
//                         <TouchableOpacity
//                             style={styles.categoryContainerSelected}
//                             onPress={() => handleCategoryChange(categories[0]?.id)}
//                         >
//                             <Text style={styles.categoryLabel}>{categories[0]?.name}</Text>
//                         </TouchableOpacity>
//                     )}
//                     {categories?.slice(1)?.length > 0 && (
//                         <Text style={styles.otherMatches}>Other possible matches</Text>
//                     )}
//                     {categories?.slice(1)?.map((category: any, i: number) => (
//                         <TouchableOpacity
//                             key={i}
//                             style={styles.categoryContainer}
//                             onPress={() => handleCategoryChange(category?.id)}
//                         >
//                             <Text style={styles.categoryLabel}>{category?.name}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </ScrollView>
//                 <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                     <Text style={styles.submitButtonText}>CONTINUE</Text>
//                 </TouchableOpacity>
//             </View>
//         )
//     );
// };

const InstantResult = ({ route }: any) => {
    const [filters, setFilters] = useState([]);
    //   const searchParams = useSearchParams();
    // const [selectedFilters, setSelectedFilters] = useState({});
    const [selectedFilters, setSelectedFilters]: any = useState<any>({});
    const { searchCategory, searchZipCode }: any = route.params;

    const [Artisants, setArtisants] = useState([]);
    const [Newcategories, setNewCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [open, setOpen] = useState(false);
    const [openQuiz, setOpenQuiz] = useState(false);
    const [isButtonSearch, setIsButtonSearch] = useState(false);
    //   const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingArtisants, setLoadingArtisants] = useState(false);
    const [category, setCategory]: any = useState(searchCategory || '');
    const [zipCode, setZipCode] = useState(searchZipCode || '');

    const initialCategory = useRef('');
    const initialZipCode = useRef('');
    const hasFetched = useRef(false);
    const [page, setPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [total, setTotal] = useState(0);
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);


    const fetchData = useCallback(async (categoryData: any) => {
        try {
            setLoading(true);
            setNewCategories([]);
            setSelectedCategories([]);
            setFilters([]);
            setSelectedFilters({});
            const response = await fetch(
                `${Constants.expoConfig?.extra?.promptUrl}/prompt?text=${encodeURIComponent(categoryData.text)}&zip_code=${categoryData.zip_code}`
            );
            const data = await response.json();

            if (data?.message) {
                Alert.alert(data.message);
                setLoading(false);
                return;
            }
            // console.log('data', data);

            setLoading(false);
            setNewCategories(data.result);
            setOpen(true);
            setCurrentQuestion(0);


        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    }, []);

    const getCategoryAndZipCode = useCallback(() => {
        const params: any = {
            category: category || '',
            zip_code: zipCode || '',

        };

        console.log('====================================');
        console.log('params', params);
        console.log('====================================');

        // if (params.has('category')) {
        const categoryValue = params.category || '';
        const zipCodeValue = params.zip_code || '';


        if (!hasFetched.current) {
            fetchData({ text: categoryValue, zip_code: zipCodeValue });
            hasFetched.current = true;
        }

        // }
    }, [fetchData]);

    useEffect(() => {
        if (category) {
            getCategoryAndZipCode();
        }
    }, [getCategoryAndZipCode]);

    useEffect(() => {
        if (category !== initialCategory.current || zipCode !== initialZipCode.current) {
            setIsButtonSearch(true);
        } else {
            setIsButtonSearch(false);
        }
    }, [category, zipCode]);

    const handleCategoryChange = (id: any) => {
        // @ts-ignore
        setSelectedCategories([id]);
    };

    const convertObjectToArray = (obj: any) => {
        return Object.keys(obj).map((key) => ({
            filterName: key,
            selectedOption: Array.isArray(obj[key]) ? obj[key] : [obj[key]],
        }));
    };


    const handleGetArtisants = async (value = 1) => {

        const token = await getToken();
        // setUser(user);
        // console.log('====================================');
        // console.log('token', token);
        // console.log('====================================');
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            setLoadingArtisants(true);
            // console.log('====================================');
            const filterArray = convertObjectToArray(selectedFilters);
            // console.log('filterArray', filterArray);
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                                                    mutation getArtisansByFilters(
                            $filters: [FilterInputInfo]
                            $page: Int
                            $limit: Int
                            ) {
                            getArtisansByFilters(filters: $filters, page: $page, limit: $limit) {
                                artisans {
                                id
                                firstName
                                lastName
                                email
                                role
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
                            limit: 10
                        }


                    }),
                }
            );

            const response = await res.json();
            // console.log('response', response);
            setLoadingArtisants(false);
            setArtisants(response.data?.getArtisansByFilters?.artisans);
            setTotalCount(response.data?.getArtisansByFilters?.totalCount);
            setTotal(response.data?.getArtisansByFilters?.total);

        } catch (error) {
            console.log(error);
            setLoadingArtisants(false);
        }
    };

    const handleGetFilters = (data: any) => {
        let allFilters: any = [];
        setFilters([]);
        setArtisants([]);

        // console.log('dataselectedCategories', data, selectedCategories);

        // just get the selected category from data

        data?.forEach((category: any) => {
            // @ts-ignore

            if (selectedCategories.includes(category?.id)) {
                // console.log('category', category);


                allFilters = allFilters.concat(category?.filters);
            }
        });

        setFilters(allFilters);

        setSelectedFilters((prevState: any) => ({
            ...prevState,
            [allFilters[currentQuestion]?.filterName]: allFilters[currentQuestion]?.options[0]?.value
        }));
        setOpenQuiz(true);
    };


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
                        // window.sessionStorage.setItem('search', `category=${category}&zip_code=${zipCode}`);
                        hasFetched.current = false;
                        getCategoryAndZipCode();
                    }}
                    style={{
                        backgroundColor: '#4F46E5',
                        padding: 10,
                        marginLeft: 10,
                        borderRadius: 5,
                    }}
                >
                    <Text style={{
                        color: 'white',
                    }}>{loading ? 'Searching...' : 'SEARCH'}</Text>
                </TouchableOpacity>

            </View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >

                {filters?.length > 0 && (
                    <ViewFilters filters={filters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        handleGetArtisants={handleGetArtisants}
                    />
                )}
            </View>
            {loadingArtisants ? <ActivityIndicator size="large" color="#0000ff" /> : <Results Artisants={Artisants} />}

            <CategorySelectionPopup
                categories={Newcategories}
                setCategories={setNewCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                open={open}
                handleCategoryChange={handleCategoryChange}
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
