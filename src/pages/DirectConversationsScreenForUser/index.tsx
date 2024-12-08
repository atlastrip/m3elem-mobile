// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
// // import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// // import { getToken, getUser } from '@/helpers/getToken';
// // import Constants from 'expo-constants';
// // import { useIsFocused } from '@react-navigation/native';

// // const DirectConversationsScreenForUser = ({ navigation }: any) => {
// //     const [conversations, setConversations] = useState([]);
// //     const [loading, setLoading] = useState(false);
// //     const [role, setRole] = useState('');
// //     const isFocused = useIsFocused();

// //     useEffect(() => {
// //         const fetchConversations = async () => {
// //             setLoading(true);
// //             const token = await getToken();
// //             const newUser: any = await getUser();
// //             setRole(JSON.parse(newUser)?.role);
// //             console.log('role', role);

// //             if (!token) return;

// //             const headers = new Headers();
// //             headers.append("Content-Type", "application/json");
// //             headers.append("Authorization", `Bearer ${token}`);

// //             try {
// //                 const res = await fetch(
// //                     Constants.expoConfig?.extra?.apiUrl as string,
// //                     {
// //                         method: "POST",
// //                         headers,
// //                         body: JSON.stringify({
// //                             query: `
// //                             query getDirectedLeadsForUser {
// //                                 getDirectedLeadsForUser {
// //                                     id
// //                                     title
// //                                     description
// //                                     status
// //                                     directLeadStatus
// //                                     images
// //                                     owner {
// //                                         id
// //                                         firstName
// //                                         lastName
// //                                         pushToken
// //                                         imageProfile
// //                                         images {
// //                                             id 
// //                                             source
// //                                         }
// //                                     }
// //                                     professionals {
// //                                         id
// //                                         text
// //                                         img
// //                                     }
// //                                     artisantId {
// //                                         id
// //                                         firstName
// //                                         lastName
// //                                         pushToken
// //                                         imageProfile
// //                                         images {
// //                                             id 
// //                                             source
// //                                         }
// //                                     }
// //                                     artisantUnlockedLead {
// //                                         id
// //                                     }
// //                                     location
// //                                 }
// //                             }
// //                             `,
// //                         }),
// //                     }
// //                 );

// //                 const response = await res.json();
// //                 console.log('response', response?.data?.getDirectedLeadsForUser);

// //                 setConversations(response?.data?.getDirectedLeadsForUser);
// //                 setLoading(false); // Turn off loading
// //             } catch (error) {
// //                 console.log(error);
// //                 setLoading(false);
// //             }
// //         };

// //         fetchConversations();
// //     }, [isFocused]);

// //     const renderConversationItem = ({ item }: any) => {
// //         const profileImage = item?.images[0];
// //         const name = item?.title;
// //         console.log('====================================');
// //         console.log('item yooooooooo', item);
// //         console.log('item name', item.name);
// //         console.log('====================================');

// //         return (
// //             <TouchableOpacity
// //                 style={styles.conversationItem}
// //                 onPress={async () => {
// //                     try {
// //                         const conversationId: any = await createOrRetrieveConversation(
// //                             item?.id,
// //                             item?.artisantId?.id,
// //                             item?.owner?.id
// //                         );


// //                         if (role === 'user') {
// //                             navigation.navigate('Chat', {
// //                                 conversationId,
// //                                 userId: item?.artisantId?.id,
// //                                 userName: item?.owner?.id,
// //                                 order: item
// //                             });
// //                         } else {
// //                             navigation.navigate('Chat', {
// //                                 conversationId,
// //                                 userId: item?.owner?.id,
// //                                 userName: item?.artisantId.id,
// //                                 order: item
// //                             });
// //                         }
// //                     } catch (error) {
// //                         console.log('error', error);
// //                     }
// //                 }}
// //             >
// //                 <View style={styles.profileContainer}>
// //                     {profileImage ? (
// //                         <Image
// //                             source={{ uri: profileImage }}
// //                             style={styles.profileImage}
// //                         />
// //                     ) : (
// //                         <View style={styles.defaultProfileImage}>
// //                             <Text style={styles.defaultProfileText}>
// //                                 {name?.charAt(0) || 'U'}
// //                             </Text>
// //                         </View>
// //                     )}

// //                     <View style={styles.conversationTextContainer}>
// //                         <Text style={styles.conversationTitle}>
// //                             {name}
// //                         </Text>
// //                         <Text style={styles.lastMessage}>
// //                             {item?.lastMsg || 'No recent message'}
// //                         </Text>
// //                     </View>
// //                 </View>
// //             </TouchableOpacity>
// //         );
// //     };

