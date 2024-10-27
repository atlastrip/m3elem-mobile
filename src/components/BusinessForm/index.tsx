// import React, { useState, useEffect, useCallback } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, FlatList, Modal, StyleSheet } from 'react-native';
// import { Alert } from 'react-native';
// import tw from 'twrnc';



// export const NewfetchAddressSuggestions = async (input: any, zipCode = '') => {
//     if (!input) {
//         Alert.alert("Error", "No input provided");
//         return [];
//     }

//     try {
//         const authId = '7a47c71c-3fbe-0616-0436-25e403929f51';
//         const authToken = 'CiES7AJmoRjsLhVJbBzR';
//         const maxResults = 5; // Set the maximum number of results


//         // Define the API endpoint
//         const url = `https://us-autocomplete-pro.api.smarty.com/lookup?auth-id=${authId}&auth-token=${authToken}&search=${encodeURIComponent(input)}&max-results=${maxResults}&zipcode=${encodeURIComponent(zipCode)}`;

//         const response = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//         });

//         // if (!response.ok) {
//         //     throw new Error('Failed to fetch address suggestions');
//         // }

//         const data = await response.json();
//         console.log('data', data);

//         // Map the response data to the format needed in your React Native app
//         const formattedResults = data.suggestions.map((suggestion: any) => ({
//             streetLine: suggestion.street_line || suggestion.text,
//             city: suggestion.city || suggestion.entries[0]?.city,
//             state: suggestion.state || suggestion.entries[0]?.state,
//             zipcode: suggestion.zipcode || suggestion.entries[0]?.zipcode,
//             country: 'USA', // Since SmartyStreets only provides US addresses
//         }));

//         return formattedResults;
//     } catch (error: any) {
//         console.log('API Error:', error.message);
//         Alert.alert("Error", "Failed to fetch address suggestions");
//         return [];
//     }
// };



// const useDebounce = (value: any, delay: any) => {
//     const [debouncedValue, setDebouncedValue] = useState(value);

//     useEffect(() => {
//         const handler = setTimeout(() => setDebouncedValue(value), delay);
//         return () => clearTimeout(handler);
//     }, [value, delay]);

//     return debouncedValue;
// };

// const BusinessForm = ({ formState, setFormState }: any) => {
//     const [suggestions, setSuggestions] = useState([]);
//     const [selectedSuggestion, setSelectedSuggestion] = useState(null);
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
//     const debouncedStreet = useDebounce(formState.street, 800);
//     const [modalVisible, setModalVisible] = useState(false);

//     const handleInputChange = (name: any, value: any) => {
//         setFormState((prevState: any) => ({
//             ...prevState,
//             [name]: value,
//         }));
//         setSelectedSuggestion(null);
//     };

//     const fetchAddressSuggestions = useCallback(async (street: any, zipCode: any) => {
//         if (!street.trim()) return;
//         setLoading(true);
//         setError(null);

//         try {
//             // const response = await fetch(`/api/autocomplete?input=${encodeURIComponent(street)}`);
//             const res: any = await NewfetchAddressSuggestions(street, zipCode);
//             console.log('====================================');
//             console.log('res', res);
//             console.log('====================================');
//             // const data = await response.json();
//             setSuggestions(res.length ? res : []);
//         } catch (err: any) {
//             setError(err.message || 'An unexpected error occurred.');
//             setSuggestions([]);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (debouncedStreet && !selectedSuggestion) fetchAddressSuggestions(debouncedStreet, formState?.zipCode);
//     }, [debouncedStreet, fetchAddressSuggestions, selectedSuggestion]);

//     const handleSuggestionClick = (suggestion: any) => {
//         setFormState((prevState: any) => ({
//             ...prevState,
//             street: suggestion.streetLine,
//             city: suggestion.city,
//             state: suggestion.state,
//             zipCode: suggestion.zipcode,
//         }));
//         setSelectedSuggestion(suggestion);
//         setSuggestions([]);
//     };

//     return (
//         <View style={tw`p-4 bg-white rounded-lg`}>
//             <Text style={tw`text-lg font-bold mb-4`}>Business Form</Text>

//             <Text style={tw`text-sm text-gray-700 mb-1`}>Business Name</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. Nora's Kitchen"
//                 value={formState.businessName}
//                 onChangeText={(text) => handleInputChange('businessName', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Year Founded</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. 2002"
//                 value={formState.yearFounded}
//                 onChangeText={(text) => handleInputChange('yearFounded', text)}
//                 keyboardType="numeric"
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Number of Employees</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="e.g. 5"
//                 value={formState.numberOfEmployees}
//                 onChangeText={(text) => handleInputChange('numberOfEmployees', text)}
//                 keyboardType="numeric"
//             />

