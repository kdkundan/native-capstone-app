import { Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

const CustomAvatar = ({
  name = "",
  imgURL = "",
  showPlaceHolderImage = false,
  width = 80,
  height = 80,
  onPress = null,
  isClickable = false, // New prop to determine if avatar should be clickable
}) => {
  const placeHolderImgURI = "https://via.placeholder.com/80";

  const AvatarContent = () => {
    if (imgURL?.length > 0 || showPlaceHolderImage) {
      return (
        <Image
          source={{ uri: imgURL || placeHolderImgURI }}
          style={styles.avatar}
          width={width}
          height={height}
        />
      );
    }

    if (name?.length > 0) {
      const initials = name
        .split(" ")
        .map((word) => word[0].toUpperCase())
        .join("");
      return (
        <Avatar.Text style={styles.avatar} size={width} label={initials} />
      );
    }
  };

  return isClickable && onPress ? (
    <TouchableOpacity onPress={onPress}>
      <AvatarContent />
    </TouchableOpacity>
  ) : (
    <AvatarContent />
  );
};

export default CustomAvatar;

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 50,
    marginRight: 16,
  },
});
