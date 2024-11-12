import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // headerContainer styles START
  headerContainer: {
    marginTop: 40,
    width: "100%",
    height: 100,
    flexDirection: "row",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerChildren: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerLogo: {
    width: "90%", // Adjusted to make logo more contained
    height: 80, // Add a specific height
    resizeMode: "contain", // Changed to contain to maintain aspect ratio
  },
  // headerContainer styles END

  // heroSectionContainer styles START
  heroContainer: {
    backgroundColor: "#495E57",
    padding: 16,
  },
  heroContent: {
    maxWidth: "100%",
  },
  restaurantName: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#F4CE14", // Yellow color
    // fontFamily: "Serif", // You'll need to set up the proper font
  },
  locationText: {
    fontSize: 30,
    color: "#FFFFFF",
    marginTop: 4,
    // fontFamily: "Serif", // You'll need to set up the proper font
  },
  descriptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  textContainer: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    color: "#FFFFFF",
    lineHeight: 24,
  },
  heroImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 8,
    marginTop: 16,
  },
  // heroSectionContainer styles END

  // filterSectionContainer styles START
  filterSectionContainer: {
    padding: 20,
    backgroundColor: "white",
    gap: 16,
  },
  filterHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  filterHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    marginRight: 12,
  },
  filterButtonText: {
    fontSize: 16,
    fontWeight: "500",
    textTransform: "capitalize",
  },
  // filterSectionContainer styles END

  // menuItemsListContainer styles START
  menuItemsListContainer: {},
  // menuItemsListContainer styles END
});

export default styles;
