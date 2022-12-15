import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';


import MapScreen from "./screens/MapScreen";
import AuthScreen from "./screens/AuthScreen";
import VerificationScreen from "./screens/VerificationScreen";
import RegisterScreen from "./screens/RegisterScreen";

const client = new ApolloClient({
  uri: 'http://192.168.0.103:4000/graphql',
  cache: new InMemoryCache()
});
const Stack = createNativeStackNavigator();

export default function App(){
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
        }
      })();
    }, []);
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return(
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Authentication" component={AuthScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Verification" component={VerificationScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Registration" component={RegisterScreen} options={{headerShown: false}}/>
          <Stack.Screen name="Map" component={MapScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}