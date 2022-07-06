
import React, {  } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as styles from './styles.js';

export const FloatingActionButton = ({ onPress }) => (
  <TouchableOpacity style={styles.floatingActionButton} onPress={onPress}>
    <Icon name="plus" size={20} color="#f1faee" />
  </TouchableOpacity>
);

export const MyIcon = ({ icon, size, color, padding }) => (
  <Icon name={icon} size={size} color={color} />
);
export const Item = ({ title, subtitle, onPress }) => (
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
export const ToggleItem = ({ title, subtitle, onPress, isDone }) => (
  <TouchableOpacity
    onPress={onPress}
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
export const textValue = "";
export const InputItem = ({ title, subtitle, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <TextInput
      style={styles.listTitle}
      onChangeText={(text) => (textValue = text)}
      value={"textValue"}
      placeholder="Name your new task"
      keyboardType="default"
    />
  </TouchableOpacity>
);