import React, { useContext, useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import * as styles from "../styles.js";
import { FloatingActionButton, Item, PopupModal } from "../components.js";
import { DataContext, SelectedItemContext } from "../global.js";
import uuid from "react-native-uuid";

export const HomeScreen = ({ navigation, route }) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const [modalVisible, setModalVisible] = useState(false);

  function addTodoList(listName) {
    const todoItem = { id: uuid.v4(), title: listName, items: [] };
    const localData = [...data, todoItem];
    setData(localData);
    setSelectedItem(todoItem);
    navigation.navigate("Content");
  }
  const renderItem = ({ item }) => {
    var completedCount = item.items.filter(
      (fItem) => fItem.done === true
    ).length;
    var subtitleContent = completedCount + "/" + item.items.length;
    return (
      <Item
        item={item}
        title={item.title != null ? item.title : ""}
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
      <PopupModal
        modalTitle={"Add a new todo list"}
        modalPlaceholder={"What's your list name"}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        output={addTodoList}
        initialInput=""
      ></PopupModal>
      <FloatingActionButton
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </SafeAreaView>
  );
};
