// import OrderListing, { LocationView } from '@/components/OrderLising';
// import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
// import { COLORS, SHADOWS } from 'constants/theme';
// import React, { useEffect, useRef, useState } from 'react'
// import { Alert, Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { Ionicons, MaterialIcons } from '@expo/vector-icons';
// import { Linking } from 'react-native';
// import { getToken, getUser } from '@/helpers/getToken';
// import Constants from 'expo-constants';
// import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';


// const dummyOrders = [
//   {
//     id: 1,
//     title: "I want create new home",
//     description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//     user: {
//       fullName: 'Hello brother',
//       phone: '+212666-811678'
//     },
//     professions: [
//       { name: 'Electrician', text: 'Electrical work', id: 'e1' },
//       { name: 'Plumber', text: 'Plumbing', id: 'p1' },
//     ],
//     images: [
//       'https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpainting.1b635af6.jpg&w=828&q=75',
//       "https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgeometric_painted_walls.37658c7c.jpg&w=750&q=75"
//     ],
//     locationType: 'address',
//     locationDetails: '123 Main St, Springfield',
//   },
//   {
//     id: 2,
//     title: "I want create new home",
//     description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//     user: {
//       fullName: 'Hello brother',
//       phone: '+212666-811678'
//     },
//     professions: [
//       { name: 'Painter', text: 'Painting', id: 'pa1' },
//     ],
//     images: [
//       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHmLQ148g25uFSMzLqm_P-i0haDhV9n756w&s',
//       // 'https://example.com/image4.jpg',
//     ],
//     locationType: 'zipCode',
//     locationDetails: '90210',
//   },
//   {
//     id: 3,
//     title: "I want create new home",
//     description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
//     user: {
//       fullName: 'Hello brother',
//       phone: '+212666-811678'
//     },
//     professions: [
//       { name: 'Gardener', text: 'Gardening', id: 'g1' },
//       { name: 'Cleaner', text: 'Cleaning', id: 'c1' },
//     ],
//     images: [
//       'https://cdn-s-www.bienpublic.com/images/23485D24-4CF5-4D97-9B5B-E2A6F209D927/NW_raw/apres-la-saison-de-reproduction-des-oiseaux-et-avant-la-pousse-d-ete-c-est-la-periode-ideale-les-tailler-les-haies-photo-adobe-stock-1686751307.jpg',
//       'https://fr.jardins-animes.com/images/outils-jardinage.jpg',
//       "https://i-dj.unimedias.fr/2023/09/12/djadechet-vert-tailleas-650022e24b664.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
//     ],
//     locationType: 'currentLocation',
//     locationDetails: {
//       latitude: 37.7749,
//       longitude: -122.4194,
//     },
//   },
// ];



// function formatDateToReadable(createdAt: any) {
//   const date = new Date(createdAt);

//   const options: any = { hour: '2-digit', minute: '2-digit' };
//   const timeString = date.toLocaleTimeString([], options);

//   const now = new Date();
//   const isToday = date.toDateString() === now.toDateString();

//   return isToday ? `Today • ${timeString}` : date.toLocaleDateString() + ` • ${timeString}`;
// }

// const MyLeads = ({ navigation }: any) => {

//   const [SelectedType, setSelectedType] = useState("Accepted leads");
//   const [directLeads, setDirectLeads] = useState<any[]>([]);
//   const [leads, setLeads] = useState<any[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [isFocused, setIsFocused] = useState(false);
//   const [user, setUser] = useState<any>();
//   const [show, setShow] = useState(false);
//   const [selectedStatus, setSelectedStatus] = useState('');
//   const [selectedOrder, setSelectedOrder] = useState<any>();
//   const [role, setRole] = useState('');

//   const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
//     if (scrollViewRef.current) {
//       scrollViewRef.current.scrollTo({ x: elementIndex * WINDOW_WIDTH, animated: true });
//     }
//   };
//   const scrollViewRef1 = useRef<any>(null);
//   const handlePhoneCall = (user: any) => {
//     Linking.openURL('tel:' + user?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', ''));
//   };



//   const handleGetRole = async () => {
//     const user: any = await getUser();
//     setRole(JSON.parse(user)?.role);
//   }

//   useEffect(() => {
//     handleGetRole();
//   }, []);

//   const handleWhatsApp = async (order: any) => {
//     const artisant: any = await getUser();
//     const conversationId = await createOrRetrieveConversation(order?.orderId, JSON.parse(artisant)?.id, order?.order?.owner?.id);
//     navigation.navigate('Chat', {
//       conversationId, userId: JSON.parse(artisant)?.id, userName: JSON.parse(artisant)?.firstName, order: order?.order, role
//     });
//   };





//   const getDirectedLeads = async () => {

//     const token = await getToken();
//     const user: any = await getUser();
//     // setUser(user);