// //     return (
// //         <View style={styles.container}>
// //             {/* Professional Header for Orders */}
// //             <View style={styles.header}>
// //                 <Text style={styles.headerText}>
// //                     Direct Leads
// //                 </Text>
// //             </View>

// //             {/* Loading Indicator */}
// //             {loading ? (
// //                 <ActivityIndicator size="large" color="#0000ff" />
// //             ) : conversations?.length > 0 ? (
// //                 <FlatList
// //                     data={conversations}
// //                     renderItem={renderConversationItem}
// //                     keyExtractor={(item: any) => item.id.toString()}
// //                 />
// //             ) : (
// //                 <Text style={styles.noConversationsText}>No conversations available.</Text>
// //             )}
// //         </View>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: {
// //         flex: 1,
// //         padding: 16,
// //     },
// //     header: {
// //         padding: 16,
// //         backgroundColor: '#f4f4f4',
// //         alignItems: 'flex-start',
// //         marginBottom: 16,

// //     },
// //     headerText: {
// //         fontSize: 22,
// //         fontWeight: 'bold',
// //     },
// //     conversationItem: {
// //         padding: 15,
// //         borderBottomWidth: 1,
// //         borderBottomColor: '#ddd',
// //     },
// //     conversationTitle: {
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     lastMessage: {
// //         fontSize: 14,
// //         color: '#777',
// //     },
// //     profileContainer: {
// //         flexDirection: 'row',
// //         alignItems: 'center',
// //     },
// //     profileImage: {
// //         width: 50,
// //         height: 50,
// //         borderRadius: 25,
// //         marginRight: 15,
// //     },
// //     defaultProfileImage: {
// //         width: 50,
// //         height: 50,
// //         borderRadius: 25,
// //         backgroundColor: '#ddd',
// //         justifyContent: 'center',
// //         alignItems: 'center',
// //         marginRight: 15,
// //     },
// //     defaultProfileText: {
// //         color: '#fff',
// //         fontSize: 18,
// //         fontWeight: 'bold',
// //     },
// //     conversationTextContainer: {
// //         flex: 1,
// //     },
// //     noConversationsText: {
// //         textAlign: 'center',
// //         marginTop: 20,
// //         fontSize: 16,
// //         color: '#777',
// //     },
// // });

// // export default DirectConversationsScreenForUser;


// import React, { useEffect, useState, useCallback } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';

// const DirectConversationsScreenForUser = ({ navigation }: any) => {
//     const [conversations, setConversations] = useState<any[]>([]);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [refreshing, setRefreshing] = useState<boolean>(false);
//     const [role, setRole] = useState<string>('');
//     const isFocused = useIsFocused();

//     const fetchConversations = useCallback(async () => {
//         setLoading(true);
//         const token = await getToken();
//         const newUser: any = await getUser();
//         setRole(JSON.parse(newUser)?.role);

//         if (!token) {
//             setLoading(false);
//             return;
//         }

//         const headers = new Headers();
//         headers.append("Content-Type", "application/json");
//         headers.append("Authorization", `Bearer ${token}`);

//         try {
//             const res = await fetch(
//                 Constants.expoConfig?.extra?.apiUrl as string,
//                 {
//                     method: "POST",
//                     headers,
//                     body: JSON.stringify({
//                         query: `
//                         query getDirectedLeadsForUser {
//                             getDirectedLeadsForUser {
//                                 id
//                                 title
//                                 description
//                                 status
//                                 directLeadStatus
//                                 images
//                                 owner {
//                                     id
//                                     firstName
//                                     lastName
//                                     pushToken
//                                     imageProfile
//                                     images {
//                                         id 
//                                         source
//                                     }
//                                 }
//                                 professionals {
//                                     id
//                                     text
//                                     img
//                                 }
//                                 artisantId {
//                                     id
//                                     firstName
//                                     lastName
//                                     pushToken
//                                     imageProfile
//                                     images {
//                                         id 
//                                         source
//                                     }
//                                 }
//                                 artisantUnlockedLead {
//                                     id
//                                 }
//                                 location
//                             }
//                         }
//                         `,
//                     }),
//                 }
//             );

//             const response = await res.json();
//             if (response.errors) {
//                 throw new Error(response.errors[0].message);
//             }
//             setConversations(response?.data?.getDirectedLeadsForUser || []);
//         } catch (error) {
//             console.error('Error fetching conversations:', error);
//         } finally {
//             setLoading(false);
//             setRefreshing(false);
//         }
//     }, []);

//     useEffect(() => {
//         if (isFocused) {
//             fetchConversations();
//         }
//     }, [isFocused, fetchConversations]);

//     const handleRefresh = useCallback(() => {
//         setRefreshing(true);
//         fetchConversations();
//     }, [fetchConversations]);

//     const navigateToChat = useCallback(async (item: any) => {
//         try {
//             const conversationId: any = await createOrRetrieveConversation(
//                 item?.id,
//                 item?.artisantId?.id,
//                 item?.owner?.id
//             );

//             const chatParams = {
//                 conversationId,
//                 userId: role === 'user' ? item?.artisantId?.id : item?.owner?.id,
//                 userName: role === 'user' ? item?.owner?.id : item?.artisantId?.id,
//                 order: item
//             };

//             navigation.navigate('Chat', chatParams);
//         } catch (error) {
//             console.error('Error navigating to chat:', error);
//         }
//     }, [role, navigation]);

//     const renderConversationItem = useCallback(({ item }: any) => {
//         const profileImage = item?.images[0];
//         const name = item?.title;

//         return (
//             <TouchableOpacity
//                 style={styles.conversationItem}
//                 onPress={() => navigateToChat(item)}
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
//                                 {name?.charAt(0)?.toUpperCase() || 'U'}
//                             </Text>
//                         </View>
//                     )}

//                     <View style={styles.conversationTextContainer}>
//                         <Text style={styles.conversationTitle} numberOfLines={1}>
//                             {name}
//                         </Text>
//                         <Text style={styles.lastMessage} numberOfLines={1}>
//                             {item?.lastMsg || 'No recent message'}
//                         </Text>
//                     </View>
//                 </View>
//                 <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
//             </TouchableOpacity>
//         );
//     }, [navigateToChat]);

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>
//                     Direct Leads
//                 </Text>
//             </View>

//             {loading && !refreshing ? (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size="large" color="#0000ff" />
//                 </View>
//             ) : conversations.length > 0 ? (
//                 <FlatList
//                     data={conversations}
//                     renderItem={renderConversationItem}
//                     keyExtractor={(item: any) => item.id.toString()}
//                     refreshControl={
//                         <RefreshControl
//                             refreshing={refreshing}
//                             onRefresh={handleRefresh}
//                             colors={['#0000ff']}
//                         />
//                     }
//                     contentContainerStyle={styles.listContent}
//                 />
//             ) : (
//                 <View style={styles.noConversationsContainer}>
//                     <Ionicons name="chatbubbles-outline" size={48} color="#A0A0A0" />
//                     <Text style={styles.noConversationsText}>No direct leads available.</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F7FA',
//     },
//     header: {
//         padding: 16,
//         backgroundColor: '#FFFFFF',
//         borderBottomWidth: 1,
//         borderBottomColor: '#E5E9F0',
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: '#2E3A59',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     listContent: {
//         paddingHorizontal: 16,
//     },
//     conversationItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 16,
//         backgroundColor: '#FFFFFF',
//         borderRadius: 12,
//         marginTop: 12,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 3,
//     },
//     conversationTitle: {
//         fontSize: 16,
//         fontWeight: '600',
//         color: '#2E3A59',
//     },
//     lastMessage: {
//         fontSize: 14,
//         color: '#8F9BB3',
//         marginTop: 4,
//     },
//     profileContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         flex: 1,
//     },
//     profileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 16,
//     },
//     defaultProfileImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#E5E9F0',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 16,
//     },
//     defaultProfileText: {
//         color: '#2E3A59',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
//     noConversationsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     noConversationsText: {
//         marginTop: 16,
//         fontSize: 16,
//         color: '#8F9BB3',
//         textAlign: 'center',
//     },
// });

// export default DirectConversationsScreenForUser;


import React, { useEffect, useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
  Animated,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { useIsFocused, useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { format, isToday, isYesterday } from 'date-fns';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const DirectConversationsScreenForUser = ({ navigation }: any) => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [role, setRole] = useState<string>('');
  const isFocused = useIsFocused();
  const scrollY = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets()
  const fetchConversations = useCallback(async () => {
    setLoading(true);
    const token = await getToken();
    const newUser: any = await getUser();
    setRole(JSON.parse(newUser)?.role);

    if (!token) {
      setLoading(false);
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
            query getDirectedLeadsForUser {
              getDirectedLeadsForUser {
                id
                title
                description
                status
                directLeadStatus
                images
                owner {
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
                professionals {
                  id
                  text
                  img
                }
                artisantId {
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
                artisantUnlockedLead {
                  id
                }
                location
                createdAt
                lastMsg
              }
            }
            `,
          }),
        }
      );

      const response = await res.json();
      if (response.errors) {
        throw new Error(response.errors[0].message);
      }
      setConversations(response?.data?.getDirectedLeadsForUser || []);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      Alert.alert('Error', 'Failed to fetch conversations. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchConversations();
    }, [fetchConversations])
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConversations();
  }, [fetchConversations]);

  const navigateToChat = useCallback(async (item: any) => {
    try {
      const conversationId: any = await createOrRetrieveConversation(
        item?.id,
        item?.artisantId?.id,
        item?.owner?.id
      );

      const chatParams = {
        conversationId,
        userId: role === 'user' ? item?.artisantId?.id : item?.owner?.id,
        userName: role === 'user' ? item?.owner?.id : item?.artisantId?.id,
        order: item
      };

      navigation.navigate('Chat', chatParams);
    } catch (error) {
      console.error('Error navigating to chat:', error);
      Alert.alert('Error', 'Failed to open chat. Please try again.');
    }
  }, [role, navigation]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return format(date, 'HH:mm');
    } else if (isYesterday(date)) {
      return 'Yesterday';
    } else {
      return format(date, 'MMM d');
    }
  };

  const renderConversationItem = useCallback(({ item, index }: any) => {
    const profileImage = item?.images[0];
    const name = item?.title;
    const formattedDate = formatDate(item?.createdAt);

    const inputRange = [-1, 0, 100 * index, 100 * (index + 2)];
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0.9],
    });
    const opacity = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0],
    });

    return (
      <Animated.View style={[styles.conversationItemContainer, { opacity, transform: [{ scale }] }]}>
        <TouchableOpacity
          style={styles.conversationItem}
          onPress={() => navigateToChat(item)}
          activeOpacity={0.7}
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
                  {name?.charAt(0)?.toUpperCase() || 'U'}
                </Text>
              </View>
            )}

            <View style={styles.conversationTextContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.conversationTitle} numberOfLines={1}>
                  {name}
                </Text>
                <Text style={styles.dateText}>{formattedDate}</Text>
              </View>
              <Text style={styles.lastMessage} numberOfLines={2}>
                {item?.lastMsg || 'No recent message'}
              </Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
        </TouchableOpacity>
      </Animated.View>
    );
  }, [navigateToChat, scrollY]);

  const ListEmptyComponent = useCallback(() => (
    <View style={styles.noConversationsContainer}>
      <Ionicons name="chatbubbles-outline" size={48} color="#A0A0A0" />
      <Text style={styles.noConversationsText}>No direct Contacts available.</Text>
      <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh}>
        <Text style={styles.refreshButtonText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  ), [handleRefresh]);

  const ListHeaderComponent = useCallback(() => (
    <View style={styles.listHeader}>
      <Text style={styles.listHeaderText}>Recent Conversations</Text>
    </View>
  ), []);

  return (
    <View style={{
      ...styles.container

    }

    }
    >
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      {/* <View style={styles.header}>
        <Text style={styles.headerText}>Direct Contacts</Text>
      </View> */}
      <View style={{
        ...styles.header,
        paddingTop: Platform.OS === 'ios' ? insets.top + 10 : 0,
      }}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#2E3A59" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Direct Contacts</Text>
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <AnimatedFlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item: any) => item.id.toString()}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#0000ff']}
              tintColor="#0000ff"
            />
          }
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={ListEmptyComponent}
          //   ListHeaderComponent={ListHeaderComponent}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },

  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3A59',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3A59',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E3A59',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  conversationItemContainer: {
    marginTop: 12,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3A59',
    flex: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#8F9BB3',
  },
  lastMessage: {
    fontSize: 14,
    color: '#8F9BB3',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  defaultProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E9F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  defaultProfileText: {
    color: '#2E3A59',
    fontSize: 18,
    fontWeight: 'bold',
  },
  conversationTextContainer: {
    flex: 1,
  },
  noConversationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  noConversationsText: {
    marginTop: 16,
    fontSize: 16,
    color: '#8F9BB3',
    textAlign: 'center',
  },
  refreshButton: {
    marginTop: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0000ff',
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  listHeader: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
    marginBottom: 8,
  },
  listHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E3A59',
  },
});

export default DirectConversationsScreenForUser;

