import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyBase: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 35,
    lineHeight: 35,
    fontWeight: "700",
    padding: 32,
    paddingLeft: 16,
  },
  header: {
    flexDirection: "row",
    alignContent: "center",
  },
  btn: {
    height: 50,
    paddingTop: 6,
    marginLeft: 16,
    marginRight: 16,
  },
  loaderBase: {
    padding: 16,
    alignContent: "center",
    justifyContent: "center",
    flex: 1,
  },
  divider: {
    height: 16,
  },
  buttonFrame: {
    justifyContent: "center",
  },
});

export default styles;
