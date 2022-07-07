import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as styles from "../styles.js";
import { FloatingActionButton, ToggleItem, PopupModal } from "../components.js";
import {
  SelectedItemContext,
  TodosContext,
  TasksContext,
  baseUrl,
} from "../global.js";
import axios from "axios";

export const ContentScreen = ({ navigation, route }) => {
  const [tasks, setTasks] = useContext(TasksContext);
  const [thisListName, setThisListName] = useState("");
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const [selectedTask, setSelectedTask] = useState();
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskModalSettings, setTaskModalSettings] = useState({
    title: "",
    placeholder: "",
    output: null,
    showAction: false,
  });

  const updateName = (name) => {
    const payload = {
      name: name,
    };
    axios
      .patch(`${baseUrl}/api/todo-lists/${selectedItem.id}`, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  };

  function toggleSelectedTask() {
    const payload = {
      is_done: !selectedTask.is_done,
    };
    axios
      .patch(`${baseUrl}/api/todos/${selectedTask.id}`, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }
  function editSelectedTask(description) {
    const payload = {
      description: description,
    };
    axios
      .patch(`${baseUrl}/api/todos/${selectedTask.id}`, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }
  function addNewTask(description) {
    console.log("addNewTask");
    const generatedID = Math.floor(Math.random() * 99999) + 1000;
    const payload = {
      id: generatedID,
      description: description,
      is_done: false,
      todo_list_id: selectedItem.id,
    };
    axios
      .post(`${baseUrl}/api/todos`, payload)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }
  function deleteSelectedTask() {
    axios
      .delete(`${baseUrl}/api/todos/${selectedTask.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }

  function deleteTodoList() {
    axios
      .delete(`${baseUrl}/api/todo-lists/${selectedItem.id}`)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response.data);
        alert(error.response.data);
      });
  }
  function checkSelectedTask(item) {
    return item.is_done;
  }
  const renderSpecificTask = ({ item }) => {
    return (
      <ToggleItem
        item={item}
        title={item.description != null ? item.description : ""}
        subtitle=""
        onPress={() => {
          toggleSelectedTask();
        }}
        onPressIn={() => {
          setSelectedTask(item);
        }}
        onLongPress={() => {
          setTaskModalSettings({
            title: "Edit task",
            placeholder: "What's your task name",
            output: editSelectedTask,
            showAction:true
          });
          setTaskModalVisible(true);
        }}
        isDone={checkSelectedTask(item)}
        key={item.key}
      />
    );
  };
  function RenderTaskList() {
    const taskList = tasks.filter(
      (fItem) => fItem.todo_list_id === selectedItem.id
    );
    if (taskList.length > 0) {
      return (
        <FlatList
          data={taskList}
          renderItem={renderSpecificTask}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
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
            onChangeText={setThisListName}
            onSubmitEditing={()=>{updateName(thisListName)}}
            value={thisListName!=""?thisListName:selectedItem.name}
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
        showAction={taskModalSettings.showAction}
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
            showAction:false
          });
          setTaskModalVisible(true);
        }}
      />
    </View>
  );
};
