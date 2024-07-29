import OrderListing, { LocationView } from '@/components/OrderLising';
import { WINDOW_HEIGHT, WINDOW_WIDTH } from '@gorhom/bottom-sheet';
import { COLORS, SHADOWS } from 'constants/theme';
import React, { useRef, useState } from 'react'
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Linking } from 'react-native';


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

const directLeads = [
  {
    user: {
      fullName: "Holla emortal",
      phone: "0666778899",
      isDone: false
    },
  },
  {
    user: {
      fullName: "Tiffany mira",
      phone: "0666098819",
      isDone: true
    },
  },
]

const MyLeads = ({ navigation }: any) => {

  const [SelectedType, setSelectedType] = useState("Accepted leads");
  const scrollToElement = (scrollViewRef: any, elementIndex: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: elementIndex * WINDOW_WIDTH, animated: true });
    }
  };
  const scrollViewRef1 = useRef<any>(null);
  const handlePhoneCall = (user: any) => {
    Linking.openURL('tel:' + user?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', ''));
  };

  const handleWhatsApp = (user: any) => {
    const url = 'whatsapp://send?phone=' + user?.phone?.split(' ')?.join('')?.split('-')?.join('')?.replace('+', '') + '&text=Hello';
    Linking.openURL(url).catch(() => {
      Alert.alert('Make sure WhatsApp is installed on your device');
    });
  };
  const handleDone = (user: any) => {
    Alert.alert("Mark this direct lead", "", [
      {
        text: "Spam",
        style: "destructive",
        onPress: () => {
        }
      }, {
        text: "Done",
        style: "default",
        onPress: () => {

        }
      },
      {
        text: "cancel",
        onPress: () => {
        }
      },
    ]);
  };
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
            {dummyOrders.reverse().map((order) => (
              <View key={order.id} style={styles.orderCard}>
                {/* <Text style={styles.orderId}>Order #{order.id}</Text> */}
                <TouchableOpacity
                  onPress={() => navigation.navigate('OrderView', { order })}
                >
                  <Text style={styles.orderId}>{order.title}</Text>
                  <Text >{order.description}</Text>
                  <Text style={styles.label}>Images:</Text>
                  <ScrollView
                    horizontal>
                    {order.images.map((image, index) => (
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
          <View style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
            <View className="px-3" style={{ width: WINDOW_WIDTH, flex: 1, minHeight: WINDOW_HEIGHT }} >
              {directLeads.map((order, i) => (
                <View key={i} style={styles.orderCard}>
                  <View className='flex-row justify-between '>
                    <View className='w-12 h-12 rounded-full bg-gray-400' ></View>
                    <View className='ml-3 flex-grow' >
                      <Text className='font-bold text-left text-lg' >
                        {order?.user?.fullName}
                      </Text>
                      <Text className='font-bold text-left text-lg ' >
                        {order?.user?.phone}
                      </Text>
                    </View>
                    <View className='flex-row items-center'>
                      <TouchableOpacity onPress={() => handleWhatsApp(order?.user)} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 mr-1 justify-center items-center rounded-lg'>
                        <Text className='font-bold text-full text-white' >
                          <Ionicons name="logo-whatsapp" size={18} />
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handlePhoneCall(order?.user)} style={{ backgroundColor: COLORS.primary }} className='w-10 h-10 justify-center items-center rounded-lg'>
                        <Text className='font-bold text-full text-white' >
                          <MaterialIcons name="phone" size={18} />
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View className='border-t-2 border-gray-100 py-1 mt-1  flex-row' >
                    <View className='w-1/2 border-r-2 border-gray-100' >
                      <Text className='text-center text-lg'>
                        Today • 12:30
                      </Text>
                    </View>
                    <View className='w-1/2 ' >
                      {!order?.user?.isDone ? (

                        <TouchableOpacity onPress={() => handleDone(order?.user)}>
                          <Text className='text-right underline text-primary-500 text-lg'>
                            Mark as
                          </Text>
                        </TouchableOpacity>
                      ) : (
                        <View className="flex-row items-end justify-end">

                          <Text className='text-right pb-0 mb-0 text-lg'>
                            Done
                          </Text>
                          <View className='text-right pb-1 justify-end text-lg'>
                            <MaterialIcons name="check" size={18} />
                          </View>
                        </View>
                      )}
                    </View>

                  </View>
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