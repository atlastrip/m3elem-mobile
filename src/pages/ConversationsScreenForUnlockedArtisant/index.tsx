import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { getUser } from '@/helpers/getToken';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ConversationsScreenForUnlockedArtisant = ({ route, navigation }: any) => {
    const { leads, order } = route.params;

    const [role, setRole] = React.useState('');
    
    

    const getRole = async () => {
        const newUser: any = await getUser();
        setRole(JSON.parse(newUser)?.role);
    }

    React.useEffect(() => {
        getRole();
    }, []);
    const renderArtisantItem = ({ item }: any) => {
        const profileImage = item?.imageProfile;
        // console.log('item brooooooooo 1', item);

        return (
            <TouchableOpacity
                style={styles.artisantItem}
                onPress={async () => {
                    // Navigate to Chat with the selected artisant
                    try {

                        // console.log('====================================');
                        console.log('role', role);
                        // console.log('====================================');
                        if (role === 'user') {
                            const conversationId: any = await createOrRetrieveConversation(
                                order?.id,
                                item?.id,
                                order?.owner?.id
                            );

                            navigation.navigate('Chat', {
                                conversationId,
                                userId: item?.id,
                                userName: order?.owner?.id,
                                order: {
                                    ...order, artisantId: item
                                }
                            });
                            return;
                        } else {
                            const conversationId: any = await createOrRetrieveConversation(
                                order?.id,
                                item?.id,
                                order?.owner?.id
                            );

                            navigation.navigate('Chat', {
                                conversationId,
                                // userId: item?.id,
                                userId: order?.owner?.id,
                                userName: item?.id,
                                order: {
                                    ...order, artisantId: item
                                }
                            });
                            return;
                        }
                        // const conversationId: any = await createOrRetrieveConversation(
                        //     order?.id,
                        //     item?.id,
                        //     order?.owner?.id
                        // );

                        // navigation.navigate('Chat', {
                        //     conversationId,
                        //     userId: item?.id,
                        //     userName: item?.firstName,
                        //     order: {
                        //         ...order, artisantId: item
                        //     }
                        // });
                    } catch (error) {
                        console.log('error', error);
                    }
                }}
            >
                <View style={styles.profileContainer}>
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.defaultProfileImage}>
                            <Text style={styles.defaultProfileText}>
                                {item?.firstName?.charAt(0)}
                            </Text>
                        </View>
                    )}

                    <View style={styles.conversationTextContainer}>
                        <Text style={styles.conversationTitle}>
                            {item?.firstName} {item?.lastName}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    // console.log('====================================');
    // console.log('leads', leads);
    // console.log('====================================');

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Unlocked Artisans</Text>
            <FlatList
                data={leads}
                renderItem={renderArtisantItem}
                keyExtractor={(item: any) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    artisantItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    defaultProfileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#ddd',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    defaultProfileText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    conversationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    conversationTextContainer: {
        flex: 1,
    },
});

export default ConversationsScreenForUnlockedArtisant;
