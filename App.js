import React, { useState, Component, useRef, forwardRef } from "react";
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
import AwesomeButton from "react-native-really-awesome-button";

enableScreens();

const Stack = createNativeStackNavigator();
export default function App() {
  return (
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
  );
}

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>Let's get it done!</Text>
      <ListHomeContent navigation={navigation} />
    </SafeAreaView>
  );
};

const ListHomeContent = (props) => {
  const [selectedID, setSelectedID] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
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
  const renderItem = ({ item }) => {
    var completedCount = item.items.filter((item) => item.done === true).length;
    var subtitleContent = completedCount + "/" + item.items.length;
    return (
      <Item
        item={item}
        title={item.title}
        subtitle={subtitleContent}
        onPress={() => {
          setSelectedID(item.id);
          setSelectedItem(item);
          props.navigation.navigate("Content", {
            item: item,
            func: console.log("test"),
          });
        }}
      />
    );
  };
  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      extraData={selectedID}
    />
  );
};
const ContentScreen = (props) => {
  return (
    <ListSpecificContent
      route={props.route}
      func={props.func}
    />
  );
};

const ListSpecificContent = (props) => {
  console.log(props.route.params.item.items);
  const [selectedIDs, setSelectedID] = useState([]);

  const addSelectedID = (id) => {
    setSelectedID((oldArray) => [...oldArray, id]);
  };
  const removeSelectedID = (id) => {
    if (selectedIDs.length > 0) {
      setSelectedID(selectedIDs.filter((item) => item !== id));
    }
  };

  function toggleSelectedID(id) {
    if (selectedIDs.includes(id)) {
      removeSelectedID(id);
      // return true;
    } else {
      addSelectedID(id);
      // return false;
    }
  }
  function checkSelectedID(id) {
    return selectedIDs.includes(id);
  }
  const renderSpecificItem = ({ item }) => {
    return (
      <ToggleItem
        item={item}
        title={item.title}
        subtitle=""
        onPress={() => {
          toggleSelectedID(item.id);
        }}
        isDone={checkSelectedID(item.id)}
      />
    );
  };
  return (
    <View style={styles.contentContainer}>
      <Text style={styles.pageTitle}>
        {props.route.params.item != null ? props.route.params.item.title : ""}
      </Text>
      <FlatList
        data={
          props.route.params.item != null ? props.route.params.item.items : null
        }
        renderItem={renderSpecificItem}
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
