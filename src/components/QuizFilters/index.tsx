// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, TouchableOpacity, ScrollView, ProgressBarAndroid, Alert } from 'react-native';
// // import { useRouter, useSearchParams } from 'expo-router';
// import { Picker } from '@react-native-picker/picker';
// import Checkbox from 'expo-checkbox';
// type TFilterType = "SELECT" | "CHECKBOX" | "RADIO";

// interface Option {
//     name: string;
//     label: string;
//     value: string;
// }

// interface Filter {
//     id: number;
//     filterName: string;
//     filterUserQuestion: string;
//     filterArtisanQuestion: string;
//     type: TFilterType;
//     options: Option[];
// }

// const QuizFilters = ({ filters, open, setOpen, handleGetArtisants = () => { }, selectedFilters, setCurrentQuestion, currentQuestion = 0, setSelectedFilters }: any) => {
//     const router = ""
//     const searchParams = ""
//     // console.log('====================================');
//     // console.log('filters',filters);
//     // console.log('====================================');
//     // useEffect(() => {
//     //     const initialFilters: { [key: string]: string | string[] } = {};
//     //     filters?.forEach((filter: any) => {
//     //         const paramValue = searchParams.getAll(filter.filterName);
//     //         if (paramValue.length > 0) {
//     //             if (filter.type === 'CHECKBOX') {
//     //                 initialFilters[filter.filterName] = paramValue;
//     //             } else {
//     //                 initialFilters[filter.filterName] = paramValue[0];
//     //             }
//     //         }
//     //     });
//     //     setSelectedFilters(initialFilters);
//     // }, [searchParams, filters]);

//     const updateURL = (filterName: string, value: string | string[]) => {
//         // const params = new URLSearchParams(searchParams.toString());
//         // if (Array.isArray(value)) {
//         //     params.delete(filterName);
//         //     value.forEach(v => params.append(filterName, v));
//         // } else {
//         //     params.set(filterName, value);
//         // }
//         // router.replace(`?${params.toString()}`);
//     };

//     const handleSelectChange = (filterId: any, value: string) => {
//         const selectedFilter = filters?.find((filter: any) => filter?._id == filterId);
//         if (selectedFilter) {
//             setSelectedFilters((prevState: any) => ({
//                 ...prevState,
//                 [selectedFilter.filterName]: value
//             }));
//             // updateURL(selectedFilter.filterName, value);
//         }
//     };

//     const handleCheckboxChange = (filterId: number, value: string, checked: boolean) => {
//         const selectedFilter = filters?.find((filter: any) => filter?._id === filterId);
//         if (selectedFilter) {
//             const currentValues = selectedFilters[selectedFilter.filterName] || [];
//             let updatedValues = Array.isArray(currentValues) ? [...currentValues] : [currentValues];
//             if (checked) {
//                 updatedValues.push(value);
//             } else {
//                 updatedValues = updatedValues.filter(v => v !== value);
//             }
//             setSelectedFilters((prevState: any) => ({
//                 ...prevState,
//                 [selectedFilter.filterName]: updatedValues
//             }));
//         }
//     };

//     const handleRadioChange = (filterId: number, value: string) => {
//         const selectedFilter = filters?.find((filter: any) => filter?._id === filterId);
//         if (selectedFilter) {
//             setSelectedFilters((prevState: any) => {
//                 const updatedState = {
//                     ...prevState,
//                     [selectedFilter.filterName]: value
//                 };
//                 // updateURL(selectedFilter.filterName, value);
//                 return updatedState;
//             });
//         }
//     };

//     const handleNext = () => {
//         if (currentQuestion < filters.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//         } else {
//             handleGetArtisants();
//             setOpen(false);
//         }
//     };

//     const handleSkip = () => {
//         const selectedFilter = filters[currentQuestion];
//         // updateURL(selectedFilter.filterName, selectedFilters[selectedFilter.filterName] || '');
//         handleNext();
//     };

//     const handleStop = () => {
//         const selectedFilter = filters[currentQuestion];
//         // updateURL(selectedFilter.filterName, selectedFilters[selectedFilter.filterName] || '');
//         handleGetArtisants();
//         setOpen(false);
//     };

//     if (filters.length == 0) return null;


//     // useEffect(() => {
//     //     // first question set it in selectedFilters with first option
//     //     setSelectedFilters((prevState: any) => ({
//     //         ...prevState,
//     //         [filters[currentQuestion]?.filterName]: filters[currentQuestion]?.optionsForUser[0]?.value
//     //     }));
//     // }, []);

//     console.log('selectedFilters', selectedFilters);
//     // console.log('filters', filters);
//     console.log('currentQuestion', currentQuestion);


