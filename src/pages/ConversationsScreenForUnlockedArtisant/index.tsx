// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';

// const ConversationsScreen = ({ navigation }: any) => {
//     const [conversations, setConversations] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [role, setRole] = useState('');
//     const isFocused = useIsFocused();

//     useEffect(() => {
//         const fetchConversations = async () => {
//             setLoading(true);
//             const token = await getToken();
//             const newUser: any = await getUser();
//             setRole(JSON.parse(newUser)?.role);
//             console.log('role', role);

//             if (!token) return;

//             const headers = new Headers();
//             headers.append("Content-Type", "application/json");
//             headers.append("Authorization", `Bearer ${token}`);

//             try {
//                 const res = await fetch(
//                     Constants.expoConfig?.extra?.apiUrl as string,
//                     {
//                         method: "POST",
//                         headers,
//                         body: JSON.stringify({
//                             query: `
//                             query getDirectedLeads {
//                                 getDirectedLeads {
//                                     id
//                                     title
//                                     description
//                                     status
//                                     directLeadStatus
//                                     images
//                                     owner {
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     professionals {
//                                         id
//                                         text
//                                         img
//                                     }
//                                     artisantId {
//                                         id
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     artisantUnlockedLead {
//                                         id
//                                     }
//                                     location
//                                 }
//                             }
//                             `,
//                         }),
//                     }
//                 );

//                 const response = await res.json();
//                 setConversations(response?.data?.getDirectedLeads);
//                 setLoading(false); // Turn off loading
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         };

//         fetchConversations();
//     }, [isFocused]);

//     const renderConversationItem = ({ item }: any) => {
//         const profileImage = item?.images[0];
//         const name = item?.title;

//         return (
//             <TouchableOpacity
//                 style={styles.conversationItem}
//                 onPress={async () => {
//                     try {
//                         const conversationId: any = await createOrRetrieveConversation(
//                             item?.id,
//                             item?.artisantId?.id,
//                             item?.owner?.id
//                         );

//                         if (role === 'user') {
//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 userId: item?.owner?.id,
//                                 userName: item?.owner?.firstName,
//                                 order: item
//                             });
//                         } else {
//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 userId: item?.artisantId?.id,
//                                 userName: item?.artisantId.firstName,
//                                 order: item
//                             });
//                         }
//                     } catch (error) {
//                         console.log('error', error);
//                     }
//                 }}
//             >
//                 <View style={styles.profileContainer}>
//                     {profileImage ? (
//                         <Image
//                             source={{ uri: profileImage }}
//                             style={styles.profileImage}
//                         />
//                     ) : (
//                         <View style={styles.defaultProfileImage}>
//                             <Text style={styles.defaultProfileText}>
//                                 {name.charAt(0)}
//                             </Text>
//                         </View>
//                     )}

//                     <View style={styles.conversationTextContainer}>
//                         <Text style={styles.conversationTitle}>
//                             {name}
//                         </Text>
//                         <Text style={styles.lastMessage}>
//                             {item?.lastMsg || 'No recent message'}
//                         </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {/* Professional Header for Orders */}
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>
//                     Direct Leads
//                 </Text>
//             </View>

//             {/* Loading Indicator */}
//             {loading ? (
//                 <ActivityIndicator size="large" color="#0000ff" />
//             ) : conversations?.length > 0 ? (
//                 <FlatList
//                     data={conversations}
//                     renderItem={renderConversationItem}
//                     keyExtractor={(item: any) => item.id.toString()}
//                 />
//             ) : (
//                 <Text style={styles.noConversationsText}>No conversations available.</Text>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     header: {
//         padding: 16,
//         backgroundColor: '#f4f4f4',
//         alignItems: 'flex-start',
//         marginBottom: 16,

//     },
//     headerText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//     },
//     conversationItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
//     },
//     conversationTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     lastMessage: {
//         fontSize: 14,
//         color: '#777',
//     },
//     profileContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     profileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 15,
//     },
//     defaultProfileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#ddd',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 15,
//     },
//     defaultProfileText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
//     noConversationsText: {
//         textAlign: 'center',
//         marginTop: 20,
//         fontSize: 16,
//         color: '#777',
//     },
// });

// export default ConversationsScreen;


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
    console.log('====================================');
    console.log('order', order);
    console.log('====================================');
    const renderArtisantItem = ({ item }: any) => {
        const profileImage = item?.imageProfile;
        console.log('item brooooooooo 1', item);

        return (
            <TouchableOpacity
                style={styles.artisantItem}
                onPress={async () => {
                    // Navigate to Chat with the selected artisant
                    try {

                        console.log('====================================');
                        console.log('role', role);
                        console.log('====================================');
                        if (role === 'user') {
                            const conversationId: any = await createOrRetrieveConversation(
                                order?.id,
                                item?.id,
                                order?.owner?.id
                            );

                            navigation.navigate('Chat', {
                                conversationId,
                                userId: order?.owner?.id,
                                userName: order?.owner?.firstName,
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
                                userId: item?.id,
                                userName: item?.firstName,
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

    console.log('====================================');
    console.log('leads', leads);
    console.log('====================================');

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
