import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { useEffect, useState } from "react";
import * as Location from 'expo-location';


import MapScreen from "./screens/MapScreen";
import AuthScreen from "./screens/AuthScreen";
import VerificationScreen from "./screens/VerificationScreen";
import RegisterScreen from "./screens/RegisterScreen";
import PlaceSubmissionsModerationScreen from "./screens/SubmissionModerationScreen";
import PlaceSubmissionsScreen from "./screens/PlaceSubmissionsScreen";
import PlaceScreen from "./screens/PlaceScreen";
import SearchScreen from "./screens/SearchScreen";
import { GRAPHQL_ADRESS } from "./constants";

const client = new ApolloClient({
  uri: GRAPHQL_ADRESS,
  cache: new InMemoryCache()
});
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false
};

export default function App() {
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

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Authentication" component={AuthScreen} options={screenOptions} />
          <Stack.Screen name="Verification" component={VerificationScreen} options={screenOptions} />
          <Stack.Screen name="Registration" component={RegisterScreen} options={screenOptions} />
          <Stack.Screen name="Map" component={MapScreen} options={screenOptions} />
          <Stack.Screen name="PlaceSubmissionsModeration" component={PlaceSubmissionsModerationScreen} options={screenOptions} />
          <Stack.Screen name="PlaceSubmissionsScreen" component={PlaceSubmissionsScreen} options={screenOptions} />
          <Stack.Screen name="PlaceScreen" component={PlaceScreen} options={screenOptions} />
          <Stack.Screen name="SearchScreen" component={SearchScreen} options={screenOptions} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}