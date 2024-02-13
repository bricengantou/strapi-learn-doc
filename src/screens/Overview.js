import React from "react";
import { StatusBar } from "react-native";
import { TodoList } from "../components/TodoList";

const Overview = (props) => {
  return (
    <>
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <TodoList />
    </>
  );
};

export default Overview;
