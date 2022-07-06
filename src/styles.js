import { StyleSheet, StatusBar } from "react-native";

const styles = StyleSheet.create({
  floatingActionButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 56,
    position: "absolute",
    bottom: 24,
    right: 24,
    height: 56,
    backgroundColor: "#264C63",
    borderRadius: 100,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 30,
    marginHorizontal: 0,
    backgroundColor: "#457b9d",
  },
  contentContainer: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 30,
    marginHorizontal: 0,
    backgroundColor: "#457b9d",
  },
  list: {
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 24,
    color: "#f1faee",
    marginHorizontal: 16,
    marginBottom: 16,
  },
  pageTitleInput: {
    fontSize: 24,
    color: "#f1faee",
    marginHorizontal: 16,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  listTitle: {
    fontSize: 16,
    color: "#457b9d",
    fontWeight: "bold",
  },
  listTitleStrikethrough: {
    fontSize: 16,
    color: "#457b9d",
    fontWeight: "bold",
    textDecorationLine: "line-through",
  },
  listSubtitle: {
    fontSize: 16,
    color: "#457b9d",
  },
  item: {
    backgroundColor: "#f1faee",
    textColor: "#457b9d",
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  itemDisabled: {
    backgroundColor: "#92AFC9",
    textColor: "#457b9d",
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  itemInput: {
    backgroundColor: "#92AFC9",
    textColor: "#457b9d",
    padding: 16,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 8,
    fontSize: 16,
  },
  sheetContainer: {},

  centeredView: {
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: "auto",
    padding:16,
    backgroundColor: "#000",
    opacity:.25,
  },
  modalView: {
    margin: 0,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "flex-end",
  },
});

module.exports = styles;
