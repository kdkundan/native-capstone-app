import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React, { useEffect, useState, useCallback } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "../screens/onBoarding/OnBoarding";
import SplashScreen from "../screens/onBoarding/SplashScreen";
import Profile from "../screens/profile/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../screens/home/Home";
import _ from "lodash";
import { useFonts } from "expo-font";

const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(false);

  const checkOnboardingStatus = async () => {
    try {
      const onboarded = await AsyncStorage.getItem("hasOnboarded");
      if (_.isEmpty(onboarded)) {
        setHasOnboarded(false);
        return;
      }
      setHasOnboarded(onboarded === "true");
    } catch (error) {
      console.error("Failed to load onboarding status", error);
    } finally {
      setIsLoading(false);
    }
  };

  // FONTS
  const [fontsLoaded] = useFonts({
    "Karla-Regular": require("../../assets/fonts/Karla-Regular.ttf"),
    "Karla-Medium": require("../../assets/fonts/Karla-Medium.ttf"),
    "Karla-Bold": require("../../assets/fonts/Karla-Bold.ttf"),
    "Karla-ExtraBold": require("../../assets/fonts/Karla-ExtraBold.ttf"),
    "MarkaziText-Regular": require("../../assets/fonts/MarkaziText-Regular.ttf"),
    "MarkaziText-Medium": require("../../assets/fonts/MarkaziText-Medium.ttf"),
  });

  // console.log("fontsLoaded", fontsLoaded);

  useEffect(() => {
    checkOnboardingStatus();
  }, [hasOnboarded]);

  // Memoized wrapper components to avoid re-creation
  const ProfileWrapper = useCallback(
    (props) => <Profile {...props} setHasOnboarded={setHasOnboarded} />,
    [setHasOnboarded]
  );

  const OnBoardingWrapper = useCallback(
    (props) => <OnBoarding {...props} setHasOnboarded={setHasOnboarded} />,
    [setHasOnboarded]
  );

  if (isLoading || !fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={hasOnboarded ? "Profile" : "SplashScreen"}
      screenOptions={{ headerShown: false }}
    >
      {hasOnboarded ? (
        <>
          <Stack.Screen name="Profile" component={ProfileWrapper} />
          <Stack.Screen name="Home" component={Home} />
        </>
      ) : (
        <>
          <Stack.Screen name="OnBoarding" component={OnBoardingWrapper} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
});