//     if (!token) {
//       return;
//     }
//     const headers = new Headers();
//     headers.append("Content-Type", "application/json");
//     headers.append("Authorization", `Bearer ${token}`);
//     try {
//       setLoading(true);
//       const res = await fetch(
//         Constants.expoConfig?.extra?.apiUrl as string,
//         {
//           method: "POST",
//           headers,
//           body: JSON.stringify({
//             query: `

//                 query getDirectedLeads {
//                   getDirectedLeads {
//                     id
//                     title
//                     description
//                     status
//                     directLeadStatus
//                     images
//                     owner {
//                         id
//                         firstName
//                         lastName
//                         pushToken
//                         imageProfile
//                         images{
//                             id 
//                             source
//                         }
//                         }
//                     professionals {
//                       id
//                       text
//                       img
//                     }
//                     artisantId{
//                         id
//                         firstName
//                         lastName
//                         pushToken
//                         imageProfile
//                         images {
//                             id 
//                             source
//                         }

//                     }
//                     artisantUnlockedLead {
//                       id
//                     }
//                     location
//                     createdAt
//                   }
//                 }

//                     `,

//           }),
//         }
//       );

//       const json = await res.json();


//       setDirectLeads(json?.data?.getDirectedLeads?.map((lead: any) => {
//         console.log('lead?.directLeadStatus', lead?.directLeadStatus);

//         return {
//           user: {
//             orderId: lead.id,
//             fullName: lead.owner.firstName + " " + lead.owner.lastName,
//             phone: lead.owner.phone,
//             image: lead.owner.imageProfile,
//             order: lead,
//             isDone: lead?.directLeadStatus,
//             createdAt: lead.createdAt
//           }
//         }
//       }));

//       setLoading(false);
//     } catch (err: any) {
//       setLoading(false);
//       Alert.alert("error", JSON.stringify(err.message, undefined, 2));
//       // Alert.alert(json?.detail);
//     }
//   }



//   useEffect(() => {
//     getDirectedLeads();
//   }, [isFocused]);





//   return (
//     <View style={{ flex: 1 }}>
//       <ScrollView style={{ flex: 1 }}>
//         <View>
//           <Image source={require('./images/abstract.avif')} className='w-full h-64' />
//           <View className='absolute bottom-3 px-3 w-full'>
//             <Text className='text-5xl font-bold text-white ' >
//               My leads
//             </Text>
//           </View>
//         </View>
//         <View className="flex-row my-3 justify-center">
//           <View style={SHADOWS.medium} className="flex-row justify-center p-1 rounded-full bg-gray-50">
//             {/* <TouchableOpacity
//               onPress={() => {
//                 setSelectedType('Accepted leads');
//                 scrollToElement(scrollViewRef1, 0)
//               }}
//               style={(SelectedType === "Accepted leads") ? { backgroundColor: COLORS.primary } : {}}
//               className="w-44 p-1 rounded-full ">
//               <Text className="text-lg font-bold text-center">
//                 Accepted leads
//               </Text>
//             </TouchableOpacity> */}
//             <TouchableOpacity
//               onPress={() => {
//                 setSelectedType('Direct leads');
//                 scrollToElement(scrollViewRef1, 1)
//               }}
//               style={(SelectedType === "Direct leads") ? { backgroundColor: COLORS.primary } : {}}
//               className="w-full p-1 rounded-full ">
//               <Text className="text-lg font-bold text-center">
//                 Direct leads
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//         <ScrollView
//           ref={scrollViewRef1}
//           snapToInterval={WINDOW_WIDTH} // Snaps at each element width
//           decelerationRate="fast"
//           // scrollEnabled={!!SelectedProfession}
//           onScroll={(event) => {
//             if (event.nativeEvent.contentOffset.x >= WINDOW_WIDTH) {
//               setSelectedType("Direct leads")
//             } else {
//               setSelectedType("Accepted leads")
//             }
//           }}
//           style={{ flex: 1 }} horizontal >

//           <View className="px-3" style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
//             {leads.reverse().map((order) => (
//               <View key={order.id} style={styles.orderCard}>
//                 {/* <Text style={styles.orderId}>Order #{order.id}</Text> */}
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate('OrderViewUser', { order })}
//                 >
//                   <Text style={styles.orderId}>{order.title}</Text>
//                   <Text >{order.description}</Text>
//                   <Text style={styles.label}>Images:</Text>
//                   <ScrollView
//                     horizontal>
//                     {order.images.map((image: any, index: any) => (
//                       <Image
//                         key={index + Math.random()} source={{ uri: image }} style={styles.image} />
//                     ))}
//                   </ScrollView>
//                   <Text style={styles.label}>Location:</Text>
//                   <LocationView order={order} />
//                 </TouchableOpacity>

//               </View>
//             ))}

