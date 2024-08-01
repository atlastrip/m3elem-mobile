import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useMemo, useCallback } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import Animate from "react-native-reanimated"
import { ButtonPrimary } from '@/components/index';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';


const OrderView = ({ route,navigation }: any) => {
    const { order, user }: any = route.params;
    const insets = useSafeAreaInsets();
    console.log('order', order);

    const [reviews, setReviews]: any = useState([]); // Replace with actual reviews if available
    const [newReview, setNewReview] = useState({ user: '', comment: '', rating: '', professionId: '' });
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ['50%', '80%'], []);

    const handlePresentModalPress = useCallback(() => {
        setSelectedProfession(null)
        bottomSheetModalRef.current?.present();
    }, []);

    const handleAddReview = async () => {


        const token = await getToken();
        console.log('====================================');
        console.log('token', token);
        console.log('====================================');
        if (!token) {
            return;
        }
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", `Bearer ${token}`);
        try {
            const res = await fetch(
                Constants.expoConfig?.extra?.apiUrl as string,
                {
                    method: "POST",
                    headers,
                    body: JSON.stringify({
                        query: `
                        mutation createReview($input: inputReview) {
                            createReview(input: $input) {
                                id
                            }
                        }
                        `,
                        variables: {
                            input: {
                                reviewer: user?.id,
                                description: newReview.comment,
                                rating: `${rating}`,
                                order: order?.id,
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            console.log('====================================');
            console.log('json.data', json);
            console.log('====================================');
            navigation.goBack();
            // setLeads(json.data.getLeadsThatMatchUserProfessionals || []);

        } catch (err: any) {
            Alert.alert("error", JSON.stringify(err.message, undefined, 2));
            // Alert.alert(json?.detail);
        }




    };
    const [SelectedProfession, setSelectedProfession] = useState<any>(null);
    const [rating, setRating] = useState<number>(3);

    const handleRating = (newRating: number) => {
        setRating(newRating);
    };


    console.log('rating', rating);


    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
                    <View
                        className='flex-row items-center gap-2'
                    >
                        <Text style={styles.title}>Order</Text>
                        <Text className='text-xl font-semibold'>{order?.title}</Text>
                    </View>
                    <Text className='text-lg'>{order?.description}</Text>

                    <Text style={styles.title}>Professions</Text>
                    {order?.professionals?.map((profession: any, i: any) => (
                        <View key={i} style={styles.professionSection}>
                            <Text style={styles.professionName}>{profession?.name}</Text>
                            <Text style={styles.professionText}>{profession?.text}</Text>

                            {/* <Text style={styles.label}>Reviews:</Text> */}
                            {reviews
                                .filter((review: any) => review.professionId === profession?.id)
                                .map((review: any) => (
                                    <View key={review.id} style={styles.reviewItem}>
                                        <Text style={styles.reviewUser}>{review.user}</Text>
                                        <Text style={styles.reviewComment}>{review.comment}</Text>
                                        <Text style={styles.reviewRating}>Rating: {review.rating}</Text>
                                    </View>
                                ))}
                        </View>
                    ))}


                    <Text style={styles.label}>Images:</Text>
                    <ScrollView

                        horizontal>
                        {order?.images?.map((image: any, index: any) => (
                            <Image

                                key={index + Math.random()} source={{ uri: image }} style={styles.image} />
                        ))}
                    </ScrollView>

                    <Text style={styles.label}>Location:</Text>
                    {order?.locationType === 'currentLocation' ? (
                        <View style={{
                            height: 200,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 8,
                            overflow: 'hidden',
                        }}
                        >

                            <MapView
                                scrollEnabled={false}
                                style={{ height: 200, width: "100%" }} initialRegion={{ latitude: order?.locationDetails.latitude, longitude: order?.locationDetails.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}>
                                <Marker coordinate={{ latitude: order?.locationDetails.latitude, longitude: order?.locationDetails.longitude }} title="My Location" />
                            </MapView>
                        </View>
                    ) : (
                        <Text>Location Details: {order?.locationDetails}</Text>
                    )}
                    <ButtonPrimary className='mt-3' Loading={false} setLoading={() => { }} onPress={handlePresentModalPress} text="Add Review" />
                    <View className='my-20' />
                </ScrollView>

                <BottomSheetModal
                    snapPoints={snapPoints}
                    style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
                    ref={bottomSheetModalRef}
                >
                    <View style={styles.bottomSheetContent}>
                        <Text
                            className='text-center' style={styles.sheetTitle}>{SelectedProfession ? SelectedProfession : 'Add Review'}</Text>
                        {!SelectedProfession ? (
                            <View>
                                <Text style={styles.label}>Select Professional:</Text>
                                <View>
                                    {order?.professionals?.map((profession: any) => (
                                        <TouchableOpacity
                                            key={profession?.id}
                                            onPress={() => setSelectedProfession(profession?.text)}
                                            className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100 '>
                                            <Text
                                                className='text-lg font-bold'>
                                                {profession?.text}
                                            </Text>
                                            <Ionicons name="chevron-forward" size={20} />

                                        </TouchableOpacity>
                                    ))}


                                </View>
                            </View>
                        ) : (
                            <View>

                                <TextInput
                                    placeholderTextColor="black"
                                    className="text-black placeholder:text-black border border-black/25 bg-white w-full rounded-lg text-xl p-3 mb-3"
                                    placeholder="Add my review"
                                    value={newReview.comment}
                                    onChangeText={(text) => setNewReview({ ...newReview, comment: text })}

                                />

                                <Rating
                                    type="star"
                                    startingValue={rating}
                                    imageSize={30}

                                    onFinishRating={handleRating}
                                    style={{ paddingVertical: 10 }}
                                />
                                <ButtonPrimary className='mb-2' Loading={false} setLoading={() => { }} text="Submit Review" onPress={handleAddReview} />
                                <Button title='Cancel' onPress={() => setSelectedProfession(null)} />
                            </View>
                        )}
                    </View>
                </BottomSheetModal>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 0,
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 8,
    },
    professionSection: {
        marginBottom: 20,
    },
    professionName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    professionText: {
        fontSize: 16,
        color: 'grey',
        marginBottom: 8,
    },
    reviewItem: {
        backgroundColor: '#e9e9e9',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    reviewUser: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    reviewComment: {
        fontSize: 14,
        marginBottom: 4,
    },
    reviewRating: {
        fontSize: 14,
        color: '#555',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 8,
        marginRight: 8,
    },
    buttonPrimary: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    buttonPrimaryText: {
        color: 'white',
        fontWeight: 'bold',
    },
    bottomSheetContent: {
        padding: 16,
        backgroundColor: '#fff',
    },
    sheetTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        padding: 8,
        marginBottom: 10,
        borderRadius: 5,
    },
    picker: {
        height: 50,
        width: '100%',
        marginBottom: 16,
    },
});

export default OrderView;
