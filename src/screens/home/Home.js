import {
  FlatList,
  Image,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import CustomAvatar from "../../components/CustomAvatar";
import { StatusBar } from "expo-status-bar";
import { fetchMenu } from "../../api";
import styles from "./styles";
import ListItemRender from "./subComponents/ListItemRender";
import {
  createTable,
  getMenuItems,
  saveMenuItems,
  filterMenuItems,
} from "../../database/database";
import { addIdsToMenu, extractCategories } from "../../utils/menuItemsUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar } from "react-native-paper";
import { debounce } from "lodash";

const Home = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    notifications: {
      orderStatus: true,
      passwordChanges: true,
      specialOffers: true,
      newsletter: true,
    },
    image: "",
  });

  const loadProfileData = useCallback(async () => {
    try {
      const storedData = await AsyncStorage.getItem("userDetails");
      if (storedData) {
        const profileData = JSON.parse(storedData);
        setFormData((prev) => ({
          ...prev,
          ...profileData,
          notifications: {
            ...prev.notifications,
            ...(profileData.notifications || {}),
          },
        }));
      }
    } catch (error) {
      console.error("Failed to load profile data:", error);
    }
  }, []);

  // Category filter functionality
  const handleCategoryPress = useCallback(
    async (category) => {
      setLoading(true);
      const updatedCategories = selectedCategories.includes(category)
        ? selectedCategories.filter((item) => item !== category)
        : [...selectedCategories, category];

      setSelectedCategories(updatedCategories);
      try {
        const filteredItems = await filterMenuItems({
          categories: updatedCategories,
          query: searchQuery,
          sortBy: "name",
          order: "ASC",
        });
        setMenuItems(filteredItems);
      } catch (err) {
        setError("Failed to filter categories");
        console.error("Category filter error:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategories, searchQuery]
  );

  const clearFilters = useCallback(async () => {
    setLoading(true);
    setSelectedCategories([]);
    setSearchQuery("");
    try {
      const allItems = await getMenuItems();
      setMenuItems(allItems);
    } catch (err) {
      setError("Failed to clear filters");
      console.error("Clear filters error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounced search
  const performSearch = useCallback(
    async (query) => {
      setLoading(true);
      try {
        const filteredItems = await filterMenuItems({
          query,
          categories: selectedCategories,
          sortBy: "name",
          order: "ASC",
        });
        setMenuItems(filteredItems);
      } catch (err) {
        setError("Search failed");
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    },
    [selectedCategories]
  );

  const debouncedSetQuery = useMemo(
    () => debounce(performSearch, 500),
    [performSearch]
  );

  const handleSearch = useCallback(
    (text) => {
      setSearchQuery(text);
      debouncedSetQuery(text);
    },
    [debouncedSetQuery]
  );

  // Fetch menu data and initialize categories
  const fetchMenuAPI = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await createTable();
      let items = await getMenuItems();
      let categories = [];

      if (!items.length) {
        const res = await fetchMenu();
        items = addIdsToMenu(res.data.menu);
        categories = extractCategories(items);
        await AsyncStorage.setItem("categories", JSON.stringify(categories));
        await saveMenuItems(items);
      } else {
        const storedCategories = await AsyncStorage.getItem("categories");
        categories = JSON.parse(storedCategories) || [];
      }

      setMenuItems(items);
      setCategoryList(categories);
    } catch (err) {
      setError("Failed to load menu");
      console.error("Menu fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMenuAPI();
    loadProfileData();
  }, [fetchMenuAPI, loadProfileData]);

  // Helper functions for avatar display
  const avatarImage = formData.image;
  const avatarInitials = `${formData.firstName[0] || "L"} ${
    formData.lastName[0] || "L"
  }`;

  const renderItem = useCallback(
    ({ item }) => <ListItemRender item={item} />,
    []
  );

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={fetchMenuAPI} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView>
      <StatusBar style="dark" />
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.headerContainer}>
              <View style={styles.headerChildren} />
              <View style={styles.logoContainer}>
                <Image
                  style={styles.headerLogo}
                  source={require("../../../assets/Logo.png")}
                  accessibilityLabel="Restaurant logo"
                />
              </View>
              <View style={styles.headerChildren}>
                <CustomAvatar
                  imgURL={avatarImage}
                  name={avatarInitials}
                  width={50}
                  height={50}
                  onPress={() => navigation.navigate("Profile")}
                  isClickable
                />
              </View>
            </View>
            <View style={styles.heroContainer}>
              <View style={styles.heroContent}>
                <Text style={styles.restaurantName}>Little Lemon</Text>
                <Text style={styles.locationText}>Chicago</Text>
                <View style={styles.descriptionContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.descriptionText}>
                      We are a family owned Mediterranean restaurant, focused on
                      traditional recipes served with a modern twist.
                    </Text>
                  </View>
                  <Image
                    source={require("../../../assets/Hero image.png")}
                    style={styles.heroImage}
                    accessibilityLabel="Restaurant hero image"
                  />
                </View>
                <View style={styles.searchBarContainer}>
                  <Searchbar
                    placeholder="Search menu items"
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                    autoCorrect={false}
                    returnKeyType="search"
                  />
                </View>
              </View>
            </View>
            <View style={styles.filterSectionContainer}>
              <View style={styles.filterHeaderContainer}>
                <Text style={styles.filterHeaderText}>Order for Delivery</Text>
                {selectedCategories.length > 0 && (
                  <TouchableOpacity
                    onPress={clearFilters}
                    style={styles.clearFilterButton}
                  >
                    <Text style={styles.clearFilterText}>Clear Filters</Text>
                  </TouchableOpacity>
                )}
              </View>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoryScrollContainer}
              >
                {categoryList.map((category, index) => (
                  <TouchableOpacity
                    key={`${category}-${index}`}
                    onPress={() => handleCategoryPress(category)}
                    style={[
                      styles.filterButton,
                      {
                        backgroundColor: selectedCategories.includes(category)
                          ? "#495E57"
                          : "#EDEFEE",
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterButtonText,
                        {
                          color: selectedCategories.includes(category)
                            ? "#FFFFFF"
                            : "#495E57",
                        },
                      ]}
                    >
                      {category}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </>
        )}
        data={menuItems}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id?.toString()}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyListText}>No menu items found</Text>
          )
        }
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#495E57" />
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default Home;
