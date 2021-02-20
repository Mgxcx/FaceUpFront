import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import GalleryScreen from "./screens/GalleryScreen";
import SnapScreen from "./screens/SnapScreen";

import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import avatar from "./reducers/avatar";

LogBox.ignoreAllLogs();

const store = createStore(combineReducers({ avatar }));

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PagesTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Gallery") {
            iconName = "md-photos";
          } else if (route.name === "Snap") {
            iconName = "ios-camera";
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "#009788",
        inactiveTintColor: "#FFFFFF",
        activeBackgroundColor: "#111224",
        inactiveBackgroundColor: "#111224",
      }}
    >
      <Tab.Screen name="Gallery" component={GalleryScreen} />
      <Tab.Screen name="Snap" component={SnapScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="PagesTab" component={PagesTab} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
