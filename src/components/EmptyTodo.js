import { default as React } from "react";
import { View } from "react-native";
import {
    Button,
    Dialog,
    HelperText,
    Paragraph,
    Portal,
    TextInput
} from "react-native-paper";
import { useSelector } from "react-redux";
import TodoModel from "../app/models/TodoModel";
import styles from "./style";

const EmptyTodo = (props) => {
  const [error, setError] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [visible, setVisible] = React.useState(false);
  const [description, setDescription] = React.useState("");

  const createTodoFromDialog = async () => {
    if (title.length === 0 || description.length === 0) {
      setError("Title and description are required.");
      return;
    }

    const user = useSelector((state) => state.user);
    const todo = new TodoModel(user, title, description);

    try {
      await todo.save();
    } catch (err) {
      setError(err.message);
    }

    props.addTodo(todo);
  };

  return (
    <View style={styles.emptyBase}>
      <TodoHeader text={"Pretty empty here .."} />
      <Button
        onPress={() => setVisible(true)}
        style={styles.btn}
        mode="contained"
      >
        Create a new todo
      </Button>

      <Portal>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
          <Dialog.Title>Create a new todo</Dialog.Title>
          <Dialog.Content>
            <Paragraph>
              Adding a new todo will save to in Strapi so you can use it later.
            </Paragraph>
            <View style={styles.divider} />
            <TextInput
              label="title"
              placeholder="title"
              onChangeText={(text) => {
                setTitle(text);
                setError(false);
              }}
            >
              {title}
            </TextInput>
            <View style={styles.divider} />
            <TextInput
              label="description"
              placeholder="description"
              multiline={true}
              numberOfLines={4}
              onChangeText={(text) => {
                setDescription(text);
                setError(false);
              }}
            >
              {description}
            </TextInput>
            <HelperText type="error">{error}</HelperText>
          </Dialog.Content>

          <Dialog.Actions>
            <Button
              onPress={() => {
                setVisible(false);
                setTitle("");
                setDescription("");
                setError("");
              }}
            >
              Cancel
            </Button>
            <Button onPress={() => createTodoFromDialog()}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default EmptyTodo;
