import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./src/navigator/StackNavigator";

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
