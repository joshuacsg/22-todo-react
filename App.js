import React, { useState, Component, useRef } from "react";
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
    items: [
      { id: 1, title: "test", done: false },
    ],
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
    <Text style={[styles.title, textColor]}>{item.title}</Text>
  </TouchableOpacity>
);
const BottomSheet = ({selectedItem,refRBSheet})=>{
  const renderItem = ({ item }) => {
    const backgroundColor = "#eee";
    const color = "black";

    return (
      <Item
        item={item}
        onPress={() => {
          ///TODO toggle done
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  if(selectedItem!=null)
return <RBSheet
        height = {500}
        ref={refRBSheet}
        close
        closeOnPressBack={true}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          wrapper: {
            backgroundColor: "#00000066",
          },
          draggableIcon: {
            backgroundColor: "#bbb",
          },
        }}
      >
      <View style={styles.sheetContainer}>
        <Text style={styles.sheetTitle}>{selectedItem.title}</Text>
      <FlatList
        data={selectedItem.items}
        renderItem={renderItem}
      />
      </View>
      </RBSheet>
};

export default function App() {
  const [selectedId, setSelectedId] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const refRBSheet = useRef();

  const renderItem = ({ item }) => {
    const backgroundColor = "#eee";
    const color = "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          setSelectedItem(item);
          refRBSheet.current.open();
        }}
        backgroundColor={{ backgroundColor }}
        textColor={{ color }}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.pageTitle}>To-do</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
      { selectedItem!=null ? <BottomSheet selectedItem = {selectedItem} refRBSheet = {refRBSheet}></BottomSheet> : null }
      
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  list: {
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 48,
    color: "grey",
  },
  sheetTitle: {
    fontSize: 24,
    color: "black",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
  },
  sheetContainer:{
    padding:20
  }
});
