import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import HomeScreen from './screens/HomeScreen';
import EditCharacter from './screens/EditCharacter';
import AddCharacter from './screens/AddCharacter';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  return (
    <>
      <SafeAreaProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
              <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Stack.Screen name="EditCharacter" component={EditCharacter} />
              <Stack.Screen name="AddCharacter" component={AddCharacter} />
            </Stack.Navigator>
          </NavigationContainer>
        </ApolloProvider>
      </SafeAreaProvider>
    </>
  );
};

export default App;
