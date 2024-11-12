import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F6F6F6",
    marginTop: 30,
  },
  headerContainer: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "flex-start",
    backgroundColor: "white",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerLogo: {
    height: "96%",
    width: "100%",
    resizeMode: "contain",
  },
  backButton: {
    backgroundColor: "#495E57",
    borderRadius: 100,
    color: "#FFFFFF",
    padding: 10,
    alignItems: "center",
  },
  backButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
  },
  formContainer: {
    flex: 1,
    padding: 16,
  },
  titleText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginVertical: 16,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatarSection: {
    flexDirection: "row",
  },
  avatarButtonSection: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  section: {
    marginVertical: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
  },
  logoutButton: {
    backgroundColor: "#FFD700",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#000",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  discardButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  discardButtonText: {
    color: "#666",
  },
  saveButton: {
    flex: 1,
    backgroundColor: "#4A5D5A",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
  },
  inputError: {
    borderColor: "#FF0000",
  },
  errorText: {
    color: "#FF0000",
    fontSize: 12,
    marginTop: 4,
  },
});

export default styles;
