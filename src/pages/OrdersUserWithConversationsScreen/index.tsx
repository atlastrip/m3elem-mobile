// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
// // import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// // import { getToken, getUser } from '@/helpers/getToken';
// // import Constants from 'expo-constants';
// // import { useIsFocused } from '@react-navigation/native';

// // const OrdersUserWithConversationsScreen = ({ navigation }: any) => {
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
// //             // console.log('role', role);

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
// //                             query getLeadsForUser {
// //                                 getLeadsForUser {
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
// //                                         firstName
// //                                         lastName
// //                                         pushToken
// //                                         imageProfile
// //                                         images {
// //                                             id 
// //                                             source
// //                                         }
// //                                     }
// //                                     location
// //                                     createdAt
// //                                 }
// //                             }
// //                             `,
// //                         }),
// //                     }
// //                 );

// //                 const response = await res.json();
// //                 setConversations(response?.data?.getLeadsForUser);
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
// //         // console.log('item', item);
        
// //         return (
// //             <TouchableOpacity
// //                 style={styles.conversationItem}
// //                 onPress={() => {
// //                     // Navigate to ConversationScreen and pass the artisantUnlockedLead
// //                     navigation.navigate('ConversationsScreenForUnlockedArtisant', {
// //                         leads: item?.artisantUnlockedLead, // Passing artisantUnlockedLead
// //                         order: item, // You can pass the order for additional context
// //                     });
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
// //                                 {name?.charAt(0)}
// //                             </Text>
// //                         </View>
// //                     )}

// //                     <View style={styles.conversationTextContainer}>
// //                         <Text style={styles.conversationTitle}>
// //                             {name}
// //                         </Text>
// //                         <Text style={styles.lastMessage}>
// //                             {item?.createdAt?.split('T')[0]}
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
// //                     Leads
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
// //                 <Text style={styles.noConversationsText}>No Leads available.</Text>
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

// // export default OrdersUserWithConversationsScreen;


// import React, { useEffect, useState } from 'react';
// import {
//     View,
//     Text,
//     FlatList,
//     TouchableOpacity,
//     StyleSheet,
//     Image,
//     ActivityIndicator,
//     ScrollView
// } from 'react-native';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { useIsFocused } from '@react-navigation/native';

// const OrdersUserWithConversationsScreen = ({ navigation }: any) => {
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
//             // console.log('role', role);

//             if (!token) {
//                 setLoading(false);
//                 return;
//             }

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
//                             query getLeadsForUser {
//                                 getLeadsForUser {
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
//                                         firstName
//                                         lastName
//                                         pushToken
//                                         imageProfile
//                                         images {
//                                             id 
//                                             source
//                                         }
//                                     }
//                                     location
//                                     createdAt
//                                 }
//                             }
//                             `,
//                         }),
//                     }
//                 );

//                 const response = await res.json();
//                 setConversations(response?.data?.getLeadsForUser);
//                 setLoading(false); // Turn off loading
//             } catch (error) {
//                 console.log(error);
//                 setLoading(false);
//             }
//         };

//         fetchConversations();
//     }, [isFocused]);

//     const renderProfessionals = (professionals: any[]) => {
//         return (
//             <View style={styles.professionalsContainer}>
//                 {professionals.map((pro) => (
//                     <View key={pro.id} style={styles.professionalCard}>
//                         {pro.img ? (
//                             <Image source={{ uri: pro.img }} style={styles.professionalImage} />
//                         ) : (
//                             <View style={styles.defaultProfessionalImage}>
//                                 <Text style={styles.defaultProfessionalText}>
//                                     {pro.text?.charAt(0)}
//                                 </Text>
//                             </View>
//                         )}
//                         <Text style={styles.professionalName}>{pro.text}</Text>
//                     </View>
//                 ))}
//             </View>
//         );
//     };

//     const renderConversationItem = ({ item }: any) => {
//         const profileImage = item?.images[0]?.source;
//         const name = item?.title;
//         const artisantUnlockedLead = item?.artisantUnlockedLead;

