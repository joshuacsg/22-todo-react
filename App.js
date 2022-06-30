import React, { useState, Component, useRef, forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Container,
  Button,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useScreenReaderEnabled } from "native-base";
import {enableScreens} from 'react-native-screens'
enableScreens()

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "My Weekly Diet",
    items: [
      { id: 1, title: "test", done: false },
      { id: 2, title: "test2", done: true },
    ],
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "My next NTUC trip",
    items: [
      { id: 1, title: "test", done: false },
      { id: 2, title: "test2", done: true },
    ],
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Water Diet",
    items: [{ id: 1, title: "test", done: false }],
  },
];

const Item = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.title}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

// const renderSheetItem = ({ todoItem }) => {
//   const backgroundColor = "#eee";
//   const color = "black";

//   return (
//     <Item
//       item={todoItem}
//       onPress={() => {
//         ///TODO toggle done
//       }}
//       backgroundColor={{ backgroundColor }}
//       textColor={{ color }}
//     />
//   );
// };

const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
    headerShown: false
  }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title:"s"}}
        />
        <Stack.Screen name="Content" component={ContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 0,
    backgroundColor: "#D8D3C0",
  },
  list: {
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 36,
    color: "#283845",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  sheetTitle: {
    fontSize: 24,
    color: "#283845",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  item: {
    backgroundColor: "#EFEDE6",
    textColor: "#283845",
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
  },
  sheetContainer: {},
});
const HomeScreen = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();
  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        title={item.title}
        subtitle={item.items.length}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedItem(item);
        navigation.navigate('Content', { item: item })
        }}
      />
    );
  };
  return (
  <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Let's get it done!</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
    );
};
const ContentScreen = ({ navigation, route }) => {
  const renderSpecificItem = ({ item }) => {
    return (
      <Item
        item={item}
        title={item.title}
        subtitle=""
        onPress={() => {
        }}
      />
    );
  };
  return <View style={styles.sheetContainer}>
      <Text style={styles.sheetTitle}>
        {route.item != null ? route.item.title : ""}
      </Text>
      <FlatList
        data={route.item != null ? route.item.items : null}
        renderItem={renderSpecificItem}
      />
    </View>
  
};