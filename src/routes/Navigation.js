import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import ReactScreen from "../screens/ReactScreen";
import ReactNativeScreen from "../screens/ReactNativeScreen";
import NodeScreen from "../screens/NodeScreen";
import theme from "../common/Theme";

const Tab = createBottomTabNavigator();

function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: "#FFFFFF" },
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: { fontSize: 14, fontWeight: "500", marginBottom: 5 },
      }}
      initialRouteName="First_screen"
    >
      <Tab.Screen
        options={{
          tabBarLabel: "React",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="react"
              size={size}
              color={focused ? theme.primary : color}
            />
          ),
        }}
        name="First_screen"
        component={ReactScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "React-Native",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="reacteurope"
              size={size}
              color={focused ? theme.primary : color}
            />
          ),
        }}
        name="Second_screen"
        component={ReactNativeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: "Node",
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome5
              name="node-js"
              size={size}
              color={focused ? theme.primary : color}
            />
          ),
        }}
        name="Third_screen"
        component={NodeScreen}
      />
    </Tab.Navigator>
  );
}

export default Navigation;
