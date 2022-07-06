import React, { useState, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Pressable,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as styles from "../styles.js";
import { FloatingActionButton, ToggleItem } from "../components.js";
import { DataContext, SelectedItemContext } from "../../global.js";

export const ContentScreen = (props) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const [modalVisible, setModalVisible] = useState(false);

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

  const checkTaskItem = (item) => {
    var dataIndex = data.findIndex((value) => value.id === item.id);
    if (dataIndex === -1) return false;
    else return true;
  };

  function toggleSelectedTask(item) {
    for (var i = 0; i < selectedItem.items.length; i++) {
      if (selectedItem.items[i].id == item.id) {
        selectedItem.items[i].done = !selectedItem.items[i].done;
        updateTask(selectedItem);
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
      <TextInput
        style={styles.pageTitleInput}
        onChangeText={updateTitle}
        value={selectedItem.title}
        placeholder="What's your to-do"
        keyboardType="default"
      />
      <FlatList
        data={selectedItem != null ? selectedItem.items : null}
        renderItem={renderSpecificTask}
      />
      <FloatingActionButton onPress={() => setModalVisible(true)} />
      <Modal
        animationType="slide"
        transparent={true}
        color="#000"
        visible={modalVisible}
        onRequestClose={() => {
          //Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
        </View>
          <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
            <Icon name="times" size={20} color="#f1faee" />
          </TouchableOpacity>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
          </View>
      </Modal>
    </View>
  );
};
