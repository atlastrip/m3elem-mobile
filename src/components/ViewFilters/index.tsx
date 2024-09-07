import { Picker } from '@react-native-picker/picker';
import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Checkbox, RadioButton } from 'react-native-paper'; // You can use any library or custom components

const ViewFilters = ({ filters, selectedFilters, setSelectedFilters, handleGetArtisants }: any) => {
    const [modalVisible, setModalVisible] = useState(false);
    const slideAnim = useRef(new Animated.Value(-300)).current; // Initial position outside of screen

    // Initialize filter states from URL params (mock functionality)
    // useEffect(() => {
    //     const initialFilters: any = {};
    //     filters?.forEach((filter: any) => {
    //         initialFilters[filter.filterName] = filter.type === 'CHECKBOX' ? [] : '';
    //     });
    //     setSelectedFilters(initialFilters);
    // }, [filters]);

    // Function to handle sliding the filter view in and out
    const slideIn = () => {
        setModalVisible(true);
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const slideOut = () => {
        Animated.timing(slideAnim, {
            toValue: -300,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setModalVisible(false));
    };

    const handleSelectChange = (filterId: any, value: any) => {
        const selectedFilter = filters?.find((filter: any) => filter._id === filterId);
        if (selectedFilter) {
            setSelectedFilters((prevState: any) => ({
                ...prevState,
                [selectedFilter.filterName]: value,
            }));
        }
    };

    const handleCheckboxChange = (filterId: any, value: any, checked: any) => {
        const selectedFilter: any = filters.find((filter: any) => filter._id === filterId);
        const currentValues = selectedFilters[selectedFilter.filterName] || [];
        const updatedValues = checked
            ? [...currentValues, value]
            : currentValues.filter((v: any) => v !== value);

        setSelectedFilters({
            ...selectedFilters,
            [selectedFilter.filterName]: updatedValues,
        });
    };

    const handleRadioChange = (filterId: any, value: any) => {
        const selectedFilter = filters.find((filter: any) => filter._id === filterId);
        setSelectedFilters({
            ...selectedFilters,
            [selectedFilter.filterName]: value,
        });
    };

    return (
        <View style={{ flex: modalVisible ? 1 : 0 }}>
            {/* Button to open the filter popup */}
            <TouchableOpacity onPress={slideIn} style={{
                padding: 10,
                backgroundColor: '#007bff',
                borderRadius: 5,
                alignSelf: 'center',
                display: !modalVisible ? 'flex' : 'none',
            }}>
                <Text style={{
                    color: '#fff',
                    fontSize: 16,
                }}>Filters</Text>
            </TouchableOpacity>

            {/* Filter Popup Modal */}
            <Modal transparent visible={modalVisible} animationType="none">
                <View style={styles.modalBackground}>
                    <Animated.View style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}>
                        <ScrollView style={styles.filterContent}>
                            {filters?.map((filter: any) => (
                                <View key={filter._id} style={styles.filterItem}>
                                    <Text style={styles.filterTitle}>{filter.filterName}</Text>
                                    {/* SELECT filter using Picker */}
                                    {filter.type === 'SELECT' && (
                                        <View style={styles.pickerContainer}>
                                            <Picker
                                                selectedValue={selectedFilters[filter.filterName] || ''}
                                                onValueChange={(itemValue) => handleSelectChange(filter._id, itemValue)}
                                                style={styles.picker}
                                            >
                                                {filter.options.map((option: any) => (
                                                    <Picker.Item key={option.value} label={option.label} value={option.value} />
                                                ))}
                                            </Picker>
                                        </View>
                                    )}
                                    {filter.type === 'CHECKBOX' && (
                                        <View>
                                            {filter.options.map((option: any) => (
                                                <View key={option.value} style={styles.optionContainer}>
                                                    <Checkbox
                                                        status={selectedFilters[filter.filterName]?.includes(option.value) ? 'checked' : 'unchecked'}
                                                        onPress={() => handleCheckboxChange(filter._id, option.value, !selectedFilters[filter.filterName]?.includes(option.value))}
                                                    />
                                                    <Text style={styles.optionLabel}>{option.label}</Text>
                                                </View>
                                            ))}
                                        </View>
                                    )}
                                    {filter.type === 'RADIO' && (
                                        <RadioButton.Group
                                            onValueChange={(value) => handleRadioChange(filter._id, value)}
                                            value={selectedFilters[filter.filterName] || ''}
                                        >
                                            {filter.options.map((option: any) => (
                                                <View key={option.value} style={styles.optionContainer}>
                                                    <RadioButton value={option.value} />
                                                    <Text style={styles.optionLabel}>{option.label}</Text>
                                                </View>
                                            ))}
                                        </RadioButton.Group>
                                    )}
                                </View>
                            ))}
                        </ScrollView>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-evenly',
                                marginTop: 20,
                            }}
                        >
                            <TouchableOpacity onPress={
                                () => {
                                    handleGetArtisants(1)
                                    slideOut()
                                }
                            } style={styles.filterButton}>
                                <Text style={styles.buttonText}>Apply Filters</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={slideOut} style={styles.closeButton}>
                                <Text style={styles.buttonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </Animated.View>
                </View>
            </Modal>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    filterButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        marginTop: 20,
        alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    modalContainer: {
        width: 300,
        backgroundColor: '#fff',
        padding: 20,
        height: '100%',
    },
    filterContent: {
        flex: 1,
    },
    filterItem: {
        marginBottom: 20,
    },
    filterTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionLabel: {
        marginLeft: 10,
    },
    closeButton: {
        padding: 10,
        backgroundColor: '#007bff',
        borderRadius: 5,
        alignSelf: 'center',
        marginTop: 20,
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
    },
});

export default ViewFilters;
