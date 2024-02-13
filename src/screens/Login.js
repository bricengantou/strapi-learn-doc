import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import {
  Button,
  Headline,
  Paragraph,
  Portal,
  Snackbar,
  TextInput
} from "react-native-paper";
import { useDispatch } from "react-redux";
import { login } from "../app/controllers/UserController";
import { setLogin } from "../redux/reducers/UserReducer";

const Login = ({ navigation }) => {
  const [identifier, setIdentifier] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const dispatch = useDispatch();
  const validateInput = () => {
    let errors = false;

    if (!identifier || identifier.length === 0) {
      errors = true;
    }

    if (!password || password.length === 0) {
      errors = true;
    }

    return !errors;
  };

  const authenticateUser = async () => {
    if (validateInput()) {
      setLoading(true);
      await login(identifier, password).then((result) => {
        if (result?.errors && result?.errors?.length > 0) {
          setError(result?.errors[0]?.message || "Unable to login user");
          setVisible(true);
          setLoading(false);
        }
        if (result?.data) {
          dispatch(
            setLogin({
              token: result?.data?.login?.jwt,
              user: result?.data?.login?.user,
            })
          );
          setLoading(false);
          navigation.navigate("Overview");
        }
      });
    } else {
      setError("Please fill out all fields");
      setVisible(true);
      setLoading(false);
    }
  };
  return (
    <View style={styles.base}>
      <>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      </>

      <View style={styles.header}>
        <Headline style={styles.appTitle}>TodoApp</Headline>
        <Paragraph style={styles.appDesc}>
          Authenticate with Strapi to access the TodoApp.
        </Paragraph>
      </View>

      <>
        <View style={styles.divider} />
        <TextInput
          value={identifier}
          onChangeText={(text) => setIdentifier(text)}
          label="Username or email"
        />
      </>

      <>
        <View style={styles.divider} />
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          label="Password"
          secureTextEntry
        />
      </>

      <>
        <View style={styles.divider} />
        <Button
          loading={loading}
          disabled={loading}
          style={styles.btn}
          onPress={() => authenticateUser()}
          mode="contained"
        >
          Login
        </Button>
        <View style={styles.divider} />
        <View style={styles.divider} />
      </>

      <>
        {/**
         * We use a portal component to render
         * the snackbar on top of everything else
         * */}
        <Portal>
          <Snackbar visible={visible} onDismiss={() => setVisible(false)}>
            {error}
          </Snackbar>
        </Portal>
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 16,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  divider: {
    height: 16,
  },
  headline: {
    fontSize: 30,
  },
  appDesc: {
    textAlign: "center",
  },
  header: {
    padding: 32,
  },
  appTitle: {
    textAlign: "center",
    fontSize: 35,
    lineHeight: 35,
    fontWeight: "700",
  },
  btn: {
    height: 50,
    paddingTop: 6,
  },
});

export default Login;
