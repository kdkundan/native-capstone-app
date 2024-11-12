export const addIdsToMenu = (menuData) => {
  return menuData.map((item, index) => ({
    id: Date.now() + index, // Generates a unique ID for each item
    ...item,
  }));
};

export function extractCategories(menuItems) {
  try {
    // Use Set to automatically handle duplicates
    const uniqueCategories = [
      ...new Set(menuItems.map((item) => item.category)),
    ];

    // Sort categories alphabetically
    return uniqueCategories.sort();
  } catch (error) {
    console.error("Error extracting categories:", error);
    return [];
  }
}
