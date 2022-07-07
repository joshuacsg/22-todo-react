import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import { HomeScreen } from "./src/screens/homescreen.js";
import { ContentScreen } from "./src/screens/contentscreen.js";
import {
  DataContext,
  SelectedItemContext,
  TodosContext,
  TasksContext,
  baseUrl,
} from "./src/global.js";
import axios from "axios";

enableScreens();

const Stack = createNativeStackNavigator();
export default function App() {
  let [todos, setTodos] = React.useState("");
  let [tasks, setTasks] = React.useState("");

  const getData = async () => {
    const todoLists = await axios.get(`${baseUrl}/api/todo-lists`);
    setTodos(todoLists.data);
    const todos = await axios.get(`${baseUrl}/api/todos`);
    setTasks(todos.data);
  };
  useEffect(() => {
    getData();
    const interval = setInterval(() => {
      getData();
    }, 1100);
    return () => clearInterval(interval);
  }, []);

  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <TodosContext.Provider value={[todos, setTodos]}>
      <TasksContext.Provider value={[tasks, setTasks]}>
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
      </TasksContext.Provider>
    </TodosContext.Provider>
  );
}
