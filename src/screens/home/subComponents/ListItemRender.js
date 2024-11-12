import { Image, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import styles from "./listItemRender.styles";

const ListItemRender = ({ item }) => {
  const imageURL = (imageFileName = "greekSalad.jpg") => {
    return `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageFileName}?raw=true`;
  };

  const imageSource = useMemo(() => {
    return {
      uri: imageURL(item?.image),
    };
  }, [item?.image]);

  const trimmedText = useMemo(() => {
    if (!item?.description) return "";
    // Remove any existing ellipsis and trim whitespace
    const cleanText = item.description.replace(/\.{3,}$/, "").trim();
    // If text is longer than 60 chars, truncate and add "..." at word boundary
    if (cleanText.length > 60) {
      const truncated = cleanText
        .substr(0, 60)
        .split(" ")
        .slice(0, -1)
        .join(" ");
      return truncated + "...";
    }
    return cleanText;
  }, [item?.description]);

  return (
    <View style={styles.itemMainContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.itemName}>{item?.name}</Text>
        <Text style={styles.itemDescription}>{trimmedText}</Text>
        <Text style={styles.itemPrice}>$ {item?.price}</Text>
      </View>
      <View style={styles.itemImageContainer}>
        {item?.image ? (
          <Image
            source={imageSource}
            style={{ width: "80%", height: "80%" }}
            resizeMode="cover"
          />
        ) : (
          <Text>No Image</Text>
        )}
      </View>
    </View>
  );
};

export default ListItemRender;
