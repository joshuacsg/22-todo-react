import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Keyboard,
  Button,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as styles from "./styles.js";
import { ModalVisibleContext } from "./global.js";

export const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingActionButton} onPress={onPress}>
    <Icon name="plus" size={20} color="#f1faee" />
  </TouchableOpacity>
);

export const MyIcon = ({ icon, size, color, padding }) => (
  <Icon name={icon} size={size} color={color} />
);
export const Item = ({ title, subtitle, onPress, onLongPress }) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.item}
  >
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
export const ToggleItem = ({
  title,
  subtitle,
  onPress,
  onLongPress,
  isDone,
  onPressIn
}) => (
  <TouchableOpacity
    onPress={onPress}
    onLongPress={onLongPress}
    onPressIn={onPressIn}
    style={isDone ? styles.itemDisabled : styles.item}
  >
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
        <Text style={isDone ? styles.listTitleStrikethrough : styles.listTitle}>
          {title}
        </Text>
        <Text style={styles.listSubtitle}>{subtitle}</Text>
      </View>
    </View>
  </TouchableOpacity>
);
export const PopupModal = ({
  modalTitle,
  modalPlaceholder,
  modalVisible,
  setModalVisible,
  output,
  actionAction,
}) => {
  const [modalInput, setModalInput] = useState("");
  const [keyboardStatus, setKeyboardStatus] = useState(undefined);
  useEffect(() => {
    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus("Keyboard Shown");
    });
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus("Keyboard Hidden");
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "#000000AA",
          justifyContent: "flex-end",
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            if (keyboardStatus === "Keyboard Shown") {
              Keyboard.dismiss();
            } else {
              setModalVisible(false);
            }
          }}
        >
          <View style={{ flex: 1, width: "100%" }}></View>
        </TouchableWithoutFeedback>
        <View
          style={{
            backgroundColor: "#FFF",
            width: "100%",
            paddingHorizontal: 8,
            paddingTop: 8,
            paddingBottom: 24,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.modalTitle}>{modalTitle}</Text>
            {actionAction != null ? (
              <TouchableOpacity onPress={actionAction}>
                <Icon
                  style={{ margin: 8, marginRight: 16 }}
                  name="trash"
                  size={20}
                  color="#d15249"
                />
              </TouchableOpacity>
            ) : null}
          </View>
          <TextInput
            style={styles.modalInput}
            onChangeText={(text) => setModalInput(text)}
            value={modalInput}
            placeholder={modalPlaceholder}
            keyboardType="default"
          />
          <View
            style={{
              marginVertical: 8,
              marginHorizontal: 8,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flex: 0.48 }}>
              <Button
                title="Cancel"
                onPress={() => {
                  setModalInput("");
                  setModalVisible(false);
                }}
                color="#d15249"
              />
            </View>
            <View style={{ flex: 0.48 }}>
              <Button
                title="Save"
                disabled={modalInput.length > 0 ? false : true}
                onPress={() => {
                  output(modalInput);
                  setModalInput("");
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
