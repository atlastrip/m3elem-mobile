import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Card, Button, RadioButton, Menu, IconButton } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ZipCodeForm from '../ZipCodeForm';

export default function ContactForm({ pathName, role }: any) {
    const [selectedContact, setSelectedContact] = useState('');
    const [menuVisible, setMenuVisible] = useState(false);

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleContactChange = (value: any) => {
        setSelectedContact(value);
    };

    const handleSubmit = () => {
        if (role === '') {
            // Submit form logic when not logged in
        } else {
            // Logic when user role is "user"
        }
    };

    return (
        <View style={styles.formContainer}>
            <Card style={styles.card}>
                <Card.Content>
                    <Text style={styles.heading}>Contact me</Text>
                    <TextInput value={pathName} style={styles.hiddenInput} editable={false} />

                    <View style={{}}>
                        {/* Insert your custom ZipCodeForm component logic here */}
                        <ZipCodeForm />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Contact with</Text>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={
                                <Button onPress={openMenu} mode="outlined" icon="menu-down">
                                    {selectedContact || 'Select contact type'}
                                </Button>
                            }
                            statusBarHeight={0}
                        >
                            <Menu.Item
                                style={{
                                    // borderRadius: 8,
                                    backgroundColor: '#fff',
                                    shadowColor: '#000',
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.1,
                                    shadowRadius: 4,
                                    elevation: 3,



                                }}
                                onPress={() => {
                                    handleContactChange('direct')
                                    closeMenu()
                                }}
                                title="Direct chat"
                                titleStyle={{ color: 'black' }}

                                leadingIcon={() => <Ionicons name="chatbox-outline" size={20} />}
                            />
                            <Menu.Item
                                style={{
                                    // borderRadius: 8,
                                    backgroundColor: '#fff',
                                    // shadowColor: '#000',
                                    // shadowOffset: { width: 0, height: 2 },
                                    // shadowOpacity: 0.1,
                                    // shadowRadius: 4,
                                    // elevation: 3,

                                }}
                                onPress={() => {
                                    handleContactChange('call')
                                    closeMenu()
                                }}
                                title="Call"
                                titleStyle={{ color: 'black' }}
                                leadingIcon={() => <Ionicons name="call-outline" size={20} />}
                            />
                        </Menu>
                    </View>

                    {role === '' && (
                        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                            Log in to continue
                        </Button>
                    )}

                    {role === 'user' && (
                        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
                            Contact
                        </Button>
                    )}
                </Card.Content>
            </Card>
        </View>
    );
}

const styles = StyleSheet.create({
    formContainer: {
        width: '100%',
        maxWidth: 320,
        alignSelf: 'center',
    },
    card: {
        marginBottom: 24,
        borderRadius: 8,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // Shadow for Android
    },
    heading: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 16,
    },
    hiddenInput: {
        height: 0,
        width: 0,
        opacity: 0,
    },
    inputGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 8,
    },
    submitButton: {
        marginTop: 16,
    },
});
