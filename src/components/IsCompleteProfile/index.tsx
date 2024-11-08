import { getToken } from '@/helpers/getToken';
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const IsCompleteProfile = ({ profileCompletedData, navigation }: any) => {



    const handleCompleteProfile = async () => {
        // Logic to complete profile
        // console.log("Complete profile clicked");
        const token = await getToken();
        

        // go to CompleteProfile
        navigation.navigate("CompleteProfile", { navigation });

    };
    const insets = useSafeAreaInsets()

    return (
        <>
            {/* Conditional rendering instead of Collapse */}
            {!profileCompletedData && (
                <View style={[styles.container , {paddingTop : insets.top}]}>
                    <View style={styles.innerContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>Complete Your Profile</Text>
                            <Text style={styles.description}>
                                It looks like your profile isn’t completed yet. Completing your profile will help users find you more easily.
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.completeButton} onPress={handleCompleteProfile}>
                                <Text style={styles.buttonText}>Complete Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderBottomWidth: 4,
        borderBottomColor: '#4F46E5', // Indigo color
        // marginBottom: 8,
    },
    innerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: '#1F2937', // Gray-900
    },
    description: {
        fontSize: 14,
        color: '#4B5563', // Gray-700
        marginTop: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 16,
    },
    completeButton: {
        backgroundColor: '#4F46E5', // Indigo color
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 4,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export { IsCompleteProfile };
