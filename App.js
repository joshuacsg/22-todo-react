import React, { useState, useContext, useRef, forwardRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Pressable,
  Container,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { enableScreens } from "react-native-screens";
import Icon from "react-native-vector-icons/FontAwesome5";

enableScreens();

const DataContext = React.createContext(null);
const SelectedItemContext = React.createContext(null);
const Stack = createNativeStackNavigator();
export default function App() {
  //const [selectedID, setSelectedItems] = useState("");
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

const HomeScreen = ({ navigation, route }) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const renderItem = ({ item }) => {
    var completedCount = item.items.filter(fItem => fItem.done === true).length;
    var subtitleContent = completedCount + "/" + item.items.length;
    return (
      <Item
        item={item}
        title={item.title}
        subtitle={subtitleContent}
        onPress={() => {
          setSelectedItem(item);
          navigation.navigate("Content");
        }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Let's get it done!</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={data.id}
      />
    </SafeAreaView>
  );
};
const ContentScreen = (props) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);

  // const addTaskItem = (item) => {
  //   if (!checkTaskItem(item)) setData((oldArray) => [...oldArray, item]);
  // };
  // const removeTaskItem = (item) => {
  //   if (checkTaskItem(item)) {
  //     setData(data.filter((value) => value !== item));
  //   }
  // };

  const updateData = (task) => {
    const localData = [...data];
    var itemIndex = localData.findIndex(
      (value) => value.id === selectedItem.id
    );
    localData[itemIndex] = task;
    setData(localData);
  };
  
  const checkTaskItem = (item) => {
    var dataIndex = data.findIndex((value) => value.id === item.id);
    if (dataIndex === -1) return false;
    else return true;
  };

  function toggleSelectedTask(item) {
    // var itemRef = pParams.item;
    for (var i = 0; i < selectedItem.items.length; i++) {
      if (selectedItem.items[i].id == item.id) {
        selectedItem.items[i].done = !selectedItem.items[i].done;
        console.log(selectedItem.items[i]);
        updateData(selectedItem);
      }
    }
  }
  function checkSelectedTask(item) {
    return selectedItem.items.find((value) => value.id === item.id).done;
  }
  const renderSpecificTask = ({ item }) => {
    return (
      <ToggleItem
        item={item}
        title={item.title}
        subtitle=""
        onPress={() => {
          toggleSelectedTask(item);
        }}
        isDone={checkSelectedTask(item)}
      />
    );
  };
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.pageTitle}>
        {selectedItem != null ? selectedItem.title : ""}
      </Text>
      <FlatList
        data={selectedItem != null ? selectedItem.items : null}
        renderItem={renderSpecificTask}
      />
    </View>
  );
};

const Item = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={styles.listTitle}>{title}</Text>
      <Text style={styles.listSubtitle}>{subtitle}</Text>
    </View>
  </TouchableOpacity>
);

const MyIcon = ({ icon, size, color }) => (
  <Icon name={icon} size={size} color={color} />
);
const ToggleItem = ({ title, subtitle, onPress, isDone }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <View
      style={{
        flexDirection: "row",
        justifyContent: "flex-start",
      }}
    >
      {isDone ? (
        <MyIcon icon="check" size={24} color="#457b9d"></MyIcon>
      ) : (
        <MyIcon icon="circle" size={24} color="#457b9d"></MyIcon>
      )}
      <View
        style={{
          marginLeft: 8,
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={styles.listTitle}>{title}</Text>
        <Text style={styles.listSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 30,
    marginHorizontal: 0,
    backgroundColor: "#457b9d",
  },
  contentContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 30,
    marginHorizontal: 0,
    backgroundColor: "#457b9d",
  },
  list: {
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 24,
    color: "#f1faee",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 16,
    color: "#457b9d",
    fontWeight: "bold",
  },
  listSubtitle: {
    fontSize: 16,
    color: "#457b9d",
  },
  item: {
    backgroundColor: "#f1faee",
    textColor: "#457b9d",
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  sheetContainer: {},
});
