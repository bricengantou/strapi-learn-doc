import { default as React } from "react";
import { View } from "react-native";
import {
    Button,
    Dialog,
    HelperText,
    Paragraph,
    Portal,
    Text,
    TextInput
} from "react-native-paper";
import TodoModel from "../app/models/TodoModel";
import styles from "./style";

const TodoHeader = (props) => {
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
    <View style={styles.header}>
      <Text style={styles.text}>{props.text || "Your to do's"}</Text>
      <View style={styles.buttonFrame}>
        {!props.text ? (
          <Button
            onPress={() => setVisible(true)}
            style={{ marginLeft: 16 }}
            mode="outlined"
          >
            Add a todo
          </Button>
        ) : null}
      </View>

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

export default TodoHeader;
