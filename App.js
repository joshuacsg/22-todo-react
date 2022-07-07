import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import {
  HomeScreen
} from "./src/screens/homescreen.js";
import {
  ContentScreen
} from "./src/screens/contentscreen.js";
import {
  DataContext,SelectedItemContext
} from "./src/global.js";

enableScreens();

const Stack = createNativeStackNavigator();
export default function App() {
  const [data, setData] = useState([
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "My Weekly Diet",
      items: [
        { id: "1", title: "test", done: false },
        { id: "2", title: "test2", done: true },
      ],
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "My next NTUC trip",
      items: [
        { id: "3", title: "test", done: false },
        { id: "4", title: "test2", done: true },
      ],
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Water Diet",
      items: [{ id: "5", title: "test", done: false }],
    },
  ]);
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <DataContext.Provider value={[data, setData]}>
      <SelectedItemContext.Provider value={[selectedItem, setSelectedItem]}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: "", headerShown: false }}
            />
            <Stack.Screen
              name="Content"
              component={ContentScreen}
              options={{
                title: "",
                headerShown: true,
                headerTransparent: true,
                headerTintColor: "white",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SelectedItemContext.Provider>
    </DataContext.Provider>
  );
}