import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  todos: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setTodos: (state, action) => {
      state.todos = action.payload.todo;
    },
    setTodo: (state, action) => {
      const updatedTodo = state.todos.map((todo) => {
        if (todo.id === action.payload.todo.id) return action.payload.todo;
        return todo;
      });
      state.todos = updatedTodo;
    },
  },
});

export const { setLogin, setLogout, setTodo, setTodos } = authSlice.actions;
export default authSlice.reducer;
