// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
//   TouchableOpacity,
// } from "react-native";
// import { enableScreens } from "react-native-screens";
// enableScreens();

// const HomeScreen = ({ navigation }) => {
//   const [data, setData] = useState([
//     {
//       id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
//       title: "My Weekly Diet",
//       items: [
//         { id: "1", title: "test", done: false },
//         { id: "2", title: "test2", done: true },
//       ],
//     },
//     {
//       id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
//       title: "My next NTUC trip",
//       items: [
//         { id: "3", title: "test", done: false },
//         { id: "4", title: "test2", done: true },
//       ],
//     },
//     {
//       id: "58694a0f-3da1-471f-bd96-145571e29d72",
//       title: "Water Diet",
//       items: [{ id: "5", title: "test", done: false }],
//     },
//   ]);
//   function setItem(item) {
//     // console.log("${item} test");
//   }
//   const [selectedId, setSelectedId] = useState(null);
//   const [selectedItem, setSelectedItem] = useState(null);
//   const renderItem = ({ item }) => {
//     return (
//       <Item
//         item={item}
//         title={item.title}
//         subtitle={item.items.length}
//         onPress={() => {
//           setSelectedId(item.id);
//           setSelectedItem(item);
//           navigation.navigate("Content", {
//             item: item
//           });
//         }}
//       />
//     );
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.pageTitle}>Let's get it done!</Text>
//       <FlatList
//         data={data}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id}
//         extraData={selectedId}
//       />
//     </SafeAreaView>
//   );
// };
// const Item = ({ title, subtitle, onPress }) => (
//   <TouchableOpacity onPress={onPress} style={styles.item}>
//     <View
//       style={{
//         flexDirection: "row",
//         justifyContent: "space-between",
//       }}
//     >
//       <Text style={styles.listTitle}>{title}</Text>
//       <Text style={styles.listSubtitle}>{subtitle}</Text>
//     </View>
//   </TouchableOpacity>
// );