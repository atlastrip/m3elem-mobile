// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { BlurView } from 'expo-blur';
// import { Feather } from '@expo/vector-icons';
// import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
// import Constants from 'expo-constants';
// import { getToken } from '@/helpers/getToken';

// export default function CreateAccountForArtisant({ navigation }: any) {
//   const [service, setService] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [categories, setCategories] = useState([]);
//   const [filteredCategories, setFilteredCategories] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [location, setLocation]:any = useState(null);
//   const [error, setError]:any = useState(null);


//   const buttonScale = useSharedValue(1);



//   const GetCategories = async () => {
//     const token = await getToken();
//     const headers = new Headers({
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`,
//     });

//     try {
//       setLoading(true);
//       const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//         method: 'POST',
//         headers,
//         body: JSON.stringify({
//           query: `
//         query getCategoriesAsString {
//           getCategoriesAsString{
//             categoriesAsString
//           }
//         }
//       `
//         }),
//       });

//       const data = await response.json();
//       setLoading(false);
//       const cat = JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString)?.map((c: any) => c.name);
//       setCategories(cat);
//       setFilteredCategories(cat);
//     } catch (error: any) {
//       setLoading(false);
//       Alert.alert("Error", error.message);
//     }
//   }

//   useEffect(() => {
//     GetCategories();
//   }, []);

//   useEffect(() => {
//     if (service) {
//       const filtered = categories.filter((category: any) =>
//         category.toLowerCase().includes(service.toLowerCase())
//       );
//       setFilteredCategories(filtered);
//     } else {
//       setFilteredCategories(categories);
//     }
//   }, [service, categories]);

//   const handleServiceChange = (text: any) => {
//     setService(text);
//     setShowCategories(true);
//   };

//   const handleCategorySelect = (category: any) => {
//     setService(category);
//     setShowCategories(false);
//   };

//   const animatedButtonStyle = useAnimatedStyle(() => ({
//     transform: [{ scale: buttonScale.value }],
//   }));

//   const handlePressIn = () => {
//     buttonScale.value = withSpring(0.95);
//   };

//   const handlePressOut = () => {
//     buttonScale.value = withSpring(1);
//   };




//   const fetchLocation = async (zip: string) => {
//     try {
//       const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
//       if (!response.ok) {
//         throw new Error("Invalid zip code");
//       }
//       const data = await response.json();
//       const city:any = data.places[0]["place name"];
//       const state:any = data.places[0]["state abbreviation"];
//       setLocation({ city, state });
//       setError(null);
//     } catch (err: any) {
//       setLocation(null);
//       setError(err?.message as string);
//     }
//   };

//   return (
//     <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
//       <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
//         <BlurView intensity={100} style={styles.blurContainer}>
//           <Text style={styles.title}>A House Guru</Text>
//           <Text style={styles.subtitle}>Get more jobs in your area</Text>
//           <View style={styles.inputContainer}>
//             <Feather name="briefcase" size={20} color="#4CAF50" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="What service do you provide?"
//               placeholderTextColor="#999"
//               value={service}
//               onChangeText={handleServiceChange}
//               onFocus={() => setShowCategories(true)}
//             />
//           </View>
//           {showCategories && (
//             <ScrollView style={styles.categoriesContainer}>
//               {filteredCategories.map((category, index) => (
//                 <TouchableOpacity
//                   key={index}
//                   style={styles.categoryItem}
//                   onPress={() => handleCategorySelect(category)}
//                 >
//                   <Text style={styles.categoryText}>{category}</Text>
//                 </TouchableOpacity>
//               ))}
//             </ScrollView>
//           )}
//           <View style={styles.inputContainer}>
//             <Feather name="map-pin" size={20} color="#4CAF50" style={styles.inputIcon} />
//             <TextInput
//               style={styles.input}
//               placeholder="Zip code"
//               placeholderTextColor="#999"
//               value={zipCode}
//               onChangeText={setZipCode}
//               keyboardType="numeric"
//             />
//           </View>
//           <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => navigation.navigate('CreateAccountForArtisantNextPage')}
//               onPressIn={handlePressIn}
//               onPressOut={handlePressOut}
//             >
//               <LinearGradient
//                 colors={['#4CAF50', '#45a049']}
//                 start={{ x: 0, y: 0 }}
//                 end={{ x: 1, y: 1 }}
//                 style={styles.buttonGradient}
//               >
//                 <Text style={styles.buttonText}>Sign up for free</Text>
//               </LinearGradient>
//             </TouchableOpacity>
//           </Animated.View>
//         </BlurView>
//       </Animated.View>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   content: {
//     width: '90%',
//     maxWidth: 400,
//   },
//   blurContainer: {
//     borderRadius: 20,
//     overflow: 'hidden',
//     padding: 20,
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     color: '#fff',
//     textAlign: 'center',
//     textShadowColor: 'rgba(0, 0, 0, 0.1)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   subtitle: {
//     fontSize: 18,
//     marginBottom: 30,
//     color: '#e0e0e0',
//     textAlign: 'center',
//   },
//   inputContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 10,
//     marginBottom: 15,
//     paddingHorizontal: 15,
//   },
//   inputIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     height: 50,
//     color: '#333',
//     fontSize: 16,
//   },
//   categoriesContainer: {
//     maxHeight: 150,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   categoryItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(0, 0, 0, 0.1)',
//   },
//   categoryText: {
//     fontSize: 16,
//     color: '#333',
//   },
//   buttonContainer: {
//     overflow: 'hidden',
//     borderRadius: 10,
//     marginTop: 10,
//   },
//   button: {
//     width: '100%',
//     height: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonGradient: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });



