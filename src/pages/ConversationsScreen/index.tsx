import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image } from 'react-native';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
const ConversationsScreen = ({ navigation }: any) => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState('');
    const isFocused = useIsFocused();

    useEffect(() => {
        // Replace this with a real API call to fetch the conversations
        const fetchConversations = async () => {
            setLoading(true);
            const token = await getToken();
            const newUser: any = await getUser();
            setRole(JSON.parse(newUser)?.role);

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
                            query getorderForChats {
                            getorderForChats{
                                id
                                callOrWhatsappOrChat
                                lastMsg
                                owner {
                                id
                                firstName
                                lastName
                                pushToken
                                imageProfile
                                images{
                                    id 
                                    source
                                }
                                }
                                artisant {
                                id
                                firstName
                                lastName
                                pushToken
                                imageProfile
                                images {
                                    id 
                                    source
                                }
                                }
                            }
                            }
                
                
              `,
                        }),
                    }
                );

                const response = await res.json();

                setConversations(response?.data?.getorderForChats); // Assuming the response contains a conversations array

            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };

        fetchConversations();
    }, [isFocused]);

    const renderConversationItem = ({ item }: any) => {
        const profileImage =
            role === 'artisant'
                ? item?.owner?.imageProfile // Assuming profileImage is the key for the user's image
                : item?.artisant?.imageProfile; // Assuming profileImage is the key for the artisan's image

        const name =
            role === 'artisant'
                ? item?.owner?.firstName + " " + item?.owner?.lastName
                : item?.artisant?.firstName + " " + item?.artisant?.lastName;

        return (
            <TouchableOpacity
                style={styles.conversationItem}
                onPress={async () => {
                    try {
                        const conversationId: any = await createOrRetrieveConversation(
                            item?.id,
                            item?.artisant?.id,
                            item?.owner?.id
                        );

                        if (role == 'user') {
                            navigation.navigate('Chat', {
                                conversationId,
                                userId: item?.owner?.id,
                                userName: item?.owner?.firstName,
                                order: item
                            });
                            return;
                        } else {
                            navigation.navigate('Chat', {
                                conversationId,
                                userId: item?.artisant?.id,
                                userName: item?.artisant?.firstName,
                                order: item
                            });
                            return;
                        }
                    } catch (error) {
                        console.log('error', error);
                    }
                }}
            >
                <View style={styles.profileContainer}>
                    {/* Render Profile Image */}
                    {profileImage ? (
                        <Image
                            source={{ uri: profileImage }}
                            style={styles.profileImage}
                        />
                    ) : (
                        <View style={styles.defaultProfileImage}>
                            <Text style={styles.defaultProfileText}>
                                {name.charAt(0)} {/* First letter of name */}
                            </Text>
                        </View>
                    )}

                    {/* Conversation Info */}
                    <View style={styles.conversationTextContainer}>
                        <Text style={styles.conversationTitle}>
                            {name}
                        </Text>
                        <Text style={styles.lastMessage}>
                            {item?.lastMsg}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };


    return (
        <View style={styles.container}>
            {
                conversations?.length > 0 ? (
                    <FlatList
                        data={conversations}
                        renderItem={renderConversationItem}
                        keyExtractor={(item: any) => item.id.toString()}
                    />
                ) : (
                    <Text>No conversations</Text>
                )

            }

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    conversationItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    conversationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    lastMessage: {
        fontSize: 14,
        color: '#777',
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
    conversationTextContainer: {
        flex: 1,
    },
});

export default ConversationsScreen;