//         return (
//             <TouchableOpacity
//                 style={styles.card}
//                 onPress={() => {
//                     // Navigate to ConversationScreen and pass the artisantUnlockedLead
//                     navigation.navigate('ConversationsScreenForUnlockedArtisant', {
//                         leads: artisantUnlockedLead, // Passing artisantUnlockedLead
//                         order: item, // You can pass the order for additional context
//                     });
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
//                                 {name?.charAt(0)}
//                             </Text>
//                         </View>
//                     )}

//                     <View style={styles.conversationTextContainer}>
//                         <Text style={styles.conversationTitle}>
//                             {name}
//                         </Text>
//                         <Text style={styles.createdAt}>
//                             {new Date(item?.createdAt).toLocaleDateString()}
//                         </Text>
//                     </View>
//                 </View>

//                 {/* Artisant Unlocked Lead Section */}
//                 <View style={styles.artisantContainer}>
//                     {artisantUnlockedLead && artisantUnlockedLead.length > 0 ? (
//                         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//                             {artisantUnlockedLead.map((pro: any) => (
//                                 <View key={pro.id} style={styles.artisantCard}>
//                                     {pro.imageProfile ? (
//                                         <Image
//                                             source={{ uri: pro.imageProfile }}
//                                             style={styles.artisantImage}
//                                         />
//                                     ) : (
//                                         <View style={styles.defaultArtisantImage}>
//                                             <Text style={styles.defaultArtisantText}>
//                                                 {pro.firstName.charAt(0)}
//                                             </Text>
//                                         </View>
//                                     )}
//                                     <Text style={styles.artisantName}>
//                                         {`${pro.firstName} ${pro.lastName}`}
//                                     </Text>
//                                 </View>
//                             ))}
//                         </ScrollView>
//                     ) : (
//                         <View style={styles.noArtisantContainer}>
//                             <Text style={styles.noArtisantText}>No professionals available.</Text>
//                         </View>
//                     )}
//                 </View>
//             </TouchableOpacity>
//         );
//     };

//     return (
//         <View style={styles.container}>
//             {/* Professional Header for Orders */}
//             <View style={styles.header}>
//                 <Text style={styles.headerText}>
//                     Leads
//                 </Text>
//             </View>