import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Feather } from '@expo/vector-icons';
import Animated, { FadeIn, FadeOut, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';

export default function CreateAccountForArtisant({ navigation }: any) {
  const [service, setService] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [location, setLocation]:any = useState(null);
  const [error, setError]:any = useState(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const buttonScale = useSharedValue(1);

  const GetCategories = async () => {
    const token = await getToken();
    const headers = new Headers({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    });

    try {
      setLoading(true);
      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            query getCategoriesAsString {
              getCategoriesAsString{
                categoriesAsString
              }
            }
          `
        }),
      });

      const data = await response.json();
      setLoading(false);
      const cat = JSON.parse(data?.data?.getCategoriesAsString?.categoriesAsString);
      setCategories(cat);
      setFilteredCategories(cat);
    } catch (error: any) {
      setLoading(false);
      Alert.alert("Error", error.message);
    }
  }

  useEffect(() => {
    GetCategories();
  }, []);

  useEffect(() => {
    if (service) {
      const filtered = categories.filter((category: any) =>
        category.name.toLowerCase().includes(service.toLowerCase())
      );
      setFilteredCategories(filtered);
    } else {
      setFilteredCategories(categories);
    }
  }, [service, categories]);

  const handleServiceChange = (text: string) => {
    setService(text);
    setShowCategories(true);
  };

  const handleCategorySelect = (category: any) => {
    setService(category.name);
    setSelectedCategoryId(category.id);
    setShowCategories(false);
  };

  const animatedButtonStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const handlePressIn = () => {
    buttonScale.value = withSpring(0.95);
  };

  const handlePressOut = () => {
    buttonScale.value = withSpring(1);
  };

  const fetchLocation = async (zip: string) => {
    try {
      const response = await fetch(`https://api.zippopotam.us/us/${zip}`);
      if (!response.ok) {
        throw new Error("Invalid zip code");
      }
      const data = await response.json();
      const city = data.places[0]["place name"];
      const state = data.places[0]["state abbreviation"];
      setLocation({ city, state });
      setError(null);
    } catch (err: any) {
      setLocation(null);
      setError(err?.message as string);
    }
  };

  useEffect(() => {
    if (zipCode.length === 5) {
      fetchLocation(zipCode);
    } else {
      setLocation(null);
      setError(null);
    }
  }, [zipCode]);

  const handleSignUp = () => {
    if (!selectedCategoryId || !zipCode || zipCode.length !== 5 || !location) {
      Alert.alert("Error", "Please select a valid category and enter a valid zip code.");
      return;
    }
    navigation.navigate('CreateAccountForArtisantNextPage', { categoryId: selectedCategoryId, zipCode });
  };

  return (
    <LinearGradient colors={['#4CAF50', '#2E7D32']} style={styles.container}>
      <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.content}>
        <BlurView intensity={100} style={styles.blurContainer}>
          <Text style={styles.title}>A House Guru</Text>
          <Text style={styles.subtitle}>Get more jobs in your area</Text>
          <View style={styles.inputContainer}>
            <Feather name="briefcase" size={20} color="#4CAF50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="What service do you provide?"
              placeholderTextColor="#999"
              value={service}
              onChangeText={handleServiceChange}
              onFocus={() => setShowCategories(true)}
            />
          </View>
          {showCategories && (
            <ScrollView style={styles.categoriesContainer}>
              {filteredCategories.map((category:any) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryItem}
                  onPress={() => handleCategorySelect(category)}
                >
                  <Text style={styles.categoryText}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
          <View style={styles.inputContainer}>
            <Feather name="map-pin" size={20} color="#4CAF50" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Zip code"
              placeholderTextColor="#999"
              value={zipCode}
              onChangeText={setZipCode}
              keyboardType="numeric"
              maxLength={5}
            />
          </View>
          {error && (
            <Text style={styles.errorText}>{error}</Text>
          )}
          {location && (
            <Text style={styles.locationText}>
              {location.city}, {location.state}
            </Text>
          )}
          <Animated.View style={[styles.buttonContainer, animatedButtonStyle]}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleSignUp}
              onPressIn={handlePressIn}
              onPressOut={handlePressOut}
            >
              <LinearGradient
                colors={['#4CAF50', '#45a049']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Sign up for free</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animated.View>
        </BlurView>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '90%',
    maxWidth: 400,
  },
  blurContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 30,
    color: '#e0e0e0',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#333',
    fontSize: 16,
  },
  categoriesContainer: {
    maxHeight: 150,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    overflow: 'hidden',
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF6347',
    fontSize: 14,
    marginBottom: 10,
    textAlign: 'center',
  },
  locationText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});