// AddressAutocomplete.tsx

import React, { useState, useEffect, useCallback } from 'react';
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
// import Icons from "@vector"
import { Feather } from "@expo/vector-icons";
import { Motion } from '@legendapp/motion';


// Debounce hook to limit API calls
const useDebounce = (value: string, delay: number): string => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

interface Suggestion {
    streetLine: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

interface AddressAutocompleteProps {
    NewzipCode: string;
    setNewZipCode: (zip: string) => void;
    NewselectedSuggestion: Suggestion | null;
    setNewSelectedSuggestion: (suggestion: Suggestion | null) => void;
}

// Function to fetch address suggestions from SmartyStreets API
const NewfetchAddressSuggestions = async (input: string, zipCode: string = ''): Promise<Suggestion[]> => {
    if (!input) {
        Alert.alert("Error", "No input provided");
        return [];
    }

    try {
        const authId = '7a47c71c-3fbe-0616-0436-25e403929f51'; // Replace with your actual auth ID
        const authToken = 'CiES7AJmoRjsLhVJbBzR'; // Replace with your actual auth token
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
        console.log('SmartyStreets API Data:', data);

        // Map the response data to the format needed in your React Native app
        const formattedResults: Suggestion[] = data.suggestions.map((suggestion: any) => ({
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

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
    NewzipCode,
    setNewZipCode,
    NewselectedSuggestion,
    setNewSelectedSuggestion,
}) => {
    const [query, setQuery] = useState<string>(NewselectedSuggestion?.streetLine || '');
    const [city, setCity] = useState<string>(NewselectedSuggestion?.city || '');
    const [state, setState] = useState<string>(NewselectedSuggestion?.state || '');
    const [zipCode, setZipCode] = useState<string>(NewzipCode || NewselectedSuggestion?.zipcode || '');
    const [country, setCountry] = useState<string>(NewselectedSuggestion?.country || ''); // Adding country field
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [selectedSuggestion, setSelectedSuggestionState] = useState<Suggestion | null>(NewselectedSuggestion || null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const debouncedInput = useDebounce(query, 800);

    // Fetch address suggestions based on street input
    const fetchAddressDetails = useCallback(async (street: string, zip: string) => {
        if (!street.trim()) {
            setSuggestions([]);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await NewfetchAddressSuggestions(street, zip);
            if (data.length > 0) {
                setSuggestions(data);
                setModalVisible(true);
            } else {
                setError('No results found.');
                setSuggestions([]);
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    }, []);

    // Trigger fetch when the debounced street value changes
    useEffect(() => {
        if (debouncedInput && !selectedSuggestion) {
            fetchAddressDetails(debouncedInput, zipCode);
        }
    }, [debouncedInput, fetchAddressDetails, selectedSuggestion, zipCode]);

    // On component mount or when NewselectedSuggestion changes
    useEffect(() => {
        if (NewselectedSuggestion) {
            setQuery(NewselectedSuggestion.streetLine);
            setCity(NewselectedSuggestion.city);
            setState(NewselectedSuggestion.state);
            setCountry(NewselectedSuggestion.country);
            setZipCode(NewselectedSuggestion.zipcode);
            setSelectedSuggestionState(NewselectedSuggestion);
        }
    }, [NewselectedSuggestion]);

    const handleStreetChange = (text: string) => {
        setQuery(text);
        setSelectedSuggestionState(null); // Reset the selected suggestion when input changes
    };

    const handleSuggestionClick = (suggestion: Suggestion) => {
        setQuery(suggestion.streetLine);
        setSelectedSuggestionState(suggestion);
        setNewSelectedSuggestion(suggestion); // Save the selected suggestion
        setCity(suggestion.city);
        setState(suggestion.state);
        setCountry(suggestion.country); // Saving country from suggestion
        setZipCode(suggestion.zipcode);
        setSuggestions([]);
        setModalVisible(false);
        Keyboard.dismiss(); // Dismiss the keyboard after selection
    };

    const handleFieldChange = (setter: (value: string) => void) => (text: string) => {
        setter(text);
        // Clear the street field if any of the other fields are manually edited
        if (selectedSuggestion) {
            setQuery('');
            setSelectedSuggestionState(null);
            setNewSelectedSuggestion(null);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={tw`w-full mx-auto bg-white p-4 rounded-lg shadow-md`}>
                {/* Street Input */}
                <Text style={tw`text-sm text-gray-700 mb-1`}>Street</Text>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={tw`flex-1 border border-gray-300 p-3 rounded-md`}
                        placeholder="Enter street"
                        value={query}
                        onChangeText={handleStreetChange}
                        onFocus={() => {
                            if (suggestions.length > 0) {
                                setModalVisible(true);
                            }
                        }}
                        returnKeyType="search"
                        onSubmitEditing={() => {
                            if (query.trim() && !selectedSuggestion) {
                                fetchAddressDetails(query, zipCode);
                            }
                        }}
                    />
                    {loading && <ActivityIndicator style={tw`ml-2`} size="small" color="blue" />}
                </View>
                {modalVisible && (
                    <Motion.View
                        initial={{
                            opacity: 0,
                            y: -80,
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        exit={{
                            opacity: 0,
                            y: -80
                        }}
                        className='rounded-md border border-gray-300 mt-2' >

                        <FlatList
                            scrollEnabled={false}
                            data={suggestions}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    onPress={() => handleSuggestionClick(item)}
                                    className='p-3 border-b flex-row justify-between border-gray-200 items-center'
                                >
                                    <Text className='text-gray-800'>

                                        <Text className='text-gray-800 underline'>
                                            {item.streetLine},
                                        </Text>
                                        <Text className='text-slate-900 font-bold '>
                                            {" "}{item.city},
                                        </Text>
                                        <Text className='text-green-900 font-bold '>
                                            {" "}{item.state},
                                        </Text>
                                        <Text className='text-blue-900 font-bold '>
                                            {" "}{item.zipcode}
                                        </Text>
                                    </Text>
                                    <Feather name='chevron-right' className='text-gray-400' />
                                </TouchableOpacity>
                            )}
                            ListEmptyComponent={
                                <Text style={tw`text-center text-gray-500 p-4`}>
                                    No address found.
                                </Text>
                            }
                        />
                    </Motion.View>
                )}

                {error && <Text style={tw`text-red-500 mt-1`}>{error}</Text>}


                {/* ZIP Code Input */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>
                    ZIP Code
                </Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md `}
                    placeholder="ZIP Code"
                    value={zipCode}
                    onChangeText={handleFieldChange(setZipCode)}
                    keyboardType="numeric"
                />

                {/* City Input */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>City</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="City"
                    value={city}
                    onChangeText={handleFieldChange(setCity)}
                />

                {/* State Input */}
                <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>State</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="State"
                    value={state}
                    onChangeText={handleFieldChange(setState)}
                />

                {/* Country Input (Optional) */}
                {/* <Text style={tw`text-sm text-gray-700 mt-4 mb-1`}>Country</Text>
                <TextInput
                    style={tw`border border-gray-300 p-3 rounded-md`}
                    placeholder="Country"
                    value={country}
                    onChangeText={handleFieldChange(setCountry)}
                /> */}
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

export default AddressAutocomplete;
