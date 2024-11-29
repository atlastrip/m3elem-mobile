import React, { useEffect, useState, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    Alert,
    KeyboardAvoidingView,
    Platform,
    Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import QuizFilters from '@/components/QuizFilters';
import { Results } from '@/components/Results';
import ViewFilters from '@/components/ViewFilters';
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { COLORS } from 'constants/theme';
import CreateNewProject from '@/components/CreateNewProject';

const CategorySelectionPopup = ({
    categories,
    selectedCategories,
    handleCategoryChange,
    open,
    onClose,
    handleGetFilters,
}: any) => {
    const handleSubmit = () => {
        if (selectedCategories.length === 0) {
            Alert.alert('Please select a category.');
            return;
        }
        handleGetFilters(categories);
        onClose();
    };

    if (!open) return null;

    return (
        <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>
                    Based on your search, we think this is the best match
                </Text>
                <FlatList
                    data={categories}
                    keyExtractor={(item) => item?.id?.toString()}
                    renderItem={({ item, index }) => (
                        <View>
                            {index === 1 && (
                                <Text style={styles.otherMatches}>Other possible matches</Text>
                            )}
                            {/* <TouchableOpacity
                                style={index === 0 ? styles.bestMatchCategory : styles.otherCategory}
                                onPress={() => handleCategoryChange(item?.id)}
                            > */}
                            <TouchableOpacity
                                style={index === 0 ? styles.bestMatchCategory : styles.otherCategory}
                                onPress={() => handleCategoryChange(item)} // Pass the entire item here
                            >

                                <Checkbox
                                    value={selectedCategories.includes(item?.id) || false}
                                    onValueChange={() => handleCategoryChange(item?.id)}
                                    color={
                                        selectedCategories.includes(item?.id) ? COLORS.primary : undefined
                                    }
                                />
                                <Text style={styles.categoryText}>{item?.name}</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    style={styles.categoryList}
                    contentContainerStyle={{ flexGrow: 1 }}
                />


                <View style={styles.modalButtonContainer}>
                    <TouchableOpacity onPress={handleSubmit} style={styles.continueButton}>
                        <Text style={styles.continueButtonText}>CONTINUE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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

    const scrollY = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);

    const headerHeight = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [200, 0],
        extrapolate: 'clamp',
    });

    const opacity = scrollY.interpolate({
        inputRange: [0, 200],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    const fetchData = async (categoryData: any, ignoreHistory: any) => {
        try {
            setLoading(true);
            setNewCategories([]);
            setFilters([]);
            setSelectedFilters({});

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
    };

    const getCategoryAndZipCode = async () => {
        const currentCategory = category.trim().toLowerCase();
        const currentZipCode = zipCode.trim();

        const searchKey = `${currentCategory}_${currentZipCode}`;

        let searchCountsData = await AsyncStorage.getItem('searchCounts');
        let searchCounts = searchCountsData ? JSON.parse(searchCountsData) : {};

        const searchTermsChanged = searchKey !== previousSearchKeyRef.current;

        if (searchTermsChanged) {
            searchCounts[searchKey] = 0;
            previousSearchKeyRef.current = searchKey;
        }

        if (searchCounts[searchKey] === undefined) {
            searchCounts[searchKey] = 0;
        }

        searchCounts[searchKey] += 1;
        await AsyncStorage.setItem('searchCounts', JSON.stringify(searchCounts));

        const count = searchCounts[searchKey];
        const isOddCount = count % 2 === 1;

        const newParam = { text: currentCategory, zip_code: currentZipCode };
        const categoriesData = await fetchData(newParam, isOddCount);
        setNewCategories(categoriesData);

        if (isOddCount) {
            if (count !== 0) {
                setOpen(true);
            }
        } else {
            const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
            let selectedCategoriesStore = selectedCategoriesData
                ? JSON.parse(selectedCategoriesData)
                : {};
            const selectedCats = selectedCategoriesStore[searchKey] || [];

            if (selectedCats.length > 0) {
                setSelectedCategories(selectedCats);
                selectedCategoriesRef.current = selectedCats;
            } else {
                if (count !== 0) {
                    setOpen(true);
                }
            }
        }
    };

    const handleSearch = () => {
        if (category && zipCode) {
            // Reset filters and selections
            setFilters([]);
            setSelectedFilters({});
            setSelectedCategories([]);
            selectedCategoriesRef.current = [];
            setCurrentQuestion(0);
            setOpenQuiz(false);
            setOpen(false);

            // Proceed with search
            getCategoryAndZipCode();
        } else {
            Alert.alert('Please enter both category and zip code.');
        }
    };

    // const handleCategoryChange = async (id: any) => {
    //     const updatedSelectedCategories: any = [id];

    //     setSelectedCategories(updatedSelectedCategories);
    //     selectedCategoriesRef.current = updatedSelectedCategories;

    //     try {
    //         const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
    //         const selectedCategoriesStore = selectedCategoriesData
    //             ? JSON.parse(selectedCategoriesData)
    //             : {};

    //         const currentCategory = category.trim().toLowerCase();
    //         const currentZipCode = zipCode.trim();
    //         const searchKey = `${currentCategory}_${currentZipCode}`;

    //         selectedCategoriesStore[searchKey] = updatedSelectedCategories;
    //         await AsyncStorage.setItem('selectedCategoriesStore', JSON.stringify(selectedCategoriesStore));
    //     } catch (error) {
    //         console.error('Error saving selectedCategoriesStore:', error);
    //     }
    // };

    // In InstantResult component
    const handleCategoryChange = async (categoryItem: any) => {
        const updatedSelectedCategories: any = [categoryItem.id];

        setSelectedCategories(updatedSelectedCategories);
        selectedCategoriesRef.current = updatedSelectedCategories;

        // Update the 'category' state with the selected category's name
        setCategory(categoryItem.name);

        try {
            const selectedCategoriesData = await AsyncStorage.getItem('selectedCategoriesStore');
            const selectedCategoriesStore = selectedCategoriesData
                ? JSON.parse(selectedCategoriesData)
                : {};

            const currentCategory = categoryItem.name.trim().toLowerCase(); // Use categoryItem.name here
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
            setArtisants(response?.data?.getArtisansByFilters?.artisans);
        } catch (error: any) {
            console.log('Error:', error.message);
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
                allFilters = allFilters?.concat(category?.filters);
            }
        });

        setFilters(allFilters);
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

    useEffect(() => {
        if (Object.keys(selectedFilters).length > 0) {
            handleGetArtisants();
        }
    }, [selectedFilters]);

    useEffect(() => {
        if (category && zipCode) {
            getCategoryAndZipCode();
        }
    }, []);

    const queryRef = useRef<any>(null);
    const [categoryForAddOrder, setCategoryForAddOrder]: any = useState({});

    const handleScrollToTop = () => {
        flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    };

    const renderItem = ({ item }: any) => {
        if (item.type === 'header') {
            return (
                <Animated.View style={[styles.searchContainer, { height: headerHeight, opacity }]}>
                    <View style={styles.inputContainer}>
                        <Ionicons name="search" size={24} color={COLORS.primary} style={styles.searchIcon} />
                        <TextInput
                            ref={queryRef}
                            value={category}
                            onChangeText={setCategory}
                            placeholder="What are you looking for?"
                            placeholderTextColor="gray"
                            style={styles.searchInput}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Ionicons name="location" size={24} color={COLORS.primary} style={styles.searchIcon} />
                        <TextInput
                            value={zipCode}
                            onChangeText={setZipCode}
                            placeholderTextColor="gray"
                            placeholder="Zipcode"
                            keyboardType="numeric"
                            style={styles.zipInput}
                        />
                    </View>
                    <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.searchButtonText}>SEARCH</Text>
                        )}
                    </TouchableOpacity>
                </Animated.View>
            );
        } else if (item.type === 'filters') {
            return (
                <Animated.View style={{ opacity }}>
                    <ViewFilters
                        filters={filters}
                        selectedFilters={selectedFilters}
                        setSelectedFilters={setSelectedFilters}
                        handleGetArtisants={handleGetArtisants}
                    />
                </Animated.View>
            );
        } else if (item.type === 'results') {
            return loadingArtisants ? (
                <ActivityIndicator size="large" color={COLORS.primary} style={styles.loader} />
            ) : (
                <Results
                    navigation={navigation}
                    Artisants={Artisants}
                    selectedCategories={selectedCategories}
                    title={category}
                />
            );
        }
        return null;
    };

    const data = [
        { type: 'header' },
        ...(filters?.length > 0 && !open ? [{ type: 'filters' }] : []),
        { type: 'results' },
    ];

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <FlatList
                    ref={flatListRef}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                        { useNativeDriver: false }
                    )}
                    scrollEventThrottle={16}
                    contentContainerStyle={styles.scrollContent}
                />

                <CategorySelectionPopup
                    categories={Newcategories}
                    selectedCategories={selectedCategories}
                    handleCategoryChange={handleCategoryChange}
                    open={open}
                    onClose={() => setOpen(false)}
                    handleGetFilters={handleGetFilters}
                />

                {(filters?.length > 0 && !open) && (
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

                <CreateNewProject
                    setLoading={setLoading}
                    category={category}
                    zipCode={zipCode}
                    categoryForAddOrder={categoryForAddOrder}
                    selectedCategories={selectedCategories}
                    queryRef={queryRef}
                    navigation={navigation}
                />

                <TouchableOpacity
                    style={[styles.scrollToTopButton, {
                        opacity: scrollY.interpolate({
                            inputRange: [0, 200],
                            outputRange: [0, 1],
                            extrapolate: 'clamp',
                        })
                    }]}
                    onPress={handleScrollToTop}
                >
                    <Ionicons name="arrow-up" size={24} color="white" />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    searchContainer: {
        marginBottom: 20,
        overflow: 'hidden',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchIcon: {
        padding: 10,
    },
    searchInput: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 10,
        fontSize: 16,
    },
    zipInput: {
        flex: 1,
        paddingVertical: 12,
        paddingRight: 10,
        fontSize: 16,
    },
    searchButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    loader: {
        marginTop: 20,
    },
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        maxHeight: '80%',
    },
    modalTitle: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
    },
    categoryList: {
        marginBottom: 20,
    },
    bestMatchCategory: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        backgroundColor: COLORS.primary + '20',
        borderColor: COLORS.primary,
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
        padding: 15,
        backgroundColor: 'white',
        borderColor: '#e0e0e0',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
    },
    categoryText: {
        marginLeft: 10,
        fontWeight: '600',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    modalButtonContainer: {
        marginTop: 10,
    },
    continueButton: {
        backgroundColor: COLORS.primary,
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
    },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    closeButtonText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: 16,
    },
    scrollToTopButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default InstantResult;
