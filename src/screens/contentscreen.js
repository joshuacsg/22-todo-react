import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as styles from "../styles.js";
import { FloatingActionButton, ToggleItem, PopupModal } from "../components.js";
import { DataContext, SelectedItemContext } from "../global.js";
import uuid from "react-native-uuid";

export const ContentScreen = ({ navigation, route }) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const [selectedTask, setSelectedTask] = useState();
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskModalSettings, setTaskModalSettings] = useState({
    title: "",
    placeholder: "",
    output: null,
    delete:null
  });

  const updateTitle = (title) => {
    const localData = [...data];
    var itemIndex = localData.findIndex(
      (value) => value.id === selectedItem.id
    );
    localData[itemIndex].title = title;
    setData(localData);
  };
  const updateTask = (task) => {
    const localData = [...data];
    var itemIndex = localData.findIndex(
      (value) => value.id === selectedItem.id
    );
    localData[itemIndex] = task;
    setData(localData);
  };

  function toggleSelectedTask(item) {
    for (var i = 0; i < selectedItem.items.length; i++) {
      if (selectedItem.items[i].id == item.id) {
        selectedItem.items[i].done = !selectedItem.items[i].done;
        updateTask(selectedItem);
      }
    }
  }
  function editSelectedTask(newName) {
    for (var i = 0; i < selectedItem.items.length; i++) {
      if (selectedItem.items[i].id === selectedTask.id) {
        selectedItem.items[i].title = newName;
        updateTask(selectedItem);
      }
    }
  }
  function addNewTask(taskName) {
    const localData = [...data];
    var itemIndex = localData.findIndex(
      (value) => value.id === selectedItem.id
    );
    const localTasks = [
      ...localData[itemIndex].items,
      {
        done: false,
        id: uuid.v4(),
        title: taskName,
      },
    ];
    localData[itemIndex].items = localTasks;
    updateTask(localData);
  }
  function deleteSelectedTask() {
    const localTasks = [...selectedItem.items];
    console.log(localTasks, " localData");
    console.log(selectedTask.id, " selectedTask.id");
    const filteredTasks = localTasks.filter((fItem)=> fItem.id !== selectedTask.id);

    const localData = [...data];
    var itemIndex = localData.findIndex(
      (value) => value.id === selectedItem.id
    );
    localData[itemIndex].items = filteredTasks;
    setData(localData);
  }

  function deleteTodoList() {
    const localData = [...data];
    const filteredData = localData.filter(
      (fItem) => fItem.id !== selectedItem.id
    );
    setData(filteredData);
  }
  function checkSelectedTask(item) {
    return selectedItem.items.find((value) => value.id === item.id).done;
  }
  const renderSpecificTask = ({ item }) => {
    return (
      <ToggleItem
        item={item}
        title={item.title != null ? item.title : ""}
        subtitle=""
        onPress={() => {
          
          toggleSelectedTask(item);
        }}
        onPressIn={()=>{setSelectedTask(item)}}
        onLongPress={() => {
          setTaskModalSettings({
            title: "Edit task",
            placeholder: "What's your task name",
            output: editSelectedTask
          });
          setTaskModalVisible(true);
        }}
        isDone={checkSelectedTask(item)}
      />
    );
  };
  function RenderTaskList() {
    if (selectedItem.items.length > 0) {
      return (
        <FlatList
          data={selectedItem != null ? selectedItem.items : null}
          renderItem={renderSpecificTask}
        />
      );
    } else {
      return (
        <View style={{ alignItems: "center" }}>
          <Icon
            name="list-ol"
            size={32}
            color="#f1faee"
            style={{ marginVertical: 16 }}
          />
          <Text
            style={{
              textAlign: "center",
              fontSize: 16,
              color: "#f1faee",
              fontWeight: "bold",
            }}
          >
            {"No tasks found\nadd a new task with the '+' button"}
          </Text>
        </View>
      );
    }
  }
  return (
    <View style={styles.contentContainer}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginHorizontal: 16,
        }}
      >
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.pageTitleInput}
            onChangeText={updateTitle}
            value={selectedItem.title}
            placeholder="What's your to-do"
            keyboardType="default"
          />
        </View>
        <TouchableOpacity
          style={styles.navbarActionButton}
          onPress={() => {
            deleteTodoList();
            navigation.navigate("Home");
          }}
        >
          <Icon name="trash" size={20} color="#d15249" />
        </TouchableOpacity>
      </View>
      {RenderTaskList()}
      <PopupModal
        modalTitle={taskModalSettings.title}
        modalPlaceholder={taskModalSettings.placeholder}
        modalVisible={taskModalVisible}
        setModalVisible={setTaskModalVisible}
        output={taskModalSettings.output}
        actionAction={() => {
          deleteSelectedTask();
          setTaskModalVisible(false);
        }}
      ></PopupModal>

      <FloatingActionButton
        onPress={() => {
          setTaskModalSettings({
            title: "Add a new task",
            placeholder: "What's your task name",
            output: addNewTask,
          });
          setTaskModalVisible(true);
        }}
      />
    </View>
  );
};
