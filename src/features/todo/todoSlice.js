import { createSlice } from "@reduxjs/toolkit";

let todoId = 1;

export const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    create: (state, action) => {
      const { payload } = action;

      state.push({
        id: todoId,
        description: payload,
        isComplete: false,
      });

      todoId += 1;
    },

    edit: (state, action) => {
      const { id, description } = action.payload;

      const todoToEdit = state.find((todo) => todo.id === id);

      if (todoToEdit) {
        todoToEdit.description = description;
      }
    },

    toggleComplete: (state, action) => {
      const { payload } = action;

      const todoToToggle = state.find((todo) => todo.id === payload);

      if (todoToToggle) {
        todoToToggle.isComplete = !todoToToggle.isComplete;
      }
    },

    removeTodo: (state, action) => {
      const { payload } = action;
      const index = state.findIndex((todo) => todo.id === payload);

      if (index !== -1) {
        state.splice(index, 1);
      }
    },
  },
});

export const { create, edit, toggleComplete, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