//           </View>
//           <View style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
//             <View className="px-3" style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
//               {directLeads?.map((order: any, i) => (
//                 <View key={i} style={styles.orderCard}>
//                   <View className='flex-row justify-between '>
//                     {
//                       order?.user?.image ? (
//                         <Image source={{ uri: order?.user?.image }}
//                           className='w-12 h-12 rounded-full'
//                         />
//                       ) : (
//                         <View className='w-12 h-12 rounded-full bg-gray-400' ></View>
//                       )
//                     }
//                     <View className='ml-3 flex-grow' >
//                       <Text className='font-bold text-left text-lg' >
//                         {order?.user?.fullName?.length > 18 ? order?.user?.fullName?.substr(0, 18) + '...' : order?.user?.fullName}
//                       </Text>
//                       <Text className='font-bold text-left text-lg ' >
//                         {order?.user?.phone}
//                       </Text>
//                     </View>
//                     <View className='flex-row items-center'>
//                       <TouchableOpacity onPress={() => handleWhatsApp(order.user)} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 mr-1 justify-center items-center rounded-lg'>
//                         <Text className='font-bold text-full text-white' >
//                           <Ionicons name="chatbox" size={18} />
//                         </Text>
//                       </TouchableOpacity>
//                       <TouchableOpacity onPress={() => handlePhoneCall(order?.user)} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 justify-center items-center rounded-lg'>
//                         <Text className='font-bold text-full text-white' >
//                           <MaterialIcons name="phone" size={18} />
//                         </Text>
//                       </TouchableOpacity>
//                     </View>
//                   </View>

//                   <View className='border-t-2 border-gray-100 py-1 mt-1  flex-row' >
//                     <View className=' border-r-2 border-gray-100' >
//                       <Text className='text-center text-base'>

//                         {
//                           formatDateToReadable(order?.user?.createdAt)
//                         }
//                       </Text>
//                     </View>


//                   </View>
//                 </View>
//               ))}


//             </View>
//           </View>

//         </ScrollView>

//         <View
//           style={{
//             height: 30,
//           }}
//         />
//       </ScrollView>
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     backgroundColor: '#f5f5f5',
//   },
//   orderCard: {
//     backgroundColor: 'white',
//     padding: 16,
//     paddingBottom: 8,
//     borderRadius: 8,
//     marginBottom: 16,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   orderId: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginVertical: 8,
//   },
//   professionList: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   professionItem: {
//     marginRight: 12,
//     marginBottom: 12,
//   },
//   professionName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   professionText: {
//     fontSize: 12,
//     color: 'grey',
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//     marginRight: 8,
//   },
//   locationDetail: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: 'blue',
//   },
//   map: {
//     height: 150,
//     borderRadius: 8,
//     marginVertical: 8,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     width: '80%',
//     backgroundColor: 'white',
//     padding: 20,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   modalTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   statusOption: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     width: '100%',
//     alignItems: 'center',
//   },
//   statusText: {
//     fontSize: 16,
//   },
//   cancelButton: {
//     marginTop: 20,
//     padding: 10,
//     width: '100%',
//     backgroundColor: '#ccc',
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   cancelButtonText: {
//     fontSize: 16,
//   },
// });


// export default MyLeads
import React, { useEffect, useRef, useState } from 'react';
import { Alert, Dimensions, Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import { getToken, getUser } from '@/helpers/getToken';
import { createOrRetrieveConversation } from '@/helpers/createOrRetrieveConversation';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

// Constants
const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

// Theme
const theme = {
  colors: {
    primary: "#3a7f41",
    secondary: "#3a7f4120",
    background: '#f9f9f9',
    card: '#ffffff',
    text: '#333333',
    textLight: '#666666',
    border: '#e0e0e0',
    white: '#ffffff',
    error: '#ff3b30',
    success: '#4CAF50',
    gradientStart: 'rgba(0,0,0,0.8)',
    gradientEnd: 'rgba(0,0,0,0.1)',
  },
  fonts: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
  shadows: {
    small: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 6,
    },
  },
};

// Utility Functions
const formatDateToReadable = (createdAt: string) => {
  const date = new Date(createdAt);
  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const timeString = date.toLocaleTimeString([], options);
  const dateString = date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });

  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();

  return isToday ? `Today • ${timeString}` : `${dateString} • ${timeString}`;
};

