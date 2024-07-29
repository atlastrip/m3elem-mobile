import React from 'react';
// import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { AppRegistry } from 'react-native';
import Navigation from "./src/navigation";
import { Provider as ProviderRedux } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { User } from "./src/store";
// import { setContext } from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

const store: any = configureStore({
  reducer: {
    user: User,
  },
})




// const apiUrl = "https://infinitebridge.hasura.app/v1/graphql";

// const httpLink = createHttpLink({
//   uri: apiUrl,
// });


// console.log('httpLink', httpLink);


// const authLink = setContext(async (_, { headers }) => {
//   const value: any = await AsyncStorage.getItem("user");
//   const token = JSON.parse(value)?.token;
//   return {
//     headers: {
//       ...headers,
//       // authorization: token ? `Bearer ${token}` : '',
//     },
//   };
// });



// const client = new ApolloClient({
//   link: httpLink,
//   cache: new InMemoryCache(),
// });

// console.log('====================================');
// console.log('client',client);
// console.log('====================================');


const App = () => {

  return (

    <ProviderRedux store={store}>
      {/* <ApolloProvider client={client}> */}
        <Navigation />
      {/* </ApolloProvider> */}
    </ProviderRedux>
  );
}



export default App;