//             {/* Loading Indicator */}
//             {loading ? (
//                 <View style={styles.loadingContainer}>
//                     <ActivityIndicator size="large" color="#0000ff" />
//                 </View>
//             ) : conversations?.length > 0 ? (
//                 <FlatList
//                     data={conversations}
//                     renderItem={renderConversationItem}
//                     keyExtractor={(item: any) => item.id.toString()}
//                     contentContainerStyle={styles.listContent}
//                 />
//             ) : (
//                 <View style={styles.noConversationsContainer}>
//                     <Text style={styles.noConversationsText}>No Leads available.</Text>
//                 </View>
//             )}
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//         backgroundColor: '#fff',
//     },
//     header: {
//         paddingVertical: 20,
//         paddingHorizontal: 10,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 8,
//         marginBottom: 16,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 4,
//         elevation: 2,
//     },
//     headerText: {
//         fontSize: 24,
//         fontWeight: '700',
//         color: '#333',
//     },
//     loadingContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     listContent: {
//         paddingBottom: 20,
//     },
//     card: {
//         backgroundColor: '#fff',
//         borderRadius: 10,
//         padding: 15,
//         marginBottom: 15,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 1 },
//         shadowOpacity: 0.1,
//         shadowRadius: 3,
//         elevation: 2,
//     },
//     profileContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     profileImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         marginRight: 15,
//     },
//     defaultProfileImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: '#bbb',
//         justifyContent: 'center',
//         alignItems: 'center',
//         marginRight: 15,
//     },
//     defaultProfileText: {
//         color: '#fff',
//         fontSize: 24,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
//     conversationTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: '#333',
//     },
//     createdAt: {
//         fontSize: 14,
//         color: '#666',
//         marginTop: 4,
//     },
//     artisantContainer: {
//         marginTop: 15,
//     },
//     artisantCard: {
//         alignItems: 'center',
//         marginRight: 15,
//     },
//     artisantImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//     },
//     defaultArtisantImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         backgroundColor: '#ccc',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     defaultArtisantText: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     artisantName: {
//         marginTop: 5,
//         fontSize: 14,
//         color: '#333',
//         textAlign: 'center',
//         maxWidth: 70,
//     },
//     noArtisantContainer: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     noArtisantText: {
//         fontSize: 16,
//         color: '#777',
//     },
//     noConversationsContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     noConversationsText: {
//         fontSize: 18,
//         color: '#777',
//     },
//     professionalsContainer: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//     },
//     professionalCard: {
//         width: 80,
//         alignItems: 'center',
//         marginRight: 10,
//         marginBottom: 10,
//     },
//     professionalImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//     },
//     defaultProfessionalImage: {
//         width: 60,
//         height: 60,
//         borderRadius: 30,
//         backgroundColor: '#888',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     defaultProfessionalText: {
//         color: '#fff',
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     professionalName: {
//         marginTop: 5,
//         fontSize: 12,
//         color: '#333',
//         textAlign: 'center',
//     },
// });

// export default OrdersUserWithConversationsScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { getToken, getUser } from '@/helpers/getToken';
import Constants from 'expo-constants';
import { useIsFocused } from '@react-navigation/native';
import { format } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

const OrdersUserWithConversationsScreen = ({ navigation }: any) => {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const fetchConversations = async () => {
    setLoading(true);
    const token = await getToken();
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
              query getLeadsForUser {
                getLeadsForUser {
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
                  }
                  artisantUnlockedLead {
                    id
                    firstName
                    lastName
                    imageProfile
                  }
                  location
                  createdAt
                }
              }
            `,
          }),
        }
      );

      const response = await res.json();
      setConversations(response?.data?.getLeadsForUser);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchConversations();
    }
  }, [isFocused]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchConversations();
  };

  const renderConversationItem = ({ item }: any) => {
    const profileImage = item?.images[0];
    const name = item?.title;
    const artisantUnlockedLead = item?.artisantUnlockedLead;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => {
          navigation.navigate('ConversationsScreenForUnlockedArtisant', {
            leads: artisantUnlockedLead,
            order: item,
          });
        }}
      >
        <View style={styles.cardContent}>
          <View style={styles.profileContainer}>
            {profileImage ? (
              <Image
                source={{ uri: profileImage }}
                style={styles.profileImage}
              />
            ) : (
              <View style={styles.defaultProfileImage}>
                <Text style={styles.defaultProfileText}>
                  {name?.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.conversationTextContainer}>
              <Text style={styles.conversationTitle} numberOfLines={1}>
                {name}
              </Text>
              <Text style={styles.createdAt}>
                {format(new Date(item?.createdAt), 'MMM d, yyyy')}
              </Text>
            </View>
          </View>
          {artisantUnlockedLead && (
            <View style={styles.artisantContainer}>
              {artisantUnlockedLead.map((artisant: any) => (
                <Image
                  key={artisant.id}
                  source={{ uri: artisant.imageProfile }}
                  style={styles.artisantImage}
                />
              ))}
            </View>
          )}
        </View>
        <Ionicons name="chevron-forward" size={24} color="#A0A0A0" style={styles.chevron} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Leads</Text>
      </View>
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : conversations?.length > 0 ? (
        <FlatList
          data={conversations}
          renderItem={renderConversationItem}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      ) : (
        <View style={styles.noConversationsContainer}>
          <Text style={styles.noConversationsText}>No Leads available.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2E3A59',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  defaultProfileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E5E9F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  defaultProfileText: {
    color: '#2E3A59',
    fontSize: 20,
    fontWeight: 'bold',
  },
  conversationTextContainer: {
    flex: 1,
  },
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3A59',
  },
  createdAt: {
    fontSize: 14,
    color: '#8F9BB3',
    marginTop: 4,
  },
  artisantContainer: {
    flexDirection: 'row',
    marginTop: 12,
  },
  artisantImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  chevron: {
    marginRight: 16,
  },
  noConversationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noConversationsText: {
    fontSize: 16,
    color: '#8F9BB3',
  },
});

export default OrdersUserWithConversationsScreen;