//             {/* <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Street</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 placeholder="Enter street"
//                 value={formState.street}
//                 onChangeText={(text) => handleInputChange('street', text)}
//             /> */}

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Street</Text>
//             <View style={styles.inputContainer}>
//                 <TextInput
//                     style={tw`border border-gray-300 p-3 rounded-md flex-1`}
//                     placeholder="Enter street"
//                     value={formState.street}
//                     onChangeText={(text) => handleInputChange('street', text)}
//                     onFocus={() => {
//                         if (suggestions.length > 0) setModalVisible(true);
//                     }}
//                 />
//                 {loading && <ActivityIndicator style={tw`ml-2`} size="small" color="blue" />}
//             </View>
//             {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>}
//             {/* {loading && <ActivityIndicator style={tw`mt-2`} size="small" color="blue" />} */}
//             {/* {suggestions.length > 0 && (
//                     <FlatList
//                         data={suggestions}
//                         keyExtractor={(item, index) => index.toString()}
//                         renderItem={({ item }: any) => (
//                             <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={tw`p-2`}>
//                                 <Text>{`${item.streetLine}, ${item.city}, ${item.state}, ${item.country}`}</Text>
//                             </TouchableOpacity>
//                         )}
//                         style={tw`mt-2 border border-gray-300 rounded-md max-h-48`}
//                     />
//             )} */}

//             {/* Modal for Suggestions */}
//             <Modal
//                 visible={modalVisible}
//                 transparent
//                 animationType="slide"
//                 onRequestClose={() => setModalVisible(false)}
//             >
//                 <TouchableOpacity style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
//                     <View style={styles.modalContent}>
//                         <FlatList
//                             data={suggestions}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={({ item }: any) => (
//                                 <TouchableOpacity onPress={() => handleSuggestionClick(item)} style={tw`p-2`}>
//                                     <Text>{`${item.streetLine}, ${item.city}, ${item.state}, ${item.country}`}</Text>
//                                 </TouchableOpacity>
//                             )}
//                         />
//                     </View>
//                 </TouchableOpacity>
//             </Modal>
//             {/* {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>} */}

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>City</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.city}
//                 onChangeText={(text) => handleInputChange('city', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>State</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.state}
//                 onChangeText={(text) => handleInputChange('state', text)}
//             />

//             <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>ZIP Code</Text>
//             <TextInput
//                 style={tw`border border-gray-300 p-3 rounded-md`}
//                 value={formState.zipCode}
//                 onChangeText={(text) => handleInputChange('zipCode', text)}
//                 keyboardType="numeric"
//             />

//             {/* <TouchableOpacity
//                 style={tw`mt-6 bg-blue-600 p-3 rounded-md`}
//                 onPress={() => console.log("Form submitted:", formState)}
//             >
//                 <Text style={tw`text-center text-white font-bold`}>Save Profile</Text>
//             </TouchableOpacity> */}
//         </View>
//     );
// };


