import React from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Use this for Expo
// For React Native CLI, use import LinearGradient from 'react-native-linear-gradient';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

const SplashScreen = ({ navigation }) => {
  const handleNext = () => {
    // Navigate to the next screen
    navigation.navigate("OnBoarding");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={require("../../../assets/onBoarding_salad.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradient Overlay */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.8)"]} // Fades from transparent to dark
          style={styles.overlay}
        >
          <View style={styles.contentContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>{"Little Lemon:"}</Text>
              <Text style={styles.title2}>{"Fresh Flavors, Big Smiles."}</Text>
              <Text style={styles.subtitle}>
                {
                  "Welcome to Little Lemon! 🍋\nWhere every bite brings zest to your day!"
                }
              </Text>
            </View>

            <TouchableOpacity
              onPress={handleNext}
              style={styles.button}
              activeOpacity={0.8}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.buttonText}>Proceed ahead</Text>
                <Text style={styles.arrow}>→</Text>
              </View>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    width: screenWidth,
    height: screenHeight,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 60,
  },
  contentContainer: {
    backgroundColor: "rgba(0,0,0,0.0)", // Transparent to let gradient show
    paddingHorizontal: 24,
    gap: 24,
  },
  textContainer: {
    gap: 8,
  },
  title: {
    fontSize: 34,
    fontWeight: "600",
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
    lineHeight: 42,
  },
  title2: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    fontStyle: "italic",
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    fontWeight: "400",
    lineHeight: 22,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 30,
    height: 56,
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "black",
  },
  arrow: {
    fontSize: 20,
    color: "black",
  },
});

export default SplashScreen;
