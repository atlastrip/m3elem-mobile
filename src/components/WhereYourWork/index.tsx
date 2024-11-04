// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
// import { WebView } from 'react-native-webview';
// import Constants from 'expo-constants';
// import { getToken } from '@/helpers/getToken';
// import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';

// interface StateType {
//     state: string;
//     counties: County[];
// }

// interface Area {
//     name: string;
//     zipcodes: string[];
// }

// interface County {
//     name: string;
//     areas: Area[];
// }

// interface User {
//     id: string;
//     zipCodeUI: string;
//     miles: string;
//     zipCodeHome: string;
// }

// interface UserData {
//     user: User;
// }

// interface GraphQLResponse<T> {
//     data: T;
//     errors?: any;
// }

// const WhereYourWork = () => {
//     const [newToken, setNewToken] = useState('');
//     const [isLoading, setIsLoading] = useState(true);
//     const [error, setError]: any = useState(null);
//     const [data, setData] = useState<StateType[]>([]);
//     const [userData, setUserData] = useState<UserData | null>(null);

//     const getUserData = async () => {
//         try {
//             const token = await getToken();
//             const headers = new Headers({
//                 'Content-Type': 'application/json',
//                 Authorization: `Bearer ${token}`,
//             });

//             const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
//                 method: 'POST',
//                 headers,
//                 body: JSON.stringify({
//                     query: `
//             query {
//               user {
//                 id
//                 zipCodeUI
//                 miles
//                 zipCodeHome
//               }
//             }
//           `,
//                 }),
//             });

//             const responseData: GraphQLResponse<UserData> = await response.json();
//             console.log('User data response', responseData.data);

//             if (responseData.data && responseData.data.user) {
//                 setUserData(responseData.data);

//                 const zipCodeUI = responseData.data.user.zipCodeUI;
//                 if (zipCodeUI) {
//                     const parsedData: StateType[] = JSON.parse(zipCodeUI);
//                     setData(parsedData);
//                 } else {
//                     console.error('zipCodeUI is undefined');
//                 }
//             } else {
//                 console.error('Invalid response data');
//             }
//         } catch (error) {
//             console.error('Error fetching user data:', error);
//             setError(error);
//         }
//     };

//     const handleGetToken = async () => {
//         try {
//             const token: any = await getToken();
//             console.log('Token retrieved:', token);
//             setNewToken(token);
//         } catch (err: any) {
//             console.log('Error getting token:', err);
//             setError(err);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             setIsLoading(true);
//             await Promise.all([handleGetToken(), getUserData()]);
//             setIsLoading(false);
//         };
//         fetchData();
//     }, []);

//     if (isLoading) {
//         return (
//             <View style={styles.center}>
//                 <ActivityIndicator size="large" color="#0000ff" />
//                 <Text>Loading...</Text>
//             </View>
//         );
//     }

//     if (error) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.errorText}>
//                     An error occurred: {error.message || JSON.stringify(error)}
//                 </Text>
//             </View>
//         );
//     }

//     if (!newToken) {
//         return (
//             <View style={styles.center}>
//                 <Text style={styles.errorText}>Token not provided.</Text>
//             </View>
//         );
//     }

//     // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
//     if (userData && userData.user && userData.user.zipCodeUI) {
//         // zipCodeUI exists, show RenderZipCodesFromBackendUI
//         return (
//             <RenderZipCodesFromBackendUI
//                 data={data}
//                 userData={userData}
//             />
//         );
//     } else {
//         // zipCodeUI does not exist, show WebView
//         return (
//             <WebView
//                 style={styles.container}
//                 source={{
//                     uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}`,
//                 }}
//                 onNavigationStateChange={(navState: any) => {
//                     const url = navState.url;
//                     console.log('WebView URL changed to: ', url);
//                     if (url.includes('thankyou')) {
//                         // After 'thankyou', refetch user data to update the UI
//                         getUserData();
//                     }
//                 }}
//                 onError={(syntheticEvent: any) => {
//                     const { nativeEvent } = syntheticEvent;
//                     console.error('WebView error: ', nativeEvent);
//                     setError(nativeEvent);
//                 }}
//                 startInLoadingState={true}
//                 javaScriptEnabled={true}
//                 domStorageEnabled={true}
//                 originWhitelist={['https://*', 'http://*']}
//                 renderLoading={() => (
//                     <View style={styles.center}>
//                         <ActivityIndicator size="large" color="#0000ff" />
//                         <Text>Loading WebView...</Text>
//                     </View>
//                 )}
//             />
//         );
//     }
// };

