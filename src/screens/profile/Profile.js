import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput,
  ScrollView,
  Switch,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./profile.styles";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomAvatar from "../../components/CustomAvatar";
import * as ImagePicker from "expo-image-picker";
import { emailPattern, isEmailValid, isNameValid } from "../../utils/textUtils";

const Profile = ({ navigation, setHasOnboarded }) => {
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

  // form errors state
  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // touched fields tracking
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
  });

  const handleFieldChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Only show errors if field has been touched
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setFormErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) {
          error = `${name === "firstName" ? "First" : "Last"} name is required`;
        } else if (!isNameValid(value)) {
          error = "Only letters and spaces are allowed";
        }
        break;
      case "email":
        if (!value.trim()) {
          error = "Email is required";
        } else if (!isEmailValid(value)) {
          error = "Please enter a valid email address";
        }
        break;
      case "phone":
        const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;
        // Only validate phone if a value is provided
        if (value.trim() && !phonePattern.test(value)) {
          error = "Please enter a valid phone number: (XXX) XXX-XXXX";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleFieldBlur = (fieldName) => {
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));

    const error = validateField(fieldName, formData[fieldName]);
    setFormErrors((prev) => ({
      ...prev,
      [fieldName]: error,
    }));
  };

  const handleNotificationToggle = (key) => {
    setFormData((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key],
      },
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Validate all fields
    Object.keys(formData).forEach((key) => {
      if (key !== "notifications" && key !== "image") {
        const error = validateField(key, formData[key]);
        if (error) {
          isValid = false;
          newErrors[key] = error;
        }
      }
    });

    setFormErrors(newErrors);
    setTouchedFields({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
    });

    return isValid;
  };

  const handleSaveChanges = async () => {
    if (validateForm()) {
      try {
        // Get existing data first
        const storedData = await AsyncStorage.getItem("userDetails");
        const existingData = storedData ? JSON.parse(storedData) : {};

        // Create updated data object with all fields, including image URL
        const updatedData = {
          ...existingData,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          // Only include phone if it has a value
          ...(formData.phone.trim() && { phone: formData.phone }),
          // Always include image (empty string if no image)
          image: formData.image,
          // Include notifications
          notifications: {
            ...formData.notifications,
          },
        };

        // Save to AsyncStorage
        await AsyncStorage.setItem("userDetails", JSON.stringify(updatedData));
        Alert.alert("Success", "Profile updated successfully!");
      } catch (error) {
        console.error("Failed to save profile data:", error);
        Alert.alert("Error", "Failed to save profile data. Please try again.");
      }
    } else {
      Alert.alert("Error", "Please fix the errors in the form before saving.");
    }
  };

  const handleDiscardChanges = async () => {
    try {
      // Show confirmation alert
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard all changes?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Discard",
            style: "destructive",
            onPress: async () => {
              // Reset form by reloading data from AsyncStorage
              await loadProfileData();

              // Reset touched states
              setTouchedFields({
                firstName: false,
                lastName: false,
                email: false,
                phone: false,
              });

              // Clear any errors
              setFormErrors({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
              });

              Alert.alert("Success", "Changes discarded successfully!");
            },
          },
        ]
      );
    } catch (error) {
      console.error("Failed to discard changes:", error);
      Alert.alert("Error", "Failed to discard changes. Please try again.");
    }
  };

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Logout",
        style: "destructive",
        onPress: async () => {
          try {
            await AsyncStorage.clear();
            // Navigate back to OnBoarding
            setHasOnboarded(false);
            navigation.replace("SplashScreen");
          } catch (error) {
            console.error("Failed to clear AsyncStorage:", error);
            Alert.alert("Error", "Failed to logout. Please try again.");
          }
        },
      },
    ]);
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
        base64: true, // Add this if you want to store the image as base64
      });

      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        setFormData((prevState) => ({
          ...prevState,
          image: imageUri,
        }));

        // Optionally, save immediately after picking
        const storedData = await AsyncStorage.getItem("userDetails");
        const existingData = storedData ? JSON.parse(storedData) : {};
        await AsyncStorage.setItem(
          "userDetails",
          JSON.stringify({
            ...existingData,
            image: imageUri,
          })
        );
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert("Error", "Failed to pick image. Please try again.");
    }
  };

  const removeImage = async () => {
    try {
      setFormData((prevState) => ({
        ...prevState,
        image: "",
      }));

      // Also remove from AsyncStorage
      const storedData = await AsyncStorage.getItem("userDetails");
      if (storedData) {
        const existingData = JSON.parse(storedData);
        existingData.image = "";
        await AsyncStorage.setItem("userDetails", JSON.stringify(existingData));
      }
    } catch (error) {
      console.error("Error removing image:", error);
      Alert.alert("Error", "Failed to remove image. Please try again.");
    }
  };

  const loadProfileData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userDetails");
      if (storedData) {
        const profileData = JSON.parse(storedData);

        // Update formData with stored data while preserving default structure
        setFormData((prev) => ({
          ...prev,
          firstName: profileData.firstName || "",
          lastName: profileData.lastName || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          // Always include image value, even if empty
          image: profileData.image || "",
          notifications: {
            orderStatus: true,
            passwordChanges: true,
            specialOffers: true,
            newsletter: true,
            ...(profileData.notifications || {}),
          },
        }));
      }
    } catch (error) {
      console.error("Failed to load profile data:", error);
      Alert.alert(
        "Error",
        "Failed to load profile data. Please try again later."
      );
    }
  };

  // console.log("formData", formData);

  const isAvatarImagePresent = formData?.image?.length > 0;

  const avatarImage = () => {
    return formData?.image?.length > 0 ? formData?.image : "";
  };

  const avatarInitials = () => {
    if (isAvatarImagePresent) return "";

    const firstInitial = formData?.firstName?.[0] || "L";
    const lastInitial = formData?.lastName?.[0] || "L";
    return `${firstInitial} ${lastInitial}`;
  };

  const handleBack = () => {
    navigation.navigate("Home");
  };

  // fetch the user data from AsyncStorage
  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <ScrollView style={styles.mainContainer}>
      {/* Header with Logo */}
      <View style={styles.headerContainer}>
        <View
          style={{
            flex: 1,
            alignItems: "flex-start",
            justifyContent: "center",
            paddingLeft: 10,
          }}
        >
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.8}
            onPress={handleBack}
          >
            {/* back button should be icon */}
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2 }}>
          <Image
            style={styles.headerLogo}
            source={require("../../../assets/Logo.png")}
          />
        </View>

        <View
          style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}
        >
          <CustomAvatar
            imgURL={avatarImage()}
            name={avatarInitials()}
            width={50}
            height={50}
          />
        </View>
      </View>

      {/* Profile Content */}
      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Personal Information</Text>

        <View style={styles.avatarContainer}>
          <Text style={styles.label}>Avatar</Text>
          <View style={styles.avatarSection}>
            <CustomAvatar
              imgURL={avatarImage()}
              name={avatarInitials()}
              width={100}
              height={100}
            />
            <View style={styles.avatarButtonSection}>
              <TouchableOpacity
                style={styles.saveButton}
                title="Pick an image from camera roll"
                onPress={pickImage}
              >
                <Text style={styles.saveButtonText}>Change</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.discardButton}
                title="Pick an image from camera roll"
                onPress={removeImage}
              >
                <Text style={styles.discardButtonText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>First name</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.firstName && formErrors.firstName
                ? styles.inputError
                : null,
            ]}
            value={formData.firstName}
            onChangeText={(text) => handleFieldChange("firstName", text)}
            onBlur={() => handleFieldBlur("firstName")}
          />
          {touchedFields.firstName && formErrors.firstName ? (
            <Text style={styles.errorText}>{formErrors.firstName}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Last name</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.lastName && formErrors.lastName
                ? styles.inputError
                : null,
            ]}
            value={formData.lastName}
            onChangeText={(text) => handleFieldChange("lastName", text)}
            onBlur={() => handleFieldBlur("lastName")}
          />
          {touchedFields.lastName && formErrors.lastName ? (
            <Text style={styles.errorText}>{formErrors.lastName}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.email && formErrors.email
                ? styles.inputError
                : null,
            ]}
            value={formData.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => handleFieldChange("email", text)}
            onBlur={() => handleFieldBlur("email")}
          />
          {touchedFields.email && formErrors.email ? (
            <Text style={styles.errorText}>{formErrors.email}</Text>
          ) : null}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Phone number</Text>
          <TextInput
            style={[
              styles.input,
              touchedFields.phone && formErrors.phone
                ? styles.inputError
                : null,
            ]}
            value={formData.phone}
            keyboardType="phone-pad"
            onChangeText={(text) => handleFieldChange("phone", text)}
            onBlur={() => handleFieldBlur("phone")}
          />
          {touchedFields.phone && formErrors.phone ? (
            <Text style={styles.errorText}>{formErrors.phone}</Text>
          ) : null}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Email notifications</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Order statuses</Text>
            <Switch
              value={formData.notifications.orderStatus}
              onValueChange={() => handleNotificationToggle("orderStatus")}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Password changes</Text>
            <Switch
              value={formData.notifications.passwordChanges}
              onValueChange={() => handleNotificationToggle("passwordChanges")}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Special offers</Text>
            <Switch
              value={formData.notifications.specialOffers}
              onValueChange={() => handleNotificationToggle("specialOffers")}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>Newsletter</Text>
            <Switch
              value={formData.notifications.newsletter}
              onValueChange={() => handleNotificationToggle("newsletter")}
            />
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Log out</Text>
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscardChanges}
          >
            <Text style={styles.discardButtonText}>Discard changes</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
          >
            <Text style={styles.saveButtonText}>Save changes</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
