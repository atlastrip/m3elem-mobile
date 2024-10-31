import { Ionicons } from '@expo/vector-icons';
import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Button, Alert, Modal, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetModal, BottomSheetModalProvider, WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { Picker } from '@react-native-picker/picker';
import { ButtonPrimary } from '@/components/index';
import MapView, { Marker } from 'react-native-maps';
import { Rating } from 'react-native-ratings';
import { getToken } from '@/helpers/getToken';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Review } from '../Profession/artisan';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';



const SelectUnlockedArtisan = ({ visible, onClose, artisants, handlePresentModalPress, setChoosedArtisan, goTobottomSheetModalRef, setSelectedProfession, professional }: any) => {
    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
        >
            <View style={styles.modalBackground}>
                {/* {artisants.map((artisant: any) => (
                        <TouchableOpacity
                            key={artisant.id}
                            style={styles.artisanOption}
                            onPress={() => {
                                setChoosedArtisan(artisant);
                                handlePresentModalPress();
                                onClose(false);
                            }}
                        >
                            <Text style={styles.artisanText}>{artisant.firstName} {artisant.lastName}</Text>
                        </TouchableOpacity>
                    ))} */}

                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Select Artisan</Text>

                    <ScrollView horizontal>
                        {artisants?.map((lead: any, i: any) => (
                            <View key={i}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setChoosedArtisan(lead);
                                        // handlePresentModalPress();
                                        setSelectedProfession(professional?.text);
                                        goTobottomSheetModalRef?.present();
                                        onClose(false);
                                    }}
                                    key={lead.id} style={styles.leadItem}>
                                    <Image source={{ uri: lead.imageProfile }} style={styles.leadImage} />
                                    <Text style={{
                                        ...styles.leadName,
                                    }}
                                        className='text-xs break-words w-20 text-center  '
                                    >{`${lead.firstName} ${lead.lastName}`}</Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => onClose(null)}
                    >
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const OrderView = ({ route, navigation }: any) => {
    const { order, user }: any = route.params;
    const insets = useSafeAreaInsets();

    const [reviews, setReviews]: any = useState([]); // Replace with actual reviews if available
    const [newReview, setNewReview] = useState({ user: '', comment: '', rating: '', professionId: '' });
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);
    const [openModal, setOpenModal] = useState(false);
    const [choosedArtisan, setChoosedArtisan] = useState<any>(null);
    const snapPoints = useMemo(() => ['50%', '80%'], []);
    const [artisantInfo, setArtisantInfo] = useState<any>(null);

    const handlePresentModalPress = useCallback(() => {
        setSelectedProfession(null);
        bottomSheetModalRef.current?.present();
    }, []);



    const getInfo = async () => {
        const User = await AsyncStorage.getItem('@user');
        setArtisantInfo(JSON.parse(User || '{}'));
    }
    const handleAddReview = async () => {
        const token = await getToken();
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
                                reviewer: user?.id ? user?.id : choosedArtisan?.id,
                                description: newReview.comment,
                                rating: `${rating}`,
                                order: order?.id,
                            }
                        }
                    }),
                }
            );

            const json = await res.json();
            navigation.goBack();
        } catch (err: any) {
            Alert.alert("error", JSON.stringify(err.message, undefined, 2));
        }
    };

    const [SelectedProfession, setSelectedProfession] = useState<any>(null);
    const [rating, setRating] = useState<number>(3);

    const handleRating = (newRating: number) => {
        setRating(newRating);
    };


    useEffect(() => {
        getInfo();
    }, []);
    const [Loading, setLoading] = useState(false);

    const handleCreateConversation = async () => {
        setLoading(true)
        console.log('order?.id, artisantInfo?.id, order?.owner?.id', order?.id, artisantInfo?.id, order?.owner?.id);

        const conversationId = await createOrRetrieveConversation(order?.id, artisantInfo?.id, order?.owner?.id);
        setLoading(false)
        navigation.navigate('Chat', {
            conversationId, userId: artisantInfo?.id, userName: artisantInfo?.firstName, order: {
                ...order,
                artisantId: artisantInfo
            }
        });
    };
    const handleCreateConversationUser = async (artisan: any) => {
        setLoading(true)
        console.log('order?.id, artisantInfo?.id, order?.owner?.id user', order?.id, artisan?.id, order?.owner?.id);

        const conversationId = await createOrRetrieveConversation(order?.id, artisan?.id, order?.owner?.id);
        setLoading(false)
        navigation.navigate('Chat', {
            conversationId, userId: order?.owner?.id, userName: order?.owner?.firstName, order: {
                ...order,
                artisantId: artisan
            }
        });

    };
    // console.log('order wast orderviweer', order);

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            {Loading && (

                <View style={{
                    width: WINDOW_WIDTH,
                    height: WINDOW_HEIGHT
                }} className='justify-center absolute top-0 left-0 z-20 items-center bg-black/80'>
                    <ActivityIndicator size={50} />
                </View>
            )}
            <BottomSheetModalProvider>
                <ScrollView style={[styles.container, { paddingTop: insets.top + 10 }]}>
                    <View className='flex-row items-center gap-2'>
                        <Text style={styles.title}>Order</Text>
                        <Text className='text-xl font-semibold'>{order?.title}</Text>
                    </View>
                    <Text className='text-lg'>{order?.description}</Text>

                    <Text style={styles.title}>Professions</Text>
                    {order?.professionals?.map((profession: any, i: any) => (
                        <View key={i} style={styles.professionSection}>
                            {/* <Text style={styles.professionName}>{profession?.text}</Text> */}
                            <Text style={styles.professionText}>{profession?.text}</Text>

                        </View>
                    ))}

                    <Text style={styles.label}>Images:</Text>
                    <ScrollView horizontal>
                        {order?.images?.map((image: any, index: any) => (
                            <Image key={index} source={{ uri: image }} style={styles.image} />
                        ))}
                    </ScrollView>

                    <Text style={styles.label}>Location:</Text>
                    {order?.locationType === 'currentLocation' ? (
                        <View style={styles.mapContainer}>
                            <MapView
                                scrollEnabled={false}
                                style={styles.map}
                                initialRegion={{
                                    latitude: JSON.parse(order?.location)?.latitude,
                                    longitude: JSON.parse(order?.location)?.longitude,
                                    latitudeDelta: 0.0922,
                                    longitudeDelta: 0.0421,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: JSON.parse(order?.location)?.latitude,
                                        longitude: JSON.parse(order?.location)?.longitude,
                                    }}
                                    title="My Location"
                                />
                            </MapView>
                        </View>
                    ) : (
                        <Text>Location Details: {order?.location} </Text>
                    )}

                    {(user?.id && order?.review == null) &&

                        <ButtonPrimary
                            className='mt-3'
                            Loading={false}
                            setLoading={() => { }}
                            onPress={handlePresentModalPress}
                            text="Add Review"
                        />
                    }





                    {order?.review && (
                        // <View key={order?.review?.id} style={styles.reviewItem}>
                        //     <Text style={styles.reviewUser}>{order?.review?.owner?.firstName} + {""}+
                        //         {order?.review?.owner?.lastName}
                        //     </Text>
                        //     <Text style={styles.reviewComment}>{order?.review?.description}</Text>
                        //     <Text style={styles.reviewRating}>Rating: {order?.review?.rating}</Text>
                        // </View>

                        <View
                            className='  px-3 py-1 rounded-lg my-3'
                        >
                            <Review
                                key={order?.review?.id}
                                name={order?.owner?.firstName + ' ' + order?.owner?.lastName}
                                comment={order?.review?.description}
                                rating={order?.review?.rating}
                                timeAgo={order?.timeAgo}
                                image={order?.owner?.imageProfile}
                            />
                        </View>
                    )}



                    {/* {order?.artisantUnlockedLead?.length > 0 && (
                        <View style={styles.unlockedLeadsContainer}>
                            <Text style={styles.title}>Unlocked Leads</Text>
                            <ScrollView horizontal>
                                {order?.artisantUnlockedLead?.map((lead: any) => (
                                    <>
                                        <View key={lead?.id} style={styles.leadItem}>
                                            <Image source={{ uri: lead?.imageProfile }} style={styles.leadImage} />
                                            <Text style={{
                                                ...styles.leadName,
                                            }}
                                                className='text-xs break-words w-20 text-center  '
                                            >{`${lead?.firstName} ${lead?.lastName}`}</Text>
                                        </View>

                                    </>
                                ))}
                            </ScrollView>
                        </View>
                    )} */}



                    {
                        order?.artisantUnlockedLead?.length > 0 && artisantInfo?.role !== 'artisant' && !order?.review &&
                        <ButtonPrimary
                            className='mt-3'
                            Loading={false}
                            setLoading={() => { }}
                            onPress={() => {
                                setOpenModal(true)
                            }}
                            text="Add Review"
                        />
                    }


                    {artisantInfo?.role === 'user' ? (
                        <View className="mt-5">
                            <Text className='text-lg font-bold'>
                                Conversations with artisans:
                            </Text>
                            {order?.artisantUnlockedLead?.map((artisan: any, i: any) => (
                                <TouchableOpacity
                                    key={i}
                                    onPress={() => handleCreateConversationUser(artisan)}
                                    className='p-3  rounded-md  items-between ' >
                                    <View className='flex-row items-center justify-between'>
                                        <View className='flex-row items-center '>
                                            <Image src={artisan?.imageProfile} style={{ width: 50, height: 50, borderRadius: 9999 }} />
                                            <View >
                                                <Text className=' ml-3 font-bold'>
                                                    {artisan?.firstName}{" "}{artisan?.lastName}
                                                </Text>
                                                <Text className=' ml-3'>
                                                    Conversations
                                                </Text>
                                            </View>
                                        </View>
                                        <View >
                                            <Ionicons name="chevron-forward" size={24} color={'gray'} />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    ) : (
                        <View className="mt-5">
                            <Text className='text-lg font-bold'>
                                Conversation:
                            </Text>
                            <TouchableOpacity

                                onPress={handleCreateConversation}
                                className='p-3  rounded-md  items-between ' >
                                <View className='flex-row items-center justify-between'>
                                    <View className='flex-row items-center '>
                                        <Image src={order?.owner?.imageProfile} className='bg-gray-200' style={{ width: 50, height: 50, borderRadius: 9999 }} />
                                        <View >
                                            <Text className=' ml-3 font-bold capitalize'>
                                                {order?.owner?.firstName}{" "}{order?.owner?.lastName}
                                            </Text>
                                            <Text className=' ml-3'>
                                                Conversations
                                            </Text>
                                        </View>
                                    </View>
                                    <View >
                                        <Ionicons name="chevron-forward" size={24} color={'gray'} />
                                    </View>
                                </View>
                            </TouchableOpacity>

                        </View>
                    )}

                    <View className='my-20' />
                    <SelectUnlockedArtisan visible={openModal} onClose={setOpenModal}
                        setChoosedArtisan={setChoosedArtisan}
                        handlePresentModalPress={handlePresentModalPress}
                        artisants={order?.artisantUnlockedLead}
                        // bottomSheetModalRef.current?.present();

                        goTobottomSheetModalRef={bottomSheetModalRef.current}
                        professional={order?.professionals[0]}
                        setSelectedProfession={setSelectedProfession}
                    />
                </ScrollView>

                <BottomSheetModal
                    snapPoints={snapPoints}
                    style={{ borderTopColor: 'gray', borderTopWidth: 2 }}
                    ref={bottomSheetModalRef}
                >
                    <View style={styles.bottomSheetContent}>
                        <Text className='text-center' style={styles.sheetTitle}>
                            {SelectedProfession ? SelectedProfession : 'Add Review'}
                        </Text>
                        {!SelectedProfession ? (
                            <View>
                                <Text style={styles.label}>Select Professional:</Text>
                                <View>
                                    {order?.professionals?.map((profession: any, i: any) => (
                                        <TouchableOpacity
                                            key={i}
                                            onPress={() => setSelectedProfession(profession?.text)}
                                            className='flex-row justify-between items-center p-3 my-1 rounded-md bg-gray-100'
                                        >
                                            <Text className='text-lg font-bold'>{profession?.text}</Text>
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
                                    value={newReview?.comment}
                                    onChangeText={(text) => setNewReview({ ...newReview, comment: text })}
                                />
                                <Rating
                                    type="star"
                                    startingValue={rating}
                                    imageSize={30}
                                    onFinishRating={handleRating}
                                    style={{ paddingVertical: 10 }}
                                />
                                <ButtonPrimary
                                    className='mb-2'
                                    Loading={false}
                                    setLoading={() => { }}
                                    text="Submit Review"
                                    onPress={handleAddReview}
                                />
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
    mapContainer: {
        height: 200,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8,
        overflow: 'hidden',
    },
    map: {
        height: 200,
        width: "100%",
    },
    unlockedLeadsContainer: {
        marginTop: 20,
    },
    leadItem: {
        alignItems: 'center',
        marginRight: 10,
    },
    leadImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 5,
    },
    leadName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    artisanOption: {
        width: '100%',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    artisanText: {
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 20,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        alignItems: 'center',
        width: '100%',
    },
    cancelButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default OrderView;
