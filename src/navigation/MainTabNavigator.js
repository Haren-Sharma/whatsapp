import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dummy from "../screens/Dummy/Dummy";
import ChatsScreen from "../screens/ChatsScreen/ChatsScreen";
import { Ionicons,Entypo } from "@expo/vector-icons";
import Settings from "../screens/Settings";
const Tab = createBottomTabNavigator();
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "whitesmoke",
        },
        headerStyle: {
          backgroundColor: "whitesmoke",
        },
      }}
    >
      <Tab.Screen
        name="Status"
        component={Dummy}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="logo-whatsapp" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Calls"
        component={Dummy}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="call-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="ios-chatbubbles-sharp" color={color} size={size} />
          ),
          headerRight:()=><Entypo name="new-message" size={18} color='royalblue' style={{marginRight:15}}/>
        }}
      />
      <Tab.Screen
        name="Camera"
        component={Dummy}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="camera-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