// const styles = StyleSheet.create({
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     modalOverlay: {
//         flex: 1,
//         backgroundColor: 'rgba(0,0,0,0.5)',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     modalContent: {
//         width: '80%',
//         backgroundColor: 'white',
//         borderRadius: 8,
//         maxHeight: 300,
//     },
// });

// export default BusinessForm;


// BusinessForm.tsx


import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    FlatList,
    StyleSheet,
    Alert,
    Modal,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import tw from 'twrnc';

// Fetch address suggestions from SmartyStreets API
export const NewfetchAddressSuggestions = async (input: string, zipCode = ''): Promise<any[]> => {
    if (!input) {
        Alert.alert("Error", "No input provided");
        return [];
    }

    try {
        const authId = '7a47c71c-3fbe-0616-0436-25e403929f51';
        const authToken = 'CiES7AJmoRjsLhVJbBzR';
        const maxResults = 5; // Set the maximum number of results

        // Define the API endpoint
        const url = `https://us-autocomplete-pro.api.smarty.com/lookup?auth-id=${authId}&auth-token=${authToken}&search=${encodeURIComponent(input)}&max-results=${maxResults}&zipcode=${encodeURIComponent(zipCode)}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch address suggestions');
        }

        const data = await response.json();
        console.log('data', data);

        // Map the response data to the format needed in your React Native app
        const formattedResults = data.suggestions.map((suggestion: any) => ({
            streetLine: suggestion.street_line || suggestion.text,
            city: suggestion.city || suggestion.entries[0]?.city,
            state: suggestion.state || suggestion.entries[0]?.state,
            zipcode: suggestion.zipcode || suggestion.entries[0]?.zipcode,
            country: 'USA', // Since SmartyStreets only provides US addresses
        }));

        return formattedResults;
    } catch (error: any) {
        console.log('API Error:', error.message);
        Alert.alert("Error", "Failed to fetch address suggestions");
        return [];
    }
};

// Custom hook for debouncing input values
const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);

    return debouncedValue;
};

interface BusinessFormProps {
    formState: any;
    setFormState: (state: any) => void;
}

const BusinessForm: React.FC<any> = ({
    NewFormState,
    setNewFormState
}: any) => {
    const [formState, setFormState] = useState<any>(NewFormState);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const debouncedStreet = useDebounce(formState.street, 800);
    const isFirstRun = useRef(true);

    // Handle input changes
    const handleInputChange = (name: string, value: string) => {
        setFormState((prevState: any) => ({
            ...prevState,
            [name]: value,
        }));
        setSelectedSuggestion(null);
        if (name === 'street') {
            setSuggestions([]);
        }
    };

    // Fetch address suggestions based on street and zip code
    const fetchAddressSuggestions = useCallback(async (street: string, zipCode: string) => {
        if (!street.trim()) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const res = await NewfetchAddressSuggestions(street, zipCode);
            setSuggestions(res.length ? res : []);
            if (res.length > 0) {
                setModalVisible(true);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Fetch suggestions when debouncedStreet changes
    useEffect(() => {

        if (isFirstRun.current) {
            isFirstRun.current = false;
            console.log('Initial render - skipping fetchAddressSuggestions');
            return;
        }
        if (debouncedStreet && !selectedSuggestion) {
            fetchAddressSuggestions(debouncedStreet, formState?.zipCode);
        }
    }, [debouncedStreet, fetchAddressSuggestions, selectedSuggestion]);

    // Handle suggestion selection
    const handleSuggestionClick = (suggestion: any) => {
        setFormState((prevState: any) => ({
            ...prevState,
            street: suggestion.streetLine,
            city: suggestion.city,
            state: suggestion.state,
            zipCode: suggestion.zipcode,
        }));
        setNewFormState((prevState: any) => ({
            ...prevState,
            street: suggestion.streetLine,
            city: suggestion.city,
            state: suggestion.state,
            zipCode: suggestion.zipcode,
        }));
        setSelectedSuggestion(suggestion);
        setSuggestions([]);
        setModalVisible(false);
        Keyboard.dismiss(); // Dismiss the keyboard after selection
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`p-4 bg-white rounded-lg flex-1`}>
                <Text style={tw`text-lg font-bold mb-4`}>Business Form</Text>

                {/* Business Name */}
                <Text style={tw`text-sm text-gray-700 mb-1`}>Business Name</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="e.g. Nora's Kitchen"
                    value={formState.businessName}
                    onChangeText={(text) => handleInputChange('businessName', text)}
                />

                {/* Year Founded */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Year Founded</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="e.g. 2002"
                    value={formState.yearFounded}
                    onChangeText={(text) => handleInputChange('yearFounded', text)}
                    keyboardType="numeric"
                />

                {/* Number of Employees */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Number of Employees</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="e.g. 5"
                    value={formState.numberOfEmployees}
                    onChangeText={(text) => handleInputChange('numberOfEmployees', text)}
                    keyboardType="numeric"
                />

                {/* Street */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Street</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={tw`border border-gray-300 p-3 rounded-md flex-1`}
                        placeholder="Enter street"
                        value={formState.street}
                        onChangeText={(text) => handleInputChange('street', text)}
                        onFocus={() => {
                            if (suggestions.length > 0) {
                                setModalVisible(true);
                            }
                        }}
                    />
                    {loading && <ActivityIndicator style={tw`ml-2`} size="small" color="blue" />}
                </View>

                {/* Modal for Suggestions */}
                <Modal
                    visible={modalVisible}
                    transparent
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                        <View style={styles.modalOverlay}>
                            <TouchableWithoutFeedback>
                                <View style={styles.modalContent}>
                                    <View style={tw`flex-row justify-between items-center mb-2`}>
                                        <Text style={tw`text-lg font-semibold`}>Select Address</Text>
                                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                                            <Text style={tw`text-blue-500 text-lg`}>Close</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <FlatList
                                        data={suggestions}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <TouchableOpacity
                                                onPress={() => handleSuggestionClick(item)}
                                                style={tw`p-3 border-b border-gray-200`}
                                            >
                                                <Text style={tw`text-gray-800`}>
                                                    {`${item.streetLine}, ${item.city}, ${item.state}, ${item.zipcode}`}
                                                </Text>
                                            </TouchableOpacity>
                                        )}
                                        ListEmptyComponent={
                                            <Text style={tw`text-center text-gray-500 p-4`}>
                                                No address found.
                                            </Text>
                                        }
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>

                {/* Error Message */}
                {error && <Text style={tw`text-red-500 mt-2`}>{error}</Text>}

                {/* City */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>City</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    value={formState.city}
                    onChangeText={(text) => handleInputChange('city', text)}
                />

                {/* State */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>State</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    value={formState.state}
                    onChangeText={(text) => handleInputChange('state', text)}
                />

                {/* ZIP Code */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>ZIP Code</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    value={formState.zipCode}
                    onChangeText={(text) => handleInputChange('zipCode', text)}
                    keyboardType="numeric"
                />

                {/* Save Profile Button */}
                {/* <TouchableOpacity
                    style={tw`mt-6 bg-blue-600 p-3 rounded-md`}
                    onPress={() => {
                        console.log("Form submitted:", formState);
                        Alert.alert("Success", "Profile saved successfully!");
                    }}
                >
                    <Text style={tw`text-center text-white font-bold`}>Save Profile</Text>
                </TouchableOpacity> */}
            </View>
        </TouchableWithoutFeedback>
    );

};

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        padding: 20,
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: '80%',
        padding: 20,
    },
});

export default BusinessForm;







