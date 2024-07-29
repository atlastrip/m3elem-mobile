import OrderListing, { LocationView } from '@/components/OrderLising';
import { getToken, getUser } from '@/helpers/getToken';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { COLORS, SHADOWS } from 'constants/theme';
import React, { useEffect, useRef, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Constants from 'expo-constants';

const dummyOrders = [
  {
    id: 1,
    title: "I want create new home",
    description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
    user: {
      fullName: 'Hello brother',
      phone: '+212666-811678'
    },
    professions: [
      { name: 'Electrician', text: 'Electrical work', id: 'e1' },
      { name: 'Plumber', text: 'Plumbing', id: 'p1' },
    ],
    images: [
      'https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpainting.1b635af6.jpg&w=828&q=75',
      "https://m3elem.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fgeometric_painted_walls.37658c7c.jpg&w=750&q=75"
    ],
    locationType: 'address',
    locationDetails: '123 Main St, Springfield',
  },
  {
    id: 2,
    title: "I want create new home",
    description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
    user: {
      fullName: 'Hello brother',
      phone: '+212666-811678'
    },
    professions: [
      { name: 'Painter', text: 'Painting', id: 'pa1' },
    ],
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuHmLQ148g25uFSMzLqm_P-i0haDhV9n756w&s',
      // 'https://example.com/image4.jpg',
    ],
    locationType: 'zipCode',
    locationDetails: '90210',
  },
  {
    id: 3,
    title: "I want create new home",
    description: "I want create new home using one of the best artisans in morocco can you help me please im in casablanca",
    user: {
      fullName: 'Hello brother',
      phone: '+212666-811678'
    },
    professions: [
      { name: 'Gardener', text: 'Gardening', id: 'g1' },
      { name: 'Cleaner', text: 'Cleaning', id: 'c1' },
    ],
    images: [
      'https://cdn-s-www.bienpublic.com/images/23485D24-4CF5-4D97-9B5B-E2A6F209D927/NW_raw/apres-la-saison-de-reproduction-des-oiseaux-et-avant-la-pousse-d-ete-c-est-la-periode-ideale-les-tailler-les-haies-photo-adobe-stock-1686751307.jpg',
      'https://fr.jardins-animes.com/images/outils-jardinage.jpg',
      "https://i-dj.unimedias.fr/2023/09/12/djadechet-vert-tailleas-650022e24b664.jpg?auto=format%2Ccompress&crop=faces&cs=tinysrgb&fit=max&w=1050"
    ],
    locationType: 'currentLocation',
    locationDetails: {
      latitude: 37.7749,
      longitude: -122.4194,
    },
  },
];


const MyLeads = ({ navigation }: any) => {
  const [SelectedType, setSelectedType] = useState("Accepted leads");
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [user, setUser] = useState<any>();







  const getLeads = async () => {

    const token = await getToken();
    const user: any = await getUser();
    // setUser(user);
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
      setLoading(true);
      const res = await fetch(
        Constants.expoConfig?.extra?.apiUrl as string,
        {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: `
                    query getAcceptedLeadsThatMatchUserProfessionals {
                        getAcceptedLeadsThatMatchUserProfessionals {
                                id
                                title
                                description
                                status
                                images
                                owner {
                                id
                                leads {
                                    id
                                }
                                firstName
                                lastName
                                phone
                                imageProfile
                                }
                                professionals {
                                id
                                text
                                img
                                }
                                artisantUnlockedLead {
                                id
                                }
                                location
                            }
                            }

                    `,

          }),
        }
      );

      const json = await res.json();

      setLeads(json.data.getAcceptedLeadsThatMatchUserProfessionals);


      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      Alert.alert("error", JSON.stringify(err.message, undefined, 2));
      // Alert.alert(json?.detail);
    }
  }




  useEffect(() => {
    getLeads();
  }, [isFocused]);




  const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: elementIndex * WINDOW_WIDTH, animated: true });
    }
  };
  const scrollViewRef1 = useRef<any>(null);
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View>
          <Image source={require('./images/abstract.avif')} className='w-full h-64' />
          <View className='absolute bottom-3 px-3 w-full'>
            <Text className='text-5xl font-bold text-white ' >
              My leads
            </Text>
          </View>
        </View>
        <View className="flex-row my-3 justify-center">
          <View style={SHADOWS.medium} className="flex-row justify-center p-1 rounded-full bg-gray-50">
            <TouchableOpacity
              onPress={() => {
                setSelectedType('Accepted leads');
                scrollToElement(scrollViewRef1, 0)
              }}
              style={(SelectedType === "Accepted leads") ? { backgroundColor: COLORS.primary } : {}}
              className="w-44 p-1 rounded-full ">
              <Text className="text-lg font-bold text-center">
                Accepted leads
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setSelectedType('Direct leads');
                scrollToElement(scrollViewRef1, 1)
              }}
              style={(SelectedType === "Direct leads") ? { backgroundColor: COLORS.primary } : {}}
              className="w-44 p-1 rounded-full ">
              <Text className="text-lg font-bold text-center">
                Direct leads
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          ref={scrollViewRef1}
          snapToInterval={WINDOW_WIDTH} // Snaps at each element width
          decelerationRate="fast"
          // scrollEnabled={!!SelectedProfession}
          onScroll={(event) => {
            if (event.nativeEvent.contentOffset.x >= WINDOW_WIDTH) {
              setSelectedType("Direct leads")
            } else {
              setSelectedType("Accepted leads")
            }
          }}
          style={{ flex: 1 }} horizontal >

          <View className="px-3" style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
            {leads.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* <Text style={styles.orderId}>Order #{order.id}</Text> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderViewUser', { order })}
                >
                  <Text style={styles.orderId}>{order.title}</Text>
                  <Text >{order.description}</Text>
                  <Text style={styles.label}>Images:</Text>
                  <ScrollView
                    horizontal>
                    {order.images.map((image:any, index:any) => (
                      <Image
                        key={index + Math.random()} source={{ uri: image }} style={styles.image} />
                    ))}
                  </ScrollView>
                  <Text style={styles.label}>Location:</Text>
                  <LocationView navigation={navigation} order={order} />
                </TouchableOpacity>

              </View>
            ))}

          </View>
          <View style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
            <View className="px-3" style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
              {leads.reverse().map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  {/* <Text style={styles.orderId}>Order #{order.id}</Text> */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('OrderViewUser', { order })}
                  >
                    <Text style={styles.orderId}>{order.title}</Text>
                    <Text >{order.description}</Text>
                    <Text style={styles.label}>Images:</Text>
                    <ScrollView
                      horizontal>
                      {order.images.map((image:any, index:any) => (
                        <Image
                          key={index + Math.random()} source={{ uri: image }} style={styles.image} />
                      ))}
                    </ScrollView>
                    <Text style={styles.label}>Location:</Text>
                    <LocationView order={order} />
                  </TouchableOpacity>

                </View>
              ))}

            </View>
          </View>
        </ScrollView>

        <View
          style={{
            height: 30,
          }}
        />
      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 8,
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  orderId: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 8,
  },
  professionList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  professionItem: {
    marginRight: 12,
    marginBottom: 12,
  },
  professionName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  professionText: {
    fontSize: 12,
    color: 'grey',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  locationDetail: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
  map: {
    height: 150,
    borderRadius: 8,
    marginVertical: 8,
  },
});


export default MyLeads