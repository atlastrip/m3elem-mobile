import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { Checkbox } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import MapView from 'react-native-maps';

interface ZipCodeSelectorProps {
    selectedStates: string[];
    setSelectedStates: (states: string[]) => void;
    selectedZipCodes: string[];
    setSelectedZipCodes: (zips: string[]) => void;
}

const initialCitiesByState: Record<string, string[]> = {
    'AL': ['Birmingham', 'Montgomery', 'Mobile'],
    'AK': ['Anchorage', 'Fairbanks', 'Juneau'],
    'AZ': ['Phoenix', 'Tucson', 'Mesa'],
    'AR': ['Little Rock', 'Fort Smith', 'Fayetteville'],
    'CA': ['Los Angeles', 'San Francisco', 'San Diego'],
    'CO': ['Denver', 'Colorado Springs', 'Aurora'],
    'CT': ['Hartford', 'New Haven', 'Stamford'],
    'DE': ['Wilmington', 'Dover', 'Newark'],
    'FL': ['Miami', 'Orlando', 'Tampa'],
    'GA': ['Atlanta', 'Augusta', 'Savannah'],
    'HI': ['Honolulu', 'Hilo', 'Kailua'],
    'ID': ['Boise', 'Meridian', 'Nampa'],
    'IL': ['Chicago', 'Aurora', 'Naperville'],
    'IN': ['Indianapolis', 'Fort Wayne', 'Evansville'],
    'IA': ['Des Moines', 'Cedar Rapids', 'Davenport'],
    'KS': ['Wichita', 'Overland Park', 'Kansas City'],
    'KY': ['Louisville', 'Lexington', 'Bowling Green'],
    'LA': ['New Orleans', 'Baton Rouge', 'Shreveport'],
    'ME': ['Portland', 'Lewiston', 'Bangor'],
    'MD': ['Baltimore', 'Silver Spring', 'Germantown'],
    'MA': ['Boston', 'Worcester', 'Springfield'],
    'MI': ['Detroit', 'Grand Rapids', 'Warren'],
    'MN': ['Minneapolis', 'Saint Paul', 'Rochester'],
    'MS': ['Jackson', 'Gulfport', 'Biloxi'],
    'MO': ['St. Louis', 'Kansas City', 'Springfield'],
    'MT': ['Billings', 'Missoula', 'Great Falls'],
    'NE': ['Omaha', 'Lincoln', 'Bellevue'],
    'NV': ['Las Vegas', 'Henderson', 'Reno'],
    'NH': ['Manchester', 'Nashua', 'Concord'],
    'NJ': ['Newark', 'Jersey City', 'Paterson'],
    'NM': ['Albuquerque', 'Santa Fe', 'Las Cruces'],
    'NY': ['New York', 'Buffalo', 'Rochester'],
    'NC': ['Charlotte', 'Raleigh', 'Greensboro'],
    'ND': ['Fargo', 'Bismarck', 'Grand Forks'],
    'OH': ['Columbus', 'Cleveland', 'Cincinnati'],
    'OK': ['Oklahoma City', 'Tulsa', 'Norman'],
    'OR': ['Portland', 'Salem', 'Eugene'],
    'PA': ['Philadelphia', 'Pittsburgh', 'Allentown'],
    'RI': ['Providence', 'Cranston', 'Warwick'],
    'SC': ['Charleston', 'Columbia', 'Greenville'],
    'SD': ['Sioux Falls', 'Rapid City', 'Aberdeen'],
    'TN': ['Memphis', 'Nashville', 'Knoxville'],
    'TX': ['Houston', 'Dallas', 'Austin'],
    'UT': ['Salt Lake City', 'Provo', 'Ogden'],
    'VT': ['Burlington', 'South Burlington', 'Rutland'],
    'VA': ['Virginia Beach', 'Norfolk', 'Richmond'],
    'WA': ['Seattle', 'Spokane', 'Tacoma'],
    'WV': ['Charleston', 'Huntington', 'Morgantown'],
    'WI': ['Milwaukee', 'Madison', 'Green Bay'],
    'WY': ['Cheyenne', 'Casper', 'Laramie']
};

