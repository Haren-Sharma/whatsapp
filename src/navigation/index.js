import { NavigationContainer } from "@react-navigation/native";
import ChatScreen from "../screens/ChatScreen/ChatScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabNavigator from "./MainTabNavigator";

const Stack = createNativeStackNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "whitesmoke",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={MainTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Chat" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