//     return (
//         <View style={{ padding: 20,
//             backgroundColor: 'white',
//             borderRadius: 10,
//             shadowColor: "#000",
//             shadowOffset: {
//                 width: 0,
//                 height: 0
//             },
//             shadowOpacity: 0.25,
//             shadowRadius: 3.84,
//             elevation: 10,
//             // position: 'absolute',
//             // top: "50%",
//             // left: 0,
//             // right: 0,


//          }}

//          >
//             {open && (
//                 <View
//                 >
//                     <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{filters[currentQuestion]?.filterUserQuestion}</Text>
//                     <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={(currentQuestion + 1) / filters.length} />

//                     <ScrollView style={{ marginVertical: 20 }}>
//                         {filters[currentQuestion]?.typeForUser === 'SELECT' && (
//                             <Picker
//                                 selectedValue={selectedFilters[filters[currentQuestion]?.filterName] || ''}
//                                 onValueChange={(value) => handleSelectChange(filters[currentQuestion]?._id, value)}

//                             >
//                                 {filters[currentQuestion]?.optionsForUser.map((option: any) => (
//                                     <Picker.Item

//                                         key={option.value} label={option.label} value={option.value} />
//                                 ))}
//                             </Picker>
//                         )}

//                         {filters[currentQuestion]?.typeForUser === 'CHECKBOX' && (
//                             filters[currentQuestion]?.optionsForUser.map((option: any) => (
//                                 <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
//                                     <Checkbox
//                                         value={Array.isArray(selectedFilters[filters[currentQuestion]?.filterName] || false) &&
//                                             selectedFilters[filters[currentQuestion]?.filterName].includes(option.value) || false

//                                         }
//                                         onValueChange={(checked: any) => handleCheckboxChange(filters[currentQuestion]?._id, option.value, checked)}
//                                     />
//                                     <Text>{option.label}</Text>
//                                 </View>
//                             ))
//                         )}

//                         {filters[currentQuestion]?.typeForUser === 'RADIO' && (
//                             filters[currentQuestion]?.optionsForUser.map((option: any) => (
//                                 <TouchableOpacity
//                                     key={option.value}
//                                     onPress={() => handleRadioChange(filters[currentQuestion]?._id, option.value)}
//                                     style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
//                                 >
//                                     <Checkbox
//                                         value={selectedFilters[filters[currentQuestion]?.filterName] === option.value || false}
//                                         onValueChange={() => handleRadioChange(filters[currentQuestion]?._id, option.value)}
//                                     />
//                                     <Text>{option.label}</Text>
//                                 </TouchableOpacity>
//                             ))
//                         )}
//                     </ScrollView>

//                     <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
//                         <Button title="Skip" onPress={handleSkip} />
//                         {filters[currentQuestion]?.typeForUser !== 'CHECKBOX' && (
//                             <Button title={currentQuestion === filters.length - 1 ? 'Finish' : 'Next'} onPress={handleNext} />
//                         )}
//                         <Button title="Stop" onPress={handleStop} />
//                     </View>
//                 </View>
//             )}
//         </View>
//     );
// };

// export default QuizFilters;




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ScrollView,
  ProgressBarAndroid,
  Alert,
  Modal,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Checkbox from 'expo-checkbox';

type TFilterType = 'SELECT' | 'CHECKBOX' | 'RADIO';

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