const ZipCodeSelector: React.FC<ZipCodeSelectorProps> = ({
    selectedStates,
    setSelectedStates,
    selectedZipCodes,
    setSelectedZipCodes
}) => {
    const [activeStep, setActiveStep] = useState(0);
    const [states] = useState(Object.keys(initialCitiesByState));
    const [citiesByState] = useState(initialCitiesByState);
    const [selectedStateCity, setSelectedStateCity] = useState<string | null>(null);
    const [zipCodes, setZipCodes] = useState<string[]>([]);
    const [openModalStates, setOpenModalStates] = useState(false);
    const [selectedAllButton, setSelectedAllButton] = useState(false);

    const handleStateChange = (state: string) => {
        setSelectedStates(
            selectedStates.includes(state)
                ? selectedStates.filter(s => s !== state)
                : [...selectedStates, state]
        );
    };

    const fetchZipCodesForCity = async (state: string, city: string) => {
        try {
            const response = await fetch(`https://api.zippopotam.us/us/${state}/${city}`);
            if (!response.ok) throw new Error('City or state not found');
            const data = await response.json();
            if (data.places) {
                const zipCodes = data.places.map((place: any) => place['post code']);
                setZipCodes(zipCodes);
            }
        } catch (error) {
            console.error('Error fetching zip codes:', error);
            setZipCodes([]);
        }
    };

    const handleSelectZipcodes = (zips: string[], action: 'add' | 'remove') => {
        setSelectedZipCodes(
            action === 'add'
                ? Array.from(new Set([...selectedZipCodes, ...zips]))
                : selectedZipCodes.filter(zip => !zips.includes(zip))
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {!selectedStateCity ? (
                <View style={styles.section}>
                    <Text style={styles.title}>Pick where you are able to work.</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setOpenModalStates(true)}>
                        <Text style={styles.buttonText}>
                            {selectedStates.length === 0 ? '--Please select a state--' : selectedStates.join(', ')}
                        </Text>
                        <Ionicons name="create-outline" size={24} color="black" />
                    </TouchableOpacity>
                    {selectedStates.map((state, index) => (
                        <View key={index} style={styles.accordionContainer}>
                            <TouchableOpacity
                                style={styles.accordionHeader}
                                onPress={() => {
                                    setSelectedStateCity(state);
                                    fetchZipCodesForCity(state, citiesByState[state][0]); // Example city selection
                                }}
                            >
                                <Text style={styles.stateText}>{state}</Text>
                                <Ionicons name="chevron-down-outline" size={24} color="black" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            ) : (
                <View>
                    <TouchableOpacity onPress={() => { setSelectedStateCity(null); setSelectedAllButton(false); }}>
                        <Text style={styles.title}>{selectedStateCity}</Text>
                    </TouchableOpacity>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            title={!selectedAllButton ? `Select All zip codes in ${selectedStateCity}` : `Unselect All zip codes in ${selectedStateCity}`}
                            onPress={() => handleSelectZipcodes(zipCodes, selectedAllButton ? 'remove' : 'add')}
                        />
                    </View>
                    <View style={styles.zipContainer}>
                        {zipCodes.map((zipcode, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.zipButton}
                                onPress={() => {
                                    handleSelectZipcodes([zipcode], selectedZipCodes.includes(zipcode) ? 'remove' : 'add');
                                }}
                            >
                                <Ionicons
                                    name={selectedZipCodes.includes(zipcode) ? 'checkbox' : 'checkbox-outline'}
                                    size={24}
                                    color="black"
                                />
                                <Text>{zipcode}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            )}

            <Modal visible={openModalStates} onRequestClose={() => setOpenModalStates(false)} transparent={true}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            {Object.entries(initialCitiesByState).map(([state], index) => (
                                <TouchableOpacity key={index} style={styles.stateButton} onPress={() => handleStateChange(state)}>
                                    <Text style={styles.stateText}>{state}</Text>
                                    <Checkbox status={selectedStates.includes(state) ? 'checked' : 'unchecked'} />
                                </TouchableOpacity>
                            ))}
                            <Button title="Close" onPress={() => setOpenModalStates(false)} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
};

export default ZipCodeSelector;

const styles = StyleSheet.create({
    container: { padding: 4 },
    section: { marginBottom: 20 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#333' },
    button: { padding: 12, backgroundColor: '#E0E0E0', borderRadius: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    buttonText: { color: '#555', fontSize: 16 },
    accordionContainer: { marginTop: 15 },
    accordionHeader: { padding: 15, backgroundColor: '#f5f5f5', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 5 },
    stateText: { fontSize: 16, fontWeight: '500' },
    map: { height: 250, width: '100%', marginTop: 20, borderRadius: 10 },
    buttonContainer: { marginTop: 20 },
    zipContainer: { marginTop: 10 },
    zipButton: { padding: 10, flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#ddd' },
    modalBackground: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: '80%', backgroundColor: 'white', borderRadius: 10, padding: 20, maxHeight: '80%' },
    stateButton: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#ddd' },
});
