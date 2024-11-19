import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    ActivityIndicator,
    Modal,
    Alert,
} from 'react-native';
import { List, Divider, Title, Paragraph, Button } from 'react-native-paper';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';
import ZipCodeMap from '../ZipCodeMap';

interface Area {
    name: string;
    zipcodes: string[];
}

interface County {
    name: string;
    areas: Area[];
}

interface StateType {
    state: string;
    counties: County[];
}

interface User {
    id: string;
    zipCodeUI: string;
    miles: string;
    zipCodeHome: string;
}

interface UserData {
    user: User;
}

interface GraphQLResponse<T> {
    data: T;
    errors?: any;
}

const RenderZipCodesFromBackendUI: React.FC<any> = ({
    data,
    loading,
    userData,
    setUserData,
}: {
    data: StateType[];
    loading: boolean;
    userData: UserData;
    setUserData: any;
}) => {
    const [displayData, setDisplayData] = useState<StateType[]>(data);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    const ListZipcodes: React.FC<{ area: Area }> = ({ area }) => {
        const [displayMode, setDisplayMode] = useState<'info' | 'zips'>('info');
        return (
            <TouchableOpacity
            className='pl-2 bg-gray-50'
                onPress={() => setDisplayMode((v) => (v === 'info' ? 'zips' : 'info'))}
            >
                <View>
                    {displayMode === 'info' ? (
                        <View>
                            <Text style={styles.areaName}>{area.name}</Text>
                            <Text>{area.zipcodes.length} ZIP Codes</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.areaName}>{area.name}</Text>
                            <View style={styles.zipCodesContainer}>
                                {area.zipcodes.map((zip, idx) => (
                                    <View style={styles.zipCodeItem} key={idx}>
                                        <Text style={styles.zipCodeText}>{zip}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        );
    };

    const handleChangeLocation = () => {
        setModalVisible(true);
    };

    const handleUpdateLocation = async () => {
        setIsUpdating(true);
        try {
            const token = await getToken();
            const headers = new Headers({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            });

            // Replace with your actual mutation to reset user location
            const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    query: `
            mutation updateUserZipCodes($input: inputUpdateUserZipCodes) {
              updateUserZipCodes(input: $input) {
                id
              }
            }
          `,
                    variables: {
                        input: {
                            zipCodeUI: '',
                            zipCodes: [],
                            miles: '',
                        },
                    },
                }),
            });

            const responseData: GraphQLResponse<any> = await response.json();
            console.log('Response:', responseData);

            // Set userData to null to trigger parent component to display WebView
            setUserData(null);

            setModalVisible(false);
        } catch (error) {
            console.error('Error updating location:', error);
            Alert.alert('Error', 'An error occurred while updating your location.');
        } finally {
            setIsUpdating(false);
        }
    };

    if (loading || isUpdating) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    if (!userData || !userData.user || displayData.length === 0) {
        return (
            <View style={styles.errorContainer}>
                <Text>Error: Unable to load data</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <>
                <View style={styles.header}>
                    <Title style={styles.title}>Your work areas</Title>
                    <Paragraph style={styles.paragraph}>
                        You will receive leads in these areas when they match your preferences.
                    </Paragraph>
                    <Button
                        mode="contained"
                        onPress={handleChangeLocation}
                        style={styles.changeButton}
                    >
                        Change where you work
                    </Button>
                </View>
                <View style={styles.mapContainer}>
                    <ZipCodeMap
                        zipCode={userData?.user?.zipCodeHome}
                        range={parseInt(userData.user.miles) || 20}
                        height={300}
                    />
                </View>
                <View style={styles.listContainer}>
                    {displayData.map((state) => (
                        <View key={state.state}>
                            {state.counties.map((county) => (
                                <List.Accordion
                                    title={`${county.name}, ${state.state}`}
                                    description={`${county.areas.length} areas`}
                                    key={county.name}
                                    style={styles.accordion}
                                    titleStyle={styles.accordionTitle}
                                >
                                    {county.areas.map((area, index) => (
                                        <List.Item
                                            key={index}
                                            title={() => <ListZipcodes area={area} />}
                                        />
                                    ))}
                                </List.Accordion>
                            ))}
                            <Divider />
                        </View>
                    ))}
                </View>

                {/* Modal for changing location */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(false);
                    }}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <Title style={styles.modalTitle}>Change Your Work Location</Title>
                            <Paragraph style={styles.modalMessage}>
                                Are you sure you want to change your work location? This will reset your current location, and you will need to enter a new ZIP code.
                            </Paragraph>
                            <View style={styles.modalButtonContainer}>
                                <Button
                                    mode="contained"
                                    onPress={handleUpdateLocation}
                                    disabled={isUpdating}
                                    style={styles.modalButton}
                                    className='bg-[#4CAF50]'
                                >
                                    <Text
                                        className='text-black  rounded-md px-4 py-2'
                                    >{isUpdating ? 'Updating...' : 'Yes'}</Text>
                                </Button>
                                <Button
                                    mode="text"
                                    onPress={() => setModalVisible(false)}
                                    style={styles.modalCancelButton}
                                    className='shadow-lg  bg-white'

                                >
                                    <Text
                                        className='text-black rounded-md px-4 py-2 '
                                    >
                                        Cancel
                                    </Text>
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            </>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 6,
        backgroundColor: 'white',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    paragraph: {
        textAlign: 'center',
        marginVertical: 8,
        color: '#666',
    },
    changeButton: {
        marginTop: 8,
        backgroundColor: '#4CAF50',
    },
    content: {
        flexDirection: 'column',
    },
    listContainer: {
        flex: 1,
        marginTop: 16,
    },
    mapContainer: {
        flex: 1,
        height: 300,
        marginVertical: 16,
        borderRadius: 8,
        overflow: 'hidden',
    },
    areaName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    zipCodesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    zipCodeItem: {
        backgroundColor: '#4CAF50',
        borderRadius: 16,
        paddingHorizontal: 12,
        paddingVertical: 8,
        margin: 4,
    },
    zipCodeText: {
        color: 'white',
        fontWeight: 'bold',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    accordion: {
        backgroundColor: '#fff',
    },
    accordionTitle: {
        color: '#333',
        fontWeight: 'bold',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 20,
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginVertical: 8,
        color: '#666',
    },
    modalButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    modalButton: {
        flex: 1,
        marginRight: 8,
    },
    modalCancelButton: {
        flex: 1,
        marginLeft: 8,
    },
});

export default RenderZipCodesFromBackendUI;
