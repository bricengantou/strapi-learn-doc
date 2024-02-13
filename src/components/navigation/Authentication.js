import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { useSelector } from "react-redux";
import { store } from "../../redux/Store";
import Login from "../../screens/Login";
import Overview from "../../screens/Overview";

const Authentication = () => {
  const token = useSelector((state) => state?.token);
  const [route, setRoute] = React.useState(token ? "Overview" : "Login");

  const Stack = createNativeStackNavigator();

  // on mount subscribe to store event
  React.useEffect(() => {
    store.subscribe(() => {
      setRoute(token ? "Overview" : "Login");
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* {route == "Login" ? ( */}
        <Stack.Screen name="Login" component={Login} />
        {/* ) : ( */}
        <Stack.Screen name="Overview" component={Overview} />
        {/* )} */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Authentication;