const EnhancedMyLeads = ({ navigation }: { navigation: any }) => {
  const [directLeads, setDirectLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    handleGetRole();
    getDirectedLeads();
  }, []);

  const handleGetRole = async () => {
    const user: any = await getUser();
    setRole(JSON.parse(user)?.role);
  };

  const getDirectedLeads = async () => {
    const token = await getToken();
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch(Constants.expoConfig?.extra?.apiUrl as string, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          query: `
            query getDirectedLeads {
              getDirectedLeads {
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
                  phone
                  pushToken
                  imageProfile
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
                }
                artisantUnlockedLead {
                  id
                }
                location
                createdAt
              }
            }
          `
        }),
      });

      const json = await res.json();
      setDirectLeads(json?.data?.getDirectedLeads?.map((lead: any) => ({
        user: {
          orderId: lead.id,
          fullName: `${lead.owner.firstName} ${lead.owner.lastName}`,
          phone: lead.owner.phone,
          image: lead.owner.imageProfile,
          order: lead,
          isDone: lead?.directLeadStatus,
          createdAt: lead.createdAt
        }
      })));
    } catch (err: any) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneCall = (user: any) => {
    const phoneNumber = user?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = async (order: any) => {
    const artisant: any = await getUser();
    // console.log('====================================');
    console.log('role', role);
    // console.log('====================================');
    if (role === 'user') {
      const conversationId: any = await createOrRetrieveConversation(
        order?.orderId,
        JSON.parse(artisant)?.id,
        order?.order?.owner?.id
      );

      navigation.navigate('Chat', {
        conversationId,
        userId: JSON.parse(artisant)?.id,
        userName: order?.order?.owner?.id,
        order: {
          ...order?.order, artisantId: JSON.parse(artisant)?.id,
        }
      });
      return;
    } else {
      const conversationId: any = await createOrRetrieveConversation(
        order?.orderId,
        JSON.parse(artisant)?.id,
        order?.order?.owner?.id
      );

      navigation.navigate('Chat', {
        conversationId,
        // userId: item?.id,
        userId: order?.order?.owner?.id,
        userName: JSON.parse(artisant)?.id,
        order: {
          ...order?.order, artisantId: JSON.parse(artisant)
        }
      });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={styles.headerImageContainer}>
          <Image source={require('./images/abstract.avif')} style={styles.headerImage} />
          <LinearGradient
            colors={[theme.colors.gradientStart, theme.colors.gradientEnd]}
            style={styles.gradientOverlay}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>
              Direct Contact
            </Text>
          </View>
        </View>


        <View style={styles.leadsContainer}>
          {
            directLeads?.length === 0 && <View
            className='flex justify-center items-center '
            >
              <Text>
                No Direct Contact Found!
              </Text>
            </View>
          }
        </View>
        <View style={styles.leadsContainer}>
          {directLeads?.map((order: any, i) => (
            <View key={i} style={styles.leadCard}>
              <View style={styles.cardHeader}>
                {order?.user?.image ? (
                  <Image source={{ uri: order?.user?.image }} style={styles.userImage} />
                ) : (
                  <View style={styles.userImagePlaceholder} />
                )}
                <View style={styles.userInfo}>
                  <Text style={styles.userName} numberOfLines={1} ellipsizeMode="tail">
                    {order?.user?.fullName}
                  </Text>
                  <Text style={styles.userPhone}>{order?.user?.phone}</Text>
                </View>
                <View style={styles.actionButtonsContainer}>
                  <TouchableOpacity
                    onPress={() => handleWhatsApp(order.user)}
                    style={styles.actionButton}
                    accessibilityLabel="Chat with user"
                  >
                    <Ionicons name="chatbox" size={20} color={theme.colors.white} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handlePhoneCall(order?.user)}
                    style={styles.actionButton}
                    accessibilityLabel="Call user"
                  >
                    <MaterialIcons name="phone" size={20} color={theme.colors.white} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.cardBody}>
                <Text style={styles.leadTitle}>{order?.user?.order?.title}</Text>
                <Text style={styles.leadDescription} numberOfLines={2} ellipsizeMode="tail">
                  {order?.user?.order?.description}
                </Text>
              </View>
              <View style={styles.cardFooter}>
                <Text style={styles.dateText}>
                  {formatDateToReadable(order?.user?.createdAt)}
                </Text>

              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerImageContainer: {
    height: 180,
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  headerTextContainer: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    // backgroundColor: 'rgba(0,0,0,0.5)', // Removed for cleaner look
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.white,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  leadsContainer: {
    padding: 16,
  },
  leadCard: {
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    ...theme.shadows.medium,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  userImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.secondary,
  },
  userInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  userPhone: {
    fontSize: 14,
    color: theme.colors.textLight,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    ...theme.shadows.small,
  },
  cardBody: {
    marginTop: 16,
  },
  leadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  leadDescription: {
    fontSize: 14,
    color: theme.colors.textLight,
    lineHeight: 20,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // marginTop: 12,
  },
  dateText: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusDone: {
    backgroundColor: theme.colors.success + '20',
  },
  statusPending: {
    backgroundColor: theme.colors.error + '20',
  },
  statusText: {
    fontSize: 12,
    color: theme.colors.success,
    fontWeight: '600',
  },
});

export default EnhancedMyLeads;
