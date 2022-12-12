import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import HomeScreen from "./screens/homeScreen";

const client = new ApolloClient({
  uri: 'http://192.168.0.103:4000/graphql',
  cache: new InMemoryCache()
});
const Stack = createNativeStackNavigator();

export default function App(){
  // client.query({
  //   query: gql`
  //     query Query {
  //       users {
  //         Login
  //         Name
  //       }
  //     }
  //   `
  // }).then((result) => console.log(result)).catch((e) => {
  //   console.log(e)
  // });
  return(
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}