const QuizFilters = ({
  filters,
  open,
  setOpen,
  handleGetArtisants = () => {},
  selectedFilters,
  setCurrentQuestion,
  currentQuestion = 0,
  setSelectedFilters,
}: any) => {
  // Remove unused variables
  // const router = '';
  // const searchParams = '';

  const updateURL = (filterName: string, value: string | string[]) => {
    // Functionality for updating URL can be implemented if needed
  };

  const handleSelectChange = (filterId: any, value: string) => {
    const selectedFilter = filters?.find((filter: any) => filter?._id == filterId);
    if (selectedFilter) {
      setSelectedFilters((prevState: any) => ({
        ...prevState,
        [selectedFilter.filterName]: value,
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
        updatedValues = updatedValues.filter((v) => v !== value);
      }
      setSelectedFilters((prevState: any) => ({
        ...prevState,
        [selectedFilter.filterName]: updatedValues,
      }));
    }
  };

  const handleRadioChange = (filterId: number, value: string) => {
    const selectedFilter = filters?.find((filter: any) => filter?._id === filterId);
    if (selectedFilter) {
      setSelectedFilters((prevState: any) => {
        const updatedState = {
          ...prevState,
          [selectedFilter.filterName]: value,
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

  const renderOptions = () => {
    const currentFilter = filters[currentQuestion];
    if (currentFilter?.typeForUser === 'SELECT') {
      return (
        <Picker
          selectedValue={selectedFilters[currentFilter.filterName] || ''}
          onValueChange={(value) => handleSelectChange(currentFilter._id, value)}
        >
          {currentFilter.optionsForUser.map((option: any) => (
            <Picker.Item key={option.value} label={option.label} value={option.value} />
          ))}
        </Picker>
      );
    } else if (currentFilter?.typeForUser === 'CHECKBOX') {
      return currentFilter.optionsForUser.map((option: any) => (
        <View key={option.value} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
          <Checkbox
            value={
              Array.isArray(selectedFilters[currentFilter.filterName]) &&
              selectedFilters[currentFilter.filterName].includes(option.value)
            }
            onValueChange={(checked: any) => handleCheckboxChange(currentFilter._id, option.value, checked)}
          />
          <Text>{option.label}</Text>
        </View>
      ));
    } else if (currentFilter?.typeForUser === 'RADIO') {
      return currentFilter.optionsForUser.map((option: any) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => handleRadioChange(currentFilter._id, option.value)}
          style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
        >
          <Checkbox
            value={selectedFilters[currentFilter.filterName] === option.value}
            onValueChange={() => handleRadioChange(currentFilter._id, option.value)}
          />
          <Text>{option.label}</Text>
        </TouchableOpacity>
      ));
    }
    return null;
  };

  return (
    <Modal
      visible={open}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setOpen(false);
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent background
        }}
      >
        <View
          style={{
            padding: 20,
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 10,
            width: '80%', // Adjust width as needed
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
            {filters[currentQuestion]?.filterUserQuestion}
          </Text>
          <ProgressBarAndroid
            styleAttr="Horizontal"
            indeterminate={false}
            progress={(currentQuestion + 1) / filters.length}
          />
          <ScrollView style={{ marginVertical: 20 }}>{renderOptions()}</ScrollView>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button title="Skip" onPress={handleSkip} />
            {filters[currentQuestion]?.typeForUser !== 'CHECKBOX' && (
              <Button
                title={currentQuestion === filters.length - 1 ? 'Finish' : 'Next'}
                onPress={handleNext}
              />
            )}
            <Button title="Stop" onPress={handleStop} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default QuizFilters;







// import React from 'react';
// import { View, Text, ScrollView, StyleSheet } from 'react-native';
// import { Button, ProgressBar, RadioButton, Checkbox, Menu } from 'react-native-paper';

// const QuizFilters = ({
//     filters,
//     open,
//     setOpen,
//     handleGetArtisants = () => { },
//     selectedFilters,
//     setCurrentQuestion,
//     currentQuestion = 0,
//     setSelectedFilters,
// }: any) => {
//     const [menuVisible, setMenuVisible] = React.useState(false);

//     const handleSelectChange = (filterId: any, value: string) => {
//         const selectedFilter = filters.find((filter: any) => filter._id === filterId);
//         if (selectedFilter) {
//             setSelectedFilters((prevState: any) => ({
//                 ...prevState,
//                 [selectedFilter.filterName]: value,
//             }));
//         }
//     };

//     const handleCheckboxChange = (filterId: any, value: string, checked: boolean) => {
//         const selectedFilter = filters.find((filter: any) => filter._id === filterId);
//         if (selectedFilter) {
//             const currentValues = selectedFilters[selectedFilter.filterName] || [];
//             let updatedValues = Array.isArray(currentValues) ? [...currentValues] : [currentValues];
//             if (checked) {
//                 updatedValues.push(value);
//             } else {
//                 updatedValues = updatedValues.filter((v: any) => v !== value);
//             }
//             setSelectedFilters((prevState: any) => ({
//                 ...prevState,
//                 [selectedFilter.filterName]: updatedValues,
//             }));
//         }
//     };

//     const handleRadioChange = (filterId: any, value: string) => {
//         const selectedFilter = filters.find((filter: any) => filter._id === filterId);
//         if (selectedFilter) {
//             setSelectedFilters((prevState: any) => ({
//                 ...prevState,
//                 [selectedFilter.filterName]: value,
//             }));
//         }
//     };

//     const handleNext = () => {
//         if (currentQuestion < filters.length - 1) {
//             setCurrentQuestion(currentQuestion + 1);
//         } else {
//             handleGetArtisants();
//             setOpen(false);
//         }
//     };

//     const handleSkip = () => {
//         handleNext();
//     };

//     const handleStop = () => {
//         handleGetArtisants();
//         setOpen(false);
//     };

    
//     if (!open || filters.length === 0) return null;
    
//     const currentFilter = filters[currentQuestion];
//     const options = currentFilter?.optionsForUser || [];
//     console.log('====================================');
//     console.log('currentFilter.filterName', currentFilter.filterName);
//     console.log('====================================');
//     console.log('selectedFilters[currentFilter.filterName]', selectedFilters[currentFilter.filterName]);
//     console.log('selectedFilters', selectedFilters);

//     return (
//         <View style={styles.container}>
//             <View style={styles.quizContainer}>
//                 <Text style={styles.questionText}>{currentFilter.filterUserQuestion}</Text>
//                 <ProgressBar
//                     progress={(currentQuestion + 1) / filters.length}
//                     style={styles.progressBar}
//                 />

//                 <ScrollView style={styles.optionsContainer}>
//                     {currentFilter.typeForUser === 'SELECT' && (
//                         <Menu
//                             visible={menuVisible}
//                             onDismiss={() => setMenuVisible(false)}
//                             anchor={
//                                 <Button
//                                     mode="outlined"
//                                     onPress={() => setMenuVisible(true)}
//                                     style={styles.selectButton}
//                                 >
//                                     {selectedFilters[currentFilter.filterName] || 'Select an option'}
//                                 </Button>
//                             }
//                         >
//                             {options.map((option: any, index: number) => (
//                                 <Menu.Item
//                                     key={index}
//                                     onPress={() => {
//                                         handleSelectChange(currentFilter._id, option.value);
//                                         setMenuVisible(false);
//                                     }}
//                                     title={option.label}
//                                 />
//                             ))}
//                         </Menu>
//                     )}

//                     {currentFilter.typeForUser === 'CHECKBOX' &&
//                         options.map((option: any, index: number) => (
//                             <View key={index} style={styles.optionContainer}>
//                                 <Checkbox
//                                     status={
//                                         Array.isArray(selectedFilters[currentFilter.filterName]) &&
//                                             selectedFilters[currentFilter.filterName].includes(option.value)
//                                             ? 'checked'
//                                             : 'unchecked'
//                                     }
//                                     onPress={() => {
//                                         const checked = !(
//                                             Array.isArray(selectedFilters[currentFilter.filterName]) &&
//                                             selectedFilters[currentFilter.filterName].includes(option.value)
//                                         );
//                                         handleCheckboxChange(currentFilter._id, option.value, checked);
//                                     }}
//                                 />
//                                 <Text style={styles.optionLabel}>{option.label}</Text>
//                             </View>
//                         ))}

//                     {currentFilter.typeForUser === 'RADIO' && (
//                         <RadioButton.Group
//                             onValueChange={(value: any) => handleRadioChange(currentFilter._id, value)}
//                             value={
//                                 Array.isArray(selectedFilters[currentFilter.filterName])
//                                     ? selectedFilters[currentFilter.filterName][0]
//                                     : selectedFilters[currentFilter.filterName] || ''
//                             }
//                         >
//                             {options.map((option: any, index: number) => (
//                                 <View key={index} style={styles.optionContainer}>
//                                     <RadioButton value={option.value} />
//                                     <Text style={styles.optionLabel}>{option.label}</Text>
//                                 </View>
//                             ))}
//                         </RadioButton.Group>
//                     )}
//                 </ScrollView>

//                 <View style={styles.buttonContainer}>
//                     <Button mode="outlined" onPress={handleSkip} style={styles.button}>
//                         Skip
//                     </Button>
//                     <Button
//                         mode="contained"
//                         onPress={handleNext}
//                         style={styles.button}
//                         disabled={
//                             currentFilter.typeForUser !== 'CHECKBOX' &&
//                             !selectedFilters[currentFilter.filterName]
//                         }
//                     >
//                         {currentQuestion === filters.length - 1 ? 'Finish' : 'Next'}
//                     </Button>
//                     <Button mode="text" onPress={handleStop} style={styles.button}>
//                         Stop
//                     </Button>
//                 </View>
//             </View>
//         </View>
//     );
// };

// export default QuizFilters;

// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//     },
//     quizContainer: {
//         flex: 1,
//     },
//     questionText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//         marginBottom: 10,
//     },
//     progressBar: {
//         height: 10,
//         borderRadius: 5,
//         marginBottom: 20,
//     },
//     optionsContainer: {
//         flex: 1,
//         marginBottom: 20,
//     },
//     optionContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     optionLabel: {
//         fontSize: 16,
//         marginLeft: 8,
//     },
//     buttonContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     button: {
//         marginHorizontal: 5,
//         flex: 1,
//     },
//     selectButton: {
//         marginBottom: 10,
//     },
// });
