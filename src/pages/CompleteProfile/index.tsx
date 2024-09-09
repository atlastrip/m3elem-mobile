import React, { useState, useEffect } from "react";
import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RadioButton, Checkbox, Chip, TextInput } from "react-native-paper";
// import DropDownPicker from "react-native-dropdown-picker";
// import QuizeFiltersArtisant from "./QuizeFiltersArtisant";
import { Picker } from "@react-native-picker/picker";
import { getToken } from "@/helpers/getToken";
import Constants from "expo-constants";
import { Modal } from "react-native";
import { FlatList } from "react-native";





const MultiSelectPicker = ({ filter, selectedFilters, handleFilterOptionChange }:any) => {
    const [modalVisible, setModalVisible] = useState(false);
  
    // Get currently selected options for this filter
    const selectedOptions = selectedFilters.find((f:any) => f.filterName === filter.filterName)?.selectedOption || [];
  
    // Toggle option in or out of the selectedOptions array
    const toggleOption = (optionValue:any) => {
      const isSelected = selectedOptions.includes(optionValue);
      const updatedSelection = isSelected
        ? selectedOptions.filter((value:any) => value !== optionValue) // Remove the option if already selected
        : [...selectedOptions, optionValue]; // Add the option if not selected
  
      handleFilterOptionChange(filter, updatedSelection); // Update the selected filters
    };
  
    return (
      <View>
        {/* Display Selected Options */}
        {selectedOptions.length > 0 && (
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 }}>
            {selectedOptions.map((selectedValue:any) => (
              <TouchableOpacity
                key={selectedValue}
                onPress={() => toggleOption(selectedValue)} // Remove the selected option when clicked
                style={{ backgroundColor: '#f0f0f0', padding: 8, margin: 4, borderRadius: 4 }}
              >
                <Text>{filter.options.find((o:any) => o.value === selectedValue)?.label} (x)</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
  
        {/* Button to Open Modal */}
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{ padding: 10, backgroundColor: '#ddd' }}>
          <Text>Select Options</Text>
          {selectedOptions.length > 0 ? (
            <Text>Selected: {selectedOptions.map((opt:any) => filter.options.find((o:any) => o.value === opt)?.label).join(", ")}</Text>
          ) : (
            <Text>No options selected</Text>
          )}
        </TouchableOpacity>
  
        {/* Modal for Multi-Select */}
        <Modal
          visible={modalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <View style={{ width: '80%', backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>{filter.filterUserQuestion}</Text>
  
              <FlatList
                data={filter.options}
                keyExtractor={(item) => item.value}
                renderItem={({ item }) => {
                  const isSelected = selectedOptions.includes(item.value);
                  return (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                        backgroundColor: isSelected ? '#ddd' : '#fff',
                        marginBottom: 5,
                        borderRadius: 4
                      }}
                      onPress={() => toggleOption(item.value)}
                    >
                      <Text>{item.label} {isSelected && "(Selected)"}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
  
              <Button title="Done" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </View>
    );
  };


const CompleteProfile = ({ navigation }: any) => {
    const [selectedCategories, setSelectedCategories]: any = useState([]);
    const [selectedFilters, setSelectedFilters]: any = useState([]);
    const [showPopup, setShowPopup]: any = useState(false);
    const [profileCompletedData, setProfileCompletedData]: any = useState(null);
    const [addFilterLoading, setAddFilterLoading]: any = useState(false);



    const fetchProfileCompletedData = async () => {

        try {

            const token = await getToken();

            if (!token) {
                return;
            }
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);



            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `

                            query ArtisantProfileCompleted {
                            user{
                                id
                                filters{
                                selectedOption
                                filterName
                                }
                                categories{
                                id
                                name
                                filters{
                                    id
                                    filterName
                                    filterUserQuestion
                                    filterArtisanQuestion
                                    type
                                    options{
                                    name
                                    label
                                    value
                                    }
                                    
                                }
                                }
                            }
                            }
    
                            `


                    }),
                }
            );

            const json = await res.json();

            // console.log('json', json);
            setProfileCompletedData(json);




        } catch (error) {
            console.error("Error updating filters:", error);
        }
    };


    // Fetch profile data on mount

    const handleCompleteProfile = () => {
        setShowPopup(true);
    };

    const handleCategorySelection = (category: any) => {
        setSelectedCategories((prevCategories: any) => {
            if (prevCategories.includes(category)) {
                return prevCategories.filter((c: any) => c !== category);
            }
            return [...prevCategories, category];
        });
    };

    const handleFilterOptionChange = (filter: any, optionValue: any) => {
        setSelectedFilters((prevSelectedFilters: any) => {
            const existingFilter = prevSelectedFilters.find((f: any) => f.filterName === filter.filterName);

            let updatedFilters: any;
            if (existingFilter) {
                if (Array.isArray(optionValue)) {
                    updatedFilters = optionValue;
                } else {
                    updatedFilters = existingFilter.selectedOption.includes(optionValue)
                        ? existingFilter.selectedOption.filter((option: any) => option !== optionValue)
                        : [...existingFilter.selectedOption, optionValue];
                }

                return prevSelectedFilters.map((f: any) =>
                    f.filterName === filter.filterName
                        ? { ...f, selectedOption: updatedFilters }
                        : f
                );
            }

            return [
                ...prevSelectedFilters,
                { filterName: filter.filterName, selectedOption: Array.isArray(optionValue) ? optionValue : [optionValue] },
            ];
        });
    };

    const handleRemoveOption = (filter: any, optionValue: any) => {
        setSelectedFilters((prevSelectedFilters: any) =>
            prevSelectedFilters.map((f: any) =>
                f.filterName === filter.filterName
                    ? {
                        ...f,
                        selectedOption: f.selectedOption.filter((option: any) => option !== optionValue),
                    }
                    : f
            )
        );
    };

    const handleFilterUpdate = async () => {
        setAddFilterLoading(true);

        try {

            const token = await getToken();

            if (!token) {
                return;
            }
            const headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", `Bearer ${token}`);
            console.log('====================================');
            console.log('selectedFilters', selectedFilters);
            console.log('====================================');


            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                            mutation addFilterToArtisant($input: FilterInput) {
                                    addFilterToArtisant(input: $input) {
                                    id
                                    }
                                }
    
                            `,
                        variables: {
                            input: {
                                FilterInput: selectedFilters
                            }
                        }

                    }),
                }
            );

            const json = await res.json();

            console.log('json', json);
            navigation.navigate("Home");
            // await fetchProfileCompletedData(); // Refresh profile data




        } catch (error) {
            console.error("Error updating filters:", error);
        } finally {
            setAddFilterLoading(false);
        }
    };



    useEffect(() => {
        fetchProfileCompletedData();
    }, []);

    // const categories: any = profileCompletedData?.user?.categories || [];

    return (
        <View
            className="flex-1"
        >
            <ScrollView
                style={{ padding: 16}}>
                {!profileCompletedData?.user?.filters?.length && (
                    <View style={{ padding: 16, backgroundColor: "white", marginBottom: 16 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 18 }}>Complete Your Profile</Text>
                        <Text style={{ marginTop: 8 }}>It looks like your profile isn't completed yet. Completing your profile will help users find you more easily.</Text>
                        <Button title="Complete Now" onPress={handleCompleteProfile} />
                    </View>
                )}

                {/* Categories selection */}
                <Text style={{ fontSize: 20, fontWeight: "bold", marginTop: 16 }}>Select Categories</Text>
                <View style={{ flexDirection: "row", flexWrap: "wrap", marginTop: 8 }}>
                    {profileCompletedData?.data?.user?.categories?.map((category: any) => (
                        <TouchableOpacity
                            key={category?.id}
                            onPress={() => handleCategorySelection(category)}
                            style={{
                                padding: 8,
                                backgroundColor: selectedCategories.includes(category) ? "blue" : "gray",
                                borderRadius: 4,
                                margin: 4,
                            }}
                        >
                            <Text style={{ color: "white" }}>{category?.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Filters based on selected categories */}
                {selectedCategories.map((category: any) => (
                    <View key={category?.id} style={{ marginTop: 16,marginBottom:30 }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Filters for {category?.name}</Text>
                        {category?.filters?.map((filter: any) => (
                            <View key={filter.id} style={{
                                marginTop: 8,

                            }}>
                                <Text>{filter.filterUserQuestion}</Text>
                                {filter.type === "RADIO" && (
                                    <RadioButton.Group

                                        value={selectedFilters.find((f: any) => f.filterName === filter.filterName)?.selectedOption[0] || ""}
                                        onValueChange={(value) => handleFilterOptionChange(filter, value)}
                                    >
                                        {filter.options.map((option: any) => (
                                            <RadioButton.Item
                                                style={{ margin: 4, backgroundColor: 'black' }}
                                                key={option.value} label={option.label} value={option.value} />
                                        ))}
                                    </RadioButton.Group>
                                )}
                                {filter.type === "CHECKBOX" && (
                                    <View>
                                        {filter.options.map((option: any) => (
                                            <Checkbox.Item
                                                key={option.value}
                                                label={option.label}
                                                style={{
                                                    margin: 4,
                                                    backgroundColor: 'black',

                                                }}
                                                status={
                                                    selectedFilters.find((f: any) => f.filterName === filter.filterName)?.selectedOption.includes(option.value)
                                                        ? "checked"
                                                        : "unchecked"
                                                }
                                                onPress={() => handleFilterOptionChange(filter, option.value)}
                                            />
                                        ))}
                                    </View>
                                )}

                                {filter.type === "SELECT" &&
                                    <MultiSelectPicker
                                        filter={filter}
                                        selectedFilters={selectedFilters}
                                        handleFilterOptionChange={handleFilterOptionChange}
                                    />
                                    
                                    //  (
                                    //     <Picker

                                    //         selectedValue={selectedFilters.find((f: any) => f.filterName === filter.filterName)?.selectedOption[0] || ""}
                                    //         onValueChange={(value) => handleFilterOptionChange(filter, value)}
                                    //     >
                                    //         {filter.options.map((option: any) => (
                                    //             <Picker.Item key={option.value} label={option.label} value={option.value} />
                                    //         ))}
                                    //     </Picker>
                                    // )
                                }
                            </View>
                        ))}
                    </View>
                ))}

                {/* Button to update selected filters */}

                {/* Profile completion popup */}
                {/* {showPopup && (
                <QuizeFiltersArtisant
                    open={showPopup}
                    setOpen={setShowPopup}
                    profileCompletedRefetch={fetchProfileCompletedData}
                    filters={selectedCategories.map((category: any) => category?.filters).flat() || []}
                />
            )} */}
            </ScrollView>
            {selectedCategories.length > 0 && (
                <View style={{ marginTop: 10 }}>
                    <Button

                        title={addFilterLoading ? "Loading..." : "Add Filters"} onPress={handleFilterUpdate} />
                </View>
            )}

        </View>
    );
};

export default CompleteProfile;

