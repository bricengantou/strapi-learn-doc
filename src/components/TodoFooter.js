import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import styles from "./style";

const TodoFooter = (props) => {
  return (
    <>
      {props.shouldLoadMore ? (
        <View style={styles.loaderView}>
          <ActivityIndicator animating />
        </View>
      ) : null}
    </>
  );
};
export default TodoFooter;
