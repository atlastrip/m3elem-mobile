import React from 'react';
import { Modal, StyleSheet, Text, TextInput, View, TouchableOpacity, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Motion } from '@legendapp/motion';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from "@expo/vector-icons";
import { COLORS, SHADOWS } from 'constants/theme';

const { width } = Dimensions.get('window');

const FilterModal = ({ filterVisible, setFilterVisible, filter, setFilter }: any) => {
    return (
        <Modal
            visible={filterVisible}
            transparent={true}
            animationType="fade"
            onRequestClose={() => setFilterVisible(false)}
        >
            <BlurView intensity={100} style={styles.modalContainer}>
                <Motion.View
                    initial={{ scale: 0.9, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0, y: 50 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                    style={styles.modalContent}
                >
                    <LinearGradient
                        colors={[COLORS.primary, '#4a00e0']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.modalHeader}
                    >
                        <Text style={styles.modalTitle}>Filter Leads</Text>
                        <Motion.View
                            animate={{ rotate: '360deg' }}
                            //   @ts-ignore
                            transition={{ repeat: Infinity, duration: 2000, ease: 'linear' }}
                        >
                            <Ionicons name="filter" size={24} color="white" />
                        </Motion.View>
                    </LinearGradient>

                    <View style={styles.inputContainer}>
                        <Motion.View
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            //  @ts-ignore
                            transition={{ delay: 0.1 }}
                        >
                            <TextInput
                                placeholder="Title"
                                style={styles.modalInput}
                                value={filter.title}
                                onChangeText={(text) => setFilter({ ...filter, title: text })}
                            />
                        </Motion.View>

                        <Motion.View
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            // @ts-ignore
                            transition={{ delay: 0.2 }}
                        >
                            <TextInput
                                placeholder="Profession"
                                style={styles.modalInput}
                                value={filter.profession}
                                onChangeText={(text) => setFilter({ ...filter, profession: text })}
                            />
                        </Motion.View>

                        <Motion.View
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            // @ts-ignore
                            transition={{ delay: 0.3 }}
                        >
                            <TextInput
                                placeholder="Location"
                                style={styles.modalInput}
                                value={filter.location}
                                onChangeText={(text) => setFilter({ ...filter, location: text })}
                            />
                        </Motion.View>
                    </View>

                    <View style={styles.modalActions}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.cancelButton]}
                            onPress={() => setFilterVisible(false)}
                        >
                            <Motion.Text
                                style={styles.modalButtonText}
                                initial={{ scale: 0.9 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Cancel
                            </Motion.Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.applyButton]}
                            onPress={() => setFilterVisible(false)}
                        >
                            <Motion.Text
                                style={[styles.modalButtonText, { color: 'white' }]}
                                initial={{ scale: 0.9 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Apply
                            </Motion.Text>
                        </TouchableOpacity>
                    </View>
                </Motion.View>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: width * 0.9,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        ...SHADOWS.medium.primary,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    inputContainer: {
        padding: 20,
    },
    modalInput: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        backgroundColor: '#f8f8f8',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
    },
    modalButton: {
        padding: 15,
        borderRadius: 10,
        width: '45%',
        alignItems: 'center',
        ...SHADOWS.small.primary,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    applyButton: {
        backgroundColor: COLORS.primary,
    },
    modalButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default FilterModal;