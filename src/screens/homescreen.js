import React, { useContext, useState } from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import * as styles from "../styles.js";
import { FloatingActionButton, Item, PopupModal } from "../components.js";
import {
  SelectedItemContext,
  TodosContext,
  TasksContext,
  baseUrl,
} from "../global.js";
import axios from "axios";

export const HomeScreen = ({ navigation, route }) => {
  const [todos, setTodos] = useContext(TodosContext);
  const [tasks, setTasks] = useContext(TasksContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const [modalVisible, setModalVisible] = useState(false);

  function addTodoList(listName) {
    const generatedID = Math.floor(Math.random() * 99999) + 1000;
    const item = { id: generatedID, name: listName };
    axios
      .post(`${baseUrl}/api/todo-lists`, item)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }
  const renderItem = ({ item }) => {
    var tCount = [...tasks].filter((fItem) => fItem.todo_list_id == item.id);
    var cCount = tCount.filter((fItem) => fItem.is_done);
    var subtitleContent =
      tCount.length > 0 || cCount > 0
        ? cCount.length + "/" + tCount.length
        : "-";
    return (
      <Item
        item={item}
        title={item.name != null ? item.name : ""}
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
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
        extraData={todos.id}
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
