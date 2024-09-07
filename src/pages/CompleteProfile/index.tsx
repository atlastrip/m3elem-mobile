import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const CompleteProfile = () => {
    const [searchText, setSearchText] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [webViewUrl, setWebViewUrl] = useState('');
    const [webViewRef, setWebViewRef] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); // Modal state

    // Handle search button click
    const handleSearch = () => {
        try {
            const searchObject = { text: searchText, zipCode: zipCode };
            console.log('searchObject', searchObject);

            setWebViewUrl('https://m3elem.vercel.app/en/artisant/completeProfile');
            setModalVisible(true); // Show modal on search

            //   // Inject JavaScript code into WebView
            //   const jsCode = `
            //     window.sessionStorage.setItem('search', '${searchText}');
            //     window.sessionStorage.setItem('zip_code', '${zipCode}');
            //   `;

            //   if (webViewRef) {
            //     webViewRef.injectJavaScript(jsCode);
            //   }
        } catch (error) {
            console.log('error', error);
        }
    };

    return (
        <View style={styles.container}>
            {/* Full-screen modal for WebView */}
            <Modal visible={modalVisible} animationType="slide" transparent={false}>
                <View style={styles.modalContainer}>
                    <TouchableOpacity
                        style={styles.closeButton}
                        onPress={() => setModalVisible(false)} // Close modal
                    >
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    {/* WebView to load the search result */}
                        <WebView
                            //   ref={setWebViewRef}
                            source={{ uri: "https://m3elem.vercel.app/en/artisant/completeProfile" }}
                            style={styles.webView}
                            javaScriptEnabled={true}
                            domStorageEnabled={true}
                        />
                    
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        position: 'absolute',
        bottom: 3,
        width: '100%',
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 18,
        padding: 10,
        marginBottom: 15,
        width: '100%',
        color: '#000000',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    zipInput: {
        flex: 0.3,
        marginRight: 10,
    },
    searchButton: {
        flex: 0.7,
        backgroundColor: '#007BFF',
        paddingVertical: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#000', // Modal background color
    },
    webView: {
        flex: 1, // Take all available space
        marginTop: 10,
    },
    closeButton: {
        padding: 15,
        backgroundColor: '#FF0000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
    },
    noResultText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default CompleteProfile;
