import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ConfirmPhoneCode = () => {
    const [phoneNumber, setPhoneNumber] = useState('010277 62 986');
    const [verificationCode, setVerificationCode] = useState(['6', '8', '', '']);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollView}>
                {/* Verification Code Screen */}
                <View style={styles.card}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="mail-outline" size={32} color="white" />
                    </View>
                    <Text style={styles.title}>Verification Code</Text>
                    <Text style={styles.subtitle}>Please enter Code sent to {phoneNumber}</Text>
                    <View style={styles.codeInputContainer}>
                        {verificationCode.map((digit, index) => (
                            <TextInput
                                key={index}
                                style={styles.codeInput}
                                value={digit}
                                onChangeText={(text) => {
                                    const newCode = [...verificationCode];
                                    newCode[index] = text;
                                    setVerificationCode(newCode);
                                }}
                                maxLength={1}
                                keyboardType="number-pad"
                            />
                        ))}
                    </View>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>VERIFY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ConfirmPhoneCode;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7c3aed', // Purple background
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 24,
        padding: 24,
        marginBottom: 20,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#7c3aed',
        borderRadius: 50,
        width: 64,
        height: 64,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#7c3aed',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: 'gray',
        marginBottom: 24,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    countrySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f3f4f6',
        borderTopLeftRadius: 8,
        borderBottomLeftRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
    },
    codeInputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 24,
    },
    codeInput: {
        width: 50,
        height: 50,
        borderBottomWidth: 2,
        borderBottomColor: '#7c3aed',
        fontSize: 24,
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#10b981',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 24,
        width: '100%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});