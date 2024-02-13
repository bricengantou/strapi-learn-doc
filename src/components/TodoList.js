import React from "react";
import { FlatList, View } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import { getTodos } from "../app/controllers/TodoController";
import TodoView from "../app/views/TodoView";
import EmptyTodo from "./EmptyTodo";
import styles from "./style";
import TodoFooter from "./TodoFooter";
import TodoHeader from "./TodoHeader";

export const TodoList = (props) => {
  const todos = useSelector((state) => state.todos);
  const [data, setData] = React.useState(todos);
  const [limit] = React.useState(10);
  const [start, setStart] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(true);
  const [shouldLoadMore, setShouldLoadMore] = React.useState(true);
  const token = useSelector((state) => state.token);

  const getTodosForUser = React.useCallback(async () => {
    if (!shouldLoadMore) {
      return;
    }

    if (!loading && data.length === 0) {
      setLoading(true);
    }

    if (!loadingMore && data.length > 0) {
      setLoadingMore(true);
    }

    const response = await getTodos(start, limit, token)
      .then((res) => {
        console.log(res);
        if (res?.data?.todos?.data) {
          return res?.data?.todos?.data;
        }
      })
      .catch((err) => console.log(err));

    if (response && response?.length < 10) {
      setShouldLoadMore(false);
    } else {
      setStart(start + limit);
    }

    setData([...data, ...response]);
    setLoading(false);
    setLoadingMore(false);
  }, [data, limit, loading, loadingMore, shouldLoadMore, start]);

  /**
   * saves a new todo to the server by creating a new TodoModel
   * from the dialog data and calling Todo.save()
   */
  const addTodo = (todo) => {
    const { title, description, finished, user, id } = todo;
    setData([...data, ...[{ title, description, finished, user, id }]]);
  };

  /**
   * callback method for the todo view. Deletes a todo from the list
   * after it has been deleted from the server.
   */
  const removeTodo = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  React.useEffect(() => {
    getTodosForUser();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderBase}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  }

  if (!shouldLoadMore && !loading && !loadingMore && data.length === 0) {
    return <EmptyTodo addTodo={addTodo} />;
  }

  return (
    <>
      <FlatList
        style={styles.base}
        data={data}
        ItemSeparatorComponent={() => <Divider />}
        ListHeaderComponent={() => <TodoHeader addTodo={addTodo} />}
        ListFooterComponent={() => (
          <TodoFooter shouldLoadMore={shouldLoadMore} />
        )}
        onEndReachedThreshold={0.5}
        onEndReached={() => getTodosForUser()}
        renderItem={({ item, index }) => (
          <TodoView removeTodo={removeTodo} item={item} index={index} />
        )}
      />
    </>
  );
};
