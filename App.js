import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/routes/Navigation";
import { PaperProvider } from "react-native-paper";
import { NativeBaseProvider } from "native-base";
import { Provider } from "react-redux";
import store from "./src/redux/Store";

export default function App() {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <PaperProvider>
          <Provider store={store}>
            <Navigation />
          </Provider>
        </PaperProvider>
      </NativeBaseProvider>
    </NavigationContainer>
  );
}
