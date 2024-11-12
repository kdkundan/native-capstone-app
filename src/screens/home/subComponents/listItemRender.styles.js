import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  itemMainContainer: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 2,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  itemImageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "flex-start",
    padding: 10,
    gap: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default styles;