// export default WhereYourWork;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         // marginTop: Constants.statusBarHeight,
//     },
//     center: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 16,
//     },
// });


// WhereYourWork.tsx

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import Constants from 'expo-constants';
import { getToken } from '@/helpers/getToken';
import RenderZipCodesFromBackendUI from '../RenderZipCodesFromBackendUI';

interface StateType {
  state: string;
  counties: County[];
}

interface Area {
  name: string;
  zipcodes: string[];
}

interface County {
  name: string;
  areas: Area[];
}

interface User {
  id: string;
  zipCodeUI: string;
  miles: string;
  zipCodeHome: string;
}

interface UserData {
  user: User;
}

interface GraphQLResponse<T> {
  data: T;
  errors?: any;
}

const WhereYourWork = () => {
  const [newToken, setNewToken] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]: any = useState(null);
  const [data, setData] = useState<StateType[]>([]);
  const [userData, setUserData] = useState<UserData | null>(null);

  const getUserData = async () => {
    try {
      const token = await getToken();
      const headers = new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      });

      const response = await fetch(Constants.expoConfig?.extra?.apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          query: `
            query {
              user {
                id
                zipCodeUI
                miles
                zipCodeHome
              }
            }
          `,
        }),
      });

      const responseData: GraphQLResponse<UserData> = await response.json();
      console.log('User data response', responseData.data);

      if (responseData.data && responseData.data.user) {
        setUserData(responseData.data);

        const zipCodeUI = responseData.data?.user?.zipCodeUI;
        if (zipCodeUI) {
          const parsedData: StateType[] = JSON.parse(zipCodeUI);
          setData(parsedData);
        } else {
        //   console.error('zipCodeUI is undefined');
        }
      } else {
        console.error('Invalid response data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setError(error);
    }
  };

  const handleGetToken = async () => {
    try {
      const token: any = await getToken();
      console.log('Token retrieved:', token);
      setNewToken(token);
    } catch (err: any) {
      console.log('Error getting token:', err);
      setError(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([handleGetToken(), getUserData()]);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          An error occurred: {error.message || JSON.stringify(error)}
        </Text>
      </View>
    );
  }

  if (!newToken) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Token not provided.</Text>
      </View>
    );
  }

  // Decide whether to show WebView or RenderZipCodesFromBackendUI based on userData
  if (userData && userData?.user && userData?.user?.zipCodeUI) {
    // zipCodeUI exists, show RenderZipCodesFromBackendUI
    return (
      <RenderZipCodesFromBackendUI
        data={data}
        userData={userData}
        setUserData={setUserData}
      />
    );
  } else {
    // zipCodeUI does not exist, show WebView
    return (
      <WebView
        style={styles.container}
        source={{
          uri: `https://www.m3alempro.com/en/zipcodes/zip-code-finder?token=${newToken}?webView=true`,
        }}
        onNavigationStateChange={(navState: any) => {
          const url = navState.url;
          console.log('WebView URL changed to: ', url);
          if (url.includes('thankyou')) {
            // After 'thankyou', refetch user data to update the UI
            getUserData();
          }
        }}
        onError={(syntheticEvent: any) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          setError(nativeEvent);
        }}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={['https://*', 'http://*']}
        renderLoading={() => (
          <View style={styles.center}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Loading WebView...</Text>
          </View>
        )}

        cacheEnabled={true}
        scrollEnabled={true}
        nestedScrollEnabled={true}
        androidHardwareAccelerationDisabled={false}
        renderToHardwareTextureAndroid={true}
        overScrollMode="always"
        contentMode="mobile"
        allowsInlineMediaPlayback={true}
        useWebKit={true}
        javaScriptCanOpenWindowsAutomatically={true}
      />
    );
  }
};

export default WhereYourWork;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    // Adjust the background color if needed
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
