import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, ScrollView, ProgressBarAndroid, Alert } from 'react-native';
// import { useRouter, useSearchParams } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';
type TFilterType = "SELECT" | "CHECKBOX" | "RADIO";

interface Option {
    name: string;
    label: string;
    value: string;
}

interface Filter {
    id: number;
    filterName: string;
    filterUserQuestion: string;
    filterArtisanQuestion: string;
    type: TFilterType;
    options: Option[];
}

const QuizFilters = ({ filters, open, setOpen, handleGetArtisants = () => { }, selectedFilters, setCurrentQuestion, currentQuestion = 0, setSelectedFilters }: any) => {
    const router = ""
    const searchParams = ""
    // console.log('====================================');
    // console.log('filters',filters);
    // console.log('====================================');
    // useEffect(() => {
    //     const initialFilters: { [key: string]: string | string[] } = {};
    //     filters?.forEach((filter: any) => {
    //         const paramValue = searchParams.getAll(filter.filterName);
    //         if (paramValue.length > 0) {
    //             if (filter.type === 'CHECKBOX') {
    //                 initialFilters[filter.filterName] = paramValue;
    //             } else {
    //                 initialFilters[filter.filterName] = paramValue[0];
    //             }
    //         }
    //     });
    //     setSelectedFilters(initialFilters);
    // }, [searchParams, filters]);

    const updateURL = (filterName: string, value: string | string[]) => {
        // const params = new URLSearchParams(searchParams.toString());
        // if (Array.isArray(value)) {
        //     params.delete(filterName);
        //     value.forEach(v => params.append(filterName, v));
        // } else {
        //     params.set(filterName, value);
        // }
        // router.replace(`?${params.toString()}`);
    };

    const handleSelectChange = (filterId: any, value: string) => {
        const selectedFilter = filters?.find((filter: any) => filter?._id == filterId);
        if (selectedFilter) {
            setSelectedFilters((prevState: any) => ({
                ...prevState,
                [selectedFilter.filterName]: value
            }));
            // updateURL(selectedFilter.filterName, value);
        }
    };

    const handleCheckboxChange = (filterId: number, value: string, checked: boolean) => {
        const selectedFilter = filters?.find((filter: any) => filter?._id === filterId);
        if (selectedFilter) {
            const currentValues = selectedFilters[selectedFilter.filterName] || [];
            let updatedValues = Array.isArray(currentValues) ? [...currentValues] : [currentValues];
            if (checked) {
                updatedValues.push(value);
            } else {
                updatedValues = updatedValues.filter(v => v !== value);
            }
            setSelectedFilters((prevState: any) => ({
                ...prevState,
                [selectedFilter.filterName]: updatedValues
            }));
        }
    };

    const handleRadioChange = (filterId: number, value: string) => {
        const selectedFilter = filters?.find((filter: any) => filter?._id === filterId);
        if (selectedFilter) {
            setSelectedFilters((prevState: any) => {
                const updatedState = {
                    ...prevState,
                    [selectedFilter.filterName]: value
                };
                // updateURL(selectedFilter.filterName, value);
                return updatedState;
            });
        }
    };

    const handleNext = () => {
        if (currentQuestion < filters.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            handleGetArtisants();
            setOpen(false);
        }
    };

    const handleSkip = () => {
        const selectedFilter = filters[currentQuestion];
        // updateURL(selectedFilter.filterName, selectedFilters[selectedFilter.filterName] || '');
        handleNext();
    };

    const handleStop = () => {
        const selectedFilter = filters[currentQuestion];
        // updateURL(selectedFilter.filterName, selectedFilters[selectedFilter.filterName] || '');
        handleGetArtisants();
        setOpen(false);
    };

    if (filters.length == 0) return null;


    // useEffect(() => {
    //     // first question set it in selectedFilters with first option
    //     setSelectedFilters((prevState: any) => ({
    //         ...prevState,
    //         [filters[currentQuestion]?.filterName]: filters[currentQuestion]?.options[0]?.value
    //     }));
    // }, []);

    console.log('selectedFilters', selectedFilters);
    // console.log('filters', filters);
    console.log('currentQuestion', currentQuestion);


    return (
        <View style={{ padding: 20 }}>
            {open && (
                <View>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{filters[currentQuestion]?.filterUserQuestion}</Text>
                    <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={(currentQuestion + 1) / filters.length} />

                    <ScrollView style={{ marginVertical: 20 }}>
                        {filters[currentQuestion]?.type === 'SELECT' && (
                            <Picker
                                selectedValue={selectedFilters[filters[currentQuestion]?.filterName] || ''}
                                onValueChange={(value) => handleSelectChange(filters[currentQuestion]?._id, value)}

                            >
                                {filters[currentQuestion]?.options.map((option: any) => (
                                    <Picker.Item

                                        key={option.value} label={option.label} value={option.value} />
                                ))}
                            </Picker>
                        )}

                        {filters[currentQuestion]?.type === 'CHECKBOX' && (
                            filters[currentQuestion]?.options.map((option: any) => (
                                <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                                    <Checkbox
                                        value={Array.isArray(selectedFilters[filters[currentQuestion]?.filterName] || false) &&
                                            selectedFilters[filters[currentQuestion]?.filterName].includes(option.value) || false

                                        }
                                        onValueChange={(checked: any) => handleCheckboxChange(filters[currentQuestion]?._id, option.value, checked)}
                                    />
                                    <Text>{option.label}</Text>
                                </View>
                            ))
                        )}

                        {filters[currentQuestion]?.type === 'RADIO' && (
                            filters[currentQuestion]?.options.map((option: any) => (
                                <TouchableOpacity
                                    key={option.value}
                                    onPress={() => handleRadioChange(filters[currentQuestion]?._id, option.value)}
                                    style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
                                >
                                    <Checkbox
                                        value={selectedFilters[filters[currentQuestion]?.filterName] === option.value || false}
                                        onValueChange={() => handleRadioChange(filters[currentQuestion]?._id, option.value)}
                                    />
                                    <Text>{option.label}</Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </ScrollView>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title="Skip" onPress={handleSkip} />
                        {filters[currentQuestion]?.type !== 'CHECKBOX' && (
                            <Button title={currentQuestion === filters.length - 1 ? 'Finish' : 'Next'} onPress={handleNext} />
                        )}
                        <Button title="Stop" onPress={handleStop} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default QuizFilters;
