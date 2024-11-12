import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PagerView from "react-native-pager-view";
import { emailPattern, isNameValid, namePattern } from "../../utils/textUtils";

const NameForm = ({
  firstName,
  lastName,
  setFirstName,
  setLastName,
  isNameValid,
}) => (
  <>
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>What's your first name?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your first name"
        value={firstName}
        onChangeText={setFirstName}
      />
      {!isNameValid(firstName) && firstName.length > 0 && (
        <Text style={styles.errorText}>
          Please enter a valid name (only alphabets).
        </Text>
      )}
    </View>
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>What's your last name?</Text>
      <TextInput
        style={styles.textInput}
        placeholder="Enter your last name"
        value={lastName}
        onChangeText={setLastName}
      />
      {!isNameValid(lastName) && lastName.length > 0 && (
        <Text style={styles.errorText}>
          Please enter a valid last name (only alphabets).
        </Text>
      )}
    </View>
  </>
);

const EmailForm = ({ email, setEmail, isEmailValid }) => (
  <View style={styles.inputContainer}>
    <Text style={styles.inputLabel}>
      Now, what's the best email to reach you?
    </Text>
    <TextInput
      style={styles.textInput}
      placeholder="Enter your email"
      keyboardType="email-address"
      value={email}
      onChangeText={setEmail}
    />
    {!isEmailValid && email.length > 0 && (
      <Text style={styles.errorText}>Please enter a valid email address.</Text>
    )}
  </View>
);

const OnBoarding = ({ navigation, setHasOnboarded }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const pagerRef = useRef(null);

  // Check if inputs are valid
  const isEmailValid = emailPattern.test(email);
  const isNameFormValid = isNameValid(firstName) && isNameValid(lastName);

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem("hasOnboarded", "true");
      setHasOnboarded(true);
      const user = { firstName, lastName, email };
      await AsyncStorage.setItem("userDetails", JSON.stringify(user));
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Failed to save onboarding status", error);
    }
  };

  const handleNextPage = () => {
    if (currentPage < 1) {
      pagerRef.current?.setPage(currentPage + 1);
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Image
          style={styles.headerLogo}
          source={require("../../../assets/Logo.png")}
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.titleText}>Welcome to Little Lemon! 🍋</Text>
        <Text style={styles.subtitleText}>
          Let's get to know you a little better.
        </Text>

        <PagerView
          ref={pagerRef}
          style={{ flex: 1, width: "100%" }}
          initialPage={0}
          scrollEnabled={false}
          onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
        >
          <KeyboardAvoidingView key="1" style={styles.page}>
            <NameForm
              firstName={firstName}
              setFirstName={setFirstName}
              lastName={lastName}
              setLastName={setLastName}
              isNameValid={isNameValid}
            />
            <TouchableOpacity
              style={[
                styles.nextButton,
                { backgroundColor: isNameFormValid ? "#FFA726" : "#CCCCCC" },
              ]}
              activeOpacity={0.8}
              disabled={!isNameFormValid}
              onPress={handleNextPage}
            >
              <Text style={styles.nextButtonText}>Next</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>

          <View key="2" style={styles.page}>
            <EmailForm
              email={email}
              setEmail={setEmail}
              isEmailValid={isEmailValid}
            />
            <TouchableOpacity
              style={[
                styles.nextButton,
                { backgroundColor: isEmailValid ? "#FFA726" : "#CCCCCC" },
              ]}
              activeOpacity={0.8}
              disabled={!isEmailValid}
              onPress={handleOnboardingComplete}
            >
              <Text style={styles.nextButtonText}>Complete</Text>
            </TouchableOpacity>
          </View>
        </PagerView>
      </View>
    </View>
  );
};

export default OnBoarding;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
  },
  headerContainer: {
    width: "100%",
    flex: 0.2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerLogo: {
    height: 80,
    width: 200,
    resizeMode: "contain",
  },
  formContainer: {
    flex: 0.8,
    padding: 20,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: "#777777",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 5,
  },
  textInput: {
    height: 50,
    borderColor: "#CCCCCC",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 5,
  },
  page: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextButton: {
    width: "100%",
    marginTop: 30,
    borderRadius: 8,
    paddingVertical: 15,
    alignItems: "center",
  },
  nextButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
