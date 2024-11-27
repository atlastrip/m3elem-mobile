// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
// import { getUser } from '@/helpers/getToken';
// import React from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

// const ConversationsScreenForUnlockedArtisant = ({ route, navigation }: any) => {
//     const { leads, order } = route.params;

//     const [role, setRole] = React.useState('');
    
    

//     const getRole = async () => {
//         const newUser: any = await getUser();
//         setRole(JSON.parse(newUser)?.role);
//     }

//     React.useEffect(() => {
//         getRole();
//     }, []);
//     const renderArtisantItem = ({ item }: any) => {
//         const profileImage = item?.imageProfile;
//         // console.log('item brooooooooo 1', item);

//         return (
//             <TouchableOpacity
//                 style={styles.artisantItem}
//                 onPress={async () => {
//                     // Navigate to Chat with the selected artisant
//                     try {

//                         // console.log('====================================');
//                         console.log('role', role);
//                         // console.log('====================================');
//                         if (role === 'user') {
//                             const conversationId: any = await createOrRetrieveConversation(
//                                 order?.id,
//                                 item?.id,
//                                 order?.owner?.id
//                             );

//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 userId: item?.id,
//                                 userName: order?.owner?.id,
//                                 order: {
//                                     ...order, artisantId: item
//                                 }
//                             });
//                             return;
//                         } else {
//                             const conversationId: any = await createOrRetrieveConversation(
//                                 order?.id,
//                                 item?.id,
//                                 order?.owner?.id
//                             );

//                             navigation.navigate('Chat', {
//                                 conversationId,
//                                 // userId: item?.id,
//                                 userId: order?.owner?.id,
//                                 userName: item?.id,
//                                 order: {
//                                     ...order, artisantId: item
//                                 }
//                             });
//                             return;
//                         }
//                         // const conversationId: any = await createOrRetrieveConversation(
//                         //     order?.id,
//                         //     item?.id,
//                         //     order?.owner?.id
//                         // );

//                         // navigation.navigate('Chat', {
//                         //     conversationId,
//                         //     userId: item?.id,
//                         //     userName: item?.firstName,
//                         //     order: {
//                         //         ...order, artisantId: item
//                         //     }
//                         // });
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
//                                 {item?.firstName?.charAt(0)}
//                             </Text>
//                         </View>
//                     )}

//                     <View style={styles.conversationTextContainer}>
//                         <Text style={styles.conversationTitle}>
//                             {item?.firstName} {item?.lastName}
//                         </Text>
//                     </View>
//                 </View>
//             </TouchableOpacity>
//         );
//     };
//     return (
//         <View style={styles.container}>
//             <Text style={styles.headerText}>Unlocked Artisans</Text>
//             <FlatList
//                 data={leads}
//                 renderItem={renderArtisantItem}
//                 keyExtractor={(item: any) => item.id.toString()}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 16,
//     },
//     headerText: {
//         fontSize: 22,
//         fontWeight: 'bold',
//         marginBottom: 16,
//     },
//     artisantItem: {
//         padding: 15,
//         borderBottomWidth: 1,
//         borderBottomColor: '#ddd',
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
//     conversationTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
//     conversationTextContainer: {
//         flex: 1,
//     },
// });

// export default ConversationsScreenForUnlockedArtisant;


import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { getUser } from '@/helpers/getToken';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';

const ConversationsScreenForUnlockedArtisant = ({ route, navigation }: any) => {
  const { leads, order } = route.params;
  const [role, setRole] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getRole = useCallback(async () => {
    try {
      const newUser: any = await getUser();
      setRole(JSON.parse(newUser)?.role);
    } catch (error) {
      console.error('Error fetching user role:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getRole();
    }, [getRole])
  );

  const handleArtisantPress = useCallback(async (item: any) => {
    try {
      setLoading(true);
      const conversationId: any = await createOrRetrieveConversation(
        order?.id,
        item?.id,
        order?.owner?.id
      );

      const chatParams = {
        conversationId,
        userId: role === 'user' ? item?.id : order?.owner?.id,
        userName: role === 'user' ? order?.owner?.id : item?.id,
        order: {
          ...order,
          artisantId: item
        }
      };

      navigation.navigate('Chat', chatParams);
    } catch (error) {
      console.error('Error creating/retrieving conversation:', error);
    } finally {
      setLoading(false);
    }
  }, [role, order, navigation]);

  const renderArtisantItem = useCallback(({ item }: any) => {
    const profileImage = item?.imageProfile;

    return (
      <TouchableOpacity
        style={styles.artisantItem}
        onPress={() => handleArtisantPress(item)}
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
                {item?.firstName?.charAt(0).toUpperCase()}
              </Text>
            </View>
          )}
          <View style={styles.conversationTextContainer}>
            <Text style={styles.conversationTitle}>
              {item?.firstName} {item?.lastName}
            </Text>
            <Text style={styles.artisantSubtitle}>
              Unlocked Artisan
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={24} color="#A0A0A0" />
      </TouchableOpacity>
    );
  }, [handleArtisantPress]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Unlocked Artisans</Text>
      {leads && leads.length > 0 ? (
        <FlatList
          data={leads}
          renderItem={renderArtisantItem}
          keyExtractor={(item: any) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Ionicons name="people-outline" size={48} color="#A0A0A0" />
          <Text style={styles.emptyStateText}>No unlocked artisans available</Text>
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
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    color: '#2E3A59',
  },
  listContent: {
    paddingHorizontal: 16,
  },
  artisantItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
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
  conversationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E3A59',
  },
  artisantSubtitle: {
    fontSize: 14,
    color: '#8F9BB3',
    marginTop: 4,
  },
  conversationTextContainer: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#8F9BB3',
    marginTop: 16,
  },
});

export default ConversationsScreenForUnlockedArtisant;

