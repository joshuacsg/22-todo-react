import React, { useContext } from "react";
import {
  Text,
  SafeAreaView,
  FlatList,
} from "react-native";
import * as styles from "../styles.js";
import {
  FloatingActionButton,
  Item,
} from "../components.js";
import {
  DataContext,SelectedItemContext
} from "../../global.js";

export const HomeScreen = ({ navigation, route }) => {
  const [data, setData] = useContext(DataContext);
  const [selectedItem, setSelectedItem] = useContext(SelectedItemContext);
  const renderItem = ({ item }) => {
    var completedCount = item.items.filter(
      (fItem) => fItem.done === true
    ).length;
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
      <FloatingActionButton onPress={() => {}} />
    </SafeAreaView>
  );
};